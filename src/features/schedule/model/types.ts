export type AddressData = {
    zonecode: string;        // 우편번호
    address: string;         // 주소
    detailAddress: string;   // 상세 주소 (사용자 입력)
    extraAddress: string;    // 참고 항목 (동/건물명 등)
    guide?: string;          // 주소 가이드 텍스트
}