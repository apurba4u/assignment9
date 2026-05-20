const SectionTitle = ({ title, description, action, className = '' }) => {
  return (
    <div className={`flex flex-col md:flex-row md:items-end justify-between gap-md mb-xl ${className}`}>
      <div>
        <h2 className="font-headline-lg text-headline-lg text-on-surface mb-xs">
          {title}
        </h2>
        {description && (
          <p className="font-body-md text-body-md text-on-surface-variant">
            {description}
          </p>
        )}
      </div>
      {action && action}
    </div>
  );
};

export default SectionTitle;
