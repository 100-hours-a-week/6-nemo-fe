"use client";

import LoginButton from "@/features/auth/ui/login-button";
import { bg_post } from "@/shared/assets/images";
import { useAuthStore } from "@/shared/store/auth-store";
import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, Suspense } from "react";

export default function LoginPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginContent />
    </Suspense>
  );
}

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const { login } = useAuthStore();

  useEffect(() => {
    if (token) {
      login(token); // 상태 업데이트
    }
  }, [token, login]);
  
  useEffect(() => {
    if (useAuthStore.getState().isLoggedIn) {
      router.replace("/home");
    }
  }, [router]);

  return (
    <div className="p-ctn-lg flex min-h-screen flex-col items-center justify-center">
      <h1 className="text-title-1 text-label-strong-2 text-right font-extralight">
        네가 찾는 모임,
        <br />
        <span className="text-display-1 text-primary-strong font-bold">
          네모!
        </span>
      </h1>
      <Image
        src={bg_post}
        alt="배경 이미지"
        width={318}
        height={318}
        className="mt-10 ml-15"
      />
      <LoginButton platform="kakao" />
    </div>
  );
}
