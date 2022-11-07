import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { compose } from "redux";
import { getSongs, updateSongs } from "../../store/songs"
// import { getSongId } from "../../store/songs"
import './EditSong.css'

function EditSong() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { songId } = useParams()
  const user = useSelector((state) => state.session.user)
  const album = useSelector((state) => state.album)
  const song = useSelector((state) => state.song[songId])
  const [userId, setUserId] = useState(song?.userId);
  const [albumId, setAlbumId] = useState(song?.albumId);
  const [title, setTitle] = useState(song?.title);
  const [description, setDescription] = useState(song?.description);
  const [url, setUrl] = useState(song?.url);
  const [previewImage, setPreviewImage] = useState(song?.previewImage)



  useEffect(() => {
    dispatch(getSongs())
    if (user?.id !== song?.userId) {
      alert("Not authorized to edit song!")
      history.push('/')
    }
  }, [dispatch])

  const songUpdate = (e) => {
    const file = e.target.files[0]
    if (file) setUrl(file)
  }
  const imageUpdate = (e) => {
    const file = e.target.files[0]
    if (file) {
      setPreviewImage(file)
    }

  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      id: songId,
      userId,
      albumId,
      title,
      description,
      url,
      previewImage
    }
    console.log(payload, "<=== edit payload")
    const updatedSong = await dispatch(updateSongs(payload))
    if (updatedSong) {
      history.push('/')
    }
  }
  return (
    <section className="edit-form">
      <form onSubmit={handleSubmit}>
        <h1>Edit Song</h1>
        <h3>Song Title:</h3>
        <input
          type="text"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <h3>Description:</h3>
        <input
          type="text"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)} />

        <h3>Song Upload:</h3>

        <input
          type="file"
          name="url"
          onChange={songUpdate}
          title="test" />
        <label>Audio URL: {url}</label>

        <h3>Song Image:</h3>
        <input
          type="file"
          name="previewImage"
          onChange={imageUpdate} />
        <button className="button-1" type="submit">Update Song</button>
      </form>
    </section>
  )
}

export default EditSong;
