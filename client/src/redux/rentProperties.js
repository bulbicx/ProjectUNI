import * as ActionTypes from './ActionTypes'

export const RentProperties = (state = {
        isLoading: true,
        errMess: null,
        properties: [],
        count: 0,
    }, action) => {
    switch(action.type) {
        case ActionTypes.ADD_PROPERTIES_RENT://properties are passed in payload
            return {...state, isLoading: false, errMess: null, properties: action.payload.results, count: action.payload.count}

        case ActionTypes.RENT_PROPERTIES_LOADING:
            return {...state, isLoading: true, errMess: null, properties: [], count: 0}

        case ActionTypes.RENT_PROPERTIES_FAILED:
            return {...state, isLoading: false, errMess: action.payload, properties: [], count: 0}

        case ActionTypes.PROPERTY_SEARCH_RENT_REQUEST:
            return {...state, isLoading: true, errMess: null, properties: [], count: 0}

        case ActionTypes.PROPERTY_SEARCH_RENT_SUCCESS:
            return {...state, isLoading: false, errMess: null, properties: action.payload.results, count: action.payload.count}

        case ActionTypes.PROPERTY_SEARCH_RENT_FAILED:
            return { ...state, isLoading: false, errMess: action.payload, properties: [], count: 0 } 
        
        case ActionTypes.MAKE_REQUEST_PROPERTIES_RENT:
            return { ...state, isLoading: true, errMess: null, properties: [], count: 0 }
        
        case ActionTypes.UPDATE_HAS_NEXT_PAGE_PROPERTIES_RENT:
            return { ...state, hasNextPage: action.payload  }
        
        case ActionTypes.UPDATE_HAS_NEXT_NEXT_PAGE_PROPERTIES_RENT:
            return { ...state, hasNextNextPage: action.payload }
        

        default:
            return state
    }
}