"use client";
import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useStore } from '@/store/useStore';
import SceneController from '@/components/360/SceneController';
import Sidebar from '@/components/layout/Sidebar';
import { Sun, Moon, Rotate3d } from 'lucide-react';
import { preloadImages } from '@/utils/preload';
import { getAssetUrl } from '@/utils/assets';
import Loader from '@/components/UI/Loader';
import FullScreenToggle from '@/components/UI/FullScreenToggle';
import { showroomConfig } from '@/data/showroom';
import config from '@/config/config';

const ShowroomContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const startTransition = useStore(state => state.startTransition);
  const viewState = useStore(state => state.viewState);
  const currentRoom = useStore(state => state.currentRoom);
  const rotateBuilding = useStore(state => state.rotateBuilding);
  const timeOfDay = useStore(state => state.timeOfDay);
  const toggleTimeOfDay = useStore(state => state.toggleTimeOfDay);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isHoveringIngresar, setIsHoveringIngresar] = useState(false);
  const [loadingAction, setLoadingAction] = useState<'left' | 'right' | 'daynight' | 'enter' | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const currentFace = useStore(state => state.currentFace);
  const isLoadingAssets = useStore(state => state.isLoadingAssets);
  const buildingFacesData = useStore(state => state.buildingFacesData);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 50);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isLoadingAssets) setLoadingAction(null);
  }, [isLoadingAssets]);

  // Reset state on mount or params change
  const transitionParam = searchParams.get('transition');

  useEffect(() => {
    const initShowroom = async () => {
      // NOTE: we intentionally do NOT set isLoadingAssets here. The initial
      // background is preloaded below to warm the cache, but it must not block
      // the UI / navigation. isLoadingAssets is reserved for the rotation and
      // day/night toggles, which disable only their own buttons while their
      // specific transition video loads.

      const transition = transitionParam;
      // targetPath is handled by the store or router logic usually, 
      // but here we just need to know if we are entering via a specific flow.

      // Reset to Day if entering via Intro (or fresh load) because the Intro video is Day-only.
      const shouldResetToDay = !transition || transition === 'intro';

      useStore.setState({
        currentRoom: showroomConfig.initialRoom,
        viewState: 'IDLE',
        currentFloor: showroomConfig.initialFloor,
        transitionUrl: null,
        currentFace: showroomConfig.initialFace,
        ...(shouldResetToDay ? { timeOfDay: 'day' } : {})
      });

      const faces = useStore.getState().buildingFacesData;
      const currentTimeOfDay = useStore.getState().timeOfDay;

      if (transition && faces.length > 0) {
        const face0 = faces[0];

        if (transition === 'intro') {
          // Showroom: Matches Homepage "Entrar" video
          const introVideoUrl = getAssetUrl('videos/walks/trans_intro_to_0.mp4');

          useStore.setState({
            viewState: 'TRANSITION_VIDEO',
            transitionUrl: introVideoUrl,
            targetDestination: 'Lobby'
          });
        } else if (transition === 'floors') {
          // Plantas: enters the building with the "Cara Central" walk (Day/Night
          // sensitive). Face 0 is the cover, whose introVideo only rotates to the
          // central face — index 2 is the same face the store rotates to from it.
          const centralFace = faces[2] || face0;
          const floorsVideoUrl = currentTimeOfDay === 'day' ? centralFace?.day?.introVideo : centralFace?.night?.introVideo;

          if (floorsVideoUrl) {
            useStore.setState({
              viewState: 'TRANSITION_VIDEO',
              transitionUrl: floorsVideoUrl,
              targetDestination: 'Floors'
            });
          }
        }
      }

      try {
        if (faces.length > 0) {
          const face0 = faces[0];
          const determinedTime = shouldResetToDay ? 'day' : (transition === 'floors' ? currentTimeOfDay : 'day');

          const mainAsset = determinedTime === 'day' ? face0?.day?.background : face0?.night?.background;
          const secondaryAsset = determinedTime === 'day' ? face0?.night?.background : face0?.day?.background;

          // Fire-and-forget cache warming — never block the UI / navigation.
          if (mainAsset) preloadImages([mainAsset]).catch(() => { });
          if (secondaryAsset) preloadImages([secondaryAsset]).catch(() => { });
        }
      } catch (e) { console.warn("Showroom mount preload failed", e); }
    };

    initShowroom();
  }, [transitionParam]); // Re-run only if transition param changes

  // Proximity Loading Logic
  useEffect(() => {
    // Don't preload if we are transitioning or not in lobby
    if (currentRoom !== 'Lobby' || buildingFacesData.length === 0) return;

    const currentFaceData = buildingFacesData[currentFace] || buildingFacesData[0];
    if (!currentFaceData) return;

    const fastImagesToLoad: string[] = [];
    const secondaryImagesToLoad: string[] = [];

    // 1. Every other face's background for the current time of day. There are
    // only ever 2-3 faces, so warming all of them (not just the immediate
    // neighbors) removes the first-click wait no matter which direction the
    // user rotates, while staying cheap.
    buildingFacesData.forEach((face, id) => {
      if (id === currentFace) return;
      const assetSet = timeOfDay === 'day' ? face.day : face.night;
      if (assetSet?.background) fastImagesToLoad.push(assetSet.background);
    });

    // 2. Alt time-of-day background for the current face
    if (timeOfDay === 'day' && currentFaceData?.night?.background) {
      secondaryImagesToLoad.push(currentFaceData.night.background);
    } else if (timeOfDay === 'night' && currentFaceData?.day?.background) {
      secondaryImagesToLoad.push(currentFaceData.day.background);
    }

    // NOTE: transition/walk VIDEOS are intentionally NOT preloaded here. They
    // are multi-MB and, with the browser's ~6 connections-per-host limit, they
    // saturated the pool and queued client-side navigation behind them (e.g.
    // tapping "Contacto" closed the menu but only navigated ~a minute later).
    // The specific transition video is preloaded on demand by rotateBuilding /
    // toggleTimeOfDay when the user actually triggers it.

    // Execution
    if (fastImagesToLoad.length > 0) {
      preloadImages(fastImagesToLoad).catch(() => console.warn('Fast preload failed'));
    }

    const secondaryTimer = setTimeout(() => {
      if (secondaryImagesToLoad.length > 0) {
        preloadImages(secondaryImagesToLoad).catch(() => { });
      }
    }, 4000);

    return () => {
      clearTimeout(secondaryTimer);
    };

  }, [currentFace, timeOfDay, currentRoom, buildingFacesData]);

  const currentFaceData = buildingFacesData[currentFace] || buildingFacesData[0];
  const hasLeftTransition = currentFaceData ? !!currentFaceData[timeOfDay]?.transitions?.toLeft : false;
  const hasRightTransition = currentFaceData ? !!currentFaceData[timeOfDay]?.transitions?.toRight : false;

  // The "cara inicial" (face 0) is the branded cover: only the menu and
  // fullscreen controls stay; the logo + a luxury "Ingresar" CTA take center.
  const isInitialFace = currentFace === 0;

  const showLeftButton = currentRoom === 'Lobby' && viewState === 'IDLE' && hasLeftTransition;
  const showRightButton = currentRoom === 'Lobby' && viewState === 'IDLE' && hasRightTransition;


  return (
    <div className={`font-sans relative h-full w-full overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${isLoaded ? 'opacity-100 blur-0 scale-100' : 'opacity-0 blur-sm scale-[1.01]'}`}>
      <SceneController isHighlighted={isHoveringIngresar} />

      <div className="fixed top-6 left-6 z-30 group">
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="p-2 text-white bg-brand-primary/80 hover:bg-brand-primary backdrop-blur-xl border border-white/20 rounded-full transition-all hover:scale-105 cursor-pointer shadow-lg"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <span className="absolute left-full ml-3 top-1/2 -translate-y-1/2 px-2 py-1 bg-black/80 backdrop-blur-md text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none font-secondary tracking-wider uppercase">
          Menú
        </span>
      </div>

      {/* Recorrido General Button — hidden on the initial cover face */}
      {viewState === 'IDLE' && !isInitialFace && (
        <button
          onClick={() => router.push('/recorridos?tourId=building-main')}
          disabled={isLoadingAssets}
          className="fixed top-6 left-1/2 -translate-x-1/2 z-30 px-6 py-2 bg-brand-primary/80 hover:bg-brand-primary backdrop-blur-xl border border-white/20 rounded-full text-white font-medium text-sm transition-all duration-300 hover:scale-105 cursor-pointer shadow-lg uppercase tracking-wide flex items-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          <Rotate3d size={18} />
          Recorrido General
        </button>
      )}

      {/* Right-side Controls Stack */}
      <div className="fixed top-6 right-6 z-30 flex flex-col gap-4 items-end">

        {/* Day/Night Toggle */}
        {viewState === 'IDLE' && currentFace !== 0 && (
          <div className="relative group">
            <button
              onClick={() => { setLoadingAction('daynight'); toggleTimeOfDay(); }}
              disabled={isLoadingAssets}
              className="p-3 bg-brand-primary/80 hover:bg-brand-primary backdrop-blur-xl border border-white/20 rounded-full text-white transition-all hover:scale-110 cursor-pointer shadow-lg disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {loadingAction === 'daynight' ? (
                <Loader className="w-6 h-6" />
              ) : timeOfDay === 'day' ? <Moon size={24} /> : <Sun size={24} />}
            </button>
            <div className="absolute top-1/2 right-full mr-3 -translate-y-1/2 px-3 py-1 bg-black/80 backdrop-blur-sm text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
              {timeOfDay === 'day' ? 'Switch to Night' : 'Switch to Day'}
            </div>
          </div>
        )}

        {/* Fullscreen Toggle */}
        <FullScreenToggle />
      </div>

      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      {/* Rotation UI */}
      {showLeftButton && (
        <button
          onClick={() => { setLoadingAction('left'); rotateBuilding('left'); }}
          disabled={isLoadingAssets}
          className="fixed top-1/2 left-4 -translate-y-1/2 z-40 p-3 rounded-full bg-brand-primary/80 hover:bg-brand-primary backdrop-blur-xl border border-white/20 text-white transition-all duration-300 hover:scale-110 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          {loadingAction === 'left' ? (
            <Loader className="h-8 w-8" />
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          )}
        </button>
      )}

      {showRightButton && (
        <button
          onClick={() => { setLoadingAction('right'); rotateBuilding('right'); }}
          disabled={isLoadingAssets}
          className="fixed top-1/2 right-4 -translate-y-1/2 z-40 p-3 rounded-full bg-brand-primary/80 hover:bg-brand-primary backdrop-blur-xl border border-white/20 text-white transition-all duration-300 hover:scale-110 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          {loadingAction === 'right' ? (
            <Loader className="h-8 w-8" />
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          )}
        </button>
      )}

      {/* Floating UI — standard "Ingresar" on the explorable faces; the initial
          cover face renders its own centered luxury version below instead. */}
      {viewState === 'IDLE' && !isInitialFace && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50">
          <button
            onClick={() => { setLoadingAction('enter'); startTransition('Floors'); }}
            onMouseEnter={() => setIsHoveringIngresar(true)}
            onMouseLeave={() => setIsHoveringIngresar(false)}
            disabled={isLoadingAssets}
            className="bg-brand-primary/80 backdrop-blur-xl border border-white/20 text-white px-8 py-3 rounded-full hover:bg-brand-primary transition-all duration-300 cursor-pointer flex items-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loadingAction === 'enter' ? <Loader className="w-[18px] h-[18px]" /> : 'Ingresar'}
          </button>
        </div>
      )}

      {/* Initial-face luxury cover — a large brand logo filling the upper-left
          area, with a refined "Ingresar" CTA below it. The logo width, and the
          logo/button left+top offsets, are the knobs to nudge the placement.
          Only menu & fullscreen stay in the corners. */}
      {viewState === 'IDLE' && isInitialFace && (
        <div className="fixed inset-0 z-40 pointer-events-none">
          {/* Soft scrim over the left area so the white mark reads on the render */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_54%_60%_at_30%_42%,rgba(4,22,32,0.5),rgba(4,22,32,0)_66%)]" />

          {/* Logo — fills the upper-left area */}
          <img
            src="/identity/identity_logo_white.png"
            alt={config.appName}
            className="absolute left-[12%] top-[25%] w-[42vw] min-w-[260px] max-w-[820px] object-contain drop-shadow-[0_6px_40px_rgba(0,0,0,0.55)] animate-fade-in"
          />

          {/* Luxury "Ingresar" CTA — centered below the logo */}
          <button
            onClick={() => { setLoadingAction('enter'); startTransition('Floors'); }}
            onMouseEnter={() => setIsHoveringIngresar(true)}
            onMouseLeave={() => setIsHoveringIngresar(false)}
            disabled={isLoadingAssets}
            className="group pointer-events-auto absolute left-[30%] top-[51%] -translate-x-1/2 inline-flex items-center justify-center gap-5 lg:gap-6 overflow-hidden border-2 border-white/70 px-16 py-5 lg:px-24 lg:py-6 backdrop-blur-md bg-black/30 shadow-[0_8px_32px_rgba(0,0,0,0.5)] transition-all duration-500 hover:border-white hover:scale-105 active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed animate-fade-in cursor-pointer"
          >
            {/* White fill sweeps up on hover */}
            <span className="absolute inset-0 z-0 translate-y-full bg-white transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0" />
            
            <span className="relative z-10 text-base lg:text-xl font-medium uppercase tracking-[0.4em] text-white transition-colors duration-500 group-hover:text-ocean-950 drop-shadow-md whitespace-nowrap">
              {loadingAction === 'enter' ? <Loader className="w-5 h-5 lg:w-6 lg:h-6" /> : 'Ingresar'}
            </span>
            {loadingAction !== 'enter' && (
              <svg className="relative z-10 h-5 w-5 lg:h-6 lg:w-6 text-white transition-all duration-500 group-hover:text-ocean-950 group-hover:translate-x-2 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default function ShowroomPage() {
  return (
    <Suspense fallback={<div className="h-screen w-screen flex items-center justify-center bg-black text-white"><Loader /></div>}>
      <ShowroomContent />
    </Suspense>
  )
}
