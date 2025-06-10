import { getUserProfile } from "@/entities/profile";
import { LogoutButton } from "@/features/auth/logout";
import { NicknameEditor } from "@/features/profile/update-nickname";
import { ProfileImageEditor } from "@/features/profile/update-profile-image";
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

export default async function ProfilePage() {
  const userProfile = await getUserProfile();

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
