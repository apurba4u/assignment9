import { Link } from 'react-router-dom';

const XIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const Footer = () => {
  return (
    <footer className="w-full py-xl px-margin-mobile md:px-margin-desktop bg-surface-container-low dark:bg-inverse-surface border-t border-outline-variant">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-md">
        <div className="flex flex-col items-center md:items-start gap-xs">
          <Link
            to="/"
            className="font-headline-md text-headline-md font-bold text-primary dark:text-primary-fixed"
          >
            StudyNook
          </Link>
          <p className="font-body-sm text-body-sm text-on-surface-variant">
            © 2024 StudyNook. All rights reserved.
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-xl">
          <a
            href="#"
            className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-all hover:underline"
          >
            Privacy Policy
          </a>
          <a
            href="#"
            className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-all hover:underline"
          >
            Terms of Service
          </a>
          <a
            href="#"
            className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-all hover:underline"
          >
            Contact Us
          </a>
          <a
            href="#"
            className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-all hover:underline"
          >
            Help Center
          </a>
        </div>
        <div className="flex gap-md">
          <a
            href="#"
            className="w-8 h-8 rounded-full border border-outline-variant flex items-center justify-center text-on-surface-variant hover:border-primary hover:text-primary transition-all"
          >
            <XIcon />
          </a>
          <a
            href="#"
            className="w-8 h-8 rounded-full border border-outline-variant flex items-center justify-center text-on-surface-variant hover:border-primary hover:text-primary transition-all"
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
              <path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12c0-5.523-4.477-10-10-10z" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
