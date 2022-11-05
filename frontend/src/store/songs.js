import { csrfFetch } from "./csrf";

const LOAD = "songs/LOAD"
const ADD_ONE = "songs/ADD_ONE"
// const LOAD_COMMENTS = "songs/LOAD_COMMENTS"
// const DELETE_COMMENT = "songs/DELETE_COMMENT"
const DELETE_SONG = "songs/DELETE_SONG"
const UPDATE_SONG = "songs/UPDATE_SONG"
// const ADD_COMMENT = "songs/ADD_COMMENT"

const load = (songs) => ({
  type: LOAD,
  songs
});

const addOneSong = (song) => ({
  type: ADD_ONE,
  song
})

const newSong = (songs) => ({
  type: LOAD,
  songs: [songs]
})


const updateSong = (song) => ({
  type: UPDATE_SONG,
  song
})

const deleteSong = (songId) => ({
  type: DELETE_SONG,
  songId
})


export const getSongs = () => async (dispatch) => {
  const response = await csrfFetch(`/api/songs`);
  console.log(response)
  if (response.ok) {
    const songs = await response.json();
    console.log(songs)
    dispatch(load(songs))
  }
}

export const getSongId = (songId) => async (dispatch) => {
  const response = await csrfFetch(`/api/song/${songId}`)

  if (response.ok) {
    const song = await response.json();
    dispatch(addOneSong(song))
  }
}



export const addSong = (song) => async (dispatch) => {
  const { userId, albumId, title, description, url, previewImage } = song

  const formData = new FormData();
  formData.append("userId", userId)
  formData.append("albumId", albumId)
  formData.append("title", title);
  formData.append("description", description);
  formData.append("url", url)
  formData.append("previewImage", previewImage)

  const response = await csrfFetch(`/api/songs`, {
    method: "POST",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    body: formData
  })
  const data = await response.json();
  dispatch(newSong(data))
  return response;
}
const initialState = {
}

export const updateSongs = (song) => async (dispatch) => {
  const { userId, albumId, title, description, url, previewImage } = song

  const formData = new FormData();
  formData.append("userId", userId)
  formData.append("albumId", albumId)
  formData.append("title", title);
  formData.append("description", description);
  formData.append("url", url)
  formData.append("previewImage", previewImage)
  console.log(song, "<=== song update action")
  const response = await csrfFetch(`/api/songs/${song.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    body: formData
  })
  const data = await response.json();
  console.log(data, "<=== edit data")
  dispatch(updateSong(data))
  return response;
}



export const removeSong = (song) => async (dispatch) => {
  console.log(song)
  const response = await csrfFetch(`/api/songs/${song.id}`, {
    method: "DELETE",
    // headers: {
    //   "Content-Type": "multipart/form-data",
    // },
  })
  const deletedData = await response.json();
  dispatch(deleteSong(song.id))
  // if (response.ok) {
  //   const deletedData = await response.json();
  //   dispatch(deleteSong(deletedData))
  // }
}


export const songReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD:
      const allSongs = { ...state };
      action.songs.forEach((song) => {
        allSongs[song.id] = song;
      });
      return allSongs

    case ADD_ONE:
      if (!state[action.song.id]) {
        const newState = {
          ...state,
          [action.song.id]: action.song
        };
        const songList = newState.list.map((id) => newState[id])
        songList.push(action.song)
        return newState
      }
    case DELETE_SONG:
      const deletedState = { ...state }
      console.log(action.song, "<=== Action song")
      delete deletedState[action.songId]
      return deletedState

    case UPDATE_SONG:
      const updatedState = { ...state }
      updatedState[action.song.id] = action.song
      return updatedState

    default:
      return state
  }
}
