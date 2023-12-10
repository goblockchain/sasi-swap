export enum SASI_SYMBOL_ENUM {
  TP26 = "TP26",
  TP29 = "TP29",
  TS26 = "TS26",
  TS29 = "TS29",
  DREX = "DREX",
  TDCOL = "TDCOL",
  TDJP = "TDJP",
  TDUR = "TDUR",
}

const sasiCurrencyLogosMap = {
  [SASI_SYMBOL_ENUM.TP26]: "./assets/sasi-tesouro/TP26.png",
  [SASI_SYMBOL_ENUM.TP29]: "./assets/sasi-tesouro/TP29.png",
  [SASI_SYMBOL_ENUM.TS26]: "./assets/sasi-tesouro/TS26.png",
  [SASI_SYMBOL_ENUM.TS29]: "./assets/sasi-tesouro/TS29.png",
  [SASI_SYMBOL_ENUM.DREX]: "./assets/sasi-cbdc/brasil.png",
  [SASI_SYMBOL_ENUM.TDCOL]: "./assets/sasi-cbdc/colombia.png",
  [SASI_SYMBOL_ENUM.TDJP]: "./assets/sasi-cbdc/japan.png",
  [SASI_SYMBOL_ENUM.TDUR]: "./assets/sasi-cbdc/uruguay.png",
};

export const getSasiCurrencyIcon = (symbol: SASI_SYMBOL_ENUM) =>
  sasiCurrencyLogosMap[symbol];
