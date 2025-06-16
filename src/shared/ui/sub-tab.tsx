"use client";

import { usePathname, useRouter } from "next/navigation";

type Props = {
  tabs: { id: string; label: string }[];
  activeTab: string;
};

export const SubTab = ({ tabs, activeTab }: Props) => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className="border-b border-gray-200">
      <div className="flex">
        {tabs.map((tabItem) => (
          <button
            key={tabItem.id}
            className={`flex-1 border-b-2 py-3 text-center ${
              tabItem.id === activeTab
                ? "border-primary text-primary font-semibold"
                : "border-transparent text-gray-500"
            }`}
            onClick={() =>
              router.replace(`${pathname}?tab=${tabItem.id}`, { scroll: false })
            }
            disabled={tabItem.id === activeTab}
          >
            {tabItem.label}
          </button>
        ))}
      </div>
    </div>
  );
};
