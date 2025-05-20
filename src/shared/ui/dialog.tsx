"use client";

import React, { useRef, useEffect, useState } from "react";
import { cn } from "lib/utils";

export const ConfirmDialog = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmLabel = "확인",
  cancelLabel = "취소",
  variant = "default",
}: {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: "default" | "destructive";
}) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen && !dialog.open) {
      dialog.showModal();
    } else if (!isOpen && dialog.open) {
      handleClose();
    }
  }, [isOpen]);

  // 닫기 애니메이션 처리
  const handleClose = () => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    setIsClosing(true);
    dialog.classList.add("closing");

    // 애니메이션 시간(300ms) 후에 실제로 닫기
    setTimeout(() => {
      dialog.close();
      setIsClosing(false);
      dialog.classList.remove("closing");
    }, 300);
  };

  // 다이얼로그 배경 클릭 시 닫기
  const handleBackdropClick = (e: React.MouseEvent) => {
    const dialogDimensions = dialogRef.current?.getBoundingClientRect();
    if (!dialogDimensions) return;

    if (
      e.clientX < dialogDimensions.left ||
      e.clientX > dialogDimensions.right ||
      e.clientY < dialogDimensions.top ||
      e.clientY > dialogDimensions.bottom
    ) {
      onClose();
    }
  };

  return (
    <dialog
      ref={dialogRef}
      className="fixed top-1/2 left-1/2 m-0 w-[85%] max-w-[320px] -translate-x-1/2 -translate-y-1/2 rounded-lg border border-gray-200 bg-white p-0 shadow-lg"
      onClick={handleBackdropClick}
    >
      <div className="p-5">
        <h2 className="text-heading-2 mb-2 font-semibold">{title}</h2>
        {description && (
          <p className="text-body-2 text-label-normal mb-5">{description}</p>
        )}
        <div className="mt-6 flex justify-end gap-3">
          <button
            className="text-body-2 rounded-md border border-gray-200 bg-white px-4 py-2 font-medium hover:bg-gray-50"
            onClick={onClose}
          >
            {cancelLabel}
          </button>
          <button
            className={cn(
              "text-body-2 text-common-100 rounded-md px-4 py-2 font-medium",
              variant === "destructive"
                ? "bg-pink-500 hover:bg-pink-600"
                : "bg-primary hover:bg-primary-strong",
            )}
            onClick={() => {
              onConfirm();
              onClose();
            }}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </dialog>
  );
};
