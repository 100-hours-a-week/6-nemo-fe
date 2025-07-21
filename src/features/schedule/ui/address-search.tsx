"use client";

import { useAddressModal } from "../lib/use-address-modal";
import { useAddressState } from "../lib/use-address-state";
import { useDaumScript } from "../lib/use-daum-script";
import { AddressData } from "../model/types";
import { AddressInputFields } from "./address-input-fields";
import { PostcodeSearchModal } from "./postcode-search-modal";

interface AddressSearchProps {
  onComplete: (data: AddressData) => void;
  className?: string;
}

export const AddressSearch = ({
  onComplete,
  className,
}: AddressSearchProps) => {
  const isScriptLoaded = useDaumScript();
  const { isVisible, open, close } = useAddressModal();
  const { addressData, updateAddress, handleDetailAddressChange } =
    useAddressState(onComplete);

  const handleSearchClick = () => {
    if (isScriptLoaded) {
      open();
    }
  };

  const handleAddressComplete = (data: AddressData) => {
    updateAddress(data);
  };

  return (
    <>
      <AddressInputFields
        addressData={addressData}
        onDetailAddressChange={handleDetailAddressChange}
        onSearchClick={handleSearchClick}
        isScriptLoaded={isScriptLoaded}
        className={className}
      />

      <PostcodeSearchModal
        isVisible={isVisible}
        onClose={close}
        onComplete={handleAddressComplete}
      />
    </>
  );
};
