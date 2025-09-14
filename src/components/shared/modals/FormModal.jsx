import { useState } from 'react';
import BaseModal from './BaseModal';
import { PlusIcon, PencilIcon } from '@heroicons/react/24/outline';

export default function FormModal({
  isOpen,
  onClose,
  onSubmit,
  title,
  subtitle,
  fields = [],
  initialData = {},
  submitText = 'Save',
  cancelText = 'Cancel',
  isLoading = false,
  mode = 'create' // 'create' or 'edit'
}) {
  const [formData, setFormData] = useState(initialData);
  const [errors, setErrors] = useState({});

  const handleInputChange = (fieldName, value) => {
    setFormData(prev => ({
      ...prev,
      [fieldName]: value
    }));
    
    // Clear error when user starts typing
    if (errors[fieldName]) {
      setErrors(prev => ({
        ...prev,
        [fieldName]: null
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    fields.forEach(field => {
      if (field.required && (!formData[field.name] || formData[field.name].toString().trim() === '')) {
        newErrors[field.name] = `${field.label} is required`;
      }
      
      if (field.validation && formData[field.name]) {
        const validationResult = field.validation(formData[field.name]);
        if (validationResult !== true) {
          newErrors[field.name] = validationResult;
        }
      }
    });
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    try {
      await onSubmit(formData);
      onClose();
      setFormData(initialData);
      setErrors({});
    } catch (error) {
      console.error('Form submission failed:', error);
      // Handle submission errors here
    }
  };

  const handleClose = () => {
    onClose();
    setFormData(initialData);
    setErrors({});
  };

  const renderField = (field) => {
    const commonProps = {
      id: field.name,
      name: field.name,
      value: formData?.[field.name] || '',
      onChange: (e) => handleInputChange(field.name, e.target.value),
      className: `w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-colors ${
        errors?.[field.name] ? 'border-status-error' : 'border-neutral-200'
      }`,
      placeholder: field.placeholder,
      disabled: isLoading
    };

    switch (field.type) {
      case 'textarea':
        return (
          <textarea
            {...commonProps}
            rows={field.rows || 4}
            className={`${commonProps.className} resize-none`}
          />
        );
      
      case 'select':
        return (
          <select {...commonProps}>
            <option value="">Select {field.label}</option>
            {field.options?.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );
      
      case 'number':
        return (
          <input
            {...commonProps}
            type="number"
            min={field.min}
            max={field.max}
            step={field.step}
          />
        );
      
      case 'email':
        return <input {...commonProps} type="email" />;
      
      case 'password':
        return <input {...commonProps} type="password" />;
      
      case 'date':
        return <input {...commonProps} type="date" />;
      
      case 'checkbox':
        return (
          <input
            type="checkbox"
            id={field.name}
            name={field.name}
            checked={formData?.[field.name] || false}
            onChange={(e) => handleInputChange(field.name, e.target.checked)}
            className="rounded border-neutral-300 text-brand-primary focus:ring-brand-primary/20"
            disabled={isLoading}
          />
        );
      
      default:
        return <input {...commonProps} type="text" />;
    }
  };

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={handleClose}
      title={title}
      subtitle={subtitle}
      icon={mode === 'create' ? PlusIcon : PencilIcon}
      size="md"
      closeOnOverlayClick={!isLoading}
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {fields.map(field => (
            <div key={field.name} className={field.fullWidth ? 'md:col-span-2' : ''}>
              <label htmlFor={field.name} className="block text-sm font-medium text-neutral-700 mb-2">
                {field.label}
                {field.required && <span className="text-status-error ml-1">*</span>}
              </label>
              
              {field.type === 'checkbox' ? (
                <div className="flex items-center gap-2">
                  {renderField(field)}
                  <span className="text-sm text-neutral-600">{field.checkboxLabel}</span>
                </div>
              ) : (
                renderField(field)
              )}
              
              {errors[field.name] && (
                <p className="text-status-error text-sm mt-1">{errors[field.name]}</p>
              )}
              
              {field.helpText && (
                <p className="text-neutral-500 text-sm mt-1">{field.helpText}</p>
              )}
            </div>
          ))}
        </div>

        <div className="flex items-center justify-end gap-3 pt-6 border-t border-neutral-200">
          <button
            type="button"
            onClick={handleClose}
            disabled={isLoading}
            className="px-6 py-2 text-neutral-600 hover:bg-neutral-100 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {cancelText}
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="inline-flex items-center gap-2 px-6 py-2 bg-brand-primary hover:bg-brand-primary-dark text-white rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                Processing...
              </>
            ) : (
              <>
                {mode === 'create' ? <PlusIcon className="w-4 h-4" /> : <PencilIcon className="w-4 h-4" />}
                {submitText}
              </>
            )}
          </button>
        </div>
      </form>
    </BaseModal>
  );
}
