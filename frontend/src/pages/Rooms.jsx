import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, X, SlidersHorizontal } from 'lucide-react';
import api from '../api/axios';
import RoomCard from '../components/RoomCard';
import { RoomCardSkeleton } from '../components/ui/LoadingSkeleton';
import EmptyState from '../components/ui/EmptyState';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { AMENITIES } from '../utils/constants';

const Rooms = () => {
  useDocumentTitle('Rooms');
  const [searchParams, setSearchParams] = useSearchParams();
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [selectedAmenities, setSelectedAmenities] = useState(
    searchParams.get('amenities')?.split(',').filter(Boolean) || []
  );
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const fetchRooms = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        if (search) params.set('search', search);
        if (selectedAmenities.length > 0)
          params.set('amenities', selectedAmenities.join(','));

        const { data } = await api.get(`/rooms?${params.toString()}`);
        setRooms(data);
      } catch {
        // silently fail
      } finally {
        setLoading(false);
      }
    };

    const debounce = setTimeout(fetchRooms, 300);
    return () => clearTimeout(debounce);
  }, [search, selectedAmenities]);

  const toggleAmenity = (amenity) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenity)
        ? prev.filter((a) => a !== amenity)
        : [...prev, amenity]
    );
  };

  const clearFilters = () => {
    setSearch('');
    setSelectedAmenities([]);
    setSearchParams({});
  };

  const hasActiveFilters = search || selectedAmenities.length > 0;

  return (
    <div className="max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop py-2xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-xl"
      >
        <h1 className="font-headline-lg text-headline-lg text-on-surface mb-xs">
          Explore Rooms
        </h1>
        <p className="font-body-md text-body-md text-on-surface-variant">
          Find the perfect study space for your needs.
        </p>
      </motion.div>

      {/* Search and Filters */}
      <div className="mb-xl space-y-md">
        <div className="flex gap-md">
          <div className="relative flex-1">
            <Search className="absolute left-md top-1/2 -translate-y-1/2 w-5 h-5 text-on-surface-variant" />
            <input
              type="text"
              placeholder="Search rooms by name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-md py-md bg-surface-container-lowest border border-outline-variant rounded-xl font-body-md text-body-md text-on-surface placeholder:text-on-surface-variant/60 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-md top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-on-surface"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-sm px-lg py-md rounded-xl border transition-all ${
              showFilters || selectedAmenities.length > 0
                ? 'bg-primary text-on-primary border-primary'
                : 'bg-surface-container-lowest text-on-surface-variant border-outline-variant hover:border-primary'
            }`}
          >
            <SlidersHorizontal className="w-5 h-5" />
            <span className="hidden sm:block font-label-md">Filters</span>
            {selectedAmenities.length > 0 && (
              <span className="bg-white/20 text-white w-5 h-5 rounded-full text-[10px] flex items-center justify-center font-bold">
                {selectedAmenities.length}
              </span>
            )}
          </button>
        </div>

        {/* Amenity Filters */}
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-surface-container-lowest border border-outline-variant rounded-xl p-lg"
          >
            <div className="flex items-center justify-between mb-md">
              <h3 className="font-label-md text-label-md text-on-surface">
                Filter by Amenities
              </h3>
              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="text-primary font-label-sm hover:underline"
                >
                  Clear all
                </button>
              )}
            </div>
            <div className="flex flex-wrap gap-sm">
              {AMENITIES.map((amenity) => (
                <button
                  key={amenity}
                  onClick={() => toggleAmenity(amenity)}
                  className={`px-md py-sm rounded-full font-label-md text-[12px] transition-all ${
                    selectedAmenities.includes(amenity)
                      ? 'bg-primary text-on-primary'
                      : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
                  }`}
                >
                  {amenity}
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Active filters */}
        {selectedAmenities.length > 0 && !showFilters && (
          <div className="flex flex-wrap gap-sm">
            {selectedAmenities.map((amenity) => (
              <span
                key={amenity}
                className="inline-flex items-center gap-xs px-md py-xs bg-primary/10 text-primary rounded-full text-label-sm font-semibold"
              >
                {amenity}
                <button onClick={() => toggleAmenity(amenity)}>
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Results */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
          {Array.from({ length: 6 }).map((_, i) => (
            <RoomCardSkeleton key={i} />
          ))}
        </div>
      ) : rooms.length === 0 ? (
        <EmptyState
          title="No rooms found"
          description="Try adjusting your search or filters to find what you're looking for."
          actionLabel="Clear Filters"
          onAction={clearFilters}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
          {rooms.map((room, i) => (
            <motion.div
              key={room._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <RoomCard room={room} />
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Rooms;
