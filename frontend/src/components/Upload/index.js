import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { NavLink, useHistory } from "react-router-dom"
import { addSong } from "../../store/songs"
import './Upload.css';

function Upload() {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.session.user)
  const album = useSelector((state) => state.album)
  const [userId, setUserId] = useState(user?.id);
  const [albumId, setAlbumId] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
  const [previewImage, setPreviewImage] = useState("")

  const songUpdate = (e) => {
    const file = e.target.files[0]

    if (file) setUrl(file)
  }

  const imageUpdate = (e) => {
    const file = e.target.files[0]
    if (file) {
      setPreviewImage(file)
    }
    else {
      setPreviewImage("https://andresoundcloud.s3.us-west-1.amazonaws.com/image-preview-icon-picture-placeholder-vector-31284806.png")
    }
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title) {
      alert("Title can't be empty!")

    }
    else if (!url) {
      alert("Song must have uploaded audio!")
    }
    else if (!previewImage) {
      // While the image isnt required, the image update needs to be refactored
      // in the scenario there is no target files being uploaded.
      alert("Image can't be empty!")
    }
    else {
      const payload = {
        userId,
        albumId,
        title,
        description,
        url,
        previewImage
      }
      const createdSong = await dispatch(addSong(payload))
      if (createdSong) {

        history.push('/');
      }
    }

  }

  useEffect(() => {
    if (!user) {
      alert("No logged in user! Please sign up or login.")
      history.push('/')
    }

  })


  return (
    <section className="new-form">
      <form className="upload-new-song" onSubmit={handleSubmit}>
        <h1>New Song</h1>
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
          onChange={songUpdate} />

        <h3>Song Image:</h3>
        <input
          type="file"
          name="previewImage"
          onChange={imageUpdate} />
        <button className="button-1" type="submit">Create New Song</button>
      </form>
    </section>
  )
}

export default Upload;
