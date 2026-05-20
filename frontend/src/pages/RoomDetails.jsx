import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Users,
  Clock,
  MapPin,
  Calendar,
  ArrowLeft,
  DollarSign,
  AlertCircle,
} from 'lucide-react';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';
import Button from '../components/ui/Button';
import Modal from '../components/ui/Modal';
import EmptyState from '../components/ui/EmptyState';
import { PageSkeleton } from '../components/ui/LoadingSkeleton';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { AMENITY_ICONS } from '../utils/constants';
import toast from 'react-hot-toast';

const RoomDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [bookingData, setBookingData] = useState({
    date: '',
    startTime: '',
    endTime: '',
    specialNote: '',
  });
  const [bookingLoading, setBookingLoading] = useState(false);
  const [existingBookings, setExistingBookings] = useState([]);

  useDocumentTitle(room?.name || 'Room Details');

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const { data } = await api.get(`/rooms/${id}`);
        setRoom(data);
      } catch {
        toast.error('Room not found');
        navigate('/rooms');
      } finally {
        setLoading(false);
      }
    };
    fetchRoom();
  }, [id, navigate]);

  useEffect(() => {
    if (showBookingModal && bookingData.date) {
      const fetchBookings = async () => {
        try {
          const { data } = await api.get(`/bookings/room/${id}`);
          setExistingBookings(data);
        } catch {
          // silently fail
        }
      };
      fetchBookings();
    }
  }, [showBookingModal, bookingData.date, id]);

  const handleBookNow = () => {
    if (!user) {
      navigate('/login', { state: { from: { pathname: `/rooms/${id}` } } });
      return;
    }
    setShowBookingModal(true);
  };

  const calculateTotal = () => {
    if (!bookingData.startTime || !bookingData.endTime || !room) return 0;
    const start = parseInt(bookingData.startTime.split(':')[0]);
    const end = parseInt(bookingData.endTime.split(':')[0]);
    if (end <= start) return 0;
    return (end - start) * room.hourlyRate;
  };

  const getBookedSlots = () => {
    return existingBookings
      .filter((b) => b.date === bookingData.date)
      .map((b) => ({ start: b.startTime, end: b.endTime }));
  };

  const isTimeSlotBooked = (startTime, endTime) => {
    return existingBookings
      .filter((b) => b.date === bookingData.date)
      .some(
        (b) =>
          b.startTime < endTime && b.endTime > startTime
      );
  };

  const handleSubmitBooking = async (e) => {
    e.preventDefault();

    if (!bookingData.date || !bookingData.startTime || !bookingData.endTime) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (bookingData.endTime <= bookingData.startTime) {
      toast.error('End time must be after start time');
      return;
    }

    if (isTimeSlotBooked(bookingData.startTime, bookingData.endTime)) {
      toast.error('This time slot is already booked. Please choose a different time.');
      return;
    }

    setBookingLoading(true);
    try {
      await api.post('/bookings', {
        roomId: room._id,
        date: bookingData.date,
        startTime: bookingData.startTime,
        endTime: bookingData.endTime,
        specialNote: bookingData.specialNote,
      });
      toast.success('Room booked successfully!');
      setShowBookingModal(false);
      setBookingData({ date: '', startTime: '', endTime: '', specialNote: '' });
      const { data } = await api.get(`/rooms/${id}`);
      setRoom(data);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Booking failed');
    } finally {
      setBookingLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop py-xl">
        <PageSkeleton />
      </div>
    );
  }

  if (!room) return null;

  return (
    <div className="max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop py-xl">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        {/* Back button */}
        <button
          onClick={() => navigate('/rooms')}
          className="flex items-center gap-sm text-on-surface-variant hover:text-primary mb-xl transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-label-md">Back to Rooms</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-xl">
          {/* Main content */}
          <div className="lg:col-span-3 space-y-xl">
            {/* Image */}
            <div className="rounded-2xl overflow-hidden h-[300px] md:h-[400px]">
              <img
                src={room.image}
                alt={room.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Info */}
            <div>
              <div className="flex items-start justify-between mb-md">
                <div>
                  <h1 className="font-headline-lg text-headline-lg text-on-surface">
                    {room.name}
                  </h1>
                  <p className="font-body-md text-body-md text-on-surface-variant mt-xs">
                    Listed by {room.owner?.name || 'Unknown'}
                  </p>
                </div>
                <span className="bg-surface-variant text-on-surface-variant px-md py-xs rounded-full text-label-sm font-bold">
                  Floor {room.floor}
                </span>
              </div>
              <p className="font-body-lg text-body-lg text-on-surface-variant">
                {room.description}
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-md">
              {[
                { icon: Users, label: 'Capacity', value: `${room.capacity} seats` },
                { icon: Clock, label: 'Rate', value: `$${room.hourlyRate}/hr` },
                { icon: MapPin, label: 'Floor', value: `Floor ${room.floor}` },
                { icon: Calendar, label: 'Bookings', value: room.bookingCount || 0 },
              ].map((stat, i) => (
                <div
                  key={i}
                  className="bg-surface-container-lowest border border-outline-variant rounded-xl p-md text-center"
                >
                  <stat.icon className="w-6 h-6 text-primary mx-auto mb-sm" />
                  <p className="font-label-sm text-label-sm text-on-surface-variant">
                    {stat.label}
                  </p>
                  <p className="font-headline-sm text-headline-sm text-on-surface">
                    {stat.value}
                  </p>
                </div>
              ))}
            </div>

            {/* Amenities */}
            <div>
              <h2 className="font-headline-md text-headline-md text-on-surface mb-lg">
                Amenities
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-md">
                {room.amenities?.map((amenity) => (
                  <div
                    key={amenity}
                    className="bg-surface-container-lowest border border-outline-variant rounded-xl p-md flex items-center gap-md"
                  >
                    <div className="w-10 h-10 bg-primary-container/30 rounded-xl flex items-center justify-center">
                      <span className="material-symbols-outlined text-primary">
                        {AMENITY_ICONS[amenity] || 'check_circle'}
                      </span>
                    </div>
                    <span className="font-label-md text-label-md text-on-surface">
                      {amenity}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Booking sidebar */}
          <div className="lg:col-span-2">
            <div className="sticky top-24 bg-surface-container-lowest border border-outline-variant rounded-xl p-xl">
              <div className="flex items-center justify-between mb-xl">
                <div>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    Starting from
                  </p>
                  <p className="font-headline-lg text-headline-lg text-primary">
                    ${room.hourlyRate}
                    <span className="font-body-md text-body-md text-on-surface-variant">
                      /hour
                    </span>
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    Total bookings
                  </p>
                  <p className="font-headline-md text-headline-md text-on-surface">
                    {room.bookingCount || 0}
                  </p>
                </div>
              </div>

              <Button
                variant="primary"
                className="w-full mb-lg"
                size="lg"
                onClick={handleBookNow}
              >
                <Calendar className="w-5 h-5" />
                Book Now
              </Button>

              <div className="space-y-sm text-label-sm text-on-surface-variant">
                <div className="flex items-center gap-sm">
                  <span className="material-symbols-outlined text-[16px]">
                    check_circle
                  </span>
                  Instant confirmation
                </div>
                <div className="flex items-center gap-sm">
                  <span className="material-symbols-outlined text-[16px]">
                    check_circle
                  </span>
                  Free cancellation
                </div>
                <div className="flex items-center gap-sm">
                  <span className="material-symbols-outlined text-[16px]">
                    check_circle
                  </span>
                  Secure booking
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Booking Modal */}
      <Modal
        isOpen={showBookingModal}
        onClose={() => setShowBookingModal(false)}
        title="Book This Room"
      >
        <form onSubmit={handleSubmitBooking} className="space-y-lg">
          <div>
            <label className="font-label-md text-label-md text-on-surface block mb-sm">
              Date
            </label>
            <input
              type="date"
              value={bookingData.date}
              onChange={(e) =>
                setBookingData({ ...bookingData, date: e.target.value })
              }
              min={new Date().toISOString().split('T')[0]}
              className="w-full px-md py-md bg-surface-container-lowest border border-outline-variant rounded-xl font-body-md text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-md">
            <div>
              <label className="font-label-md text-label-md text-on-surface block mb-sm">
                Start Time
              </label>
              <select
                value={bookingData.startTime}
                onChange={(e) =>
                  setBookingData({ ...bookingData, startTime: e.target.value })
                }
                className="w-full px-md py-md bg-surface-container-lowest border border-outline-variant rounded-xl font-body-md text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
                required
              >
                <option value="">Select</option>
                {Array.from({ length: 15 }, (_, i) => i + 6).map((hour) => (
                  <option key={hour} value={`${hour.toString().padStart(2, '0')}:00`}>
                    {hour > 12 ? hour - 12 : hour}:00{' '}
                    {hour >= 12 ? 'PM' : 'AM'}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="font-label-md text-label-md text-on-surface block mb-sm">
                End Time
              </label>
              <select
                value={bookingData.endTime}
                onChange={(e) =>
                  setBookingData({ ...bookingData, endTime: e.target.value })
                }
                className="w-full px-md py-md bg-surface-container-lowest border border-outline-variant rounded-xl font-body-md text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
                required
              >
                <option value="">Select</option>
                {Array.from({ length: 15 }, (_, i) => i + 7).map((hour) => (
                  <option key={hour} value={`${hour.toString().padStart(2, '0')}:00`}>
                    {hour > 12 ? hour - 12 : hour}:00{' '}
                    {hour >= 12 ? 'PM' : 'AM'}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Booked slots warning */}
          {bookingData.date && getBookedSlots().length > 0 && (
            <div className="bg-error-container/50 border border-error/30 rounded-xl p-md">
              <div className="flex items-start gap-sm">
                <AlertCircle className="w-5 h-5 text-error shrink-0 mt-xs" />
                <div>
                  <p className="font-label-md text-label-md text-error">
                    Booked time slots:
                  </p>
                  <div className="flex flex-wrap gap-xs mt-xs">
                    {getBookedSlots().map((slot, i) => (
                      <span
                        key={i}
                        className="text-[11px] bg-error/10 text-error px-sm py-[2px] rounded-full"
                      >
                        {slot.start} - {slot.end}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          <div>
            <label className="font-label-md text-label-md text-on-surface block mb-sm">
              Special Note (optional)
            </label>
            <textarea
              value={bookingData.specialNote}
              onChange={(e) =>
                setBookingData({ ...bookingData, specialNote: e.target.value })
              }
              rows={3}
              placeholder="Any special requests..."
              className="w-full px-md py-md bg-surface-container-lowest border border-outline-variant rounded-xl font-body-md text-on-surface placeholder:text-on-surface-variant/60 focus:outline-none focus:ring-2 focus:ring-primary resize-none"
            />
          </div>

          {/* Total cost */}
          {bookingData.startTime && bookingData.endTime && (
            <div className="bg-primary/5 border border-primary/20 rounded-xl p-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-sm">
                  <DollarSign className="w-5 h-5 text-primary" />
                  <span className="font-label-md text-label-md text-on-surface">
                    Total Cost
                  </span>
                </div>
                <span className="font-headline-md text-headline-md text-primary">
                  ${calculateTotal()}
                </span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-xs">
                {bookingData.startTime && bookingData.endTime
                  ? `${parseInt(bookingData.endTime) - parseInt(bookingData.startTime)} hour(s) × $${room.hourlyRate}/hr`
                  : 'Select time to calculate'}
              </p>
            </div>
          )}

          <div className="flex gap-md">
            <Button
              variant="secondary"
              className="flex-1"
              onClick={() => setShowBookingModal(false)}
              type="button"
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              className="flex-1"
              type="submit"
              disabled={bookingLoading}
            >
              {bookingLoading ? 'Booking...' : 'Confirm Booking'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default RoomDetails;
