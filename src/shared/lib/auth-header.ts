// src/shared/lib/auth-header.ts
import { useAuthStore } from "@/shared/store/auth-store";

export const getAuthHeader = () => {
    const token = useAuthStore.getState().token;

    return {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
    };
};