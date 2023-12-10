import React, { useEffect, useState, useCallback } from "react";
import {
  getTokenAddress,
  getTokenBalance,
  increaseAllowance,
} from "../utils/queries";
import { ethers } from "ethers";
import { TransactionStatus } from "./TransactionStatus";
import toast, { Toaster } from "react-hot-toast";

import {
  ClipboardIcon,
  ClipboardCheckIcon,
  PlusIcon,
} from "@heroicons/react/outline";

export const TokenBalance = ({ name, walletAddress }) => {
  const [balance, setBalance] = useState("-");
  const [tokenAddress, setTokenAddress] = useState();
  const [copyIcon, setCopyIcon] = useState({ icon: ClipboardIcon });
  const [txPending, setTxPending] = useState(false);

  const notifyError = useCallback(
    (msg) => toast.error(msg, { duration: 6000 }),
    []
  );

  const notifySuccess = useCallback(
    () => toast.success("Transaction completed."),
    []
  );

  const fetchTokenBalance = useCallback(async () => {
    if (name && walletAddress) {
      try {
        const bal = await getTokenBalance(name, walletAddress);
        const fBal = ethers.utils.formatUnits(bal.toString(), 18);
        setBalance(fBal.toString());
      } catch (error) {
        notifyError("Error fetching token balance");
      }
    } else {
      setBalance("-");
    }
  }, [name, walletAddress, notifyError]);

  const fetchTokenAddress = useCallback(async () => {
    try {
      const address = await getTokenAddress(name);
      setTokenAddress(address);
    } catch (error) {
      notifyError("Error fetching token address");
    }
  }, [name, notifyError]);

  useEffect(() => {
    fetchTokenBalance();
    fetchTokenAddress();
  }, [fetchTokenBalance, fetchTokenAddress]);

  return (
    <div className="flex mx-2">
      <div className="flex items-center bg-zinc-900 text-zinc-300 w-fit p-2 px-3 rounded-l-lg">
        <p className="text-sm">{name}</p>
        <p className="bg-zinc-800 p-0.5 px-3 ml-3 rounded-lg text-zinc-100">
          {balance}
        </p>
      </div>

      <div className="flex items-center p-2 px-2 bg-[#2172e5] rounded-r-lg">
        <copyIcon.icon
          className="h-6 cursor-pointer"
          onClick={() => {
            navigator.clipboard.writeText(tokenAddress);
            setCopyIcon({ icon: ClipboardCheckIcon });
          }}
        />
      </div>

      {txPending && <TransactionStatus />}

      <Toaster />
    </div>
  );
};
