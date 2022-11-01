import { csrfFetch } from "./csrf";

const LOAD = "songs/LOAD"
const ADD_ONE = "songs/ADD_ONE"
const LOAD_COMMENTS = "songs/LOAD_COMMENTS"

const load = (songs) => ({
  type: LOAD,
  songs
});

const loadComments = (comments) => ({
  type: LOAD_COMMENTS,
  comments
})

const addOneSong = (song) => ({
  type: ADD_ONE,
  song
})

const newSong = (songs) => ({
  type: LOAD,
  songs: [songs]
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

export const addComment = (comment) => async (dispatch) => {
  const { body } = comment;
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
  console.log(data, "<=== DATA")
  console.log(data.song, "<===== DATA.SONG")
  dispatch(newSong(data))
  return response;
}
const initialState = {
}

export const getSongComments = (songId) => async (dispatch) => {
  const response = await csrfFetch(`/api/songs/${songId}/comments`)
  if (response.ok) {
    const comments = await response.json();
    dispatch(loadComments(comments))
  }
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
    case LOAD_COMMENTS:
      const allSongComments = { ...state };
      const newState = { ...allSongComments, comments: action.comments }
      return newState

    default:
      return state
  }
}
