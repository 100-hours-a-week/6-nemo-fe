import { cn } from "lib/utils";
import { AddressData } from "../model/types";

interface AddressInputFieldsProps {
  addressData: AddressData;
  onDetailAddressChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSearchClick: () => void;
  isScriptLoaded: boolean;
  className?: string;
}

export const AddressInputFields = ({
  addressData,
  onDetailAddressChange,
  onSearchClick,
  isScriptLoaded,
  className,
}: AddressInputFieldsProps) => {
  return (
    <div className={cn("space-y-3", className)}>
      {/* 우편번호 영역 */}
      <div className="flex items-center gap-2">
        <input
          type="text"
          placeholder="우편번호"
          readOnly
          required
          value={addressData.zonecode}
          className="bg-common-100 focus:border-primary text-md rounded-md border border-gray-300 px-3 py-2 outline-none"
        />
        <button
          type="button"
          onClick={onSearchClick}
          className="bg-primary text-common-100 flex-shrink-0 rounded-md px-3 py-2 text-sm"
          disabled={!isScriptLoaded}
        >
          우편번호 찾기
        </button>
      </div>

      {/* 주소 영역 */}
      <div className="space-y-3">
        <input
          type="text"
          placeholder="도로명 주소"
          readOnly
          required
          value={addressData.address}
          className="bg-common-100 focus:border-primary text-md w-full rounded-md border border-gray-200 px-3 py-2 outline-none"
        />
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="상세주소"
            required
            value={addressData.detailAddress}
            onChange={onDetailAddressChange}
            className="bg-common-100 focus:border-primary text-md flex-1 rounded-md border border-gray-200 px-3 py-2 outline-none"
          />
          <input
            type="text"
            placeholder="참고주소"
            readOnly
            value={addressData.extraAddress}
            className="bg-common-100 w-1/3 rounded-md border border-gray-200 px-3 py-2 text-sm text-gray-500 outline-none"
          />
        </div>
      </div>
    </div>
  );
};
