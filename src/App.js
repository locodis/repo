import { useEffect, useState } from "react";
import Logo from "./logo.svg";
import "./App.css";
import SearchIcon from "./search.png";
import MovieCard from "./MovieCard";

const API_URL = "http://www.omdbapi.com?apikey=process.env.REACT_APP_API_KEY";// noktalar olan bölüm you need an api key from omdb APİ 

const movie1 =
{
  "Title": "The Amazing Spiderman 2 Webb Cut",
  "Year": "2021",
  "imdbID": "tt18351128",
  "Type": "movie",
  "Poster": "https://m.media-amazon.com/images/M/MV5BYzYzZDViNWYtNWViMS00NDMxLThlN2YtZjFkOWMwODkzNzhiXkEyXkFqcGdeQXVyMTUwMzM4NzU0._V1_SX300.jpg"
}


const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const searchMovies = async (Title) => {
    const response = await fetch(`${API_URL}&s=${Title}`);
    const data = await response.json();

    setMovies(data.Search);
  };

  useEffect(() => {
    searchMovies("Spiderman");
  }, []);

  return (
    <div className="app">
      <h1>MovieLand</h1>
      <div className="search">
        <input placeholder="Search for movies"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <img src={SearchIcon}
          alt="search"
          onClick={() => searchMovies(searchTerm)}
        />
      </div>

      {
        movies?.length > 0
          ? (
            <div className="container">
            {movies.map((movie) => (
              <MovieCard movie={movie}  />
            ))}
            </div>
          ) :
          (
            <div className="empty">
            <p>No movies found.</p>
            </div>
          )

      }



    </div>
  );
};

export default App;
