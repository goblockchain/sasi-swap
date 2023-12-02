import React, { useEffect, useState } from "react";

import { Dropdown, Image } from "@nextui-org/react";
import {
  COINA,
  COINB,
  COINC,
  DEFAULT_VALUE,
  ETH,
} from "../utils/SupportedCoins";
import {
  tdrexAssetsData,
  tdrexCBDCsData,
} from "../currencies/tdrexCurrencyList";
import { getTdrexCurrencyIcon } from "../currencies/tdrexCurrencyLogos";

export const Selector = ({ defaultValue, ignoreValue, setToken, id }) => {
  // const menu = [
  //   { key: ETH, name: ETH },
  //   { key: COINA, name: COINA },
  //   { key: COINB, name: COINB },
  //   { key: COINC, name: COINC },
  // ];

  const menu = [...tdrexAssetsData, ...tdrexCBDCsData];

  const [selectedItem, setSelectedItem] = useState();
  const [menuItems, setMenuItems] = useState(getFilteredItems(ignoreValue));

  function getFilteredItems(ignoreValue) {
    return menu.filter((item) => item["symbol"] !== ignoreValue);
  }

  useEffect(() => {
    setSelectedItem(defaultValue);
  }, [defaultValue]);

  useEffect(() => {
    setMenuItems(getFilteredItems(ignoreValue));
  }, [ignoreValue]);

  return (
    <Dropdown>
      <Dropdown.Button
        css={{
          backgroundColor:
            selectedItem === DEFAULT_VALUE ? "#2172e5" : "#2c2f36",
        }}
      >
        {selectedItem}
      </Dropdown.Button>
      <Dropdown.Menu
        aria-label="Dynamic Actions"
        items={menuItems}
        onAction={(key) => {
          setSelectedItem(key);
          setToken(key);
        }}
      >
        {(item) => (
          <Dropdown.Item
            aria-label={id}
            key={item.symbol}
            color={item.symbol === "delete" ? "error" : "default"}
          >
            {item.name}
          </Dropdown.Item>
        )}
      </Dropdown.Menu>
    </Dropdown>
  );
};
