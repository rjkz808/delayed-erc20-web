import { MouseEvent, useState } from 'react';
import styled from 'styled-components';
import Skeleton from 'react-loading-skeleton';
import Badge from './Badge';
import { useWeb3React } from '@web3-react/core';
import { ethers } from 'ethers';
import { useStore } from 'effector-react';
import { toast } from 'react-toastify';
import { Account, DelayedTransfer } from '../generated/graphql';
import TransferCountdown from './TransferCountdown';
import { toEther } from '../utils';
import Button from './Button';
import { tokenContract } from '../contracts';
import { useTimer } from '../hooks/useTimer';
import { $blockTimestamp } from '../models/block';

export interface TransferProps extends Omit<DelayedTransfer, 'from' | 'to'> {
  from: Pick<Account, 'id'>;
  to: Pick<Account, 'id'>;
  loading?: boolean;
}

const TransferContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 0;
  cursor: pointer;

  &:not(:last-child) {
    border-bottom: 3px solid #616161;
  }
`;

const TransferLeftPane = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const TransferStatusContainer = styled.div`
  min-width: 100px;
`;

const TransferStatus = styled(Badge)`
  margin-right: 30px;
`;

const TransferStatusSkeleton = styled(Skeleton)`
  width: 70px;
  margin-right: 30px;
  height: 42px;
`;

const TransferAmount = styled.p`
  color: ${(props) => props.theme.colors.primary};
  font-family: ${(props) => props.theme.fonts.primary};
  font-size: 22px;
  font-weight: 900;
  text-transform: uppercase;
`;

const TransferTime = styled.div`
  color: ${(props) => props.theme.colors.foreground};
  font-family: ${(props) => props.theme.fonts.primary};
  font-size: 22px;
  text-align: right;
`;

const TransferAddress = styled.p`
  font-family: ${(props) => props.theme.fonts.mono};
`;

export default function Transfer(props: TransferProps) {
  const { account, library } = useWeb3React<ethers.providers.Web3Provider>();
  const [loading, setLoading] = useState(false);
  const blockTimestamp = useStore($blockTimestamp);
  const timeLeft = useTimer(props.unlockTimestamp || 0);

  const isIncoming = props.to.id === account?.toLowerCase();

  const handleContainerClick = () => {
    if (!props.loading) {
      const baseUrl = process.env.REACT_APP_ETHERSCAN_URL;
      const url = `${baseUrl}/tx/${props.transactionHash}`;
      window.open(url, '_blank')?.focus();
    }
  };

  const handleCollectClick = async (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (!account || !library || !props.from) {
      return;
    }

    const contract = tokenContract.connect(library.getSigner());
    const from = ethers.utils.getAddress(props.from?.id);

    setLoading(true);
    try {
      const tx = await contract.transferFrom(from, account, props.amount);
      await tx.wait();
    } catch {
      toast.error('Failed to collect GLD.');
    } finally {
      setLoading(false);
    }
  };

  const isLocked = blockTimestamp < props.unlockTimestamp;

  return (
    <TransferContainer role="button" onClick={handleContainerClick}>
      <TransferLeftPane>
        <TransferStatusContainer>
          {!props.loading ? (
            <TransferStatus variant={isIncoming ? 'success' : 'info'}>
              {isIncoming ? 'in' : 'out'}
            </TransferStatus>
          ) : (
            <TransferStatusSkeleton />
          )}
        </TransferStatusContainer>
        <TransferAmount>
          {!props.loading ? toEther(props.amount) : <Skeleton width="40px" />}{' '}
          GLD
        </TransferAmount>
      </TransferLeftPane>
      <TransferAddress>
        {!props.loading ? (
          isIncoming ? (
            ethers.utils.getAddress(props.from.id)
          ) : (
            ethers.utils.getAddress(props.to.id)
          )
        ) : (
          <Skeleton width="200px" />
        )}
      </TransferAddress>
      <TransferTime>
        {!props.loading ? (
          !timeLeft ? (
            <Button
              disabled={!isIncoming || loading || isLocked}
              small
              onClick={handleCollectClick}
            >
              {isIncoming && !isLocked
                ? loading
                  ? 'Loading...'
                  : 'Collect'
                : 'Pending'}
            </Button>
          ) : (
            <TransferCountdown timeLeft={timeLeft} />
          )
        ) : (
          <Skeleton width="100px" />
        )}
      </TransferTime>
    </TransferContainer>
  );
}
