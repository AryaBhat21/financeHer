/**
 * storage.ts — Reusable LocalStorage Helpers for FinanceHer
 *
 * Provides type-safe save, load, and remove helpers with error boundary parsing.
 * Since this is Next.js, these helpers safely check for window/document to
 * avoid build-time SSR exceptions.
 */

export const STORAGE_KEYS = {
  USER_PROFILE: 'financeher_user_profile',
  EXPENSES: 'financeher_expenses',
  GOALS: 'financeher_goals',
};

/** Checks if running in browser environment. */
const isBrowser = (): boolean => typeof window !== 'undefined';

/** Safely stores a typed value in LocalStorage. */
export function saveToStorage<T>(key: string, value: T): boolean {
  if (!isBrowser()) return false;
  try {
    const serialised = JSON.stringify(value);
    window.localStorage.setItem(key, serialised);
    return true;
  } catch (error) {
    console.error(`[Storage API] Error saving key "${key}" to localStorage:`, error);
    return false;
  }
}

/** Safely loads and parses a typed value from LocalStorage. Returns defaultVal if missing or invalid. */
export function loadFromStorage<T>(key: string, defaultVal: T): T {
  if (!isBrowser()) return defaultVal;
  try {
    const item = window.localStorage.getItem(key);
    if (item === null) return defaultVal;
    return JSON.parse(item) as T;
  } catch (error) {
    console.error(`[Storage API] Error parsing key "${key}" from localStorage:`, error);
    return defaultVal;
  }
}

/** Safely removes an item from LocalStorage. */
export function removeFromStorage(key: string): boolean {
  if (!isBrowser()) return false;
  try {
    window.localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error(`[Storage API] Error removing key "${key}" from localStorage:`, error);
    return false;
  }
}
