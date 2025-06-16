"use client";

import { group_image_icon } from "@/shared/assets/images";
import { createImageHandler } from "@/shared/lib";
import { MenuItemSpinLoader } from "@/shared/ui";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import { useUpdateGroupImage } from "../api/use-update-group-image";

type Props = {
  groupId: string;
  onSuccess?: () => void;
};

export const UpdateGroupImageButton = ({ groupId, onSuccess }: Props) => {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { mutate: updateGroupImageMutate, isPending } =
    useUpdateGroupImage(groupId);

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = createImageHandler((imageFile: string) => {
    updateGroupImageMutate(imageFile, {
      onSuccess: () => {
        onSuccess?.();
        router.refresh();
      },
    });
  });

  return (
    <>
      <button
        onClick={handleImageClick}
        disabled={isPending}
        className="flex w-full items-center gap-4 rounded-lg px-4 py-4 text-center transition-colors hover:bg-gray-100 active:bg-gray-200"
      >
        <Image
          src={group_image_icon}
          alt="group image icon"
          width={20}
          height={20}
        />
        <span className="text-body-1 text-label-assistive font-medium">
          {isPending ? (
            <MenuItemSpinLoader text="수정 중..." />
          ) : (
            "대표 사진 변경"
          )}
        </span>
      </button>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="hidden"
      />
    </>
  );
};
