"use client";

import { useState } from "react";
import { useRouter } from "next/router";

export default function Dashboard() {
  const router = useRouter();

 
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [mood, setMood] = useState("");
  const [movies, setMovies] = useState([
    { title: "Inception", mood: "adventurous" },
    { title: "The Pursuit of Happyness", mood: "happy" },
    { title: "Titanic", mood: "sad" },
    { title: "Avengers: Endgame", mood: "adventurous" },
    { title: "The Fault in Our Stars", mood: "sad" },
    { title: "Chemical Hearts", mood: "romantic" },
    { title: "Interstellar", mood: "adventurous" },
  ]);
  const [watchlist, setWatchlist] = useState([
    { title: "The Fault in Our Stars" },
    { title: "Chemical Hearts" },
    { title: "Titanic" },
  ]);
  const [reviews, setReviews] = useState([]);
  const [reviewText, setReviewText] = useState("");
  const [newWatchlistMovie, setNewWatchlistMovie] = useState("");


  const handleLogout = () => {
    document.cookie = "userLoggedIn=; path=/; max-age=0"; 
    router.push("/"); 
  };

  
  const handleSearch = () => {
    const results = movies.filter((movie) =>
      movie.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setSearchResults(results);
  };

  
  const handleMoodPairing = () => {
    const filteredMovies = movies.filter((movie) => movie.mood === mood);
    alert(
      filteredMovies.length
        ? `Recommended movies for mood (${mood}): ${filteredMovies
            .map((movie) => movie.title)
            .join(", ")}`
        : `No movies found for mood: ${mood}`
    );
  };

  
  const handleAddToWatchlist = () => {
    if (newWatchlistMovie.trim()) {
      setWatchlist([...watchlist, { title: newWatchlistMovie.trim() }]);
      setNewWatchlistMovie("");
    } else {
      alert("Please enter a movie name to add.");
    }
  };

  
  const handleRemoveFromWatchlist = (title) => {
    setWatchlist(watchlist.filter((movie) => movie.title !== title));
  };

  
  const handleAddReview = (event) => {
    event.preventDefault();
    if (reviewText.trim()) {
      setReviews([...reviews, reviewText]);
      setReviewText("");
    } else {
      alert("Please enter a review before submitting.");
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Welcome to Your Dashboard</h1>

      {/* Search Movies */}
      <div style={styles.section}>
        <h2 style={styles.subHeading}>Search Movies</h2>
        <input
          type="text"
          placeholder="Enter movie name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={styles.input}
        />
        <button onClick={handleSearch} style={styles.button}>
          Search
        </button>
        <ul style={styles.list}>
          {searchResults.map((movie, index) => (
            <li key={index} style={styles.listItem}>
              {movie.title}
            </li>
          ))}
        </ul>
      </div>

      {/* Mood Pairing */}
      <div style={styles.section}>
        <h2 style={styles.subHeading}>Mood Pairing Recommendations</h2>
        <select
          value={mood}
          onChange={(e) => setMood(e.target.value)}
          style={styles.input}
        >
          <option value="">Select Mood</option>
          <option value="happy">Happy</option>
          <option value="sad">Sad</option>
          <option value="adventurous">Adventurous</option>
          <option value="romantic">Romantic</option>
        </select>
        <button onClick={handleMoodPairing} style={styles.button}>
          Get Recommendations
        </button>
      </div>

      {/* Watchlist */}
      <div style={styles.section}>
        <h2 style={styles.subHeading}>Your Watchlist</h2>
        <ul style={styles.list}>
          {watchlist.map((movie, index) => (
            <li key={index} style={styles.listItem}>
              {movie.title}
              <button
                onClick={() => handleRemoveFromWatchlist(movie.title)}
                style={styles.removeButton}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
        <div style={styles.form}>
          <input
            type="text"
            placeholder="Add a movie to your watchlist..."
            value={newWatchlistMovie}
            onChange={(e) => setNewWatchlistMovie(e.target.value)}
            style={styles.input}
          />
          <button onClick={handleAddToWatchlist} style={styles.button}>
            Add to Watchlist
          </button>
        </div>
      </div>

      {/* Reviews */}
      <div style={styles.section}>
        <h2 style={styles.subHeading}>Your Reviews</h2>
        <form onSubmit={handleAddReview} style={styles.form}>
          <textarea
            placeholder="Write your review..."
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            style={styles.textarea}
          />
          <button type="submit" style={styles.button}>
            Add Review
          </button>
        </form>
        <ul style={styles.list}>
          {reviews.map((review, index) => (
            <li key={index} style={styles.listItem}>
              {review}
            </li>
          ))}
        </ul>
      </div>

      {/* Logout */}
      <button onClick={handleLogout} style={{ ...styles.button, marginTop: "20px" }}>
        Logout
      </button>
    </div>
  );
}

const styles = {
  container: {
    padding: "20px",
    backgroundColor: "#121212",
    color: "#FFFFFF",
    minHeight: "100vh",
    fontFamily: "Arial, sans-serif",
  },
  heading: {
    color: "#E50914",
    textAlign: "center",
    fontSize: "32px",
  },
  section: {
    marginBottom: "30px",
  },
  subHeading: {
    color: "#E50914",
    fontSize: "24px",
    marginBottom: "10px",
  },
  input: {
    padding: "10px",
    border: "none",
    borderRadius: "5px",
    marginBottom: "10px",
    width: "100%",
    fontSize: "16px",
    backgroundColor: "#2E2E2E",
    color: "#FFF",
  },
  textarea: {
    padding: "10px",
    border: "none",
    borderRadius: "5px",
    marginBottom: "10px",
    width: "100%",
    fontSize: "16px",
    backgroundColor: "#2E2E2E",
    color: "#FFF",
    height: "80px",
    resize: "none",
  },
  button: {
    backgroundColor: "#E50914",
    color: "#FFF",
    border: "none",
    padding: "10px 20px",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
    transition: "background-color 0.3s ease",
  },
  list: {
    listStyleType: "none",
    padding: "0",
  },
  listItem: {
    backgroundColor: "#1E1E1E",
    padding: "10px",
    borderRadius: "5px",
    marginBottom: "5px",
    display: "flex",
    justifyContent: "space-between",
  },
  removeButton: {
    backgroundColor: "#FF6347",
    border: "none",
    color: "#FFF",
    borderRadius: "5px",
    padding: "5px 10px",
    cursor: "pointer",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
};
