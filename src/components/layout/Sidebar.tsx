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
// Paths run from x=-80 to x=1520 so the subtle horizontal drift never exposes a gap.
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
                fill="#1593c2"
                fillOpacity="0.9"
                d="M-80,32 C 200,24 380,40 640,32 S 1040,24 1260,32 S 1500,36 1520,32 L1520,46 L-80,46 Z"
            />
            <path
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

    // ── FORCED LANDSCAPE (rotated frame): bottom positioning is unreliable, so we
    // use a full-screen ocean overlay that fades in instead of sliding from the bottom.
    if (isForcedLandscape) {
        return (
            <div
                className={`fixed inset-0 z-[70] flex flex-col bg-gradient-to-b from-ocean-600 via-ocean-700 to-ocean-800 transition-opacity duration-400
                    ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
            >
                <WaveCrest className="rotate-180 shrink-0" />

                <button onClick={onClose} className="absolute top-5 right-5 p-2 bg-white/10 border border-white/25 rounded-full text-white/80 hover:text-white hover:bg-white/20 transition-colors z-20 cursor-pointer">
                    <X size={22} />
                </button>

                <div className="absolute top-5 left-6 z-20">
                    <img src="/identity/identity_logo_white.png" alt={config.appName} className="h-9 object-contain" />
                </div>

                <div className="flex-1 flex items-center justify-center w-full px-8">
                    <div className="grid grid-cols-5 gap-5 w-full max-w-4xl">
                        {menuItems.map((item) => {
                            const active = isItemActive(item.path);
                            const IconComponent = IconMap[item.icon] || Box;
                            return (
                                <button
                                    key={item.label}
                                    onClick={() => handleNavigation(item.path, (item as any).action)}
                                    onMouseEnter={() => handleMouseEnter((item as any).preloadKey)}
                                    className={`flex flex-col items-center justify-center gap-2.5 p-4 rounded-2xl border transition-all group cursor-pointer
                                        ${active
                                            ? 'border-white bg-white text-ocean-700 shadow-lg'
                                            : 'border-white/20 bg-white/5 text-white/85 hover:bg-white/15 hover:text-white'}`}
                                >
                                    <IconComponent size={26} strokeWidth={1.75} className="transition-transform group-hover:scale-110" />
                                    <span className="text-[11px] font-semibold uppercase tracking-wider text-center leading-tight">
                                        {item.label}
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                <div className="shrink-0 px-8 pb-6 flex items-center justify-center gap-6">
                    <SocialLinks />
                    <div className="h-5 w-px bg-white/25" />
                    <img src="/identity/logo_inmobiliaria_white.png" alt={config.company?.realStateName} className="h-7 w-auto object-contain opacity-90" />
                    <div className="h-5 w-px bg-white/25" />
                    <p className="text-[10px] text-white/60 font-secondary select-none">
                        {new Date().getFullYear()}© {config.company?.developer}
                    </p>
                </div>
            </div>
        );
    }

    // ── STANDARD WEB: bottom navigation bar that slides up, crested with ocean waves.
    return (
        <>
            {/* Backdrop */}
            <div
                className={`fixed inset-0 bg-ocean-900/40 backdrop-blur-[2px] z-[60] transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={onClose}
            />

            {/* Bottom Wave Navigation */}
            <nav
                aria-label="Navegación principal"
                className={`fixed bottom-0 left-0 w-full z-[70] transform transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]
                    ${isOpen ? 'translate-y-0' : 'translate-y-full'}`}
            >
                <WaveCrest />

                <div className="relative bg-gradient-to-b from-ocean-600 via-ocean-700 to-ocean-800 px-4 pt-1 pb-5 shadow-[0_-14px_40px_rgba(8,40,60,0.35)]">
                    {/* Header row: building logo + close */}
                    <div className="flex items-center justify-between px-1 pb-2">
                        <img src="/identity/identity_logo_white.png" alt={config.appName} className="h-9 object-contain" />
                        <button onClick={onClose} className="p-2 -mr-1 text-white/70 hover:text-white hover:scale-110 transition-all cursor-pointer">
                            <X size={22} />
                        </button>
                    </div>

                    {/* Menu items: centered on wide screens, horizontally scrollable on narrow */}
                    <ul className="flex gap-2 overflow-x-auto scrollbar-thin pb-1 justify-start lg:justify-center">
                        {menuItems.map((item) => {
                            const active = isItemActive(item.path);
                            const IconComponent = IconMap[item.icon] || Box;
                            return (
                                <li key={item.label} className="shrink-0">
                                    <button
                                        onClick={() => handleNavigation(item.path, (item as any).action)}
                                        onMouseEnter={() => handleMouseEnter((item as any).preloadKey)}
                                        className={`group w-[80px] flex flex-col items-center gap-1.5 rounded-2xl px-2 py-2.5 transition-all duration-300 cursor-pointer
                                            ${active
                                                ? 'bg-white text-ocean-700 shadow-lg'
                                                : 'text-white/85 hover:bg-white/12 hover:text-white'}`}
                                    >
                                        <div className="w-7 h-7 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                                            <IconComponent size={20} strokeWidth={2} />
                                        </div>
                                        <span className="font-primary text-[11px] font-semibold tracking-wide text-center leading-tight whitespace-nowrap">
                                            {item.label}
                                        </span>
                                    </button>
                                </li>
                            );
                        })}
                    </ul>

                    {/* Footer: socials · inmobiliaria logo · credit */}
                    <div className="mt-3 pt-3 border-t border-white/15 flex items-center justify-between gap-4">
                        <SocialLinks />
                        <div className="flex items-center gap-3">
                            <img src="/identity/logo_inmobiliaria_white.png" alt={config.company?.realStateName} className="h-7 w-auto object-contain opacity-90" />
                            <div className="hidden sm:block h-5 w-px bg-white/20" />
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
