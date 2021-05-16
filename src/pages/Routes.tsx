import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './Home';
import NewDelayedTransfer from './NewDelayedTransfer';
import NotFound from './NotFound';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/delayed-transfers/new" component={NewDelayedTransfer} />
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
}
