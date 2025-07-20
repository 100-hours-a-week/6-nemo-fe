"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import LoginButton from "@/features/auth/login/ui/login-button";
import {
  bot_icon,
  education_icon,
  game,
  right,
  soccer_icon,
  talking_icon,
  team_icon,
  time_management_icon,
} from "@/shared/assets/images";

function LoginContent() {
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect");
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const slides = [
    {
      id: 1,
      title: "네가 찾는 모임,",
      highlight: "네모!",
      subtitle: "관심사와 취미가 같은 사람들과\n새로운 만남을 시작해보세요",
      icon: <Image src={team_icon} alt="모임 아이콘" width={84} height={84} />,
      bgGradient: "from-lime-50 to-lime-100",
    },
    {
      id: 2,
      title: "AI 챗봇 탱글이가",
      highlight: "딱 맞는 모임 추천",
      subtitle: "몇 가지 질문만으로\n당신에게 완벽한 모임을 찾아드려요",
      icon: <Image src={bot_icon} alt="챗봇 아이콘" width={84} height={84} />,
      bgGradient: "from-yellow-50 to-yellow-100",
    },
    {
      id: 3,
      title: "쉽고 간편한",
      highlight: "모임 관리",
      subtitle: "일정 생성부터 참여 관리까지\n모든 것을 한 곳에서 해결하세요",
      icon: (
        <Image
          src={time_management_icon}
          alt="일정 관리 아이콘"
          width={84}
          height={84}
        />
      ),
      bgGradient: "from-blue-50 to-blue-100",
    },
  ];

  useEffect(() => {
    if (redirect) {
      sessionStorage.setItem("loginRedirect", redirect);
    }
  }, [redirect]);

  useEffect(() => {
    const timer = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
        setIsAnimating(false);
      }, 300);
    }, 4000);

    return () => clearInterval(timer);
  }, [slides.length]);

  const handleSlideChange = (index: number) => {
    if (index !== currentSlide) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentSlide(index);
        setIsAnimating(false);
      }, 300);
    }
  };

  const handleServiceTour = () => {
    window.location.href = "/groups";
  };

  return (
    <div className="relative flex min-h-screen flex-col bg-gradient-to-br from-green-50 via-white to-green-50">
      {/* 메인 슬라이드 영역 */}
      <div className="relative flex flex-1 flex-col items-center justify-center overflow-hidden px-6">
        <div
          className={`transform transition-all duration-300 ${isAnimating ? "scale-95 opacity-0" : "scale-100 opacity-100"}`}
        >
          {/* 아이콘 */}
          <div className="mb-8 flex justify-center">
            <div
              className={`rounded-full bg-gradient-to-r p-6 ${slides[currentSlide].bgGradient} shadow-lg`}
            >
              {slides[currentSlide].icon}
            </div>
          </div>

          {/* 텍스트 */}
          <div className="mb-12 text-center">
            <h1 className="text-title-3 text-label-strong-2 mb-2 font-extralight">
              {slides[currentSlide].title}
            </h1>
            <h2 className="text-display-2 text-primary-strong mb-6 font-bold">
              {slides[currentSlide].highlight}
            </h2>
            <p className="text-body-1 text-label-normal leading-relaxed whitespace-pre-line">
              {slides[currentSlide].subtitle}
            </p>
          </div>
        </div>

        {/* 데코레이션 요소들 */}
        <div
          className="absolute top-30 left-12 animate-bounce opacity-20"
          style={{ animationDelay: "0s" }}
        >
          <Image src={game} alt="모임 아이콘" width={64} height={64} />
        </div>
        <div
          className="absolute top-18 right-12 animate-bounce opacity-20"
          style={{ animationDelay: "1s" }}
        >
          <Image src={soccer_icon} alt="축구 아이콘" width={84} height={84} />
        </div>
        <div
          className="absolute bottom-20 left-12 animate-bounce opacity-20"
          style={{ animationDelay: "2s" }}
        >
          <Image src={talking_icon} alt="대화 아이콘" width={96} height={96} />
        </div>
        <div
          className="absolute right-6 bottom-40 animate-bounce opacity-20"
          style={{ animationDelay: "1.5s" }}
        >
          <Image
            src={education_icon}
            alt="교육 아이콘"
            width={72}
            height={72}
          />
        </div>
      </div>

      {/* 슬라이드 인디케이터 */}
      <div className="mb-8 flex justify-center space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => handleSlideChange(index)}
            className={`h-3 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? "bg-primary w-8"
                : "w-3 bg-gray-300 hover:bg-gray-400"
            }`}
          />
        ))}
      </div>

      {/* 하단 버튼 영역 */}
      <div className="p-ctn-lg space-y-4">
        {/* 카카오 로그인 버튼 */}
        <LoginButton />

        {/* 서비스 둘러보기 버튼 */}
        <button
          onClick={handleServiceTour}
          className="bg-common-100 rounded-ctn-sm text-body-2 flex max-h-[48px] w-full items-center justify-center border border-gray-200 px-7 py-4 font-medium text-gray-500 transition-all duration-200 hover:bg-gray-100"
        >
          서비스 둘러보기
          <Image src={right} alt="화살표 아이콘" width={18} height={18} />
        </button>

        {/* 이용 약관 */}
        <div className="pt-4 text-center">
          <p className="text-caption-1 text-label-normal">
            로그인 시{" "}
            <span className="cursor-pointer underline hover:text-gray-700">
              <Link href="/login/terms">이용약관</Link>
            </span>{" "}
            및{" "}
            <span className="cursor-pointer underline hover:text-gray-700">
              <Link href="/login/privacy">개인정보처리방침</Link>
            </span>
            에 동의하게 됩니다
          </p>
        </div>
      </div>

      {/* 배경 장식 요소 */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-20 -right-20 h-40 w-40 animate-pulse rounded-full bg-gradient-to-br from-green-200 to-green-300 opacity-20" />
        <div
          className="absolute -bottom-16 -left-16 h-32 w-32 animate-pulse rounded-full bg-gradient-to-tr from-blue-200 to-purple-200 opacity-20"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="absolute top-1/3 -left-8 h-24 w-24 animate-pulse rounded-full bg-gradient-to-br from-purple-200 to-pink-200 opacity-15"
          style={{ animationDelay: "4s" }}
        />
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="p-ctn-lg flex min-h-screen flex-col items-center justify-center">
          <div className="border-primary h-12 w-12 animate-spin rounded-full border-4 border-t-transparent" />
          <p className="text-body-1 mt-4 text-gray-600">로딩 중...</p>
        </div>
      }
    >
      <LoginContent />
    </Suspense>
  );
}
