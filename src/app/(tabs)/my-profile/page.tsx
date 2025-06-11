"use client";

import { profileQuery } from "@/entities/profile";
import { LogoutButton } from "@/features/auth/logout";
import { NicknameEditor } from "@/features/profile/update-nickname";
import { ProfileImageEditor } from "@/features/profile/update-profile-image";
import { info, message, right } from "@/shared/assets/images";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";

export default function ProfilePage() {
  // const userProfile = await getUserProfile(); // 추후 미들웨어로 전환 시
  const {
    data: userProfile,
    isLoading,
    error,
  } = useQuery(profileQuery.profile());

  // 로딩 상태
  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="border-primary h-8 w-8 animate-spin rounded-full border-2 border-t-transparent" />
      </div>
    );
  }
  if (error || !userProfile) {
    return (
      <div className="p-ctn-lg flex h-screen w-full flex-col items-center justify-center">
        <p className="text-body-1 text-label-normal mb-4">
          프로필 정보를 불러올 수 없습니다.
        </p>
        <button
          onClick={() => window.location.reload()}
          className="bg-primary text-common-100 rounded-full px-6 py-2"
        >
          다시 시도
        </button>
      </div>
    );
  }

  return (
    <div className="p-ctn-lg min-h-[calc(100vh-58px)]">
      {/* 프로필 섹션 */}
      <div className="pt-8 pb-6">
        <ProfileImageEditor userProfile={userProfile} />
        <div className="mt-4">
          <NicknameEditor userProfile={userProfile} />
        </div>
      </div>

      {/* 메뉴 섹션 */}
      <div className="space-y-3">
        {/* 제보 및 문의하기 */}
        <a
          href="https://docs.google.com/forms/d/e/1FAIpQLSfmb-hLo508p3tpaHvJg56bJoI4KQIkm1QXh7c0GKlyhnwDLw/viewform?usp=header"
          className="flex w-full items-center justify-between rounded-lg p-4 transition-colors hover:bg-gray-50"
        >
          <div className="flex items-center gap-3">
            <Image src={message} alt="message icon" width={16} height={16} />
            <span className="font-medium text-gray-900">제보 및 문의하기</span>
          </div>
          <Image src={right} alt="chevron icon" width={16} height={16} />
        </a>

        {/* 앱 버전 */}
        <Link
          href="/my-profile/version"
          className="flex w-full items-center justify-between rounded-lg p-4 transition-colors hover:bg-gray-50"
        >
          <div className="flex items-center gap-3">
            <Image src={info} alt="message icon" width={16} height={16} />
            <span className="font-medium text-gray-900">앱 버전</span>
          </div>
          <span className="text-body-2 text-gray-500">v 2.0.0</span>
        </Link>
      </div>
      <div className="p-4">
        <LogoutButton />
      </div>
    </div>
  );
}
