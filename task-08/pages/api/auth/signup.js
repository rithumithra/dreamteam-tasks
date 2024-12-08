"use client";

import { useState } from "react";
import { useRouter } from "next/router";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSignup = async (event) => {
    event.preventDefault();

    
    if (!email.includes("@") || !email.endsWith(".com")) {
      setError("Email must include '@' and end with '.com'.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    setError("");

    const res = await fetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (res.ok) {
      alert("Signup successful!");
      document.cookie = "userLoggedIn=true; path=/; max-age=3600"; 
      router.push("/dashboard"); 
    } else {
      setError("Signup failed. Please try again.");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.formWrapper}>
        <h1 style={styles.heading}>Sign Up</h1>
        {error && <p style={styles.error}>{error}</p>}
        <form onSubmit={handleSignup} autoComplete="off" style={styles.form}>
          <input
            name="user_email" 
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={styles.input}
            autoComplete="off" 
          />
          <input
            name="user_password" 
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={styles.input}
            autoComplete="off" 
          />
          <button type="submit" style={styles.button}>
            Sign Up
          </button>
        </form>
        <p style={styles.footerText}>
          Already have an account? <a href="/signin" style={styles.link}>Log In</a>
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#121212",
    color: "#FFFFFF",
  },
  formWrapper: {
    backgroundColor: "#1E1E1E",
    borderRadius: "10px",
    padding: "40px",
    boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.5)",
    textAlign: "center",
    maxWidth: "400px",
    width: "100%",
  },
  heading: {
    fontSize: "28px",
    marginBottom: "20px",
    color: "#E50914",
    fontFamily: "Arial, sans-serif",
  },
  error: {
    color: "#E50914",
    marginBottom: "15px",
    fontSize: "14px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  input: {
    padding: "12px",
    border: "none",
    borderRadius: "5px",
    fontSize: "16px",
    outline: "none",
    backgroundColor: "#2E2E2E",
    color: "#FFF",
  },
  button: {
    backgroundColor: "#E50914",
    border: "none",
    color: "#FFF",
    padding: "12px",
    borderRadius: "5px",
    fontSize: "16px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
  footerText: {
    marginTop: "15px",
    fontSize: "14px",
  },
  link: {
    color: "#E50914",
    textDecoration: "none",
  },
};
