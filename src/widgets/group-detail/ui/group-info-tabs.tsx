import { GroupInfoTabsProps } from "../model/types";

export const GroupInfoTabs = ({
  activeTab,
  onTabChange,
}: GroupInfoTabsProps) => {
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
