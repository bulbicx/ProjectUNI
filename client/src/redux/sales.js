import * as ActionTypes from './ActionTypes'

export const Sales = (state = {
        isLoading: true,
        errMess: null,
        sales: [],
        sale: {}
    }, action) => {
    switch(action.type) {
        case ActionTypes.ADD_SALES:
            return {...state, isLoading: false, errMess: null, sales: action.payload}

        case ActionTypes.SALES_LOADING:
            return {...state, isLoading: true, errMess: null, sales: []}

        case ActionTypes.SALES_FAILED:
            return {...state, isLoading: false, errMess: action.payload, sales: []}

        case ActionTypes.SALE_CREATE_REQUEST:
            return {...state, isLoading: true }
        case ActionTypes.SALE_CREATE_SUCCESS:
            return {...state, isLoading: false, salesuccess: true, errMess: null}
        case ActionTypes.SALE_CREATE_FAILED:
            return {...state, isLoading: false, errMess: action.payload }

        case ActionTypes.SALE_DELETE_REQUEST:
            return {...state, isLoading: true  }
        case ActionTypes.SALE_DELETE_SUCCESS:
            return {...state, isLoading: false, errMess: null}
        case ActionTypes.SALE_DELETE_FAILED:
            return {...state, isLoading: false, errMess: action.payload }

        case ActionTypes.SALE_EDIT_REQUEST:
            return {...state, isLoading: true }
        case ActionTypes.SALE_EDIT_SUCCESS:
            return {...state, isLoading: false, editSuccess: true }
        case ActionTypes.SALE_EDIT_FAILED:
            return {...state, isLoading: false, errMess: action.payload }

        case ActionTypes.SALE_FETCH_SINGLE_REQUEST:
            return {...state, isLoading: true }
        case ActionTypes.SALE_FETCH_SINGLE_SUCCESS:
            return {...state, isLoading: false, sale: action.payload }
        case ActionTypes.SALE_FETCH_SINGLE_FAILED:
            return {...state, isLoading: false, errMess: action.payload }
        case ActionTypes.SALE_FETCH_SINGLE_RESET:
            return { ...state, isLoading: false, sale: {} }
        
                
        case ActionTypes.MAKE_REQUEST_SALES:
            return { ...state, isLoading: true, errMess: null, sales: [] }
        case ActionTypes.UPDATE_HAS_NEXT_PAGE_SALES:
            return { ...state, hasNextPage: action.payload }
        case ActionTypes.UPDATE_HAS_NEXT_NEXT_PAGE_SALES:
            return { ...state, hasNextNextPage: action.payload }

        default:
            return state
    }
}