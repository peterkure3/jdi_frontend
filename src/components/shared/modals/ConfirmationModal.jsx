import BaseModal from './BaseModal';
import { ExclamationTriangleIcon, TrashIcon, CheckIcon, XMarkIcon } from '@heroicons/react/24/outline';

export default function ConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  title = 'Confirm Action',
  message = 'Are you sure you want to proceed?',
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  type = 'warning', // 'warning', 'danger', 'info'
  isLoading = false
}) {
  const getTypeStyles = () => {
    switch (type) {
      case 'danger':
        return {
          icon: TrashIcon,
          confirmButtonClass: 'bg-status-error hover:bg-status-error/90 text-white',
          iconBgClass: 'bg-status-error'
        };
      case 'info':
        return {
          icon: CheckIcon,
          confirmButtonClass: 'bg-brand-primary hover:bg-brand-primary-dark text-white',
          iconBgClass: 'bg-brand-primary'
        };
      default: // warning
        return {
          icon: ExclamationTriangleIcon,
          confirmButtonClass: 'bg-status-warning hover:bg-status-warning/90 text-white',
          iconBgClass: 'bg-status-warning'
        };
    }
  };

  const { icon: Icon, confirmButtonClass, iconBgClass } = getTypeStyles();

  const handleConfirm = async () => {
    try {
      await onConfirm();
      onClose();
    } catch (error) {
      console.error('Confirmation action failed:', error);
      // Keep modal open on error
    }
  };

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      size="sm"
      showCloseButton={false}
      closeOnOverlayClick={!isLoading}
    >
      <div className="text-center">
        <div className={`w-16 h-16 ${iconBgClass} rounded-full flex items-center justify-center mx-auto mb-4`}>
          <Icon className="w-8 h-8 text-white" />
        </div>
        
        <h3 className="text-lg font-semibold text-neutral-800 mb-2">{title}</h3>
        <p className="text-neutral-600 mb-6">{message}</p>
        
        <div className="flex items-center gap-3 justify-center">
          <button
            onClick={onClose}
            disabled={isLoading}
            className="px-6 py-2 text-neutral-600 hover:bg-neutral-100 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {cancelText}
          </button>
          <button
            onClick={handleConfirm}
            disabled={isLoading}
            className={`px-6 py-2 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed ${confirmButtonClass}`}
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                Processing...
              </div>
            ) : (
              confirmText
            )}
          </button>
        </div>
      </div>
    </BaseModal>
  );
}
