export const USER_ROLE_IN_GROUP = {
  LEADER: "LEADER",
  MEMBER: "MEMBER",
  NON_MEMBER: "NON_MEMBER",
  GUEST: "GUEST",
} as const;

export const MY_NEMO_PAGE = "/my-nemo";
export const MY_GROUPS_PAGE = "my-group";
export const MY_GROUPS_PAGE_URI = `${MY_NEMO_PAGE}?tab=${MY_GROUPS_PAGE}`;
export const HOME_PAGE = "groups";
export const CREATE_SUCCESS_PAGE = "success";
