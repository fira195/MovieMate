import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
export const fetchGenres = createAsyncThunk('genres/fetchGenres',  async (_, { getState }) => {
    const { genres } = getState().genres;
    // Return cached genres if available
    if (genres.length > 0) {
      return genres;
    }
    // Delay the fetch by 5 seconds
    await new Promise((resolve) => setTimeout(resolve, 5000));
  
    const response = await fetch('https://api.themoviedb.org/3/genre/movie/list?language=en-US', {
      headers: {
        accept: 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0NGFjODFlNTVkYTQwZWU1YjljNGI4M2M3ODU1OTdlYyIsIm5iZiI6MTcyMjcwNzQwNS4wMjUxMzUsInN1YiI6IjY2YWUzMDc0ZDAwNmY3OTFmZjViNGRhMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.bVpvqXGyOYlyCrX_N9EbFbFlbTrmq1NbvzZ5KZTvMMc',
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
