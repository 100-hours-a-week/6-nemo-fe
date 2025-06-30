"use client";

import LoginButton from "@/features/auth/login/ui/login-button";
import { bg_post } from "@/shared/assets/images";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";

function LoginContent() {
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect");

  useEffect(() => {
    if (redirect) {
      sessionStorage.setItem("loginRedirect", redirect);
    }
  }, [redirect]);

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
      <LoginButton />
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="p-ctn-lg flex min-h-screen flex-col items-center justify-center">
          <div className="border-primary h-12 w-12 animate-spin rounded-full border-4 border-t-transparent"></div>
          <p className="text-body-1 mt-4 text-gray-600">로딩 중...</p>
        </div>
      }
    >
      <LoginContent />
    </Suspense>
  );
}
