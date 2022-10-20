import { csrfFetch } from "./csrf";

const LOGIN = "session/LOAD"

const loginUser = (user) => ({
  type: LOGIN,
  user
});

export const login = (user) => async (dispatch) => {
  const response = await csrfFetch('/api/session', {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
  if (response.ok) {
    const loadedUser = await response.json()
    dispatch(loginUser(loadedUser))
  }
}

const initialState =
{
  user: null
}

export const sessionReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      const userState = { ...state };
      userState.user = action.user
      return userState

    default:
      return state
  }
}
