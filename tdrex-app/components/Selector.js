import React, { useEffect, useState } from "react";

import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { DEFAULT_VALUE } from "../utils/SupportedCoins";
import { getTdrexCurrencyIcon } from "../currencies/tdrexCurrencyLogos";

export const Selector = ({
  defaultValue,
  ignoreValue,
  setToken,
  id,
  currencies,
}) => {
  const menu = currencies?.map((item) => ({ ...item, key: item.symbol }));

  const [selectedItem, setSelectedItem] = useState();
  const [menuItems, setMenuItems] = useState(getFilteredItems(ignoreValue));

  function getFilteredItems(ignoreValue) {
    return menu?.filter((item) => {
      if (typeof ignoreValue === "string") {
        return item["symbol"] !== ignoreValue;
      }
      return item["symbol"] !== ignoreValue?.symbol;
    });
  }

  useEffect(() => {
    setSelectedItem(defaultValue);
  }, [defaultValue]);

  useEffect(() => {
    setMenuItems(getFilteredItems(ignoreValue));
  }, [ignoreValue, getFilteredItems]);

  return (
    <Dropdown showArrow>
      <DropdownTrigger>
        <Button
          color={selectedItem === DEFAULT_VALUE ? "primary" : "default"}
          variant="solid"
        >
          <div className="flex items-center gap-1">
            {selectedItem?.symbol && (
              <div
                style={{
                  backgroundImage: `url(${getTdrexCurrencyIcon(
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
                  backgroundImage: `url(${getTdrexCurrencyIcon(item?.symbol)})`,
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
