import BaseModal from './BaseModal';
import { EyeIcon } from '@heroicons/react/24/outline';

export default function ViewModal({
  isOpen,
  onClose,
  title,
  subtitle,
  data = {},
  fields = [],
  actions = []
}) {
  const renderFieldValue = (field, value) => {
    if (!value && value !== 0) return <span className="text-neutral-400">Not provided</span>;

    switch (field.type) {
      case 'email':
        return <a href={`mailto:${value}`} className="text-brand-primary hover:underline">{value}</a>;
      
      case 'phone':
        return <a href={`tel:${value}`} className="text-brand-primary hover:underline">{value}</a>;
      
      case 'url':
        return <a href={value} target="_blank" rel="noopener noreferrer" className="text-brand-primary hover:underline">{value}</a>;
      
      case 'date':
        return new Date(value).toLocaleDateString();
      
      case 'datetime':
        return new Date(value).toLocaleString();
      
      case 'currency':
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
      
      case 'percentage':
        return `${value}%`;
      
      case 'status': {
        const statusColors = {
          active: 'bg-status-success/10 text-status-success',
          inactive: 'bg-neutral-100 text-neutral-600',
          pending: 'bg-status-warning/10 text-status-warning',
          approved: 'bg-status-success/10 text-status-success',
          rejected: 'bg-status-error/10 text-status-error',
          draft: 'bg-neutral-100 text-neutral-600',
          published: 'bg-status-success/10 text-status-success'
        };
        return (
          <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium capitalize ${statusColors[value] || 'bg-neutral-100 text-neutral-600'}`}>
            {value}
          </span>
        );
      }
      
      case 'array':
        return Array.isArray(value) ? value.join(', ') : value;
      
      case 'boolean':
        return value ? 'Yes' : 'No';
      
      case 'multiline':
        return (
          <div className="whitespace-pre-wrap max-h-32 overflow-y-auto">
            {value}
          </div>
        );
      
      default:
        return value;
    }
  };

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      subtitle={subtitle}
      icon={EyeIcon}
      size="lg"
    >
      <div className="space-y-6">
        {/* Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {fields.map(field => (
            <div key={field.name} className={field.fullWidth ? 'md:col-span-2' : ''}>
              <div className="flex flex-col">
                <label className="text-sm font-medium text-neutral-700 mb-1">
                  {field.label}
                </label>
                <div className="text-neutral-800">
                  {renderFieldValue(field, data?.[field.name])}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Actions */}
        {actions.length > 0 && (
          <div className="flex items-center justify-end gap-3 pt-6 border-t border-neutral-200">
            <button
              onClick={onClose}
              className="px-6 py-2 text-neutral-600 hover:bg-neutral-100 rounded-lg transition-colors"
            >
              Close
            </button>
            {actions.map((action, index) => (
              <button
                key={index}
                onClick={action.onClick}
                className={`inline-flex items-center gap-2 px-6 py-2 rounded-lg transition-all ${action.className || 'bg-brand-primary hover:bg-brand-primary-dark text-white'}`}
              >
                {action.icon && <action.icon className="w-4 h-4" />}
                {action.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </BaseModal>
  );
}
