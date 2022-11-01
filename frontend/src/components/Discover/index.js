import { getSongs } from "../../store/songs"
import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useParams } from "react-router-dom";
import "./Discover.css"
function Discover() {
  const dispatch = useDispatch();
  const songs = useSelector((state) => {
    return Object.values(state.song)
  })
  console.log(songs)
  return (
    <div>
      <h1>Discover New Songs!</h1>

      {songs?.map((song) => {
        if (song) {
          return (
            <div id="discover-song" key={song.id}>
              <NavLink to={`/songs/${song.id}`}>{song?.title}</NavLink>
            </div>
          )
        }
      })}

    </div>
  )
}

export default Discover;
