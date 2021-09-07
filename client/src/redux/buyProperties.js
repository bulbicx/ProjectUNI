import * as ActionTypes from './ActionTypes'

export const BuyProperties = (state = {
        isLoading: true,
        errMess: null,
        properties: [],
        count: 0
    }, action) => {
    switch(action.type) {
        case ActionTypes.ADD_PROPERTIES_BUY://properties are passed in payload
            return {...state, isLoading: false, errMess: null, properties: action.payload.results, count: action.payload.count}

        case ActionTypes.BUY_PROPERTIES_LOADING:
            return {...state, isLoading: true, errMess: null, properties: [], count: 0}

        case ActionTypes.BUY_PROPERTIES_FAILED:
            return {...state, isLoading: false, errMess: action.payload, properties: [], count: 0}
        
        case ActionTypes.PROPERTY_SEARCH_BUY_REQUEST:
            return {...state, isLoading: true, errMess: null, properties: [], count: 0}

        case ActionTypes.PROPERTY_SEARCH_BUY_SUCCESS:
            return {...state, isLoading: false, errMess: null, properties: action.payload.results, count: action.payload.count}

        case ActionTypes.PROPERTY_SEARCH_BUY_FAILED:
            return { ...state, isLoading: false, errMess: action.payload, properties: [], count: 0 } 
                
        case ActionTypes.MAKE_REQUEST_PROPERTIES_BUY:
            return { ...state, isLoading: true, errMess: null, properties: [], count: 0 }
        
        case ActionTypes.UPDATE_HAS_NEXT_PAGE_PROPERTIES_BUY:
            return { ...state, hasNextPage: action.payload  }
        
        case ActionTypes.UPDATE_HAS_NEXT_NEXT_PAGE_PROPERTIES_BUY:
            return { ...state, hasNextNextPage: action.payload }

        default:
            return state
    }
}