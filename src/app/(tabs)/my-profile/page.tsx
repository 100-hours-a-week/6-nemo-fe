"use client";

import { profileQuery } from "@/entities/profile";
import { LogoutButton } from "@/features/auth/logout";
import { NicknameEditor } from "@/features/profile/update-nickname";
import { ProfileImageEditor } from "@/features/profile/update-profile-image";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

const MenuItem = ({
  title,
  href,
  external = false,
}: {
  title: string;
  href: string;
  external?: boolean;
}) => {
  const content = (
    <>
      <span className="text-body-1">{title}</span>
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M15 18L9 12L15 6"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </>
  );

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-between rounded-lg bg-white px-4 py-4 shadow-sm"
      >
        {content}
      </a>
    );
  }

  return (
    <Link
      href={href}
      className="flex items-center justify-between rounded-lg bg-white px-4 py-4 shadow-sm"
    >
      {content}
    </Link>
  );
};

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
    <div className="min-h-screen bg-gray-50">
      {/* 프로필 섹션 */}
      <div className="bg-white pt-8 pb-6 shadow-sm">
        <ProfileImageEditor userProfile={userProfile} />
        <div className="mt-4">
          <NicknameEditor userProfile={userProfile} />
        </div>
      </div>

      {/* 메뉴 섹션 */}
      <div className="space-y-3 p-4">
        {/* 제보 및 문의하기 */}
        <MenuItem
          title="제보 및 문의하기"
          href="https://docs.google.com/forms/d/e/1FAIpQLSfmb-hLo508p3tpaHvJg56bJoI4KQIkm1QXh7c0GKlyhnwDLw/viewform?usp=header"
          external
        />

        {/* 앱 버전 */}
        <div className="flex items-center justify-between rounded-lg bg-white px-4 py-4 shadow-sm">
          <span className="text-body-1">앱 버전</span>
          <span className="text-body-2 text-gray-500">v 1.1.0</span>
        </div>
      </div>

      {/* 로그아웃 버튼 */}
      <div className="p-4">
        <LogoutButton />
      </div>
    </div>
  );
}
