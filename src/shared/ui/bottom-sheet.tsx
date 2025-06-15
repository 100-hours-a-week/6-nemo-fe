// src/shared/ui/bottom-sheet.tsx
"use client";

import { cn } from "lib/utils";
import { useRef } from "react";
import { createPortal } from "react-dom";

type BottomSheetItem = {
  id: string;
  label: string;
  onClick: () => void;
  variant?: "default" | "destructive";
};

type Props = {
  isOpen: boolean;
  onClose: () => void;
  items?: BottomSheetItem[];
};

export const BottomSheet = ({ isOpen, onClose, items }: Props) => {
  const sheetRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      {/* 배경 오버레이 - 클릭 시 닫기 */}
      <div className="absolute inset-0 bg-black opacity-30" onClick={onClose} />

      {/* 바텀시트 */}
      <div
        ref={sheetRef}
        className={cn(
          "relative w-full max-w-[430px] transform transition-transform duration-300 ease-out",
          isOpen ? "translate-y-0" : "translate-y-full"
        )}
        onClick={(e) => e.stopPropagation()} // 바텀시트 클릭 시 이벤트 전파 중단
      >
        <div className="bg-common-100 rounded-t-2xl px-4 py-6 shadow-lg">
          {/* 메뉴 아이템들 */}
          {items && items.length > 0 && (
            <div className="rounded-ctn-md mb-4 space-y-1 bg-gray-50">
              {items.map((item, index) => (
                <button
                  key={`${index}-${item.id}`}
                  onClick={() => {
                    item.onClick();
                    onClose();
                  }}
                  className={cn(
                    "flex w-full items-center justify-center rounded-lg px-4 py-4 text-center transition-colors",
                    "hover:bg-gray-100 active:bg-gray-200",
                    item.variant === "destructive"
                      ? "text-red-500 hover:bg-red-50 active:bg-red-100"
                      : "text-label-assistive"
                  )}
                >
                  <span className="text-body-1 font-medium">{item.label}</span>
                </button>
              ))}
            </div>
          )}

          <div className="rounded-ctn-md bg-gray-50">
            <button
              onClick={onClose}
              className="flex w-full items-center justify-center rounded-lg py-3 text-center transition-colors hover:bg-gray-100 active:bg-gray-200"
            >
              <span className="text-body-1 text-label-assistive font-medium">
                닫기
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.getElementById("modal-root") as HTMLElement
  );
};
