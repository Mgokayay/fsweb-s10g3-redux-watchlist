import {
  ADD_FAVORITE,
  FİRST_MOVIE,
  NEXT_MOVIE,
  PREV_MOVIE,
  REMOVE_FAVORITE,
} from "../actions/action";
import { movies } from "../movies";

const initialState = {
  sira: 0,
  movies: movies,
  favMovies: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case NEXT_MOVIE:
      return {
        ...state,
        sira: state.sira + 1,
      };
    case PREV_MOVIE:
      return {
        ...state,
        sira: state.sira - 1,
      };
    case FİRST_MOVIE:
      return {
        ...state,
        sira: initialState.sira, //ya da initialState.sira yerine sıfır yazılabilir
      };
    case ADD_FAVORITE:
      const oldMovie = state.favMovies.find(
        (movie) => movie.id === action.payload.id
      );
      if (oldMovie) {
        return state;
      } else {
        return {
          ...state,
          favMovies: [...state.favMovies, action.payload],
          movies: state.movies.filter(
            (movie) => movie.id !== action.payload.id
          ),
        };
      }

    case REMOVE_FAVORITE:
      return {
        ...state,
        favMovies: state.favMovies.filter(
          (movie) => movie.id !== action.payload
        ),
        movies: [
          ...state.movies,
          state.favMovies.find((movie) => movie.id === action.payload),
        ],
      };

    default:
      return state;
  }
};

export default rootReducer;
