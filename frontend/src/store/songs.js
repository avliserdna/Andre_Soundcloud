import { csrfFetch } from "./csrf";

const LOAD = "songs/LOAD"
const ADD_ONE = "songs/ADD_ONE"

const load = (songs) => ({
  type: LOAD,
  songs
});

const addOneSong = (song) => ({
  type: ADD_ONE,
  song
})

const newSong = (song) => ({
  type: LOAD,
  song
})

export const getSongs = () => async (dispatch) => {
  const response = await csrfFetch(`/api/songs`);

  if (response.ok) {
    const songs = await response.json();
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
  const response = await csrfFetch(`/api/songs`, {
    method: "POST",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    body: JSON.stringify({
      userId,
      albumId,
      title,
      description,
      url,
      previewImage
    })
  })
  const data = await response.json();
  dispatch(newSong(data.song))
  return response;
}
const initialState = {
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


    default:
      return state
  }
}
