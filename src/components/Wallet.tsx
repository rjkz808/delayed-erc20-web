import styled from 'styled-components';
import Identicon from 'react-identicons';
import Skeleton from 'react-loading-skeleton';
import { useHistory } from 'react-router-dom';
import { useWeb3React } from '@web3-react/core';
import { ethers } from 'ethers';
import Button from './Button';
import Panel from './Panel';
import { useGetAccountQuery } from '../generated/graphql';
import { toEther } from '../utils';

const AVATAR_SIZE = 150;

const WalletContainer = styled(Panel)`
  display: flex;
  flex-direction: row;
  margin-bottom: 30px;
`;

const WalletAvatarContainer = styled.div`
  margin-right: 30px;
`;

const WalletAvatar = styled(Identicon)`
  object-fit: cover;
  width: ${AVATAR_SIZE}px;
  height: ${AVATAR_SIZE}px;
`;

const WalletInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
`;

const WalletBalance = styled.h1`
  color: ${(props) => props.theme.colors.primary};
  font-size: 48px;
  font-weight: 900;
  text-transform: uppercase;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const WalletAddress = styled.h3`
  font-family: ${(props) => props.theme.fonts.mono};
  font-size: 24px;
  color: ${(props) => props.theme.colors.foreground};
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

export default function Wallet() {
  const history = useHistory();
  const { account } = useWeb3React();

  const { data } = useGetAccountQuery({
    variables: {
      id: (account || ethers.constants.AddressZero).toLowerCase(),
    },
    pollInterval: 5000,
  });

  const handleClick = () => {
    history.push('/delayed-transfers/new');
  };

  return (
    <WalletContainer>
      <WalletAvatarContainer>
        {account ? (
          <WalletAvatar string={account} size={AVATAR_SIZE} fg="#e0e0e0" />
        ) : (
          <Skeleton width={AVATAR_SIZE} height={AVATAR_SIZE} />
        )}
      </WalletAvatarContainer>
      <WalletInfo>
        <WalletBalance>
          {data?.account?.balance ? (
            toEther(data.account.balance)
          ) : (
            <Skeleton width="50%" />
          )}{' '}
          GLD
        </WalletBalance>
        <WalletAddress>{account || <Skeleton width={605} />}</WalletAddress>
        <Button onClick={handleClick}>New transfer</Button>
      </WalletInfo>
    </WalletContainer>
  );
}
