import { useState } from 'react';
import {
  PencilIcon,
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  ClockIcon,
  AcademicCapIcon,
  BookOpenIcon,
  UsersIcon,
  CalendarDaysIcon
} from '@heroicons/react/24/outline';

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: 'Prof. Maria Rodriguez',
    email: 'maria.rodriguez@university.edu',
    phone: '+1 (555) 123-4567',
    department: 'Architecture & Design',
    title: 'Professor of Architecture',
    office: 'Room AD-301',
    bio: 'Prof. Maria Rodriguez is a Professor in the Architecture & Design Department with over 12 years of teaching experience. She specializes in 3D architectural design, sustainable building practices, and digital modeling.',
    education: [
      { degree: 'Ph.D. in Architecture', institution: 'MIT', year: '2012' },
      { degree: 'M.Arch in Sustainable Design', institution: 'Stanford University', year: '2009' },
      { degree: 'B.Arch in Architecture', institution: 'UC Berkeley', year: '2007' }
    ],
    courses: ['ARCH 301 - 3D Architectural Design', 'INTR 201 - Interior Design', 'LAND 101 - Landscape Design'],
    officeHours: 'Monday & Wednesday: 2:00 PM - 4:00 PM'
  });

  const handleSave = () => {
    setIsEditing(false);
    // In a real app, this would save to backend
    console.log('Profile updated:', profileData);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-neutral-800">Profile</h1>
          <p className="text-neutral-600 mt-1">Manage your personal information and settings</p>
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
                className="px-4 py-2 bg-gradient-to-r from-brand-primary to-brand-primaryDark text-white rounded-xl hover:shadow-lg transition-all"
              >
                Save Changes
              </button>
            </>
          ) : (
            <button 
              onClick={() => setIsEditing(true)}
              className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-brand-primary to-brand-primaryDark text-white rounded-xl hover:shadow-lg transition-all"
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
                src="/form/andy.jpg" 
                alt="Dr. Sarah Smith Profile" 
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
            <p className="text-neutral-600">{profileData.title}</p>
            <p className="text-sm text-neutral-500">{profileData.department}</p>
          </div>

          <div className="space-y-4">
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
              <MapPinIcon className="w-5 h-5 text-neutral-400" />
              {isEditing ? (
                <input
                  type="text"
                  value={profileData.office}
                  onChange={(e) => setProfileData({...profileData, office: e.target.value})}
                  className="flex-1 border border-neutral-200 rounded-lg px-3 py-2 text-sm"
                />
              ) : (
                <span className="text-sm text-neutral-600">{profileData.office}</span>
              )}
            </div>
            <div className="flex items-center gap-3">
              <ClockIcon className="w-5 h-5 text-neutral-400" />
              <span className="text-sm text-neutral-600">{profileData.officeHours}</span>
            </div>
          </div>
        </div>

        {/* Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Bio */}
          <div className="bg-white rounded-xl shadow-card p-6">
            <h3 className="text-lg font-semibold text-neutral-800 mb-4">Biography</h3>
            {isEditing ? (
              <textarea
                value={profileData.bio}
                onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
                rows={4}
                className="w-full border border-neutral-200 rounded-lg px-3 py-2 resize-none"
              />
            ) : (
              <p className="text-neutral-600 leading-relaxed">{profileData.bio}</p>
            )}
          </div>

          {/* Education */}
          <div className="bg-white rounded-xl shadow-card p-6">
            <h3 className="text-lg font-semibold text-neutral-800 mb-4">Education</h3>
            <div className="space-y-4">
              {profileData.education.map((edu, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-accent-cyan to-accent-cyanDark rounded-lg flex items-center justify-center flex-shrink-0">
                    <AcademicCapIcon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="font-medium text-neutral-800">{edu.degree}</div>
                    <div className="text-sm text-neutral-600">{edu.institution}</div>
                    <div className="text-xs text-neutral-500">{edu.year}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Current Courses */}
          <div className="bg-white rounded-xl shadow-card p-6">
            <h3 className="text-lg font-semibold text-neutral-800 mb-4">Current Courses</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {profileData.courses.map((course, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-neutral-50 rounded-lg">
                  <div className="w-8 h-8 bg-gradient-to-br from-status-info to-accent-skyStrong rounded-lg flex items-center justify-center">
                    <BookOpenIcon className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-sm font-medium text-neutral-700">{course}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-xl shadow-card p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-status-success to-accent-lime rounded-lg flex items-center justify-center">
                  <UsersIcon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-xl font-bold text-neutral-800">127</div>
                  <div className="text-sm text-neutral-500">Total Students</div>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-card p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-accent-purple to-accent-pink rounded-lg flex items-center justify-center">
                  <BookOpenIcon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-xl font-bold text-neutral-800">4</div>
                  <div className="text-sm text-neutral-500">Active Courses</div>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-card p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-status-warning to-accent-amber rounded-lg flex items-center justify-center">
                  <CalendarDaysIcon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-xl font-bold text-neutral-800">8</div>
                  <div className="text-sm text-neutral-500">Years Experience</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
