import { BigNumber, ethers } from "ethers";
import { contract, tokenContract } from "./contract";
import { toEth } from "./ether-utils";

// TODO -> change to swapERC20TokensForERC1155Tokens
/**
 *
 * uint amountIn,
 * uint amountOutMin,
 * address[] calldata path,
 * uint id, // ERC1155 id.
 * address to,
 * uint deadline
 *
 */
export async function swapERC20TokensForERC1155Tokens(
  amountIn,
  amountOut,
  path,
  erc1155Id,
  toAddress,
  deadline
) {
  try {
    const contractObj = await contract();
    const data = await contractObj.swapERC20TokensForERC1155Tokens(
      toWei(amountIn),
      toWei(amountOut),
      path,
      12345,
      toAddress,
      deadline
    );

    const receipt = await data.wait();
    return receipt;
  } catch (e) {
    return parseErrorMsg(e);
  }
}

export async function hasValidAllowance(owner, tokenName, amount) {
  try {
    const contractObj = await contract();
    const address = await contractObj.getTokenAddress(tokenName);

    const tokenContractObj = await tokenContract(address);
    const data = await tokenContractObj.allowance(
      owner,
      "0xc7a7651483c9a62d6f7b2baa86cd4708fab66017"
    );

    const result = BigNumber.from(data.toString()).gte(
      BigNumber.from(toWei(amount))
    );

    return result;
  } catch (e) {
    return parseErrorMsg(e);
  }
}

// TODO -> change to swapERC1155TokensForERC20Tokens
/**
 *
 * uint amountIn,
 * uint amountOutMin,
 * address[] calldata path,
 * uint id, // ERC1155 id.
 * address to,
 * uint deadline
 *
 */
export async function swapERC1155TokensForERC20Tokens(
  amountIn,
  amountOutMin,
  path,
  erc1155Id,
  toAddress,
  deadline
) {
  try {
    const contractObj = await contract();
    const data = await contractObj.swapERC1155TokensForERC20Tokens(
      toWei(amountIn),
      toWei(amountOutMin),
      path,
      12345,
      toAddress,
      deadline
    );

    const receipt = await data.wait();
    return receipt;
  } catch (e) {
    return parseErrorMsg(e);
  }
}

export async function swapTokenToToken(srcToken, destToken, amount) {
  try {
    const contractObj = await contract();
    const data = await contractObj.swapTokenToToken(
      srcToken,
      destToken,
      toWei(amount)
    );

    const receipt = await data.wait();
    return receipt;
  } catch (e) {
    return parseErrorMsg(e);
  }
}

export async function getTokenBalance(tokenName, address) {
  const contractObj = await contract();
  const balance = contractObj.getBalance(tokenName, address);
  return balance;
}

export async function getTokenAddress(tokenName) {
  try {
    const contractObj = await contract();
    const address = await contractObj.getTokenAddress(tokenName);
    return address;
  } catch (e) {
    return parseErrorMsg(e);
  }
}

export async function increaseAllowance(tokenName, amount) {
  try {
    const contractObj = await contract();
    const address = await contractObj.getTokenAddress(tokenName);

    const tokenContractObj = await tokenContract(address);
    const data = await tokenContractObj.approve(
      "0xc7a7651483c9a62d6f7b2baa86cd4708fab66017",
      toWei(amount)
    );

    const receipt = await data.wait();
    return receipt;
  } catch (e) {
    return parseErrorMsg(e);
  }
}

export async function getAmountOut(amountIn, tokenA, tokenB, erc1155Id) {
  console.log("amountIn", amountIn);
  const factoryAddress = "0xD10883F33C7DcF5D4eB0E4B823210478c65fB8D1";
  try {
    const contractObj = await contract();
    console.log("contractObj", contractObj);

    console.log("tokenA", tokenA, "tokenB", tokenB, "erc1155Id", erc1155Id);
    const reserves = await contractObj.getReserves(
      factoryAddress,
      tokenB.trim(),
      tokenA.trim(),
      12345
    );
    console.log("reserves", reserves);

    const [reserveIn, reserveOut] = reserves;

    console.log("reserveIn", toEth(reserveIn));
    console.log("reserveOut", toEth(reserveOut));

    const data = await contractObj.getAmountOut(
      toWei(amountIn),
      reserveIn,
      reserveOut
    );

    console.log("data", data);

    return toEth(data);
  } catch (e) {
    return parseErrorMsg(e);
  }
}

function toWei(amount) {
  const toWei = ethers.utils.parseUnits(amount.toString());
  return toWei.toString();
}

function parseErrorMsg(e) {
  const json = JSON.parse(JSON.stringify(e));
  return json?.reason || json?.error?.message;
}
