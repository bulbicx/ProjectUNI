import * as ActionTypes from '../ActionTypes'

export const Minus14Sales = (state = {
        isLoading: true,
        errMess: null,
        minus14Sales: []
    }, action) => {
    switch(action.type) {
        case ActionTypes.ADD_MINUS14_SALES:
            return {...state, isLoading: false, errMess: null, minus14Sales: action.payload}

        case ActionTypes.SALES_MINUS14_LOADING:
            return {...state, isLoading: true, errMess: null, minus14Sales: []}

        case ActionTypes.SALES_MINUS14_FAILED:
            return {...state, isLoading: false, errMess: action.payload, minus14Sales: []}

        default:
            return state
    }
}