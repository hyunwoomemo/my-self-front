import { useCallback, useEffect } from "react";
import loadPostcode, { PostcodeOptions, OpenOptions, postcodeScriptUrl } from "./loadPostcode";

export type DaumPostcodePopupParams = Omit<PostcodeOptions, "oncomplete" | "onresize" | "onclose" | "onsearch"> &
  Omit<OpenOptions, "q"> & {
    onComplete?: PostcodeOptions["oncomplete"]; // 주소 선택 완료 콜백
    onResize?: PostcodeOptions["onresize"]; // 크기 조정 콜백
    onClose?: PostcodeOptions["onclose"]; // 팝업 닫기 콜백
    onSearch?: PostcodeOptions["onsearch"]; // 검색 콜백
    onError?: (error: Error) => void; // 에러 핸들러
    defaultQuery?: string; // 기본 검색어
  };

function useDaumPostcodePopup(scriptUrl = postcodeScriptUrl) {
  useEffect(() => {
    // 컴포넌트가 마운트되었을 때 우편번호 스크립트를 로드합니다.
    loadPostcode(scriptUrl); // 스크립트를 로드합니다.
  }, [scriptUrl]); // scriptUrl이 변경될 때마다 로드

  // 팝업을 여는 함수
  const open = useCallback(
    (options?: DaumPostcodePopupParams) => {
      const {
        defaultQuery,
        left,
        top,
        popupKey,
        popupTitle,
        autoClose,
        onComplete,
        onResize,
        onClose,
        onSearch,
        onError,
        ...others
      } = {
        ...options,
      };

      // 로드된 Postcode를 사용하여 팝업을 엽니다.
      return loadPostcode(scriptUrl)
        .then((Postcode) => {
          // Postcode 인스턴스를 생성
          const postcode = new Postcode({
            ...others,
            oncomplete: onComplete, // 주소 선택 완료 시 호출될 콜백
            onsearch: onSearch, // 검색 시 호출될 콜백
            onresize: onResize, // 크기 조정 시 호출될 콜백
            onclose: onClose, // 팝업 닫을 때 호출될 콜백
          });
          postcode.open({ q: defaultQuery, left, top, popupTitle, popupKey, autoClose });
        })
        .catch(onError); // 에러 발생 시 onError 콜백 호출
    },
    [scriptUrl], // scriptUrl이 변경될 때마다 함수 재생성
  );

  return open;
}

export default useDaumPostcodePopup;
