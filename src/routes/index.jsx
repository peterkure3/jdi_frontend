import { Routes, Route, Navigate } from 'react-router-dom';
import AuthLayout from '../layouts/AuthLayout.jsx';
import PortalLayout from '../layouts/PortalLayout.jsx';
import LandingPage from '../pages/auth/LandingPage.jsx';
import AdmissionsPage from '../pages/auth/AdmissionsPage.jsx';
import AdminDashboard from '../pages/admin/Dashboard.jsx';
import LecturerDashboard from '../pages/lecturer/Dashboard.jsx';
import StudentDashboard from '../pages/student/Dashboard.jsx';
import { storage, KEYS } from '../lib/storage.js';
import Placeholder from '../pages/common/Placeholder.jsx';

// Admin Pages
import AdminApplications from '../pages/admin/Applications.jsx';
import AdminStudents from '../pages/admin/Students.jsx';
import AdminLecturers from '../pages/admin/Lecturers.jsx';
import AdminCourses from '../pages/admin/Courses.jsx';
import AdminFinance from '../pages/admin/Finance.jsx';
import AdminSettings from '../pages/admin/Settings.jsx';
import AdminReports from '../pages/admin/Reports.jsx';
import AdminSystem from '../pages/admin/System.jsx';
import AdminCommunications from '../pages/admin/Communications.jsx';

// Lecturer Pages
import LecturerProfile from '../pages/lecturer/Profile.jsx';
import LecturerCourses from '../pages/lecturer/Courses.jsx';
import LecturerSchedule from '../pages/lecturer/Schedule.jsx';
import LecturerStudents from '../pages/lecturer/Students.jsx';
import LecturerGrades from '../pages/lecturer/Grades.jsx';
import LecturerMaterials from '../pages/lecturer/Materials.jsx';
import LecturerELibrary from '../pages/lecturer/ELibrary.jsx';
import LecturerAssignments from '../pages/lecturer/Assignments.jsx';
import LecturerMessages from '../pages/lecturer/Messages.jsx';
import LecturerSettings from '../pages/lecturer/Settings.jsx';

// Student Pages
import StudentProfile from '../pages/student/Profile.jsx';
import StudentResources from '../pages/student/Resources.jsx';
import StudentCourses from '../pages/student/Courses.jsx';
import StudentGrades from '../pages/student/Grades.jsx';
import StudentSchedule from '../pages/student/Schedule.jsx';
import StudentELibrary from '../pages/student/ELibrary.jsx';
import StudentMessages from '../pages/student/Messages.jsx';
import StudentFinancial from '../pages/student/Financial.jsx';
import StudentSettings from '../pages/student/Settings.jsx';

function ProtectedRoute({ allowed, children }) {
  const role = storage.get(KEYS.role);
  const isAuthed = storage.get(KEYS.isAuthenticated);
  if (!isAuthed || !role) {
    return <Navigate to="/" replace />;
  }
  if (allowed && !allowed.includes(role)) {
    return <Navigate to="/" replace />;
  }
  return children;
}

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<AuthLayout />}> 
        <Route index element={<LandingPage />} />
      </Route>
      
      <Route path="admissions" element={<AdmissionsPage />} />

      <Route
        path="/admin"
        element={
          <ProtectedRoute allowed={["admin"]}>
            <PortalLayout role="admin" />
          </ProtectedRoute>
        }
      >
        <Route index element={<AdminDashboard />} />
        <Route path="applications" element={<AdminApplications />} />
        <Route path="students" element={<AdminStudents />} />
        <Route path="lecturers" element={<AdminLecturers />} />
        <Route path="password-management" element={<Placeholder title="Password Management" description="Policy settings, reset requests." />} />
        <Route path="courses" element={<AdminCourses />} />
        <Route path="finance" element={<AdminFinance />} />
        <Route path="reports" element={<AdminReports />} />
        <Route path="communications" element={<AdminCommunications />} />
        <Route path="system" element={<AdminSystem />} />
        <Route path="settings" element={<AdminSettings />} />
      </Route>

      <Route
        path="/lecturer"
        element={
          <ProtectedRoute allowed={["lecturer"]}>
            <PortalLayout role="lecturer" />
          </ProtectedRoute>
        }
      >
        <Route index element={<LecturerDashboard />} />
        <Route path="profile" element={<LecturerProfile />} />
        <Route path="courses" element={<LecturerCourses />} />
        <Route path="schedule" element={<LecturerSchedule />} />
        <Route path="students" element={<LecturerStudents />} />
        <Route path="student-results" element={<LecturerGrades />} />
        <Route path="materials" element={<LecturerMaterials />} />
        <Route path="e-library" element={<LecturerELibrary />} />
        <Route path="assignments" element={<LecturerAssignments />} />
        <Route path="gradebook" element={<LecturerGrades />} />
        <Route path="messages" element={<LecturerMessages />} />
        <Route path="settings" element={<LecturerSettings />} />
      </Route>

      <Route
        path="/student"
        element={
          <ProtectedRoute allowed={["student"]}>
            <PortalLayout role="student" />
          </ProtectedRoute>
        }
      >
        <Route index element={<StudentDashboard />} />
        <Route path="profile" element={<StudentProfile />} />
        <Route path="resources" element={<StudentResources />} />
        <Route path="courses" element={<StudentCourses />} />
        <Route path="e-library" element={<StudentELibrary />} />
        <Route path="grades" element={<StudentGrades />} />
        <Route path="schedule" element={<StudentSchedule />} />
        <Route path="messages" element={<StudentMessages />} />
        <Route path="financial" element={<StudentFinancial />} />
        <Route path="settings" element={<StudentSettings />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
