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
    login: (token: string) => void;
    // setUser: (user: User) => void;
    // logout: () => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            token: null,
            // user: null,
            isLoggedIn: false,

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
            }
        }),
        {
            name: 'auth-storage',
            storage: createJSONStorage(() => localStorage),
            partialize: (state) => ({
                token: state.token,
                // user: state.user,
                isLoggedIn: state.isLoggedIn
            }),
        }
    )
);