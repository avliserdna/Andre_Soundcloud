import { csrfFetch } from "./csrf";

const SET_USER = "session/LOGIN"
const LOGOUT = "session/LOGOUT"

const loginUser = (user) => ({
  type: SET_USER,
  user
});

const restoreUser = (user) => ({
  type: SET_USER,
  user
})

const signUpUser = (user) => ({
  type: SET_USER,
  user
})

const deleteSession = () => ({
  type: LOGOUT,

})
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
    return response;
  }
}

export const restore = () => async dispatch => {
  const response = await csrfFetch('/api/session');
  const data = await response.json();

  dispatch(restoreUser(data));
  return response;

};

export const signup = (user) => async (dispatch) => {
  const { firstName, lastName, username, email, password } = user;
  const response = await csrfFetch("/api/users", {
    method: "POST",
    body: JSON.stringify({
      firstName,
      lastName,
      username,
      email,
      password,
    }),
  });
  const data = await response.json();
  dispatch(signUpUser(data));
  return response;
};

export const logout = () => async (dispatch) => {
  const response = await csrfFetch('/api/session', {
    method: 'DELETE',
  });
  dispatch(deleteSession());
  return response;
};

const initialState =
{
}

export const sessionReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      const userState = { ...state };
      userState.user = action.user
      return userState
    case LOGOUT:
      const loggedOutState = { ...state };
      loggedOutState.user = initialState
      return loggedOutState

    default:
      return state
  }
}
