import * as ActionTypes from '../ActionTypes'

export const ProfitReport = (state = {
        isLoading: false,
        errMess: null,
        profitReport: []
    }, action) => {
    switch(action.type) {
        case ActionTypes.ADD_CUSTOM_PROFIT_REPORT:
            state.profitReport.push(action.payload)
            return {...state, isLoading: false, errMess: null, profitReport: [...state.profitReport]}

        case ActionTypes.CUSTOM_PROFIT_REPORT_LOADING:
            return {...state, isLoading: true, errMess: null}

        case ActionTypes.CUSTOM_PROFIT_REPORT_FAILED:
            return {...state, isLoading: false, errMess: action.payload, profitReport: []}
        
        case ActionTypes.CUSTOM_PROFIT_CLEAR_ARRAY:
            return {...state, isLoading: false, errMess: null, profitReport: []}

        default:
            return state
    }
}