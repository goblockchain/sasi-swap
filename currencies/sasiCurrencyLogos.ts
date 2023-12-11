export enum SASI_SYMBOL_ENUM {
  TP26 = "TP26",
  TP29 = "TP29",
  TS26 = "TS26",
  TS29 = "TS29",
  RD = "RD",
  COL = "COL",
  HOK = "HOK",
  JAP = "JAP",
  URY = "URY",
}

const sasiCurrencyLogosMap = {
  [SASI_SYMBOL_ENUM.TP26]: "./assets/sasi-tesouro/TP26.png",
  [SASI_SYMBOL_ENUM.TP29]: "./assets/sasi-tesouro/TP29.png",
  [SASI_SYMBOL_ENUM.TS26]: "./assets/sasi-tesouro/TS26.png",
  [SASI_SYMBOL_ENUM.TS29]: "./assets/sasi-tesouro/TS29.png",
  [SASI_SYMBOL_ENUM.RD]: "./assets/sasi-cbdc/brasil.png",
  [SASI_SYMBOL_ENUM.COL]: "./assets/sasi-cbdc/colombia.png",
  [SASI_SYMBOL_ENUM.HOK]: "./assets/sasi-cbdc/hongKong.png",
  [SASI_SYMBOL_ENUM.JAP]: "./assets/sasi-cbdc/japan.png",
  [SASI_SYMBOL_ENUM.URY]: "./assets/sasi-cbdc/uruguay.png",
};

export const getSasiCurrencyIcon = (symbol: SASI_SYMBOL_ENUM) =>
  sasiCurrencyLogosMap[symbol];
