import React, { useState, useEffect, useRef } from "react";
import StarRating from "./StarRating";
import Loader from "./Loader";
import useKey from "./useKey";

const KEY = import.meta.env.VITE_OMDB_API_KEY;

function MovieDetails({ selectedId, onCloseMovie, onAddWatched, watched }) {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState("");

  //   destructuring data:
  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    Plot: plot,
    imdbRating,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movie;

  //   const isWatched = watched.map((movie) => movie.imdbID).includes(selectedId);
  const isWatched = watched.some((movie) => movie.imdbID === selectedId);
  const watchedUserRating = watched.find(
    (movie) => movie.imdbID === selectedId
  )?.userRating;

  //   ref for checking no of ratings
  const countRef = useRef(0);

  useEffect(() => {
    if (userRating) countRef.current = countRef.current++;
  }, [userRating]);

  const handleAdd = () => {
    const newWatchedMovie = {
      imdbID: selectedId,
      title,
      year,
      poster,
      imdbRating: Number(imdbRating),
      runtime: Number(runtime.split(" ").at(0)),
      userRating,
      countRatingDecisions: countRef.current,
    };
    onAddWatched(newWatchedMovie);
    onCloseMovie();
  };

  //   handling keypress event
  useKey("Escape", onCloseMovie);

  //   useEffect(() => {
  //     const callback = (e) => {
  //       if (e.code === "Escape") {
  //         onCloseMovie();
  //         console.log("CLOSING");
  //       }
  //     };

  //     document.addEventListener("keydown", callback);

  //     return () => {
  //       document.removeEventListener("keydown", callback); //clean up
  //     };
  //   }, [onCloseMovie]);

  useEffect(() => {
    const getMovieDetails = async () => {
      setIsLoading(true);
      const res = await fetch(
        `https://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`
      );
      const data = await res.json();
      //   console.log(data);
      setMovie(data);
      setIsLoading(false);
    };
    getMovieDetails();
  }, [selectedId]);

  useEffect(() => {
    if (!title) return;
    document.title = `Movie | ${title}`;

    return () => {
      document.title = "usePopcorn";
      //   console.log(`clean up effect for movie ${title}`);
    };
  }, [title]);

  return (
    <div className="details">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <header>
            <button className="btn-back" onClick={onCloseMovie}>
              &larr;
            </button>
            <img src={poster} alt={`Poster of ${movie}movie`} />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>{genre}</p>
              <p>
                <span>⭐{imdbRating} IMDB Rating</span>
              </p>
            </div>
          </header>
          <section>
            <div className="rating">
              {!isWatched ? (
                <>
                  <StarRating
                    maxRating={10}
                    size={22.5}
                    onSetRating={setUserRating}
                  />

                  {userRating > 0 && (
                    <button className="btn-add" onClick={handleAdd}>
                      + Add to list
                    </button>
                  )}
                </>
              ) : (
                <h3>
                  You rated this movie {watchedUserRating} <span>⭐ </span>
                </h3>
              )}
            </div>
            <p>
              <em>{plot}</em>
            </p>
            <p>Starring {actors}</p>
            <p>Directed by {director}</p>
          </section>
        </>
      )}
    </div>
  );
}

export default MovieDetails;
