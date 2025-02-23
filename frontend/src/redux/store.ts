import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import gamesReducer from './games/slice';
import gameReducer from './game/slice';
import userReducer from './user/slice';
import storage from 'redux-persist/lib/storage';

const userPersistConfig = {
  key: 'user',
  storage,
};

const gamePersistConfig = {
  key: 'game',
  storage,
};

const persistedUserReducer = persistReducer(userPersistConfig, userReducer);
const persistedGameReducer = persistReducer(gamePersistConfig, gameReducer);

export const store = configureStore({
  reducer: {
    games: gamesReducer,
    user: persistedUserReducer,
    game: persistedGameReducer,
  },
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
