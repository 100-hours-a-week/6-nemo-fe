"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function LoginSuccessPage() {
  const router = useRouter();

  useEffect(() => {
    const redirectPath = sessionStorage.getItem("loginRedirect");
    sessionStorage.removeItem("loginRedirect");

    router.replace(redirectPath || "/groups");
  }, [router]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <div className="border-primary mx-auto h-12 w-12 animate-spin rounded-full border-4 border-t-transparent"></div>
        <p className="text-body-1 mt-4 text-gray-600">로그인 처리 중...</p>
      </div>
    </div>
  );
}
