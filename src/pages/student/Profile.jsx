import { useState } from 'react';
import {
  PencilIcon,
  IdentificationIcon,
  EnvelopeIcon,
  PhoneIcon,
  StarIcon,
  BookOpenIcon,
  TrophyIcon,
  PercentBadgeIcon
} from '@heroicons/react/24/outline';

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: 'Alice Johnson',
    email: 'alice.johnson@student.edu',
    phone: '+1 (555) 987-6543',
    studentId: 'STU2024001',
    course: 'Computer Science',
    year: '3rd Year',
    gpa: '3.85',
    address: '123 Campus Drive, University City, UC 12345',
    emergencyContact: 'John Johnson - +1 (555) 123-4567',
    enrollmentDate: 'September 2022'
  });

  const handleSave = () => {
    setIsEditing(false);
    console.log('Profile updated:', profileData);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-neutral-800">Profile</h1>
          <p className="text-neutral-600 mt-1">Manage your personal information</p>
        </div>
        <div className="flex items-center gap-3">
          {isEditing ? (
            <>
              <button 
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 border border-neutral-200 rounded-xl hover:bg-neutral-50 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleSave}
                className="px-4 py-2 bg-brand-primary hover:bg-brand-primary-dark text-white rounded-xl hover:shadow-lg transition-all"
              >
                Save Changes
              </button>
            </>
          ) : (
            <button 
              onClick={() => setIsEditing(true)}
              className="inline-flex items-center gap-2 px-4 py-2 bg-brand-primary hover:bg-brand-primary-dark text-white rounded-xl hover:shadow-lg transition-all"
            >
              <PencilIcon className="w-4 h-4" />
              Edit Profile
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="bg-white rounded-xl shadow-card p-6">
          <div className="text-center mb-6">
            <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-4 border-4 border-gray-300">
              <img 
                src="/form/profile2.png" 
                alt="Alice Johnson Profile" 
                className="w-full h-full object-cover"
              />
            </div>
            {isEditing ? (
              <input
                type="text"
                value={profileData.name}
                onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                className="text-xl font-bold text-center w-full border border-neutral-200 rounded-lg px-3 py-2 mb-2"
              />
            ) : (
              <h2 className="text-xl font-bold text-neutral-800 mb-2">{profileData.name}</h2>
            )}
            <p className="text-neutral-600">{profileData.course}</p>
            <p className="text-sm text-neutral-500">{profileData.year}</p>
            <div className="mt-4 inline-block px-3 py-1 bg-status-success/10 text-status-success rounded-full text-sm font-medium">
              Active Student
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <IdentificationIcon className="w-5 h-5 text-neutral-400" />
              <span className="text-sm text-neutral-600">{profileData.studentId}</span>
            </div>
            <div className="flex items-center gap-3">
              <EnvelopeIcon className="w-5 h-5 text-neutral-400" />
              {isEditing ? (
                <input
                  type="email"
                  value={profileData.email}
                  onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                  className="flex-1 border border-neutral-200 rounded-lg px-3 py-2 text-sm"
                />
              ) : (
                <span className="text-sm text-neutral-600">{profileData.email}</span>
              )}
            </div>
            <div className="flex items-center gap-3">
              <PhoneIcon className="w-5 h-5 text-neutral-400" />
              {isEditing ? (
                <input
                  type="tel"
                  value={profileData.phone}
                  onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                  className="flex-1 border border-neutral-200 rounded-lg px-3 py-2 text-sm"
                />
              ) : (
                <span className="text-sm text-neutral-600">{profileData.phone}</span>
              )}
            </div>
            <div className="flex items-center gap-3">
              <StarIcon className="w-5 h-5 text-neutral-400" />
              <span className="text-sm text-neutral-600">GPA: {profileData.gpa}</span>
            </div>
          </div>
        </div>

        {/* Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Personal Information */}
          <div className="bg-white rounded-xl shadow-card p-6">
            <h3 className="text-lg font-semibold text-neutral-800 mb-4">Personal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">Full Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={profileData.name}
                    onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                    className="w-full border border-neutral-200 rounded-lg px-3 py-2"
                  />
                ) : (
                  <div className="text-neutral-800">{profileData.name}</div>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">Student ID</label>
                <div className="text-neutral-800">{profileData.studentId}</div>
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">Email</label>
                {isEditing ? (
                  <input
                    type="email"
                    value={profileData.email}
                    onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                    className="w-full border border-neutral-200 rounded-lg px-3 py-2"
                  />
                ) : (
                  <div className="text-neutral-800">{profileData.email}</div>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">Phone</label>
                {isEditing ? (
                  <input
                    type="tel"
                    value={profileData.phone}
                    onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                    className="w-full border border-neutral-200 rounded-lg px-3 py-2"
                  />
                ) : (
                  <div className="text-neutral-800">{profileData.phone}</div>
                )}
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-neutral-700 mb-2">Address</label>
                {isEditing ? (
                  <textarea
                    value={profileData.address}
                    onChange={(e) => setProfileData({...profileData, address: e.target.value})}
                    rows={2}
                    className="w-full border border-neutral-200 rounded-lg px-3 py-2 resize-none"
                  />
                ) : (
                  <div className="text-neutral-800">{profileData.address}</div>
                )}
              </div>
            </div>
          </div>

          {/* Academic Information */}
          <div className="bg-white rounded-xl shadow-card p-6">
            <h3 className="text-lg font-semibold text-neutral-800 mb-4">Academic Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">Course</label>
                <div className="text-neutral-800">{profileData.course}</div>
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">Year</label>
                <div className="text-neutral-800">{profileData.year}</div>
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">Current GPA</label>
                <div className="text-neutral-800 font-semibold">{profileData.gpa}</div>
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">Enrollment Date</label>
                <div className="text-neutral-800">{profileData.enrollmentDate}</div>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-neutral-700 mb-2">Emergency Contact</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={profileData.emergencyContact}
                    onChange={(e) => setProfileData({...profileData, emergencyContact: e.target.value})}
                    className="w-full border border-neutral-200 rounded-lg px-3 py-2"
                  />
                ) : (
                  <div className="text-neutral-800">{profileData.emergencyContact}</div>
                )}
              </div>
            </div>
          </div>

          {/* Academic Progress */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-xl shadow-card p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-status-success to-accent-lime rounded-lg flex items-center justify-center">
                  <BookOpenIcon className="w-4 h-4 text-white" />
                </div>
                <div>
                  <div className="text-xl font-bold text-neutral-800">84</div>
                  <div className="text-sm text-neutral-500">Credits Earned</div>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-card p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-accent-purple to-accent-pink rounded-lg flex items-center justify-center">
                  <TrophyIcon className="w-4 h-4 text-white" />
                </div>
                <div>
                  <div className="text-xl font-bold text-neutral-800">36</div>
                  <div className="text-sm text-neutral-500">Credits Remaining</div>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-card p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-accent-cyan to-accent-cyanDark rounded-lg flex items-center justify-center">
                  <PercentBadgeIcon className="w-4 h-4 text-white" />
                </div>
                <div>
                  <div className="text-xl font-bold text-neutral-800">70%</div>
                  <div className="text-sm text-neutral-500">Progress</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
