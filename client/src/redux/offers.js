import * as ActionTypes from './ActionTypes'

export const Offers = (state = {
        isLoading: false,
        errMess: null,
        offers: [],
        offer: {}
    }, action) => {
    switch(action.type) {
        case ActionTypes.ADD_OFFERS://properties are passed in payload
            return {...state, isLoading: false, errMess: null, offers: action.payload}
        case ActionTypes.OFFERS_LOADING:
            return {...state, isLoading: true, errMess: null, offers: []}
        case ActionTypes.OFFERS_FAILED:
            return {...state, isLoading: false, errMess: action.payload, offers: []}   

        case ActionTypes.OFFER_CREATE_REQUEST:
            return {...state, isLoading: true }
        case ActionTypes.OFFER_CREATE_SUCCESS:
            return {...state, isLoading: false, success: true, errMess: null}
        case ActionTypes.OFFER_CREATE_FAILED:
            return { ...state, isLoading: false, errMess: action.payload }
        
        case ActionTypes.OFFER_MODIFY_REQUEST:
            return {...state, isLoading: true }
        case ActionTypes.OFFER_MODIFY_SUCCESS:
            return {...state, isLoading: false, success: true, errMess: null}
        case ActionTypes.OFFER_MODIFY_FAILED:
            return { ...state, isLoading: false, errMess: action.payload }

        case ActionTypes.REMOVE_OFFER_REQUEST:
            return {...state, isLoading: true  }
        case ActionTypes.REMOVE_OFFER_SUCCESS:
            return {...state, isLoading: false, errMess: null}
        case ActionTypes.REMOVE_OFFER_FAILED:
            return { ...state, isLoading: false, errMess: action.payload }
        
        case ActionTypes.DECLINE_OFFER_REQUEST:
            return {...state, isLoading: true  }
        case ActionTypes.DECLINE_OFFER_SUCCESS:
            return {...state, isLoading: false, errMess: null}
        case ActionTypes.DECLINE_OFFER_FAILED:
            return {...state, isLoading: false, errMess: action.payload }

        default:
            return state
    }
}