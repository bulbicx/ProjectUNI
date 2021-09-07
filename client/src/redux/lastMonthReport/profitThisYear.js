import * as ActionTypes from '../ActionTypes'

export const ProfitThisYear = (state = {
        isLoading: true,
        errMess: null,
        profit: []
    }, action) => {
    switch(action.type) {
        case ActionTypes.ADD_PROFIT_THIS_YEAR:
            return {...state, isLoading: false, errMess: null, profit: action.payload}

        case ActionTypes.PROFIT_THIS_YEAR_LOADING:
            return {...state, isLoading: true, errMess: null, profit: []}

        case ActionTypes.PROFIT_THIS_YEAR_FAILED:
            return {...state, isLoading: false, errMess: action.payload, profit: []}

        default:
            return state
    }
}