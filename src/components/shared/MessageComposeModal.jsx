import { useState } from 'react';
import {
  EnvelopeIcon,
  XMarkIcon,
  CloudArrowUpIcon,
  DocumentIcon,
  BookmarkIcon,
  ClockIcon,
  PaperAirplaneIcon
} from '@heroicons/react/24/outline';

export default function MessageComposeModal({ isOpen, onClose, userType = 'student' }) {
  const [formData, setFormData] = useState({
    recipient: '',
    subject: '',
    message: '',
    priority: 'normal',
    attachments: []
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle message sending logic here
    console.log('Sending message:', formData);
    
    // Reset form and close modal
    setFormData({
      recipient: '',
      subject: '',
      message: '',
      priority: 'normal',
      attachments: []
    });
    onClose();
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    setFormData(prev => ({
      ...prev,
      attachments: [...prev.attachments, ...files]
    }));
  };

  const removeAttachment = (index) => {
    setFormData(prev => ({
      ...prev,
      attachments: prev.attachments.filter((_, i) => i !== index)
    }));
  };

  const getRecipientOptions = () => {
    if (userType === 'student') {
      return [
        { value: 'instructor', label: 'Instructor' },
        { value: 'advisor', label: 'Academic Advisor' },
        { value: 'admin', label: 'Administration' },
        { value: 'support', label: 'Technical Support' },
        { value: 'classmate', label: 'Classmate' }
      ];
    } else {
      return [
        { value: 'student', label: 'Student' },
        { value: 'colleague', label: 'Colleague' },
        { value: 'admin', label: 'Administration' },
        { value: 'department', label: 'Department Head' },
        { value: 'all_students', label: 'All Students in Course' }
      ];
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-neutral-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-brand-primary to-brand-primary-dark rounded-lg flex items-center justify-center">
              <EnvelopeIcon className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-neutral-800">Compose Message</h2>
              <p className="text-sm text-neutral-500">Send a new message</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100 rounded-lg transition-colors"
          >
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          {/* Recipient */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              To
            </label>
            <select
              name="recipient"
              value={formData.recipient}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-colors"
            >
              <option value="">Select recipient...</option>
              {getRecipientOptions().map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Subject */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Subject
            </label>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleInputChange}
              required
              placeholder="Enter message subject..."
              className="w-full px-4 py-3 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-colors"
            />
          </div>

          {/* Priority */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Priority
            </label>
            <div className="flex gap-3">
              {['low', 'normal', 'high', 'urgent'].map(priority => (
                <label key={priority} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="priority"
                    value={priority}
                    checked={formData.priority === priority}
                    onChange={handleInputChange}
                    className="text-brand-primary focus:ring-brand-primary/20"
                  />
                  <span className={`text-sm capitalize ${
                    priority === 'urgent' ? 'text-status-error' :
                    priority === 'high' ? 'text-status-warning' :
                    priority === 'low' ? 'text-neutral-500' :
                    'text-neutral-700'
                  }`}>
                    {priority}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Message */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Message
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              required
              rows={8}
              placeholder="Type your message here..."
              className="w-full px-4 py-3 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-colors resize-none"
            />
          </div>

          {/* Attachments */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Attachments
            </label>
            <div className="border-2 border-dashed border-neutral-200 rounded-lg p-6 text-center hover:border-brand-primary/50 transition-colors">
              <input
                type="file"
                multiple
                onChange={handleFileUpload}
                className="hidden"
                id="file-upload"
              />
              <label htmlFor="file-upload" className="cursor-pointer">
                <CloudArrowUpIcon className="w-8 h-8 text-neutral-400 mb-2" />
                <p className="text-sm text-neutral-600">
                  Click to upload files or drag and drop
                </p>
                <p className="text-xs text-neutral-500 mt-1">
                  PDF, DOC, JPG, PNG up to 10MB each
                </p>
              </label>
            </div>

            {/* Attachment List */}
            {formData.attachments.length > 0 && (
              <div className="mt-3 space-y-2">
                {formData.attachments.map((file, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-neutral-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <DocumentIcon className="w-5 h-5 text-neutral-400" />
                      <div>
                        <div className="text-sm font-medium text-neutral-800">{file.name}</div>
                        <div className="text-xs text-neutral-500">{(file.size / 1024 / 1024).toFixed(2)} MB</div>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeAttachment(index)}
                      className="p-1 text-neutral-400 hover:text-status-error transition-colors"
                    >
                      <XMarkIcon className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between pt-4 border-t border-neutral-200">
            <div className="flex items-center gap-3">
              <button
                type="button"
                className="inline-flex items-center gap-2 px-4 py-2 text-neutral-600 hover:bg-neutral-100 rounded-lg transition-colors"
              >
                <BookmarkIcon className="w-4 h-4" />
                Save Draft
              </button>
              <button
                type="button"
                className="inline-flex items-center gap-2 px-4 py-2 text-neutral-600 hover:bg-neutral-100 rounded-lg transition-colors"
              >
                <ClockIcon className="w-4 h-4" />
                Schedule
              </button>
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2 text-neutral-600 hover:bg-neutral-100 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="inline-flex items-center gap-2 px-6 py-2 bg-brand-primary text-white rounded-lg hover:bg-brand-primary-dark transition-all"
              >
                <PaperAirplaneIcon className="w-4 h-4" />
                Send Message
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
