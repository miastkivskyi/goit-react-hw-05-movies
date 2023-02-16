import axios from 'axios';

const API_KEY = 'c3e139e00d2caf000514e4525cc32cbe';
const baseURL = 'https://api.themoviedb.org/3';

//Тренди///
export const findAllMovies = async () => {
  try {
    const response = await axios.get(
      `${baseURL}/trending/all/day?api_key=${API_KEY}`
    );
    return response.data.results;
  } catch (error) {
    console.log(error);
  }
};

///Пошук детальної інфо///
export const findMoviesbyID = async id => {
  try {
    const response = await axios.get(
      `${baseURL}/movie/${id}?api_key=${API_KEY}&language=en-US`
    );

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

///Акторський склад////
export const findMoviesCast = async id => {
  try {
    const response = await axios.get(
      `${baseURL}/movie/${id}/credits?api_key=${API_KEY}&language=en-US`
    );
    return response.data.cast;
  } catch (error) {
    console.log(error);
  }
};

////Ревю////
export const findMoviesReviews = async id => {
  try {
    const response = await axios.get(
      `${baseURL}/movie/${id}/reviews?api_key=${API_KEY}&page=1&language='en-US'`
    );
    return response.data.results;
  } catch (error) {
    console.log(error);
  }
};

////////Пошук////////////
export const searchFilm = async query => {
  try {
    const response = await axios.get(
      `${baseURL}/search/movie?api_key=${API_KEY}&query=${query}&language=en-US`
    );
    return response.data.results;
  } catch (error) {
    console.log(error);
  }
};
