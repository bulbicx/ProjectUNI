import * as ActionTypes from './ActionTypes'

export const Alert = (state = {}, action) => {
  switch (action.type) {
    case ActionTypes.ALERT_SUCCESS:
      return {
        type: 'alert-success',
        message: action.message
      };
    case ActionTypes.ALERT_ERROR:
      return {
        type: 'alert-danger',
        message: action.message
      };
    case ActionTypes.ALERT_CLEAR:
      return {};
    default:
      return state
  }
}