import { useEffect } from 'react';
import { useWeb3React } from '@web3-react/core';
import { ThemeProvider } from 'styled-components';
import { Reset } from 'styled-reset';
import { SkeletonTheme } from 'react-loading-skeleton';
import { Web3Provider } from '@ethersproject/providers';
import { ToastProvider } from 'react-toast-notifications';
import { useStore } from 'effector-react';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import MaterialThemeProvider from '@material-ui/styles/ThemeProvider';
import { ToastContainer } from 'react-toastify';

import { MetaMask } from './connectors';
import GlobalStyle from './components/GlobalStyle';
import Loading from './components/Loading';
import Routes from './pages/Routes';
import theme from './theme';
import materialTheme from './material-theme';
import { $blockLoaded, fetchBlockFx } from './models/block';

import 'react-toastify/dist/ReactToastify.css';

export default function App() {
  const { active, activate, account, library } = useWeb3React<Web3Provider>();
  const lastBlockLoaded = useStore($blockLoaded);

  useEffect(() => {
    if (!active) {
      activate(MetaMask);
    }
  }, [active, activate]);

  useEffect(() => {
    if (library) {
      fetchBlockFx({ provider: library });
    }
  }, [library]);

  const isLoading = !active || !account || !lastBlockLoaded;

  return (
    <ThemeProvider theme={theme}>
      <Reset />
      <GlobalStyle />
      <ToastContainer hideProgressBar />
      <SkeletonTheme color="#616161" highlightColor="#757575">
        <ToastProvider>
          <MaterialThemeProvider theme={materialTheme}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              {!isLoading ? <Routes /> : <Loading />}
            </MuiPickersUtilsProvider>
          </MaterialThemeProvider>
        </ToastProvider>
      </SkeletonTheme>
    </ThemeProvider>
  );
}
