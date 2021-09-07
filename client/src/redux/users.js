import * as ActionTypes from './ActionTypes'

export const Users = (state = {
        isLoading: true,
        errMess: null,
        users: [],
        user: {}
    }, action) => {
    switch(action.type) {
        case ActionTypes.ADD_USERS:
            return {...state, isLoading: false, errMess: null, users: action.payload}
        case ActionTypes.USERS_LOADING:
            return {...state, isLoading: true, errMess: null, users: []}
        case ActionTypes.USERS_FAILED:
            return { ...state, isLoading: false, errMess: action.payload, users: [] }
        
        case ActionTypes.CREATE_USER_REQUEST:
            return {...state, isLoading: true, errMess: null}
        case ActionTypes.CREATE_USER_SUCCESS:
            return {...state, isLoading: false, errMess: null, users: [...state.users, action.payload]}
        case ActionTypes.CREATE_USER_FAILED:
            return { ...state, isLoading: false, errMess: action.payload }
        
        case ActionTypes.DELETE_USER_REQUEST:
            return {...state, isLoading: true, errMess: null}
        case ActionTypes.DELETE_USER_SUCCESS:
            return {...state, isLoading: false, errMess: null, users: [...state.users.filter(user => user._id !== action.payload)]}
        case ActionTypes.DELETE_USER_FAILED:
            return {...state, isLoading: false, errMess: action.payload}

        case ActionTypes.USER_FETCH_SINGLE_REQUEST:
            return {...state, isLoading: true }
        case ActionTypes.USER_FETCH_SINGLE_SUCCESS:
            return {...state, isLoading: false, user: action.payload }
        case ActionTypes.USER_FETCH_SINGLE_FAILED:
            return {...state, isLoading: false, errMess: action.payload }
        case ActionTypes.USER_FETCH_SINGLE_RESET:
            return {...state, isLoading: false, user: {} }

        case ActionTypes.USER_EDIT_REQUEST:
            return {...state, isLoading: true }
        case ActionTypes.USER_EDIT_SUCCESS:
            return {...state, isLoading: false, editSuccess: true }
        case ActionTypes.USER_EDIT_FAILED:
            return {...state, isLoading: false, errMess: action.payload }
        case ActionTypes.USER_EDIT_RESET:
            return { ...state, isLoading: false, editSuccess: false }
        
        case ActionTypes.MAKE_REQUEST:
            return { ...state, isLoading: true, errMess: null, users: [] }
        case ActionTypes.UPDATE_HAS_NEXT_PAGE:
            return { ...state, hasNextPage: action.payload }
        case ActionTypes.UPDATE_HAS_NEXT_NEXT_PAGE:
            return { ...state, hasNextNextPage: action.payload }
            
        default:
            return state
    }
}