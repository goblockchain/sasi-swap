// import BrLogo from "../assets/images/tdrex-cbdc/brasil.png";
// import ColLogo from "../assets/images/tdrex-cbdc/colombia.png";
// import HkgLogo from "../assets/images/tdrex-cbdc/hongKong.png";
// import JpyLogo from "../assets/images/tdrex-cbdc/japan.png";
// import UryLogo from "../assets/images/tdrex-cbdc/uruguay.png";
// import TP26Logo from "../assets/images/tdrex-tesouro/TP26.png";
// import TP29Logo from "../assets/images/tdrex-tesouro/TP29.png";
// import TS26Logo from "../assets/images/tdrex-tesouro/TS26.png";
// import TS29Logo from "../assets/images/tdrex-tesouro/TS29.png";

export enum TDREX_SYMBOL_ENUM {
  TP26 = "TP26",
  TP29 = "TP29",
  TS26 = "TS26",
  TS29 = "TS29",
  DREX = "DREX",
  COL = "COL",
  HKG = "HKG",
  JPY = "JPY",
  URY = "URY",
}

const tdrexCurrencyLogosMap = {
  [TDREX_SYMBOL_ENUM.TP26]: "./assets/tdrex-tesouro/TP26.png",
  [TDREX_SYMBOL_ENUM.TP29]: "./assets/tdrex-tesouro/TP29.png",
  [TDREX_SYMBOL_ENUM.TS26]: "./assets/tdrex-tesouro/TS26.png",
  [TDREX_SYMBOL_ENUM.TS29]: "./assets/tdrex-tesouro/TS29.png",
  [TDREX_SYMBOL_ENUM.DREX]: "./assets/tdrex-cbdc/brasil.png",
  [TDREX_SYMBOL_ENUM.COL]: "./assets/tdrex-cbdc/colombia.png",
  [TDREX_SYMBOL_ENUM.HKG]: "./assets/tdrex-cbdc/hongKong.png",
  [TDREX_SYMBOL_ENUM.JPY]: "./assets/tdrex-cbdc/japan.png",
  [TDREX_SYMBOL_ENUM.URY]: "./assets/tdrex-cbdc/uruguay.png",
};

export const getTdrexCurrencyIcon = (symbol: TDREX_SYMBOL_ENUM) =>
  tdrexCurrencyLogosMap[symbol];
