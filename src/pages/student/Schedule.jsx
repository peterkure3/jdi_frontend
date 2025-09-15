import { useState } from 'react';
import {
  CalendarIcon,
  ClockIcon,
  AcademicCapIcon,
  MapPinIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CalendarDaysIcon,
  BellIcon,
  ArrowDownTrayIcon,
  UsersIcon
} from '@heroicons/react/24/outline';

export default function Schedule() {
  const [currentWeek, setCurrentWeek] = useState(0);
  const [view, setView] = useState('week');

  const schedule = [
    { id: 1, course: '3D Architectural Design', code: 'ARCH301', instructor: 'Prof. Rodriguez', time: '09:00-12:00', day: 'Monday', room: 'Design Studio A', type: 'Studio' },
    { id: 2, course: 'Interior Design', code: 'INTR201', instructor: 'Dr. Chen', time: '10:00-12:30', day: 'Tuesday', room: 'Design Studio B', type: 'Workshop' },
    { id: 3, course: '3D Architectural Design', code: 'ARCH301', instructor: 'Prof. Rodriguez', time: '09:00-12:00', day: 'Wednesday', room: 'Design Studio A', type: 'Studio' },
    { id: 4, course: 'Landscape Design', code: 'LAND101', instructor: 'Prof. Green', time: '14:00-15:30', day: 'Wednesday', room: 'Outdoor Lab', type: 'Field Work' },
    { id: 5, course: 'Graphics Design', code: 'GRPH201', instructor: 'Dr. Thompson', time: '13:00-15:30', day: 'Thursday', room: 'Computer Lab 1', type: 'Lab' },
    { id: 6, course: 'Interior Design', code: 'INTR201', instructor: 'Dr. Chen', time: '10:00-12:30', day: 'Thursday', room: 'Design Studio B', type: 'Critique' },
    { id: 7, course: 'Electrical & Wiring Design', code: 'ELEC201', instructor: 'Dr. Wang', time: '13:00-15:30', day: 'Monday', room: 'Engineering Lab', type: 'Lecture' },
    { id: 8, course: 'Landscape Design', code: 'LAND101', instructor: 'Prof. Green', time: '14:00-15:30', day: 'Friday', room: 'Outdoor Lab', type: 'Project Work' }
  ];

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const timeSlots = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'];

  const getTypeColor = (type) => {
    switch (type) {
      case 'Lecture': return 'bg-brand-primary/10 text-brand-primary border-brand-primary/20';
      case 'Lab': return 'bg-status-success/10 text-status-success border-status-success/20';
      case 'Tutorial': return 'bg-accent-purple/10 text-accent-purple border-accent-purple/20';
      case 'Seminar': return 'bg-accent-cyan/10 text-accent-cyan border-accent-cyan/20';
      default: return 'bg-neutral-100 text-neutral-600 border-neutral-200';
    }
  };

  const getClassForTimeSlot = (day, timeSlot) => {
    return schedule.find(item => 
      item.day === day && item.time.startsWith(timeSlot)
    );
  };

  const upcomingClasses = schedule
    .filter(item => {
      const today = new Date().getDay();
      const dayIndex = days.indexOf(item.day) + 1;
      return dayIndex >= today;
    })
    .slice(0, 3);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-neutral-800">Schedule</h1>
          <p className="text-neutral-600 mt-1">View your class schedule and upcoming sessions</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center bg-white border border-neutral-200 rounded-xl overflow-hidden">
            <button
              onClick={() => setView('week')}
              className={`px-4 py-2 text-sm font-medium transition-colors ${
                view === 'week' ? 'bg-brand-primary text-white' : 'text-neutral-600 hover:bg-neutral-50'
              }`}
            >
              Week
            </button>
            <button
              onClick={() => setView('list')}
              className={`px-4 py-2 text-sm font-medium transition-colors ${
                view === 'list' ? 'bg-brand-primary text-white' : 'text-neutral-600 hover:bg-neutral-50'
              }`}
            >
              List
            </button>
          </div>
          {/* <button className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-brand-primary to-brand-primaryDark text-white rounded-xl hover:shadow-lg transition-all">
            <i className="fas fa-plus text-sm"></i>
            Add Event
          </button> */}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-card p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-brand-primary to-brand-primaryDark rounded-lg flex items-center justify-center">
              <CalendarIcon className="w-4 h-4 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-neutral-800">{schedule.length}</div>
              <div className="text-sm text-neutral-500">Weekly Classes</div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-card p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-status-success to-accent-lime rounded-lg flex items-center justify-center">
              <ClockIcon className="w-4 h-4 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-neutral-800">18</div>
              <div className="text-sm text-neutral-500">Hours/Week</div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-card p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-accent-purple to-accent-pink rounded-lg flex items-center justify-center">
              <AcademicCapIcon className="w-4 h-4 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-neutral-800">5</div>
              <div className="text-sm text-neutral-500">Instructors</div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-card p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-accent-cyan to-accent-cyanDark rounded-lg flex items-center justify-center">
              <MapPinIcon className="w-4 h-4 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-neutral-800">8</div>
              <div className="text-sm text-neutral-500">Locations</div>
            </div>
          </div>
        </div>
      </div>

      {view === 'week' ? (
        /* Weekly Calendar View */
        <div className="bg-white rounded-xl shadow-card overflow-hidden">
          <div className="px-6 py-4 border-b border-neutral-100 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-neutral-800">Weekly Schedule</h3>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setCurrentWeek(currentWeek - 1)}
                className="p-2 text-neutral-600 hover:bg-neutral-100 rounded-lg transition-colors"
              >
                <ChevronLeftIcon className="w-4 h-4" />
              </button>
              <span className="px-3 py-1 bg-neutral-100 rounded-lg text-sm font-medium">
                Week {currentWeek + 1}
              </span>
              <button 
                onClick={() => setCurrentWeek(currentWeek + 1)}
                className="p-2 text-neutral-600 hover:bg-neutral-100 rounded-lg transition-colors"
              >
                <ChevronRightIcon className="w-4 h-4" />
              </button>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <div className="min-w-full">
              {/* Header */}
              <div className="grid grid-cols-6 bg-neutral-50 border-b border-neutral-200">
                <div className="p-4 text-sm font-medium text-neutral-600">Time</div>
                {days.map(day => (
                  <div key={day} className="p-4 text-sm font-medium text-neutral-600 text-center">
                    {day}
                  </div>
                ))}
              </div>
              
              {/* Time slots */}
              {timeSlots.map(timeSlot => (
                <div key={timeSlot} className="grid grid-cols-6 border-b border-neutral-100 min-h-[60px]">
                  <div className="p-4 text-sm text-neutral-500 bg-neutral-50 border-r border-neutral-100">
                    {timeSlot}
                  </div>
                  {days.map(day => {
                    const classItem = getClassForTimeSlot(day, timeSlot);
                    return (
                      <div key={day} className="p-2 border-r border-neutral-100">
                        {classItem && (
                          <div className={`p-2 rounded-lg border text-xs ${getTypeColor(classItem.type)}`}>
                            <div className="font-medium">{classItem.code}</div>
                            <div className="text-xs opacity-75">{classItem.room}</div>
                            <div className="text-xs opacity-75">{classItem.type}</div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* List View */
        <div className="space-y-4">
          {days.map(day => {
            const dayClasses = schedule.filter(item => item.day === day);
            return (
              <div key={day} className="bg-white rounded-xl shadow-card p-6">
                <h3 className="text-lg font-semibold text-neutral-800 mb-4">{day}</h3>
                {dayClasses.length > 0 ? (
                  <div className="space-y-3">
                    {dayClasses.map(classItem => (
                      <div key={classItem.id} className="flex items-center gap-4 p-4 bg-neutral-50 rounded-lg">
                        <div className="text-sm font-medium text-neutral-800 min-w-[80px]">
                          {classItem.time}
                        </div>
                        <div className="flex-1">
                          <div className="font-medium text-neutral-800">{classItem.course}</div>
                          <div className="text-sm text-neutral-600">{classItem.instructor} • {classItem.room}</div>
                        </div>
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium border ${getTypeColor(classItem.type)}`}>
                          {classItem.type}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-neutral-500">
                    <CalendarDaysIcon className="w-8 h-8 mb-2" />
                    <div>No classes scheduled</div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Upcoming Classes */}
      <div className="bg-white rounded-xl shadow-card p-6">
        <h3 className="text-lg font-semibold text-neutral-800 mb-4">Next Classes</h3>
        <div className="space-y-3">
          {upcomingClasses.map(classItem => (
            <div key={classItem.id} className="flex items-center gap-4 p-4 bg-gradient-to-r from-brand-primary/5 to-brand-primaryDark/5 rounded-lg border border-brand-primary/10">
              <div className="w-12 h-12 bg-gradient-to-br from-brand-primary to-brand-primaryDark rounded-xl flex items-center justify-center">
                <AcademicCapIcon className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1">
                <div className="font-medium text-neutral-800">{classItem.course}</div>
                <div className="text-sm text-neutral-600">{classItem.instructor} • {classItem.room}</div>
              </div>
              <div className="text-right">
                <div className="font-medium text-neutral-800">{classItem.day}</div>
                <div className="text-sm text-neutral-600">{classItem.time}</div>
              </div>
              <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium border ${getTypeColor(classItem.type)}`}>
                {classItem.type}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl shadow-card p-6 text-center">
          <div className="w-12 h-12 bg-gradient-to-br from-accent-purple to-accent-pink rounded-xl flex items-center justify-center mx-auto mb-3">
            <BellIcon className="w-5 h-5 text-white" />
          </div>
          <h4 className="font-semibold text-neutral-800 mb-2">Set Reminders</h4>
          <p className="text-sm text-neutral-600 mb-4">Get notified before your classes start</p>
          <button className="w-full bg-gradient-to-r from-accent-purple to-accent-pink text-white rounded-lg py-2 text-sm font-medium hover:shadow-md transition-all">
            Manage Reminders
          </button>
        </div>
        
        <div className="bg-white rounded-xl shadow-card p-6 text-center">
          <div className="w-12 h-12 bg-gradient-to-br from-status-success to-accent-lime rounded-xl flex items-center justify-center mx-auto mb-3">
            <ArrowDownTrayIcon className="w-5 h-5 text-white" />
          </div>
          <h4 className="font-semibold text-neutral-800 mb-2">Export Schedule</h4>
          <p className="text-sm text-neutral-600 mb-4">Download your schedule to calendar apps</p>
          <button className="w-full bg-gradient-to-r from-status-success to-accent-lime text-white rounded-lg py-2 text-sm font-medium hover:shadow-md transition-all">
            Export Calendar
          </button>
        </div>
        
        <div className="bg-white rounded-xl shadow-card p-6 text-center">
          <div className="w-12 h-12 bg-gradient-to-br from-accent-cyan to-accent-cyanDark rounded-xl flex items-center justify-center mx-auto mb-3">
            <UsersIcon className="w-5 h-5 text-white" />
          </div>
          <h4 className="font-semibold text-neutral-800 mb-2">Study Groups</h4>
          <p className="text-sm text-neutral-600 mb-4">Find classmates for group study sessions</p>
          <button className="w-full bg-gradient-to-r from-accent-cyan to-accent-cyanDark text-white rounded-lg py-2 text-sm font-medium hover:shadow-md transition-all">
            Find Groups
          </button>
        </div>
      </div>
    </div>
  );
}
