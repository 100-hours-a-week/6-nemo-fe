import { Role } from "@/entities/group";
import { USER_ROLE_IN_GROUP } from "@/entities/group/model/constants";
import { DeleteGroupButton } from "@/features/group/delete-group";
import { LeaveGroupButton } from "@/features/group/leave-group";
import { UpdateGroupImageButton } from "@/features/group/update-group-image";
import { ManageMembersButton } from "../../manage-members";

type Props = {
  groupId: string;
  groupName: string;
  role: Role;
  onSuccess: () => void;
};

export const RenderMenuItemsByRole = ({
  groupId,
  groupName,
  role,
  onSuccess,
}: Props) => {
  if (role === USER_ROLE_IN_GROUP.LEADER) {
    return (
      <>
        <UpdateGroupImageButton groupId={groupId} onSuccess={onSuccess} />
        <ManageMembersButton
          groupId={groupId}
          groupName={groupName}
          onSuccess={onSuccess}
        />
        <DeleteGroupButton
          groupId={groupId}
          groupName={groupName}
          onSuccess={onSuccess}
        />
      </>
    );
  }

  if (role === USER_ROLE_IN_GROUP.MEMBER) {
    return (
      <>
        <UpdateGroupImageButton groupId={groupId} onSuccess={onSuccess} />
        <LeaveGroupButton
          groupId={groupId}
          groupName={groupName}
          onSuccess={onSuccess}
        />
      </>
    );
  }

  return null;
};
