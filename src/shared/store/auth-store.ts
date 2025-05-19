import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

// v1에서는 로그아웃, 유저정보API 제외
// type User = {
//     userId: string;
//     nickname: string;
//     profileImageUrl: string | null;
// }

type AuthState = {
    token: string | null;
    // user: User | null;
    isLoggedIn: boolean;
    isHydrated: boolean; // 타입에 isHydrated 상태 추가
    login: (token: string) => void;
    // setUser: (user: User) => void;
    logout: () => void;
    setHydrated: (state: boolean) => void; // 타입에 setHydrated 함수 추가
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            token: null,
            // user: null,
            isLoggedIn: false,
            isHydrated: false, // 초기 상태 추가

            login: (token: string) => {
                set({ token, isLoggedIn: true });
                // 사용자 정보 API 추가 (v2)
            },

            // setUser: (user: User) => {
            //     set({ user });
            // },

            // logout: () => {
            //     set({ token: null, user: null, isLoggedIn: false });
            // },

            logout: () => {
                set({ token: null, isLoggedIn: false })
            },

            setHydrated: (state: boolean) => set({ isHydrated: state }), // 쉼표 추가
        }),
        {
            name: 'auth-storage',
            storage: createJSONStorage(() => localStorage),
            onRehydrateStorage: () => (state) => {
                // 하이드레이션 완료 시점
                if (state) {
                    state.setHydrated(true);
                }
            },
            partialize: (state) => ({
                token: state.token,
                // user: state.user,
                isLoggedIn: state.isLoggedIn
                // isHydrated는 persistance에서 제외 (매번 false로 시작)
            }),
        }
    )
);