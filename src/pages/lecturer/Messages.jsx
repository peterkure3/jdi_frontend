import { useState } from 'react';
import MessageComposeModal from '../../components/shared/MessageComposeModal';
import { FormModal, ViewModal, ConfirmationModal } from '../../components/shared/modals';
import {
  PlusIcon,
  MagnifyingGlassIcon,
  ExclamationTriangleIcon,
  InboxIcon,
  UserIcon,
  EnvelopeIcon,
  ClockIcon,
  ArchiveBoxIcon,
  TrashIcon,
  PaperClipIcon,
  FaceSmileIcon,
  EnvelopeOpenIcon,
  EyeIcon,
  PencilIcon,
  UserGroupIcon,
  BellIcon,
  DocumentTextIcon,
  TagIcon
} from '@heroicons/react/24/outline';

export default function Messages() {
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [replyText, setReplyText] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [isComposeModalOpen, setIsComposeModalOpen] = useState(false);
  const [showMessageDetailsModal, setShowMessageDetailsModal] = useState(false);
  const [showBulkMessageModal, setShowBulkMessageModal] = useState(false);
  const [showAutoReplyModal, setShowAutoReplyModal] = useState(false);
  const [showMessageTemplateModal, setShowMessageTemplateModal] = useState(false);
  const [showArchiveConfirmModal, setShowArchiveConfirmModal] = useState(false);
  const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState(false);
  const messages = [
    {
      id: 1,
      from: 'John Smith',
      email: 'john.smith@student.edu',
      subject: 'Question about Assignment 3',
      preview: 'Hi Professor, I have a question regarding the database design assignment...',
      content: 'Hi Professor,\n\nI have a question regarding the database design assignment. I\'m having trouble understanding the normalization requirements for the third normal form. Could you please provide some additional guidance or examples?\n\nThank you for your time.\n\nBest regards,\nJohn Smith',
      timestamp: '2024-03-16T10:30:00',
      isRead: false,
      priority: 'normal',
      category: 'academic'
    },
    {
      id: 2,
      from: 'Sarah Johnson',
      email: 'sarah.johnson@student.edu',
      subject: 'Request for Extension',
      preview: 'Dear Professor, I am writing to request a brief extension for the upcoming project...',
      content: 'Dear Professor,\n\nI am writing to request a brief extension for the upcoming project deadline. Due to a family emergency, I have fallen behind on my coursework. Would it be possible to have an additional 3 days to complete the assignment?\n\nI understand this is short notice and I apologize for any inconvenience.\n\nSincerely,\nSarah Johnson',
      timestamp: '2024-03-15T14:22:00',
      isRead: true,
      priority: 'high',
      category: 'administrative'
    },
    {
      id: 3,
      from: 'Mike Chen',
      email: 'mike.chen@student.edu',
      subject: 'Office Hours Availability',
      preview: 'Hello, I wanted to check if you have any availability during office hours this week...',
      content: 'Hello Professor,\n\nI wanted to check if you have any availability during office hours this week. I\'m struggling with some concepts from the recent lectures and would benefit from some one-on-one explanation.\n\nPlease let me know what times work best for you.\n\nThanks,\nMike Chen',
      timestamp: '2024-03-14T09:15:00',
      isRead: true,
      priority: 'normal',
      category: 'academic'
    },
    {
      id: 4,
      from: 'Emily Davis',
      email: 'emily.davis@student.edu',
      subject: 'Grade Inquiry',
      preview: 'Hi Professor, I received my grade for the midterm exam and wanted to discuss...',
      content: 'Hi Professor,\n\nI received my grade for the midterm exam and wanted to discuss some of the feedback. I believe there might be an error in the grading of question 5. Could we schedule a time to review it together?\n\nI\'ve attached my exam paper for reference.\n\nBest,\nEmily Davis',
      timestamp: '2024-03-13T16:45:00',
      isRead: false,
      priority: 'normal',
      category: 'grades'
    }
  ];

  const filteredMessages = messages.filter(message => {
    const matchesSearch = message.from.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         message.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         message.preview.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || 
                         (selectedFilter === 'unread' && !message.isRead) ||
                         (selectedFilter === 'priority' && message.priority === 'high') ||
                         message.category === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  const unreadCount = messages.filter(m => !m.isRead).length;
  const priorityCount = messages.filter(m => m.priority === 'high').length;

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = (now - date) / (1000 * 60 * 60);
    
    if (diffInHours < 24) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else {
      return date.toLocaleDateString();
    }
  };

  const handleReply = () => {
    if (replyText.trim() && selectedMessage) {
      // Handle reply logic here
      console.log('Replying to:', selectedMessage.id, 'with:', replyText);
      setReplyText('');
      // You would typically send this to your backend
    }
  };

  // Enhanced handler functions
  const handleViewMessageDetails = (message) => {
    setSelectedMessage(message);
    setShowMessageDetailsModal(true);
  };

  const handleMarkAsRead = (message) => {
    console.log('Marking message as read:', message.id);
    // Update message read status
  };

  const handleMarkAsUnread = (message) => {
    console.log('Marking message as unread:', message.id);
    // Update message read status
  };

  const handleArchiveMessage = (message) => {
    setSelectedMessage(message);
    setShowArchiveConfirmModal(true);
  };

  const handleDeleteMessage = (message) => {
    setSelectedMessage(message);
    setShowDeleteConfirmModal(true);
  };

  const handleConfirmArchive = async () => {
    console.log('Archiving message:', selectedMessage?.id);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setShowArchiveConfirmModal(false);
  };

  const handleConfirmDelete = async () => {
    console.log('Deleting message:', selectedMessage?.id);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setShowDeleteConfirmModal(false);
  };

  const handleBulkMessage = async (bulkData) => {
    console.log('Sending bulk message:', bulkData);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setShowBulkMessageModal(false);
  };

  const handleSetupAutoReply = async (autoReplyData) => {
    console.log('Setting up auto-reply:', autoReplyData);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setShowAutoReplyModal(false);
  };

  const handleCreateTemplate = async (templateData) => {
    console.log('Creating message template:', templateData);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setShowMessageTemplateModal(false);
  };


  // Field definitions
  const messageDetailsFields = [
    { name: 'from', label: 'From', type: 'text' },
    { name: 'email', label: 'Email', type: 'email' },
    { name: 'subject', label: 'Subject', type: 'text' },
    { name: 'timestamp', label: 'Received', type: 'datetime' },
    { name: 'priority', label: 'Priority', type: 'status' },
    { name: 'category', label: 'Category', type: 'text' },
    { name: 'isRead', label: 'Read Status', type: 'boolean' },
    { name: 'content', label: 'Message Content', type: 'text', fullWidth: true }
  ];

  const bulkMessageFields = [
    { name: 'recipients', label: 'Recipients', type: 'select', required: true, multiple: true, options: [
      { value: 'all_students', label: 'All Students' },
      { value: 'cs101_students', label: 'CS101 Students' },
      { value: 'math201_students', label: 'MATH201 Students' },
      { value: 'phys101_students', label: 'PHYS101 Students' },
      { value: 'custom', label: 'Custom Selection' }
    ]},
    { name: 'subject', label: 'Subject', type: 'text', required: true, fullWidth: true },
    { name: 'priority', label: 'Priority', type: 'select', required: true, options: [
      { value: 'low', label: 'Low' },
      { value: 'normal', label: 'Normal' },
      { value: 'high', label: 'High' },
      { value: 'urgent', label: 'Urgent' }
    ]},
    { name: 'category', label: 'Category', type: 'select', required: true, options: [
      { value: 'academic', label: 'Academic' },
      { value: 'administrative', label: 'Administrative' },
      { value: 'announcement', label: 'Announcement' },
      { value: 'grades', label: 'Grades' }
    ]},
    { name: 'message', label: 'Message', type: 'textarea', rows: 8, required: true, fullWidth: true },
    { name: 'attachments', label: 'Attachments', type: 'file', multiple: true },
    { name: 'schedule_send', label: 'Schedule for later', type: 'checkbox' },
    { name: 'send_time', label: 'Send Time', type: 'datetime' }
  ];

  const autoReplyFields = [
    { name: 'enabled', label: 'Enable Auto-Reply', type: 'checkbox', required: true },
    { name: 'subject_prefix', label: 'Subject Prefix', type: 'text', placeholder: 'Re: Auto-Reply' },
    { name: 'message', label: 'Auto-Reply Message', type: 'textarea', rows: 6, required: true, fullWidth: true },
    { name: 'trigger_keywords', label: 'Trigger Keywords (comma-separated)', type: 'text', fullWidth: true },
    { name: 'exclude_categories', label: 'Exclude Categories', type: 'select', multiple: true, options: [
      { value: 'urgent', label: 'Urgent Messages' },
      { value: 'grades', label: 'Grade Inquiries' },
      { value: 'administrative', label: 'Administrative' }
    ]},
    { name: 'active_hours_only', label: 'Only during office hours', type: 'checkbox' },
    { name: 'max_replies_per_day', label: 'Max Auto-Replies per Day', type: 'number', min: '1', max: '50' }
  ];

  const templateFields = [
    { name: 'name', label: 'Template Name', type: 'text', required: true },
    { name: 'category', label: 'Category', type: 'select', required: true, options: [
      { value: 'assignment_feedback', label: 'Assignment Feedback' },
      { value: 'grade_explanation', label: 'Grade Explanation' },
      { value: 'office_hours', label: 'Office Hours' },
      { value: 'general_inquiry', label: 'General Inquiry' },
      { value: 'extension_response', label: 'Extension Response' }
    ]},
    { name: 'subject', label: 'Subject Template', type: 'text', required: true, fullWidth: true },
    { name: 'content', label: 'Message Template', type: 'textarea', rows: 8, required: true, fullWidth: true },
    { name: 'variables', label: 'Available Variables', type: 'text', placeholder: '{{student_name}}, {{course_name}}, {{assignment_name}}', fullWidth: true },
    { name: 'is_default', label: 'Set as default for this category', type: 'checkbox' }
  ];

  return (
    <div className="h-full flex bg-white rounded-xl shadow-card overflow-hidden">
      {/* Messages List */}
      <div className="w-1/3 border-r border-neutral-200 flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-neutral-200">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-neutral-800">Messages</h1>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setIsComposeModalOpen(true)}
                className="inline-flex items-center gap-2 px-4 py-2 bg-brand-primary hover:bg-brand-primary-dark text-white rounded-lg hover:shadow-lg transition-all"
              >
                <PlusIcon className="w-4 h-4" />
                Compose
              </button>
              <button 
                onClick={() => setShowBulkMessageModal(true)}
                className="inline-flex items-center gap-2 px-3 py-2 bg-accent-purple hover:bg-accent-purple/90 text-white rounded-lg hover:shadow-lg transition-all"
                title="Bulk Message"
              >
                <UserGroupIcon className="w-4 h-4" />
              </button>
              <button 
                onClick={() => setShowAutoReplyModal(true)}
                className="inline-flex items-center gap-2 px-3 py-2 bg-accent-cyan hover:bg-accent-cyan/90 text-white rounded-lg hover:shadow-lg transition-all"
                title="Auto-Reply Settings"
              >
                <BellIcon className="w-4 h-4" />
              </button>
              <button 
                onClick={() => setShowMessageTemplateModal(true)}
                className="inline-flex items-center gap-2 px-3 py-2 bg-status-success hover:bg-status-success/90 text-white rounded-lg hover:shadow-lg transition-all"
                title="Message Templates"
              >
                <DocumentTextIcon className="w-4 h-4" />
              </button>
            </div>
          </div>
          
          {/* Search */}
          <div className="relative mb-4">
            <MagnifyingGlassIcon className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400" />
            <input
              type="text"
              placeholder="Search messages..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-colors"
            />
          </div>
          
          {/* Filters */}
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'all', name: 'All', count: messages.length },
              { id: 'unread', name: 'Unread', count: unreadCount },
              { id: 'priority', name: 'Priority', count: priorityCount },
              { id: 'academic', name: 'Academic', count: messages.filter(m => m.category === 'academic').length },
              { id: 'grades', name: 'Grades', count: messages.filter(m => m.category === 'grades').length }
            ].map((filter) => (
              <button
                key={filter.id}
                onClick={() => setSelectedFilter(filter.id)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                  selectedFilter === filter.id
                    ? 'bg-brand-primary text-white'
                    : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                }`}
              >
                {filter.name} ({filter.count})
              </button>
            ))}
          </div>
        </div>
        
        {/* Message List */}
        <div className="flex-1 overflow-y-auto">
          {filteredMessages.map((message) => (
            <div
              key={message.id}
              onClick={() => setSelectedMessage(message)}
              className={`p-4 border-b border-neutral-100 cursor-pointer hover:bg-neutral-50 transition-colors ${
                selectedMessage?.id === message.id ? 'bg-brand-primary/5 border-l-4 border-l-brand-primary' : ''
              } ${!message.isRead ? 'bg-blue-50/50' : ''}`}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <h3 className={`font-medium ${!message.isRead ? 'text-neutral-900' : 'text-neutral-700'}`}>
                    {message.from}
                  </h3>
                  {!message.isRead && (
                    <div className="w-2 h-2 bg-brand-primary rounded-full"></div>
                  )}
                  {message.priority === 'high' && (
                    <ExclamationTriangleIcon className="w-3 h-3 text-red-500" />
                  )}
                </div>
                <span className="text-xs text-neutral-500">
                  {formatTimestamp(message.timestamp)}
                </span>
              </div>
              <h4 className={`text-sm mb-1 ${!message.isRead ? 'font-semibold text-neutral-900' : 'text-neutral-700'}`}>
                {message.subject}
              </h4>
              <p className="text-xs text-neutral-500 line-clamp-2">
                {message.preview}
              </p>
            </div>
          ))}
          
          {filteredMessages.length === 0 && (
            <div className="p-8 text-center">
              <InboxIcon className="w-12 h-12 text-neutral-300 mb-3" />
              <p className="text-neutral-500">No messages found</p>
            </div>
          )}
        </div>
      </div>
      
      {/* Message Content */}
      <div className="flex-1 flex flex-col">
        {selectedMessage ? (
          <>
            {/* Message Header */}
            <div className="p-6 border-b border-neutral-200">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-xl font-semibold text-neutral-800 mb-2">
                    {selectedMessage.subject}
                  </h2>
                  <div className="flex items-center gap-4 text-sm text-neutral-600">
                    <span className="flex items-center gap-2">
                      <UserIcon className="w-4 h-4" />
                      {selectedMessage.from}
                    </span>
                    <span className="flex items-center gap-2">
                      <EnvelopeIcon className="w-4 h-4" />
                      {selectedMessage.email}
                    </span>
                    <span className="flex items-center gap-2">
                      <ClockIcon className="w-4 h-4" />
                      {new Date(selectedMessage.timestamp).toLocaleString()}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => handleViewMessageDetails(selectedMessage)}
                    className="p-2 text-neutral-600 hover:bg-neutral-100 rounded-lg transition-colors" 
                    title="View Details"
                  >
                    <EyeIcon className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => selectedMessage.isRead ? handleMarkAsUnread(selectedMessage) : handleMarkAsRead(selectedMessage)}
                    className="p-2 text-neutral-600 hover:bg-neutral-100 rounded-lg transition-colors" 
                    title={selectedMessage.isRead ? "Mark as Unread" : "Mark as Read"}
                  >
                    <EnvelopeIcon className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => handleArchiveMessage(selectedMessage)}
                    className="p-2 text-neutral-600 hover:bg-neutral-100 rounded-lg transition-colors" 
                    title="Archive"
                  >
                    <ArchiveBoxIcon className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => handleDeleteMessage(selectedMessage)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors" 
                    title="Delete"
                  >
                    <TrashIcon className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
            
            {/* Message Body */}
            <div className="flex-1 p-6 overflow-y-auto">
              <div className="prose max-w-none">
                <div className="whitespace-pre-wrap text-neutral-700 leading-relaxed">
                  {selectedMessage.content}
                </div>
              </div>
            </div>
            
            {/* Reply Section */}
            <div className="border-t border-neutral-200 p-6">
              <div className="mb-4">
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Reply to {selectedMessage.from}
                </label>
                <textarea
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Type your reply..."
                  rows={4}
                  className="w-full px-3 py-2 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-colors resize-none"
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <button className="flex items-center gap-2 text-sm text-neutral-600 hover:text-neutral-800 transition-colors">
                    <PaperClipIcon className="w-4 h-4" />
                    Attach File
                  </button>
                  <button className="flex items-center gap-2 text-sm text-neutral-600 hover:text-neutral-800 transition-colors">
                    <FaceSmileIcon className="w-4 h-4" />
                    Add Emoji
                  </button>
                </div>
                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => setReplyText('')}
                    className="px-4 py-2 text-neutral-600 hover:bg-neutral-100 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={handleReply}
                    disabled={!replyText.trim()}
                    className="px-6 py-2 bg-brand-primary hover:bg-brand-primary-dark text-white rounded-lg font-medium hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Send Reply
                  </button>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <EnvelopeOpenIcon className="w-16 h-16 text-neutral-300 mb-4" />
              <h3 className="text-lg font-medium text-neutral-600 mb-2">Select a message</h3>
              <p className="text-neutral-500">Choose a message from the list to read and reply</p>
            </div>
          </div>
        )}
      </div>

      {/* Message Compose Modal */}
      <MessageComposeModal 
        isOpen={isComposeModalOpen}
        onClose={() => setIsComposeModalOpen(false)}
        userType="lecturer"
      />

      {/* Enhanced Modals */}
      <ViewModal
        isOpen={showMessageDetailsModal}
        onClose={() => setShowMessageDetailsModal(false)}
        title="Message Details"
        subtitle="Complete message information and metadata"
        data={{
          ...selectedMessage,
          timestamp: selectedMessage ? new Date(selectedMessage.timestamp).toLocaleString() : '',
          isRead: selectedMessage?.isRead ? 'Read' : 'Unread'
        }}
        fields={messageDetailsFields}
        actions={[
          {
            label: 'Archive',
            onClick: () => {
              setShowMessageDetailsModal(false);
              handleArchiveMessage(selectedMessage);
            },
            variant: 'secondary'
          },
          {
            label: 'Reply',
            onClick: () => {
              setShowMessageDetailsModal(false);
              // Focus on reply textarea
            },
            variant: 'primary'
          }
        ]}
      />

      <FormModal
        isOpen={showBulkMessageModal}
        onClose={() => setShowBulkMessageModal(false)}
        onSubmit={handleBulkMessage}
        title="Send Bulk Message"
        subtitle="Send a message to multiple students at once"
        fields={bulkMessageFields}
        submitText="Send to All Recipients"
        mode="create"
      />

      <FormModal
        isOpen={showAutoReplyModal}
        onClose={() => setShowAutoReplyModal(false)}
        onSubmit={handleSetupAutoReply}
        title="Auto-Reply Settings"
        subtitle="Configure automatic responses to student messages"
        fields={autoReplyFields}
        submitText="Save Auto-Reply Settings"
        mode="create"
      />

      <FormModal
        isOpen={showMessageTemplateModal}
        onClose={() => setShowMessageTemplateModal(false)}
        onSubmit={handleCreateTemplate}
        title="Create Message Template"
        subtitle="Create reusable message templates for common responses"
        fields={templateFields}
        submitText="Create Template"
        mode="create"
      />

      <ConfirmationModal
        isOpen={showArchiveConfirmModal}
        onClose={() => setShowArchiveConfirmModal(false)}
        onConfirm={handleConfirmArchive}
        title="Archive Message"
        message={`Are you sure you want to archive the message "${selectedMessage?.subject}"? You can find archived messages in the Archive folder.`}
        confirmText="Archive"
        cancelText="Cancel"
        type="info"
      />

      <ConfirmationModal
        isOpen={showDeleteConfirmModal}
        onClose={() => setShowDeleteConfirmModal(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Message"
        message={`Are you sure you want to permanently delete the message "${selectedMessage?.subject}"? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        type="danger"
      />
    </div>
  );
}
