import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import { addSong } from "../../store/songs"

function Upload() {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.session.user)
  const album = useSelector((state) => state.album)
  const [userId, setUserId] = useState(user.id);
  const [albumId, setAlbumId] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
  const [previewImage, setPreviewImage] = useState("")

  // useEffect(() => {

  // })

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(title, "<= TITLE")
    console.log(url, "<= URL")
    const payload = {
      userId,
      albumId,
      title,
      description,
      url,
      previewImage
    }
    console.log(payload, "<=== Payload")
    const createdSong = await dispatch(addSong(payload))

    if (createdSong) {
      history.push('/');
    }
  }

  // const handleCancelClick = (e) => {
  //   e.preventDefault();
  //   hideForm();
  // };

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

        {/* <h2>Album:</h2>
        <input
          type="text"
          value={album}
          onChange={ } /> */}

        <h2>Description:</h2>
        <input
          type="text"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)} />

        <h2>Song Upload:</h2>
        <input
          type="file"
          name="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)} />

        <h2>Song Image:</h2>
        <input
          type="file"
          name="previewImage"
          value={previewImage}
          onChange={(e) => setPreviewImage(e.target.value)} />
        <button type="submit">Create New Song</button>
        {/* <button type="button" onClick={handleCancelClick}>
          Cancel
        </button> */}
      </form>
    </section>
  )
}

export default Upload;
