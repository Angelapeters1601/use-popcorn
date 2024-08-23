import { useState, useEffect } from "react";

const KEY = import.meta.env.VITE_OMDB_API_KEY;

export function useMovies(query) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    // only fetch movies if query is 2 or more letters long
    if (query.length < 2) {
      setMovies([]);
      setError("");
      return;
    }
    // abort controller
    const controller = new AbortController();

    const fetchMovies = async () => {
      try {
        setIsLoading(true);
        setError("");
        const res = await fetch(
          `https://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
          { signal: controller.signal } //abort controller
        );
        if (!res.ok)
          throw new Error("Something went wrong with fetching movies");

        const data = await res.json();

        if (data.Response === "False") {
          throw new Error("Movie not found");
        }

        setMovies(data.Search);
        setError("");
      } catch (err) {
        // console.error(err.message);
        if (err.name !== "AbortError") {
          setError(err.message);
        }
      } finally {
        setIsLoading(false);
      }
    };

    //handleCloseMovie(); // closes movie if a new one is fetching
    fetchMovies();
    // clean up function:
    return () => {
      controller.abort();
    };
  }, [query]);
  return { movies, isLoading, error };
}
