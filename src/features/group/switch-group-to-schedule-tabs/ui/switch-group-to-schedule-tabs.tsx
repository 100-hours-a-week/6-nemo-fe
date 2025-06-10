import { SwitchGroupToScheduleTabsProps } from "../model/types";

export const SwitchGroupToScheduleTabs = ({
  activeTab,
  onTabChange,
}: SwitchGroupToScheduleTabsProps) => {
  return (
    <div className="border-b border-gray-200">
      <div className="flex">
        <button
          className={`flex-1 border-b-2 py-3 text-center ${
            activeTab === "my-nemo"
              ? "border-primary text-primary font-semibold"
              : "border-transparent text-gray-500"
          }`}
          onClick={() => onTabChange("my-nemo")}
        >
          나의 모임
        </button>
        <button
          className={`flex-1 border-b-2 py-3 text-center ${
            activeTab === "my-schedule"
              ? "border-primary text-primary font-semibold"
              : "border-transparent text-gray-500"
          }`}
          onClick={() => onTabChange("my-schedule")}
        >
          나의 일정
        </button>
      </div>
    </div>
  );
};
