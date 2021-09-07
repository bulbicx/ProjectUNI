import * as ActionTypes from './ActionTypes'

export const Appointments = (state = {
        isLoading: true,
        errMess: null,
        appointments: [],
        appointment: {}
    }, action) => {
    switch(action.type) {
        case ActionTypes.ADD_APPOINTMENTS:
            return {...state, isLoading: false, errMess: null, appointments: action.payload}
        case ActionTypes.APPOINTMENTS_LOADING:
            return {...state, isLoading: true, errMess: null, appointments: []}
        case ActionTypes.APPOINTMENTS_FAILED:
            return { ...state, isLoading: false, errMess: action.payload, appointments: [] }
        
        case ActionTypes.ADD_APPOINTMENT_LOADING:
            return {...state, isLoading: true }
        case ActionTypes.ADD_APPOINTMENT_SUCCESS:
            return {...state, isLoading: false, success: true, errMess: null}
        case ActionTypes.ADD_APPOINTMENT_FAILED:
            return {...state, isLoading: false, errMess: action.payload }

        case ActionTypes.DELETE_APPOINTMENT_REQUEST:
            return {...state, isLoading: true  }
        case ActionTypes.DELETE_APPOINTMENT_SUCCESS:
            return {...state, isLoading: false, errMess: null}
        case ActionTypes.DELETE_APPOINTMENT_FAILED:
            return {...state, isLoading: false, errMess: action.payload }

        case ActionTypes.APPOINTMENT_EDIT_REQUEST:
            return {...state, isLoading: true }
        case ActionTypes.APPOINTMENT_EDIT_SUCCESS:
            return {...state, isLoading: false, editSuccess: true }
        case ActionTypes.APPOINTMENT_EDIT_FAILED:
            return {...state, isLoading: false, errMess: action.payload }
                      
        default:
            return state
    }
}