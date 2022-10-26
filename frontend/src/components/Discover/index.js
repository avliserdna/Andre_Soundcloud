import { getSongs } from "../../store/songs"
import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from "react-router-dom";

function Discover() {
  const dispatch = useDispatch();
  const song = useSelector((state) => {
    return state.song
  })

  useEffect(() => {
    dispatch(getSongs())
  }, [])
  return (
    <div></div>
  )
}

export default Discover;
