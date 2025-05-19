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

        console.log("하이드레이션 완료 후 인증 상태:", isLoggedIn);

        const isProtectedPath = protectedPaths.some(path => pathname.startsWith(path));

        if (isProtectedPath && !isLoggedIn) {
            router.replace("/login");
        }
    }, [isLoggedIn, router, pathname, isHydrated]);

    return null;
}