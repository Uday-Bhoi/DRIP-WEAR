import { create } from 'zustand';
import type { WardrobeItem } from '../types/wardrobe';
import { wardrobeApi } from '../api/wardrobe';
import { userApi } from '../api/user';
import { authApi } from '../api/auth';
import { logoutFirebase, onAuthChange } from '../core/firebase';

export interface AvatarConfig {
  gender: 'female' | 'male';
  skinTone: string;
  hairStyle: string;
  topColor: string;
  pantsColor?: string;
  hairColor?: string;
  glasses?: boolean;
}

export interface UserProfile {
  name: string;
  email: string;
  avatarUrl: string;
  styleDna: string;
  height?: string;
  googleConnected?: boolean;
}

interface AppState {
  isAuthenticated: boolean;
  isAuthInitializing: boolean;
  firebaseUid: string | null;
  isLoading: boolean;
  user: UserProfile;
  avatarConfig: AvatarConfig;
  wardrobeItems: WardrobeItem[];

  login: (uid?: string, token?: string) => void;
  logout: () => Promise<void>;
  syncFirebaseSession: (uid: string, email: string, name?: string, photoUrl?: string) => Promise<void>;
  fetchWardrobeItems: () => Promise<void>;
  fetchUserProfile: () => Promise<void>;
  setAvatarConfig: (config: Partial<AvatarConfig>) => void;
  updateAvatar: (config: Partial<AvatarConfig>) => void;
  updateProfile: (profile: Partial<UserProfile>) => void;
  addWardrobeItem: (item: WardrobeItem) => void;
  updateWardrobeItem: (itemId: string, updated: Partial<WardrobeItem>) => Promise<void>;
  deleteWardrobeItem: (itemId: string) => Promise<void>;
  toggleItemStatus: (itemId: string) => void;
}

const defaultAvatarConfig: AvatarConfig = {
  gender: 'female',
  skinTone: '#F3C5A5',
  hairStyle: 'long',
  topColor: '#D92243',
  pantsColor: '#1E293B',
  hairColor: '#0F172A',
  glasses: true,
};

const initialToken = localStorage.getItem('dripwear_access_token');
const initialUid = localStorage.getItem('dripwear_user_id');
const initialAuthFlag = localStorage.getItem('dripwear_is_authenticated') === 'true';

export const useAppStore = create<AppState>()((set, get) => ({
  isAuthenticated: initialAuthFlag || !!initialToken || !!initialUid,
  isAuthInitializing: true,
  firebaseUid: initialUid || null,
  isLoading: false,
  user: {
    name: 'Member User',
    email: '',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    styleDna: 'Streetwear Minimal',
    height: '180 cm',
    googleConnected: false,
  },
  avatarConfig: defaultAvatarConfig,
  wardrobeItems: [],

  login: (uid, token) => {
    localStorage.setItem('dripwear_is_authenticated', 'true');
    if (token) {
      localStorage.setItem('dripwear_access_token', token);
    }
    if (uid) {
      localStorage.setItem('dripwear_user_id', uid);
    }
    set({ isAuthenticated: true, firebaseUid: uid || get().firebaseUid, isAuthInitializing: false });
    get().fetchWardrobeItems();
    get().fetchUserProfile();
  },

  syncFirebaseSession: async (uid: string, email: string, name?: string, photoUrl?: string) => {
    localStorage.setItem('dripwear_is_authenticated', 'true');
    localStorage.setItem('dripwear_user_id', uid);

    const displayName = name || (email ? email.split('@')[0] : 'DripWear User');
    const avatar = photoUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80';

    try {
      const syncRes = await authApi.syncUser({
        firebase_uid: uid,
        email: email,
        full_name: displayName,
      });

      if (syncRes?.token?.access_token) {
        localStorage.setItem('dripwear_access_token', syncRes.token.access_token);
      }

      set((state) => ({
        isAuthenticated: true,
        isAuthInitializing: false,
        firebaseUid: uid,
        user: {
          ...state.user,
          name: displayName,
          email: email,
          avatarUrl: avatar,
          googleConnected: true,
        },
      }));

      await get().fetchWardrobeItems();
      await get().fetchUserProfile();
    } catch (err) {
      console.warn('Firebase session sync warning:', err);
      set((state) => ({
        isAuthenticated: true,
        isAuthInitializing: false,
        firebaseUid: uid,
        user: {
          ...state.user,
          name: displayName,
          email: email,
          avatarUrl: avatar,
        },
      }));
    }
  },

  logout: async () => {
    try {
      await logoutFirebase();
    } catch (e) {
      // Ignore firebase logout errors
    }
    localStorage.removeItem('dripwear_is_authenticated');
    localStorage.removeItem('dripwear_access_token');
    localStorage.removeItem('dripwear_user_id');
    set({ 
      isAuthenticated: false, 
      isAuthInitializing: false,
      firebaseUid: null,
      wardrobeItems: [],
      user: {
        name: '',
        email: '',
        avatarUrl: '',
        styleDna: 'Streetwear Minimal',
      },
    });
  },

  fetchWardrobeItems: async () => {
    set({ isLoading: true });
    try {
      const items = await wardrobeApi.getItems();
      set({ wardrobeItems: items || [] });
    } catch (err) {
      console.warn('API unavailable for wardrobe items.');
    } finally {
      set({ isLoading: false });
    }
  },

  fetchUserProfile: async () => {
    try {
      const profile = await userApi.getProfile();
      if (profile) {
        set((state) => ({
          user: {
            ...state.user,
            name: profile.full_name || state.user.name,
            email: profile.email || state.user.email,
          },
        }));
      }
    } catch (err) {
      console.warn('API unavailable for user profile.');
    }
  },

  setAvatarConfig: (config) =>
    set((state) => ({
      avatarConfig: { ...state.avatarConfig, ...config },
    })),

  updateAvatar: (config) =>
    set((state) => ({
      avatarConfig: { ...state.avatarConfig, ...config },
    })),

  updateProfile: (profile) => {
    set((state) => ({
      user: { ...state.user, ...profile },
    }));
    userApi.updateProfile({ full_name: profile.name }).catch(() => {});
  },

  addWardrobeItem: (item) =>
    set((state) => ({
      wardrobeItems: [item, ...state.wardrobeItems],
    })),

  updateWardrobeItem: async (itemId, updated) => {
    set((state) => ({
      wardrobeItems: state.wardrobeItems.map((item) =>
        item.id === itemId ? { ...item, ...updated } : item
      ),
    }));

    try {
      const serverUpdated = await wardrobeApi.updateItem(itemId, {
        name: updated.name,
        category: updated.category,
        purchase_price: updated.price,
        original_image_url: updated.imageUrl,
        brand: updated.brand,
        season: updated.season,
        occasion: updated.occasion,
        colors: updated.color ? [updated.color] : undefined,
      });
      set((state) => ({
        wardrobeItems: state.wardrobeItems.map((item) =>
          item.id === itemId ? { ...item, ...serverUpdated } : item
        ),
      }));
    } catch (err) {
      console.error('Failed to sync wardrobe item edit with backend:', err);
    }
  },

  deleteWardrobeItem: async (itemId) => {
    set((state) => ({
      wardrobeItems: state.wardrobeItems.filter((i) => i.id !== itemId),
    }));
    try {
      await wardrobeApi.deleteItem(itemId);
    } catch (err) {
      console.error('Failed to delete item from backend:', err);
    }
  },

  toggleItemStatus: (itemId) => {
    const item = get().wardrobeItems.find((i) => i.id === itemId);
    if (!item) return;
    const newStatus = item.status === 'clean' ? 'laundry' : 'clean';

    set((state) => ({
      wardrobeItems: state.wardrobeItems.map((i) =>
        i.id === itemId ? { ...i, status: newStatus, laundryStatus: newStatus } : i
      ),
    }));

    wardrobeApi.updateItem(itemId, { laundry_status: newStatus }).catch(() => {});
  },
}));

// Global Auth State Initializer Listener
export function initAuthListener() {
  onAuthChange(async (firebaseUser) => {
    if (firebaseUser) {
      await useAppStore.getState().syncFirebaseSession(
        firebaseUser.uid,
        firebaseUser.email || 'user@dripwear.ai',
        firebaseUser.displayName || undefined,
        firebaseUser.photoURL || undefined
      );
    } else {
      useAppStore.setState({ isAuthInitializing: false });
    }
  });
}
