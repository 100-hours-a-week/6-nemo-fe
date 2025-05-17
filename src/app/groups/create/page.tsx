"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { AddressSearch } from "@/features/schedule/ui/address-search";
import { AddressData } from "@/features/schedule/model/types";
import BackButton from "@/shared/ui/back-button";
import { ProgressBar } from "@/shared/ui/progress-bar";
import { Button } from "@/shared/ui/button";
import { cn } from "lib/utils";
import { CATEGORIES } from "@/features/category/category-filter/model/constants";
import { GeneratedGroupData } from "@/entities/group";
import { createGroupInfo } from "@/entities/group/api/create-group-info";

// 모임 기간 옵션
const PERIOD_OPTIONS = [
  { id: "LESS_THAN_1_MONTH", label: "1개월 이하" },
  { id: "ONE_TO_THREE_MONTHS", label: "1~3개월" },
  { id: "THREE_TO_SIX_MONTHS", label: "3~6개월" },
  { id: "SIX_TO_TWELVE_MONTHS", label: "6~12개월" },
  { id: "MORE_THAN_1_YEAR", label: "1년 이상" },
];

export default function Page() {
  const router = useRouter();

  // 단계 상태
  const [currentStep, setCurrentStep] = useState(1);
  const [progress, setProgress] = useState(0);

  // 모임 생성을 위한 유저 입력 정보 (총 7단계: 모임이름, 목표, 카테고리, 주소, 기간, 최대인원, 계획생성여부)
  const [name, setName] = useState(""); // 1단계: 이름
  const [goal, setGoal] = useState(""); // 2단계: 목표
  const [category, setCategory] = useState(""); // 3단계: 카테고리
  const [addressData, setAddressData] = useState<AddressData>({
    // 4단계: 주소
    zonecode: "",
    address: "",
    detailAddress: "",
    extraAddress: "",
  });
  const [period, setPeriod] = useState(""); // 5단계: 기간
  const [maxUserCount, setMaxUserCount] = useState<number>(10); // 6단계: 최대 인원 수
  const [isIncludePlan, setIsIncludePlan] = useState(false); // 7단계: 계획

  // 생성된 모임 데이터와 로딩 상태
  const [generatedGroup, setGeneratedGroup] =
    useState<GeneratedGroupData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // 수정 상태
  const [editedGroupData, setEditedGroupData] =
    useState<GeneratedGroupData | null>(null);

  // 입력 유효성 검사
  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return name.length > 0 && name.length <= 64;
      case 2:
        return goal.length > 0 && goal.length <= 256;
      case 3:
        return category.length > 0;
      case 4:
        return addressData.address.length > 0;
      case 5:
        return period.length > 0;
      case 6:
        return maxUserCount > 0 && maxUserCount <= 100;
      case 7:
        return true;
      default:
        return false;
    }
  };

  // 진행률 계산
  useEffect(() => {
    setProgress((currentStep / 7) * 100);
  }, [currentStep]);

  // 다음 단계로 이동
  const handleNextStep = () => {
    if (currentStep < 7) {
      setCurrentStep(currentStep + 1);
    } else if (currentStep === 7) {
      handleSubmit();
    }
  };

  // 이전 단계로 이동
  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  // 모임 생성 요청
  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      setError("");

      const groupData = {
        name: name,
        goal: goal,
        category: category,
        location: `${addressData.address} ${addressData.detailAddress}`.trim(),
        period,
        maxUserCount: maxUserCount,
        isPlanCreated: isIncludePlan,
      };

      const groupInfo = await createGroupInfo(groupData);

      setGeneratedGroup(groupInfo);
      setEditedGroupData(groupInfo);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "모임 생성 중 오류가 발생했습니다.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  // 수정된 모임 정보 저장
  const handleUpdateGroup = () => {
    if (editedGroupData) {
      // 여기서 수정된 정보를 저장하는 API 호출을 구현할 수 있습니다.
      // 현재는 구현 생략
      router.push(`/groups`);
    }
  };

  // 각 단계별 렌더링
  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="mt-6 space-y-6">
            <h2 className="text-heading-1 font-semibold">
              모임명을 입력해주세요
            </h2>
            <p className="text-body-2 text-label-normal">
              모임의 특성이 잘 드러나는 이름을 지어주세요. (최대 64자)
            </p>
            <div className="mt-8">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                maxLength={64}
                placeholder="모임명을 입력해주세요"
                className="text-heading-2 focus:border-primary w-full border-b border-gray-300 bg-transparent p-2 outline-none"
              />
              <p className="text-caption-1 mt-2 text-right text-gray-500">
                {name.length}/64
              </p>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="mt-6 space-y-6">
            <h2 className="text-heading-1 font-semibold">
              모임의 목표는 무엇인가요?
            </h2>
            <p className="text-body-2 text-label-normal">
              이 모임을 통해 이루고자 하는 목표를 알려주세요. (최대 256자)
            </p>
            <div className="mt-8">
              <textarea
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                maxLength={256}
                placeholder="모임의 목표를 입력해주세요"
                className="focus:border-primary h-40 w-full resize-none rounded-md bg-gray-50 p-4 outline-none"
              />
              <p className="text-caption-1 mt-2 text-right text-gray-500">
                {goal.length}/256
              </p>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="mt-6 space-y-6">
            <h2 className="text-heading-1 font-semibold">
              모임의 카테고리를 선택해주세요
            </h2>
            <p className="text-body-2 text-label-normal">
              모임의 성격에 가장 잘 맞는 카테고리를 선택해주세요.
            </p>
            <div className="mt-8 grid grid-cols-3 gap-4">
              {CATEGORIES.filter((cat) => cat.id !== "ALL").map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setCategory(cat.label)}
                  className={cn(
                    "rounded-ctn-sm flex flex-col items-center justify-center p-4 transition-all",
                    category === cat.label
                      ? "bg-primary-light text-primary shadow-sm"
                      : "bg-gray-50 text-gray-600 hover:bg-gray-100",
                  )}
                >
                  <Image
                    src={cat.icon}
                    alt={cat.label}
                    width={32}
                    height={32}
                    className="mb-2"
                  />
                  <span className="text-label-1">{cat.label}</span>
                </button>
              ))}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="mt-6 space-y-6">
            <h2 className="text-heading-1 font-semibold">
              모임은 어디서 진행되나요?
            </h2>
            <p className="text-body-2 text-label-normal">
              모임이 주로 이루어는 지역을 선택해주세요.
            </p>
            <div className="mt-8">
              <AddressSearch onComplete={setAddressData} />
            </div>
          </div>
        );

      case 5:
        return (
          <div className="mt-6 space-y-6">
            <h2 className="text-heading-1 font-semibold">
              모임 기간은 얼마나 되나요?
            </h2>
            <p className="text-body-2 text-label-normal">
              모임이 진행될 예상 기간을 선택해주세요.
            </p>
            <div className="mt-8 flex flex-col gap-3">
              {PERIOD_OPTIONS.map((option) => (
                <button
                  key={option.id}
                  onClick={() => setPeriod(option.label)}
                  className={cn(
                    "rounded-lg border p-4 text-left transition-all",
                    period === option.label
                      ? "border-primary bg-primary-light"
                      : "border-gray-200 hover:bg-gray-50",
                  )}
                >
                  <span
                    className={
                      period === option.label ? "text-primary font-medium" : ""
                    }
                  >
                    {option.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        );

      case 6:
        return (
          <div className="mt-6 space-y-6">
            <h2 className="text-heading-1 font-semibold">
              모임의 최대 인원 수는 몇 명인가요?
            </h2>
            <p className="text-body-2 text-label-normal">
              모임에 참여할 수 있는 최대 인원 수를 선택해주세요. (최대 100명)
            </p>

            <div className="mt-12 space-y-8">
              {/* 슬라이더 컴포넌트 */}
              <div className="px-2">
                <input
                  type="range"
                  min="1"
                  max="100"
                  value={maxUserCount}
                  onChange={(e) => setMaxUserCount(parseInt(e.target.value))}
                  className="bg-primary h-2 w-full appearance-none rounded-lg"
                  style={{
                    background: `linear-gradient(to right, #55CBB9 0%, #55CBB9 ${maxUserCount}%, #E7E6EB ${maxUserCount}%, #E7E6EB 100%)`,
                  }}
                />

                {/* 슬라이더 값 표시 */}
                <div className="mt-6 flex justify-between px-2">
                  <span className="text-caption-1 text-gray-500">1명</span>
                  <span className="text-caption-1 text-gray-500">50명</span>
                  <span className="text-caption-1 text-gray-500">100명</span>
                </div>
              </div>

              {/* 직접 입력 */}
              <div className="mt-4">
                <div className="flex items-center">
                  <input
                    type="number"
                    min="1"
                    max="100"
                    value={maxUserCount}
                    onChange={(e) => {
                      const value = parseInt(e.target.value);
                      if (!isNaN(value) && value >= 1) {
                        setMaxUserCount(value);
                      } else if (e.target.value === "") {
                        setMaxUserCount(10); // 빈 값일 경우 기본값
                      }
                    }}
                    onBlur={(e) => {
                      const value = parseInt(e.target.value);
                      if (value > 100) {
                        setMaxUserCount(100); // 100을 초과하면 최대값인 100으로 제한
                      }
                    }}
                    className="text-body-1 focus:border-primary w-full rounded-md border border-gray-300 p-3 text-center outline-none"
                  />
                  <span className="text-body-1 ml-2">명</span>
                </div>
              </div>
            </div>
          </div>
        );

      case 7:
        return (
          <div className="mt-6 space-y-6">
            <h2 className="text-heading-1 font-semibold">
              단계별 계획을 자동으로 생성할까요?
            </h2>
            <p className="text-body-2 text-label-normal">
              AI가 입력하신 정보를 바탕으로 모임 일정과 단계별 계획을 자동으로
              생성해 드립니다.
            </p>
            <div className="mt-8 flex flex-col gap-4">
              <button
                onClick={() => setIsIncludePlan(true)}
                className={cn(
                  "rounded-lg border p-4 text-left transition-all",
                  isIncludePlan === true
                    ? "border-primary bg-primary-light"
                    : "border-gray-200 hover:bg-gray-50",
                )}
              >
                <span
                  className={
                    isIncludePlan === true ? "text-primary font-medium" : ""
                  }
                >
                  예, 계획을 생성해 주세요
                </span>
              </button>
              <button
                onClick={() => setIsIncludePlan(false)}
                className={cn(
                  "rounded-lg border p-4 text-left transition-all",
                  isIncludePlan === false
                    ? "border-primary bg-primary-light"
                    : "border-gray-200 hover:bg-gray-50",
                )}
              >
                <span
                  className={
                    isIncludePlan === false ? "text-primary font-medium" : ""
                  }
                >
                  아니요, 나중에 직접 만들겠습니다
                </span>
              </button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  // 생성된 모임 정보 편집 화면
  const renderGeneratedGroup = () => {
    if (!editedGroupData) return null;

    return (
      <div className="p-ctn-lg space-y-6">
        <h2 className="text-title-3 border-primary border-l-4 pl-2 font-semibold">
          생성된 모임 정보
        </h2>

        <div className="space-y-6">
          <div>
            <label className="text-body-2 text-label-normal mb-1 block">
              모임명
            </label>
            <input
              type="text"
              value={editedGroupData.name}
              maxLength={64}
              onChange={(e) =>
                setEditedGroupData({ ...editedGroupData, name: e.target.value })
              }
              className="text-body-1 focus:border-primary w-full rounded-md border border-gray-300 p-2 outline-none"
            />
          </div>

          <div>
            <label className="text-body-2 text-label-normal mb-1 block">
              최대 인원 수
            </label>
            <input
              type="number"
              value={editedGroupData.maxUserCount}
              onChange={(e) => {
                const value = parseInt(e.target.value);
                if (!isNaN(value) && value >= 1) {
                  setEditedGroupData({
                    ...editedGroupData,
                    maxUserCount: value,
                  });
                } else if (e.target.value === "") {
                  setEditedGroupData({
                    ...editedGroupData,
                    maxUserCount: 10, // 빈 값일 경우 기본값
                  });
                }
              }}
              onBlur={(e) => {
                const value = parseInt(e.target.value);
                if (value > 100) {
                  setEditedGroupData({
                    ...editedGroupData,
                    maxUserCount: 100, // 100을 초과하면 최대값인 100으로 제한
                  });
                }
              }}
              min="1"
              max="100"
              className="text-body-1 focus:border-primary w-full rounded-md border border-gray-300 p-2 outline-none"
            />
          </div>

          <div>
            <label className="text-body-2 text-label-normal mb-1 block">
              한 줄 소개
            </label>
            <textarea
              value={editedGroupData.summary.replace(/\\n/g, "\n")}
              onChange={(e) =>
                setEditedGroupData({
                  ...editedGroupData,
                  summary: e.target.value.replace(/\n/g, "\\n"),
                })
              }
              className="text-body-1 focus:border-primary h-16 w-full rounded-md border border-gray-300 p-2 outline-none"
            />
          </div>

          <div>
            <label className="text-body-2 text-label-normal mb-1 block">
              상세 설명
            </label>
            <textarea
              value={editedGroupData.description.replace(/\\n/g, "\n")}
              onChange={(e) =>
                setEditedGroupData({
                  ...editedGroupData,
                  description: e.target.value.replace(/\n/g, "\\n"),
                })
              }
              className="text-body-1 focus:border-primary h-48 w-full rounded-md border border-gray-300 p-2 outline-none"
            />
          </div>

          <div>
            <label className="text-body-2 text-label-normal mb-1 block">
              태그
            </label>
            <div className="flex flex-wrap gap-2">
              {editedGroupData.tags.map((tag, index) => (
                <div
                  key={index}
                  className="bg-strong flex items-center rounded-full px-3 py-1"
                >
                  <span className="text-label-1 text-label-assistive">
                    # {tag}
                  </span>
                  <button
                    className="ml-2 text-gray-500"
                    onClick={() => {
                      const newTags = [...editedGroupData.tags];
                      newTags.splice(index, 1);
                      setEditedGroupData({ ...editedGroupData, tags: newTags });
                    }}
                  >
                    ×
                  </button>
                </div>
              ))}
              <input
                type="text"
                placeholder="새 태그 추가"
                className="text-body-2 w-26 rounded-full border border-gray-300 px-3 py-1 outline-none"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && e.currentTarget.value.trim()) {
                    setEditedGroupData({
                      ...editedGroupData,
                      tags: [
                        ...editedGroupData.tags,
                        e.currentTarget.value.trim(),
                      ],
                    });
                    e.currentTarget.value = "";
                  }
                }}
              />
            </div>
          </div>

          {editedGroupData.plan && (
            <div>
              <label className="text-body-2 text-label-normal mb-1 block">
                단계별 계획
              </label>
              <textarea
                value={editedGroupData.plan.replace(/\\n/g, "\n")}
                onChange={(e) =>
                  setEditedGroupData({
                    ...editedGroupData,
                    plan: e.target.value.replace(/\n/g, "\\n"),
                  })
                }
                className="text-body-1 focus:border-primary h-64 w-full rounded-md border border-gray-300 p-2 outline-none"
              />
            </div>
          )}
        </div>

        <div className="pt-6">
          <Button
            onClick={handleUpdateGroup}
            className="bg-primary w-full py-5 text-center font-medium text-white"
          >
            모임 생성 완료
          </Button>
        </div>
      </div>
    );
  };

  // 로딩 화면
  if (isLoading) {
    return (
      <div className="flex h-screen flex-col items-center justify-center">
        <div className="border-primary h-12 w-12 animate-spin rounded-full border-4 border-t-transparent"></div>
        <p className="text-body-1 mt-4">모임 정보를 생성 중...</p>
      </div>
    );
  }

  // 에러 화면
  if (error) {
    return (
      <div className="p-ctn-lg flex h-screen flex-col items-center justify-center">
        <p className="text-body-1 text-error mb-4">{error}</p>
        <Button
          onClick={() => {
            setError("");
            setCurrentStep(1);
          }}
          className="bg-primary text-common-100 rounded-full px-6 py-2"
        >
          다시 시도하기
        </Button>
      </div>
    );
  }

  // 생성된 모임 정보가 있으면 수정 화면 표시
  if (generatedGroup) {
    return (
      <div className="bg-common-100 min-h-screen">
        {/* 헤더 */}
        <header className="bg-common-100 sticky top-0 z-10 flex h-14 items-center justify-between border-b border-gray-200 px-4">
          <BackButton />
          <h1 className="text-headline-1 font-semibold">모임 정보 확인</h1>
          <div className="w-8"></div>
        </header>

        {renderGeneratedGroup()}
      </div>
    );
  }

  // 단계별 입력 화면
  return (
    <div className="bg-common-100 min-h-screen pb-24">
      {/* 헤더 */}
      <header className="bg-common-100 sticky top-0 z-10 flex h-14 items-center justify-between border-b border-gray-200 px-4">
        <BackButton />
        <h1 className="text-headline-1 font-semibold">모임 만들기</h1>
        <div className="w-8"></div>
      </header>

      {/* 진행 상태 표시 */}
      <div className="px-4 pt-4">
        <ProgressBar value={progress} />
        {/* <p className="text-caption-1 text-label-normal mt-1 text-right">
          {currentStep}/7
        </p> */}
      </div>

      {/* 단계별 컨텐츠 */}
      <div className="p-ctn-lg">{renderStep()}</div>

      {/* 하단 버튼 */}
      <div className="bg-common-100 fixed right-0 bottom-0 left-0 mx-auto w-full max-w-[430px] p-4">
        <div className="flex gap-3">
          {currentStep > 1 && (
            <Button
              onClick={handlePrevStep}
              className="flex-1 border border-gray-200 bg-white py-5 font-medium text-gray-600"
              variant="outline"
            >
              이전
            </Button>
          )}
          <Button
            onClick={handleNextStep}
            disabled={!isStepValid()}
            className={`flex-1 py-5 font-medium ${
              isStepValid()
                ? "bg-primary text-white"
                : "bg-gray-300 text-gray-600"
            }`}
          >
            {currentStep < 7 ? "다음" : "완료"}
          </Button>
        </div>
      </div>
    </div>
  );
}
