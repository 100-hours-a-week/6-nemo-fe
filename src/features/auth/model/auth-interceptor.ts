"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuthStore } from "@/shared/store/auth-store";

export default function AuthInterceptor() {
    const { isLoggedIn } = useAuthStore();
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        const protectedPaths = ['/my-nemo', '/profile', '/chatbot'];
        const isProtectedPath = protectedPaths.some(path => pathname.startsWith(path));

        if (isProtectedPath && !isLoggedIn) {
            router.replace("/login");
        }
    }, [isLoggedIn, router, pathname]);

    return null;
}