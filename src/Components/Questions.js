import React, { useState, useEffect } from "react";

function Questions({ answer, actor, movie  }) {
  const imageBaseUrl = "https://image.tmdb.org/t/p/w300"
  return (
    <div>
      {actor && movie ? (
        <div>
          <h1>{answer ? "MATCHING" : "NOT MATCHING"}</h1>
          <div style={{display: "flex"}}>
            <img src={imageBaseUrl + movie.posterPaths[0].file_path} alt="movie"></img>
            <img src={imageBaseUrl + actor.profilePicturePath} alt="actor"></img>
          </div>
          <p>
            Did {actor.name} play in {movie.title} ?
          </p>
          <button>YES</button>
          <button>NO</button>
        </div>
      ) : null}
    </div>
  );
}

export default Questions;
