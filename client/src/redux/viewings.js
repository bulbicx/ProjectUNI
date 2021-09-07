import * as ActionTypes from './ActionTypes'

export const Viewings = (state = {
        isLoading: false,
        errMess: null,
        viewings: [],
        viewing: {}
    }, action) => {
    switch(action.type) {
        case ActionTypes.ADD_VIEWINGS://properties are passed in payload
            return {...state, isLoading: false, errMess: null, viewings: action.payload}
        case ActionTypes.VIEWINGS_LOADING:
            return {...state, isLoading: true, errMess: null, viewings: []}
        case ActionTypes.VIEWINGS_FAILED:
            return {...state, isLoading: false, errMess: action.payload, viewings: []}   

        case ActionTypes.VIEWING_CREATE_REQUEST:
            return {...state, isLoading: true }
        case ActionTypes.VIEWING_CREATE_SUCCESS:
            return {...state, isLoading: false, success: true, errMess: null}
        case ActionTypes.VIEWING_CREATE_FAILED:
            return {...state, isLoading: false, errMess: action.payload }

        case ActionTypes.DELETE_VIEWING_REQUEST:
            return {...state, isLoading: true  }
        case ActionTypes.DELETE_VIEWING_SUCCESS:
            return {...state, isLoading: false, errMess: null}
        case ActionTypes.DELETE_VIEWING_FAILED:
            return {...state, isLoading: false, errMess: action.payload }
        
        default:
            return state
    }
}