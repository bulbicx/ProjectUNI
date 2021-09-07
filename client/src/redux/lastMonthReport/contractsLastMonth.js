import * as ActionTypes from '../ActionTypes'

export const ContractsLastMonth = (state = {
        isLoading: true,
        errMess: null,
        contractsLastMonth: []
    }, action) => {
    switch(action.type) {
        case ActionTypes.ADD_CONTRACTS_LAST_MONTH:
            return {...state, isLoading: false, errMess: null, contractsLastMonth: action.payload}

        case ActionTypes.CONTRACTS_LAST_MONTH_LOADING:
            return {...state, isLoading: true, errMess: null, contractsLastMonth: []}

        case ActionTypes.CONTRACTS_LAST_MONTH_FAILED:
            return {...state, isLoading: false, errMess: action.payload, contractsLastMonth: []}

        default:
            return state
    }
}