import { useState } from 'react';
import {
  DocumentArrowUpIcon,
  PlusIcon,
  SpeakerWaveIcon,
  EnvelopeIcon,
  UsersIcon,
  EyeIcon,
  DocumentTextIcon,
  PencilIcon,
  TrashIcon,
  CircleStackIcon
} from '@heroicons/react/24/outline';

export default function Communications() {
  const [activeTab, setActiveTab] = useState('announcements');
  const [selectedRecipients, setSelectedRecipients] = useState('all');
  const [messageType, setMessageType] = useState('announcement');

  const announcements = [
    {
      id: 1,
      title: 'Spring Semester Registration Open',
      content: 'Registration for Spring 2024 semester is now open. Students can register through the portal.',
      author: 'Admin Office',
      date: '2024-03-15',
      recipients: 'All Students',
      status: 'published',
      views: 1247
    },
    {
      id: 2,
      title: 'System Maintenance Scheduled',
      content: 'The portal will be under maintenance on March 20th from 2:00 AM to 6:00 AM.',
      author: 'IT Department',
      date: '2024-03-14',
      recipients: 'All Users',
      status: 'published',
      views: 892
    },
    {
      id: 3,
      title: 'New Course Offerings',
      content: 'We are excited to announce new courses in Data Science and AI for the upcoming semester.',
      author: 'Academic Office',
      date: '2024-03-12',
      recipients: 'Students & Faculty',
      status: 'draft',
      views: 0
    }
  ];

  const messages = [
    {
      id: 1,
      subject: 'Grade Submission Deadline',
      from: 'academic@jdi.edu',
      to: 'All Lecturers',
      date: '2024-03-16',
      status: 'sent',
      priority: 'high'
    },
    {
      id: 2,
      subject: 'Welcome to JDI Portal',
      from: 'admin@jdi.edu',
      to: 'New Students',
      date: '2024-03-15',
      status: 'sent',
      priority: 'normal'
    },
    {
      id: 3,
      subject: 'Payment Reminder',
      from: 'finance@jdi.edu',
      to: 'Students with Outstanding Fees',
      date: '2024-03-14',
      status: 'scheduled',
      priority: 'normal'
    }
  ];

  const templates = [
    { id: 1, name: 'Welcome Message', category: 'Onboarding', usage: 45 },
    { id: 2, name: 'Grade Notification', category: 'Academic', usage: 123 },
    { id: 3, name: 'Payment Reminder', category: 'Financial', usage: 67 },
    { id: 4, name: 'System Maintenance', category: 'Technical', usage: 12 },
    { id: 5, name: 'Course Registration', category: 'Academic', usage: 89 }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'published':
      case 'sent':
        return 'bg-status-success/10 text-status-success';
      case 'draft':
        return 'bg-status-warning/10 text-status-warning';
      case 'scheduled':
        return 'bg-status-info/10 text-status-info';
      default:
        return 'bg-neutral-100 text-neutral-600';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'text-status-error';
      case 'normal':
        return 'text-neutral-600';
      case 'low':
        return 'text-neutral-400';
      default:
        return 'text-neutral-600';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-neutral-800">Communications</h1>
          <p className="text-neutral-600 mt-1">Manage announcements, messages, and notifications</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-neutral-200 rounded-xl hover:bg-neutral-50 transition-colors">
            <DocumentArrowUpIcon className="w-4 h-4" />
            Import Contacts
          </button>
          <button className="inline-flex items-center gap-2 px-4 py-2 bg-brand-primary hover:bg-brand-primary-dark text-white rounded-xl hover:shadow-lg transition-all">
            <PlusIcon className="w-4 h-4" />
            New Message
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-card p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-brand-primary to-brand-primaryDark rounded-lg flex items-center justify-center">
              <SpeakerWaveIcon className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-neutral-800">{announcements.length}</div>
              <div className="text-sm text-neutral-500">Announcements</div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-card p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-status-success to-accent-lime rounded-lg flex items-center justify-center">
              <EnvelopeIcon className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-neutral-800">{messages.filter(m => m.status === 'sent').length}</div>
              <div className="text-sm text-neutral-500">Messages Sent</div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-card p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-accent-purple to-accent-pink rounded-lg flex items-center justify-center">
              <UsersIcon className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-neutral-800">1,847</div>
              <div className="text-sm text-neutral-500">Total Recipients</div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-card p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-accent-cyan to-accent-cyanDark rounded-lg flex items-center justify-center">
              <EyeIcon className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-neutral-800">2,139</div>
              <div className="text-sm text-neutral-500">Total Views</div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-card">
        <div className="border-b border-neutral-200">
          <nav className="flex space-x-8 px-6">
            {[
              { id: 'announcements', name: 'Announcements', icon: 'SpeakerWaveIcon' },
              { id: 'messages', name: 'Messages', icon: 'EnvelopeIcon' },
              { id: 'templates', name: 'Templates', icon: 'DocumentTextIcon' },
              { id: 'compose', name: 'Compose', icon: 'PencilIcon' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-brand-primary text-brand-primary'
                    : 'border-transparent text-neutral-500 hover:text-neutral-700 hover:border-neutral-300'
                }`}
              >
                {tab.icon === 'SpeakerWaveIcon' && <SpeakerWaveIcon className="w-4 h-4" />}
                {tab.icon === 'EnvelopeIcon' && <EnvelopeIcon className="w-4 h-4" />}
                {tab.icon === 'DocumentTextIcon' && <DocumentTextIcon className="w-4 h-4" />}
                {tab.icon === 'PencilIcon' && <PencilIcon className="w-4 h-4" />}
                {tab.name}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {/* Announcements Tab */}
          {activeTab === 'announcements' && (
            <div className="space-y-4">
              {announcements.map((announcement) => (
                <div key={announcement.id} className="border border-neutral-200 rounded-lg p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-neutral-800 mb-2">{announcement.title}</h3>
                      <p className="text-neutral-600 mb-3">{announcement.content}</p>
                      <div className="flex items-center gap-4 text-sm text-neutral-500">
                        <span>By {announcement.author}</span>
                        <span>•</span>
                        <span>{new Date(announcement.date).toLocaleDateString()}</span>
                        <span>•</span>
                        <span>To {announcement.recipients}</span>
                        <span>•</span>
                        <span>{announcement.views} views</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(announcement.status)}`}>
                        {announcement.status}
                      </span>
                      <button className="p-2 text-neutral-600 hover:bg-neutral-100 rounded-lg transition-colors" title="Edit">
                        <PencilIcon className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-neutral-600 hover:bg-neutral-100 rounded-lg transition-colors" title="Delete">
                        <TrashIcon className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Messages Tab */}
          {activeTab === 'messages' && (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-neutral-50 border-b border-neutral-200">
                  <tr>
                    <th className="text-left px-6 py-3 text-sm font-medium text-neutral-600">Subject</th>
                    <th className="text-left px-6 py-3 text-sm font-medium text-neutral-600">From</th>
                    <th className="text-left px-6 py-3 text-sm font-medium text-neutral-600">To</th>
                    <th className="text-left px-6 py-3 text-sm font-medium text-neutral-600">Date</th>
                    <th className="text-left px-6 py-3 text-sm font-medium text-neutral-600">Priority</th>
                    <th className="text-left px-6 py-3 text-sm font-medium text-neutral-600">Status</th>
                    <th className="text-left px-6 py-3 text-sm font-medium text-neutral-600">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100">
                  {messages.map((message) => (
                    <tr key={message.id} className="hover:bg-neutral-50 transition-colors">
                      <td className="px-6 py-4 font-medium text-neutral-800">{message.subject}</td>
                      <td className="px-6 py-4 text-sm text-neutral-600">{message.from}</td>
                      <td className="px-6 py-4 text-sm text-neutral-600">{message.to}</td>
                      <td className="px-6 py-4 text-sm text-neutral-600">{new Date(message.date).toLocaleDateString()}</td>
                      <td className="px-6 py-4">
                        <CircleStackIcon className={`w-3 h-3 ${getPriorityColor(message.priority)}`} />
                        <span className={`ml-2 text-sm capitalize ${getPriorityColor(message.priority)}`}>
                          {message.priority}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(message.status)}`}>
                          {message.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button className="p-2 text-neutral-600 hover:bg-neutral-100 rounded-lg transition-colors" title="View">
                            <EyeIcon className="w-4 h-4" />
                          </button>
                          <button className="p-2 text-neutral-600 hover:bg-neutral-100 rounded-lg transition-colors" title="Edit">
                            <PencilIcon className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Templates Tab */}
          {activeTab === 'templates' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {templates.map((template) => (
                <div key={template.id} className="border border-neutral-200 rounded-lg p-4 hover:shadow-md transition-all">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-semibold text-neutral-800">{template.name}</h4>
                      <p className="text-sm text-neutral-600">{template.category}</p>
                    </div>
                    <button className="p-2 text-neutral-600 hover:bg-neutral-100 rounded-lg transition-colors" title="Edit Template">
                      <PencilIcon className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-neutral-500">Used {template.usage} times</span>
                    <button className="bg-brand-primary text-white px-3 py-1 rounded text-sm hover:bg-brand-primaryDark transition-colors">
                      Use Template
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Compose Tab */}
          {activeTab === 'compose' && (
            <div className="max-w-4xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">Message Type</label>
                  <select
                    value={messageType}
                    onChange={(e) => setMessageType(e.target.value)}
                    className="w-full px-3 py-2 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-colors"
                  >
                    <option value="announcement">Announcement</option>
                    <option value="email">Email</option>
                    <option value="notification">Notification</option>
                    <option value="alert">Alert</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">Recipients</label>
                  <select
                    value={selectedRecipients}
                    onChange={(e) => setSelectedRecipients(e.target.value)}
                    className="w-full px-3 py-2 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-colors"
                  >
                    <option value="all">All Users</option>
                    <option value="students">All Students</option>
                    <option value="lecturers">All Lecturers</option>
                    <option value="admins">All Admins</option>
                    <option value="custom">Custom Selection</option>
                  </select>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">Subject</label>
                  <input
                    type="text"
                    placeholder="Enter message subject..."
                    className="w-full px-3 py-2 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">Message Content</label>
                  <textarea
                    rows={8}
                    placeholder="Write your message here..."
                    className="w-full px-3 py-2 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-colors resize-none"
                  />
                </div>
                <div className="flex items-center gap-4">
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded border-neutral-300 text-brand-primary focus:ring-brand-primary/20" />
                    <span className="ml-2 text-sm text-neutral-700">Send immediately</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded border-neutral-300 text-brand-primary focus:ring-brand-primary/20" />
                    <span className="ml-2 text-sm text-neutral-700">High priority</span>
                  </label>
                </div>
                <div className="flex items-center gap-3 pt-4">
                  <button className="bg-gradient-to-r from-brand-primary to-brand-primaryDark text-white px-6 py-2 rounded-lg font-medium hover:shadow-lg transition-all">
                    Send Message
                  </button>
                  <button className="bg-white border border-neutral-200 text-neutral-700 px-6 py-2 rounded-lg font-medium hover:bg-neutral-50 transition-colors">
                    Save Draft
                  </button>
                  <button className="bg-white border border-neutral-200 text-neutral-700 px-6 py-2 rounded-lg font-medium hover:bg-neutral-50 transition-colors">
                    Schedule
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
