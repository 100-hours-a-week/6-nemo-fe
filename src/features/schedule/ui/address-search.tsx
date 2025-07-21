"use client";

import { useEffect, useState } from "react";
import { useAddressModal } from "../lib/use-address-modal";
import { useAddressState } from "../lib/use-address-state";
import { useDaumScript } from "../lib/use-daum-script";
import { AddressData } from "../model/types";
import { AddressInputFields } from "./address-input-fields";
import { PostcodeSearchModal } from "./postcode-search-modal";

interface AddressSearchProps {
  onComplete: (data: AddressData) => void;
  value?: AddressData; // 추가
}

export function AddressSearch({ onComplete, value }: AddressSearchProps) {
  const [address, setAddress] = useState<AddressData>(
    value || {
      zonecode: "",
      address: "",
      detailAddress: "",
      extraAddress: "",
    }
  );
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

  useEffect(() => {
    if (value) {
      setAddress(value);
    }
  }, [value]);

  return (
    <>
      <AddressInputFields
        addressData={address}
        onDetailAddressChange={handleDetailAddressChange}
        onSearchClick={handleSearchClick}
        isScriptLoaded={isScriptLoaded}
      />

      <PostcodeSearchModal
        isVisible={isVisible}
        onClose={close}
        onComplete={handleAddressComplete}
      />
    </>
  );
}
