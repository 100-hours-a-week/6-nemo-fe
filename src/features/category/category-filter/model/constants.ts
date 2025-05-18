import { all, animals, art, book, career, etc, friendship, game, it, language, money, music, sports } from "@/shared/assets/images";
import { CategoryType } from "./types";

export const CATEGORIES: CategoryType[] = [
    { id: "ALL", label: "전체", icon: all },
    { id: "IT_DEVELOPMENT", label: "IT/개발", icon: it },
    { id: "SPORTS", label: "스포츠", icon: sports },
    { id: "CAREER_EMPLOYMENT", label: "취업/커리어", icon: career },
    { id: "SOCIAL_NETWORKING", label: "친목/사교", icon: friendship },
    { id: "GAMES_ENTERTAINMENT", label: "게임/오락", icon: game },
    { id: "LANGUAGE_FOREIGN", label: "외국/언어", icon: language },
    { id: "PET", label: "반려동물", icon: animals },
    { id: "READING_DISCUSSION", label: "독서/토론", icon: book },
    { id: "CULTURE_ART", label: "문화/예술", icon: art },
    { id: "MUSIC_INSTRUMENT", label: "음악/악기", icon: music },
    { id: "ECONOMY_FINANCE", label: "경제/금융", icon: money },
    { id: "ETC", label: "기타", icon: etc },
];