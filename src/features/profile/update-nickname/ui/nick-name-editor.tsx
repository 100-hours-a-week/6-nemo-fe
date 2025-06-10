"use client";

import { UserProfile } from "@/entities/profile";
import { edit } from "@/shared/assets/images";
import Image from "next/image";
import { useState } from "react";
import { useUpdateNickname } from "../api/use-update-nickname";

type NicknameEditorProps = {
  userProfile: UserProfile;
};

export const NicknameEditor = ({ userProfile }: NicknameEditorProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [nickname, setNickname] = useState(userProfile.nickname);
  const { mutate, isPending } = useUpdateNickname();

  const handleSave = () => {
    if (nickname.trim() === userProfile.nickname) {
      setIsEditing(false);
      return;
    }

    if (nickname.trim().length < 2 || nickname.trim().length > 20) {
      alert("닉네임은 2자 이상 20자 이하로 입력해주세요.");
      return;
    }

    mutate(nickname.trim(), {
      onSuccess: () => {
        setIsEditing(false);
      },
    });
  };

  const handleCancel = () => {
    setNickname(userProfile.nickname);
    setIsEditing(false);
  };

  return (
    <div className="text-center">
      {isEditing ? (
        <div className="flex items-center justify-center gap-2">
          <input
            type="text"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            className="text-heading-2 rounded-md border border-gray-300 px-2 py-1 text-center font-semibold"
            maxLength={20}
            autoFocus
          />
          <button
            onClick={handleSave}
            disabled={isPending}
            className="text-primary text-body-2 font-medium"
          >
            저장
          </button>
          <button
            onClick={handleCancel}
            disabled={isPending}
            className="text-body-2 text-gray-500"
          >
            취소
          </button>
        </div>
      ) : (
        <div className="relative inline-flex items-center">
          <h2 className="text-heading-2 font-semibold">
            {userProfile.nickname}
          </h2>
          <button
            onClick={() => setIsEditing(true)}
            className="absolute -right-4"
          >
            <Image
              src={edit}
              alt="Edit icon"
              width={14}
              height={14}
              className="hover:size-4"
            />
          </button>
        </div>
      )}
      <p className="text-body-2 text-label-normal mt-1">{userProfile.email}</p>
      <p className="text-caption-2 text-label-normal mt-2">
        가입일: {new Date(userProfile.createdAt).toLocaleDateString()}
      </p>
    </div>
  );
};
