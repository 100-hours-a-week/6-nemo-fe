import { GroupCard } from "@/entities/group";
import groupDetailData from "mocks/groupDetail.json";

export default function SearchPage() {
  return (
    <div className="p-ctn-md space-y-2">
      <GroupCard group={groupDetailData} />
      <GroupCard group={groupDetailData} />
      {/* <GroupCard group={groupDetailData} />
      <GroupCard group={groupDetailData} /> */}
    </div>
  );
}
