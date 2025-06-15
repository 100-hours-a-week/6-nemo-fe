"use client";

import { createImageHandler } from "@/shared/lib";
import { useRef } from "react";
import { useUpdateGroupImage } from "../api/use-update-group-image";

type Props = {
  groupId: string;
  onSuccess?: () => void;
};

export const UpdateGroupImageButton = ({ groupId, onSuccess }: Props) => {
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
      },
    });
  });

  return (
    <>
      <button
        onClick={handleImageClick}
        disabled={isPending}
        className="flex w-full items-center justify-center rounded-lg px-4 py-4 text-center transition-colors hover:bg-gray-100 active:bg-gray-200"
      >
        <span className="text-body-1 font-medium text-gray-900">
          {isPending ? "사진 변경 중..." : "대표 사진 변경"}
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
