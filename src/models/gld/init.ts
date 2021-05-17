import { approveWithDelayFx } from '.';
import { tokenContract } from '../../contracts';
import { toWei } from '../../utils';

function getUnlockTimestamp(datetime: string) {
  const timestamp = new Date(datetime).getTime();
  return Math.floor(timestamp / 1000);
}

approveWithDelayFx.use(async ({ to, amount, unlock, provider }) => {
  const value = toWei(amount);
  const unlockTimestamp = getUnlockTimestamp(unlock);

  const contract = tokenContract.connect(provider.getSigner());

  await contract.approveWithDelay(to, value, unlockTimestamp);
});
