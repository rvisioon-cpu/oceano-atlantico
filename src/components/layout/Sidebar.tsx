"use client";
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { X, Home, Building2, Layers, Image, Rotate3D, Video, Download, MapPin, Phone, Facebook, Instagram, Mountain, Box, Construction } from 'lucide-react';
import { getAssetUrl } from '@/utils/assets';
import { useStore } from '@/store/useStore';
import { preloadImages, preloadVideo } from '@/utils/preload';
import { buildingFaces as staticBuildingFaces } from '@/data/buildingData';
import { floorsData as staticFloorsData } from '@/data/floors';
import config from '@/config/config';
import { getFeatures } from '@/app/actions/features';
import defaultFeatures from '@/data/features.json';

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

const TikTokIcon = ({ size = 24, className = "" }: { size?: number, className?: string }) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
    </svg>
);

const IconMap: Record<string, any> = {
    Home, Building2, Box, Layers, Image, Rotate3D, Mountain, Video, Download, MapPin, Construction, Phone, Facebook, Instagram
};

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
    const router = useRouter();
    const pathname = usePathname();

    const storeFloorsData = useStore(state => state.floorsData);
    const storeBuildingFacesData = useStore(state => state.buildingFacesData);
    const timeOfDay = useStore(state => state.timeOfDay);

    const floorsData = storeFloorsData && storeFloorsData.length > 0 ? storeFloorsData : staticFloorsData;
    const buildingFacesData = storeBuildingFacesData && storeBuildingFacesData.length > 0 ? storeBuildingFacesData : staticBuildingFaces;

    const [activeFeatures, setActiveFeatures] = useState<any[]>(defaultFeatures);

    useEffect(() => {
        getFeatures().then(dbFeatures => {
            if (dbFeatures) {
                // If it's a legacy object format, wrap it, but it should be an array.
                if (Array.isArray(dbFeatures)) {
                    setActiveFeatures(dbFeatures);
                }
            }
        }).catch(e => console.error("Error fetching features:", e));
    }, []);

    // Preload triggers
    useEffect(() => {
        if (isOpen && buildingFacesData.length > 0) {
            // "El edificio" (Showroom) Critical Path
            const face0 = buildingFacesData[0];
            if (face0) {
                preloadVideo(getAssetUrl('videos/walks/trans_intro_to_0.mp4')).catch(() => { });
                const currentAssetSet = timeOfDay === 'day' ? face0.day : face0.night;
                if (currentAssetSet?.background) {
                    preloadImages([currentAssetSet.background]).catch(() => { });
                }
                if (currentAssetSet?.introVideo) {
                    preloadVideo(currentAssetSet.introVideo).catch(() => { });
                }
            }

            // Default Floor 9 Image
            const defaultFloor = floorsData.find(f => f.id === '9');
            if (defaultFloor) {
                preloadImages([defaultFloor.floorPlanImage]).catch(() => { });
            }
        }
    }, [isOpen, buildingFacesData, floorsData, timeOfDay]);

    const menuItems = activeFeatures.filter(item => item.active && item.id !== "identity");

    const toggleBrochure = useStore(state => state.toggleBrochure);

    const handleNavigation = (path?: string, action?: string) => {
        if (action === 'brochure') {
            toggleBrochure(true);
            onClose();
            return;
        }

        if (path) {
            if (path.startsWith('/')) {
                // Pass transition state for Showroom via Query Params for Next.js
                if (path === '/showroom') {
                    router.push('/showroom?transition=intro');
                }
                // Route Floors through Showroom for the transition video
                else if (path === '/plantas') {
                    router.push('/showroom?transition=floors&targetPath=/plantas');
                }
                else {
                    router.push(path);
                }
            }
            onClose();
        }
    };

    const handleMouseEnter = (key?: string) => {
        if (!key) return;

        const face0 = buildingFacesData[0];
        const currentAssetSet = face0 ? (timeOfDay === 'day' ? face0.day : face0.night) : null;

        if (key === 'showroom' && buildingFacesData.length > 0) {
            if (face0) {
                preloadVideo(getAssetUrl('videos/walks/trans_intro_to_0.mp4')).catch(() => { });
                if (currentAssetSet?.background) preloadImages([currentAssetSet.background]).catch(() => { });
            }
        }
        else if (key === 'floors' && buildingFacesData.length > 0) {
            if (currentAssetSet?.introVideo) preloadVideo(currentAssetSet.introVideo).catch(() => { });

            const defaultFloor = floorsData.find(f => f.id === '9');
            if (defaultFloor) {
                preloadImages([defaultFloor.floorPlanImage]).catch(() => { });
            }
        }
    };

    const isItemActive = (path?: string) => {
        if (!path) return false;
        if (path === '/' && pathname === '/') return true;
        if (path !== '/' && pathname.startsWith(path)) return true;
        if (path === '/plantas' && pathname.startsWith('/plantas')) return true;
        return false;
    };

    const isForcedLandscape = useStore(state => state.isForcedLandscape);

    return (
        <>
            {/* Backdrop */}
            {!isForcedLandscape && (
                <div
                    className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                    onClick={onClose}
                />
            )}
            {/* Sidebar Panel */}
            <div className={`fixed top-0 left-0 bg-[#FCFBF9] border-r border-[#E5E3DF] z-[70] shadow-2xl transform transition-transform duration-300 ease-in-out flex flex-col 
        ${isForcedLandscape ? 'w-full h-full' : 'h-full w-[320px]'}
        ${isOpen ? 'translate-x-0 pointer-events-auto' : '-translate-x-full pointer-events-none'}
      `}>
                {/* Header (Common) */}
                {!isForcedLandscape && (
                    <div className="pt-8 pb-4 px-6 flex justify-between items-start relative bg-transparent shrink-0 z-10">
                        <div className="w-full flex justify-center">
                            <img src={getAssetUrl('identity/logo_full_black.png')} alt="Logo" className="h-24 object-contain" />
                        </div>
                        <button onClick={onClose} className="absolute top-6 right-6 text-zinc-400 hover:text-zinc-800 hover:scale-110 transition-all cursor-pointer">
                            <X size={20} />
                        </button>
                    </div>
                )}

                {/* FORCED LANDSCAPE LAYOUT (Grid) */}
                {isForcedLandscape ? (
                    <div className="flex-1 flex flex-col p-6 relative">
                        {/* Controls Container */}
                        <div className="absolute top-6 right-6 flex items-center gap-3 z-20">

                            <button onClick={onClose} className="p-2 bg-white/80 border border-[#E5E3DF] rounded-full text-zinc-500 hover:text-zinc-800 hover:bg-white transition-colors z-20 cursor-pointer">
                                <X size={24} />
                            </button>
                        </div>

                        {/* Logo - Smaller, Top Left or Center */}
                        <div className="absolute top-6 left-6 z-20">
                            <img src={getAssetUrl('identity/logo_full_black.png')} alt="Logo" className="h-10 object-contain" />
                        </div>

                        {/* Grid Content */}
                        <div className="flex-1 flex items-center justify-center w-full h-full mt-4 relative z-10">
                            <div className="grid grid-cols-5 gap-6 w-full max-w-4xl px-8">
                                {menuItems.map((item) => {
                                    const active = isItemActive(item.path);
                                    const IconComponent = IconMap[item.icon] || Box;
                                    return (
                                        <button
                                            key={item.label}
                                            onClick={() => handleNavigation(item.path, (item as any).action)}
                                            className={`flex flex-col items-center justify-center gap-3 p-4 rounded-xl border transition-all hover:bg-white/95 group cursor-pointer
                                        ${active ? 'border-brand-primary bg-brand-primary/10 shadow-[0_4px_12px_rgba(12,90,91,0.08)]' : 'border-[#E5E3DF] bg-white/70'}
                                    `}
                                        >
                                            <div className={`p-3 rounded-full transition-all group-hover:scale-110
                                         ${active ? 'text-brand-primary' : 'text-zinc-400 group-hover:text-zinc-600'}
                                    `}>
                                                <IconComponent size={26} strokeWidth={1.5} />
                                            </div>
                                            <span className={`text-xs font-semibold uppercase tracking-wider ${active ? 'text-brand-primary font-bold' : 'text-zinc-500 group-hover:text-zinc-800'}`}>
                                                {item.label}
                                            </span>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Footer - Bottom Row */}
                        <div className="absolute bottom-6 left-0 w-full flex justify-center items-center gap-6 text-zinc-500 z-10">
                            <div className="flex gap-4">
                                {config.company?.buildingSocials?.facebook && (
                                    <a href={config.company.buildingSocials.facebook} target="_blank" rel="noopener noreferrer"
                                        className="w-9 h-9 border border-[#E5E3DF] rounded-full hover:border-brand-primary flex items-center justify-center text-zinc-500 hover:text-brand-primary hover:bg-brand-primary/5 transition-all cursor-pointer">
                                        <Facebook size={16} />
                                    </a>
                                )}
                                {config.company?.buildingSocials?.instagram && (
                                    <a href={config.company.buildingSocials.instagram} target="_blank" rel="noopener noreferrer"
                                        className="w-9 h-9 border border-[#E5E3DF] rounded-full hover:border-brand-primary flex items-center justify-center text-zinc-500 hover:text-brand-primary hover:bg-brand-primary/5 transition-all cursor-pointer">
                                        <Instagram size={16} />
                                    </a>
                                )}
                                {config.company?.buildingSocials?.tiktok && (
                                    <a href={config.company.buildingSocials.tiktok} target="_blank" rel="noopener noreferrer"
                                        className="w-9 h-9 border border-[#E5E3DF] rounded-full hover:border-brand-primary flex items-center justify-center text-zinc-500 hover:text-brand-primary hover:bg-brand-primary/5 transition-all cursor-pointer">
                                        <TikTokIcon size={16} />
                                    </a>
                                )}
                            </div>
                            <div className="h-4 w-px bg-[#E5E3DF]" />
                            <img
                                src={getAssetUrl('identity/LOGO_INMOBILIARIA.png')}
                                alt={config.company?.realStateName || 'Inmobiliaria Logo'}
                                className="h-6 w-auto object-contain opacity-85 hover:opacity-100 transition-opacity"
                            />
                            <div className="h-4 w-px bg-[#E5E3DF]" />
                            <p className="text-[10px] text-zinc-400 font-secondary select-none">
                                {new Date().getFullYear()}© {config.company?.developer || 'RIVISION.pe'}
                            </p>
                        </div>
                    </div>
                ) : (
                    /* STANDARD PORTRAIT / DESKTOP LAYOUT (List) */
                    <>
                        {/* Menu Items */}
                        <div className="flex-1 overflow-y-auto py-2 scrollbar-thin relative z-10">
                            <ul className="flex flex-col gap-2 px-4">
                                {menuItems.map((item) => {
                                    const active = isItemActive(item.path);
                                    const IconComponent = IconMap[item.icon] || Box;
                                    return (
                                        <li key={item.label}>
                                            <button
                                                onClick={() => handleNavigation(item.path, (item as any).action)}
                                                onMouseEnter={() => handleMouseEnter((item as any).preloadKey)}
                                                className={`w-full flex items-center gap-4 px-4 py-2 rounded-xl border text-sm font-semibold transition-all duration-300 cursor-pointer group 
                                                ${active
                                                        ? 'border-brand-primary/30 bg-brand-primary/10 text-brand-primary shadow-[0_4px_12px_rgba(12,90,91,0.06)]'
                                                        : 'border-transparent bg-transparent text-zinc-600 hover:bg-brand-primary/5 hover:border-brand-primary/15 hover:text-brand-primary'
                                                    }`}
                                            >
                                                {/* Icon container */}
                                                <div className={`w-9 h-9 flex items-center justify-center rounded-lg transition-all duration-300 group-hover:scale-105
                                                    ${active
                                                        ? 'text-brand-primary'
                                                        : 'text-zinc-400 group-hover:text-brand-primary'
                                                    }`}
                                                >
                                                    <IconComponent
                                                        size={18}
                                                        strokeWidth={2}
                                                    />
                                                </div>
                                                <span className="font-primary tracking-wide text-[14px] transition-colors duration-300">
                                                    {item.label}
                                                </span>
                                            </button>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>

                        {/* Footer */}
                        <div className="p-8 pb-10 mt-auto text-center bg-transparent shrink-0 relative z-10">
                            {/* Social circles */}
                            <div className="flex justify-center gap-4 mb-6 border-t border-[#E5E3DF] pt-6">
                                {config.company?.buildingSocials?.facebook && (
                                    <a href={config.company.buildingSocials.facebook} target="_blank" rel="noopener noreferrer"
                                        className="w-9 h-9 border border-[#E5E3DF] rounded-full hover:border-brand-primary flex items-center justify-center text-zinc-500 hover:text-brand-primary hover:bg-brand-primary/5 transition-all cursor-pointer">
                                        <Facebook size={16} />
                                    </a>
                                )}
                                {config.company?.buildingSocials?.instagram && (
                                    <a href={config.company.buildingSocials.instagram} target="_blank" rel="noopener noreferrer"
                                        className="w-9 h-9 border border-[#E5E3DF] rounded-full hover:border-brand-primary flex items-center justify-center text-zinc-500 hover:text-brand-primary hover:bg-brand-primary/5 transition-all cursor-pointer">
                                        <Instagram size={16} />
                                    </a>
                                )}
                                {config.company?.buildingSocials?.tiktok && (
                                    <a href={config.company.buildingSocials.tiktok} target="_blank" rel="noopener noreferrer"
                                        className="w-9 h-9 border border-[#E5E3DF] rounded-full hover:border-brand-primary flex items-center justify-center text-zinc-500 hover:text-brand-primary hover:bg-brand-primary/5 transition-all cursor-pointer">
                                        <TikTokIcon size={16} />
                                    </a>
                                )}
                            </div>

                            <div className="flex flex-col items-center gap-2">
                                <p className='text-base font-primary text-[#787570] font-light uppercase'>Kayen Inmobiliaria</p>
                                <p className="text-[10px] text-zinc-400 font-secondary select-none">{new Date().getFullYear()}© {config.company?.developer || 'RIVISION.pe'}</p>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </>
    );
};

export default Sidebar;
