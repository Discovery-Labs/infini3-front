import { ethers } from "ethers";

function hexToString(balance: ethers.BigNumber) {
  return ethers.utils.formatEther(balance);
}

export { hexToString };
