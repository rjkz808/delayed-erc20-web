import { createEffect } from 'effector';
import { Web3Provider } from '@ethersproject/providers';

export interface ApproveWithDelayOptions {
  to: string;
  amount: number;
  unlock: string;
  provider: Web3Provider;
}

export const approveWithDelayFx = createEffect<ApproveWithDelayOptions, void>();
