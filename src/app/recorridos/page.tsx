"use client";

import { useState, useEffect, useMemo, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Play, SlidersHorizontal, X } from 'lucide-react';
import { getToursPublic } from '@/app/actions/tours';
import Sidebar from '@/components/layout/Sidebar';
import TourHeader from '@/components/UI/TourHeader';
import FullScreenToggle from '@/components/UI/FullScreenToggle';
import Loader from '@/components/UI/Loader';
import { getAssetUrl } from '@/utils/assets';

interface Tour {
  id: string;
  title: string;
  subtitle: string;
  thumbnail: string;
  type: 'unit' | 'building';
  target: string;
  floorName?: string;
  floorLevel?: number;
  bedrooms?: number;
  bathrooms?: number;
  areaSqm?: number;
}

const ALL = 'all';

// Area is a continuous value, so it is filtered in bands rather than by exact
// match. Bands are derived from the tours actually on offer so the dropdown
// never lists a range with nothing in it.
const AREA_BAND_SIZE = 25;

interface AreaBand {
  id: string;
  label: string;
  min: number;
  max: number; // exclusive; Infinity on the last band so the largest unit matches
}

const RecorridosContent = () => {
  const [tours, setTours] = useState<Tour[]>([]);
  const [selectedTour, setSelectedTour] = useState<Tour | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // Filters
  const [floorFilter, setFloorFilter] = useState<string>(ALL);
  const [bedroomsFilter, setBedroomsFilter] = useState<string>(ALL);
  const [bathroomsFilter, setBathroomsFilter] = useState<string>(ALL);
  const [areaFilter, setAreaFilter] = useState<string>(ALL);

  const searchParams = useSearchParams();
  const router = useRouter();

  // Fetch active tours from database
  useEffect(() => {
    async function loadTours() {
      try {
        const activeTours = await getToursPublic();
        const mapped = activeTours.map((t) => ({
          id: t.id,
          title: t.title,
          subtitle: t.subtitle || "",
          thumbnail: t.thumbnailUrl,
          type: t.type as 'unit' | 'building',
          target: t.targetUrl,
          floorName: t.floorName || undefined,
          floorLevel: t.floorLevel ?? undefined,
          bedrooms: t.bedrooms ?? undefined,
          bathrooms: t.bathrooms ?? undefined,
          areaSqm: t.areaSqm ?? undefined
        }));
        setTours(mapped);
      } catch (err) {
        console.error("Error loading tours:", err);
      } finally {
        setLoading(false);
      }
    }
    loadTours();
  }, []);

  // Sync selected tour based on URL search query parameter
  useEffect(() => {
    const tourId = searchParams.get('tourId');
    if (tourId && tours.length > 0) {
        const found = tours.find(t => t.id === tourId);
        if (found) setSelectedTour(found);
    }
  }, [searchParams, tours]);

  // ── Filter options, derived from the live tour list ──────────────────────
  // Every dropdown only offers values that exist, so a visitor can never land
  // on an empty result by picking a combination the catalogue doesn't have.

  const floorOptions = useMemo(() => {
    const seen = new Map<string, number>();
    tours.forEach(t => {
      if (t.floorName) seen.set(t.floorName, t.floorLevel ?? -Infinity);
    });
    // Highest floor first — matches how buyers think about a tower.
    return [...seen.entries()]
      .sort((a, b) => b[1] - a[1])
      .map(([name]) => name);
  }, [tours]);

  const bedroomOptions = useMemo(
    () => [...new Set(tours.map(t => t.bedrooms).filter((v): v is number => typeof v === 'number'))].sort((a, b) => a - b),
    [tours]
  );

  const bathroomOptions = useMemo(
    () => [...new Set(tours.map(t => t.bathrooms).filter((v): v is number => typeof v === 'number'))].sort((a, b) => a - b),
    [tours]
  );

  const areaBands = useMemo<AreaBand[]>(() => {
    const areas = tours.map(t => t.areaSqm).filter((v): v is number => typeof v === 'number');
    if (areas.length === 0) return [];

    const smallest = Math.min(...areas);
    const largest = Math.max(...areas);
    const start = Math.floor(smallest / AREA_BAND_SIZE) * AREA_BAND_SIZE;
    const end = Math.ceil(largest / AREA_BAND_SIZE) * AREA_BAND_SIZE;

    const bands: AreaBand[] = [];
    for (let lower = start; lower < end; lower += AREA_BAND_SIZE) {
      const upper = lower + AREA_BAND_SIZE;
      const isLast = upper >= end;
      bands.push({
        id: `${lower}`,
        // Areas are stored as decimals (e.g. 250.95); round for legibility.
        label: `${lower} – ${Math.round(isLast ? largest : upper)} m²`,
        min: lower,
        max: isLast ? Infinity : upper
      });
    }
    // Drop bands no unit falls into (gaps in the mix, e.g. nothing at 75–100).
    return bands.filter(b => areas.some(a => a >= b.min && a < b.max));
  }, [tours]);

  const hasUnitFilters = floorOptions.length > 0 || bedroomOptions.length > 0
    || bathroomOptions.length > 0 || areaBands.length > 0;

  const isFiltering = floorFilter !== ALL || bedroomsFilter !== ALL
    || bathroomsFilter !== ALL || areaFilter !== ALL;

  const filteredTours = useMemo(() => {
    if (!isFiltering) return tours;

    const band = areaBands.find(b => b.id === areaFilter);

    return tours.filter(tour => {
      if (floorFilter !== ALL && tour.floorName !== floorFilter) return false;
      if (bedroomsFilter !== ALL && tour.bedrooms !== Number(bedroomsFilter)) return false;
      if (bathroomsFilter !== ALL && tour.bathrooms !== Number(bathroomsFilter)) return false;
      if (band && !(typeof tour.areaSqm === 'number' && tour.areaSqm >= band.min && tour.areaSqm < band.max)) return false;
      return true;
    });
  }, [tours, isFiltering, floorFilter, bedroomsFilter, bathroomsFilter, areaFilter, areaBands]);

  const resetFilters = () => {
    setFloorFilter(ALL);
    setBedroomsFilter(ALL);
    setBathroomsFilter(ALL);
    setAreaFilter(ALL);
  };

  const handleTourClick = (tour: Tour) => {
      setSelectedTour(tour);
  };

  const closeViewer = () => {
    const tourId = searchParams.get('tourId');
    if (tourId) {
       router.back();
    } else {
       setSelectedTour(null);
    }
  };

  if (loading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-gray-50">
        <Loader />
      </div>
    );
  }

  if (selectedTour) {
    return (
      <div className="fixed inset-0 z-50 bg-black flex flex-col">
        {/* Viewer Header */}
        <div className="absolute top-0 left-0 w-full z-50">
           <TourHeader 
                title={selectedTour.title}
                subtitle={`${selectedTour.subtitle} ${selectedTour.floorName ? `- Piso ${selectedTour.floorName}` : ''}`}
                onBack={closeViewer}
            />
        </div>

        {/* Iframe Content */}
        <div className="flex-1 w-full h-full pt-0">
            <iframe 
                src={selectedTour.target} 
                className="w-full h-full border-0"
                allowFullScreen
                allow="xr-spatial-tracking; gyroscope; accelerometer"
            />
        </div>
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto bg-gray-50 flex flex-col font-sans">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      {/* Header */}
      <header className="fixed top-0 left-0 w-full z-40 px-6 py-6 flex justify-between items-center pointer-events-none">
        <div className="pointer-events-auto">
              <div className="relative group pointer-events-auto">
                <button 
                    onClick={() => setIsSidebarOpen(true)}
                    className="p-2 text-white bg-brand-primary/80 hover:bg-brand-primary backdrop-blur-xl border border-white/20 rounded-full shadow-lg transition-all hover:scale-105 cursor-pointer"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
                <span className="absolute left-full ml-3 top-1/2 -translate-y-1/2 px-2 py-1 bg-black/80 backdrop-blur-md text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none font-secondary tracking-wider uppercase">
                    Menú
                </span>
              </div>
        </div>
        <div className="pointer-events-auto">
             <FullScreenToggle />
        </div>
      </header>

      <div className="container mx-auto px-6 py-24">
        <div className="mb-12 text-center">
            <h1 className="text-4xl md:text-5xl font-serif text-gray-900 mb-4">Recorridos Virtuales</h1>
            <p className="text-gray-500 max-w-2xl mx-auto">
                Explora el edificio y sus unidades desde la comodidad de tu dispositivo. 
                Selecciona una opción para iniciar el recorrido 360°.
            </p>
        </div>

        {/* Filter bar — only rendered when the catalogue actually has unit data
            to filter on, so a building-only tour list stays uncluttered. */}
        {tours.length > 0 && hasUnitFilters && (
          <div className="mb-10 bg-white rounded-xl border border-gray-200/60 shadow-sm p-5">
            <div className="flex items-center gap-2 mb-4 text-gray-700">
              <SlidersHorizontal size={16} />
              <span className="text-xs uppercase tracking-widest font-medium">Filtrar recorridos</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {floorOptions.length > 0 && (
                <label className="flex flex-col gap-1.5">
                  <span className="text-xs text-gray-500">Piso</span>
                  <select
                    value={floorFilter}
                    onChange={e => setFloorFilter(e.target.value)}
                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-800 focus:border-brand-primary focus:outline-none focus:ring-1 focus:ring-brand-primary cursor-pointer"
                  >
                    <option value={ALL}>Todos</option>
                    {floorOptions.map(name => (
                      <option key={name} value={name}>Piso {name}</option>
                    ))}
                  </select>
                </label>
              )}

              {bedroomOptions.length > 0 && (
                <label className="flex flex-col gap-1.5">
                  <span className="text-xs text-gray-500">Habitaciones</span>
                  <select
                    value={bedroomsFilter}
                    onChange={e => setBedroomsFilter(e.target.value)}
                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-800 focus:border-brand-primary focus:outline-none focus:ring-1 focus:ring-brand-primary cursor-pointer"
                  >
                    <option value={ALL}>Todas</option>
                    {bedroomOptions.map(n => (
                      <option key={n} value={n}>{n} {n === 1 ? 'habitación' : 'habitaciones'}</option>
                    ))}
                  </select>
                </label>
              )}

              {bathroomOptions.length > 0 && (
                <label className="flex flex-col gap-1.5">
                  <span className="text-xs text-gray-500">Baños</span>
                  <select
                    value={bathroomsFilter}
                    onChange={e => setBathroomsFilter(e.target.value)}
                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-800 focus:border-brand-primary focus:outline-none focus:ring-1 focus:ring-brand-primary cursor-pointer"
                  >
                    <option value={ALL}>Todos</option>
                    {bathroomOptions.map(n => (
                      <option key={n} value={n}>{n} {n === 1 ? 'baño' : 'baños'}</option>
                    ))}
                  </select>
                </label>
              )}

              {areaBands.length > 0 && (
                <label className="flex flex-col gap-1.5">
                  <span className="text-xs text-gray-500">Metraje</span>
                  <select
                    value={areaFilter}
                    onChange={e => setAreaFilter(e.target.value)}
                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-800 focus:border-brand-primary focus:outline-none focus:ring-1 focus:ring-brand-primary cursor-pointer"
                  >
                    <option value={ALL}>Todos</option>
                    {areaBands.map(b => (
                      <option key={b.id} value={b.id}>{b.label}</option>
                    ))}
                  </select>
                </label>
              )}
            </div>

            {isFiltering && (
              <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between gap-4">
                <p className="text-xs text-gray-500">
                  {filteredTours.length} {filteredTours.length === 1 ? 'recorrido' : 'recorridos'} de {tours.length}
                </p>
                <button
                  onClick={resetFilters}
                  className="inline-flex items-center gap-1.5 text-xs text-gray-600 hover:text-brand-orange transition-colors cursor-pointer"
                >
                  <X size={14} />
                  Limpiar filtros
                </button>
              </div>
            )}
          </div>
        )}

        {tours.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl border border-gray-200/60 max-w-lg mx-auto shadow-sm">
            <p className="text-gray-500 text-sm">No hay recorridos virtuales activos por el momento.</p>
          </div>
        ) : filteredTours.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl border border-gray-200/60 max-w-lg mx-auto shadow-sm">
            <p className="text-gray-500 text-sm mb-4">Ningún recorrido coincide con los filtros seleccionados.</p>
            <button
              onClick={resetFilters}
              className="text-xs uppercase tracking-widest text-brand-orange hover:underline cursor-pointer"
            >
              Limpiar filtros
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredTours.map(tour => (
                  <div 
                      key={tour.id}
                      onClick={() => handleTourClick(tour)}
                      className="group relative bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1"
                  >
                      {/* Image Container */}
                      <div className="relative aspect-[4/3] overflow-hidden bg-neutral-100">
                          <img 
                              src={getAssetUrl(tour.thumbnail)} 
                              alt={tour.title}
                              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                              onError={(e) => { 
                                e.currentTarget.style.display = 'none'; 
                                e.currentTarget.parentElement!.style.backgroundColor = '#eaeaea'; 
                              }}
                          />
                          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                              <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center transform scale-90 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300">
                                  <Play className="text-white ml-1" fill="white" size={24} />
                              </div>
                          </div>
                          
                          {/* Type Badge */}
                          <div className="absolute top-4 left-4 px-3 py-1 bg-black/60 backdrop-blur-md rounded-full text-white text-xs uppercase tracking-wider font-medium">
                              {tour.type === 'building' ? 'Edificio' : `Piso ${tour.floorName || 'Unidad'}`}
                          </div>
                      </div>

                      {/* Content */}
                      <div className="p-6">
                          <h3 className="text-xl font-serif text-gray-900 mb-1 group-hover:text-brand-orange transition-colors">
                              {tour.title}
                          </h3>
                          <p className="text-gray-500 text-sm">
                              {tour.subtitle}
                          </p>

                          {/* Unit specs — the same attributes the filter bar works on */}
                          {(tour.bedrooms || tour.bathrooms || tour.areaSqm) && (
                            <div className="mt-3 pt-3 border-t border-gray-100 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-500">
                              {typeof tour.bedrooms === 'number' && (
                                <span>{tour.bedrooms} {tour.bedrooms === 1 ? 'hab.' : 'habs.'}</span>
                              )}
                              {typeof tour.bathrooms === 'number' && (
                                <span>{tour.bathrooms} {tour.bathrooms === 1 ? 'baño' : 'baños'}</span>
                              )}
                              {typeof tour.areaSqm === 'number' && (
                                <span>{Math.round(tour.areaSqm)} m²</span>
                              )}
                            </div>
                          )}
                      </div>
                  </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default function RecorridosPage() {
    return (
        <Suspense fallback={<div className="h-screen w-screen flex items-center justify-center bg-gray-50"><Loader /></div>}>
            <RecorridosContent />
        </Suspense>
    );
}
