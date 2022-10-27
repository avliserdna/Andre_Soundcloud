import { useSelector } from "react-redux";
import { useParams } from "react-router-dom"

function AudioPlayer() {
  console.log("are you there")
  const { songId } = useParams()
  // audio = new Audio()
  // useEffect(() => {
  //   audio.play()
  // })
  // const dispatch = useDispatch()
  const song = useSelector(state => state.song[songId])
  return (
    <div>
      <figure>

        <figcaption>{song?.title}</figcaption>
        <audio
          controls
          src={song?.url}>
          <a href="https://andresoundcloud.s3.us-west-1.amazonaws.com/just+friends.mp3">
            Download audio
          </a>
        </audio>
      </figure>

    </div>
  )
}




export default AudioPlayer;
