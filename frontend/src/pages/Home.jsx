import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Search,
  Shield,
  Clock,
  Zap,
  Star,
  ChevronRight,
  Users,
  Calendar,
  Sparkles,
} from 'lucide-react';
import api from '../api/axios';
import RoomCard from '../components/RoomCard';
import { RoomCardSkeleton } from '../components/ui/LoadingSkeleton';
import Button from '../components/ui/Button';
import SectionTitle from '../components/ui/SectionTitle';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

const Home = () => {
  useDocumentTitle('Home');
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const { data } = await api.get('/rooms/latest');
        setRooms(data);
      } catch {
        // silently fail
      } finally {
        setLoading(false);
      }
    };
    fetchRooms();
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-surface-container-low via-surface to-surface-container overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-secondary/15 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop py-2xl md:py-[120px]">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-sm bg-primary-container/30 text-primary px-md py-xs rounded-full mb-lg">
              <Sparkles className="w-4 h-4" />
              <span className="font-label-md text-label-sm">Premium Study Spaces</span>
            </div>
            <h1 className="font-headline-xl text-headline-xl text-on-surface mb-lg">
              Find Your Perfect{' '}
              <span className="text-primary">Study Room</span>
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant mb-xl max-w-xl">
              Browse and book quiet, private study rooms in your library. List
              your own room and earn.
            </p>
            <div className="flex flex-wrap gap-md">
              <Link to="/rooms">
                <Button size="lg" variant="primary">
                  <Search className="w-5 h-5" />
                  Explore Rooms
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Latest Rooms Section */}
      <section className="max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop py-2xl">
        <SectionTitle
          title="Latest Rooms"
          description="Discover newly added study spaces available for booking."
          action={
            <Link
              to="/rooms"
              className="flex items-center gap-xs text-primary font-label-md hover:underline"
            >
              View All <ChevronRight className="w-4 h-4" />
            </Link>
          }
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
          {loading
            ? Array.from({ length: 6 }).map((_, i) => (
                <RoomCardSkeleton key={i} />
              ))
            : rooms.map((room) => <RoomCard key={room._id} room={room} />)}
        </div>
      </section>

      {/* Why StudyNook Section */}
      <section className="bg-surface-container-low">
        <div className="max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop py-2xl">
          <SectionTitle
            title="Why Choose StudyNook?"
            description="Everything you need for productive study sessions."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
            {[
              {
                icon: Shield,
                title: 'Secure Booking',
                desc: 'Your reservations are protected with real-time conflict detection and instant confirmations.',
              },
              {
                icon: Clock,
                title: 'Flexible Hours',
                desc: 'Book rooms by the hour. Morning sessions, late night crams — we have you covered.',
              },
              {
                icon: Zap,
                title: 'Instant Confirmation',
                desc: 'No waiting. Get immediate confirmation and start planning your productive session.',
              },
              {
                icon: Users,
                title: 'Community Driven',
                desc: 'Rooms listed by fellow students. Find spaces that match your study style.',
              },
              {
                icon: Calendar,
                title: 'Easy Management',
                desc: 'View, modify, or cancel bookings from your personalized dashboard.',
              },
              {
                icon: Star,
                title: 'Premium Spaces',
                desc: 'Access equipped rooms with projectors, whiteboards, and high-speed WiFi.',
              },
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="bg-surface-container-lowest p-xl rounded-xl border border-outline-variant hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
              >
                <div className="w-12 h-12 bg-primary-container/30 rounded-xl flex items-center justify-center mb-lg">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-headline-md text-headline-md text-on-surface mb-sm">
                  {feature.title}
                </h3>
                <p className="font-body-md text-body-md text-on-surface-variant">
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop py-2xl">
        <SectionTitle
          title="What Students Say"
          description="Join thousands of students who study smarter with StudyNook."
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
          {[
            {
              name: 'Sarah Chen',
              role: 'Computer Science, Year 3',
              quote:
                'StudyNook completely changed how our study group meets. Booking rooms is seamless and the conflict detection means no more showing up to occupied rooms.',
              rating: 5,
            },
            {
              name: 'Marcus Johnson',
              role: 'Engineering, Year 2',
              quote:
                'I listed my unused study room and started earning within the first week. The platform handles everything — I just collect the bookings.',
              rating: 5,
            },
            {
              name: 'Priya Patel',
              role: 'Business, Year 4',
              quote:
                'The filter system is incredible. I can find rooms with projectors and whiteboards instantly. Perfect for group presentations.',
              rating: 5,
            },
          ].map((testimonial, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15 }}
              viewport={{ once: true }}
              className="bg-surface-container-lowest p-xl rounded-xl border border-outline-variant"
            >
              <div className="flex gap-xs mb-md">
                {Array.from({ length: testimonial.rating }).map((_, j) => (
                  <Star
                    key={j}
                    className="w-4 h-4 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>
              <p className="font-body-md text-body-md text-on-surface-variant mb-lg italic">
                "{testimonial.quote}"
              </p>
              <div>
                <p className="font-label-md text-label-md text-on-surface">
                  {testimonial.name}
                </p>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  {testimonial.role}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-primary to-primary-container">
        <div className="max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop py-2xl text-center">
          <h2 className="font-headline-lg text-headline-lg text-white mb-md">
            Ready to Study Smarter?
          </h2>
          <p className="font-body-lg text-white/80 mb-xl max-w-xl mx-auto">
            Join StudyNook today and never worry about finding a study space
            again.
          </p>
          <Link to="/register">
            <button className="bg-white text-primary px-2xl py-md rounded-xl font-label-md text-[16px] hover:shadow-lg active:scale-[0.98] transition-all">
              Get Started Free
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
