import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Plus, ArrowLeft } from 'lucide-react';
import api from '../api/axios';
import Button from '../components/ui/Button';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { AMENITIES } from '../utils/constants';
import toast from 'react-hot-toast';

const AddRoom = () => {
  useDocumentTitle('Add Room');
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: '',
    description: '',
    image: '',
    floor: '',
    capacity: '',
    hourlyRate: '',
    amenities: [],
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const toggleAmenity = (amenity) => {
    setForm((prev) => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter((a) => a !== amenity)
        : [...prev.amenities, amenity],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.description || !form.image || !form.floor || !form.capacity || !form.hourlyRate) {
      toast.error('Please fill in all required fields');
      return;
    }

    setLoading(true);
    try {
      await api.post('/rooms', {
        ...form,
        floor: Number(form.floor),
        capacity: Number(form.capacity),
        hourlyRate: Number(form.hourlyRate),
      });
      toast.success('Room added successfully!');
      navigate('/my-listings');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to add room');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-margin-mobile md:px-margin-desktop py-xl">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-sm text-on-surface-variant hover:text-primary mb-xl transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-label-md">Back</span>
        </button>

        <h1 className="font-headline-lg text-headline-lg text-on-surface mb-xs">
          Add New Room
        </h1>
        <p className="font-body-md text-body-md text-on-surface-variant mb-xl">
          List your study room for others to book.
        </p>

        <form onSubmit={handleSubmit} className="space-y-lg">
          <div>
            <label className="font-label-md text-label-md text-on-surface block mb-sm">
              Room Name *
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="e.g., Quiet Study Room A"
              className="w-full px-md py-md bg-surface-container-lowest border border-outline-variant rounded-xl font-body-md text-on-surface placeholder:text-on-surface-variant/60 focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>

          <div>
            <label className="font-label-md text-label-md text-on-surface block mb-sm">
              Description *
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={4}
              placeholder="Describe the room, its features, and what makes it special..."
              className="w-full px-md py-md bg-surface-container-lowest border border-outline-variant rounded-xl font-body-md text-on-surface placeholder:text-on-surface-variant/60 focus:outline-none focus:ring-2 focus:ring-primary resize-none"
              required
            />
          </div>

          <div>
            <label className="font-label-md text-label-md text-on-surface block mb-sm">
              Image URL *
            </label>
            <input
              type="url"
              name="image"
              value={form.image}
              onChange={handleChange}
              placeholder="https://example.com/room-image.jpg"
              className="w-full px-md py-md bg-surface-container-lowest border border-outline-variant rounded-xl font-body-md text-on-surface placeholder:text-on-surface-variant/60 focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
            {form.image && (
              <div className="mt-sm rounded-xl overflow-hidden h-40">
                <img
                  src={form.image}
                  alt="Preview"
                  className="w-full h-full object-cover"
                  onError={(e) => (e.target.style.display = 'none')}
                />
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-md">
            <div>
              <label className="font-label-md text-label-md text-on-surface block mb-sm">
                Floor *
              </label>
              <input
                type="number"
                name="floor"
                value={form.floor}
                onChange={handleChange}
                min="0"
                placeholder="e.g., 2"
                className="w-full px-md py-md bg-surface-container-lowest border border-outline-variant rounded-xl font-body-md text-on-surface placeholder:text-on-surface-variant/60 focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>
            <div>
              <label className="font-label-md text-label-md text-on-surface block mb-sm">
                Capacity *
              </label>
              <input
                type="number"
                name="capacity"
                value={form.capacity}
                onChange={handleChange}
                min="1"
                placeholder="e.g., 4"
                className="w-full px-md py-md bg-surface-container-lowest border border-outline-variant rounded-xl font-body-md text-on-surface placeholder:text-on-surface-variant/60 focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>
            <div>
              <label className="font-label-md text-label-md text-on-surface block mb-sm">
                Hourly Rate ($) *
              </label>
              <input
                type="number"
                name="hourlyRate"
                value={form.hourlyRate}
                onChange={handleChange}
                min="0"
                step="0.5"
                placeholder="e.g., 10"
                className="w-full px-md py-md bg-surface-container-lowest border border-outline-variant rounded-xl font-body-md text-on-surface placeholder:text-on-surface-variant/60 focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>
          </div>

          <div>
            <label className="font-label-md text-label-md text-on-surface block mb-sm">
              Amenities
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-sm">
              {AMENITIES.map((amenity) => (
                <label
                  key={amenity}
                  className={`flex items-center gap-sm px-md py-md rounded-xl border cursor-pointer transition-all ${
                    form.amenities.includes(amenity)
                      ? 'bg-primary/10 border-primary text-primary'
                      : 'bg-surface-container-lowest border-outline-variant text-on-surface-variant hover:border-primary/50'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={form.amenities.includes(amenity)}
                    onChange={() => toggleAmenity(amenity)}
                    className="sr-only"
                  />
                  <div
                    className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                      form.amenities.includes(amenity)
                        ? 'bg-primary border-primary'
                        : 'border-outline-variant'
                    }`}
                  >
                    {form.amenities.includes(amenity) && (
                      <svg
                        className="w-3 h-3 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={3}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    )}
                  </div>
                  <span className="font-body-sm text-body-sm">{amenity}</span>
                </label>
              ))}
            </div>
          </div>

          <Button
            variant="primary"
            className="w-full"
            size="lg"
            type="submit"
            disabled={loading}
          >
            <Plus className="w-5 h-5" />
            {loading ? 'Adding Room...' : 'Add Room'}
          </Button>
        </form>
      </motion.div>
    </div>
  );
};

export default AddRoom;
