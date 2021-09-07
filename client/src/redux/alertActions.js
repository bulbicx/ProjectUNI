import * as ActionTypes from './ActionTypes'

export const alertActions = {
    success,
    error,
    clear
}

function success(message) {
    return { 
        type: ActionTypes.ALERT_SUCCESS,
        message
    }
}

function error(message) {
    return {
        type: ActionTypes.ALERT_ERROR,
        message
    }
}

function clear() {
    return { type: ActionTypes.ALERT_CLEAR }
}