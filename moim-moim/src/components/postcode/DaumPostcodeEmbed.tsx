"use client";
import React, { Component, createRef, CSSProperties } from "react";
import loadPostcode, { postcodeScriptUrl, PostcodeConstructor, PostcodeOptions } from "./loadPostcode";

export interface DaumPostcodeEmbedProps
  extends Omit<PostcodeOptions, "oncomplete" | "onresize" | "onclose" | "onsearch" | "width" | "height"> {
  onComplete?: PostcodeOptions["oncomplete"]; // 주소 선택 완료 시 호출되는 콜백 함수
  onResize?: PostcodeOptions["onresize"]; // 크기 조정 시 호출되는 콜백 함수
  onClose?: PostcodeOptions["onclose"]; // 팝업 닫을 때 호출되는 콜백 함수
  onSearch?: PostcodeOptions["onsearch"]; // 검색 시 호출되는 콜백 함수
  className?: string; // 추가 CSS 클래스 이름
  style?: CSSProperties; // 추가 스타일
  defaultQuery?: string; // 기본 검색어
  errorMessage?: string | React.ReactNode; // 에러 메시지
  scriptUrl?: string; // 스크립트 URL
  autoClose?: boolean; // 자동 닫기 설정
}

// 컴포넌트의 상태를 정의하는 인터페이스
interface State {
  hasError: boolean; // 에러 발생 여부
}

const defaultErrorMessage = <p>현재 Daum 우편번호 서비스를 이용할 수 없습니다. 잠시 후 다시 시도해주세요.</p>;

const defaultStyle = {
  width: "100%",
  height: 400,
};

// 기본 props 설정
const defaultProps = {
  scriptUrl: postcodeScriptUrl, // 기본 스크립트 URL
  errorMessage: defaultErrorMessage, // 기본 에러 메시지
  autoClose: true, // 기본 자동 닫기 설정
};

// DaumPostcodeEmbed 컴포넌트 정의
class DaumPostcodeEmbed extends Component<DaumPostcodeEmbedProps, State> {
  static defaultProps = defaultProps; // 기본 props 설정
  private mounted = false; // 컴포넌트가 마운트 되었는지 여부
  wrap = createRef<HTMLDivElement>(); // 우편번호 검색 결과를 표시할 DOM 요소 참조

  state = {
    hasError: false, // 에러 상태 초기화
  };

  componentDidMount() {
    const { initiate, onError } = this; // 핸들러 함수 가져오기
    const { scriptUrl } = this.props; // props에서 scriptUrl 가져오기

    // 스크립트 URL이 설정되지 않은 경우 아무 것도 하지 않음
    if (!scriptUrl) return;

    // 컴포넌트가 마운트되지 않았다면 우편번호 스크립트를 로드합니다.
    if (!this.mounted) {
      loadPostcode(scriptUrl).then(initiate).catch(onError); // 스크립트를 로드하고, 성공 시 initiate 호출, 실패 시 onError 호출
      this.mounted = true; // 컴포넌트가 마운트 되었음을 표시
    }
  }

  // 우편번호 기능을 초기화하는 함수
  initiate = (Postcode: PostcodeConstructor) => {
    if (!this.wrap.current) return; // DOM 요소가 없으면 아무 것도 하지 않음
    const { defaultQuery, autoClose, onComplete, onClose, onResize, onSearch, ...options } = this.props;

    // Postcode 인스턴스를 생성
    const postcode = new Postcode({
      ...options,
      oncomplete: (address) => {
        if (onComplete) onComplete(address); // 주소 선택 완료 시 onComplete 콜백 호출
        if (autoClose && this.wrap.current) this.wrap.current.remove(); // 자동 닫기 설정 시 팝업 닫기
      },
      onsearch: onSearch, // 검색 시 콜백 설정
      onresize: onResize, // 크기 조정 시 콜백 설정
      onclose: onClose, // 닫을 때 콜백 설정
      width: "100%", // 기본 너비
      height: "100%", // 기본 높이
    });

    // Postcode를 wrap 요소에 임베드
    postcode.embed(this.wrap.current, { q: defaultQuery, autoClose: autoClose });
  };

  // 에러 핸들러
  onError = (e: unknown) => {
    console.error(e); // 에러 콘솔에 출력
    this.setState({ hasError: true }); // 에러 상태를 true로 설정
  };

  render() {
    const { className, style, errorMessage } = this.props; // props에서 클래스 이름과 스타일 가져오기
    const { hasError } = this.state; // 상태에서 에러 여부 가져오기

    return (
      <div ref={this.wrap} className={className} style={{ ...defaultStyle, ...style }}>
        {" "}
        {/* wrap 요소 렌더링 */}
        {hasError && errorMessage} {/* 에러가 발생했을 경우 에러 메시지 표시 */}
      </div>
    );
  }
}

export default DaumPostcodeEmbed;
