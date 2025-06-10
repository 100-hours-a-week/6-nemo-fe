"use client";

import { UserProfile } from "@/entities/profile";
import { edit, user } from "@/shared/assets/images";
import { createImageHandler } from "@/shared/lib";
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
  const { mutate: profileImageMutate, isPending } = useUpdateProfileImage();

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = createImageHandler(profileImageMutate);

  return (
    <div className="flex flex-col items-center">
      <button
        onClick={handleImageClick}
        disabled={isPending}
        className="group relative h-24 w-24 overflow-hidden rounded-full bg-gray-200 transition-transform duration-200 hover:scale-105"
      >
        {userProfile.profileImageUrl ? (
          <Image
            src={userProfile.profileImageUrl}
            alt={userProfile.nickname}
            fill
            className="object-cover transition-opacity duration-200 group-hover:opacity-80"
            sizes="96px"
          />
        ) : (
          <Image
            src={user}
            alt="기본 프로필"
            width={96}
            height={96}
            className="object-cover opacity-50 transition-opacity duration-200 group-hover:opacity-70"
          />
        )}

        {/* 호버 오버레이 */}
        <div className="bg-opacity-50 absolute inset-0 flex items-center justify-center bg-black opacity-0 transition-opacity duration-200 group-hover:opacity-70">
          <Image src={edit} alt="edit icon" width={24} height={24} />
        </div>

        {/* 로딩 오버레이 */}
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
    </div>
  );
};
