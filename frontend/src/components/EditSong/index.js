import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { updateSongs } from "../../store/songs"


function EditSong() {
  const dispatch = useDispatch();
  const history = useHistory();
  const songId = useParams()
  console.log(songId)
  const user = useSelector((state) => state.session.user)
  const album = useSelector((state) => state.album)
  const song = useSelector((state) => state.song[songId])
  const [userId, setUserId] = useState(user.id);
  const [albumId, setAlbumId] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
  const [previewImage, setPreviewImage] = useState("")

  console.log(song?.id)
  const songUpdate = (e) => {
    const file = e.target.files[0]
    if (file) setUrl(file)
  }

  const imageUpdate = (e) => {
    const file = e.target.files[0]
    if (file) setPreviewImage(file)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      userId,
      albumId,
      title,
      description,
      url,
      previewImage
    }
    const updatedSong = await dispatch(updateSongs(payload))
    if (updatedSong) {
      history.push('/');
    }
  }
  return (
    <section className="new-form">
      <form className="upload-new-song" onSubmit={handleSubmit}>
        <h1>New Song</h1>
        <h2>Song Title:</h2>
        <input
          type="text"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <h2>Description:</h2>
        <input
          type="text"
          name="description"
          value={description}
          placeholder="aaa"
          onChange={(e) => setDescription(e.target.value)} />

        <h2>Song Upload:</h2>
        <input
          type="file"
          name="url"
          onChange={songUpdate} />

        <h2>Song Image:</h2>
        <input
          type="file"
          name="previewImage"
          onChange={imageUpdate} />
        <button type="submit">Create New Song</button>
      </form>
    </section>
  )
}

export default EditSong;
