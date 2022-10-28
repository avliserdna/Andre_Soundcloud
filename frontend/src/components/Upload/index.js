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
  const [previewImage, setPreviewImage] = useState(null)

  // useEffect(() => {

  // })

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      userId,
      albumId,
      description,
      url,
      previewImage
    }
    let createdSong = await dispatch(addSong(payload))

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
          value={title}
          onChange={setTitle}
        />

        {/* <h2>Album:</h2>
        <input
          type="text"
          value={album}
          onChange={ } /> */}

        <h2>Description:</h2>
        <input
          type="text"
          value={description}
          onChange={setDescription} />

        <h2>Song Upload:</h2>
        <input
          type="file"
          value={url}
          onChange={setUrl} />

        <h2>Song Image:</h2>
        <input
          type="file"
          value={previewImage}
          onChange={setPreviewImage} />
        <button type="submit">Create New Song</button>
        {/* <button type="button" onClick={handleCancelClick}>
          Cancel
        </button> */}
      </form>
    </section>
  )
}

export default Upload;
