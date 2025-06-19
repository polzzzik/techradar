import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '@app/App';
import { WithRouter, WithStore, WithAdmiral } from '@app/providers';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <WithStore>
      <WithRouter>
        <WithAdmiral>
          <App />
        </WithAdmiral>
      </WithRouter>
    </WithStore>
  </React.StrictMode>
);
