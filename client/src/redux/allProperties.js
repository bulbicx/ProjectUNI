import * as ActionTypes from './ActionTypes'

export const AllProperties = (state = {
        isLoading: true,
        errMess: null,
        properties: []
    }, action) => {
    switch(action.type) {
        case ActionTypes.ADD_ALL_PROPERTIES://properties are passed in payload
            return {...state, isLoading: false, errMess: null, properties: action.payload}
        case ActionTypes.ALL_PROPERTIES_LOADING:
            return {...state, isLoading: true, errMess: null, properties: []}
        case ActionTypes.ALL_PROPERTIES_FAILED:
            return {...state, isLoading: false, errMess: action.payload, properties: []}   
        

        default:
            return state
    }
}