import { useWeb3React } from '@web3-react/core';
import Container from '../components/Container';
import TransferList from '../components/TransferList';
import Wallet from '../components/Wallet';

export default function Home() {
  const { account } = useWeb3React();
  const id = (account || '').toLowerCase();
  return (
    <Container>
      <Wallet />
      <TransferList where={{ to: id }} />
      <TransferList where={{ from: id }} />
    </Container>
  );
}
