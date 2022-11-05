import { csrfFetch } from "./csrf";

const LOAD_COMMENTS = "songs/LOAD_COMMENTS"
const DELETE_COMMENT = "songs/DELETE_COMMENT"
const ADD_COMMENT = "songs/ADD_COMMENT"

const loadComments = (comments) => ({
  type: LOAD_COMMENTS,
  comments
})

const addComments = (comment) => ({
  type: ADD_COMMENT,
  comment
})

const deleteComment = (commentId) => ({
  type: DELETE_COMMENT,
  commentId
})

export const addComment = (comment) => async (dispatch) => {
  const { userId, songId, body } = comment;

  // const formData = new FormData();
  // formData.append("userId", userId)
  // formData.append("songId", songId)
  // formData.append("body", body)

  const response = await csrfFetch(`/api/songs/${songId}/comments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(comment)
  })

  const data = await response.json()
  console.log(data, "<==== COMMENT DATA")
  dispatch(addComments(data))
  return response
}

export const getSongComments = (songId) => async (dispatch) => {
  const response = await csrfFetch(`/api/songs/${songId}/comments`)
  if (response.ok) {
    const comments = await response.json();
    dispatch(loadComments(comments))
  }
}

export const removeComment = (comment) => async (dispatch) => {
  const response = await csrfFetch(`/api/comments/${comment.id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "multipart/form-data",
    },
  })
  if (response.ok) {
    const deletedData = await response.json();
    dispatch(deleteComment(comment.id))
  }
}
const initialState = {}

const commentReducer = (state = initialState, action) => {
  switch (action.type) {

    case LOAD_COMMENTS:
      const allComments = { ...state };
      console.log(action.comments, "<=== action comments")
      action.comments.forEach((comment) => {
        allComments[comment.id] = comment;
      });
      return allComments

    case ADD_COMMENT:
      if (!state[action.comment.id]) {
        const newState = {
          ...state,
          [action.comment.id]: action.comment
        };
        // const commentList = newState.map((id) => newState[id])
        // commentList.push(action.comment)
        return newState
      }

    case DELETE_COMMENT:
      const deletedCommentState = { ...state }
      delete deletedCommentState[action.commentId]
      return deletedCommentState
    default:
      return state
  }


}

export default commentReducer;
