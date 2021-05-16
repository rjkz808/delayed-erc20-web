import styled from 'styled-components';
import { ethers } from 'ethers';
import Panel from './Panel';
import Transfer from './Transfer';
import {
  DelayedTransfer_Filter,
  useGetDelayedTransfersQuery,
} from '../generated/graphql';
import { useWeb3React } from '@web3-react/core';

export interface TransferListProps {
  where?: DelayedTransfer_Filter;
}

const TransferListContainer = styled(Panel)`
  overflow: hidden;
  overflow-y: scroll;
  padding: 15px 30px;

  &:not(:last-child) {
    margin-bottom: 30px;
  }
`;

const TransferListContent = styled.div`
  overflow: hidden;
  overflow-y: scroll;
  scroll-behavior: smooth;
  min-height: 72px;
  max-height: 147px;
  padding-right: 30px;

  scrollbar-color: #9e9e9e;
  scrollbar-width: thin;

  &::-webkit-scrollbar {
    width: 6px;
    border-radius: 10px;
    background-color: #616161;
  }

  &::-webkit-scrollbar-thumb {
    width: 6px;
    border-radius: 10px;
    background-color: #9e9e9e;
  }
`;

const TransferListEmpty = styled.div`
  width: 100%;
  height: 72px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const emptyDelayedTransfer = {
  id: '',
  amount: '0',
  createdAt: 0,
  unlockTimestamp: 0,
  transactionHash: '',
  from: { id: ethers.constants.AddressZero },
  to: { id: ethers.constants.AddressZero },
};

export default function TransferList({ where = {} }: TransferListProps) {
  const { account } = useWeb3React();

  const { data, loading } = useGetDelayedTransfersQuery({
    variables: { where },
    pollInterval: 5000,
  });

  if (loading) {
    return (
      <TransferListContainer>
        <TransferListContent>
          {new Array<void>(2).fill().map((_, index) => (
            <Transfer {...emptyDelayedTransfer} key={index} loading />
          ))}
        </TransferListContent>
      </TransferListContainer>
    );
  }

  const items = data?.delayedTransfers.map((transfer) => (
    <Transfer {...transfer} key={transfer.id} />
  ));

  const isIncoming = account?.toLowerCase() === where.to;

  return (
    <TransferListContainer>
      <TransferListContent>
        {data?.delayedTransfers?.length ? (
          items
        ) : (
          <TransferListEmpty>
            You have no {isIncoming ? 'incoming' : 'outcoming'} transfers
          </TransferListEmpty>
        )}
      </TransferListContent>
    </TransferListContainer>
  );
}
