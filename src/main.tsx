import React from 'react';
import ReactDOM from 'react-dom/client';
import Routing from './routing';
import './styles/base.sass';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Routing />
  </React.StrictMode>,
);
