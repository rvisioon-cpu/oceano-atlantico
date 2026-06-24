"use client";

import { useStore } from "@/store/useStore";
import { usePathname } from "next/navigation";

export default function ForcedLandscapeWrapper({ children }: { children: React.ReactNode }) {
  const isForcedLandscape = useStore((state) => state.isForcedLandscape);
  const pathname = usePathname();

  // Exclude dashboard, login, and ubicacion routes from rotation
  const isExcluded = pathname?.startsWith('/dashboard') || pathname?.startsWith('/login') || pathname?.startsWith('/ubicacion');

  if (isForcedLandscape && !isExcluded) {
    return (
      <div 
        className="w-screen h-screen relative"
        style={{
          width: '100vh',
          height: '100vw',
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%) rotate(90deg)',
          zIndex: 1,
          overflow: 'hidden',
          backgroundColor: 'black'
        }}
      >
        {children}
      </div>
    );
  }

  return <>{children}</>;
}
