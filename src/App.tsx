import React from 'react';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import Routes from './routes';
import GlobalStyle from './styles/global';

const history = createBrowserHistory();
const App: React.FC = () => (
  <>
    <Router history={history}>
      <Routes />
    </Router>
    <GlobalStyle />
  </>
);

export default App;
