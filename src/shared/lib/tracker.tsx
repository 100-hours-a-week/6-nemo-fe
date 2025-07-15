"use client";

import { useEffect } from "react";
import {
  GAgroupAction,
  GAPageTracking,
  GAscheduleAction,
  GAuserAction,
  trackEvent,
} from "./analytics";

// 페이지 진입 및 이탈률 측정
export const PageTracker = ({ pagename }: { pagename: string }) => {
  useEffect(() => {
    GAPageTracking(`${pagename}_page`, "enter");
    return () => GAPageTracking(`${pagename}_page`, "exit");
  });

  return null;
};

// 모임 매력도 측정 (방문 대비 가입률) & 인기 모임 조회수
export const GroupPageTracker = ({ groupId }: { groupId: string | number }) => {
  useEffect(() => {
    GAuserAction("group_detail_view", groupId);
    GAgroupAction("detail_view", groupId);
  }, [groupId]);

  return <PageTracker pagename="group_details" />;
};

// 일정 응답률 측정
export const SchedulePageTracker = ({
  scheduleId,
}: {
  scheduleId: string | number;
}) => {
  useEffect(() => {
    GAscheduleAction("detail_view", scheduleId.toString());
  }, [scheduleId]);

  return <PageTracker pagename="schedule_details" />;
};

export const PageTimeTracker = ({ pagename }: { pagename: string }) => {
  let pageEnterTime: number;

  useEffect(() => {
    // 페이지 진입 시간 기록
    pageEnterTime = Date.now();

    return () => {
      // 페이지 이탈 시 체류 시간 계산
      const timeSpent = Math.round((Date.now() - pageEnterTime) / 1000);
      trackEvent(`${pagename}_page_duration`, {
        duration_seconds: timeSpent,
      });
    };
  }, []);

  return null;
};
