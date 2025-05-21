import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import App from './components/app/app';
import './index.css';
import { store } from './services';

const root = ReactDOM.createRoot(document.querySelector('#root') as HTMLDivElement);

root.render(
  <Provider store={store}>
    <React.StrictMode>
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <App/>
      </BrowserRouter>
    </React.StrictMode>
  </Provider>
);

