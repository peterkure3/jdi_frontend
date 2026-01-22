import { useState } from 'react';
import { FormModal, ConfirmationModal } from '../../components/shared/modals';
import BaseModal from '../../components/shared/modals/BaseModal';
import {
  PlusIcon,
  ClockIcon,
  AcademicCapIcon,
  UserIcon,
  UsersIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  PencilIcon,
  XMarkIcon,
  CalendarDaysIcon,
  CalendarIcon,
  ArrowDownTrayIcon,
  BellIcon
} from '@heroicons/react/24/outline';

export default function Schedule() {
  const [currentWeek, setCurrentWeek] = useState(0);
  const [view, setView] = useState('week');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showRemindersModal, setShowRemindersModal] = useState(false);
  const [selectedSession, setSelectedSession] = useState(null);
  const [reminders, setReminders] = useState({
    enabled: true,
    minutesBefore: 15,
    email: true,
    inApp: true
  });

  const downloadTextFile = (filename, text) => {
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  const downloadIcs = () => {
    const pad = (n) => String(n).padStart(2, '0');
    const now = new Date();
    const dtstamp = `${now.getUTCFullYear()}${pad(now.getUTCMonth() + 1)}${pad(now.getUTCDate())}T${pad(now.getUTCHours())}${pad(now.getUTCMinutes())}${pad(now.getUTCSeconds())}Z`;
    const icsLines = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//JDI Demo//Lecturer Schedule//EN'
    ];

    schedule
      .filter(item => item.code !== 'OH')
      .slice(0, 10)
      .forEach((item, idx) => {
        const uid = `jdi-demo-${item.id}-${idx}@demo`;
        icsLines.push('BEGIN:VEVENT');
        icsLines.push(`UID:${uid}`);
        icsLines.push(`DTSTAMP:${dtstamp}`);
        icsLines.push(`SUMMARY:${item.code} ${item.course}`);
        icsLines.push(`LOCATION:${item.room}`);
        icsLines.push(`DESCRIPTION:${item.type} • ${item.time} • ${item.students} students`);
        icsLines.push('END:VEVENT');
      });

    icsLines.push('END:VCALENDAR');
    downloadTextFile('lecturer-schedule-demo.ics', icsLines.join('\r\n'));
  };

  const initialSchedule = [
    { id: 1, course: 'Computer Science 101', code: 'CS101', time: '09:00-10:30', day: 'Monday', room: 'Room 201', type: 'Lecture', students: 45 },
    { id: 2, course: 'Data Structures & Algorithms', code: 'CS201', time: '11:00-12:30', day: 'Tuesday', room: 'Room 305', type: 'Lecture', students: 38 },
    { id: 3, course: 'Computer Science 101', code: 'CS101', time: '09:00-10:30', day: 'Wednesday', room: 'Room 201', type: 'Lecture', students: 45 },
    { id: 4, course: 'Data Structures & Algorithms', code: 'CS201', time: '11:00-12:30', day: 'Thursday', room: 'Room 305', type: 'Lecture', students: 38 },
    { id: 5, course: 'Web Development', code: 'CS301', time: '14:00-15:30', day: 'Wednesday', room: 'Lab 101', type: 'Lab', students: 32 },
    { id: 6, course: 'Web Development', code: 'CS301', time: '14:00-15:30', day: 'Friday', room: 'Lab 101', type: 'Lab', students: 32 },
    { id: 7, course: 'Office Hours', code: 'OH', time: '15:00-17:00', day: 'Tuesday', room: 'Office 302', type: 'Office Hours', students: 0 },
    { id: 8, course: 'Office Hours', code: 'OH', time: '13:00-15:00', day: 'Thursday', room: 'Office 302', type: 'Office Hours', students: 0 }
  ];

  const [schedule, setSchedule] = useState(initialSchedule);

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const timeSlots = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'];

  const getTypeColor = (type) => {
    switch (type) {
      case 'Lecture': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'Lab': return 'bg-green-100 text-green-700 border-green-200';
      case 'Office Hours': return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'Meeting': return 'bg-cyan-100 text-cyan-700 border-cyan-200';
      default: return 'bg-gray-100 text-gray-600 border-gray-200';
    }
  };

  const getClassForTimeSlot = (day, timeSlot) => {
    return schedule.find(item => 
      item.day === day && item.time.startsWith(timeSlot)
    );
  };

  const handleOpenAddSession = () => {
    setSelectedSession(null);
    setShowAddModal(true);
  };

  const handleOpenEditSession = (session) => {
    setSelectedSession(session);
    setShowEditModal(true);
  };

  const handleOpenCancelSession = (session) => {
    setSelectedSession(session);
    setShowCancelModal(true);
  };

  const handleAddSession = async (data) => {
    await new Promise(resolve => setTimeout(resolve, 600));
    const id = Date.now();
    const start = data.startTime || '09:00';
    const end = data.endTime || '10:00';
    const created = {
      id,
      course: data.course,
      code: data.code,
      time: `${start}-${end}`,
      day: data.day,
      room: data.room,
      type: data.type,
      students: Number(data.students || 0)
    };
    setSchedule(prev => [created, ...prev]);
  };

  const handleEditSession = async (data) => {
    await new Promise(resolve => setTimeout(resolve, 600));
    const start = data.startTime || '09:00';
    const end = data.endTime || '10:00';
    const updated = {
      ...selectedSession,
      course: data.course,
      code: data.code,
      time: `${start}-${end}`,
      day: data.day,
      room: data.room,
      type: data.type,
      students: Number(data.students || 0)
    };
    setSchedule(prev => prev.map(s => (s.id === selectedSession?.id ? updated : s)));
    setSelectedSession(updated);
  };

  const handleConfirmCancel = async () => {
    await new Promise(resolve => setTimeout(resolve, 400));
    setSchedule(prev => prev.filter(s => s.id !== selectedSession?.id));
    setSelectedSession(null);
    setShowCancelModal(false);
  };

  const upcomingClasses = schedule
    .filter(item => {
      const today = new Date().getDay();
      const dayIndex = days.indexOf(item.day) + 1;
      return dayIndex >= today;
    })
    .slice(0, 3);

  const weeklyStats = {
    totalHours: schedule.reduce((sum, item) => {
      const [start, end] = item.time.split('-');
      const startHour = parseInt(start.split(':')[0]);
      const endHour = parseInt(end.split(':')[0]);
      return sum + (endHour - startHour);
    }, 0),
    totalClasses: schedule.filter(item => item.type !== 'Office Hours').length,
    officeHours: schedule.filter(item => item.type === 'Office Hours').length,
    totalStudents: [...new Set(schedule.map(item => item.code))].reduce((sum, code) => {
      const classItem = schedule.find(item => item.code === code);
      return sum + (classItem ? classItem.students : 0);
    }, 0)
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-neutral-800">Teaching Schedule</h1>
          <p className="text-neutral-600 mt-1">Manage your classes, office hours, and meetings</p>
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
          <button
            onClick={handleOpenAddSession}
            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-brand-primary to-brand-primaryDark text-white rounded-xl hover:shadow-lg transition-all"
          >
            <PlusIcon className="w-4 h-4" />
            Add Session
          </button>
        </div>
      </div>

      {/* Weekly Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-card p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-brand-primary to-brand-primaryDark rounded-lg flex items-center justify-center">
              <ClockIcon className="w-4 h-4 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-neutral-800">{weeklyStats.totalHours}</div>
              <div className="text-sm text-neutral-500">Hours/Week</div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-card p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-status-success to-accent-lime rounded-lg flex items-center justify-center">
              <AcademicCapIcon className="w-4 h-4 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-neutral-800">{weeklyStats.totalClasses}</div>
              <div className="text-sm text-neutral-500">Classes/Week</div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-card p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-accent-purple to-accent-pink rounded-lg flex items-center justify-center">
              <UserIcon className="w-4 h-4 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-neutral-800">{weeklyStats.officeHours}</div>
              <div className="text-sm text-neutral-500">Office Hours</div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-card p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-accent-cyan to-accent-cyanDark rounded-lg flex items-center justify-center">
              <UsersIcon className="w-4 h-4 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-neutral-800">{weeklyStats.totalStudents}</div>
              <div className="text-sm text-neutral-500">Total Students</div>
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
                <div key={timeSlot} className="grid grid-cols-6 border-b border-neutral-100 min-h-[70px]">
                  <div className="p-4 text-sm text-neutral-500 bg-neutral-50 border-r border-neutral-100">
                    {timeSlot}
                  </div>
                  {days.map(day => {
                    const classItem = getClassForTimeSlot(day, timeSlot);
                    return (
                      <div key={day} className="p-2 border-r border-neutral-100">
                        {classItem && (
                          <div className={`p-3 rounded-lg border text-xs ${getTypeColor(classItem.type)}`}>
                            <div className="font-medium">{classItem.code}</div>
                            <div className="text-xs opacity-75">{classItem.room}</div>
                            <div className="text-xs opacity-75">{classItem.type}</div>
                            {classItem.students > 0 && (
                              <div className="text-xs opacity-75">{classItem.students} students</div>
                            )}
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
                          <div className="text-sm text-neutral-600">
                            {classItem.room} • {classItem.students > 0 ? `${classItem.students} students` : 'Available'}
                          </div>
                        </div>
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium border ${getTypeColor(classItem.type)}`}>
                          {classItem.type}
                        </span>
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => handleOpenEditSession(classItem)}
                            className="p-2 text-neutral-600 hover:bg-neutral-100 rounded-lg transition-colors"
                            title="Edit"
                          >
                            <PencilIcon className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleOpenCancelSession(classItem)}
                            className="p-2 text-neutral-600 hover:bg-neutral-100 rounded-lg transition-colors"
                            title="Cancel"
                          >
                            <XMarkIcon className="w-4 h-4" />
                          </button>
                        </div>
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
                <div className="text-sm text-neutral-600">
                  {classItem.room} • {classItem.students > 0 ? `${classItem.students} students` : 'Office Hours'}
                </div>
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
            <CalendarIcon className="w-5 h-5 text-white" />
          </div>
          <h4 className="font-semibold text-neutral-800 mb-2">Schedule Class</h4>
          <p className="text-sm text-neutral-600 mb-4">Add new class sessions or office hours</p>
          <button
            onClick={handleOpenAddSession}
            className="w-full bg-gradient-to-r from-accent-purple to-accent-pink text-white rounded-lg py-2 text-sm font-medium hover:shadow-md transition-all"
          >
            Add Session
          </button>
        </div>
        
        <div className="bg-white rounded-xl shadow-card p-6 text-center">
          <div className="w-12 h-12 bg-gradient-to-br from-status-success to-accent-lime rounded-xl flex items-center justify-center mx-auto mb-3">
            <ArrowDownTrayIcon className="w-5 h-5 text-white" />
          </div>
          <h4 className="font-semibold text-neutral-800 mb-2">Export Schedule</h4>
          <p className="text-sm text-neutral-600 mb-4">Download your teaching schedule</p>
          <button
            onClick={downloadIcs}
            className="w-full bg-gradient-to-r from-status-success to-accent-lime text-white rounded-lg py-2 text-sm font-medium hover:shadow-md transition-all"
          >
            Export Calendar
          </button>
        </div>
        
        <div className="bg-white rounded-xl shadow-card p-6 text-center">
          <div className="w-12 h-12 bg-gradient-to-br from-accent-cyan to-accent-cyanDark rounded-xl flex items-center justify-center mx-auto mb-3">
            <BellIcon className="w-5 h-5 text-white" />
          </div>
          <h4 className="font-semibold text-neutral-800 mb-2">Notifications</h4>
          <p className="text-sm text-neutral-600 mb-4">Manage class reminders and alerts</p>
          <button
            onClick={() => setShowRemindersModal(true)}
            className="w-full bg-gradient-to-r from-accent-cyan to-accent-cyanDark text-white rounded-lg py-2 text-sm font-medium hover:shadow-md transition-all"
          >
            Set Reminders
          </button>
        </div>
      </div>

      <FormModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSubmit={handleAddSession}
        title="Add Session"
        subtitle="Create a new class session or office hour"
        submitText="Add Session"
        mode="create"
        fields={[
          { name: 'course', label: 'Course', type: 'text', required: true, fullWidth: true },
          { name: 'code', label: 'Code', type: 'text', required: true },
          { name: 'type', label: 'Type', type: 'select', required: true, options: [
            { value: 'Lecture', label: 'Lecture' },
            { value: 'Lab', label: 'Lab' },
            { value: 'Office Hours', label: 'Office Hours' },
            { value: 'Meeting', label: 'Meeting' }
          ]},
          { name: 'day', label: 'Day', type: 'select', required: true, options: days.map(d => ({ value: d, label: d })) },
          { name: 'startTime', label: 'Start Time', type: 'text', required: true, placeholder: '09:00' },
          { name: 'endTime', label: 'End Time', type: 'text', required: true, placeholder: '10:30' },
          { name: 'room', label: 'Room', type: 'text', required: true },
          { name: 'students', label: 'Students', type: 'number', required: true, min: 0 }
        ]}
        initialData={{
          course: '',
          code: '',
          type: 'Lecture',
          day: 'Monday',
          startTime: '09:00',
          endTime: '10:30',
          room: '',
          students: 0
        }}
      />

      <FormModal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        onSubmit={handleEditSession}
        title="Edit Session"
        subtitle="Update session details"
        submitText="Save Changes"
        mode="edit"
        fields={[
          { name: 'course', label: 'Course', type: 'text', required: true, fullWidth: true },
          { name: 'code', label: 'Code', type: 'text', required: true },
          { name: 'type', label: 'Type', type: 'select', required: true, options: [
            { value: 'Lecture', label: 'Lecture' },
            { value: 'Lab', label: 'Lab' },
            { value: 'Office Hours', label: 'Office Hours' },
            { value: 'Meeting', label: 'Meeting' }
          ]},
          { name: 'day', label: 'Day', type: 'select', required: true, options: days.map(d => ({ value: d, label: d })) },
          { name: 'startTime', label: 'Start Time', type: 'text', required: true },
          { name: 'endTime', label: 'End Time', type: 'text', required: true },
          { name: 'room', label: 'Room', type: 'text', required: true },
          { name: 'students', label: 'Students', type: 'number', required: true, min: 0 }
        ]}
        initialData={selectedSession ? {
          course: selectedSession.course,
          code: selectedSession.code,
          type: selectedSession.type,
          day: selectedSession.day,
          startTime: selectedSession.time.split('-')[0],
          endTime: selectedSession.time.split('-')[1],
          room: selectedSession.room,
          students: selectedSession.students
        } : {}}
      />

      <ConfirmationModal
        isOpen={showCancelModal}
        onClose={() => setShowCancelModal(false)}
        onConfirm={handleConfirmCancel}
        title="Cancel Session"
        message={selectedSession ? `Cancel ${selectedSession.code} • ${selectedSession.course} on ${selectedSession.day} at ${selectedSession.time}?` : 'Cancel this session?'}
        confirmText="Cancel Session"
        cancelText="Keep"
        type="warning"
      />

      <BaseModal
        isOpen={showRemindersModal}
        onClose={() => setShowRemindersModal(false)}
        title="Reminders"
        subtitle="Configure teaching schedule notifications"
        size="sm"
      >
        <div className="space-y-4">
          <label className="flex items-center gap-2 text-sm text-neutral-700">
            <input
              type="checkbox"
              checked={reminders.enabled}
              onChange={(e) => setReminders(prev => ({ ...prev, enabled: e.target.checked }))}
              className="rounded border-neutral-300 text-brand-primary focus:ring-brand-primary/20"
            />
            Enable reminders
          </label>

          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">Minutes before</label>
            <input
              type="number"
              min={0}
              value={reminders.minutesBefore}
              onChange={(e) => setReminders(prev => ({ ...prev, minutesBefore: Number(e.target.value || 0) }))}
              className="w-full px-3 py-2 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-colors"
              disabled={!reminders.enabled}
            />
          </div>

          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm text-neutral-700">
              <input
                type="checkbox"
                checked={reminders.inApp}
                onChange={(e) => setReminders(prev => ({ ...prev, inApp: e.target.checked }))}
                className="rounded border-neutral-300 text-brand-primary focus:ring-brand-primary/20"
                disabled={!reminders.enabled}
              />
              In-app notifications
            </label>
            <label className="flex items-center gap-2 text-sm text-neutral-700">
              <input
                type="checkbox"
                checked={reminders.email}
                onChange={(e) => setReminders(prev => ({ ...prev, email: e.target.checked }))}
                className="rounded border-neutral-300 text-brand-primary focus:ring-brand-primary/20"
                disabled={!reminders.enabled}
              />
              Email notifications
            </label>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-neutral-200">
            <button
              onClick={() => setShowRemindersModal(false)}
              className="px-6 py-2 bg-brand-primary hover:bg-brand-primary-dark text-white rounded-lg transition-all"
            >
              Done
            </button>
          </div>
        </div>
      </BaseModal>
    </div>
  );
}
