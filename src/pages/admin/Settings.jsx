import { useState } from 'react';

export default function Settings() {
  const [activeTab, setActiveTab] = useState('general');
  const [settings, setSettings] = useState({
    general: {
      institutionName: 'JDI Educational Institute',
      institutionCode: 'JDI-2024',
      address: '123 Education Street, Learning City, LC 12345',
      phone: '+1 (555) 123-4567',
      email: 'admin@jdi-institute.edu',
      website: 'https://jdi-institute.edu',
      timezone: 'UTC-5',
      language: 'English'
    },
    academic: {
      academicYear: '2024-2025',
      semesterSystem: 'Two Semester',
      gradingScale: 'Letter Grade (A-F)',
      passingGrade: 'D',
      maxCreditsPerSemester: 18,
      attendanceRequirement: 75,
      lateSubmissionPenalty: 10
    },
    security: {
      passwordMinLength: 8,
      passwordComplexity: true,
      twoFactorAuth: false,
      sessionTimeout: 30,
      maxLoginAttempts: 5,
      accountLockoutDuration: 15,
      dataRetentionPeriod: 7
    },
    notifications: {
      emailNotifications: true,
      smsNotifications: false,
      pushNotifications: true,
      applicationAlerts: true,
      systemMaintenance: true,
      gradeUpdates: true,
      attendanceAlerts: true
    }
  });

  const tabs = [
    { id: 'general', name: 'General', icon: 'fas fa-cog' },
    { id: 'academic', name: 'Academic', icon: 'fas fa-graduation-cap' },
    { id: 'security', name: 'Security', icon: 'fas fa-shield-alt' },
    { id: 'notifications', name: 'Notifications', icon: 'fas fa-bell' }
  ];

  const handleSave = () => {
    console.log('Settings saved:', settings);
    // Show success toast
  };

  const updateSetting = (category, key, value) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [key]: value
      }
    }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-neutral-800">System Settings</h1>
          <p className="text-neutral-600 mt-1">Configure system preferences and policies</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-neutral-200 rounded-xl hover:bg-neutral-50 transition-colors">
            <i className="fas fa-download text-sm"></i>
            Export Config
          </button>
          <button 
            onClick={handleSave}
            className="inline-flex items-center gap-2 px-4 py-2 bg-brand-primary hover:bg-brand-primary-dark text-white rounded-xl hover:shadow-lg transition-all"
          >
            <i className="fas fa-save text-sm"></i>
            Save Changes
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-card">
        <div className="border-b border-neutral-200">
          <nav className="flex space-x-8 px-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-brand-primary text-brand-primary'
                    : 'border-transparent text-neutral-500 hover:text-neutral-700 hover:border-neutral-300'
                }`}
              >
                <i className={tab.icon}></i>
                {tab.name}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {/* General Settings */}
          {activeTab === 'general' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-neutral-800">Institution Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">Institution Name</label>
                  <input
                    type="text"
                    value={settings.general.institutionName}
                    onChange={(e) => updateSetting('general', 'institutionName', e.target.value)}
                    className="w-full px-3 py-2 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">Institution Code</label>
                  <input
                    type="text"
                    value={settings.general.institutionCode}
                    onChange={(e) => updateSetting('general', 'institutionCode', e.target.value)}
                    className="w-full px-3 py-2 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-colors"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-neutral-700 mb-2">Address</label>
                  <textarea
                    value={settings.general.address}
                    onChange={(e) => updateSetting('general', 'address', e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-colors resize-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">Phone</label>
                  <input
                    type="tel"
                    value={settings.general.phone}
                    onChange={(e) => updateSetting('general', 'phone', e.target.value)}
                    className="w-full px-3 py-2 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">Email</label>
                  <input
                    type="email"
                    value={settings.general.email}
                    onChange={(e) => updateSetting('general', 'email', e.target.value)}
                    className="w-full px-3 py-2 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">Website</label>
                  <input
                    type="url"
                    value={settings.general.website}
                    onChange={(e) => updateSetting('general', 'website', e.target.value)}
                    className="w-full px-3 py-2 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">Timezone</label>
                  <select
                    value={settings.general.timezone}
                    onChange={(e) => updateSetting('general', 'timezone', e.target.value)}
                    className="w-full px-3 py-2 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-colors"
                  >
                    <option value="UTC-5">UTC-5 (Eastern)</option>
                    <option value="UTC-6">UTC-6 (Central)</option>
                    <option value="UTC-7">UTC-7 (Mountain)</option>
                    <option value="UTC-8">UTC-8 (Pacific)</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Academic Settings */}
          {activeTab === 'academic' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-neutral-800">Academic Configuration</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">Academic Year</label>
                  <input
                    type="text"
                    value={settings.academic.academicYear}
                    onChange={(e) => updateSetting('academic', 'academicYear', e.target.value)}
                    className="w-full px-3 py-2 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">Semester System</label>
                  <select
                    value={settings.academic.semesterSystem}
                    onChange={(e) => updateSetting('academic', 'semesterSystem', e.target.value)}
                    className="w-full px-3 py-2 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-colors"
                  >
                    <option value="Two Semester">Two Semester</option>
                    <option value="Three Semester">Three Semester</option>
                    <option value="Quarter System">Quarter System</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">Grading Scale</label>
                  <select
                    value={settings.academic.gradingScale}
                    onChange={(e) => updateSetting('academic', 'gradingScale', e.target.value)}
                    className="w-full px-3 py-2 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-colors"
                  >
                    <option value="Letter Grade (A-F)">Letter Grade (A-F)</option>
                    <option value="Percentage (0-100)">Percentage (0-100)</option>
                    <option value="GPA (0-4.0)">GPA (0-4.0)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">Passing Grade</label>
                  <select
                    value={settings.academic.passingGrade}
                    onChange={(e) => updateSetting('academic', 'passingGrade', e.target.value)}
                    className="w-full px-3 py-2 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-colors"
                  >
                    <option value="D">D (60%)</option>
                    <option value="C">C (70%)</option>
                    <option value="C+">C+ (75%)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">Max Credits Per Semester</label>
                  <input
                    type="number"
                    value={settings.academic.maxCreditsPerSemester}
                    onChange={(e) => updateSetting('academic', 'maxCreditsPerSemester', parseInt(e.target.value))}
                    className="w-full px-3 py-2 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">Attendance Requirement (%)</label>
                  <input
                    type="number"
                    value={settings.academic.attendanceRequirement}
                    onChange={(e) => updateSetting('academic', 'attendanceRequirement', parseInt(e.target.value))}
                    className="w-full px-3 py-2 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-colors"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Security Settings */}
          {activeTab === 'security' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-neutral-800">Security Policies</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">Password Min Length</label>
                  <input
                    type="number"
                    value={settings.security.passwordMinLength}
                    onChange={(e) => updateSetting('security', 'passwordMinLength', parseInt(e.target.value))}
                    className="w-full px-3 py-2 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">Session Timeout (minutes)</label>
                  <input
                    type="number"
                    value={settings.security.sessionTimeout}
                    onChange={(e) => updateSetting('security', 'sessionTimeout', parseInt(e.target.value))}
                    className="w-full px-3 py-2 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">Max Login Attempts</label>
                  <input
                    type="number"
                    value={settings.security.maxLoginAttempts}
                    onChange={(e) => updateSetting('security', 'maxLoginAttempts', parseInt(e.target.value))}
                    className="w-full px-3 py-2 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">Account Lockout (minutes)</label>
                  <input
                    type="number"
                    value={settings.security.accountLockoutDuration}
                    onChange={(e) => updateSetting('security', 'accountLockoutDuration', parseInt(e.target.value))}
                    className="w-full px-3 py-2 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-colors"
                  />
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-neutral-50 rounded-lg">
                  <div>
                    <div className="font-medium text-neutral-800">Password Complexity</div>
                    <div className="text-sm text-neutral-600">Require uppercase, lowercase, numbers, and symbols</div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.security.passwordComplexity}
                      onChange={(e) => updateSetting('security', 'passwordComplexity', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-brand-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-primary"></div>
                  </label>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-neutral-50 rounded-lg">
                  <div>
                    <div className="font-medium text-neutral-800">Two-Factor Authentication</div>
                    <div className="text-sm text-neutral-600">Require 2FA for all admin accounts</div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.security.twoFactorAuth}
                      onChange={(e) => updateSetting('security', 'twoFactorAuth', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-brand-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-primary"></div>
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* Notification Settings */}
          {activeTab === 'notifications' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-neutral-800">Notification Preferences</h3>
              <div className="space-y-4">
                {Object.entries(settings.notifications).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between p-4 bg-neutral-50 rounded-lg">
                    <div>
                      <div className="font-medium text-neutral-800 capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </div>
                      <div className="text-sm text-neutral-600">
                        {key === 'emailNotifications' && 'Send notifications via email'}
                        {key === 'smsNotifications' && 'Send notifications via SMS'}
                        {key === 'pushNotifications' && 'Send browser push notifications'}
                        {key === 'applicationAlerts' && 'Notify about new applications'}
                        {key === 'systemMaintenance' && 'Notify about system maintenance'}
                        {key === 'gradeUpdates' && 'Notify about grade changes'}
                        {key === 'attendanceAlerts' && 'Notify about attendance issues'}
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={value}
                        onChange={(e) => updateSetting('notifications', key, e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-brand-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-primary"></div>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
