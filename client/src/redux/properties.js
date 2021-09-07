import * as ActionTypes from './ActionTypes'

export const Properties = (state = {
        isLoading: true,
        errMess: null,
        properties: [],
        property: {}
    }, action) => {
    switch(action.type) {
        case ActionTypes.ADD_PROPERTIES://properties are passed in payload
            return {...state, isLoading: false, errMess: null, properties: action.payload}

        case ActionTypes.PROPERTIES_LOADING:
            return {...state, isLoading: true, errMess: null, properties: []}

        case ActionTypes.PROPERTIES_FAILED:
            return {...state, isLoading: false, errMess: action.payload, properties: []}   

        case ActionTypes.PROPERTY_CREATE_REQUEST:
            return {...state, isLoading: true }
        case ActionTypes.PROPERTY_CREATE_SUCCESS:
            return {...state, isLoading: false, propertysuccess: true, errMess: null}
        case ActionTypes.PROPERTY_CREATE_FAILED:
            return {...state, isLoading: false, errMess: action.payload }

        case ActionTypes.PROPERTY_DELETE_REQUEST:
            return {...state, isLoading: true  }
        case ActionTypes.PROPERTY_DELETE_SUCCESS:
            return {...state, isLoading: false, errMess: null}
        case ActionTypes.PROPERTY_DELETE_FAILED:
            return {...state, isLoading: false, errMess: action.payload }

        case ActionTypes.PROPERTY_EDIT_REQUEST:
            return {...state, isLoading: true }
        case ActionTypes.PROPERTY_EDIT_SUCCESS:
            return {...state, isLoading: false, editSuccess: true }
        case ActionTypes.PROPERTY_EDIT_FAILED:
            return {...state, isLoading: false, errMess: action.payload }
        case ActionTypes.PROPERTY_EDIT_RESET:
            return {...state, isLoading: false, editSuccess: false }

        case ActionTypes.PROPERTY_FETCH_SINGLE_REQUEST:
            return {...state, isLoading: true }
        case ActionTypes.PROPERTY_FETCH_SINGLE_SUCCESS:
            return {...state, isLoading: false, property: action.payload }
        case ActionTypes.PROPERTY_FETCH_SINGLE_FAILED:
            return {...state, isLoading: false, errMess: action.payload }
        case ActionTypes.PROPERTY_FETCH_SINGLE_RESET:
            return { ...state, isLoading: false, property: {} }
        
        case ActionTypes.MAKE_REQUEST_PROPERTIES:
            return { ...state, isLoading: true, errMess: null, properties: [] }
        case ActionTypes.UPDATE_HAS_NEXT_PAGE_PROPERTIES:
            return { ...state, hasNextPage: action.payload }
        case ActionTypes.UPDATE_HAS_NEXT_NEXT_PAGE_PROPERTIES:
            return { ...state, hasNextNextPage: action.payload }
        

        default:
            return state
    }
}