import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchGenres } from '../redux/genresSlice';

function GenreProvider({ children }) {
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.genres);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchGenres());
    }
  }, [status, dispatch]);

  return children;
}

export default GenreProvider;
