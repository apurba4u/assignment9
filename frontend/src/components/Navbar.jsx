import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Sun, Moon, User, LogOut, Menu, X } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const Navbar = () => {
  const { isDark, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      toast.success('Logged out successfully');
      navigate('/');
    } catch {
      toast.error('Logout failed');
    }
    setShowDropdown(false);
  };

  const navLinkClass = ({ isActive }) =>
    `font-body-md transition-colors ${
      isActive
        ? 'text-primary font-bold border-b-2 border-primary pb-1'
        : 'text-on-surface-variant hover:text-primary'
    }`;

  return (
    <nav className="sticky top-0 z-50 w-full h-20 bg-surface dark:bg-inverse-surface border-b border-outline-variant shadow-sm">
      <div className="flex justify-between items-center w-full px-margin-mobile md:px-margin-desktop max-w-7xl mx-auto h-full">
        <div className="flex items-center gap-xl">
          <Link
            to="/"
            className="font-headline-md text-headline-md font-bold text-primary dark:text-primary-fixed"
          >
            StudyNook
          </Link>
          <div className="hidden md:flex gap-lg">
            <NavLink to="/" className={navLinkClass} end>
              Home
            </NavLink>
            <NavLink to="/rooms" className={navLinkClass}>
              Rooms
            </NavLink>
            {user && (
              <>
                <NavLink to="/add-room" className={navLinkClass}>
                  Add Room
                </NavLink>
                <NavLink to="/my-listings" className={navLinkClass}>
                  My Listings
                </NavLink>
                <NavLink to="/my-bookings" className={navLinkClass}>
                  My Bookings
                </NavLink>
              </>
            )}
          </div>
        </div>
        <div className="flex items-center gap-md">
          <button
            onClick={toggleTheme}
            className="p-sm hover:bg-surface-container-low rounded-full transition-all duration-200"
          >
            {isDark ? (
              <Sun className="w-5 h-5 text-on-surface-variant" />
            ) : (
              <Moon className="w-5 h-5 text-on-surface-variant" />
            )}
          </button>

          {user ? (
            <div className="relative">
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex items-center gap-sm bg-surface-container-low p-1 pr-4 rounded-full border border-outline-variant hover:bg-surface-container transition-colors"
              >
                {user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt={user.name}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-primary-container flex items-center justify-center">
                    <User className="w-4 h-4 text-on-primary-container" />
                  </div>
                )}
                <span className="font-label-md text-label-md hidden sm:block">
                  {user.name}
                </span>
              </button>

              {showDropdown && (
                <div className="absolute right-0 top-12 w-48 bg-surface-container-lowest border border-outline-variant rounded-xl shadow-xl py-sm z-50">
                  <Link
                    to="/my-bookings"
                    className="flex items-center gap-md px-md py-sm text-on-surface-variant hover:bg-surface-container-low transition-colors"
                    onClick={() => setShowDropdown(false)}
                  >
                    My Bookings
                  </Link>
                  <Link
                    to="/my-listings"
                    className="flex items-center gap-md px-md py-sm text-on-surface-variant hover:bg-surface-container-low transition-colors"
                    onClick={() => setShowDropdown(false)}
                  >
                    My Listings
                  </Link>
                  <hr className="border-outline-variant my-xs" />
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-md px-md py-sm text-error hover:bg-error-container w-full transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="hidden sm:flex gap-sm">
              <Link
                to="/login"
                className="px-md py-sm text-on-surface-variant hover:text-primary font-label-md transition-colors"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-primary text-on-primary px-lg py-sm rounded-xl font-label-md hover:shadow-md active:scale-95 transition-all"
              >
                Register
              </Link>
            </div>
          )}

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-sm hover:bg-surface-container-low rounded-full transition-colors"
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5 text-on-surface-variant" />
            ) : (
              <Menu className="w-5 h-5 text-on-surface-variant" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-surface-container-lowest border-t border-outline-variant px-margin-mobile py-lg">
          <div className="flex flex-col gap-sm">
            <NavLink
              to="/"
              className="font-body-md text-on-surface-variant hover:text-primary py-sm transition-colors"
              onClick={() => setMobileMenuOpen(false)}
              end
            >
              Home
            </NavLink>
            <NavLink
              to="/rooms"
              className="font-body-md text-on-surface-variant hover:text-primary py-sm transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Rooms
            </NavLink>
            {user && (
              <>
                <NavLink
                  to="/add-room"
                  className="font-body-md text-on-surface-variant hover:text-primary py-sm transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Add Room
                </NavLink>
                <NavLink
                  to="/my-listings"
                  className="font-body-md text-on-surface-variant hover:text-primary py-sm transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  My Listings
                </NavLink>
                <NavLink
                  to="/my-bookings"
                  className="font-body-md text-on-surface-variant hover:text-primary py-sm transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  My Bookings
                </NavLink>
              </>
            )}
            {!user && (
              <>
                <NavLink
                  to="/login"
                  className="font-body-md text-on-surface-variant hover:text-primary py-sm transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Login
                </NavLink>
                <NavLink
                  to="/register"
                  className="font-body-md text-on-surface-variant hover:text-primary py-sm transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Register
                </NavLink>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
