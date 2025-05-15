"use client";

import LoginButton from "@/features/auth/ui/login-button";
import { bg_post } from "@/shared/assets/images";
import { useAuthStore } from "@/shared/store/auth-store";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { Suspense, useEffect } from "react";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const { login } = useAuthStore();

  useEffect(() => {
    if (token) {
      login(token);
      router.replace("/home");
    }
  }, [token, router, login]);

  return (
    <Suspense
      fallback={
        <div className="flex h-24 items-center justify-center">
          <div className="border-primary h-6 w-6 animate-spin rounded-full border-2 border-t-transparent"></div>
        </div>
      }
    >
      <div className="p-ctn-lg flex min-h-screen flex-col items-center justify-center">
        <h1 className="text-title-1 text-label-strong-2 text-right font-extralight">
          네가 찾는 모임,
          <br />
          <span className="text-display-1 text-primary-strong font-bold">
            네모!
          </span>
        </h1>
        {/* <Image src={nemo_logo} alt="Logo" width={192} height={192} /> */}
        <Image
          src={bg_post}
          alt="배경 이미지"
          width={318}
          height={318}
          className="mt-10 ml-15"
        />
        <LoginButton platform="kakao" />
      </div>
    </Suspense>
  );
}
