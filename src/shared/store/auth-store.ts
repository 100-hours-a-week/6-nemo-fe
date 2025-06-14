import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type AuthState = {
    token: string | null;
    isLoggedIn: boolean;
    isHydrated: boolean;
    login: (token: string) => void;
    logout: () => void;
    setHydrated: (state: boolean) => void;
}

const setCookie = (name: string, value: string, days: number = 7) => {
    if (typeof document !== 'undefined') {
        const expires = new Date();
        expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
        document.cookie = `${name}=${value}; expires=${expires.toUTCString()}; path=/; secure; samesite=strict`;
    }
};

const deleteCookie = (name: string) => {
    if (typeof document !== 'undefined') {
        document.cookie = `${name}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
    }
};

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            token: null,
            isLoggedIn: false,
            isHydrated: false,

            login: (token: string) => {
                // 로컬스토리지와 쿠키 모두에 저장
                setCookie('access-token', token);
                set({ token, isLoggedIn: true });
            },

            logout: () => {
                // 로컬스토리지와 쿠키 모두에서 삭제
                deleteCookie('access-token');
                set({ token: null, isLoggedIn: false });
            },

            setHydrated: (state: boolean) => set({ isHydrated: state }),
        }),
        {
            name: 'auth-storage',
            storage: createJSONStorage(() => localStorage),
            onRehydrateStorage: () => (state) => {
                if (state) {
                    state.setHydrated(true);
                    // 하이드레이션 시 쿠키도 설정
                    if (state.token) {
                        setCookie('access-token', state.token);
                    }
                }
            },
            partialize: (state) => ({
                token: state.token,
                isLoggedIn: state.isLoggedIn
            }),
        }
    )
);
