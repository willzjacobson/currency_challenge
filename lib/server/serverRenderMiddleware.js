import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { renderToString } from 'react-dom/server';
import template from 'lodash/template';
import fs from 'fs';

import App from '../client/components/App';
import reducer from '../client/reducers';

const readModuleFile = (path, cb) => {
  try {
    const filename = require.resolve(path);
    fs.readFile(filename, 'utf8', cb);
  } catch (e) {
    cb(e);
  }
};

export const handleRender = (req, res) => {
  console.log('REQREQREQREQREQREQREQREQREQREQREQ', req);
  const store = createStore(reducer);

  const html = renderToString(
    <Provider>
      <App />
    </Provider>
  );

  const preloadedState = store.getState().toJS();

  readModuleFile('../client/index.html', (err, index) => {
    const templated = template(index)({
      html,
      preloadedState: JSON.stringify(preloadedState).replace(/</g, '\\u003c'), // prevents unsafe DOM injection
    });

    console.log('templated', templated);

    res.send(templated);
  });
};

export const handleRender2 = (req, res) => {
  res.render('index', { answer: 42 });
};

/*
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { Provider } from 'react-redux';

import configureStore from 'store/configureStore';
import App from 'components/App';

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

*/
