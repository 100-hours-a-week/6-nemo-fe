import {
    ai_active_icon,
    ai_icon,
    dashboard_active_icon,
    dashboard_icon,
    home_active_icon,
    home_icon,
    magnifying_glass_active_icon,
    magnifying_glass_icon,
    profile_active_icon,
    profile_icon,
} from "@/shared/assets/images";
import { BottomNavigationItemProps } from "./types";


export const TAB_NAVIGATION_ITEMS: BottomNavigationItemProps[] = [
    {
        href: '/home',
        activeIcon: home_active_icon,
        inactiveIcon: home_icon,
        label: '홈',
    },
    {
        href: '/groups',
        activeIcon: magnifying_glass_active_icon,
        inactiveIcon: magnifying_glass_icon,
        label: '검색',
    },
    {
        href: '/chatbot',
        activeIcon: ai_active_icon,
        inactiveIcon: ai_icon,
        label: '챗봇',
    },
    {
        href: '/my-nemo',
        activeIcon: dashboard_active_icon,
        inactiveIcon: dashboard_icon,
        label: '나의네모',
    },
    {
        href: '/profile',
        activeIcon: profile_active_icon,
        inactiveIcon: profile_icon,
        label: '프로필',
    },
];