export type SwitchGroupToScheduleTabsProps = {
    activeTab: "my-nemo" | "my-schedule";
    onTabChange: (tab: "my-nemo" | "my-schedule") => void;
};