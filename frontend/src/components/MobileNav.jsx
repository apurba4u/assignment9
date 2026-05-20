import { NavLink } from 'react-router-dom';
import { Home, DoorOpen, CalendarCheck, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const MobileNav = () => {
  const { user } = useAuth();

  if (!user) return null;

  const linkClass = ({ isActive }) =>
    `flex flex-col items-center gap-xs transition-colors ${
      isActive ? 'text-primary' : 'text-on-surface-variant'
    }`;

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-surface shadow-[0_-4px_12px_rgba(0,0,0,0.05)] flex justify-around items-center h-16 border-t border-outline-variant z-20">
      <NavLink to="/" className={linkClass} end>
        <Home className="w-5 h-5" />
        <span className="text-[10px] font-bold">Home</span>
      </NavLink>
      <NavLink to="/rooms" className={linkClass}>
        <DoorOpen className="w-5 h-5" />
        <span className="text-[10px] font-bold">Rooms</span>
      </NavLink>
      <NavLink to="/my-bookings" className={linkClass}>
        <CalendarCheck className="w-5 h-5" />
        <span className="text-[10px] font-bold">Bookings</span>
      </NavLink>
      <NavLink to="/my-listings" className={linkClass}>
        <User className="w-5 h-5" />
        <span className="text-[10px] font-bold">Profile</span>
      </NavLink>
    </nav>
  );
};

export default MobileNav;
