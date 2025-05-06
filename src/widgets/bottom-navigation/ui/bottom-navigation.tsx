import { cn } from "lib/utils";
import { BottomNavigationProps } from "../model/types";
import { TAB_NAVIGATION_ITEMS } from "../model/constants";
import { BottomNavigationItem } from "./bottom-navigation-item";

export const BottomNavigation = ({ className }: BottomNavigationProps) => {
  return (
    <nav
      className={cn(
        "bg-common-100 fixed right-0 bottom-0 left-0 mx-auto flex h-16 max-w-[430px] items-center justify-between border-t-1 px-1 pb-1",
        className,
      )}
    >
      {TAB_NAVIGATION_ITEMS.map((item) => (
        <BottomNavigationItem key={item.href} {...item} />
      ))}
    </nav>
  );
};
