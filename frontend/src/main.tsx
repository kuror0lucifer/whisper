import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store.ts';

import './assets/styles/index.css';
import App from './App.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { LoginPage } from './pages/LoginPage/components/LoginPage.tsx';
import { RegisterPage } from './pages/RegisterPage/components/RegisterPage.tsx';
import { AuthProvider } from './context/AuthContext.tsx';
import { ProfilePage } from './pages/ProfilePage/components/ProfilePage.tsx';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor } from './redux/store.ts';
import { GamePage } from './pages/GamePage/components/GamePage.tsx';
import { ProfileSettingsContent } from './pages/ProfilePage/pages/SettingsPage/components/ProfileSettingsContent.tsx';
import { Wishlist } from './pages/ProfilePage/pages/WishlistPage/components/Wishlist.tsx';
import { Friends } from './pages/ProfilePage/pages/FriendsPage/components/Friends.tsx';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <PersistGate
    loading={null}
    persistor={persistor}
  >
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <BrowserRouter>
            <StrictMode>
              <Routes>
                <Route
                  path='/all-discounts'
                  element={<App />}
                />
                <Route
                  path='/all-discounts/search/:query?/page/:page?'
                  element={<App />}
                />
                <Route
                  path='/login'
                  element={<LoginPage />}
                />
                <Route
                  path='/register'
                  element={<RegisterPage />}
                />
                <Route
                  path='/profile'
                  element={<ProfilePage />}
                >
                  <Route
                    index
                    element={null}
                  />
                  <Route
                    path='settings'
                    element={<ProfileSettingsContent />}
                  />
                  <Route
                    path='wishlist'
                    element={<Wishlist />}
                  />
                  <Route
                    path='friends'
                    element={<Friends />}
                  />

                  <Route
                    path='*'
                    element={<ProfilePage />}
                  />
                </Route>
                <Route
                  path='/game/:nsuid/:title'
                  element={<GamePage />}
                />
              </Routes>
            </StrictMode>
          </BrowserRouter>
        </Provider>
      </QueryClientProvider>
    </AuthProvider>
  </PersistGate>
);
