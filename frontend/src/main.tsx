import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store.ts';

import './assets/styles/index.css';
import App from './App.tsx';

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <BrowserRouter>
      <StrictMode>
        <Routes>
          <Route
            path='*'
            element={<App />}
          />
          <Route />
        </Routes>
      </StrictMode>
    </BrowserRouter>
  </Provider>
);
