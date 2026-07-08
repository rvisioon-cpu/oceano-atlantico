"use client";
import { useEffect, useRef } from 'react';

// ── Delicate ocean tuning for threejs-components/liquid1 ────────────────────
// liquid1 is a reflective water surface: the cursor drops ripples, optional
// "rain" adds ambient droplets, and the plane refracts whatever image we feed
// it. There is no colour option, so we hand it a brand-blue gradient texture
// and keep every amplitude low so the motion stays subtle ("más delicado").
const OCEAN_STOPS = ['#1aa0d0', '#0e74a3', '#0a3f57', '#082e40']; // top → bottom
const DISPLACEMENT_SCALE = 0.5; // ripple refraction strength (lower = calmer)
const ATTENUATION = 0.982;      // ripple decay per frame (lower = settles sooner)
const RAIN_INTERVAL = 0.7;      // seconds between ambient droplets (higher = fewer)

const LIQUID_MODULE = 'threejs-components/build/backgrounds/liquid1.min.js';

// A tall 1px-wide vertical gradient in the brand blues; the ripples refract it.
function oceanGradientDataUrl(): string {
    const c = document.createElement('canvas');
    c.width = 8;
    c.height = 256;
    const ctx = c.getContext('2d');
    if (!ctx) return '';
    const grad = ctx.createLinearGradient(0, 0, 0, c.height);
    OCEAN_STOPS.forEach((color, i) => grad.addColorStop(i / (OCEAN_STOPS.length - 1), color));
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, c.width, c.height);
    return c.toDataURL('image/png');
}

export default function LiquidMenuBackground() {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        if (typeof window === 'undefined') return;
        // Honour reduced-motion: leave the flat ocean gradient in place.
        if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;

        const canvas = canvasRef.current;
        if (!canvas) return;

        let bg: any;
        let cancelled = false;

        import(/* webpackIgnore: true */ /* @vite-ignore */ LIQUID_MODULE)
            .then((mod) => {
                if (cancelled || !canvasRef.current) return;
                const LiquidBackground = mod.default;
                bg = LiquidBackground(canvas);

                // Dial everything down toward a gentle, on-brand ripple.
                try { bg.setRainTime(RAIN_INTERVAL); } catch { /* noop */ }
                try { bg.liquidPlane.uniforms.displacementScale.value = DISPLACEMENT_SCALE; } catch { /* noop */ }
                try { bg.liquidPlane.attenuation = ATTENUATION; } catch { /* noop */ }

                const img = oceanGradientDataUrl();
                if (img) bg.loadImage(img).catch(() => { /* noop */ });
            })
            .catch((e) => console.error('Liquid background failed to load:', e));

        return () => {
            cancelled = true;
            try { bg?.dispose?.(); } catch { /* noop */ }
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-0 h-full w-full mix-blend-screen opacity-60"
        />
    );
}
