declare global {
  interface Window {
    daum?: {
      postcode: {
        load: (fn: () => void) => void;
        version: string;
        _validParam_: boolean;
      };
      Postcode: PostcodeConstructor;
    };
  }
}

export interface Address {
  zonecode: string;
  address: string;
  // ... (기타 주소 속성)
}

export interface Size {
  width: number;
  height: number;
}

export type State = "FORCE_CLOSE" | "COMPLETE_CLOSE";

export interface Search {
  q: string;
  count: number;
}

export interface PostcodeOptions {
  oncomplete?: (address: Address) => void;
  onresize?: (size: Size) => void;
  onclose?: (state: State) => void;
  onsearch?: (search: Search) => void;
  width?: string | number;
  height?: string | number;
  // ... (기타 옵션)
}

export interface OpenOptions {
  q?: string;
  left?: number | string;
  top?: number | string;
  popupTitle?: string;
  popupKey?: string;
  autoClose?: boolean;
}

export interface EmbedOptions {
  q?: string;
  autoClose?: boolean;
}

export interface PostcodeConstructor {
  new (postcodeOptions: PostcodeOptions): Postcode;
}

export interface Postcode {
  open(openOptions?: OpenOptions): void;
  embed(element: HTMLElement, embedOptions?: EmbedOptions): void;
}

export const postcodeScriptUrl = "https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";

const loadPostcode = (function () {
  const scriptId = "daum_postcode_script";
  let promise: Promise<PostcodeConstructor> | null = null;

  return function (url: string = postcodeScriptUrl): Promise<PostcodeConstructor> {
    if (promise) return promise;

    promise = new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = url;
      script.onload = () => {
        if (window?.daum?.Postcode) {
          return resolve(window.daum.Postcode);
        }
        reject(new Error("Script is loaded successfully, but cannot find Postcode module."));
      };
      script.onerror = (error) => reject(error);
      script.id = scriptId;
      document.body.appendChild(script);
    });

    return promise;
  };
})();

export default loadPostcode;
