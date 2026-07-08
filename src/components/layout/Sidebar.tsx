"use client";
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { X, Home, Building2, Layers, Image, Rotate3D, Video, Download, MapPin, Phone, Facebook, Instagram, Mountain, Box, Construction } from 'lucide-react';
import { getAssetUrl } from '@/utils/assets';
import { useStore } from '@/store/useStore';
import { preloadImages, preloadVideo } from '@/utils/preload';
import { buildingFaces as staticBuildingFaces } from '@/data/buildingData';
import { floorsData as staticFloorsData, getEntryFloorId } from '@/data/floors';
import config from '@/config/config';
import { getFeatures } from '@/app/actions/features';
import defaultFeatures from '@/data/features.json';
import LiquidMenuBackground from './LiquidMenuBackground';

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

// Decorative layered ocean waves that crest along the top edge of the navigation.
// All 4 layers animate at different speeds for an organic, living ocean surface.
// Paths run from x=-80 to x=1520 so the horizontal drift never exposes a gap.
const WaveCrest = ({ className = "" }: { className?: string }) => (
    <div className={`pointer-events-none relative h-[46px] w-full overflow-hidden ${className}`}>
        <svg
            className="absolute inset-0 h-full w-full"
            viewBox="0 0 1440 46"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                className="animate-wave-slow"
                fill="#62cdde"
                fillOpacity="0.55"
                d="M-80,18 C 160,4 320,28 560,18 S 980,2 1200,18 S 1480,26 1520,18 L1520,46 L-80,46 Z"
            />
            <path
                className="animate-wave-fast"
                fill="#2fb4cd"
                fillOpacity="0.8"
                d="M-80,26 C 180,14 360,34 600,26 S 1020,14 1240,26 S 1500,32 1520,26 L1520,46 L-80,46 Z"
            />
            <path
                className="animate-wave-medium"
                fill="#1593c2"
                fillOpacity="0.9"
                d="M-80,32 C 200,24 380,40 640,32 S 1040,24 1260,32 S 1500,36 1520,32 L1520,46 L-80,46 Z"
            />
            <path
                className="animate-wave-deep"
                fill="#0e74a3"
                d="M-80,38 C 220,32 420,44 700,38 S 1080,32 1300,38 S 1500,40 1520,38 L1520,46 L-80,46 Z"
            />
        </svg>
    </div>
);

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
            const defaultFloor = floorsData.find(f => f.id === getEntryFloorId(floorsData));
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

            const defaultFloor = floorsData.find(f => f.id === getEntryFloorId(floorsData));
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

    const SocialLinks = ({ size = 16 }: { size?: number }) => (
        <div className="flex gap-3">
            {config.company?.buildingSocials?.facebook && (
                <a href={config.company.buildingSocials.facebook} target="_blank" rel="noopener noreferrer"
                    className="w-9 h-9 border border-white/25 rounded-full flex items-center justify-center text-white/80 hover:text-white hover:border-white hover:bg-white/10 transition-all cursor-pointer">
                    <Facebook size={size} />
                </a>
            )}
            {config.company?.buildingSocials?.instagram && (
                <a href={config.company.buildingSocials.instagram} target="_blank" rel="noopener noreferrer"
                    className="w-9 h-9 border border-white/25 rounded-full flex items-center justify-center text-white/80 hover:text-white hover:border-white hover:bg-white/10 transition-all cursor-pointer">
                    <Instagram size={size} />
                </a>
            )}
            {config.company?.buildingSocials?.tiktok && (
                <a href={config.company.buildingSocials.tiktok} target="_blank" rel="noopener noreferrer"
                    className="w-9 h-9 border border-white/25 rounded-full flex items-center justify-center text-white/80 hover:text-white hover:border-white hover:bg-white/10 transition-all cursor-pointer">
                    <TikTokIcon size={size} />
                </a>
            )}
        </div>
    );

    // ── FORCED LANDSCAPE (rotated frame): a true bottom bar can't be used because
    // the frame is rotated 90°, so we use a full-screen ocean overlay — but with the
    // same ocean gradient, wave crest and white-pill items as the desktop bottom bar.
    if (isForcedLandscape) {
        return (
            <div
                className={`fixed inset-0 z-[70] isolate overflow-hidden flex flex-col bg-gradient-to-b from-ocean-600 via-ocean-700 to-ocean-800 transition-opacity duration-400
                    ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
            >
                {isOpen && <LiquidMenuBackground />}

                <div className="relative z-10 flex flex-1 flex-col">
                {/* Header strip (logo + close) capped by the same ocean wave crest */}
                <div className="shrink-0 flex items-center justify-between px-6 pt-5 pb-2 bg-ocean-600">
                    <img src="/identity/identity_logo_white.png" alt={config.appName} className="h-9 object-contain" />
                    <button onClick={onClose} className="p-2 -mr-1 text-white/75 hover:text-white hover:scale-110 transition-all cursor-pointer">
                        <X size={24} />
                    </button>
                </div>
                <WaveCrest className="rotate-180 shrink-0 -mt-px" />

                {/* Menu items */}
                <div className="flex-1 flex items-center justify-center w-full px-6">
                    <ul className="grid grid-cols-5 gap-4 w-full max-w-4xl">
                        {menuItems.map((item) => {
                            const active = isItemActive(item.path);
                            const IconComponent = IconMap[item.icon] || Box;
                            return (
                                <li key={item.label}>
                                    <button
                                        onClick={() => handleNavigation(item.path, (item as any).action)}
                                        onMouseEnter={() => handleMouseEnter((item as any).preloadKey)}
                                        className={`w-full flex flex-col items-center justify-center gap-2 p-3 rounded-2xl transition-all duration-300 group cursor-pointer
                                            ${active
                                                ? 'bg-white text-ocean-700 shadow-lg'
                                                : 'text-white/85 hover:bg-white/12 hover:text-white'}`}
                                    >
                                        <IconComponent size={24} strokeWidth={1.9} className="transition-transform group-hover:scale-110" />
                                        <span className="font-primary text-[11px] font-semibold tracking-wide text-center leading-tight">
                                            {item.label}
                                        </span>
                                    </button>
                                </li>
                            );
                        })}
                    </ul>
                </div>

                {/* Footer */}
                <div className="shrink-0 px-6 pb-6 flex items-center justify-center gap-5">
                    <SocialLinks />
                    <div className="h-5 w-px bg-white/25" />
                    <img src="/identity/logo_inmobiliaria_white.png" alt={config.company?.realStateName} className="h-7 w-auto object-contain opacity-90" />
                    <div className="hidden sm:block h-5 w-px bg-white/25" />
                    <p className="hidden sm:block text-[10px] text-white/60 font-secondary select-none">
                        {new Date().getFullYear()}© {config.company?.developer}
                    </p>
                </div>
                </div>
            </div>
        );
    }

    // ── STANDARD WEB: bottom navigation bar that slides up, crested with ocean waves.
    return (
        <>
            {/* Backdrop — no blur, just dark overlay */}
            <div
                className={`fixed inset-0 bg-ocean-900/50 z-[60] transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={onClose}
            />

            {/* Bottom Wave Navigation */}
            <nav
                aria-label="Navegación principal"
                className={`sidebar-nav group fixed bottom-0 left-0 w-full z-[70] transform transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]
                    ${isOpen ? 'translate-y-0' : 'translate-y-full'}`}
            >
                <WaveCrest />

                <div className="relative isolate overflow-hidden bg-gradient-to-b from-ocean-600 via-ocean-700 to-ocean-800 px-4 pt-0 pb-3 shadow-[0_-14px_40px_rgba(8,40,60,0.35)]">
                    {isOpen && <LiquidMenuBackground />}

                    {/* Header row: building logo + close — logo hidden on homepage (desktop) */}
                    <div className="relative z-10 flex items-center justify-between px-1 pb-1.5">
                        {pathname === '/' ? (
                            <span className="h-7" />
                        ) : (
                            <img src="/identity/identity_logo_white.png" alt={config.appName} className="h-7 object-contain" />
                        )}
                        <button onClick={onClose} className="p-1.5 -mr-1 text-white/70 hover:text-white hover:scale-110 transition-all cursor-pointer relative z-10">
                            <X size={20} />
                        </button>
                    </div>

                    {/* Menu items: centered on wide screens, horizontally scrollable on narrow */}
                    <ul className="relative z-10 flex gap-1.5 overflow-x-auto scrollbar-thin pb-0.5 justify-start lg:justify-center">
                        {menuItems.map((item) => {
                            const active = isItemActive(item.path);
                            const IconComponent = IconMap[item.icon] || Box;
                            return (
                                <li key={item.label} className="shrink-0">
                                    <button
                                        onClick={() => handleNavigation(item.path, (item as any).action)}
                                        onMouseEnter={() => handleMouseEnter((item as any).preloadKey)}
                                        className={`group/item w-[76px] flex flex-col items-center gap-1 rounded-2xl px-1.5 py-2 transition-all duration-300 cursor-pointer
                                            ${active
                                                ? 'bg-white text-ocean-700 shadow-lg'
                                                : 'text-white/85 hover:bg-white/12 hover:text-white'}`}
                                    >
                                        <div className="w-6 h-6 flex items-center justify-center transition-transform duration-300 group-hover/item:scale-110">
                                            <IconComponent size={18} strokeWidth={2} />
                                        </div>
                                        <span className="font-primary text-[10px] font-semibold tracking-wide text-center leading-tight whitespace-nowrap">
                                            {item.label}
                                        </span>
                                    </button>
                                </li>
                            );
                        })}
                    </ul>

                    {/* Footer: socials · inmobiliaria logo · credit */}
                    <div className="relative z-10 mt-2 pt-2 border-t border-white/15 flex items-center justify-between gap-4">
                        <SocialLinks />
                        <div className="flex items-center gap-3">
                            <img src="/identity/logo_inmobiliaria_white.png" alt={config.company?.realStateName} className="h-6 w-auto object-contain opacity-90" />
                            <div className="hidden sm:block h-4 w-px bg-white/20" />
                            <p className="hidden sm:block text-[10px] text-white/55 font-secondary select-none whitespace-nowrap">
                                {new Date().getFullYear()}© {config.company?.developer}
                            </p>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Sidebar;
