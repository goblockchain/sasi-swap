import { ethers } from "ethers";
import CustomDexABI from "./CustomDex.json";
import CustomTokenABI from "./CustomToken.json";

export const tokenContract = async (address) => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const { ethereum } = window;

  if (ethereum) {
    const signer = provider.getSigner();

    const contractReader = new ethers.Contract(address, CustomTokenABI, signer);

    return contractReader;
  }
};

export const contract = async () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const { ethereum } = window;

  console.log("provider", provider);
  console.log("ethereum", ethereum);

  if (ethereum) {
    const signer = provider.getSigner();

    console.log("signer", await signer.getAddress());

    const contractReader = new ethers.Contract(
      "0xB437ad6fcb8d101B67d44bf3687083fb117d92eD",
      CustomDexABI.abi,
      signer
    );

    console.log("contractReader", contractReader.connect(signer));

    return contractReader;
  }
};
