import * as ActionTypes from './ActionTypes'

export const Notifications = (state = {
        isLoading: false,
        errMess: null,
        notifications: [],
        notification: {}
    }, action) => {
    switch(action.type) {
        case ActionTypes.ADD_NOTIFICATIONS://properties are passed in payload
            return {...state, isLoading: false, errMess: null, notifications: action.payload}

        case ActionTypes.NOTIFICATIONS_LOADING:
            return {...state, isLoading: true, errMess: null, notifications: []}

        case ActionTypes.NOTIFICATIONS_FAILED:
            return {...state, isLoading: false, errMess: action.payload, notifications: []}   

        case ActionTypes.NOTIFICATION_CREATE_REQUEST:
            return {...state, isLoading: true }
        case ActionTypes.NOTIFICATION_CREATE_SUCCESS:
            return {...state, isLoading: false, success: true, errMess: null}
        case ActionTypes.NOTIFICATION_CREATE_FAILED:
            return { ...state, isLoading: false, errMess: action.payload }

        case ActionTypes.NOTIFICATION_DELETE_REQUEST:
            return {...state, isLoading: true  }
        case ActionTypes.NOTIFICATION_DELETE_SUCCESS:
            return {...state, isLoading: false, errMess: null}
        case ActionTypes.NOTIFICATION_DELETE_FAILED:
            return {...state, isLoading: false, errMess: action.payload }
        
        // case ActionTypes.LANDLORD_FETCH_SINGLE_REQUEST:
        //     return {...state, isLoading: true }
        // case ActionTypes.LANDLORD_FETCH_SINGLE_SUCCESS:
        //     return {...state, isLoading: false, landlord: action.payload }
        // case ActionTypes.LANDLORD_FETCH_SINGLE_FAILED:
        //     return {...state, isLoading: false, errMess: action.payload }
        // case ActionTypes.LANDLORD_FETCH_SINGLE_RESET:
        //     return { ...state, isLoading: false, landlord: {} }
        
        default:
            return state
    }
}