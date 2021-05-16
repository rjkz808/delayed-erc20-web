import { ethers } from 'ethers';

export function toEther(value: ethers.BigNumberish) {
  const amount = parseFloat(ethers.utils.formatEther(value));
  return parseFloat(amount.toFixed(4));
}

export function toWei(value: ethers.BigNumberish) {
  return ethers.utils.parseEther(value.toString());
}
