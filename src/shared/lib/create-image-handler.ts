import { toast } from "sonner";

export const createImageHandler = (
    onSuccess: (imageFile: string) => void
) => {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // 파일 크기 제한 (5MB)
        if (file.size > 5 * 1024 * 1024) {
            alert("이미지 크기는 5MB 이하여야 합니다.");
            return;
        }

        // 이미지 타입 확인
        if (!file.type.startsWith("image/")) {
            alert("이미지 파일만 업로드 가능합니다.");
            return;
        }

        const reader = new FileReader();
        reader.onload = () => {
            onSuccess(reader.result as string);
        };
        reader.onerror = () => {
            toast.error("이미지를 읽는 중 오류가 발생했습니다.");
        };
        reader.readAsDataURL(file);
    };
};
