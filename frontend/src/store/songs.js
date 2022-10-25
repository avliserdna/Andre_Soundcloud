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

export const getSongs = () => async (dispatch) => {
  const response = await fetch(`/api/songs`);

  if (response.ok) {
    const songs = await response.json();
    dispatch(load(songs))
  }
}

export const getSongId = (songId) => async (dispatch) => {
  const response = await fetch(`/api/song/${songId}`)

  if (response.ok) {
    const song = await response.json();
    dispatch(addOneSong(song))
  }
}

const initialState = {
  songs: []
}

export const songReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD:
      const allSongs = {};
      action.songs.forEach((song) => {
        allSongs[song.id] = song;
      });
      return {
        ...allSongs,
        ...state
      }

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
