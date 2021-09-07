import * as ActionTypes from '../ActionTypes'

export const Minus28Sales = (state = {
        isLoading: true,
        errMess: null,
        minus28Sales: []
    }, action) => {
    switch(action.type) {
        case ActionTypes.ADD_MINUS28_SALES:
            return {...state, isLoading: false, errMess: null, minus28Sales: action.payload}

        case ActionTypes.SALES_MINUS28_LOADING:
            return {...state, isLoading: true, errMess: null, minus28Sales: []}

        case ActionTypes.SALES_MINUS28_FAILED:
            return {...state, isLoading: false, errMess: action.payload, minus28Sales: []}

        default:
            return state
    }
}