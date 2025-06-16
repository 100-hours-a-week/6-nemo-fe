"use client";

import { useCreateSchedule } from "@/features/create-schedule";
import { AddressData } from "@/features/schedule/model/types";
import { AddressSearch } from "@/features/schedule/ui/address-search";
import DateTimePicker from "@/features/schedule/ui/date-time-picker";
import { calendar_icon, location2_icon } from "@/shared/assets/images";
import { BackButton } from "@/shared/ui";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

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

  const createScheduleMutation = useCreateSchedule();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const scheduleInfo = {
      groupId: groupId,
      title: title,
      description: description,
      address: addressData.address,
      addressDetail: addressData.detailAddress,
      startAt: startAt,
    };
    createScheduleMutation.mutate(scheduleInfo);

    router.push(`/groups/${groupId}?tab=schedule-list`);
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
              className="text-heading-2 focus:border-primary w-full border-b border-gray-200 bg-transparent px-1 py-2 placeholder-gray-500 outline-none"
              required
              autoFocus
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
              <div className="ml-2 flex-grow">
                <p className="text-body-2 mb-1 text-gray-600">모임 장소</p>
                <AddressSearch onComplete={setAddressData} />
              </div>
            </div>
          </div>

          {/* 활동 설명 */}
          <div className="mt-4">
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="활동에 대한 설명을 추가해주세요."
              className="focus:border-primary box-border h-48 w-full resize-none rounded-md border border-transparent bg-gray-50 px-4 py-3 placeholder-gray-500 outline-none"
              required
            ></textarea>
          </div>
        </div>

        {/* 제출 버튼 */}
        <div className="bg-common-100 sticky right-0 bottom-0 left-0 pt-4 pb-6">
          <button
            type="submit"
            className={`w-full rounded-md py-3 text-center font-medium ${
              createScheduleMutation.isPending ||
              !title ||
              !startAt ||
              !addressData.address ||
              !description
                ? "bg-gray-300 text-gray-600"
                : "bg-primary text-common-100"
            }`}
            disabled={
              createScheduleMutation.isPending ||
              !title ||
              !startAt ||
              !addressData.address ||
              !description
            }
          >
            {createScheduleMutation.isPending ? "생성 중..." : "다음"}
          </button>
        </div>
      </form>
    </div>
  );
}
