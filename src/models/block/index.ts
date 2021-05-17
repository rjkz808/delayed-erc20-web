import { createEffect, createEvent, createStore, merge } from 'effector';
import { Block, Web3Provider } from '@ethersproject/providers';

interface BlockUpdate {
  blockNumber: number;
  provider: Web3Provider;
}

export const fetchBlockFx = createEffect<{ provider: Web3Provider }, Block>();
export const updateBlockFx = createEffect<BlockUpdate, Block>();

export const updateBlock = createEvent<BlockUpdate>();

export const $blockNumber = createStore(0);
export const $blockTimestamp = createStore(0);
export const $blockLoaded = createStore(false);

export const newBlock = merge([fetchBlockFx.doneData, updateBlockFx.doneData]);
