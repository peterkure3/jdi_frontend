// Simple localStorage helpers with JSON handling and safe access
export const storage = {
  get(key, fallback = null) {
    try {
      const raw = localStorage.getItem(key);
      if (raw === null || raw === undefined) return fallback;
      try {
        return JSON.parse(raw);
      } catch {
        return raw;
      }
    } catch {
      return fallback;
    }
  },
  set(key, value) {
    try {
      const toStore = typeof value === 'string' ? value : JSON.stringify(value);
      localStorage.setItem(key, toStore);
      return true;
    } catch {
      return false;
    }
  },
  remove(key) {
    try {
      localStorage.removeItem(key);
      return true;
    } catch {
      return false;
    }
  },
  clear() {
    try {
      localStorage.clear();
      return true;
    } catch {
      return false;
    }
  }
};

export const KEYS = {
  userId: 'userid',
  email: 'email',
  role: 'role',
  isAuthenticated: 'isAuthenticated',
  postSignupMessage: 'postSignupMessage',
  postLoginMessage: 'postLoginMessage',
  studentData: 'studentData',
  userSettings: 'userSettings',
  userPreferences: 'userPreferences',
  recentDownloads: 'recentDownloads',
  profilePicture: 'profilePicture',
  studentsData: 'studentsData',
  sidebarCollapsed: 'sidebarCollapsed',
};
