"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "lib/utils";
import { AddressData } from "../model/types";

declare global {
  interface Window {
    daum: any;
  }
}

export const AddressSearch = ({
  onComplete,
  className,
}: {
  onComplete: (data: AddressData) => void;
  className?: string;
}) => {
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  const [isLayerVisible, setIsLayerVisible] = useState(false);
  const layerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  const [addressData, setAddressData] = useState<AddressData>({
    zonecode: "",
    address: "",
    detailAddress: "",
    extraAddress: "",
  });

  // 다음 우편번호 스크립트 로드
  useEffect(() => {
    if (document.getElementById("daum-postcode-script")) {
      setIsScriptLoaded(true);
      return;
    }

    const script = document.createElement("script");
    script.src =
      "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
    script.id = "daum-postcode-script";
    script.async = true;
    script.onload = () => setIsScriptLoaded(true);
    document.body.appendChild(script);
  }, []);

  // 우편번호 검색 실행
  const execDaumPostcode = () => {
    if (!isScriptLoaded || !window.daum || !layerRef.current) return;

    setIsLayerVisible(true);

    new window.daum.Postcode({
      oncomplete: (data: any) => {
        // 검색 결과 처리
        let addr = "";
        let extraAddr = "";

        if (data.userSelectedType === "R") {
          // 도로명 주소
          addr = data.roadAddress;
        } else {
          // 지번 주소
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

        // 데이터 상태 업데이트
        const newAddressData = {
          zonecode: data.zonecode,
          address: addr,
          detailAddress: "",
          extraAddress: extraAddr,
        };

        setAddressData(newAddressData);
        onComplete(newAddressData);
        setIsLayerVisible(false);
      },
      width: "100%",
      height: "100%",
    }).embed(layerRef.current);

    // 레이어 위치 초기화
    initLayerPosition();
  };

  // 레이어 위치 설정
  const initLayerPosition = () => {
    if (!layerRef.current) return;

    const width = 400;
    const height = 480;
    const borderWidth = 1;

    layerRef.current.style.width = `${width}px`;
    layerRef.current.style.height = `${height}px`;
    layerRef.current.style.border = `${borderWidth}px solid #d9d9d9`;
    layerRef.current.style.boxShadow = "0px 4px 12px rgba(0, 0, 0, 0.1)";
    layerRef.current.style.left = `${(window.innerWidth - width) / 2 - borderWidth}px`;
    layerRef.current.style.top = `${(window.innerHeight - height) / 2 - borderWidth}px`;
  };

  // 레이어 닫기
  const closeLayer = () => {
    setIsLayerVisible(false);
  };

  // 오버레이 클릭 핸들러
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) {
      closeLayer();
    }
  };

  // 상세주소 변경 핸들러
  const handleDetailAddressChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newAddressData = {
      ...addressData,
      detailAddress: e.target.value,
    };
    setAddressData(newAddressData);
    onComplete(newAddressData);
  };

  // 화면 크기 변경 시 레이어 위치 조정
  useEffect(() => {
    if (isLayerVisible) {
      const handleResize = () => initLayerPosition();
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, [isLayerVisible]);

  return (
    <div className={cn("space-y-3", className)}>
      {/* 우편번호 영역 */}
      <div className="flex items-center gap-2">
        <input
          type="text"
          id="postcode"
          placeholder="우편번호"
          readOnly
          required
          value={addressData.zonecode}
          className="bg-common-100 focus:border-primary text-md rounded-md border border-gray-300 px-3 py-2 outline-none"
        />
        <button
          type="button"
          onClick={execDaumPostcode}
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
          id="address"
          placeholder="도로명 주소"
          readOnly
          required
          value={addressData.address}
          className="bg-common-100 focus:border-primary text-md w-full rounded-md border border-gray-200 px-3 py-2 outline-none"
        />
        <div className="flex gap-2">
          <input
            type="text"
            id="detailAddress"
            placeholder="상세주소"
            required
            value={addressData.detailAddress}
            onChange={handleDetailAddressChange}
            className="bg-common-100 focus:border-primary text-md flex-1 rounded-md border border-gray-200 px-3 py-2 outline-none"
          />
          <input
            type="text"
            id="extraAddress"
            placeholder="참고주소"
            readOnly
            value={addressData.extraAddress}
            className="bg-common-100 w-1/3 rounded-md border border-gray-200 px-3 py-2 text-sm text-gray-500 outline-none"
          />
        </div>
      </div>

      {/* 다음 우편번호 레이어 - 오버레이와 함께 */}
      {isScriptLoaded && (
        <div
          ref={overlayRef}
          onClick={handleOverlayClick}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 99,
            display: isLayerVisible ? "flex" : "none",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            ref={layerRef}
            style={{
              width: "400px",
              height: "480px",
              backgroundColor: "#fff",
              borderRadius: "8px",
              boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.3)",
              overflow: "hidden",
              WebkitOverflowScrolling: "touch",
            }}
            onClick={(e) => e.stopPropagation()} // 레이어 클릭 시 이벤트 전파 중단
          />
        </div>
      )}
    </div>
  );
};
