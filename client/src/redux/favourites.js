import * as ActionTypes from './ActionTypes'

export const Favourites = (state = {
    isLoading: true,
    errMess: null,
    favourites: []
}, action) => {
    switch(action.type) {
        case ActionTypes.ADD_FAVOURITES:
            return {...state, isLoading: false, errMess: null, favourites:  action.payload}

        case ActionTypes.DELETE_FAVOURITE:
            return {...state, isLoading: false, errMess: null, favourites: [...state.favourites.properties.filter(fav => fav !== action.payload)]}
        
        case ActionTypes.FAVOURITES_LOADING:
            return {...state, isLoading: true, errMess: null, favourites: []}

        case ActionTypes.FAVOURITES_FAILED:
            return {...state, isLoading: false, errMess: action.payload, favourites: []}

        default: 
            return state
    }
}