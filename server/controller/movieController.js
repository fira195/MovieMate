import Movie from "../models/movieModel.js";

// Fetch movies
export const getMovies = async (req, res) => {
  // Implement fetching logic
};

export const getGenres = async (req, res) => {
  try {
    const response = await fetch(
      "https://api.themoviedb.org/3/genre/movie/list?language=en-US",
      {
        headers: {
          accept: "application/json",
          Authorization:
            `Bearer ${process.env.TMBD_KEY}`,
        },
      }
    );
    res.status(200).json(response);
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Server Error" });
  }
};
