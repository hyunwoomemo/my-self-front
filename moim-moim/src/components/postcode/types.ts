import { CSSProperties } from "react";
import { PostcodeOptions } from "./loadPostcode";

export interface DaumPostcodeEmbedProps
  extends Omit<PostcodeOptions, "oncomplete" | "onresize" | "onclose" | "onsearch" | "width" | "height"> {
  onComplete?: PostcodeOptions["oncomplete"];
  onResize?: PostcodeOptions["onresize"];
  onClose?: PostcodeOptions["onclose"];
  onSearch?: PostcodeOptions["onsearch"];
  className?: string;
  style?: CSSProperties;
  defaultQuery?: string;
  errorMessage?: string | React.ReactNode;
  scriptUrl?: string;
  autoClose?: boolean;
}
