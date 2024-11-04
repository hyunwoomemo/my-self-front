import DaumPostcodeEmbed, { DaumPostcodeEmbedProps } from "./DaumPostcodeEmbed";
import useDaumPostcodePopup, { DaumPostcodePopupParams } from "./useDaumPostcodePopup";
import loadPostcode, { Address, Search, State } from "./loadPostcode";

export type { DaumPostcodeEmbedProps, DaumPostcodePopupParams, Address, Search, State };
export { loadPostcode, DaumPostcodeEmbed, useDaumPostcodePopup };
export default DaumPostcodeEmbed;
