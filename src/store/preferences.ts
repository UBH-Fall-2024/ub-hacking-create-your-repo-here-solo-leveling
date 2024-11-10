import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UserPreferences {
  nickname: string;
  title: string;
  catchphrase: string;
  questStyle: string;
  personalLore: string;
}

interface PreferencesState {
  preferences: UserPreferences;
  setPreferences: (preferences: Partial<UserPreferences>) => void;
  updatePreference: (key: keyof UserPreferences, value: string) => void;
  clearPreferences: () => void;
}

const defaultPreferences: UserPreferences = {
  nickname: '',
  title: '',
  catchphrase: '',
  questStyle: '',
  personalLore: '',
};

export const usePreferencesStore = create<PreferencesState>()(
  persist(
    (set) => ({
      preferences: defaultPreferences,
      setPreferences: (newPreferences) => 
        set((state) => ({ 
          preferences: { ...state.preferences, ...newPreferences } 
        })),
      updatePreference: (key, value) => 
        set((state) => ({
          preferences: { ...state.preferences, [key]: value }
        })),
      clearPreferences: () => set({ preferences: defaultPreferences }),
    }),
    {
      name: 'user-preferences',
    }
  )
); 