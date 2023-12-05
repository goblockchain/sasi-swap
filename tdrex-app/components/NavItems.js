import React, { useState } from "react";
import { ArrowSmUpIcon } from "@heroicons/react/outline";

export const NavItems = () => {
  const SWAP = "Swap";
  const HOME = "Home";

  const [selectedNavItem, setSelectedNavItem] = useState(SWAP);

  return (
    <div className="bg-white-900 shadow-lg text-zinc-900 h-fit flex items-center justify-around rounded-full mx-6">
      <p
        className={getNavIconClassName(SWAP)}
        onClick={() => setSelectedNavItem(SWAP)}
      >
        {SWAP}
      </p>
      <p
        className={getNavIconClassName(HOME)}
        onClick={() => window.open("https://tdrex-home.vercel.app/", "_self")}
      >
        {HOME}
        <ArrowSmUpIcon className="h-4 rotate-45" />
      </p>
    </div>
  );

  function getNavIconClassName(name) {
    let className =
      "p-1 px-4 cursor-pointer border-[4px] text-zinc-600 border-transparent flex items-center";
    className +=
      name === selectedNavItem
        ? " bg-white-600 border-white-600 text-black font-bold rounded-full"
        : "";
    return className;
  }
};
