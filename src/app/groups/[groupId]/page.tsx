import { getGroupDetails, GroupMemberList, GroupPlan } from "@/entities/group";
import { JoinGroupButton } from "@/features/join-group/ui/join-group-button";
import { GROUP_DETAILS_TAB_ITEMS } from "@/shared/constants";
import { BackButton, SubTab } from "@/shared/ui";
import { GroupInfo } from "@/widgets/group-details";
import { ScheduleList } from "@/widgets/schdule-list";

type Props = {
  params: Promise<{ groupId: string }>;
  searchParams: Promise<{
    tab?: "detail-info" | "schedule-list";
  }>;
};

export default async function GroupDetailsPage({
  params,
  searchParams,
}: Props) {
  const { groupId } = await params;
  const groupDetails = await getGroupDetails(groupId);

  const { tab } = await searchParams;
  const activeTab = tab ?? "detail-info";

  return (
    <div className="bg-common-100 relative flex min-h-screen flex-col pb-24">
      <BackButton
        href="/groups"
        fill={true}
        className="absolute top-4 left-4 opacity-75"
      />
      {/* 모임 상세 헤더 */}
      <GroupInfo groupDetails={groupDetails} />

      {/* 탭 메뉴 */}
      <SubTab tabs={GROUP_DETAILS_TAB_ITEMS} activeTab={activeTab} />

      {/* 탭 내용 */}
      <div className="p-ctn-lg">
        {activeTab === "detail-info" && (
          <div className="mt-4 space-y-6">
            {/* 모임원 섹션 */}
            <section>
              <h3 className="text-heading-2 text-label-strong-2 mb-3 border-l-4 border-gray-700 pl-2 font-semibold">
                모임원
              </h3>
              <GroupMemberList groupId={groupId} />
            </section>

            {/* 모임 상세 소개 */}
            <section>
              <h3 className="text-heading-2 text-label-strong-2 mb-3 border-l-4 border-gray-700 pl-2 font-semibold">
                모임 상세 소개
              </h3>
              <div className="bg-common-100 rounded-md p-4 shadow-xs">
                <p className="text-body-1 text-label-assistive whitespace-pre-line">
                  {groupDetails.description}
                </p>
              </div>
            </section>

            {/* 단계별 계획 */}
            {groupDetails.plan && (
              <section>
                <h3 className="text-heading-2 text-label-strong-2 mb-3 border-l-4 border-gray-700 pl-2 font-semibold">
                  단계별 계획
                </h3>
                <GroupPlan plan={groupDetails.plan} />
              </section>
            )}
          </div>
        )}

        {activeTab === "schedule-list" && (
          <div className="py-4">
            <ScheduleList groupId={Number(groupId)} />
          </div>
        )}

        <JoinGroupButton
          groupId={groupId}
          groupName={groupDetails.name}
          role={groupDetails.role}
        />
      </div>
    </div>
  );
}
