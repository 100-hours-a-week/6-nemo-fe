"use client";

import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import {
  crown_yello,
  location_icon,
  more_icon,
  profile_icon,
  time_icon,
  user,
  users_icon,
} from "@/shared/assets/images";
import { ScheduleParticipant, useScheduleById } from "@/entities/schdule";
import BackButton from "@/shared/ui/back-button";
import { useUpdateScheduleParticipation } from "@/features/schedule/model/use-update-schedule-participation";

export default function ScheduleDetailPage() {
  const params = useParams();
  const router = useRouter();
  const scheduleId = Number(params.scheduleId);

  const { data: schedule, isLoading, error } = useScheduleById(scheduleId);

  const participationMutation = useUpdateScheduleParticipation(scheduleId);

  // 참여 상태 변경 핸들러 추가
  const handleParticipation = (status: "ACCEPTED" | "REJECTED") => {
    participationMutation.mutate(status, {
      onSuccess: () => {
        console.log("일정 참여 응답 완료"); // 추후 토스트 메세지 연결
      },
    });
  };

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="border-primary h-8 w-8 animate-spin rounded-full border-2 border-t-transparent" />
      </div>
    );
  }

  if (error || !schedule) {
    return (
      <div className="p-ctn-lg flex h-screen w-full flex-col items-center justify-center">
        <p className="text-body-1 text-label-normal mb-4">
          일정 정보를 불러올 수 없습니다.
        </p>
        <button
          onClick={() => router.back()}
          className="bg-primary text-common-100 rounded-full px-6 py-2"
        >
          이전 페이지로
        </button>
      </div>
    );
  }

  // 날짜 포맷팅
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    // 오전/오후 구분
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "오후" : "오전";
    const formattedHours = hours % 12 || 12;

    return {
      fullDate: `${year}년 ${month}월 ${day}일 ${ampm} ${formattedHours}:${minutes < 10 ? "0" + minutes : minutes}`,
      dayOnly: `${year}년 ${month}월 ${day}일`,
      timeOnly: `${ampm} ${formattedHours}:${minutes < 10 ? "0" + minutes : minutes}`,
    };
  };

  const eventDate = formatDate(schedule.startAt);
  const createdDate = formatDate(schedule.createdAt);

  // 참가자 상태별 분류
  const acceptedParticipants =
    schedule.participants?.filter((p) => p.status === "ACCEPTED") || [];
  const pendingParticipants =
    schedule.participants?.filter((p) => p.status === "PENDING") || [];
  const rejectedParticipants =
    schedule.participants?.filter((p) => p.status === "REJECTED") || [];

  return (
    <div className="bg-common-100 relative min-h-screen pb-24">
      {/* 상단 헤더 */}
      <header className="relative flex h-14 items-center justify-between border-gray-200 px-4">
        <BackButton />
        <h1 className="text-headline-1 font-semibold">{schedule.group.name}</h1>
        <button className="flex h-8 w-8 items-center justify-center rounded-full">
          <Image src={more_icon} alt="더보기" width={20} height={20} />
        </button>
      </header>

      <div className="p-ctn-lg">
        {/* 일정 제목 */}
        <div className="mb-8 flex items-center gap-2">
          {schedule.scheduleStatus === "RECRUITING" ? (
            <span className="text-label-2 text-primary-strong bg-primary-light rounded-ctn-md px-2 py-1 font-semibold">
              모집중
            </span>
          ) : (
            <span className="text-label-2 text-label-assistive bg-strong rounded-ctn-md px-2 py-1">
              종료
            </span>
          )}
          <h2 className="text-title-3 text-label-strong-1 font-bold">
            {schedule.title}
          </h2>
        </div>

        {/* 일정 정보 */}
        <div className="mb-12 space-y-4">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center">
              <Image src={users_icon} alt="위치" width={22} height={22} />
            </div>
            <p className="text-body-2 text-primary font-semibold">
              {schedule.participants.length}명 참여 중
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center">
              <Image src={time_icon} alt="날짜" width={18} height={18} />
            </div>
            <div>
              <p className="text-body-2 text-label-strong-2 font-semibold">
                {eventDate.dayOnly}
              </p>
              <p className="text-caption-1 text-label-normal">
                {eventDate.timeOnly}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center">
              <Image src={location_icon} alt="위치" width={22} height={22} />
            </div>
            <p className="text-body-2 text-label-strong-2 font-semibold">
              {schedule.address}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center">
              <Image src={profile_icon} alt="생성일" width={22} height={22} />
            </div>
            <div>
              <p className="text-body-2 text-label-strong-2 font-semibold">
                생성자: {schedule.ownerName}
              </p>
              <p className="text-caption-1 text-label-normal">
                생성일: {createdDate.fullDate}
              </p>
            </div>
          </div>
        </div>

        {/* 일정 설명 */}
        <div className="mb-8">
          <h3 className="text-heading-2 text-label-strong-2 mb-3 border-l-4 border-gray-700 pl-2 font-semibold">
            상세 내용
          </h3>
          <div className="bg-common-100 rounded-md p-4 shadow-xs">
            <p className="text-body-2 text-label-assistive whitespace-pre-line">
              {schedule.description}
            </p>
          </div>
        </div>

        {/* 참여자 현황 */}
        <div>
          <h3 className="text-heading-2 text-label-strong-2 mb-3 border-l-4 border-gray-700 pl-2 font-semibold">
            참여자 현황
          </h3>

          <div className="bg-common-100 rounded-md p-4 shadow-sm">
            {acceptedParticipants.length > 0 && (
              <div className="mb-4">
                <h4 className="text-body-1 text-label-assistive bg-primary-light mb-2 inline-block rounded-md px-2 py-1 font-semibold">
                  참여 ({acceptedParticipants.length}명)
                </h4>
                <div className="space-y-2">
                  {acceptedParticipants.map((participant) => (
                    <div
                      key={participant.id}
                      className="flex items-center justify-between py-2"
                    >
                      <div className="flex items-center gap-3">
                        <div className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-gray-200">
                          {participant.user.profileImageUrl ? (
                            <Image
                              src={participant.user.profileImageUrl}
                              alt={participant.user.nickname}
                              width={40}
                              height={40}
                              className="object-cover"
                            />
                          ) : (
                            <Image
                              src={user}
                              alt={participant.user.nickname}
                              width={40}
                              height={40}
                              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform"
                            />
                          )}
                        </div>
                        <span className="text-body-2 font-medium">
                          {participant.user.nickname}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {pendingParticipants.length > 0 && (
              <div className="mb-4">
                <h4 className="text-body-1 text-label-assistive mb-2 inline-block rounded-md bg-gray-100 px-2 py-1 font-semibold">
                  대기 ({pendingParticipants.length}명)
                </h4>
                <div className="space-y-2">
                  {pendingParticipants.map(
                    (participant: ScheduleParticipant) => (
                      <div
                        key={participant.id}
                        className="flex items-center justify-between py-2"
                      >
                        <div className="flex items-center gap-3">
                          <div className="relative h-10 w-10 overflow-hidden rounded-full bg-gray-200">
                            {participant.user.profileImageUrl ? (
                              <Image
                                src={participant.user.profileImageUrl}
                                alt={participant.user.nickname}
                                width={40}
                                height={40}
                                className="object-cover"
                              />
                            ) : (
                              <Image
                                src={user}
                                alt={participant.user.nickname}
                                width={40}
                                height={40}
                                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform"
                              />
                            )}
                          </div>
                          <span className="text-body-2 font-medium">
                            {participant.user.nickname}
                          </span>
                        </div>
                      </div>
                    ),
                  )}
                </div>
              </div>
            )}

            {rejectedParticipants.length > 0 && (
              <div>
                <h4 className="text-body-1 text-label-assistive mb-2 inline-block rounded-md bg-gray-100 px-2 py-1 font-semibold">
                  불참 ({rejectedParticipants.length}명)
                </h4>
                <div className="space-y-2">
                  {rejectedParticipants.map(
                    (participant: ScheduleParticipant) => (
                      <div
                        key={participant.id}
                        className="flex items-center justify-between py-2"
                      >
                        <div className="flex items-center gap-3">
                          <div className="relative h-10 w-10 overflow-hidden rounded-full bg-gray-200">
                            {participant.user.profileImageUrl ? (
                              <Image
                                src={participant.user.profileImageUrl}
                                alt={participant.user.nickname}
                                width={40}
                                height={40}
                                className="object-cover"
                              />
                            ) : (
                              <Image
                                src={user}
                                alt={participant.user.nickname}
                                width={40}
                                height={40}
                                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform"
                              />
                            )}
                          </div>
                          <span className="text-body-2 font-medium">
                            {participant.user.nickname}
                          </span>
                        </div>
                      </div>
                    ),
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 하단 참가 버튼 */}
      <div className="bg-common-100 fixed right-0 bottom-0 left-0 mx-auto w-full max-w-[430px] border-t border-gray-200 p-4">
        <div className="flex w-full gap-3">
          <button
            className="bg-primary text-common-100 rounded-ctn-sm flex-1 py-3 font-medium"
            onClick={() => handleParticipation("ACCEPTED")}
            disabled={participationMutation.isPending}
          >
            {participationMutation.isPending ? "처리 중..." : "참여하기"}
          </button>
          <button
            className="rounded-ctn-sm flex-1 bg-gray-200 py-3 font-medium text-gray-600"
            onClick={() => handleParticipation("REJECTED")}
            disabled={participationMutation.isPending}
          >
            {participationMutation.isPending ? "처리 중..." : "불참하기"}
          </button>
        </div>
      </div>

      {/* 에러 메시지 표시 */}
      {participationMutation.isError && (
        <div className="text-error bg-error-container fixed right-0 bottom-20 left-0 mx-auto max-w-[calc(430px-2rem)] rounded-md p-3 text-center">
          일정 참여 응답에 실패했습니다. <br />
          다시 시도해주세요.
        </div>
      )}
    </div>
  );
}
