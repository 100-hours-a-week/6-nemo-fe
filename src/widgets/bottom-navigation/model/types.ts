import { StaticImageData } from "next/image";

export type BottomNavigationItemProps = {
    href: string;
    activeIcon: StaticImageData,
    inactiveIcon: StaticImageData,
    label: string;
};

export type BottomNavigationProps = {
    className?: string;
};