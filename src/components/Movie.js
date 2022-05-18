import React from "react";
import { useParams, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { deleteMovie, addMovie } from "./../actions/movieActions";
import { addFavorite } from "./../actions/favoritesActions";

const Movie = (props) => {
  const { id } = useParams();
  const { push } = useHistory();

  const { movies, deleteMovie, addMovie, displayFavorites, addFavorite } =
    props;

  const movie = movies.find((movie) => movie.id === Number(id));

  const handleDeleteClick = () => {
    deleteMovie(movie.id);
    push("/movies/");
  };

  const handleFavoriteClick = () => {
    addFavorite({
      title: movie.title,
      id: movie.id,
    });
  };
  return (
    <div className="modal-page col">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h4 className="modal-title">{props.title} Details</h4>
          </div>
          <div className="modal-body">
            <div className="flexContainer">
              <section className="movie-details">
                <div>
                  <label>
                    Title: <strong>{props.title}</strong>
                  </label>
                </div>
                <div>
                  <label>
                    Director: <strong>{props.director}</strong>
                  </label>
                </div>
                <div>
                  <label>
                    Genre: <strong>{props.genre}</strong>
                  </label>
                </div>
                <div>
                  <label>
                    Metascore: <strong>{props.metascore}</strong>
                  </label>
                </div>
                <div>
                  <label>Description:</label>
                  <p>
                    <strong>{props.description}</strong>
                  </p>
                </div>
              </section>

              <section>
                {displayFavorites && (
                  <span
                    onClick={handleFavoriteClick}
                    className="m-2 btn btn-dark"
                  >
                    Favorite
                  </span>
                )}
                <span className="delete">
                  <input
                    type="button"
                    className="m-2 btn btn-danger"
                    value="Delete"
                    onClick={handleDeleteClick}
                  />
                </span>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    movies: state.movieReducer.movies,
    displayFavorites: state.favoritesReducer.displayFavorites,
  };
};

export default connect(mapStateToProps, { deleteMovie, addFavorite })(Movie);
