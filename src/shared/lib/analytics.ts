'use client'

import { sendGAEvent } from '@next/third-parties/google';

export const trackEvent = (
    eventName: string,
    parameters?: Record<string, any>
) => {
    if (process.env.NODE_ENV === 'development') {
        console.log('GA Event:', eventName, parameters);
        return;
    }

    sendGAEvent('event', eventName, parameters || {});
};

// 버튼 클릭 액션
export const GAbuttonClick = (buttonName: string, location?: string) => {
    trackEvent('button_click', {
        button_name: buttonName,
        location: location,
    });
};

// 모임 도메인 액션 
export const GAgroupAction = (action: string, groupId?: string | number) => {
    trackEvent('group_action', {
        action: action,
        group_id: groupId,
    });
};

// 일정 도메인 액션 
export const GAscheduleAction = (action: string, scheduleId?: string) => {
    trackEvent('schedule_action', {
        action: action,
        schedule_id: scheduleId,
    });
};

// 사용자 액션 
export const GAuserAction = (action: string, details?: string | number) => {
    trackEvent('user_action', {
        action: action,
        details: details,
    });
};

// 검색 도메인 액션
export const GAsearchAction = (searchTerm: string) => {
    trackEvent('search', {
        search_term: searchTerm,
    });
};

// 에러 발생 추적
export const GAerrorTracking = (errorType: string, error?: Error, errorContext?: string) => {
    trackEvent('error_occurred', {
        error_type: errorType,
        error_message: error?.message?.substring(0, 100),
        error_context: errorContext,
        timestamp: Date.now(),
        user_agent: navigator.userAgent,
        page_url: typeof window !== 'undefined' ? window.location.pathname : undefined
    });
};

// 페이지 추적
export const GAPageTracking = (pageName: string, action: 'enter' | 'exit') => {
    trackEvent(`page_${action}`, {
        page_name: pageName,
        timestamp: Date.now()
    });
};
