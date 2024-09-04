import { configureStore } from '@reduxjs/toolkit';
import genresReducer from './genresSlice';
import userSlice from './userSlice';

const store = configureStore({
  reducer: {
    genres: genresReducer,
    user: userSlice
  },
});

export default store;
