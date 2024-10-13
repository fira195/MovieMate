
export const fetchMovieDetails = async (uri, options, next) => {
    try {
      const response = await fetch(uri, options);
      const jsonResponse = await response.json();
      return jsonResponse;
    } catch (e) {
      next(e)
    }
  };