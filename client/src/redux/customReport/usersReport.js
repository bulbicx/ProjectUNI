import * as ActionTypes from '../ActionTypes'

export const UsersReport = (state = {
        isLoading: false,
        errMess: null,
        usersReport: []
    }, action) => {
    switch(action.type) {
        case ActionTypes.ADD_CUSTOM_USERS_REPORT:
            state.usersReport.push(action.payload)
            return {...state, isLoading: false, errMess: null, usersReport: [...state.usersReport]}

        case ActionTypes.CUSTOM_USERS_REPORT_LOADING:
            return {...state, isLoading: true, errMess: null}

        case ActionTypes.CUSTOM_USERS_REPORT_FAILED:
            return {...state, isLoading: false, errMess: action.payload, usersReport: []}
        
        case ActionTypes.CUSTOM_USERS_CLEAR_ARRAY:
            return {...state, isLoading: false, errMess: null, usersReport: []}

        default:
            return state
    }
}