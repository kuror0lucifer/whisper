import { createSlice } from '@reduxjs/toolkit';
import { GameState } from './types.type';

const initialState: GameState = {
  game: {
    nsuid: '',
    title: '',
    productImage: '',
    objectID: '',
    availability: '',
    sku: '',
    description: '',
    price: {
      finalPrice: 0,
      regPrice: 0,
      salePrice: 0,
      percentOff: 0,
    },
  },
};

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setGameData: (state, action) => {
      if (action.payload) {
        state.game = { ...state.game, ...action.payload };

        if (action.payload.price) {
          state.game.price = {
            ...state.game.price,
            ...action.payload.price,
          };
        }
      }
    },
    resetGameData: state => {
      state.game = initialState.game;
    },
  },
});

export const { setGameData, resetGameData } = gameSlice.actions;
export default gameSlice.reducer;
