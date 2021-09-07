import * as ActionTypes from './ActionTypes'
import { baseUrl } from '../shared/baseUrl'
import { history } from './helpers/history'


export const success = (message) => {
    return { 
        type: ActionTypes.ALERT_SUCCESS,
        message
    }
}

export const error = (message) => {
    return {
        type: ActionTypes.ALERT_ERROR,
        message
    }
}

export const clear = () => {
    return { type: ActionTypes.ALERT_CLEAR }
}

export const isThereNextPageRent = (propertyName, pricePcm, school, train, bedNum, crime, pet, pageNo, limit) => async (dispatch) => {
    //  dispatch({ type: ActionTypes.PROPERTY_SEARCH_RENT_REQUEST})

    let params = {
        "param1": propertyName,
        "param2": pricePcm,
        "param3": school,
        "param4": train,
        "param5": bedNum,
        "param6": crime,
        "param7": pet,
        "page": pageNo,
        "limit": limit
    }

    let query = Object.keys(params)
                .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
                .join('&')

    return await fetch(baseUrl + 'properties-to-rent?' + query, {
        method: 'GET',
    })
    .then(response => {
        if (response.ok) {
            return response
        }
        else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    },
    error => {
        var errmess = new Error(error.message);
        throw errmess;
    })
    .then(response => response.json())
    .then(res => dispatch({ 
        type: ActionTypes.UPDATE_HAS_NEXT_PAGE_PROPERTIES_RENT,
        payload:  res.results.length !== 0 
     }))
    .catch(error => dispatch({
        type: ActionTypes.PROPERTY_SEARCH_RENT_FAILED,
        payload: error.message
    }))
}

export const isThereNextNextPageRent = (propertyName, pricePcm, school, train, bedNum, crime, pet, pageNo, limit) => async (dispatch) => {
    //  dispatch({ type: ActionTypes.PROPERTY_SEARCH_RENT_REQUEST})

    let params = {
        "param1": propertyName,
        "param2": pricePcm,
        "param3": school,
        "param4": train,
        "param5": bedNum,
        "param6": crime,
        "param7": pet,
        "page": pageNo,
        "limit": limit
    }

    let query = Object.keys(params)
                .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
                .join('&')

    return await fetch(baseUrl + 'properties-to-rent?' + query, {
        method: 'GET',
    })
    .then(response => {
        if (response.ok) {
            return response
        }
        else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    },
    error => {
        var errmess = new Error(error.message);
        throw errmess;
    })
    .then(response => response.json())
    .then(res => dispatch({ 
        type: ActionTypes.UPDATE_HAS_NEXT_NEXT_PAGE_PROPERTIES_RENT,
        payload:  res.results.length !== 0 
     }))
    .catch(error => dispatch({
        type: ActionTypes.PROPERTY_SEARCH_RENT_FAILED,
        payload: error.message
    }))
}

export const searchRentProperty = (propertyName, pricePcm, school, train, bedNum, crime, pet, pageNo, limit) => async (dispatch) => {
    dispatch({ type: ActionTypes.PROPERTY_SEARCH_RENT_REQUEST})

    let params = {
        "param1": propertyName,
        "param2": pricePcm,
        "param3": school,
        "param4": train,
        "param5": bedNum,
        "param6": crime,
        "param7": pet,
        "page": pageNo,
        "limit": limit
    }

    let query = Object.keys(params)
                .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
                .join('&')

    return await fetch(baseUrl + 'properties-to-rent?' + query, {
        method: 'GET',
    })
    .then(response => {
        if (response.ok) {
            return response
        }
        else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    },
    error => {
        var errmess = new Error(error.message);
        throw errmess;
    })
    .then(response => response.json())
    .then(properties => dispatch({ 
        type: ActionTypes.PROPERTY_SEARCH_RENT_SUCCESS,
        payload: properties
     }))
    .catch(error => dispatch({
        type: ActionTypes.PROPERTY_SEARCH_RENT_FAILED,
        payload: error.message
    }))
}

export const searchBuyProperty = (propertyName, salePrice, school, train, bedNum, crime, pageNo, limit) => async (dispatch) => {
    dispatch({ type: ActionTypes.PROPERTY_SEARCH_BUY_REQUEST})

    let params = {
        "param1": propertyName,
        "param2": salePrice,
        "param3": school,
        "param4": train,
        "param5": bedNum,
        "param6": crime,
        "page": pageNo,
        "limit": limit
    }

    let query = Object.keys(params)
                .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
                .join('&')

    return await fetch(baseUrl + 'properties-to-buy?' + query, {
        method: 'GET',
    })
    .then(response => {
        if (response.ok) {
            return response
        }
        else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    },
    error => {
        var errmess = new Error(error.message);
        throw errmess;
    })
    .then(response => response.json())
    .then(properties => dispatch({ 
        type: ActionTypes.PROPERTY_SEARCH_BUY_SUCCESS,
        payload: properties
     }))
    .catch(error => dispatch({
        type: ActionTypes.PROPERTY_SEARCH_BUY_FAILED,
        payload: error.message
    }))
}

export const isThereNextPageBuy = (propertyName, salePrice, school, train, bedNum, crime, pageNo, limit) => async (dispatch) => {

    let params = {
        "param1": propertyName,
        "param2": salePrice,
        "param3": school,
        "param4": train,
        "param5": bedNum,
        "param6": crime,
        "page": pageNo,
        "limit": limit
    }

    let query = Object.keys(params)
                .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
                .join('&')

    return await fetch(baseUrl + 'properties-to-buy?' + query, {
        method: 'GET',
    })
    .then(response => {
        if (response.ok) {
            return response
        }
        else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    },
    error => {
        var errmess = new Error(error.message);
        throw errmess;
    })
    .then(response => response.json())
    .then(res => dispatch({ 
        type: ActionTypes.UPDATE_HAS_NEXT_PAGE_PROPERTIES_BUY,
        payload:  res.results.length !== 0 
     }))
    .catch(error => dispatch({
        type: ActionTypes.PROPERTY_SEARCH_BUY_FAILED,
        payload: error.message
    }))
}

export const isThereNextNextPageBuy = (propertyName, salePrice, school, train, bedNum, crime, pageNo, limit) => async (dispatch) => {

    let params = {
        "param1": propertyName,
        "param2": salePrice,
        "param3": school,
        "param4": train,
        "param5": bedNum,
        "param6": crime,
        "page": pageNo,
        "limit": limit
    }

    let query = Object.keys(params)
                .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
                .join('&')

    return await fetch(baseUrl + 'properties-to-buy?' + query, {
        method: 'GET',
    })
    .then(response => {
        if (response.ok) {
            return response
        }
        else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    },
    error => {
        var errmess = new Error(error.message);
        throw errmess;
    })
    .then(response => response.json())
    .then(res => dispatch({ 
        type: ActionTypes.UPDATE_HAS_NEXT_NEXT_PAGE_PROPERTIES_BUY,
        payload:  res.results.length !== 0 
     }))
    .catch(error => dispatch({
        type: ActionTypes.PROPERTY_SEARCH_BUY_FAILED,
        payload: error.message
    }))
}

export const fetchAllProperties = () => (dispatch) => {
    dispatch({
        type: ActionTypes.ALL_PROPERTIES_LOADING
    })

    return fetch(baseUrl + 'all-properties')
        .then(response => {
            if (response.ok) {
                return response
            }
            else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText)
                error.response = response
                throw error
            }
        },
        error => {
            var errmess = new Error(error.message);
            throw errmess;
        })
        .then(response => response.json())
        .then(properties => dispatch({
            type: ActionTypes.ADD_ALL_PROPERTIES,
            payload: properties
        }))
        .catch(error => dispatch({
            type: ActionTypes.ALL_PROPERTIES_FAILED,
            payload: error.message
        }))
}

export const fetchProperties = () => (dispatch) => {
    dispatch(propertiesLoading(true))

    return fetch(baseUrl + 'properties')
        .then(response => {
            if (response.ok) {
                return response
            }
            else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText)
                error.response = response
                throw error
            }
        },
        error => {
            var errmess = new Error(error.message);
            throw errmess;
        })
        .then(response => response.json())
        .then(properties => dispatch(addProperties(properties)))
        .catch(error => dispatch(propertiesFailed(error.message)))
}

export const propertiesLoading = () => ({
    type: ActionTypes.PROPERTIES_LOADING
})

export const propertiesFailed = (errness) => ({
    type: ActionTypes.PROPERTIES_FAILED,
    payload: errness
})

export const createProperty = (property) => (dispatch) => {

    const token = 'Bearer ' + localStorage.getItem('token')

    dispatch({
        type: ActionTypes.PROPERTY_CREATE_REQUEST
    })

    return fetch(baseUrl + 'properties' , {
        method: "POST",
        body: JSON.stringify(property),
        headers: {
            "Content-Type": "application/json",
            "Authorization": token
        }
    })
    .then(response => {
        if (response.ok) {
            dispatch(fetchProperties())
            dispatch(fetchBuyProperties())
            dispatch(fetchRentProperties())
            history.push('/admin/dashboard/properties')
            dispatch(success('A new property has been added successfully!'))
            return response
        }
        else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText)
            error.response = response
            dispatch(error(error.message))
            throw error
        }
    },
    error => {
        var errmess = new Error(error.message);
        dispatch(error(error.message))
        throw errmess;
    })
    .then(response => response.json())
    .then(properties => dispatch({
        type: ActionTypes.PROPERTY_CREATE_SUCCESS
    }))
    .catch(error => 
        {dispatch({
            type: ActionTypes.PROPERTY_CREATE_FAILED,
            payload: error.message
        })
        dispatch(error(error.message))}
    )
}

export const updateProperty = (property) => (dispatch) => {

    const token = 'Bearer ' + localStorage.getItem('token')

    dispatch({
        type: ActionTypes.PROPERTY_EDIT_REQUEST
    })

    return fetch(baseUrl + 'properties/' + property._id, {
        method: "PUT",
        body: JSON.stringify(property),
        headers: {
            "Content-Type": "application/json",
            "Authorization": token
        }
    })
    .then(response => {
        if (response.ok) {
            dispatch(fetchProperties())
            dispatch(fetchBuyProperties())
            dispatch(fetchRentProperties())
            history.push('/admin/dashboard/properties')
            dispatch(success(`Property ${property.propertyName} has been updated successfully!`))
            return response
        }
        else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText)
            error.response = response
            dispatch(error(error.message))
            throw error
        }
    },
    error => {
        var errmess = new Error(error.message);
        dispatch(error(error.message))
        throw errmess;
    })
    .then(response => response.json())
    .then(properties => 
        {

            dispatch({
                type: ActionTypes.PROPERTY_EDIT_SUCCESS
            })
            dispatch({
                type: ActionTypes.PROPERTY_FETCH_SINGLE_RESET
            })
        }
    
    )
    .catch(error => 
        {
            dispatch({
                type: ActionTypes.PROPERTY_EDIT_FAILED,
                payload: error.message
            })
            dispatch(error(error.message))
        }
    )
}

export const deleteProperty = (id) => (dispatch) => {

    const token = 'Bearer ' + localStorage.getItem('token')

    dispatch({
        type: ActionTypes.PROPERTY_DELETE_REQUEST
    })

    return fetch(baseUrl + 'properties/' + id, {
        method: "DELETE",
        headers: {
            Authorization: token
        }
    })
    .then(response => {
        if (response.ok) {
            dispatch(fetchProperties())
            dispatch(fetchBuyProperties())
            dispatch(fetchRentProperties())
            dispatch(success(`Property ${id} has been deleted successfully!`))
            return response
        }
        else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText)
            error.response = response
            dispatch(error(error.message))
            throw error
        }
    },
    error => {
        var errmess = new Error(error.message)
        dispatch(error(error.message))
        throw errmess;
    })
    .then(response => response.json())
    .then(properties => dispatch({
        type: ActionTypes.PROPERTY_DELETE_SUCCESS
    }))
    .catch(error => 
        {
            dispatch({
                type: ActionTypes.PROPERTY_DELETE_FAILED,
                payload: error.message
            })
            dispatch(error(error.message))
        }
    )
}

export const getPropertyDetails = (id) => async (dispatch) => {

    const token = 'Bearer ' + localStorage.getItem('token')

    dispatch({
        type: ActionTypes.PROPERTY_FETCH_SINGLE_REQUEST
    })

    return await fetch(baseUrl + 'properties/' + id, {       
        headers: {
            Authorization: token
        }
    })
    .then(response => {
        if (response.ok) {     
            dispatch(fetchProperties())      
            return response
        }
        else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText)
            error.response = response
            dispatch(error(error.message))
            throw error
        }
    },
    error => {
        var errmess = new Error(error.message);
        dispatch(error(error.message))
        throw errmess;
    })
    .then(response => response.json())
    .then(res => dispatch({
        type: ActionTypes.PROPERTY_FETCH_SINGLE_SUCCESS,
        payload: res
    }))    
    .catch(error => dispatch({
        type: ActionTypes.PROPERTY_FETCH_SINGLE_FAILED,
        payload: error.message
    }))
}

export const addLandlords = (landlords) => ({
    type: ActionTypes.ADD_LANDLORDS,
    payload: landlords
})

export const fetchLandlords = () => (dispatch) => {
    
    dispatch({
        type: ActionTypes.LANDLORDS_LOADING
    })

    const token = 'Bearer ' + localStorage.getItem('token')

    return fetch(baseUrl + 'landlords', {
        headers: {
            'Authorization': token
        }
    })
    .then(response => {
        if (response.ok) {
            return response
        }
        else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText)
            error.response = response
            throw error
        }
    },
    error => {
        var errmess = new Error(error.message);
        throw errmess;
    })
    .then(response => response.json())
    .then(landlords => dispatch(addLandlords(landlords)))
    .catch(error => dispatch({
        type: ActionTypes.LANDLORDS_FAILED,
        payload: error.message
    }))
}

export const createLandlord = (landlord) => (dispatch) => {

    const token = 'Bearer ' + localStorage.getItem('token')

    dispatch({
        type: ActionTypes.LANDLORD_CREATE_REQUEST
    })

    return fetch(baseUrl + 'landlords' , {
        method: "POST",
        body: JSON.stringify(landlord),
        headers: {
            "Content-Type": "application/json",
            "Authorization": token
        }
    })
    .then(response => {
        if (response.ok) {
            dispatch(fetchLandlords())
            history.push('/admin/dashboard/landlords')
            dispatch(success('A new landlord has been added successfully!'))
            return response
        }
        else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText)
            error.response = response
            dispatch(error(error.message))
            throw error
        }
    },
    error => {
        var errmess = new Error(error.message);
        dispatch(error(error.message))
        throw errmess;
    })
    .then(response => response.json())
    .then(landlords => dispatch({
        type: ActionTypes.LANDLORD_CREATE_SUCCESS
    }))
    .catch(err => 
        dispatch({
            type: ActionTypes.LANDLORD_CREATE_FAILED,
            payload: err.message
        })
    )
}

export const deleteLandlord = (id) => (dispatch) => {

    const token = 'Bearer ' + localStorage.getItem('token')

    dispatch({
        type: ActionTypes.LANDLORD_DELETE_REQUEST
    })

    return fetch(baseUrl + 'landlords/' + id, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": token
        }
    })
    .then(response => {
        if (response.ok) {
            dispatch(fetchLandlords())
            dispatch(success(`Landlord ${id} has been deleted successfully!`))
            return response
        }
        else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText)
            error.response = response
            dispatch(error(error.message))
            throw error
        }
    },
    error => {
        var errmess = new Error(error.message);
        dispatch(error(error.message))
        throw errmess;
    })
    .then(response => response.json())
    .then(landlords => dispatch({
        type: ActionTypes.LANDLORD_DELETE_SUCCESS
    }))
    .catch(error => 
        {
            dispatch({
                type: ActionTypes.LANDLORD_DELETE_FAILED,
                payload: error.message
            })
            dispatch(error(error.message))
        }
    )
}

export const getLandlordDetails = (id) => async (dispatch) => {

    const token = 'Bearer ' + localStorage.getItem('token')

    dispatch({
        type: ActionTypes.LANDLORD_FETCH_SINGLE_REQUEST
    })

    return await fetch(baseUrl + 'landlords/' + id, {       
        headers: {
            Authorization: token
        }
    })
    .then(response => {
        if (response.ok) {     
            dispatch(fetchLandlords())      
            return response
        }
        else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText)
            error.response = response
            throw error
        }
    },
    error => {
        var errmess = new Error(error.message);
        dispatch(error(error.message))
        throw errmess;
    })
    .then(response => response.json())
    .then(res => dispatch({
        type: ActionTypes.LANDLORD_FETCH_SINGLE_SUCCESS,
        payload: res
    }))    
    .catch(error => dispatch({
        type: ActionTypes.LANDLORD_FETCH_SINGLE_FAILED,
        payload: error.message
    }))
}

export const updateLandlord = (landlord) => (dispatch) => {

    const token = 'Bearer ' + localStorage.getItem('token')

    dispatch({
        type: ActionTypes.LANDLORD_EDIT_REQUEST
    })

    return fetch(baseUrl + 'landlords/' + landlord._id, {
        method: "PUT",
        body: JSON.stringify(landlord),
        headers: {
            "Content-Type": "application/json",
            "Authorization": token
        }
    })
    .then(response => {
        if (response.ok) {
            dispatch(fetchLandlords())
            history.push('/admin/dashboard/landlords')
            dispatch(success(`Landlord ${landlord._id} has been updated successfully!`))
            return response
        }
        else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText)
            error.response = response
            dispatch(error(error.message))
            throw error
        }
    },
    error => {
        var errmess = new Error(error.message);
        dispatch(error(error.message))
        throw errmess;
    })
    .then(response => response.json())
    .then(landlords => 
        dispatch({
            type: ActionTypes.LANDLORD_EDIT_SUCCESS
        })
    
    )
    .catch(error => 
        {
            dispatch({
                type: ActionTypes.LANDLORD_EDIT_FAILED,
                payload: error.message
            })
            dispatch(error(error.message))
        }
    )
}


export const createUser = (user) => async (dispatch) => {

    const token = 'Bearer ' + localStorage.getItem('token')

    dispatch({
        type: ActionTypes.CREATE_USER_REQUEST
    })

    return await fetch(baseUrl + 'users' , {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
            "Content-Type": "application/json",
            "Authorization": token
        }
    })
    .then(response => {
        if (response.ok) {
            dispatch(fetchUsers())
            // history.push('/admin/dashboard/users')
            dispatch(success('A new user has been added successfully!'))
            return response
        }
        else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText)
            error.response = response
            dispatch(error(error.message))
            throw error
        }
    },
    error => {
        var errmess = new Error(error.message);
        dispatch(error(error.message))
        throw errmess;
    })
    .then(response => response.json())
    .then(users => dispatch({
        type: ActionTypes.CREATE_USER_SUCCESS
    }))
    .catch(error => 
        dispatch({
            type: ActionTypes.CREATE_USER_FAILED,
            payload: error.message
        })
    )
}

export const deleteUser = (id) => (dispatch) => {

    const token = 'Bearer ' + localStorage.getItem('token')

    dispatch({
        type: ActionTypes.DELETE_USER_REQUEST
    })

    return fetch(baseUrl + 'users/' + id, {
        method: "DELETE",
        headers: {
            Authorization: token
        }
    })
    .then(response => {
        if (response.ok) {
            dispatch(fetchUsers())
            dispatch(success(`User ${id} has been deleted successfully!`))
            return response
        }
        else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText)
            error.response = response
            dispatch(error(error.message))
            throw error
        }
    },
    error => {
        var errmess = new Error(error.message);
        throw errmess;
    })
    .then(response => response.json())
    .then(users => dispatch({
        type: ActionTypes.DELETE_USER_SUCCESS
    }))
    .catch(error => dispatch({
        type: ActionTypes.DELETE_USER_FAILED,
        payload: error.message
    }))
}

export const getUserDetails = (id) => async (dispatch) => {

    const token = 'Bearer ' + localStorage.getItem('token')

    dispatch({
        type: ActionTypes.USER_FETCH_SINGLE_REQUEST
    })

    return await fetch(baseUrl + 'users/' + id, {       
        headers: {
            Authorization: token
        }
    })
    .then(response => {
        if (response.ok) {     
            dispatch(fetchUsers())      
            return response
        }
        else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText)
            error.response = response
            dispatch(error(error.message))
            throw error
        }
    },
    error => {
        var errmess = new Error(error.message);
        dispatch(error(error.message))
        throw errmess;
    })
    .then(response => response.json())
    .then(res => dispatch({
        type: ActionTypes.USER_FETCH_SINGLE_SUCCESS,
        payload: res
    }))    
    .catch(error => dispatch({
        type: ActionTypes.USER_FETCH_SINGLE_FAILED,
        payload: error.message
    }))
}


export const updateUser = (user) => (dispatch) => {

    const token = 'Bearer ' + localStorage.getItem('token')

    dispatch({
        type: ActionTypes.USER_EDIT_REQUEST
    })

    return fetch(baseUrl + 'users/' + user._id, {
        method: "PUT",
        body: JSON.stringify(user),
        headers: {
            "Content-Type": "application/json",
            "Authorization": token
        }
    })
    .then(response => {
        if (response.ok) {
            dispatch(fetchUsers())
            if (user.documents && user.documents.length > 0) {
                
            } else {
                history.push('/admin/dashboard/users')
                dispatch(success(`User ${user._id} has been updated successfully!`))
            }
            return response
        }
        else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText)
            error.response = response
            dispatch(error(error.message))
            throw error
        }
    },
    error => {
        var errmess = new Error(error.message);
        dispatch(error(error.message))
        throw errmess;
    })
    .then(response => response.json())
    .then(users => 
        {
            dispatch({
                type: ActionTypes.USER_EDIT_SUCCESS
            })
            dispatch({
                type: ActionTypes.USER_EDIT_RESET
            })
        }
    
    )
    .catch(error => 
        {
            dispatch({
                type: ActionTypes.USER_EDIT_FAILED,
                payload: error.message
            })
            dispatch(error(error.message))
        }
    )
}

export const addProperties = (properties) => ({
    type: ActionTypes.ADD_PROPERTIES,
    payload: properties
})

export const fetchBuyProperties = () => (dispatch) => {
    dispatch(propertiesBuyLoading(true))

    return fetch(baseUrl + 'properties-to-buy')
        .then(response => {
            if (response.ok) {
                return response
            }
            else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText)
                error.response = response
                throw error
            }
        },
        error => {
            var errmess = new Error(error.message);
            throw errmess;
        })
        .then(response => response.json())
        .then(properties => dispatch(addPropertiesBuy(properties)))
        .catch(error => dispatch(propertiesBuyFailed(error.message)))
}

export const propertiesBuyLoading = () => ({
    type: ActionTypes.BUY_PROPERTIES_LOADING
})

export const propertiesBuyFailed = (errness) => ({
    type: ActionTypes.BUY_PROPERTIES_FAILED,
    payload: errness
})

export const addPropertiesBuy = (properties) => ({
    type: ActionTypes.ADD_PROPERTIES_BUY,
    payload: properties
})

export const fetchRentProperties = () => (dispatch) => {
    dispatch(propertiesRentLoading(true))

    return fetch(baseUrl + 'properties-to-rent')
        .then(response => {
            if (response.ok) {
                return response
            }
            else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText)
                error.response = response
                throw error
            }
        },
        error => {
            var errmess = new Error(error.message);
            throw errmess;
        })
        .then(response => response.json())
        .then(properties => dispatch(addPropertiesRent(properties)))
        .catch(error => dispatch(propertiesRentFailed(error.message)))
}

export const propertiesRentLoading = () => ({
    type: ActionTypes.RENT_PROPERTIES_LOADING
})

export const propertiesRentFailed = (errness) => ({
    type: ActionTypes.RENT_PROPERTIES_FAILED,
    payload: errness
})

export const addPropertiesRent = (properties) => ({
    type: ActionTypes.ADD_PROPERTIES_RENT,
    payload: properties
})

export const postFavourite = (propertyId) => (dispatch) => {

    const bearer = 'Bearer ' + localStorage.getItem('token')

    return fetch(baseUrl + 'my-favourites/' + propertyId, {
        method: 'POST',
        body: JSON.stringify({"_id": propertyId}),
        headers: {
            "Content-Type": "application/json",
            'Authorization': bearer
        },
        credentials: 'same-origin'
    })
    .then(response => {
        if (response.ok) {
            return response
        }
        else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText)
            error.response = response
            throw error
        }
    },
    error => {
        throw error;
    })
    .then(response => response.json())
    .then(favourites =>  dispatch(addFavourites(favourites) ))
    .catch(error => dispatch(favouritesFailed(error.message)))
}

export const deleteFavourite = (propertyId) => (dispatch) => {

    const bearer = 'Bearer ' + localStorage.getItem('token')

    return fetch(baseUrl + 'my-favourites/' + propertyId, {
        method: "DELETE",
        headers: {
          'Authorization': bearer
        },
        credentials: "same-origin"
    })
    .then(response => {
        if (response.ok) {
            dispatch(fetchFavourites())
            dispatch(success('A favourite has been deleted successfully!'))
            return response
        } else {
          var error = new Error('Error ' + response.status + ': ' + response.statusText)
          error.response = response
          dispatch(error(error.message))
          throw error
        }
      },
      error => {
            throw error
      })
    .then(response => response.json())
    .then(favourites =>  dispatch(removeFavourite(propertyId)))
    .catch(error => dispatch(favouritesFailed(error.message)))
}

export const fetchFavourites = () => (dispatch) => {
    dispatch(favouritesLoading(true))

    const bearer = 'Bearer ' + localStorage.getItem('token')

    return fetch(baseUrl + 'my-favourites', {
        headers: {
            'Authorization': bearer
        },
    })
    .then(response => {
        if (response.ok) {
            return response
        }
        else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText)
            error.response = response
            throw error
        }
    },
    error => {
        var errmess = new Error(error.message)
        throw errmess
    })
    .then(response => response.json())
    .then(favourites => dispatch(addFavourites(favourites)))
    .catch(error => dispatch(favouritesFailed(error.message)))
}

export const favouritesLoading = () => ({
    type: ActionTypes.FAVOURITES_LOADING
})

export const favouritesFailed = (errmess) => ({
    type: ActionTypes.FAVOURITES_FAILED,
    payload: errmess
})

export const addFavourites = (favourites) => ({
    type: ActionTypes.ADD_FAVOURITES,
    payload: favourites
})

export const removeFavourite = (favourite) => ({
    type: ActionTypes.DELETE_FAVOURITE,
    payload: favourite
})

export const fetchContracts = () => (dispatch) => {
    dispatch(contractsLoading(true))

    const bearer = 'Bearer ' + localStorage.getItem('token')

    return fetch(baseUrl + 'contract', {
        headers: {
            "Content-Type": "application/json",
            'Authorization': bearer
        },
        credentials: "same-origin"
    })
    .then(response => {
        if (response.ok) {
            return response
        }
        else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText)
            error.response = response
            throw error
        }
    },
    error => {
        var errmess = new Error(error.message)
        throw errmess
    })
    .then(response => response.json())
    .then(contracts => dispatch(addContracts(contracts)))
    .catch(error => dispatch(contractsFailed(error.message)))
}

export const contractsLoading = () => ({
    type: ActionTypes.CONTRACTS_LOADING
})

export const contractsFailed = (errness) => ({
    type: ActionTypes.CONTRACTS_FAILED,
    payload: errness
})

export const addContracts = (contracts) => ({
    type: ActionTypes.ADD_CONTRACTS,
    payload: contracts
})

export const getContractDetails = (id) => async (dispatch) => {

    const token = 'Bearer ' + localStorage.getItem('token')

    dispatch({
        type: ActionTypes.CONTRACT_FETCH_SINGLE_REQUEST
    })

    return await fetch(baseUrl + 'contract/' + id, {       
        headers: {
            Authorization: token
        }
    })
    .then(response => {
        if (response.ok) {     
            dispatch(fetchContracts())      
            return response
        }
        else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText)
            error.response = response
            dispatch(error(error.message))
            throw error
        }
    },
    error => {
        var errmess = new Error(error.message);
        dispatch(error(error.message))
        throw errmess;
    })
    .then(response => response.json())
    .then(res => dispatch({
        type: ActionTypes.CONTRACT_FETCH_SINGLE_SUCCESS,
        payload: res
    }))    
    .catch(error => dispatch({
        type: ActionTypes.CONTRACT_FETCH_SINGLE_FAILED,
        payload: error.message
    }))
}

export const createContract = (contract) => (dispatch) => {

    const token = 'Bearer ' + localStorage.getItem('token')

    dispatch({
        type: ActionTypes.CONTRACT_CREATE_REQUEST
    })

    return fetch(baseUrl + 'contract' , {
        method: "POST",
        body: JSON.stringify(contract),
        headers: {
            "Content-Type": "application/json",
            "Authorization": token
        }
    })
    .then(response => {
        if (response.ok) {
            dispatch(fetchContracts())
            history.push('/admin/dashboard/contracts')
            dispatch(success('A new contract has been added successfully!'))
            return response
        }
        else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText)
            error.response = response
            dispatch(error(error.message))
            throw error
        }
    },
    error => {
        var errmess = new Error(error.message);
        dispatch(error(error.message))
        throw errmess;
    })
    .then(response => response.json())
    .then(contracts => dispatch({
        type: ActionTypes.CONTRACT_CREATE_SUCCESS
    }))
    .catch(err => 
        dispatch({
            type: ActionTypes.CONTRACT_CREATE_FAILED,
            payload: err.message
        })
    )
}

export const updateContract = (contract) => (dispatch) => {

    const token = 'Bearer ' + localStorage.getItem('token')

    dispatch({
        type: ActionTypes.CONTRACT_EDIT_REQUEST
    })

    return fetch(baseUrl + 'contract/' + contract._id, {
        method: "PUT",
        body: JSON.stringify(contract),
        headers: {
            "Content-Type": "application/json",
            "Authorization": token
        }
    })
    .then(response => {
        if (response.ok) {
            dispatch(fetchContracts())
            history.push('/admin/dashboard/contracts')
            dispatch(success(`Contract ${contract._id} has been updated successfully!`))
            return response
        }
        else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText)
            error.response = response
            dispatch(error(error.message))
            throw error
        }
    },
    error => {
        var errmess = new Error(error.message);
        dispatch(error(error.message))
        throw errmess;
    })
    .then(response => response.json())
    .then(contracts => 
        dispatch({
            type: ActionTypes.CONTRACT_EDIT_SUCCESS
        })
    )
    .catch(error => 
        {
            dispatch({
                type: ActionTypes.CONTRACT_EDIT_FAILED,
                payload: error.message
            })
            dispatch(error(error.message))
        }
    )
}

export const deleteContract = (id) => (dispatch) => {

    const token = 'Bearer ' + localStorage.getItem('token')

    dispatch({
        type: ActionTypes.CONTRACT_DELETE_REQUEST
    })

    return fetch(baseUrl + 'contract/' + id, {
        method: "DELETE",
        headers: {
            Authorization: token
        }
    })
    .then(response => {
        if (response.ok) {
            dispatch(fetchContracts())
            dispatch(success(`Contract ${id} has been deleted successfully!`))
            return response
        }
        else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText)
            error.response = response
            dispatch(error(error.message))
            throw error
        }
    },
    error => {
        var errmess = new Error(error.message)
        dispatch(error(error.message))
        throw errmess;
    })
    .then(response => response.json())
    .then(contracts => dispatch({
        type: ActionTypes.CONTRACT_DELETE_SUCCESS
    }))
    .catch(error => 
        {
            dispatch({
                type: ActionTypes.CONTRACT_DELETE_FAILED,
                payload: error.message
            })
            dispatch(error(error.message))
        }
    )
}

export const addReview = (review) => ({
    type: ActionTypes.ADD_REVIEW,
    payload: review
})

export const reviewsFailed = (errness) => ({
    type: ActionTypes.REVIEWS_FAILED,
    payload: errness
})

export const postReview = (landlordRating, propertyRating, title, reviewBody, propertyId) => (dispatch) => {

    const newReview = {
        landlordRating: landlordRating,
        propertyRating: propertyRating,
        title: title,
        reviewBody: reviewBody,
        property: propertyId
    }

    const bearer = 'Bearer ' + localStorage.getItem('token')

    return fetch(baseUrl + 'reviews', {
            method: 'POST',
            body: JSON.stringify(newReview),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': bearer
            },
            credentials: 'same-origin'
        })
        .then(response => {
            if (response.ok) {
                return response
            }
            else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
        error => {
            var errness = new Error(error.message)
            throw errness
        })
        .then(response => response.json())
        .then(response => dispatch(addReview(response)))
        .then(dispatch(success('Review added successfully!')))
        .catch(error => { 
            dispatch(error(error.message))
            console.log('Post reviews ', error.message);
            // alert('Your review could not be posted\nError: '+ error.message); 
        })
}

export const getReviewDetails = (id) => async (dispatch) => {

    const token = 'Bearer ' + localStorage.getItem('token')

    dispatch({
        type: ActionTypes.FETCH_SINGLE_REVIEW_REQUEST
    })

    return await fetch(baseUrl + 'reviews/' + id, {       
        headers: {
            Authorization: token
        }
    })
    .then(response => {
        if (response.ok) {     
            dispatch(fetchReviews())      
            return response
        }
        else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText)
            error.response = response
            throw error
        }
    },
    error => {
        var errmess = new Error(error.message);
        dispatch(error(error.message))
        throw errmess;
    })
    .then(response => response.json())
    .then(res => dispatch({
        type: ActionTypes.FETCH_SINGLE_REVIEW_SUCCESS,
        payload: res
    }))    
    .catch(error => dispatch({
        type: ActionTypes.FETCH_SINGLE_REVIEW_FAILED,
        payload: error.message
    }))
}


export const updateReview = (review) => (dispatch) => {

    const token = 'Bearer ' + localStorage.getItem('token')

    dispatch({
        type: ActionTypes.REVIEW_EDIT_REQUEST
    })

    return fetch(baseUrl + 'reviews/' + review._id, {
        method: "PUT",
        body: JSON.stringify(review),
        headers: {
            "Content-Type": "application/json",
            "Authorization": token
        }
    })
    .then(response => {
        if (response.ok) {
            dispatch(fetchReviews())
            history.push('/users/account/my-tenancy')
            dispatch(success(`Review has been updated successfully!`))
            return response
        }
        else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText)
            error.response = response
            dispatch(error(error.message))
            throw error
        }
    },
    error => {
        var errmess = new Error(error.message);
        dispatch(error(error.message))
        throw errmess;
    })
    .then(response => response.json())
    .then(reviews => 
        {

            dispatch({
                type: ActionTypes.REVIEW_EDIT_SUCCESS
            })
            dispatch({
                type: ActionTypes.REVIEW_EDIT_RESET
            })
        }
    
    )
    .catch(error => 
        {
            dispatch({
                type: ActionTypes.REVIEW_EDIT_FAILED,
                payload: error.message
            })
            dispatch(error(error.message))
        }
    )
}


export const deleteReview = (id) => (dispatch) => {

    const token = 'Bearer ' + localStorage.getItem('token')

    dispatch({
        type: ActionTypes.REVIEW_DELETE_REQUEST
    })

    return fetch(baseUrl + 'reviews/' + id, {
        method: "DELETE",
        headers: {
            Authorization: token
        }
    })
    .then(response => {
        if (response.ok) {
            dispatch(fetchReviews())
            dispatch(success(`Review ${id} has been deleted successfully!`))
            return response
        }
        else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText)
            error.response = response
            dispatch(error(error.message))
            throw error
        }
    },
    error => {
        var errmess = new Error(error.message)
        dispatch(error(error.message))
        throw errmess;
    })
    .then(response => response.json())
    .then(reviews => dispatch({
        type: ActionTypes.REVIEW_DELETE_SUCCESS
    }))
    .catch(error => 
        {
            dispatch({
                type: ActionTypes.REVIEW_DELETE_FAILED,
                payload: error.message
            })
            dispatch(error(error.message))
        }
    )
}


export const fetchReviews = () => (dispatch) => {
    return fetch(baseUrl + 'reviews')
        .then(response => {
            if(response.ok) {
                return response
            }
            else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
        error => {
            var errmess = new Error(error.message);
            throw errmess;
        })
        .then(response => response.json())
        .then(reviews => dispatch(addReviews(reviews)))
        .catch(error => dispatch(reviewsFailed(error.message)))
}

export const addReviews = (reviews) => ({
    type: ActionTypes.ADD_REVIEWS,
    payload: reviews
})

export const requestLogin = (creds) => {
    return {
        type: ActionTypes.LOGIN_REQUEST,
        creds
    }
}
  
export const receiveLogin = (response) => {
    return {
        type: ActionTypes.LOGIN_SUCCESS,
        token: response.token
    }
}
  
export const loginError = (message) => {
    return {
        type: ActionTypes.LOGIN_FAILURE,
        message
    }
}

export const loginUser = (creds) => async (dispatch) => {
    dispatch(requestLogin(creds))

    return await fetch(baseUrl + 'users/login', {
        method: 'POST',
        headers: { 
            'Content-Type':'application/json' 
        },
        body: JSON.stringify(creds)
    })
    .then(response => {
        if (response.ok) {
            return response
        } else {
            var err = new Error('Error ' + response.status + ': ' + response.statusText)
            err.response = response
            dispatch(error(err.message))
            throw err
        }
    },
    error => {
        throw error
    })
    .then(response => response.json())
    .then(response => {
        if (response.success) {
            // If login was successful, set the token in local storage
            localStorage.setItem('token', response.token)
            localStorage.setItem('user', JSON.stringify(response.user))
            localStorage.setItem('admin', response.admin)
            // Dispatch the success action
            dispatch(success('Login successful!'))
            dispatch(fetchUser())
            dispatch(fetchFavourites())
            dispatch(fetchContracts())
            dispatch(fetchReviews())
            dispatch(receiveLogin(response))
            if (response.admin) {
                dispatch(fetchUsers())
                dispatch(fetchSales())
                dispatch(fetchTodaySales())
                dispatch(fetchMinus7Sales())
                dispatch(fetchMinus14Sales())
                dispatch(fetchMinus21Sales())
                dispatch(fetchMinus28Sales())
                dispatch(fetchMinus35Sales())
                dispatch(fetchContractsLastMonth())
                dispatch(fetchProfitThisYear())
                dispatch(fetchProfitLastMonth())
                dispatch(fetchNewUsersLastMonth())
                dispatch(fetchLandlords())
                dispatch(fetchFees())
                dispatch(fetchOffers())
                dispatch(fetchViewings())
                dispatch(fetchNotifications())
                dispatch(fetchAppointments())
                history.push('/admin/dashboard') 
            }
            else {
                history.push('/users/account')
            }
        }
        else {
            var err = new Error(response.status)
            err.response = response
            dispatch(error(err.message))
            throw err
        }
    })
    .catch(err => {
        dispatch(loginError(err.message))
        dispatch(error(err.message))
        }
    )
}

export const requestLogout = () => {
    return {
      type: ActionTypes.LOGOUT_REQUEST
    }
}
  
export const receiveLogout = () => {
    return {
      type: ActionTypes.LOGOUT_SUCCESS
    }
}

// Logs the user out
export const logoutUser = () => (dispatch) => {
    dispatch(requestLogout())
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    localStorage.removeItem('admin')
    history.push('/users/login')
    //dispatch(favoritesFailed("Error 401: Unauthorized"))
    dispatch(receiveLogout())
}

export const requestSignup = (data) => {
    return {
        type: ActionTypes.SIGNUP_REQUEST,
        payload: data
    }
} 

export const receiveSignup = (response) => {
    return {
        type: ActionTypes.SIGNUP_SUCCESS,
        payload: response
    }
}

export const signupError = (message) => {
    return {
        type: ActionTypes.SIGNUP_FAILURE,
        payload: message
    }
}

export const signupUser = (data) => (dispatch) => {
    dispatch(requestSignup(data))

    return fetch(baseUrl + 'users/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(res => {
        if (res.ok) {
            return res
        } else {
            var err = new Error('Error ' + res.status + ': ' + res.statusText)
            err.res = res
            console.log(res)
            dispatch(error(err.message))
            throw err
        }
    },
    error => {
        throw error
    })
    .then(res => res.json())
    .then(res => {
        if (res.success) {

            dispatch(receiveSignup(res))
            history.push('/users/login')
            dispatch(success('Registration successful!'))
        }
        else {
            var err = new Error(res.status)
            err.res = res
            dispatch(error(err.message))
            throw err
        }
    })
    .catch(err => {
        dispatch(signupError(err.message))
        dispatch(error(err.message))
        }
    )
}



export const fetchUsers = () => (dispatch) => {
    dispatch(usersLoading(true))

    const bearer = 'Bearer ' + localStorage.getItem('token')

    return fetch(baseUrl + 'users', {
        headers: {
            'Authorization': bearer
        },
    })
    .then(response => {
        if (response.ok) {
            return response
        }
        else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    },
    error => {
        var errmess = new Error(error.message);
        throw errmess;
    })
    .then(response => response.json())
    .then(users => dispatch(addUsers(users)))
    .catch(error => dispatch(usersFailed(error.message)))
}

export const usersLoading = () => ({
    type: ActionTypes.USERS_LOADING
})

export const usersFailed = (errness) => ({
    type: ActionTypes.USERS_FAILED,
    payload: errness
})

export const addUsers = (users) => ({
    type: ActionTypes.ADD_USERS,
    payload: users
})

//upload single user loggin in into profile
export const fetchUser = () => (dispatch) => {
    dispatch(userLoading(true))

    const bearer = 'Bearer ' + localStorage.getItem('token')

    return fetch(baseUrl + 'users/account/my-profile', {
        headers: {
            'Authorization': bearer
        },
    })
    .then(response => {
        if (response.ok) {
            return response
        }
        else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    },
    error => {
        var errmess = new Error(error.message);
        throw errmess;
    })
    .then(response => response.json())
    .then(user => dispatch(addUser(user)))
    .catch(error => dispatch(userFailed(error.message)))
}

export const userLoading = () => ({
    type: ActionTypes.USER_LOADING
})

export const userFailed = (errness) => ({
    type: ActionTypes.USER_FAILED,
    payload: errness
})

export const addUser = (user) => ({
    type: ActionTypes.ADD_USER,
    payload: user
})

export const addSales = (sales) => ({
    type: ActionTypes.ADD_SALES,
    payload: sales
})

export const salesLoading = () => ({
    type: ActionTypes.SALES_LOADING
})

export const salesFailed = (errness) => ({
    type: ActionTypes.SALES_FAILED,
    payload: errness
})

export const fetchSales = () => (dispatch) => {
    dispatch(salesLoading(true))

    const bearer = 'Bearer ' + localStorage.getItem('token')

    return fetch(baseUrl + 'sales', {
        headers: {
            'Authorization': bearer
        },
    })
    .then(response => {
        if (response.ok) {
            return response
        }
        else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    },
    error => {
        var errmess = new Error(error.message);
        throw errmess;
    })
    .then(response => response.json())
    .then(sales => dispatch(addSales(sales)))
    .catch(error => dispatch(salesFailed(error.message)))
}


export const getSaleDetails = (id) => async (dispatch) => {

    const token = 'Bearer ' + localStorage.getItem('token')

    dispatch({
        type: ActionTypes.SALE_FETCH_SINGLE_REQUEST
    })

    return await fetch(baseUrl + 'sales/' + id, {       
        headers: {
            Authorization: token
        }
    })
    .then(response => {
        if (response.ok) {     
            dispatch(fetchSales())      
            return response
        }
        else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText)
            error.response = response
            dispatch(error(error.message))
            throw error
        }
    },
    error => {
        var errmess = new Error(error.message);
        dispatch(error(error.message))
        throw errmess;
    })
    .then(response => response.json())
    .then(res => dispatch({
        type: ActionTypes.SALE_FETCH_SINGLE_SUCCESS,
        payload: res
    }))    
    .catch(error => dispatch({
        type: ActionTypes.SALE_FETCH_SINGLE_FAILED,
        payload: error.message
    }))
}


export const deleteSale = (id) => (dispatch) => {

    const token = 'Bearer ' + localStorage.getItem('token')

    dispatch({
        type: ActionTypes.SALE_DELETE_REQUEST
    })

    return fetch(baseUrl + 'sales/' + id, {
        method: "DELETE",
        headers: {
            Authorization: token
        }
    })
    .then(response => {
        if (response.ok) {
            dispatch(fetchSales())
            dispatch(success(`Sale ${id} has been deleted successfully!`))
            return response
        }
        else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText)
            error.response = response
            dispatch(error(error.message))
            throw error
        }
    },
    error => {
        var errmess = new Error(error.message)
        dispatch(error(error.message))
        throw errmess;
    })
    .then(response => response.json())
    .then(sales => dispatch({
        type: ActionTypes.SALE_DELETE_SUCCESS
    }))
    .catch(error => 
        {
            dispatch({
                type: ActionTypes.SALE_DELETE_FAILED,
                payload: error.message
            })
            dispatch(error(error.message))
        }
    )
}

export const updateSale = (sale) => (dispatch) => {

    const token = 'Bearer ' + localStorage.getItem('token')

    dispatch({
        type: ActionTypes.SALE_EDIT_REQUEST
    })

    return fetch(baseUrl + 'sales/' + sale._id, {
        method: "PUT",
        body: JSON.stringify(sale),
        headers: {
            "Content-Type": "application/json",
            "Authorization": token
        }
    })
    .then(response => {
        if (response.ok) {
            dispatch(fetchSales())
            history.push('/admin/dashboard/sales')
            dispatch(success(`Sale ${sale._id} has been updated successfully!`))
            return response
        }
        else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText)
            error.response = response
            dispatch(error(error.message))
            throw error
        }
    },
    error => {
        var errmess = new Error(error.message);
        dispatch(error(error.message))
        throw errmess;
    })
    .then(response => response.json())
    .then(sales => 
        dispatch({
            type: ActionTypes.SALE_EDIT_SUCCESS
        })
    
    )
    .catch(error => 
        {
            dispatch({
                type: ActionTypes.SALE_EDIT_FAILED,
                payload: error.message
            })
            dispatch(error(error.message))
        }
    )
}

export const createSale = (sale) => (dispatch) => {

    const token = 'Bearer ' + localStorage.getItem('token')

    dispatch({
        type: ActionTypes.SALE_CREATE_REQUEST
    })

    return fetch(baseUrl + 'sales' , {
        method: "POST",
        body: JSON.stringify(sale),
        headers: {
            "Content-Type": "application/json",
            "Authorization": token
        }
    })
    .then(response => {
        if (response.ok) {
            dispatch(fetchSales())
            history.push('/admin/dashboard/sales')
            dispatch(success('A new sale has been added successfully!'))
            return response
        }
        else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText)
            error.response = response
            dispatch(error(error.message))
            throw error
        }
    },
    error => {
        var errmess = new Error(error.message);
        dispatch(error(error.message))
        throw errmess;
    })
    .then(response => response.json())
    .then(sales => dispatch({
        type: ActionTypes.SALE_CREATE_SUCCESS
    }))
    .catch(err => 
        dispatch({
            type: ActionTypes.SALE_CREATE_FAILED,
            payload: err.message
        })
    )
}

export const addFees = (fees) => ({
    type: ActionTypes.ADD_FEES,
    payload: fees
})

export const feesLoading = () => ({
    type: ActionTypes.FEES_LOADING
})

export const feesFailed = (errness) => ({
    type: ActionTypes.FEES_FAILED,
    payload: errness
})

export const fetchFees = () => (dispatch) => {
    dispatch(feesLoading(true))

    const bearer = 'Bearer ' + localStorage.getItem('token')

    return fetch(baseUrl + 'fees', {
        headers: {
            'Authorization': bearer
        },
    })
    .then(response => {
        if (response.ok) {
            return response
        }
        else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    },
    error => {
        var errmess = new Error(error.message);
        throw errmess;
    })
    .then(response => response.json())
    .then(fees => dispatch(addFees(fees)))
    .catch(error => dispatch(feesFailed(error.message)))
}

export const getFeeDetails = (id) => async (dispatch) => {

    const token = 'Bearer ' + localStorage.getItem('token')

    dispatch({
        type: ActionTypes.FEE_FETCH_SINGLE_REQUEST
    })

    return await fetch(baseUrl + 'fees/' + id, {       
        headers: {
            Authorization: token
        }
    })
    .then(response => {
        if (response.ok) {     
            dispatch(fetchFees())      
            return response
        }
        else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText)
            error.response = response
            dispatch(error(error.message))
            throw error
        }
    },
    error => {
        var errmess = new Error(error.message);
        throw errmess;
    })
    .then(response => response.json())
    .then(res => dispatch({
        type: ActionTypes.FEE_FETCH_SINGLE_SUCCESS,
        payload: res
    }))    
    .catch(error => dispatch({
        type: ActionTypes.FEE_FETCH_SINGLE_FAILED,
        payload: error.message
    }))
}


export const deleteFee = (id) => (dispatch) => {

    const token = 'Bearer ' + localStorage.getItem('token')

    dispatch({
        type: ActionTypes.FEE_DELETE_REQUEST
    })

    return fetch(baseUrl + 'fees/' + id, {
        method: "DELETE",
        headers: {
            Authorization: token
        }
    })
    .then(response => {
        if (response.ok) {
            dispatch(fetchFees())
            dispatch(success(`Fee ${id} has been deleted successfully!`))
            return response
        }
        else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText)
            error.response = response
            dispatch(error(error.message))
            throw error
        }
    },
    error => {
        var errmess = new Error(error.message)
        throw errmess;
    })
    .then(response => response.json())
    .then(fees => dispatch({
        type: ActionTypes.FEE_DELETE_SUCCESS
    }))
    .catch(error => 
        {
            dispatch({
                type: ActionTypes.FEE_DELETE_FAILED,
                payload: error.message
            })
            dispatch(error(error.message))
        }
    )
}

export const updateFee = (fee) => (dispatch) => {

    const token = 'Bearer ' + localStorage.getItem('token')

    dispatch({
        type: ActionTypes.FEE_EDIT_REQUEST
    })

    return fetch(baseUrl + 'fees/' + fee._id, {
        method: "PUT",
        body: JSON.stringify(fee),
        headers: {
            "Content-Type": "application/json",
            "Authorization": token
        }
    })
    .then(response => {
        if (response.ok) {
            dispatch(fetchFees())
            history.push('/admin/dashboard/fees')
            dispatch(success(`Fee ${fee._id} has been updated successfully!`))
            return response
        }
        else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText)
            error.response = response
            dispatch(error(error.message))
            throw error
        }
    },
    error => {
        var errmess = new Error(error.message);
        throw errmess;
    })
    .then(response => response.json())
    .then(fees => 
        dispatch({
            type: ActionTypes.FEE_EDIT_SUCCESS
        })
    
    )
    .catch(error => 
        {
            dispatch({
                type: ActionTypes.FEE_EDIT_FAILED,
                payload: error.message
            })
            dispatch(error(error.message))
        }
    )
}

export const createFee = (fee) => async (dispatch) => {

    const token = 'Bearer ' + localStorage.getItem('token')

    dispatch({
        type: ActionTypes.FEE_CREATE_REQUEST
    })

    return fetch(baseUrl + 'fees' , {
        method: "POST",
        body: JSON.stringify(fee),
        headers: {
            "Content-Type": "application/json",
            "Authorization": token
        }
    })
    .then(response => {
        if (response.ok) {
            dispatch(fetchFees())
            history.push('/admin/dashboard/fees')
            dispatch(success('A new fee has been added successfully!'))
            return response
        }
        else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText)
            error.response = response
            dispatch(error(error.message))
            throw error
        }
    },
    error => {
        var errmess = new Error(error.message);
        throw errmess;
    })
    .then(response => response.json())
    .then(fees => dispatch({
        type: ActionTypes.FEE_CREATE_SUCCESS
    }))
    .catch(err => 
        dispatch({
            type: ActionTypes.FEE_CREATE_FAILED,
            payload: err.message
        })
    )
}

export const addTodaySales = (tsales) => ({
    type: ActionTypes.ADD_TODAY_SALES,
    payload: tsales
})

export const salesTodayLoading = () => ({
    type: ActionTypes.SALES_TODAY_LOADING
})

export const salesTodayFailed = (errness) => ({
    type: ActionTypes.SALES_TODAY_FAILED,
    payload: errness
})

export const fetchTodaySales = () => async (dispatch) => {
    dispatch(salesTodayLoading(true))

    const bearer = 'Bearer ' + localStorage.getItem('token')

    return await fetch(baseUrl + 'today-sales', {
        headers: {
            'Authorization': bearer
        },
    })
    .then(response => {
        if (response.ok) {
            return response
        }
        else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    },
    error => {
        var errmess = new Error(error.message);
        throw errmess;
    })
    .then(response => response.json())
    .then(sales => dispatch(addTodaySales(sales)))
    .catch(error => dispatch(salesTodayFailed(error.message)))
}

export const addMinus7Sales = (sales) => ({
    type: ActionTypes.ADD_MINUS7_SALES,
    payload: sales
})

export const salesMinus7Loading = () => ({
    type: ActionTypes.SALES_MINUS7_LOADING
})

export const salesMinus7Failed = (errness) => ({
    type: ActionTypes.SALES_MINUS7_FAILED,
    payload: errness
})

export const fetchMinus7Sales = () => async (dispatch) => {
    dispatch(salesMinus7Loading(true))

    const bearer = 'Bearer ' + localStorage.getItem('token')

    return await fetch(baseUrl + 'minus-7-sales', {
        headers: {
            'Authorization': bearer
        },
    })
    .then(response => {
        if (response.ok) {
            return response
        }
        else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    },
    error => {
        var errmess = new Error(error.message);
        throw errmess;
    })
    .then(response => response.json())
    .then(sales => dispatch(addMinus7Sales(sales)))
    .catch(error => dispatch(salesMinus7Failed(error.message)))
}

export const addMinus14Sales = (sales) => ({
    type: ActionTypes.ADD_MINUS14_SALES,
    payload: sales
})

export const salesMinus14Loading = () => ({
    type: ActionTypes.SALES_MINUS14_LOADING
})

export const salesMinus14Failed = (errness) => ({
    type: ActionTypes.SALES_MINUS14_FAILED,
    payload: errness
})

export const fetchMinus14Sales = () => async (dispatch) => {
    dispatch(salesMinus14Loading(true))

    const bearer = 'Bearer ' + localStorage.getItem('token')

    return await fetch(baseUrl + 'minus-14-sales', {
        headers: {
            'Authorization': bearer
        },
    })
    .then(response => {
        if (response.ok) {
            return response
        }
        else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    },
    error => {
        var errmess = new Error(error.message);
        throw errmess;
    })
    .then(response => response.json())
    .then(sales => dispatch(addMinus14Sales(sales)))
    .catch(error => dispatch(salesMinus14Failed(error.message)))
}

export const addMinus21Sales = (sales) => ({
    type: ActionTypes.ADD_MINUS21_SALES,
    payload: sales
})

export const salesMinus21Loading = () => ({
    type: ActionTypes.SALES_MINUS21_LOADING
})

export const salesMinus21Failed = (errness) => ({
    type: ActionTypes.SALES_MINUS21_FAILED,
    payload: errness
})

export const fetchMinus21Sales = () => async (dispatch) => {
    dispatch(salesMinus21Loading(true))

    const bearer = 'Bearer ' + localStorage.getItem('token')

    return await fetch(baseUrl + 'minus-21-sales', {
        headers: {
            'Authorization': bearer
        },
    })
    .then(response => {
        if (response.ok) {
            return response
        }
        else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    },
    error => {
        var errmess = new Error(error.message);
        throw errmess;
    })
    .then(response => response.json())
    .then(sales => dispatch(addMinus21Sales(sales)))
    .catch(error => dispatch(salesMinus21Failed(error.message)))
}

export const addMinus28Sales = (sales) => ({
    type: ActionTypes.ADD_MINUS28_SALES,
    payload: sales
})

export const salesMinus28Loading = () => ({
    type: ActionTypes.SALES_MINUS28_LOADING
})

export const salesMinus28Failed = (errness) => ({
    type: ActionTypes.SALES_MINUS28_FAILED,
    payload: errness
})

export const fetchMinus28Sales = () => async (dispatch) => {
    dispatch(salesMinus28Loading(true))

    const bearer = 'Bearer ' + localStorage.getItem('token')

    return await fetch(baseUrl + 'minus-28-sales', {
        headers: {
            'Authorization': bearer
        },
    })
    .then(response => {
        if (response.ok) {
            return response
        }
        else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    },
    error => {
        var errmess = new Error(error.message);
        throw errmess;
    })
    .then(response => response.json())
    .then(sales => dispatch(addMinus28Sales(sales)))
    .catch(error => dispatch(salesMinus28Failed(error.message)))
}

export const addMinus35Sales = (sales) => ({
    type: ActionTypes.ADD_MINUS35_SALES,
    payload: sales
})

export const salesMinus35Loading = () => ({
    type: ActionTypes.SALES_MINUS35_LOADING
})

export const salesMinus35Failed = (errness) => ({
    type: ActionTypes.SALES_MINUS35_FAILED,
    payload: errness
})

export const fetchMinus35Sales = () => async (dispatch) => {
    dispatch(salesMinus35Loading(true))

    const bearer = 'Bearer ' + localStorage.getItem('token')

    return await fetch(baseUrl + 'minus-35-sales', {
        headers: {
            'Authorization': bearer
        },
    })
    .then(response => {
        if (response.ok) {
            return response
        }
        else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    },
    error => {
        var errmess = new Error(error.message);
        throw errmess;
    })
    .then(response => response.json())
    .then(sales => dispatch(addMinus35Sales(sales)))
    .catch(error => dispatch(salesMinus35Failed(error.message)))
}

export const addContractsLastMonth = (contracts) => ({
    type: ActionTypes.ADD_CONTRACTS_LAST_MONTH,
    payload: contracts
})

export const contractsLastMonthLoading = () => ({
    type: ActionTypes.CONTRACTS_LAST_MONTH_LOADING
})

export const contractsLastMonthFailed = (errness) => ({
    type: ActionTypes.CONTRACTS_LAST_MONTH_FAILED,
    payload: errness
})

export const fetchContractsLastMonth = () => (dispatch) => {
    dispatch(contractsLastMonthLoading(true))

    const bearer = 'Bearer ' + localStorage.getItem('token')

    return fetch(baseUrl + 'contracts-last-month', {
        headers: {
            'Authorization': bearer
        },
    })
    .then(response => {
        if (response.ok) {
            return response
        }
        else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    },
    error => {
        var errmess = new Error(error.message);
        throw errmess;
    })
    .then(response => response.json())
    .then(contracts => dispatch(addContractsLastMonth(contracts)))
    .catch(error => dispatch(contractsLastMonthFailed(error.message)))
}

export const addProfitLastMonth = (profit) => ({
    type: ActionTypes.ADD_PROFIT_LAST_MONTH,
    payload: profit
})

export const profitLastMonthLoading = () => ({
    type: ActionTypes.PROFIT_LAST_MONTH_LOADING
})

export const profitLastMonthFailed = (errness) => ({
    type: ActionTypes.PROFIT_LAST_MONTH_FAILED,
    payload: errness
})

export const fetchProfitLastMonth = () => (dispatch) => {
    dispatch(profitLastMonthLoading(true))

    const bearer = 'Bearer ' + localStorage.getItem('token')

    return fetch(baseUrl + 'profit-last-month', {
        headers: {
            'Authorization': bearer
        },
    })
    .then(response => {
        if (response.ok) {
            return response
        }
        else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    },
    error => {
        var errmess = new Error(error.message);
        throw errmess;
    })
    .then(response => response.json())
    .then(profit => dispatch(addProfitLastMonth(profit)))
    .catch(error => dispatch(profitLastMonthFailed(error.message)))
}


export const addProfitThisYear = (profit) => ({
    type: ActionTypes.ADD_PROFIT_THIS_YEAR,
    payload: profit
})

export const profitThisYearLoading = () => ({
    type: ActionTypes.PROFIT_THIS_YEAR_LOADING
})

export const profitThisYearFailed = (errness) => ({
    type: ActionTypes.PROFIT_THIS_YEAR_FAILED,
    payload: errness
})

export const fetchProfitThisYear = () => (dispatch) => {
    dispatch(profitThisYearLoading(true))

    const bearer = 'Bearer ' + localStorage.getItem('token')

    return fetch(baseUrl + 'profit-this-year', {
        headers: {
            'Authorization': bearer
        },
    })
    .then(response => {
        if (response.ok) {
            return response
        }
        else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    },
    error => {
        var errmess = new Error(error.message);
        throw errmess;
    })
    .then(response => response.json())
    .then(profit => dispatch(addProfitThisYear(profit)))
    .catch(error => dispatch(profitThisYearFailed(error.message)))
}

export const addNewUsersLastMonth = (Nusers) => ({
    type: ActionTypes.ADD_NEW_USERS_LAST_MONTH,
    payload: Nusers
})

export const newUsersLastMonthLoading = () => ({
    type: ActionTypes.LAST_MONTH_NEW_USERS_LOADING
})

export const newUsersLastMonthFailed = (errness) => ({
    type: ActionTypes.LAST_MONTH_NEW_USERS_FAILED,
    payload: errness
})

export const fetchNewUsersLastMonth = () => (dispatch) => {
    dispatch(newUsersLastMonthLoading(true))

    const bearer = 'Bearer ' + localStorage.getItem('token')

    return fetch(baseUrl + 'new-users-last-month', {
        headers: {
            'Authorization': bearer
        },
    })
    .then(response => {
        if (response.ok) {
            return response
        }
        else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    },
    error => {
        var errmess = new Error(error.message);
        throw errmess;
    })
    .then(response => response.json())
    .then(users => dispatch(addNewUsersLastMonth(users)))
    .catch(error => dispatch(newUsersLastMonthFailed(error.message)))
}

export const addCustomProfitReport = (sales) => ({
    type: ActionTypes.ADD_CUSTOM_PROFIT_REPORT,
    payload: sales
})

export const customProfitReportLoading = () => ({
    type: ActionTypes.CUSTOM_PROFIT_REPORT_LOADING
})

export const customProfitReportFailed = (errness) => ({
    type: ActionTypes.CUSTOM_PROFIT_REPORT_FAILED,
    payload: errness
})

export const customProfitClear = () => ({
    type: ActionTypes.CUSTOM_PROFIT_CLEAR_ARRAY
})

export const getCustomProfitReport = (startDate, endDate) => async (dispatch) => {
    dispatch(customProfitReportLoading(true))

    const bearer = 'Bearer ' + localStorage.getItem('token')

    let params = {
        "param1": startDate,
        "param2": endDate
    }

    let query = Object.keys(params)
                .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
                .join('&')

    return await fetch(baseUrl + 'custom-profit-report?' + query, {
        method: 'GET',
        headers: {
            'Authorization': bearer
        }
    })
    .then(response => {
        if (response.ok) {
            return response
        }
        else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    },
    error => {
        var errmess = new Error(error.message);
        throw errmess;
    })
    .then(response => response.json())
    .then(sales => dispatch(addCustomProfitReport(sales)))
    .catch(error => dispatch(customProfitReportFailed(error.message)))
}

export const getCustomUsersReport = (startDate, endDate) => async (dispatch) => {
    dispatch({
        type: ActionTypes.CUSTOM_USERS_REPORT_LOADING
    })

    const bearer = 'Bearer ' + localStorage.getItem('token')

    let params = {
        "param1": startDate,
        "param2": endDate
    }

    let query = Object.keys(params)
                .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
                .join('&')

    return await fetch(baseUrl + 'custom-users-report?' + query, {
        method: 'GET',
        headers: {
            'Authorization': bearer
        }
    })
    .then(response => {
        if (response.ok) {
            return response
        }
        else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    },
    error => {
        var errmess = new Error(error.message);
        throw errmess;
    })
    .then(response => response.json())
    .then(users => 
            dispatch({
                type: ActionTypes.ADD_CUSTOM_USERS_REPORT,
                payload: users
            })
    )
    .catch(error => 
        dispatch({
            type: ActionTypes.CUSTOM_USERS_REPORT_FAILED,
            payload: error.message
        })
    )
}

export const customUsersReportClear = () => ({
    type: ActionTypes.CUSTOM_USERS_CLEAR_ARRAY
})

export const getCustomPropertiesReport = (startDate, endDate) => async (dispatch) => {
    dispatch({
        type: ActionTypes.CUSTOM_PROPERTIES_REPORT_LOADING
    })

    const bearer = 'Bearer ' + localStorage.getItem('token')

    let params = {
        "param1": startDate,
        "param2": endDate
    }

    let query = Object.keys(params)
                .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
                .join('&')

    return await fetch(baseUrl + 'custom-properties-report?' + query, {
        method: 'GET',
        headers: {
            'Authorization': bearer
        }
    })
    .then(response => {
        if (response.ok) {
            return response
        }
        else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    },
    error => {
        var errmess = new Error(error.message);
        throw errmess;
    })
    .then(response => response.json())
    .then(properties => 
            dispatch({
                type: ActionTypes.ADD_CUSTOM_PROPERTIES_REPORT,
                payload: properties
            })
    )
    .catch(error => 
        dispatch({
            type: ActionTypes.CUSTOM_PROPERTIES_REPORT_FAILED,
            payload: error.message
        })
    )
}

export const customPropertiesReportClear = () => ({
    type: ActionTypes.CUSTOM_PROPERTIES_CLEAR_ARRAY
})

export const getCustomContractsReport = (startDate, endDate) => async (dispatch) => {
    dispatch({
        type: ActionTypes.CUSTOM_CONTRACTS_REPORT_LOADING
    })

    const bearer = 'Bearer ' + localStorage.getItem('token')

    let params = {
        "param1": startDate,
        "param2": endDate
    }

    let query = Object.keys(params)
                .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
                .join('&')

    return await fetch(baseUrl + 'custom-contracts-report?' + query, {
        method: 'GET',
        headers: {
            'Authorization': bearer
        }
    })
    .then(response => {
        if (response.ok) {
            return response
        }
        else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    },
    error => {
        var errmess = new Error(error.message);
        throw errmess;
    })
    .then(response => response.json())
    .then(contracts => 
            dispatch({
                type: ActionTypes.ADD_CUSTOM_CONTRACTS_REPORT,
                payload: contracts
            })
    )
    .catch(error => 
        dispatch({
            type: ActionTypes.CUSTOM_CONTRACTS_REPORT_FAILED,
            payload: error.message
        })
    )
}

export const customContractsReportClear = () => ({
    type: ActionTypes.CUSTOM_CONTRACTS_CLEAR_ARRAY
})


export const fetchNotifications = () => (dispatch) => {
    const token = 'Bearer ' + localStorage.getItem('token')

    dispatch({
        type: ActionTypes.NOTIFICATIONS_LOADING
    })
    
    return fetch(baseUrl + 'notifications', {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": token
        }
    })
        .then(response => {
            if (response.ok) {
                return response
            }
            else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
            error => {
                var errmess = new Error(error.message);
                throw errmess;
            })
        .then(response => response.json())
        .then(notifications =>
            dispatch({
                type: ActionTypes.ADD_NOTIFICATIONS,
                payload: notifications
            }))
        .catch(error => 
            dispatch({
                type: ActionTypes.NOTIFICATIONS_FAILED,
                payload: error.message
            })
        )
}

export const addNewNotification = (notification) => async dispatch => {
    const token = 'Bearer ' + localStorage.getItem('token')

    dispatch({
        type: ActionTypes.NOTIFICATION_CREATE_REQUEST
    })
    
    return await fetch(baseUrl + 'notifications', {
        method: "POST",
        body: JSON.stringify(notification),
        headers: {
            "Content-Type": "application/json",
            "Authorization": token
        }
    })
        .then(response => {
            if (response.ok) {
                dispatch(fetchNotifications())
                return response
            }
            else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
            error => {
                var errmess = new Error(error.message);
                throw errmess;
            })
        .then(response => response.json())
        .then(notification => dispatch({ type: ActionTypes.NOTIFICATION_CREATE_SUCCESS }))
        .then(dispatch(fetchNotifications()))
        .catch(error => dispatch({
                type: ActionTypes.NOTIFICATION_CREATE_FAILED,
                payload: error.message
            })
        )

}

export const deleteNotification = (id) => async dispatch => {
    const token = 'Bearer ' + localStorage.getItem('token')

    dispatch({
        type: ActionTypes.NOTIFICATION_DELETE_REQUEST
    })
    
    return await fetch(baseUrl + 'notifications/' + id, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": token
        }
    })
        .then(response => {
            if (response.ok) {
                dispatch(fetchNotifications())
                return response
            }
            else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
            error => {
                var errmess = new Error(error.message);
                throw errmess;
            })
        .then(response => response.json())
        .then(notification => dispatch({ type: ActionTypes.NOTIFICATION_DELETE_SUCCESS }))
        .catch(error => dispatch({
                type: ActionTypes.NOTIFICATION_DELETE_FAILED,
                payload: error.message
            })
        )

}


export const fetchOffers = () => async (dispatch) => {
    const token = 'Bearer ' + localStorage.getItem('token')

    dispatch({
        type: ActionTypes.OFFERS_LOADING
    })
    
    return await fetch(baseUrl + 'offers', {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": token
        }
    })
        .then(response => {
            if (response.ok) {
                return response
            }
            else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
            error => {
                var errmess = new Error(error.message);
                throw errmess;
            })
        .then(response => response.json())
        .then(offers =>
            dispatch({
                type: ActionTypes.ADD_OFFERS,
                payload: offers
            }))
        .catch(error => 
            dispatch({
                type: ActionTypes.OFFERS_FAILED,
                payload: error.message
            })
        )
}

export const acceptOffer = (offer, user) => async dispatch => {
    const token = 'Bearer ' + localStorage.getItem('token')

    dispatch({
        type: ActionTypes.ACCEPT_OFFER_REQUEST
    })
    
    return await fetch(baseUrl + 'offers/' + offer._id, {
        method: "PUT",
        body: JSON.stringify(offer),
        headers: {
            "Content-Type": "application/json",
            "Authorization": token
        }
    })
        .then(response => {
            if (response.ok) {
                dispatch(fetchOffers())
                dispatch(updateUser(user))
                return response
            }
            else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
            error => {
                var errmess = new Error(error.message);
                throw errmess;
            })
        .then(response => response.json())
        .then(offer => {
            dispatch({ type: ActionTypes.ACCEPT_OFFER_SUCCESS })
            dispatch(success('Offer accepted'))
        })
        .catch(error => {
            dispatch({
                type: ActionTypes.ACCEPT_OFFER_FAILED,
                payload: error.message
            })
            dispatch(error(error.message))
        })
}

export const declineOffer = (offer, user) => async dispatch => {
    const token = 'Bearer ' + localStorage.getItem('token')

    dispatch({
        type: ActionTypes.DECLINE_OFFER_REQUEST
    })
    
    return await fetch(baseUrl + 'offers/' + offer._id, {
        method: "PUT",
        body: JSON.stringify(offer),
        headers: {
            "Content-Type": "application/json",
            "Authorization": token
        }
    })
        .then(response => {
            if (response.ok) {
                dispatch(fetchOffers())
                dispatch(updateUser(user))
                return response
            }
            else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
            error => {
                var errmess = new Error(error.message);
                throw errmess;
            })
        .then(response => response.json())
        .then(offer => {
            dispatch({ type: ActionTypes.DECLINE_OFFER_SUCCESS })
            dispatch(success('Offer declined'))
        })
        .catch(error => {
            dispatch({
                type: ActionTypes.DECLINE_OFFER_FAILED,
                payload: error.message
            })
            dispatch(error(error.message))
        })
}

export const makeNewOffer = (offer) => async dispatch => {
    const token = 'Bearer ' + localStorage.getItem('token')

    const notification = {
        type: 'offer',
        user: offer.user,
        property: offer.property
    }

    dispatch({
        type: ActionTypes.OFFER_CREATE_REQUEST
    })
    
    return await fetch(baseUrl + 'offers', {
        method: "POST",
        body: JSON.stringify(offer),
        headers: {
            "Content-Type": "application/json",
            "Authorization": token
        }
    })
        .then(response => {
            if (response.ok) {
                dispatch(fetchOffers())
                dispatch(addNewNotification(notification))
                return response
            }
            else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
            error => {
                var errmess = new Error(error.message);
                throw errmess;
            })
        .then(response => response.json())
        .then(offer => {
            dispatch({ type: ActionTypes.OFFER_CREATE_SUCCESS })
            dispatch(success('Your offer has been made! Now wait for a response.'))
        })
        .catch(error => {
            dispatch({
                type: ActionTypes.OFFER_CREATE_FAILED,
                payload: error.message
            })
            dispatch(error(error.message))
        })
}

export const modifyOffer = (offer) => async dispatch => {
    const token = 'Bearer ' + localStorage.getItem('token')

    dispatch({
        type: ActionTypes.OFFER_MODIFY_REQUEST
    })
    
    return await fetch(baseUrl + 'offers/' + offer._id, {
        method: "PUT",
        body: JSON.stringify(offer),
        headers: {
            "Content-Type": "application/json",
            "Authorization": token
        }
    })
        .then(response => {
            if (response.ok) {
                dispatch(fetchOffers())
                return response
            }
            else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
            error => {
                var errmess = new Error(error.message);
                throw errmess;
            })
        .then(response => response.json())
        .then(offer => {
            dispatch({ type: ActionTypes.OFFER_MODIFY_SUCCESS })
        })
        .catch(error => {
            dispatch({
                type: ActionTypes.OFFER_MODIFY_FAILED,
                payload: error.message
            })
            dispatch(error(error.message))
        })
}

export const deleteOffer = (id) => (dispatch) => {

    const token = 'Bearer ' + localStorage.getItem('token')

    dispatch({
        type: ActionTypes.REMOVE_OFFER_REQUEST
    })

    return fetch(baseUrl + 'offers/' + id, {
        method: "DELETE",
        headers: {
            Authorization: token
        }
    })
    .then(response => {
        if (response.ok) {
            dispatch(fetchOffers())
            dispatch(success(`The offer has been deleted successfully!`))
            return response
        }
        else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText)
            error.response = response
            dispatch(error(error.message))
            throw error
        }
    },
    error => {
        var errmess = new Error(error.message);
        throw errmess;
    })
    .then(response => response.json())
    .then(offer => dispatch({
        type: ActionTypes.REMOVE_OFFER_SUCCESS
    }))
    .catch(error => dispatch({
        type: ActionTypes.REMOVE_OFFER_FAILED,
        payload: error.message
    }))
}

export const fetchViewings = () => async (dispatch) => {
    const token = 'Bearer ' + localStorage.getItem('token')

    dispatch({
        type: ActionTypes.VIEWINGS_LOADING
    })
    
    return await fetch(baseUrl + 'viewings', {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": token
        }
    })
        .then(response => {
            if (response.ok) {
                return response
            }
            else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
            error => {
                var errmess = new Error(error.message);
                throw errmess;
            })
        .then(response => response.json())
        .then(viewings =>
            dispatch({
                type: ActionTypes.ADD_VIEWINGS,
                payload: viewings
            }))
        .catch(error => 
            dispatch({
                type: ActionTypes.VIEWINGS_FAILED,
                payload: error.message
            })
        )
}

export const bookViewing = (viewing) => async dispatch => {
    const token = 'Bearer ' + localStorage.getItem('token')

    const notification = {
        type: 'viewing',
        user: viewing.user,
        property: viewing.property
    }

    dispatch({
        type: ActionTypes.VIEWING_CREATE_REQUEST
    })
    
    return await fetch(baseUrl + 'viewings', {
        method: "POST",
        body: JSON.stringify(viewing),
        headers: {
            "Content-Type": "application/json",
            "Authorization": token
        }
    })
        .then(response => {
            if (response.ok) {
                dispatch(fetchViewings())
                dispatch(addNewNotification(notification))
                return response
            }
            else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
            error => {
                var errmess = new Error(error.message);
                throw errmess;
            })
        .then(response => response.json())
        .then(viewing => {
            dispatch({ type: ActionTypes.VIEWING_CREATE_SUCCESS })
            dispatch(success('Your viewing booking has been made! See you soon.'))
        })
        .catch(error => {
            dispatch({
                type: ActionTypes.VIEWING_CREATE_FAILED,
                payload: error.message
            })
            dispatch(error(error.message))
        })

}

export const deleteViewing = (id) => (dispatch) => {

    const token = 'Bearer ' + localStorage.getItem('token')

    dispatch({
        type: ActionTypes.DELETE_VIEWING_REQUEST
    })

    return fetch(baseUrl + 'viewings/' + id, {
        method: "DELETE",
        headers: {
            Authorization: token
        }
    })
    .then(response => {
        if (response.ok) {
            dispatch(fetchViewings())
            return response
        }
        else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText)
            error.response = response
            dispatch(error(error.message))
            throw error
        }
    },
    error => {
        var errmess = new Error(error.message)
        dispatch(error(error.message))
        throw errmess;
    })
    .then(response => response.json())
    .then(viewings => dispatch({
        type: ActionTypes.DELETE_VIEWING_SUCCESS
    }))
    .catch(error => 
        {
            dispatch({
                type: ActionTypes.DELETE_VIEWING_FAILED,
                payload: error.message
            })
            dispatch(error(error.message))
        }
    )
}

export const fetchAppointments = () => async (dispatch) => {
    const token = 'Bearer ' + localStorage.getItem('token')

    dispatch({
        type: ActionTypes.APPOINTMENTS_LOADING
    })
    
    return await fetch(baseUrl + 'appointments', {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": token
        }
    })
        .then(response => {
            if (response.ok) {
                return response
            }
            else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
            error => {
                var errmess = new Error(error.message);
                throw errmess;
            })
        .then(response => response.json())
        .then(appointments =>
            dispatch({
                type: ActionTypes.ADD_APPOINTMENTS,
                payload: appointments
            }))
        .catch(error => 
            dispatch({
                type: ActionTypes.APPOINTMENTS_FAILED,
                payload: error.message
            })
        )
}


export const addNewAppointment = (appointment, id) => async dispatch => {
    const token = 'Bearer ' + localStorage.getItem('token')
    console.log('appointment redux', appointment)
    dispatch({
        type: ActionTypes.ADD_APPOINTMENT_LOADING
    })
    
    return await fetch(baseUrl + 'appointments', {
        method: "POST",
        body: JSON.stringify(appointment),
        headers: {
            "Content-Type": "application/json",
            "Authorization": token
        }
    })
        .then(response => {
            if (response.ok) {
                dispatch(fetchAppointments())
                dispatch(deleteViewing(id))
                return response
            }
            else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
            error => {
                var errmess = new Error(error.message);
                throw errmess;
            })
        .then(response => response.json())
        .then(appointment => {
            dispatch({ type: ActionTypes.ADD_APPOINTMENT_SUCCESS })
            dispatch(success('Your new appointment has been scheduled'))
        })
        .catch(error => {
            dispatch({
                type: ActionTypes.ADD_APPOINTMENT_FAILED,
                payload: error.message
            })
            dispatch(error(error.message))
        })
}

export const deleteAppointment = (id) => (dispatch) => {

    const token = 'Bearer ' + localStorage.getItem('token')

    dispatch({
        type: ActionTypes.DELETE_APPOINTMENT_REQUEST
    })

    return fetch(baseUrl + 'appointments/' + id, {
        method: "DELETE",
        headers: {
            Authorization: token
        }
    })
    .then(response => {
        if (response.ok) {
            dispatch(fetchAppointments())
            return response
        }
        else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText)
            error.response = response
            dispatch(error(error.message))
            throw error
        }
    },
    error => {
        var errmess = new Error(error.message);
        throw errmess;
    })
    .then(response => response.json())
    .then(appointment => dispatch({
        type: ActionTypes.DELETE_APPOINTMENT_SUCCESS
    }))
    .catch(error => dispatch({
        type: ActionTypes.DELETE_APPOINTMENT_FAILED,
        payload: error.message
    }))
}