const variants = {
  primary:
    'bg-primary text-on-primary hover:bg-primary-container hover:shadow-lg active:scale-[0.98]',
  secondary:
    'border-[1.5px] border-outline text-on-surface-variant hover:bg-surface-container hover:border-primary active:scale-[0.98]',
  ghost:
    'text-on-surface-variant hover:bg-surface-container-low active:scale-[0.98]',
  danger:
    'bg-error-container text-on-error-container hover:bg-error hover:text-on-error active:scale-[0.98]',
};

const sizes = {
  sm: 'px-md py-xs text-label-sm',
  md: 'px-lg py-sm text-label-md',
  lg: 'px-2xl py-md text-label-md',
};

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  ...props
}) => {
  return (
    <button
      className={`rounded-xl font-label-md transition-all duration-200 inline-flex items-center justify-center gap-sm ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
