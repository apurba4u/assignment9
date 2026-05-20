import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, Search } from 'lucide-react';
import Button from '../components/ui/Button';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

const NotFound = () => {
  useDocumentTitle('Page Not Found');

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-margin-mobile md:px-margin-desktop">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center"
      >
        <div className="text-[120px] md:text-[160px] font-bold text-primary/10 leading-none mb-md">
          404
        </div>
        <h1 className="font-headline-lg text-headline-lg text-on-surface mb-sm">
          Page Not Found
        </h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant mb-xl max-w-md mx-auto">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="flex flex-wrap gap-md justify-center">
          <Link to="/">
            <Button variant="primary" size="lg">
              <Home className="w-5 h-5" />
              Back to Home
            </Button>
          </Link>
          <Link to="/rooms">
            <Button variant="secondary" size="lg">
              <Search className="w-5 h-5" />
              Browse Rooms
            </Button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default NotFound;
