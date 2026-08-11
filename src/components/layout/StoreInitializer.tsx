"use client";

import { useEffect, useRef } from "react";
import { useStore } from "@/store/useStore";
import { getFloorsData } from "@/app/actions/units";
import { getBuildingFacesData } from "@/app/actions/building";
import type { Floor } from "@/data/floors";

interface StoreInitializerProps {
  initialFloorsData: Floor[];
  initialBuildingFacesData: any[];
}

export default function StoreInitializer({ initialFloorsData, initialBuildingFacesData }: StoreInitializerProps) {
  const initialized = useRef(false);

  // Sync state during SSR / first render
  if (!initialized.current) {
    useStore.setState({ 
      floorsData: initialFloorsData,
      buildingFacesData: initialBuildingFacesData
    });
    initialized.current = true;
  }

  // Background sync only if initial SSR data was empty
  useEffect(() => {
    if (!initialFloorsData || initialFloorsData.length === 0) {
      getFloorsData()
        .then((data) => {
          useStore.setState({ floorsData: data as Floor[] });
        })
        .catch((err) => {
          console.error("Failed to sync floor data in background:", err);
        });
    }

    if (!initialBuildingFacesData || initialBuildingFacesData.length === 0) {
      getBuildingFacesData()
        .then((data) => {
          useStore.setState({ buildingFacesData: data as any[] });
        })
        .catch((err) => {
          console.error("Failed to sync building faces data in background:", err);
        });
    }
  }, [initialFloorsData, initialBuildingFacesData]);

  return null;
}

