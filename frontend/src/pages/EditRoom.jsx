import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Save, ArrowLeft } from 'lucide-react';
import api from '../api/axios';
import Button from '../components/ui/Button';
import { PageSkeleton } from '../components/ui/LoadingSkeleton';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { AMENITIES } from '../utils/constants';
import toast from 'react-hot-toast';

const EditRoom = () => {
  useDocumentTitle('Edit Room');
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    name: '',
    description: '',
    image: '',
    floor: '',
    capacity: '',
    hourlyRate: '',
    amenities: [],
  });

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const { data } = await api.get(`/rooms/${id}`);
        setForm({
          name: data.name,
          description: data.description,
          image: data.image,
          floor: data.floor.toString(),
          capacity: data.capacity.toString(),
          hourlyRate: data.hourlyRate.toString(),
          amenities: data.amenities || [],
        });
      } catch {
        toast.error('Room not found');
        navigate('/my-listings');
      } finally {
        setLoading(false);
      }
    };
    fetchRoom();
  }, [id, navigate]);

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
    setSaving(true);
    try {
      await api.put(`/rooms/${id}`, {
        ...form,
        floor: Number(form.floor),
        capacity: Number(form.capacity),
        hourlyRate: Number(form.hourlyRate),
      });
      toast.success('Room updated successfully!');
      navigate('/my-listings');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update room');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto px-margin-mobile md:px-margin-desktop py-xl">
        <PageSkeleton />
      </div>
    );
  }

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
          Edit Room
        </h1>
        <p className="font-body-md text-body-md text-on-surface-variant mb-xl">
          Update your room details.
        </p>

        <form onSubmit={handleSubmit} className="space-y-lg">
          <div>
            <label className="font-label-md text-label-md text-on-surface block mb-sm">
              Room Name
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full px-md py-md bg-surface-container-lowest border border-outline-variant rounded-xl font-body-md text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>

          <div>
            <label className="font-label-md text-label-md text-on-surface block mb-sm">
              Description
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={4}
              className="w-full px-md py-md bg-surface-container-lowest border border-outline-variant rounded-xl font-body-md text-on-surface focus:outline-none focus:ring-2 focus:ring-primary resize-none"
              required
            />
          </div>

          <div>
            <label className="font-label-md text-label-md text-on-surface block mb-sm">
              Image URL
            </label>
            <input
              type="url"
              name="image"
              value={form.image}
              onChange={handleChange}
              className="w-full px-md py-md bg-surface-container-lowest border border-outline-variant rounded-xl font-body-md text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-md">
            <div>
              <label className="font-label-md text-label-md text-on-surface block mb-sm">
                Floor
              </label>
              <input
                type="number"
                name="floor"
                value={form.floor}
                onChange={handleChange}
                min="0"
                className="w-full px-md py-md bg-surface-container-lowest border border-outline-variant rounded-xl font-body-md text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>
            <div>
              <label className="font-label-md text-label-md text-on-surface block mb-sm">
                Capacity
              </label>
              <input
                type="number"
                name="capacity"
                value={form.capacity}
                onChange={handleChange}
                min="1"
                className="w-full px-md py-md bg-surface-container-lowest border border-outline-variant rounded-xl font-body-md text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>
            <div>
              <label className="font-label-md text-label-md text-on-surface block mb-sm">
                Hourly Rate ($)
              </label>
              <input
                type="number"
                name="hourlyRate"
                value={form.hourlyRate}
                onChange={handleChange}
                min="0"
                step="0.5"
                className="w-full px-md py-md bg-surface-container-lowest border border-outline-variant rounded-xl font-body-md text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
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
                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                  <span className="font-body-sm text-body-sm">{amenity}</span>
                </label>
              ))}
            </div>
          </div>

          <Button variant="primary" className="w-full" size="lg" type="submit" disabled={saving}>
            <Save className="w-5 h-5" />
            {saving ? 'Saving...' : 'Save Changes'}
          </Button>
        </form>
      </motion.div>
    </div>
  );
};

export default EditRoom;
