import * as ActionTypes from '../ActionTypes'

export const Minus21Sales = (state = {
        isLoading: true,
        errMess: null,
        minus21Sales: []
    }, action) => {
    switch(action.type) {
        case ActionTypes.ADD_MINUS21_SALES:
            return {...state, isLoading: false, errMess: null, minus21Sales: action.payload}

        case ActionTypes.SALES_MINUS21_LOADING:
            return {...state, isLoading: true, errMess: null, minus21Sales: []}

        case ActionTypes.SALES_MINUS21_FAILED:
            return {...state, isLoading: false, errMess: action.payload, minus21Sales: []}

        default:
            return state
    }
}