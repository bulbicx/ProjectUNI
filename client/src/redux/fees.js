import * as ActionTypes from './ActionTypes'

export const Fees = (state = {
        isLoading: true,
        errMess: null,
        fees: [],
        fee: {}
    }, action) => {
    switch(action.type) {
        case ActionTypes.ADD_FEES:
            return {...state, isLoading: false, errMess: null, fees: action.payload}

        case ActionTypes.FEES_LOADING:
            return {...state, isLoading: true, errMess: null, fees: []}

        case ActionTypes.FEES_FAILED:
            return { ...state, isLoading: false, errMess: action.payload, fees: [] }
        
        case ActionTypes.FEE_CREATE_REQUEST:
            return {...state, isLoading: true }
        case ActionTypes.FEE_CREATE_SUCCESS:
            return {...state, isLoading: false, feesuccess: true, errMess: null}
        case ActionTypes.FEE_CREATE_FAILED:
            return {...state, isLoading: false, errMess: action.payload }

        case ActionTypes.FEE_DELETE_REQUEST:
            return {...state, isLoading: true  }
        case ActionTypes.FEE_DELETE_SUCCESS:
            return {...state, isLoading: false, errMess: null}
        case ActionTypes.FEE_DELETE_FAILED:
            return {...state, isLoading: false, errMess: action.payload }

        case ActionTypes.FEE_EDIT_REQUEST:
            return {...state, isLoading: true }
        case ActionTypes.FEE_EDIT_SUCCESS:
            return {...state, isLoading: false, editSuccess: true }
        case ActionTypes.FEE_EDIT_FAILED:
            return {...state, isLoading: false, errMess: action.payload }

        case ActionTypes.FEE_FETCH_SINGLE_REQUEST:
            return {...state, isLoading: true }
        case ActionTypes.FEE_FETCH_SINGLE_SUCCESS:
            return {...state, isLoading: false, fee: action.payload }
        case ActionTypes.FEE_FETCH_SINGLE_FAILED:
            return {...state, isLoading: false, errMess: action.payload }
        case ActionTypes.FEE_FETCH_SINGLE_RESET:
            return { ...state, isLoading: false, fee: {} }
              
        case ActionTypes.MAKE_REQUEST_FEES:
            return { ...state, isLoading: true, errMess: null, fees: [] }
        case ActionTypes.UPDATE_HAS_NEXT_PAGE_FEES:
            return { ...state, hasNextPage: action.payload }
        case ActionTypes.UPDATE_HAS_NEXT_NEXT_PAGE_FEES:
            return { ...state, hasNextNextPage: action.payload }
        
        default:
            return state
    }
}