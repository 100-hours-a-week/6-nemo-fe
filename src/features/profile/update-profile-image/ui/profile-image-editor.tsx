"use client";

import { UserProfile } from "@/entities/profile";
import { user } from "@/shared/assets/images";
import Image from "next/image";
import { useRef } from "react";
import { useUpdateProfileImage } from "../api/use-update-profile-image";

type ProfileImageEditorProps = {
  userProfile: UserProfile;
};

export const ProfileImageEditor = ({
  userProfile,
}: ProfileImageEditorProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { mutate, isPending } = useUpdateProfileImage();

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // 파일 크기 제한 (5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert("이미지 크기는 5MB 이하여야 합니다.");
      return;
    }

    // 이미지 타입 확인
    if (!file.type.startsWith("image/")) {
      alert("이미지 파일만 업로드 가능합니다.");
      return;
    }

    mutate(file);
  };

  return (
    <div className="flex flex-col items-center">
      <button
        onClick={handleImageClick}
        disabled={isPending}
        className="relative h-24 w-24 overflow-hidden rounded-full bg-gray-200"
      >
        {userProfile.profileImageUrl ? (
          <Image
            src={userProfile.profileImageUrl}
            alt={userProfile.nickname}
            fill
            className="object-cover"
            sizes="96px"
          />
        ) : (
          <Image
            src={user}
            alt="기본 프로필"
            width={96}
            height={96}
            className="object-cover opacity-50"
          />
        )}
        {isPending && (
          <div className="bg-opacity-50 absolute inset-0 flex items-center justify-center bg-black">
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-white border-t-transparent" />
          </div>
        )}
      </button>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="hidden"
      />
      <p className="text-caption-1 text-label-normal mt-2">
        프로필 사진을 클릭하여 변경
      </p>
    </div>
  );
};
