import React from "react"; //you can put more component in application
import axios from "axios";
import Movie from "../components/Movie";
import "./Home.css";

class Home extends React.Component {
  state = {
    isLoading: true,
    movies: [],
  };

  getMoives = async () => {
    const {
      data: {
        data: { movies },
      },
    } = await axios.get(
      "https://yts.mx/api/v2/list_movies.json?sort_by=rating"
    );
    this.setState({ movies, isLoading: false });
  };
  // this.setState(movies : movies) one from state, one from json
  // potato.data.data.movies >> es6 form {data :{data:{movies}}}

  componentDidMount() {
    this.getMoives();
  }

  render() {
    const { isLoading, movies } = this.state;
    return (
      <section className="container">
        {isLoading ? (
          <div className="Loading">
            <span className="Loading__text">Loading,,,</span>
          </div>
        ) : (
          <div className="movies">
            {movies.map((movie) => (
              <Movie
                id={movie.id}
                key={movie.id}
                year={movie.year}
                title={movie.title}
                summary={movie.summary}
                poster={movie.medium_cover_image}
                genres={movie.genres}
              />
            ))}
          </div>
        )}
      </section>
    );
  }
}

export default Home;
