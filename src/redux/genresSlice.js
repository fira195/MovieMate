import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
export const fetchGenres = createAsyncThunk('genres/fetchGenres',  async (_, { getState }) => {
    const { genres } = getState().genres;
    // Return cached genres if available
    if (genres.length > 0) {
      return genres;
    }
    // Delay the fetch by 5 seconds
    await new Promise((resolve) => setTimeout(resolve, 1000));
  
    const response = await fetch('http://localhost:3000/api/movies/genre', {
      method:'GET',
      headers: {
        accept: 'application/json',
        Authorization:
          `Bearer ${localStorage.getItem('accessToken')}`,
      },
    });
  
    const data = await response.json();
    return data.genres;
  });
  
// Create the genres slice
const genresSlice = createSlice({
  name: 'genres',
  initialState: {
    genres: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGenres.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchGenres.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.genres = action.payload;
      })
      .addCase(fetchGenres.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default genresSlice.reducer;
