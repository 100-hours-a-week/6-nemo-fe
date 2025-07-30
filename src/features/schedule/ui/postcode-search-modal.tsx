import { useEffect, useRef } from "react";
import { processAddressData } from "../lib/address-utils";
import { AddressData } from "../model/types";

interface PostcodeSearchModalProps {
  isVisible: boolean;
  onClose: () => void;
  onComplete: (data: AddressData) => void;
}

export const PostcodeSearchModal = ({
  isVisible,
  onClose,
  onComplete,
}: PostcodeSearchModalProps) => {
  const layerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isVisible && layerRef.current && window.daum) {
      new window.daum.Postcode({
        oncomplete: (data: any) => {
          const processedData = processAddressData(data);
          onComplete(processedData);
          onClose();
        },
        width: "100%",
        height: "100%",
      }).embed(layerRef.current);
    }
  }, [isVisible, onComplete, onClose]);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) {
      onClose();
    }
  };

  if (!isVisible) return null;

  return (
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
        display: "flex",
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
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  );
};
