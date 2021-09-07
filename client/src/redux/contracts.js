import * as ActionTypes from './ActionTypes'

export const Contracts = (state = {
    isLoading: true,
    errMess: null,
    contracts: [],
    contract: {}
}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_CONTRACTS:
            return {...state, isLoading: false, errMess: null, contracts: action.payload}
        
        case ActionTypes.CONTRACTS_LOADING:
            return {...state, isLoading: true, errMess: null, contracts: []}

        case ActionTypes.CONTRACTS_FAILED:
            return {...state, isLoading: false, errMess: action.payload, contracts: []}

        case ActionTypes.CONTRACT_CREATE_REQUEST:
            return {...state, isLoading: true }
        case ActionTypes.CONTRACT_CREATE_SUCCESS:
            return {...state, isLoading: false, contractsuccess: true, errMess: null}
        case ActionTypes.CONTRACT_CREATE_FAILED:
            return {...state, isLoading: false, errMess: action.payload }

        case ActionTypes.CONTRACT_DELETE_REQUEST:
            return {...state, isLoading: true  }
        case ActionTypes.CONTRACT_DELETE_SUCCESS:
            return {...state, isLoading: false, errMess: null}
        case ActionTypes.CONTRACT_DELETE_FAILED:
            return {...state, isLoading: false, errMess: action.payload }

        case ActionTypes.CONTRACT_EDIT_REQUEST:
            return {...state, isLoading: true }
        case ActionTypes.CONTRACT_EDIT_SUCCESS:
            return {...state, isLoading: false, editSuccess: true }
        case ActionTypes.CONTRACT_EDIT_FAILED:
            return {...state, isLoading: false, errMess: action.payload }

        case ActionTypes.CONTRACT_FETCH_SINGLE_REQUEST:
            return {...state, isLoading: true }
        case ActionTypes.CONTRACT_FETCH_SINGLE_SUCCESS:
            return {...state, isLoading: false, contract: action.payload }
        case ActionTypes.CONTRACT_FETCH_SINGLE_FAILED:
            return {...state, isLoading: false, errMess: action.payload }
        case ActionTypes.CONTRACT_FETCH_SINGLE_RESET:
            return { ...state, isLoading: false, contract: {} }
        
                
        case ActionTypes.MAKE_REQUEST_CONTRACTS:
            return { ...state, isLoading: true, errMess: null, contracts: [] }
        case ActionTypes.UPDATE_HAS_NEXT_PAGE_CONTRACTS:
            return { ...state, hasNextPage: action.payload }
        case ActionTypes.UPDATE_HAS_NEXT_NEXT_PAGE_CONTRACTS:
            return { ...state, hasNextNextPage: action.payload }

        default:
            return state
    }
}