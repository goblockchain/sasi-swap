import React, { useEffect, useState, useCallback } from "react";

import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { DEFAULT_VALUE } from "../utils/SupportedCoins";
import { getSasiCurrencyIcon } from "../currencies/sasiCurrencyLogos";

export const Selector = ({
  defaultValue,
  ignoreValue,
  setToken,
  id,
  currencies,
}) => {
  const menu = currencies?.map((item) => ({ ...item, key: item.symbol }));

  const [selectedItem, setSelectedItem] = useState();
  const getFilteredItems = useCallback(
    (ignoreValue) => {
      return menu?.filter((item) => {
        if (typeof ignoreValue === "string") {
          return item["symbol"] !== ignoreValue;
        }
        return item["symbol"] !== ignoreValue?.symbol;
      });
    },
    [menu]
  );

  const [menuItems, setMenuItems] = useState(getFilteredItems(ignoreValue));

  useEffect(() => {
    setSelectedItem(defaultValue);
  }, [defaultValue]);

  useEffect(() => {
    setMenuItems(getFilteredItems(ignoreValue));
  }, [ignoreValue]);

  return (
    <Dropdown showArrow>
      <DropdownTrigger>
        <Button
          className={`text-white ${
            selectedItem === DEFAULT_VALUE ? "bg-[#000]" : "bg-[#C10000]"
          }`}
          variant="solid"
        >
          <div className="flex items-center gap-1  px-5">
            {selectedItem?.symbol && (
              <div
                style={{
                  backgroundImage: `url(${getSasiCurrencyIcon(
                    selectedItem?.symbol
                  )})`,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                  backgroundSize: "contain",
                  width: "24px",
                  height: "24px",
                  marginRight: "8px",
                  borderRadius: "50%",
                  flexShrink: 0,
                }}
              />
            )}
            <p className="whitespace-nowrap">
              {selectedItem?.symbol ?? selectedItem}
            </p>
          </div>
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        variant="solid"
        color="default"
        aria-label="Dynamic Actions"
        items={menuItems}
        onAction={(symbol) => {
          const item = menuItems.find((item) => item.symbol === symbol);
          setSelectedItem(item);
          setToken(item);
        }}
      >
        {(item) => (
          <DropdownItem aria-label={id} key={item.symbol}>
            <div className="flex items-center gap-1">
              <div
                style={{
                  backgroundImage: `url(${getSasiCurrencyIcon(item?.symbol)})`,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                  backgroundSize: "contain",
                  width: "24px",
                  height: "24px",
                  marginRight: "8px",
                  borderRadius: "50%",
                }}
              />
              <p style={{ color: "#000" }}>{item.name}</p>
            </div>
          </DropdownItem>
        )}
      </DropdownMenu>
    </Dropdown>
  );
};
