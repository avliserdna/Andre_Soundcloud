import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom"
import { getSongId } from '../../store/songs'
function AudioPlayer() {
  console.log("are you there")
  const { songId } = useParams()
  // audio = new Audio()
  // useEffect(() => {
  //   audio.play()
  // })
  // const dispatch = useDispatch()
  const song = useSelector(state => state.song[songId])
  console.log("reached")
  console.log(song)
  return (
    <div>
      <figure>

        <figcaption>{song?.title}</figcaption>
        <audio
          controls
          src="https://andresoundcloud.s3.us-west-1.amazonaws.com/just+friends.mp3">
          <a href="https://andresoundcloud.s3.us-west-1.amazonaws.com/just+friends.mp3">
            Download audio
          </a>
        </audio>
      </figure>

    </div>
  )
}




export default AudioPlayer;
