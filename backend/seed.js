const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const Room = require('./models/Room');

dotenv.config();

const rooms = [
  {
    name: 'Silent Focus Room',
    description:
      'A perfectly quiet study space designed for deep concentration. Equipped with sound-dampening walls and individual desk lamps. Ideal for solo study sessions or focused reading.',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800',
    floor: 1,
    capacity: 4,
    hourlyRate: 8,
    amenities: ['Wi-Fi', 'Power Outlets', 'Quiet Zone', 'Air Conditioning'],
  },
  {
    name: 'Creative Collaboration Hub',
    description:
      'An open, inspiring space built for group projects and brainstorming sessions. Features a large whiteboard wall, modular furniture, and excellent natural lighting.',
    image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800',
    floor: 2,
    capacity: 8,
    hourlyRate: 15,
    amenities: ['Whiteboard', 'Projector', 'Wi-Fi', 'Power Outlets', 'Air Conditioning'],
  },
  {
    name: 'Tech Lab Study Pod',
    description:
      'A tech-forward study room with dedicated power stations,高速 Wi-Fi, and dual-monitor setup available. Perfect for coding sessions, research, and digital projects.',
    image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800',
    floor: 3,
    capacity: 2,
    hourlyRate: 12,
    amenities: ['Wi-Fi', 'Power Outlets', 'Air Conditioning'],
  },
  {
    name: 'Classic Reading Room',
    description:
      'A warm, traditional study room with木质 bookshelves and soft ambient lighting. Designed for quiet reading, essay writing, and exam preparation.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800',
    floor: 1,
    capacity: 6,
    hourlyRate: 10,
    amenities: ['Wi-Fi', 'Power Outlets', 'Quiet Zone'],
  },
  {
    name: 'Presentation Practice Suite',
    description:
      'A fully equipped room for practicing presentations and pitches. Includes投影仪, screen, podium, and seating for audience feedback sessions.',
    image: 'https://images.unsplash.com/photo-1517502884422-41eaead166d4?w=800',
    floor: 2,
    capacity: 10,
    hourlyRate: 20,
    amenities: ['Projector', 'Whiteboard', 'Wi-Fi', 'Power Outlets', 'Air Conditioning'],
  },
  {
    name: 'Zen Study Garden',
    description:
      'A tranquil study space with indoor plants, natural light, and calming decor. Perfect for mindful studying, meditation breaks, and stress-free revision.',
    image: 'https://images.unsplash.com/photo-1497215842964-222b430dc094?w=800',
    floor: 1,
    capacity: 3,
    hourlyRate: 9,
    amenities: ['Wi-Fi', 'Quiet Zone', 'Air Conditioning'],
  },
  {
    name: 'Night Owl Studio',
    description:
      'A late-night study room available until midnight. Bright task lighting, coffee station access, and all the outlets you need for those long study sessions.',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800',
    floor: 3,
    capacity: 5,
    hourlyRate: 11,
    amenities: ['Wi-Fi', 'Power Outlets', 'Air Conditioning', 'Quiet Zone'],
  },
  {
    name: 'Group Study Arena',
    description:
      'The largest study room available, designed for study groups and exam prep sessions. Multiple whiteboards, a projector, and flexible seating arrangements.',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800',
    floor: 2,
    capacity: 12,
    hourlyRate: 25,
    amenities: ['Whiteboard', 'Projector', 'Wi-Fi', 'Power Outlets', 'Air Conditioning'],
  },
  {
    name: 'Minimalist Focus Pod',
    description:
      'A clean, distraction-free pod with just the essentials: a desk, chair, outlet, and perfect lighting. For those who study best in simplicity.',
    image: 'https://images.unsplash.com/photo-1527192491265-7e15c55b1ed2?w=800',
    floor: 1,
    capacity: 1,
    hourlyRate: 6,
    amenities: ['Wi-Fi', 'Power Outlets', 'Quiet Zone'],
  },
];

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected for seeding');

    await Room.deleteMany({});
    await User.deleteMany({});

    const user = await User.create({
      name: 'Demo User',
      email: 'demo@studynook.com',
      photoURL: '',
      password: 'Password123',
    });

    const roomsWithOwner = rooms.map((room) => ({
      ...room,
      owner: user._id,
    }));

    await Room.insertMany(roomsWithOwner);

    console.log(`Seeded ${rooms.length} rooms and 1 user`);
    console.log('Login: demo@studynook.com / Password123');
    process.exit(0);
  } catch (error) {
    console.error('Seeding failed:', error.message);
    process.exit(1);
  }
};

seed();
