import { STATUS_COLORS } from '../../utils/constants';

const StatusBadge = ({ status }) => {
  const colors = STATUS_COLORS[status] || STATUS_COLORS.confirmed;

  return (
    <span
      className={`inline-flex items-center px-sm py-xs rounded-full text-label-sm font-bold ${colors.bg} ${colors.text}`}
    >
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

export default StatusBadge;
