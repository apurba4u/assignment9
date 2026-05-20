import { Link } from 'react-router-dom';
import { Users, MapPin } from 'lucide-react';
import Button from './ui/Button';
import { AMENITY_ICONS } from '../utils/constants';

const RoomCard = ({ room }) => {
  const displayAmenities = room.amenities?.slice(0, 3) || [];
  const remainingCount = (room.amenities?.length || 0) - 3;

  return (
    <div className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden hover:-translate-y-1 hover:shadow-lg transition-all duration-300 group flex flex-col">
      <div className="relative h-48 overflow-hidden">
        <img
          src={room.image}
          alt={room.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-md right-md bg-surface/90 backdrop-blur-md px-sm py-xs rounded-lg text-primary font-bold text-label-sm">
          ${room.hourlyRate}/hr
        </div>
      </div>
      <div className="p-md flex flex-col flex-1">
        <div className="flex justify-between items-start mb-sm">
          <h3 className="font-headline-md text-[18px] text-on-surface">
            {room.name}
          </h3>
          <span className="bg-surface-variant text-on-surface-variant px-sm py-xs rounded-full text-[10px] uppercase font-bold tracking-wider">
            Floor {room.floor}
          </span>
        </div>
        <p className="font-body-sm text-body-sm text-on-surface-variant mb-md line-clamp-2 flex-1">
          {room.description?.slice(0, 100)}
          {room.description?.length > 100 ? '...' : ''}
        </p>
        <div className="flex items-center gap-md text-on-surface-variant mb-md">
          <div className="flex items-center gap-xs">
            <Users className="w-4 h-4" />
            <span className="text-label-sm">
              {room.capacity === 1 ? 'Solo' : `Up to ${room.capacity}`}
            </span>
          </div>
        </div>
        <div className="flex flex-wrap gap-xs mb-lg">
          {displayAmenities.map((amenity) => (
            <span
              key={amenity}
              className="px-sm py-[2px] bg-secondary/10 text-secondary border border-secondary/20 rounded-full text-[11px] font-semibold"
            >
              {amenity}
            </span>
          ))}
          {remainingCount > 0 && (
            <span className="px-sm py-[2px] bg-surface-container text-on-surface-variant rounded-full text-[11px] font-semibold">
              +{remainingCount} more
            </span>
          )}
        </div>
        <Link to={`/rooms/${room._id}`}>
          <Button variant="primary" className="w-full">
            View Details
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default RoomCard;
