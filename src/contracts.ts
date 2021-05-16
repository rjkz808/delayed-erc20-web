import { ethers } from 'ethers';

export const tokenContract = new ethers.Contract(
  process.env.REACT_APP_GLD_ADDRESS || ethers.constants.AddressZero,
  [
    'function approveWithDelay(address spender, uint256 amount, uint256 unlockTimestamp)',
    'function transferFrom(address sender, address recipient, uint256 amount)',
    'event Transfer(address indexed from, address indexed to, uint256 value)',
    'event DelayedApproval(address indexed owner, address indexed spender, uint256 value, uint256 unlockTimestamp)',
  ]
);
