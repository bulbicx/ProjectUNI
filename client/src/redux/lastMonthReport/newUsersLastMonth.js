import * as ActionTypes from '../ActionTypes'

export const NewUsersLastMonth = (state = {
        isLoading: true,
        errMess: null,
        users: []
    }, action) => {
    switch(action.type) {
        case ActionTypes.ADD_NEW_USERS_LAST_MONTH:
            return {...state, isLoading: false, errMess: null, users: action.payload}

        case ActionTypes.LAST_MONTH_NEW_USERS_LOADING:
            return {...state, isLoading: true, errMess: null, users: []}

        case ActionTypes.LAST_MONTH_NEW_USERS_FAILED:
            return {...state, isLoading: false, errMess: action.payload, users: []}

        default:
            return state
    }
}