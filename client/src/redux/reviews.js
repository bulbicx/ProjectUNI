// import { REVIEWS } from '../shared/reviews'
import * as ActionTypes from './ActionTypes'

export const Reviews = (state = {
        errMess: null,
        reviews: [],
        review: {}
    }, action) => {
    switch(action.type) {
        case ActionTypes.ADD_REVIEWS:
            return {...state, isLoading: false, errMess: null, reviews: action.payload}

        case ActionTypes.REVIEWS_FAILED:
            return {...state, isLoading: false, errMess: action.payload, reviews: []}

        case ActionTypes.ADD_REVIEW:
            var review = action.payload
            return {...state, reviews: state.reviews.concat(review)}

        case ActionTypes.FETCH_SINGLE_REVIEW_REQUEST:
            return {...state, isLoading: true }
        case ActionTypes.FETCH_SINGLE_REVIEW_SUCCESS:
            return {...state, isLoading: false, review: action.payload }
        case ActionTypes.FETCH_SINGLE_REVIEW_FAILED:
            return {...state, isLoading: false, errMess: action.payload }
        case ActionTypes.FETCH_SINGLE_REVIEW_RESET:
            return {...state, isLoading: false, review: {} }

        case ActionTypes.REVIEW_EDIT_REQUEST:
            return {...state, isLoading: true }
        case ActionTypes.REVIEW_EDIT_SUCCESS:
            return {...state, isLoading: false }
        case ActionTypes.REVIEW_EDIT_FAILED:
            return {...state, isLoading: false, errMess: action.payload }

        default:
            return state
    }
}