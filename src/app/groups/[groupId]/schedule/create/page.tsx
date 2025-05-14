// src/app/groups/[groupId]/schedules/create/page.tsx
"use client";

import { useState, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import DateTimePicker from "@/features/schedule/ui/date-time-picker";
import BackButton from "@/shared/ui/back-button";
import { AddressData } from "@/features/schedule/model/types";
import { useCreateSchedule } from "@/entities/schdule";
import { AddressSearch } from "@/features/schedule/ui/address-search";
import Image from "next/image";
import { calendar_icon, location2_icon } from "@/shared/assets/images";

export default function CreateSchedulePage() {
  const params = useParams();
  const router = useRouter();
  const groupId = Number(params.groupId);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [addressData, setAddressData] = useState<AddressData>({
    zonecode: "",
    address: "",
    detailAddress: "",
    extraAddress: "",
  });
  const [startAt, setStartAt] = useState("");
  const [showAddressSearch, setShowAddressSearch] = useState(false);

  const createMutation = useCreateSchedule();

  const handleAddressComplete = (data: AddressData) => {
    setAddressData(data);
    setShowAddressSearch(false);
  };

  console.log(
    title,
    description,
    addressData.address,
    addressData.detailAddress,
    startAt,
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await createMutation.mutateAsync({
        groupId,
        title,
        description,
        address: addressData.address,
        addressDetail: addressData.detailAddress,
        startAt,
      });

      // 성공 후 일정 상세 페이지나 목록으로 이동
      router.push(`/groups/${groupId}`);
    } catch (error) {
      console.error("일정 생성 중 오류 발생:", error);
    }
  };

  return (
    <div className="bg-common-100 min-h-screen">
      {/* 헤더 */}
      <header className="bg-common-100 flex h-14 items-center border-b border-gray-200 px-4">
        <BackButton />
        <h1 className="text-headline-1 mx-auto font-semibold">일정 만들기</h1>
        <div className="w-8"></div>
      </header>

      {/* 폼 */}
      <form
        onSubmit={handleSubmit}
        className="p-ctn-lg flex h-[calc(100vh-56px)] flex-col"
      >
        <div className="flex-grow space-y-6">
          {/* 일정 제목 */}
          <div>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="멤버들과 어떤 활동을 할까요?"
              className="text-heading-2 w-full border-b border-gray-200 bg-transparent px-1 py-2 placeholder-gray-500 outline-none"
            />
          </div>

          {/* 아이콘과 필드들 */}
          <div className="space-y-4">
            {/* 날짜 및 시간 */}
            <div className="flex items-start border-b border-gray-200 py-4">
              <div className="mt-1 flex h-10 w-12 items-center justify-center">
                <Image src={calendar_icon} alt="날짜" width={24} height={24} />
              </div>
              <div className="ml-2 flex-grow">
                <p className="text-body-2 mb-1 text-gray-600">날짜 및 시간</p>
                <DateTimePicker dateTime={startAt} setDateTime={setStartAt} />
              </div>
            </div>

            {/* 장소 - 클릭 시 AddressSearch 표시 */}
            <div className="flex items-start border-b border-gray-200 py-4">
              <div className="mt-1 flex h-10 w-12 items-center justify-center">
                <Image src={location2_icon} alt="위치" width={28} height={28} />
              </div>
              <AddressSearch onComplete={setAddressData} />
            </div>
          </div>

          {/* 활동 설명 */}
          <div className="mt-4">
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="활동에 대한 설명을 추가해주세요."
              className="h-48 w-full resize-none rounded-md bg-gray-50 px-4 py-3 placeholder-gray-500 outline-none"
              required
            ></textarea>
          </div>
        </div>

        {/* 제출 버튼 */}
        <div className="bg-common-100 sticky right-0 bottom-0 left-0 pt-4 pb-6">
          <button
            type="submit"
            className={`w-full rounded-md py-3 text-center font-medium ${
              createMutation.isPending ||
              !title ||
              !startAt ||
              !addressData.address ||
              !description
                ? "bg-gray-300 text-gray-600"
                : "bg-primary text-common-100"
            }`}
            disabled={
              createMutation.isPending ||
              !title ||
              !startAt ||
              !addressData.address ||
              !description
            }
          >
            {createMutation.isPending ? "생성 중..." : "다음"}
          </button>
        </div>
      </form>

      {/* 에러 메시지 */}
      {createMutation.isError && (
        <div className="text-error bg-error-container fixed right-0 bottom-20 left-0 mx-auto max-w-[calc(430px-2rem)] rounded-md p-3 text-center">
          일정 생성에 실패했습니다. 다시 시도해주세요.
        </div>
      )}

      {/* AddressSearch 모달 */}
      {showAddressSearch && (
        <div className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black">
          <div className="bg-common-100 w-full max-w-md rounded-lg p-4">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-headline-1 font-medium">주소 검색</h3>
              <button
                type="button"
                onClick={() => setShowAddressSearch(false)}
                className="text-gray-500"
              >
                ✕
              </button>
            </div>
            <AddressSearch onComplete={handleAddressComplete} />
          </div>
        </div>
      )}
    </div>
  );
}
