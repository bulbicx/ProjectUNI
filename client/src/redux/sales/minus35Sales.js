import * as ActionTypes from '../ActionTypes'

export const Minus35Sales = (state = {
        isLoading: true,
        errMess: null,
        minus35Sales: []
    }, action) => {
    switch(action.type) {
        case ActionTypes.ADD_MINUS35_SALES:
            return {...state, isLoading: false, errMess: null, minus35Sales: action.payload}

        case ActionTypes.SALES_MINUS35_LOADING:
            return {...state, isLoading: true, errMess: null, minus35Sales: []}

        case ActionTypes.SALES_MINUS35_FAILED:
            return {...state, isLoading: false, errMess: action.payload, minus35Sales: []}

        default:
            return state
    }
}