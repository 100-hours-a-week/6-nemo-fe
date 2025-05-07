import { users_icon } from "@/shared/assets/images";
import { CategoryType } from "./types";

export const CATEGORIES: CategoryType[] = [
    { id: "ALL", label: "전체", icon: users_icon },
    { id: "PET", label: "반려동물", icon: users_icon },
    { id: "SPORTS", label: "스포츠", icon: users_icon },
    { id: "READING_DISCUSSION", label: "독서/토론", icon: users_icon },
    { id: "CULTURE_ART", label: "문화/예술", icon: users_icon },
    { id: "LANGUAGE_FOREIGN", label: "외국/언어", icon: users_icon },
    { id: "GAMES_ENTERTAINMENT", label: "게임/오락", icon: users_icon },
    { id: "MUSIC_INSTRUMENT", label: "음악/악기", icon: users_icon },
    { id: "IT_DEVELOPMENT", label: "IT/개발", icon: users_icon },
    { id: "CAREER_EMPLOYMENT", label: "취업/커리어", icon: users_icon },
    { id: "ECONOMY_FINANCE", label: "경제/금융", icon: users_icon },
    { id: "SOCIAL_NETWORKING", label: "친목/사교", icon: users_icon },
    { id: "ETC", label: "기타", icon: users_icon },
];