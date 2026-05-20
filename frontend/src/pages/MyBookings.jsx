import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, DollarSign, X } from 'lucide-react';
import api from '../api/axios';
import Button from '../components/ui/Button';
import EmptyState from '../components/ui/EmptyState';
import StatusBadge from '../components/ui/StatusBadge';
import ConfirmDialog from '../components/ui/ConfirmDialog';
import { RoomCardSkeleton } from '../components/ui/LoadingSkeleton';
import SectionTitle from '../components/ui/SectionTitle';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import toast from 'react-hot-toast';

const MyBookings = () => {
  useDocumentTitle('My Bookings');
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cancelId, setCancelId] = useState(null);
  const [cancelLoading, setCancelLoading] = useState(false);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const { data } = await api.get('/bookings/my');
      setBookings(data);
    } catch {
      toast.error('Failed to load bookings');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async () => {
    setCancelLoading(true);
    try {
      await api.patch(`/bookings/${cancelId}/cancel`);
      setBookings((prev) =>
        prev.map((b) =>
          b._id === cancelId ? { ...b, status: 'cancelled' } : b
        )
      );
      toast.success('Booking cancelled successfully');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to cancel booking');
    } finally {
      setCancelLoading(false);
      setCancelId(null);
    }
  };

  const canCancel = (booking) => {
    if (booking.status === 'cancelled') return false;
    const bookingDate = new Date(booking.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return bookingDate >= today;
  };

  return (
    <div className="max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop py-xl">
      <SectionTitle
        title="My Bookings"
        description="View and manage your study room reservations."
      />

      {loading ? (
        <div className="space-y-md">
          {Array.from({ length: 4 }).map((_, i) => (
            <RoomCardSkeleton key={i} />
          ))}
        </div>
      ) : bookings.length === 0 ? (
        <EmptyState
          icon={Calendar}
          title="No bookings yet"
          description="Browse available rooms and book your first study session."
          actionLabel="Explore Rooms"
          onAction={() => window.location.href = '/rooms'}
        />
      ) : (
        <div className="space-y-md">
          {bookings.map((booking, i) => (
            <motion.div
              key={booking._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden"
            >
              <div className="flex flex-col md:flex-row">
                {/* Room image */}
                <div className="w-full md:w-48 h-40 md:h-auto overflow-hidden shrink-0">
                  <img
                    src={booking.roomId?.image}
                    alt={booking.roomId?.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Booking details */}
                <div className="flex-1 p-lg flex flex-col justify-between">
                  <div>
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-sm mb-md">
                      <div>
                        <h3 className="font-headline-md text-headline-md text-on-surface">
                          {booking.roomId?.name || 'Room deleted'}
                        </h3>
                        <div className="flex items-center gap-xs text-on-surface-variant mt-xs">
                          <MapPin className="w-4 h-4" />
                          <span className="font-body-sm text-body-sm">
                            Floor {booking.roomId?.floor || '?'}
                          </span>
                        </div>
                      </div>
                      <StatusBadge status={booking.status} />
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-md">
                      <div className="flex items-center gap-sm">
                        <Calendar className="w-4 h-4 text-primary" />
                        <div>
                          <p className="font-label-sm text-label-sm text-on-surface-variant">
                            Date
                          </p>
                          <p className="font-label-md text-label-md text-on-surface">
                            {booking.date}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-sm">
                        <Clock className="w-4 h-4 text-primary" />
                        <div>
                          <p className="font-label-sm text-label-sm text-on-surface-variant">
                            Time
                          </p>
                          <p className="font-label-md text-label-md text-on-surface">
                            {booking.startTime} - {booking.endTime}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-sm">
                        <DollarSign className="w-4 h-4 text-primary" />
                        <div>
                          <p className="font-label-sm text-label-sm text-on-surface-variant">
                            Total Cost
                          </p>
                          <p className="font-label-md text-label-md text-on-surface">
                            ${booking.totalCost}
                          </p>
                        </div>
                      </div>
                    </div>

                    {booking.specialNote && (
                      <p className="font-body-sm text-body-sm text-on-surface-variant mt-md bg-surface-container-low p-md rounded-lg">
                        <span className="font-bold">Note:</span> {booking.specialNote}
                      </p>
                    )}
                  </div>

                  {canCancel(booking) && (
                    <div className="mt-lg flex justify-end">
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => setCancelId(booking._id)}
                      >
                        <X className="w-4 h-4" />
                        Cancel Booking
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      <ConfirmDialog
        isOpen={!!cancelId}
        onClose={() => setCancelId(null)}
        onConfirm={handleCancel}
        title="Cancel Booking"
        message="Are you sure you want to cancel this booking? This action cannot be undone."
        confirmLabel="Cancel Booking"
        loading={cancelLoading}
      />
    </div>
  );
};

export default MyBookings;
