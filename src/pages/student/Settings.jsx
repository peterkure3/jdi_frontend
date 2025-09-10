import { useState } from 'react';
import {
  BookmarkIcon,
  BellIcon,
  ShieldCheckIcon,
  CogIcon,
  InformationCircleIcon,
  KeyIcon,
  ArrowDownTrayIcon,
  UserIcon
} from '@heroicons/react/24/outline';

export default function Settings() {
  const [activeTab, setActiveTab] = useState('profile');
  const [formData, setFormData] = useState({
    firstName: 'John',
    lastName: 'Smith',
    email: 'john.smith@student.jdi.edu',
    phone: '+1 (555) 987-6543',
    studentId: 'STU2024001',
    program: 'Computer Science',
    year: 'Junior',
    bio: 'Computer Science student passionate about software development and artificial intelligence.',
    notifications: {
      emailGrades: true,
      emailAssignments: true,
      emailMessages: true,
      pushNotifications: true,
      weeklyReports: false,
      courseUpdates: true
    },
    privacy: {
      profileVisible: true,
      contactInfoVisible: false,
      gradesVisible: false,
      scheduleVisible: true
    },
    preferences: {
      theme: 'light',
      language: 'en',
      timezone: 'America/New_York',
      dateFormat: 'MM/DD/YYYY'
    }
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNestedChange = (section, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-neutral-800">Settings</h1>
          <p className="text-neutral-600 mt-1">Manage your account preferences and settings</p>
        </div>
        <button className="inline-flex items-center gap-2 px-4 py-2 bg-brand-primary hover:bg-brand-primary-dark text-white rounded-xl hover:shadow-lg transition-all">
          <BookmarkIcon className="w-4 h-4" />
          Save Changes
        </button>
      </div>

      {/* Settings Tabs */}
      <div className="bg-white rounded-xl shadow-card">
        <div className="border-b border-neutral-200">
          <nav className="flex space-x-8 px-6">
            {[
              { id: 'profile', name: 'Profile', icon: 'UserIcon' },
              { id: 'notifications', name: 'Notifications', icon: 'BellIcon' },
              { id: 'privacy', name: 'Privacy', icon: 'ShieldCheckIcon' },
              { id: 'preferences', name: 'Preferences', icon: 'CogIcon' }
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
                {tab.icon === 'UserIcon' && <UserIcon className="w-4 h-4" />}
                {tab.icon === 'BellIcon' && <BellIcon className="w-4 h-4" />}
                {tab.icon === 'ShieldCheckIcon' && <ShieldCheckIcon className="w-4 h-4" />}
                {tab.icon === 'CogIcon' && <CogIcon className="w-4 h-4" />}
                {tab.name}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <div className="space-y-6">
              <div className="flex items-center gap-6">
                <div className="w-24 h-24 bg-gradient-to-br from-brand-primary to-brand-primaryDark rounded-full flex items-center justify-center text-white text-2xl font-bold">
                  {formData.firstName.charAt(0)}{formData.lastName.charAt(0)}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-neutral-800">Profile Photo</h3>
                  <p className="text-sm text-neutral-600 mb-3">Update your profile picture</p>
                  <div className="flex items-center gap-3">
                    <button className="bg-brand-primary hover:bg-brand-primary-dark text-white px-4 py-2 rounded-lg text-sm hover:bg-brand-primaryDark transition-colors">
                      Upload Photo
                    </button>
                    <button className="bg-white border border-neutral-200 text-neutral-700 px-4 py-2 rounded-lg text-sm hover:bg-neutral-50 transition-colors">
                      Remove
                    </button>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">First Name</label>
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    className="w-full px-3 py-2 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">Last Name</label>
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    className="w-full px-3 py-2 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">Email Address</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full px-3 py-2 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">Phone Number</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="w-full px-3 py-2 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">Student ID</label>
                  <input
                    type="text"
                    value={formData.studentId}
                    disabled
                    className="w-full px-3 py-2 border border-neutral-200 rounded-lg bg-neutral-50 text-neutral-500 cursor-not-allowed"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">Program</label>
                  <select
                    value={formData.program}
                    onChange={(e) => handleInputChange('program', e.target.value)}
                    className="w-full px-3 py-2 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-colors"
                  >
                    <option>Computer Science</option>
                    <option>Mathematics</option>
                    <option>Engineering</option>
                    <option>Business</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">Academic Year</label>
                  <select
                    value={formData.year}
                    onChange={(e) => handleInputChange('year', e.target.value)}
                    className="w-full px-3 py-2 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-colors"
                  >
                    <option>Freshman</option>
                    <option>Sophomore</option>
                    <option>Junior</option>
                    <option>Senior</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">Bio</label>
                <textarea
                  rows={4}
                  value={formData.bio}
                  onChange={(e) => handleInputChange('bio', e.target.value)}
                  className="w-full px-3 py-2 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-colors resize-none"
                  placeholder="Tell others about yourself..."
                />
              </div>
            </div>
          )}

          {/* Notifications Tab */}
          {activeTab === 'notifications' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-neutral-800 mb-4">Email Notifications</h3>
                <div className="space-y-4">
                  {[
                    { key: 'emailGrades', label: 'Grade updates', description: 'Get notified when grades are posted' },
                    { key: 'emailAssignments', label: 'Assignment reminders', description: 'Reminders about upcoming assignments' },
                    { key: 'emailMessages', label: 'New messages', description: 'Email alerts for new messages from professors' },
                    { key: 'courseUpdates', label: 'Course updates', description: 'Notifications about course announcements' },
                    { key: 'weeklyReports', label: 'Weekly reports', description: 'Summary of weekly activities and progress' }
                  ].map((item) => (
                    <div key={item.key} className="flex items-center justify-between p-4 border border-neutral-200 rounded-lg">
                      <div>
                        <h4 className="font-medium text-neutral-800">{item.label}</h4>
                        <p className="text-sm text-neutral-600">{item.description}</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.notifications[item.key]}
                          onChange={(e) => handleNestedChange('notifications', item.key, e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-brand-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-primary"></div>
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-neutral-800 mb-4">Push Notifications</h3>
                <div className="flex items-center justify-between p-4 border border-neutral-200 rounded-lg">
                  <div>
                    <h4 className="font-medium text-neutral-800">Browser notifications</h4>
                    <p className="text-sm text-neutral-600">Receive push notifications in your browser</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.notifications.pushNotifications}
                      onChange={(e) => handleNestedChange('notifications', 'pushNotifications', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-brand-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-primary"></div>
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* Privacy Tab */}
          {activeTab === 'privacy' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-neutral-800 mb-4">Profile Visibility</h3>
                <div className="space-y-4">
                  {[
                    { key: 'profileVisible', label: 'Public profile', description: 'Make your profile visible to other students' },
                    { key: 'contactInfoVisible', label: 'Contact information', description: 'Show your contact details to classmates' },
                    { key: 'gradesVisible', label: 'Grade sharing', description: 'Allow others to see your academic performance' },
                    { key: 'scheduleVisible', label: 'Schedule visibility', description: 'Display your class schedule to others' }
                  ].map((item) => (
                    <div key={item.key} className="flex items-center justify-between p-4 border border-neutral-200 rounded-lg">
                      <div>
                        <h4 className="font-medium text-neutral-800">{item.label}</h4>
                        <p className="text-sm text-neutral-600">{item.description}</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.privacy[item.key]}
                          onChange={(e) => handleNestedChange('privacy', item.key, e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-brand-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-primary"></div>
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <InformationCircleIcon className="w-5 h-5 text-blue-600 mt-1" />
                  <div>
                    <h4 className="font-medium text-blue-800">Privacy Notice</h4>
                    <p className="text-sm text-blue-700 mt-1">
                      Your privacy settings control how your information is shared with other students. 
                      Faculty and administrators may still have access to certain information regardless of these settings.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Preferences Tab */}
          {activeTab === 'preferences' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">Theme</label>
                  <select
                    value={formData.preferences.theme}
                    onChange={(e) => handleNestedChange('preferences', 'theme', e.target.value)}
                    className="w-full px-3 py-2 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-colors"
                  >
                    <option value="light">Light</option>
                    <option value="dark">Dark</option>
                    <option value="auto">Auto</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">Language</label>
                  <select
                    value={formData.preferences.language}
                    onChange={(e) => handleNestedChange('preferences', 'language', e.target.value)}
                    className="w-full px-3 py-2 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-colors"
                  >
                    <option value="en">English</option>
                    <option value="es">Spanish</option>
                    <option value="fr">French</option>
                    <option value="de">German</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">Timezone</label>
                  <select
                    value={formData.preferences.timezone}
                    onChange={(e) => handleNestedChange('preferences', 'timezone', e.target.value)}
                    className="w-full px-3 py-2 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-colors"
                  >
                    <option value="America/New_York">Eastern Time</option>
                    <option value="America/Chicago">Central Time</option>
                    <option value="America/Denver">Mountain Time</option>
                    <option value="America/Los_Angeles">Pacific Time</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">Date Format</label>
                  <select
                    value={formData.preferences.dateFormat}
                    onChange={(e) => handleNestedChange('preferences', 'dateFormat', e.target.value)}
                    className="w-full px-3 py-2 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-colors"
                  >
                    <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                    <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                    <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                  </select>
                </div>
              </div>

              <div className="border-t border-neutral-200 pt-6">
                <h3 className="text-lg font-semibold text-neutral-800 mb-4">Account Actions</h3>
                <div className="space-y-3">
                  <button className="w-full bg-white border border-neutral-200 text-neutral-700 py-3 px-4 rounded-lg font-medium hover:bg-neutral-50 transition-colors text-left">
                    <KeyIcon className="w-5 h-5 mr-3" />
                    Change Password
                  </button>
                  <button className="w-full bg-white border border-neutral-200 text-neutral-700 py-3 px-4 rounded-lg font-medium hover:bg-neutral-50 transition-colors text-left">
                    <ArrowDownTrayIcon className="w-5 h-5 mr-3" />
                    Export My Data
                  </button>
                  {/* <button className="w-full bg-red-50 border border-red-200 text-red-700 py-3 px-4 rounded-lg font-medium hover:bg-red-100 transition-colors text-left">
                    <i className="fas fa-user-times mr-3"></i>
                    Deactivate Account
                  </button> */}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
