import React, {
  useEffect,
  useState,
  useRef,
  useCallback,
  useMemo,
} from "react";
import {
  increaseAllowance,
  swapERC20TokensForERC1155Tokens,
  swapERC1155TokensForERC20Tokens,
  getAmountOut,
} from "../utils/queries";

import { CogIcon, ArrowSmDownIcon } from "@heroicons/react/outline";
import { SwapField } from "./SwapField";
import { TransactionStatus } from "./TransactionStatus";
import toast, { Toaster } from "react-hot-toast";
import { DEFAULT_VALUE, ETH } from "../utils/SupportedCoins";
import { toEth, toWei } from "../utils/ether-utils";
import { useAccount } from "wagmi";
import { sasiCurrencies } from "../currencies/sasiCurrencyList";

export const SwapComponent = () => {
  const [srcToken, setSrcToken] = useState(
    sasiCurrencies.find((item) => item.symbol === "TS26")
  );
  const [destToken, setDestToken] = useState(DEFAULT_VALUE);

  const [inputValue, setInputValue] = useState();
  const [outputValue, setOutputValue] = useState();

  const inputValueRef = useRef();
  const outputValueRef = useRef();

  const isReversed = useRef(false);

  const INCREASE_ALLOWANCE = "Increase allowance";
  const ENTER_AMOUNT = "Enter an amount";
  const CONNECT_WALLET = "Connect wallet";
  const SWAP = "Swap";

  const srcTokenObj = useMemo(
    () => ({
      id: "srcToken",
      value: inputValue,
      setValue: setInputValue,
      defaultValue: srcToken,
      ignoreValue: destToken,
      setToken: setSrcToken,
    }),
    [inputValue, setInputValue, srcToken, destToken]
  );

  const destTokenObj = useMemo(
    () => ({
      id: "destToken",
      value: outputValue,
      setValue: setOutputValue,
      defaultValue: destToken,
      ignoreValue: srcToken,
      setToken: setDestToken,
    }),
    [outputValue, setOutputValue, destToken, srcToken]
  );

  const [srcTokenComp, setSrcTokenComp] = useState();
  const [destTokenComp, setDestTokenComp] = useState();

  const [swapBtnText, setSwapBtnText] = useState(ENTER_AMOUNT);
  const [txPending, setTxPending] = useState(false);

  const notifyError = (msg) => toast.error(msg, { duration: 6000 });
  const notifySuccess = () => toast.success("Transaction completed.");

  const { address } = useAccount();

  const populateOutputValue = useCallback(async () => {
    if (
      destToken === DEFAULT_VALUE ||
      srcToken === DEFAULT_VALUE ||
      !inputValue
    )
      return;

    try {
      const erc1155Id = srcToken?.isERC20
        ? destToken?.chainId
        : srcToken?.chainId;
      const outputValue = await getAmountOut(
        inputValue,
        srcToken?.address,
        destToken?.address,
        erc1155Id
      );
      console.log("outputValue", outputValue);
      setOutputValue(outputValue);
    } catch (error) {
      console.log("error", error);
      console.log("setting output value to 0");
      setOutputValue("0");
    }
  }, [srcToken, destToken, inputValue, setOutputValue]);

  const populateInputValue = useCallback(async () => {
    if (
      destToken === DEFAULT_VALUE ||
      srcToken === DEFAULT_VALUE ||
      !outputValue
    )
      return;

    try {
      const erc1155Id = srcToken?.isERC20
        ? destToken?.chainId
        : srcToken?.chainId;

      // Call contract "getAmountOut"
      const inputValue = await getAmountOut(
        outputValue,
        destToken?.address,
        srcToken?.address,
        erc1155Id
      );
      console.log("inputValue", inputValue);
      setInputValue(inputValue);
    } catch (error) {
      console.log("error", error);
      console.log("setting output value to 0");
      setInputValue("0");
    }
  }, [srcToken, destToken, outputValue, setInputValue]);

  useEffect(() => {
    // Handling the text of the submit button

    if (!address) setSwapBtnText(CONNECT_WALLET);
    else if (!inputValue || !outputValue) setSwapBtnText(ENTER_AMOUNT);
    else setSwapBtnText(SWAP);
  }, [inputValue, outputValue, address]);

  useEffect(() => {
    if (
      document.activeElement !== outputValueRef.current &&
      document.activeElement.ariaLabel !== "srcToken" &&
      !isReversed.current
    )
      populateOutputValue(inputValue);

    const variant = isReversed.current ? "cbdcs" : "titles";
    setSrcTokenComp(
      <SwapField obj={srcTokenObj} ref={inputValueRef} variant={variant} />
    );

    if (inputValue?.length === 0) setOutputValue("");
  }, [inputValue, destToken, populateOutputValue, srcTokenObj]);

  useEffect(() => {
    if (
      document.activeElement !== inputValueRef.current &&
      document.activeElement.ariaLabel !== "destToken" &&
      !isReversed.current
    )
      populateInputValue(outputValue);

    const variant = isReversed.current ? "titles" : "cbdcs";
    setDestTokenComp(
      <SwapField obj={destTokenObj} ref={outputValueRef} variant={variant} />
    );

    if (outputValue?.length === 0) setInputValue("");

    // Resetting the isReversed value if its set
    if (isReversed.current) isReversed.current = false;
  }, [outputValue, srcToken, populateInputValue, destTokenObj]);

  return (
    <div className="bg-white shadow-lg text-black w-[35%] p-4 px-6 rounded-xl">
      <div className="flex items-center justify-between py-4 px-1">
        <b>Swap</b>
      </div>
      <div className="relative bg-white shadow-md p-4 py-6 rounded-xl mb-2 border-[2px] border-transparent hover:border-zinc-600">
        {srcTokenComp}

        <ArrowSmDownIcon
          className="absolute left-1/2 -translate-x-1/2 -bottom-6 h-10 p-1 bg-white shadow-md border-4 border-zinc-100 text-zinc-500 rounded-xl cursor-pointer hover:scale-110"
          onClick={handleReverseExchange}
        />
      </div>

      <div className="bg-white shadow-md p-4 py-6 rounded-xl mt-2 border-[2px] border-transparent hover:border-zinc-600">
        {destTokenComp}
      </div>

      <button
        className={getSwapBtnClassName()}
        onClick={() => {
          if (swapBtnText === INCREASE_ALLOWANCE) handleIncreaseAllowance();
          else if (swapBtnText === SWAP) handleSwap();
        }}
      >
        {swapBtnText}
      </button>

      {txPending && <TransactionStatus />}

      <Toaster />
    </div>
  );

  async function handleSwap() {
    // if (srcToken === ETH && destToken !== ETH) {
    performSwap();
    // } else {
    // Check whether there is allowance when the swap deals with tokenToEth/tokenToToken
    //   setTxPending(true);
    //   const result = await hasValidAllowance(address, srcToken, inputValue);
    //   setTxPending(false);

    //   if (result) performSwap();
    //   else handleInsufficientAllowance();
    // }
  }

  async function handleIncreaseAllowance() {
    // Increase the allowance
    setTxPending(true);
    await increaseAllowance(srcToken, inputValue);
    setTxPending(false);

    // Set the swapbtn to "Swap" again
    setSwapBtnText(SWAP);
  }

  function handleReverseExchange(e) {
    // Setting the isReversed value to prevent the input/output values
    // being calculated in their respective side - effects
    isReversed.current = true;

    setInputValue(outputValue);
    setOutputValue(inputValue);

    setSrcToken(destToken);
    setDestToken(srcToken);
  }

  function getSwapBtnClassName() {
    let className = "p-4 w-full my-2 rounded-xl";
    className +=
      swapBtnText === ENTER_AMOUNT || swapBtnText === CONNECT_WALLET
        ? " text-zinc-400 bg-zinc-800 pointer-events-none"
        : " bg-[#C10000] text-white fw-bold";
    className += swapBtnText === INCREASE_ALLOWANCE ? " bg-yellow-600" : "";
    return className;
  }

  async function performSwap() {
    setTxPending(true);

    let receipt;

    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + 1);
    const tomorrowTimestamp = currentDate.getTime();
    console.log("srcToken", srcToken);

    if (srcToken?.isERC20)
      receipt = await swapERC20TokensForERC1155Tokens(
        inputValue,
        outputValue,
        [srcToken?.address, destToken?.address],
        destToken?.chainId,
        address,
        tomorrowTimestamp
      );
    else {
      receipt = await swapERC1155TokensForERC20Tokens(
        inputValue,
        outputValue,
        [srcToken?.address, destToken?.address],
        srcToken?.chainId,
        address,
        tomorrowTimestamp
      );
    }

    setTxPending(false);

    if (receipt && !receipt.hasOwnProperty("transactionHash"))
      notifyError(receipt);
    else notifySuccess();
  }

  function handleInsufficientAllowance() {
    notifyError(
      "Insufficient allowance. Click 'Increase allowance' to increase it."
    );
    setSwapBtnText(INCREASE_ALLOWANCE);
  }
};
