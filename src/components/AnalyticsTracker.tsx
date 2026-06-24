"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export default function AnalyticsTracker() {
  const pathname = usePathname();
  const lastTrackedPath = useRef<string | null>(null);

  useEffect(() => {
    if (!pathname) return;

    // Do not track visits to dashboard, admin pages, login, or API endpoints
    if (
      pathname.startsWith("/dashboard") ||
      pathname.startsWith("/login") ||
      pathname.startsWith("/api")
    ) {
      return;
    }

    // Prevent double tracking in React StrictMode
    if (lastTrackedPath.current === pathname) {
      return;
    }
    lastTrackedPath.current = pathname;

    // Client-side device detection
    let deviceType = "desktop";
    if (typeof window !== "undefined") {
      const width = window.innerWidth;
      if (width < 768) {
        deviceType = "mobile";
      } else if (width < 1024) {
        deviceType = "tablet";
      }
    }

    // Fire page view event
    fetch("/api/analytics/hit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        path: pathname,
        deviceType,
      }),
    }).catch((err) => {
      console.error("Failed to register page view event:", err);
    });
  }, [pathname]);

  return null;
}
