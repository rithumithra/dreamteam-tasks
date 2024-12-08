"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function HomePage() {
  const { data: session, status } = useSession();
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  if (status === "loading") {
    return <p>Loading...</p>;
  }
  if (!session) {
    return (
      <div className="home">
        <h1>Welcome to Movieverse!</h1>
        <p>You are not signed in.</p>
        <div className="buttons">
          <button onClick={() => router.push("/signin")}>Login</button>
          <button onClick={() => router.push("/signup")}>Sign Up</button>
        </div>
        <div className="image-container">
          <img
            src="https://media.gq.com/photos/598cb836c1106c6a45fa6c58/master/pass/2017-08_GQ_NETFLIX-Plot-Twists_3x2.jpg" 
            alt="Movie Image"
            className="image"
          />
        </div>
        <style jsx>{`
          .home {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 100vh;
            background-color: #121212;
            color: #fff;
            font-family: 'Roboto', sans-serif;
            text-align: center;
          }
  
          h1 {
            color: #e60000;
            font-size: 3rem;
            font-weight: bold;
          }
  
          .buttons {
            margin-top: 20px;
          }
  
          button {
            background-color: #e60000;
            color: white;
            border: none;
            padding: 14px 32px;
            font-size: 1.2rem;
            cursor: pointer;
            border-radius: 8px;
            margin: 10px;
          }
  
          button:hover {
            background-color: #ff4d4d;
          }
  
          .image-container {
            margin-top: 30px;
          }
  
          .image {
            width: 100%;
            max-width: 800px;
            height: auto;
            border-radius: 12px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
          }
        `}</style>
      </div>
    );
  }
  
  return (
    <div className="home">
      <h1>Welcome, {session.user?.name}!</h1>
      <p>Email: {session.user?.email}</p>
      <button onClick={() => router.push("/api/auth/signout")}>Sign Out</button>
      <div className="image-container">
        <img
          src="https://media.gq.com/photos/598cb836c1106c6a45fa6c58/master/pass/2017-08_GQ_NETFLIX-Plot-Twists_3x2.jpg" 
          alt="Movie Image"
          className="image"
        />
      </div>
      <style jsx>{`
        .home {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100vh;
          background-color: #121212;
          color: #fff;
          font-family: 'Roboto', sans-serif;
          text-align: center;
        }
  
        h1 {
          color: #e60000;
          font-size: 3rem;
          font-weight: bold;
        }
  
        button {
          background-color: #e60000;
          color: white;
          border: none;
          padding: 14px 32px;
          font-size: 1.2rem;
          cursor: pointer;
          border-radius: 8px;
          margin-top: 20px;
        }
  
        button:hover {
          background-color: #ff4d4d;
        }
  
        .image-container {
          margin-top: 30px;
        }
  
        .image {
          width: 100%;
          max-width: 800px;
          height: auto;
          border-radius: 12px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        }
      `}</style>
    </div>
  );
  
}

