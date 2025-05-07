export type SwitchGroupInfoTabsProps = {
    activeTab: "info" | "schedule";
    onTabChange: (tab: "info" | "schedule") => void;
};