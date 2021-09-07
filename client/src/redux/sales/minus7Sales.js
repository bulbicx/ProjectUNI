import * as ActionTypes from '../ActionTypes'

export const Minus7Sales = (state = {
        isLoading: true,
        errMess: null,
        minus7Sales: []
    }, action) => {
    switch(action.type) {
        case ActionTypes.ADD_MINUS7_SALES:
            return {...state, isLoading: false, errMess: null, minus7Sales: action.payload}

        case ActionTypes.SALES_MINUS7_LOADING:
            return {...state, isLoading: true, errMess: null, minus7Sales: []}

        case ActionTypes.SALES_MINUS7_FAILED:
            return {...state, isLoading: false, errMess: action.payload, minus7Sales: []}

        default:
            return state
    }
}