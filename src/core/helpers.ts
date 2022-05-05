import { ethers } from "ethers";

function capitalize([first, ...rest]: string) {
  return first.toUpperCase() + rest.join("").toLowerCase();
}

function convertToKebabCase(string: string) {
  return string.replace(/\s+/g, "-").toLowerCase();
}

function hexToString(balance: ethers.BigNumber) {
  return ethers.utils.formatEther(balance);
}

export { capitalize, convertToKebabCase, hexToString };
