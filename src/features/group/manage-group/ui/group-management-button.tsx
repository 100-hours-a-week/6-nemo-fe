"use client";

import { Role } from "@/entities/group";
import { more_icon } from "@/shared/assets/images";
import Image from "next/image";
import { useState } from "react";
import { RenderMenuItemsByRole } from "./render-menu-items-by-role";

type Props = {
  groupId: string;
  groupName: string;
  role: Role;
};

export const GroupManagementButton = ({ groupId, groupName, role }: Props) => {
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

  const handleCloseBottomSheet = () => {
    setIsBottomSheetOpen(false);
  };

  // 모임원이 아니거나 비로그인이면 버튼 노출되지 않음.
  if (role === "NON_MEMBER" || role === "GUEST") return null;

  return (
    <>
      <button
        onClick={() => setIsBottomSheetOpen(true)}
        className="flex h-8 w-8 items-center justify-center rounded-full transition hover:scale-110 hover:opacity-50"
      >
        <Image src={more_icon} alt="더보기" width={20} height={20} />
      </button>

      {/* 커스텀 BottomSheet */}
      {isBottomSheetOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center">
          {/* 배경 오버레이 - 클릭 시 닫기 */}
          <div
            className="absolute inset-0 bg-black opacity-30"
            onClick={handleCloseBottomSheet}
          />

          {/* 바텀시트 */}
          <div
            className="relative w-full max-w-[430px] translate-y-0 transform transition-transform duration-300 ease-out"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-common-100 rounded-t-2xl px-4 py-6 shadow-lg">
              {/* 메뉴 아이템들 */}
              <div className="rounded-ctn-md mb-4 space-y-1 bg-gray-50">
                <RenderMenuItemsByRole
                  groupId={groupId}
                  groupName={groupName}
                  role={role}
                  onSuccess={handleCloseBottomSheet}
                />
              </div>

              {/* 닫기 버튼 */}
              <div className="rounded-ctn-md bg-gray-50">
                <button
                  onClick={handleCloseBottomSheet}
                  className="flex w-full items-center justify-center rounded-lg py-3 text-center transition-colors hover:bg-gray-100 active:bg-gray-200"
                >
                  <span className="text-body-1 text-label-assistive font-medium">
                    닫기
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
