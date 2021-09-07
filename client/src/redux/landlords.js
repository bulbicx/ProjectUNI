import * as ActionTypes from './ActionTypes'

export const Landlords = (state = {
        isLoading: true,
        errMess: null,
        landlords: [],
        landlord: {}
    }, action) => {
    switch(action.type) {
        case ActionTypes.ADD_LANDLORDS://properties are passed in payload
            return {...state, isLoading: false, errMess: null, landlords: action.payload}

        case ActionTypes.LANDLORDS_LOADING:
            return {...state, isLoading: true, errMess: null, landlords: []}

        case ActionTypes.LANDLORDS_FAILED:
            return {...state, isLoading: false, errMess: action.payload, landlords: []}   

        case ActionTypes.LANDLORD_CREATE_REQUEST:
            return {...state, isLoading: true }
        case ActionTypes.LANDLORD_CREATE_SUCCESS:
            return {...state, isLoading: false, landlordSuccess: true, errMess: null}
        case ActionTypes.LANDLORD_CREATE_FAILED:
            return {...state, isLoading: false, errMess: action.payload }

        case ActionTypes.LANDLORD_DELETE_REQUEST:
            return {...state, isLoading: true  }
        case ActionTypes.LANDLORD_DELETE_SUCCESS:
            return {...state, isLoading: false, errMess: null}
        case ActionTypes.LANDLORD_DELETE_FAILED:
            return {...state, isLoading: false, errMess: action.payload }

        case ActionTypes.LANDLORD_EDIT_REQUEST:
            return {...state, isLoading: true }
        case ActionTypes.LANDLORD_EDIT_SUCCESS:
            return {...state, isLoading: false }
        case ActionTypes.LANDLORD_EDIT_FAILED:
            return {...state, isLoading: false, errMess: action.payload }
        
        case ActionTypes.LANDLORD_FETCH_SINGLE_REQUEST:
            return {...state, isLoading: true }
        case ActionTypes.LANDLORD_FETCH_SINGLE_SUCCESS:
            return {...state, isLoading: false, landlord: action.payload }
        case ActionTypes.LANDLORD_FETCH_SINGLE_FAILED:
            return {...state, isLoading: false, errMess: action.payload }
        case ActionTypes.LANDLORD_FETCH_SINGLE_RESET:
            return { ...state, isLoading: false, landlord: {} }
    
        case ActionTypes.MAKE_REQUEST_LANDLORDS:
            return { ...state, isLoading: true, errMess: null, landlords: [] }
        case ActionTypes.UPDATE_HAS_NEXT_PAGE_LANDLORDS:
            return { ...state, hasNextPage: action.payload }
        case ActionTypes.UPDATE_HAS_NEXT_NEXT_PAGE_LANDLORDS:
            return { ...state, hasNextNextPage: action.payload }
        

        default:
            return state
    }
}