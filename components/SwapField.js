import React from "react";
import { Selector } from "./Selector";
import { sasiAssetsData, sasiCBDCsData } from "../currencies/sasiCurrencyList";

const SwapField = React.forwardRef(({ obj, variant }, inputRef) => {
  const { id, value = "", setValue, defaultValue, setToken, ignoreValue } = obj;

  const currenciesMap = {
    titles: sasiAssetsData,
    cbdcs: sasiCBDCsData,
  };

  const currencies = currenciesMap?.[variant];

  return (
    <div className="flex items-center rounded-xl">
      <input
        ref={inputRef}
        className={getInputClassname()}
        type={"number"}
        value={value}
        placeholder={"0.0"}
        onChange={(e) => {
          setValue(e.target.value);
        }}
      />

      <Selector
        id={id}
        setToken={setToken}
        defaultValue={defaultValue}
        ignoreValue={ignoreValue}
        currencies={currencies}
      />
    </div>
  );

  function getInputClassname() {
    let className =
      " w-full outline-none h-8 px-2 appearance-none text-3xl bg-transparent";
    return className;
  }
});

// Set display name for the component
SwapField.displayName = "SwapField";

export { SwapField };
