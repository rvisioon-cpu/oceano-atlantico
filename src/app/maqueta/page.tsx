"use client";
import { useState } from 'react';
import { Menu } from 'lucide-react';
import Sidebar from '@/components/layout/Sidebar';
import LogoLoader from '@/components/UI/LogoLoader';
import config from '@/config/config';

const MaquetaPage = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    return (
        <div className="h-full w-full bg-black relative overflow-hidden">
            {/* GLOBAL SIDEBAR */}
            <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

            {/* GLOBAL SIDEBAR TOGGLE */}
            <button 
                onClick={() => setIsSidebarOpen(true)}
                className="fixed top-6 right-6 z-50 p-2 text-white bg-brand-primary rounded-full hover:bg-brand-dark-orange shadow-md transition-colors cursor-pointer"
            >
                <Menu size={24} />
            </button>

            {/* LOADING STATE */}
            {isLoading && <LogoLoader className="absolute inset-0 z-40 bg-black flex items-center justify-center" />}

            {/* IFRAME CONTAINER */}
            <div className="w-full h-full">
                <iframe 
                    style={{ width: '100%', height: '100%', border: 'none' }} 
                    scrolling="no"
                    allowFullScreen 
                    allow="gyroscope; accelerometer; xr-spatial-tracking; vr;"
                    src={config.company?.maquetaUrl || ""}
                    title="Maqueta Virtual"
                    onLoad={() => setIsLoading(false)}
                />
            </div>
        </div>
    );
};

export default MaquetaPage;
