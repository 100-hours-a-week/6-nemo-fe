"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuthStore } from "@/shared/store/auth-store";

export default function AuthInterceptor() {
    const { isLoggedIn, isHydrated } = useAuthStore();
    const router = useRouter();
    const pathname = usePathname();

    const protectedPaths = ['/home', '/groups', '/my-nemo', '/profile', '/chatbot'];

    useEffect(() => {
        if (!isHydrated) return;

        const isProtectedPath = protectedPaths.some(path => pathname.startsWith(path));

        if (isProtectedPath && !isLoggedIn) {
            router.replace("/login");
        }

        const isLoginpage = pathname.startsWith('/login');
        if (isLoginpage && isLoggedIn) {
            router.replace("/")
        }
    }, [isLoggedIn, router, pathname, isHydrated]);

    return null;
}