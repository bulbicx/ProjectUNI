import * as ActionTypes from '../ActionTypes'

export const PropertiesReport = (state = {
        isLoading: false,
        errMess: null,
        propertiesReport: []
    }, action) => {
    switch(action.type) {
        case ActionTypes.ADD_CUSTOM_PROPERTIES_REPORT:
            state.propertiesReport.push(action.payload)
            return {...state, isLoading: false, errMess: null, propertiesReport: [...state.propertiesReport]}

        case ActionTypes.CUSTOM_PROPERTIES_REPORT_LOADING:
            return {...state, isLoading: true, errMess: null}

        case ActionTypes.CUSTOM_PROPERTIES_REPORT_FAILED:
            return {...state, isLoading: false, errMess: action.payload, propertiesReport: []}
        
        case ActionTypes.CUSTOM_PROPERTIES_CLEAR_ARRAY:
            return {...state, isLoading: false, errMess: null, propertiesReport: []}

        default:
            return state
    }
}