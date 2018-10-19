import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import configureStore from '../store';
import App from '../components/App';

const store = configureStore();

const serverRender = () => {
  return ReactDOMServer.renderToString(
    <Provider store={store}>
      <MemoryRouter>
        <App />
      </MemoryRouter>
    </Provider>
  );
};

export default serverRender;
