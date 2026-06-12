import { AdminData } from '../types/admin';

const ADMIN_STORAGE_KEY = 'admin-dashboard-data';

const isBrowser = typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';

export function loadAdminData(defaultData: AdminData): AdminData {
  if (!isBrowser) return defaultData;

  try {
    const raw = window.localStorage.getItem(ADMIN_STORAGE_KEY);
    return raw ? JSON.parse(raw) : defaultData;
  } catch (error) {
    console.error('Failed to load admin data from localStorage', error);
    return defaultData;
  }
}

export function saveAdminData(data: AdminData) {
  if (!isBrowser) return;

  try {
    window.localStorage.setItem(ADMIN_STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('Failed to save admin data to localStorage', error);
  }
}
