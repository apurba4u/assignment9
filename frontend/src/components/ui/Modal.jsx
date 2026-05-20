import { useEffect } from 'react';
import { X } from 'lucide-react';

const Modal = ({ isOpen, onClose, title, children, maxWidth = 'max-w-lg' }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-md"
      onClick={onClose}
    >
      <div
        className={`bg-surface ${maxWidth} w-full rounded-2xl p-xl shadow-2xl border border-outline-variant relative`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-lg">
          <h2 className="font-headline-md text-headline-md text-on-surface">
            {title}
          </h2>
          <button
            onClick={onClose}
            className="p-sm hover:bg-surface-container-low rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-on-surface-variant" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;
