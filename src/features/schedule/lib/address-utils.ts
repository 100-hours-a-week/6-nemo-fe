export const processAddressData = (data: any) => {
  let addr = "";
  let extraAddr = "";

  if (data.userSelectedType === "R") {
    addr = data.roadAddress;
  } else {
    addr = data.jibunAddress;
  }

  // 참고항목 처리
  if (data.userSelectedType === "R") {
    if (data.bname !== "" && /[동|로|가]$/g.test(data.bname)) {
      extraAddr += data.bname;
    }
    if (data.buildingName !== "" && data.apartment === "Y") {
      extraAddr +=
        extraAddr !== "" ? ", " + data.buildingName : data.buildingName;
    }
    if (extraAddr !== "") {
      extraAddr = " (" + extraAddr + ")";
    }
  }

  return {
    zonecode: data.zonecode,
    address: addr,
    detailAddress: "",
    extraAddress: extraAddr,
  };
};
