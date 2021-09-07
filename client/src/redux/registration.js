import * as ActionTypes from './ActionTypes'

export const Registration = (state = {}, action)  => {
    switch (action.type) {
        case ActionTypes.SIGNUP_REQUEST:
            return {
                registering: true
            }
        case ActionTypes.SIGNUP_SUCCESS:
            return {}
        case ActionTypes.SIGNUP_FAILURE:
            return {}
        default:
            return state
    }
}