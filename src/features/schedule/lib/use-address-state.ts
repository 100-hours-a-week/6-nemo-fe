import { useState } from "react";
import { AddressData } from "../model/types";

export const useAddressState = (onComplete: (data: AddressData) => void) => {
  const [addressData, setAddressData] = useState<AddressData>({
    zonecode: "",
    address: "",
    detailAddress: "",
    extraAddress: "",
  });

  const updateAddress = (newData: Partial<AddressData>) => {
    const updatedData = { ...addressData, ...newData };
    setAddressData(updatedData);
    onComplete(updatedData);
  };

  const handleDetailAddressChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    updateAddress({ detailAddress: e.target.value });
  };

  return {
    addressData,
    updateAddress,
    handleDetailAddressChange,
  };
};
