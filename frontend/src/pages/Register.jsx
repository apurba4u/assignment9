import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { UserPlus, Mail, Lock, User, Image, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Button from '../components/ui/Button';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import toast from 'react-hot-toast';

const Register = () => {
  useDocumentTitle('Register');
  const { register: registerUser, googleLogin } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await registerUser(data.name, data.email, data.photoURL, data.password);
      toast.success('Registration successful! Please login.');
      navigate('/login');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await googleLogin(
        'Demo User',
        `demo${Date.now()}@studynook.com`,
        ''
      );
      toast.success('Welcome!');
      navigate('/');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Google login failed');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-margin-mobile md:px-margin-desktop">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-xl">
          <h1 className="font-headline-lg text-headline-lg text-on-surface mb-xs">
            Create Account
          </h1>
          <p className="font-body-md text-body-md text-on-surface-variant">
            Join StudyNook and start booking study rooms
          </p>
        </div>

        <div className="bg-surface-container-lowest border border-outline-variant rounded-2xl p-xl">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-lg">
            <div>
              <label className="font-label-md text-label-md text-on-surface block mb-sm">
                Name
              </label>
              <div className="relative">
                <User className="absolute left-md top-1/2 -translate-y-1/2 w-5 h-5 text-on-surface-variant" />
                <input
                  type="text"
                  {...register('name', { required: 'Name is required' })}
                  placeholder="Your full name"
                  className="w-full pl-12 pr-md py-md bg-surface border border-outline-variant rounded-xl font-body-md text-on-surface placeholder:text-on-surface-variant/60 focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              {errors.name && (
                <p className="text-error font-body-sm mt-xs">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div>
              <label className="font-label-md text-label-md text-on-surface block mb-sm">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-md top-1/2 -translate-y-1/2 w-5 h-5 text-on-surface-variant" />
                <input
                  type="email"
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: 'Invalid email address',
                    },
                  })}
                  placeholder="your@email.com"
                  className="w-full pl-12 pr-md py-md bg-surface border border-outline-variant rounded-xl font-body-md text-on-surface placeholder:text-on-surface-variant/60 focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              {errors.email && (
                <p className="text-error font-body-sm mt-xs">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label className="font-label-md text-label-md text-on-surface block mb-sm">
                Photo URL
              </label>
              <div className="relative">
                <Image className="absolute left-md top-1/2 -translate-y-1/2 w-5 h-5 text-on-surface-variant" />
                <input
                  type="url"
                  {...register('photoURL')}
                  placeholder="https://example.com/photo.jpg"
                  className="w-full pl-12 pr-md py-md bg-surface border border-outline-variant rounded-xl font-body-md text-on-surface placeholder:text-on-surface-variant/60 focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>

            <div>
              <label className="font-label-md text-label-md text-on-surface block mb-sm">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-md top-1/2 -translate-y-1/2 w-5 h-5 text-on-surface-variant" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  {...register('password', {
                    required: 'Password is required',
                    minLength: {
                      value: 6,
                      message: 'Password must be at least 6 characters',
                    },
                    pattern: {
                      value: /^(?=.*[a-z])(?=.*[A-Z])/,
                      message:
                        'Must contain at least one uppercase and one lowercase letter',
                    },
                  })}
                  placeholder="••••••••"
                  className="w-full pl-12 pr-12 py-md bg-surface border border-outline-variant rounded-xl font-body-md text-on-surface placeholder:text-on-surface-variant/60 focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-md top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-on-surface"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-error font-body-sm mt-xs">
                  {errors.password.message}
                </p>
              )}
            </div>

            <Button
              variant="primary"
              className="w-full"
              size="lg"
              type="submit"
              disabled={loading}
            >
              <UserPlus className="w-5 h-5" />
              {loading ? 'Creating account...' : 'Create Account'}
            </Button>
          </form>

          <div className="my-lg flex items-center gap-md">
            <div className="flex-1 h-px bg-outline-variant" />
            <span className="font-label-sm text-label-sm text-on-surface-variant">
              OR
            </span>
            <div className="flex-1 h-px bg-outline-variant" />
          </div>

          <button
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-md py-md border-[1.5px] border-outline-variant rounded-xl font-label-md text-label-md text-on-surface hover:bg-surface-container transition-all active:scale-[0.98]"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            Continue with Google
          </button>
        </div>

        <p className="text-center mt-lg font-body-md text-body-md text-on-surface-variant">
          Already have an account?{' '}
          <Link to="/login" className="text-primary font-bold hover:underline">
            Sign In
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Register;
