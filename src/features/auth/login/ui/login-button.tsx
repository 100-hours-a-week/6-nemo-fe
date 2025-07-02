"use client";

import { kakao_logo } from "@/shared/assets/images";
import { KAKAO_AUTH_URL } from "@/shared/constants";
import Image from "next/image";
import { useRouter } from "next/navigation";

const LoginButton = () => {
  const router = useRouter();

  const handleLogin = () => {
    window.location.href = KAKAO_AUTH_URL;
  };

  return (
    <button
      className="bg-kakao flex w-full items-center rounded-xl px-7 py-4"
      onClick={handleLogin}
    >
      <Image src={kakao_logo} alt="kakao logo" width={24} height={24} />
      <span className="text-common-0 mx-auto text-[18px] font-semibold">
        카카오로 3초 만에 시작하기
      </span>
    </button>
  );
};

export default LoginButton;
