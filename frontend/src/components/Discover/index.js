import { getSongs } from "../../store/songs"
import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from "react-router-dom";

function Discover() {
  const { songId } = useParams();
  const dispatch = useDispatch();
  const song = useSelector((state) => {
    return state.song.songs.map((songId) => state.song[songId])
  })

  useEffect(() => {
    dispatch(getSongs())
  })

  if (!song) {
    return null;
  }
}

export default Discover;
