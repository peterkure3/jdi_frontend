import { useState } from 'react';
import MessageComposeModal from '../../components/shared/MessageComposeModal';
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
  EnvelopeOpenIcon
} from '@heroicons/react/24/outline';

export default function Messages() {
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [replyText, setReplyText] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [isComposeModalOpen, setIsComposeModalOpen] = useState(false);

  const messages = [
    {
      id: 1,
      from: 'Dr. Jane Smith',
      email: 'jane.smith@jdi.edu',
      subject: 'Assignment 3 Feedback',
      preview: 'Great work on your database design project. I have some suggestions for improvement...',
      content: 'Dear Student,\n\nGreat work on your database design project. I have some suggestions for improvement:\n\n1. Consider adding more normalization to your tables\n2. The ERD could benefit from additional relationships\n3. Your documentation is excellent\n\nOverall grade: A-\n\nBest regards,\nDr. Smith',
      timestamp: '2024-03-16T14:30:00',
      isRead: false,
      priority: 'normal',
      category: 'academic'
    },
    {
      id: 2,
      from: 'Academic Office',
      email: 'academic@jdi.edu',
      subject: 'Course Registration Reminder',
      preview: 'This is a reminder that course registration for the next semester opens tomorrow...',
      content: 'Dear Student,\n\nThis is a reminder that course registration for the next semester opens tomorrow at 9:00 AM. Please make sure to:\n\n- Review the course catalog\n- Check prerequisites\n- Meet with your advisor if needed\n- Register early to secure your preferred classes\n\nIf you have any questions, please contact the Academic Office.\n\nBest regards,\nAcademic Office',
      timestamp: '2024-03-15T10:22:00',
      isRead: true,
      priority: 'high',
      category: 'administrative'
    },
    {
      id: 3,
      from: 'Prof. Michael Johnson',
      email: 'michael.johnson@jdi.edu',
      subject: 'Office Hours Change',
      preview: 'My office hours for this week have been moved to Thursday 2-4 PM due to a conference...',
      content: 'Dear Students,\n\nMy office hours for this week have been moved to Thursday 2-4 PM due to a conference I\'m attending on Tuesday.\n\nIf you need immediate help, please email me or visit during the new time slot.\n\nThanks for understanding!\n\nProf. Johnson',
      timestamp: '2024-03-14T16:15:00',
      isRead: true,
      priority: 'normal',
      category: 'academic'
    },
    {
      id: 4,
      from: 'Finance Office',
      email: 'finance@jdi.edu',
      subject: 'Payment Due Reminder',
      preview: 'Your tuition payment for this semester is due in 5 days. Please ensure payment...',
      content: 'Dear Student,\n\nYour tuition payment for this semester is due in 5 days. Please ensure payment is made by March 20th to avoid late fees.\n\nYou can make payments through:\n- Online portal\n- Bank transfer\n- In-person at the Finance Office\n\nIf you have any payment plans or financial aid questions, please contact us immediately.\n\nFinance Office',
      timestamp: '2024-03-13T09:45:00',
      isRead: false,
      priority: 'high',
      category: 'financial'
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
      console.log('Replying to:', selectedMessage.id, 'with:', replyText);
      setReplyText('');
    }
  };

  return (
    <div className="h-full flex bg-white rounded-xl shadow-card overflow-hidden">
      {/* Messages List */}
      <div className="w-1/3 border-r border-neutral-200 flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-neutral-200">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-neutral-800">Messages</h1>
            <button 
              onClick={() => setIsComposeModalOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2 bg-brand-primary hover:bg-brand-primary-dark text-white rounded-lg hover:shadow-lg transition-all"
            >
              <PlusIcon className="w-4 h-4" />
              Compose
            </button>
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
              { id: 'financial', name: 'Financial', count: messages.filter(m => m.category === 'financial').length }
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
                  <button className="p-2 text-neutral-600 hover:bg-neutral-100 rounded-lg transition-colors" title="Mark as Unread">
                    <EnvelopeIcon className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-neutral-600 hover:bg-neutral-100 rounded-lg transition-colors" title="Archive">
                    <ArchiveBoxIcon className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Delete">
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
        userType="student"
      />
    </div>
  );
}
