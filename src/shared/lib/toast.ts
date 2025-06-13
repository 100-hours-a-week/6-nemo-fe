import { toast } from "sonner";

const SUCCESS_MESSAGE = "요청이 성공적으로 완료되었습니다." as const
const ERROR_MESSAGE = "요청에 실패하였습니다." as const
const ERROR_DESCRIPTION = "잠시 후 다시 시도해주세요." as const
const TOAST_POSITION = "top-center" as const

export const successToast = (message?: string) => {
    const successMessage = message ?? SUCCESS_MESSAGE;

    toast.success(successMessage, {
        position: TOAST_POSITION,
    });
};

export const errorToast = (message: string, description: string) => {
    toast.error(message || ERROR_MESSAGE, {
        description: description || ERROR_DESCRIPTION,
        position: TOAST_POSITION,
    });
};