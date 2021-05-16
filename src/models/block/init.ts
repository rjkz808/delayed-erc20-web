import { forward } from 'effector';
import {
  $blockNumber,
  $blockTimestamp,
  fetchBlockFx,
  updateBlock,
  updateBlockFx,
  newBlock,
  $blockLoaded,
} from '.';

fetchBlockFx.use(async ({ provider }) => {
  const index = await provider.getBlockNumber();
  const block = await provider.getBlock(index);

  provider.on('block', (blockNumber: number) => {
    updateBlock({ blockNumber, provider });
  });

  return block;
});

forward({
  from: updateBlock,
  to: updateBlockFx,
});

updateBlockFx.use(async ({ blockNumber, provider }) => {
  const block = await provider.getBlock(blockNumber);
  return block;
});

$blockNumber.on(newBlock, (_, payload) => payload.number);
$blockTimestamp.on(newBlock, (_, payload) => payload.timestamp);

$blockLoaded.on(fetchBlockFx.done, () => true);
