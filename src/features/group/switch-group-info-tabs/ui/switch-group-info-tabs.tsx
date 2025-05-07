import { SwitchGroupInfoTabsProps } from "../model/types";

export const SwitchGroupInfoTabs = ({
  activeTab,
  onTabChange,
}: SwitchGroupInfoTabsProps) => {
  return (
    <div className="border-b border-gray-200">
      <div className="flex">
        <button
          className={`flex-1 border-b-2 py-3 text-center ${
            activeTab === "info"
              ? "border-primary text-primary font-semibold"
              : "border-transparent text-gray-500"
          }`}
          onClick={() => onTabChange("info")}
        >
          상세 정보
        </button>
        <button
          className={`flex-1 border-b-2 py-3 text-center ${
            activeTab === "schedule"
              ? "border-primary text-primary font-semibold"
              : "border-transparent text-gray-500"
          }`}
          onClick={() => onTabChange("schedule")}
        >
          일정
        </button>
      </div>
    </div>
  );
};
