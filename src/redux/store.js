import { configureStore } from '@reduxjs/toolkit';
import genresReducer from './genresSlice';

const store = configureStore({
  reducer: {
    genres: genresReducer,
  },
});

export default store;
