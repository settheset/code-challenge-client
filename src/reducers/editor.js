import {
  EDITOR_PAGE_LOADED,
  EDITOR_PAGE_UNLOADED,
  POST_SUBMITTED,
  ASYNC_START,
  UPDATE_FIELD_EDITOR,
} from '../constants/actionTypes'

export default (state = {}, action) => {
  switch (action.type) {
    case EDITOR_PAGE_LOADED:
      return {
        ...state,
        id: action.payload ? action.payload.post.id : null,
        description: action.payload ? action.payload.post.description : '',
        tagInput: '',
      }
    case EDITOR_PAGE_UNLOADED:
      return {}
    case POST_SUBMITTED:
      return {
        ...state,
        inProgress: null,
        errors: action.error ? action.payload.errors : null,
      }
    case ASYNC_START:
      if (action.subtype === POST_SUBMITTED) {
        return { ...state, inProgress: true }
      }
      break
    case UPDATE_FIELD_EDITOR:
      return { ...state, [action.key]: action.value }
    default:
      return state
  }

  return state
}
