import { getSongs } from "../../store/songs"
import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from "react-router-dom";

function Discover() {
  const dispatch = useDispatch();
  const songs = useSelector((state) => state.song)
  console.log(songs)
  return (
    <div>
      <h1>Discover New Songs!</h1>
      <div>
        {/* {songs.map((song) => {
          <h1>{song.title}</h1>
        })} */}
      </div>
    </div>
  )
}

export default Discover;
