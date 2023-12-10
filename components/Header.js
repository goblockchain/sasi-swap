import React, { useEffect, useState } from "react";
import { TokenBalance } from "./TokenBalance";

import { ConnectButton } from "@rainbow-me/rainbowkit";

import { Toaster } from "react-hot-toast";
import { NavItems } from "./NavItems";
import Image from "next/image";

import tdrexLogo from "../public/assets/main_logo.png";

export const Header = () => {
  return (
    <div className="fixed left-0 top-0 w-full px-8 py-4 flex items-center justify-between">
      <div className="flex items-center">
        <Image alt="Tdrex Logo" src={tdrexLogo} className="w-12 shrink-0" />
        <NavItems />
      </div>

      <div className="flex text-zinc-900">
        <ConnectButton className="mx-8" accountStatus={"full"} />
      </div>

      <Toaster />
    </div>
  );
};
