import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, Users, MapPin } from 'lucide-react';
import api from '../api/axios';
import Button from '../components/ui/Button';
import EmptyState from '../components/ui/EmptyState';
import ConfirmDialog from '../components/ui/ConfirmDialog';
import { RoomCardSkeleton } from '../components/ui/LoadingSkeleton';
import SectionTitle from '../components/ui/SectionTitle';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import toast from 'react-hot-toast';

const MyListings = () => {
  useDocumentTitle('My Listings');
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      const { data } = await api.get('/rooms/my-listings');
      setRooms(data);
    } catch {
      toast.error('Failed to load listings');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    setDeleteLoading(true);
    try {
      await api.delete(`/rooms/${deleteId}`);
      setRooms((prev) => prev.filter((r) => r._id !== deleteId));
      toast.success('Room deleted successfully');
    } catch {
      toast.error('Failed to delete room');
    } finally {
      setDeleteLoading(false);
      setDeleteId(null);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop py-xl">
      <SectionTitle
        title="My Listings"
        description="Manage your study room listings."
        action={
          <Link to="/add-room">
            <Button variant="primary">
              <Plus className="w-5 h-5" />
              Add Room
            </Button>
          </Link>
        }
      />

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
          {Array.from({ length: 3 }).map((_, i) => (
            <RoomCardSkeleton key={i} />
          ))}
        </div>
      ) : rooms.length === 0 ? (
        <EmptyState
          icon={Plus}
          title="No listings yet"
          description="Start earning by listing your study room for others to book."
          actionLabel="Add Your First Room"
          onAction={() => window.location.href = '/add-room'}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
          {rooms.map((room, i) => (
            <motion.div
              key={room._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={room.image}
                  alt={room.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-md right-md bg-surface/90 backdrop-blur-md px-sm py-xs rounded-lg text-primary font-bold text-label-sm">
                  ${room.hourlyRate}/hr
                </div>
              </div>
              <div className="p-md">
                <div className="flex justify-between items-start mb-sm">
                  <h3 className="font-headline-md text-[18px] text-on-surface">
                    {room.name}
                  </h3>
                  <span className="bg-surface-variant text-on-surface-variant px-sm py-xs rounded-full text-[10px] uppercase font-bold tracking-wider">
                    Floor {room.floor}
                  </span>
                </div>
                <div className="flex items-center gap-md text-on-surface-variant mb-md">
                  <div className="flex items-center gap-xs">
                    <Users className="w-4 h-4" />
                    <span className="text-label-sm">{room.capacity} seats</span>
                  </div>
                  <span className="text-outline">•</span>
                  <span className="text-label-sm">{room.bookingCount || 0} bookings</span>
                </div>
                <div className="flex gap-sm">
                  <Link to={`/edit-room/${room._id}`} className="flex-1">
                    <Button variant="secondary" className="w-full">
                      <Edit className="w-4 h-4" />
                      Edit
                    </Button>
                  </Link>
                  <Button
                    variant="danger"
                    className="flex-1"
                    onClick={() => setDeleteId(room._id)}
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      <ConfirmDialog
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
        title="Delete Room"
        message="Are you sure you want to delete this room? All associated bookings will also be removed."
        confirmLabel="Delete"
        loading={deleteLoading}
      />
    </div>
  );
};

export default MyListings;
