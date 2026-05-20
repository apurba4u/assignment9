import { SearchX } from 'lucide-react';
import Button from './Button';

const EmptyState = ({
  icon: Icon = SearchX,
  title = 'Nothing found',
  description = 'Try adjusting your search or filters.',
  actionLabel,
  onAction,
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-2xl text-center">
      <div className="w-24 h-24 bg-surface-container flex items-center justify-center rounded-full mb-lg">
        <Icon className="w-10 h-10 text-outline" />
      </div>
      <h3 className="font-headline-md text-headline-md text-on-surface mb-xs">
        {title}
      </h3>
      <p className="font-body-md text-body-md text-on-surface-variant mb-xl max-w-sm">
        {description}
      </p>
      {actionLabel && onAction && (
        <Button variant="secondary" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
};

export default EmptyState;
