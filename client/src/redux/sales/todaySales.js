import * as ActionTypes from '../ActionTypes'

export const TodaySales = (state = {
        isLoading: true,
        errMess: null,
        todaySales: []
    }, action) => {
    switch(action.type) {
        case ActionTypes.ADD_TODAY_SALES:
            return {...state, isLoading: false, errMess: null, todaySales: action.payload}

        case ActionTypes.SALES_TODAY_LOADING:
            return {...state, isLoading: true, errMess: null, todaySales: []}

        case ActionTypes.SALES_TODAY_FAILED:
            return {...state, isLoading: false, errMess: action.payload, todaySales: []}

        default:
            return state
    }
}