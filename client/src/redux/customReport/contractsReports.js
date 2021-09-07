import * as ActionTypes from '../ActionTypes'

export const ContractReport = (state = {
        isLoading: false,
        errMess: null,
        contractReport: []
    }, action) => {
    switch(action.type) {
        case ActionTypes.ADD_CUSTOM_CONTRACTS_REPORT:
            state.contractReport.push(action.payload)
            return {...state, isLoading: false, errMess: null, contractReport: [...state.contractReport]}

        case ActionTypes.CUSTOM_CONTRACTS_REPORT_LOADING:
            return {...state, isLoading: true, errMess: null}

        case ActionTypes.CUSTOM_CONTRACTS_REPORT_FAILED:
            return {...state, isLoading: false, errMess: action.payload, contractReport: []}
        
        case ActionTypes.CUSTOM_CONTRACTS_CLEAR_ARRAY:
            return {...state, isLoading: false, errMess: null, contractReport: []}

        default:
            return state
    }
}