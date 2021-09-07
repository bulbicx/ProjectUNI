import * as ActionTypes from '../ActionTypes'

export const ProfitLastMonth = (state = {
        isLoading: true,
        errMess: null,
        profit: []
    }, action) => {
    switch(action.type) {
        case ActionTypes.ADD_PROFIT_LAST_MONTH:
            return {...state, isLoading: false, errMess: null, profit: action.payload}

        case ActionTypes.PROFIT_LAST_MONTH_LOADING:
            return {...state, isLoading: true, errMess: null, profit: []}

        case ActionTypes.PROFIT_LAST_MONTH_FAILED:
            return {...state, isLoading: false, errMess: action.payload, profit: []}

        default:
            return state
    }
}