import React, { useState, useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { makeStyles } from '@material-ui/core'
import { getLandlordDetails, updateLandlord } from '../../redux/ActionCreators'
import { Loading } from '../LoadingComponent'
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom'
import TextField from '@material-ui/core/TextField'
import editIcon from '../../assets/images/design-thinking.png'

const useStyles = makeStyles((theme) => ({
    main_container: {
        marginTop: '4.4em',
        background: '#FADBD8',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        margin: '3em auto',
        borderRadius: '2.2em',
        height: '100%'
    },
    title_section_landlord_edit: {
        display: 'flex',
        alignItems: 'flex-end',
        padding: '1.2em 1.5em',
    },
    title_landlord_edit: {
        fontSize: '3rem',
        color: '#EC7063',
        marginLeft: '0.6em',
        marginBottom: 0
    },
    landlord_form: {
        padding: '2em',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    textField: {
        margin: theme.spacing(2),
        background: 'white'
    },
    btn_submit_form: {
        padding: '0.8em 2.4em',
        border: 'none',
        borderRadius: '1.8em',
        background: '#EC7063',
        color: 'white',
        fontWeight: 'bold',
        fontSize: '1.4rem',
        '&:hover': {
            background: '#F1948A',
            cursor: 'pointer'
        }
    },
    btn_submit_setion: {
        marginTop: '3em',
        padding: '2em 1em',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '24em',
    },
    cancel_link: {
        fontSize: '1.5rem',
        color: 'black'
    },
  }))


function EditLandlord({ match }) {
    const classes = useStyles()

    const dispatch = useDispatch()
    const landlordsList = useSelector(state => state.landlords)
    const {isLoading, landlord, errMess} = landlordsList

    const alertSelector = useSelector(state => state.alert)

    const landlordId = match.params.landlordId

    const [values, setValues] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNo: ''
    })

    // eslint-disable-next-line
    useEffect(() => {
        
        if(landlord._id !== landlordId) {
            dispatch(getLandlordDetails(landlordId))
        } else {
            setValues({
                firstName: landlord.firstName,
                lastName: landlord.lastName,
                email: landlord.email,
                phoneNo: landlord.phoneNumber
            })
        }
        // eslint-disable-next-line
    }, [landlord])

    const handleChange = (prop) => (e) => {
        setValues({ ...values, [prop]: e.target.value})
    } 

    
    const validate = () => {
        let isError = false
        
        let errors = {
            firstNameError: '',
            lastNameError: '',
            emailError: '',
            phoneNumError: ''
        }

        if (values.firstName === '') {
            isError = true
            errors.firstNameError = 'Name must be in the correct format'
        }

        if (values.lastName === '') {
            isError = true
            errors.lastNameError = 'Last name must be in the correct format'
        }

        if (values.email.indexOf('@') === -1) {
            isError = true
            errors.emailError = 'Required a valid email'
        }

        if (values.phoneNo.length < 9) {
            isError = true
            errors.phoneNumError = 'Phone number must be inserted in a correct format'
        }

        setValues({
            ...values,
            ...errors
        })

        return isError
    }

    // eslint-disable-next-line
    String.prototype.capitalize = function() {
        return this.charAt(0).toUpperCase() + this.substring(1).toLocaleLowerCase()
    }

    const submitHandler = (e) => {
        e.preventDefault()
        const landlord = {
            _id: landlordId,
            firstName: values.firstName.capitalize(),
            lastName: values.lastName.capitalize(),
            email: values.email.toLocaleLowerCase(),
            phoneNumber: values.phoneNo,        
        }

        const err = validate()
        if (!err) {

            dispatch(updateLandlord(landlord))

            setValues({
                firstName: '',
                firstNameError: '',
                lastName: '',
                lastNameError: '',
                email: '',
                emailError: '',
                phoneNo: '',
                phoneNumError: ''
            })
            
        }
    }

    return (
        <div className={classes.main_container}>
            <Breadcrumb>
                <BreadcrumbItem><Link to="/admin/dashboard">Dashboard</Link></BreadcrumbItem>
                <BreadcrumbItem><Link to="/admin/dashboard/landlords">Landlords</Link></BreadcrumbItem>
                <BreadcrumbItem active>Edit Landlord</BreadcrumbItem>
            </Breadcrumb>
            <div className={classes.title_section_landlord_edit}>
                <span>
                    <img src={editIcon} alt="landlord edit icon" />
                </span>
                <h3 className={classes.title_landlord_edit}>Edit Landlord</h3>
            </div>
            {alertSelector.message &&
                <div className={`alert ${alertSelector.type}`}>
                    {alertSelector.message}
                </div>
            }
            {
                isLoading ?
                <Loading />
                :
                errMess ?
                <p>{errMess}</p>
                :
                landlord ?

                <div>
                    <form className={classes.landlord_form}>
                        <TextField
                            error={!values.firstNameError ? '' : values.firstNameError}
                            name="firstName"
                            id="firstName"
                            label="First Name"
                            variant="outlined"
                            value={values.firstName}
                            onChange={handleChange('firstName')}
                            margin="normal"
                            style={{width: '61ch'}}
                            className={classes.textField}
                            helperText={!values.firstNameError ? '' : values.firstNameError}
                        />
                        <br />
                        <TextField
                            error={!values.lastNameError ? '' : values.lastNameError}
                            name="lastName"
                            id="lastName"
                            label="Last Name"
                            variant="outlined"
                            value={values.lastName}
                            onChange={handleChange('lastName')}
                            margin="normal"
                            style={{width: '61ch'}}
                            className={classes.textField}
                            helperText={!values.lastNameError ? '' : values.lastNameError}
                        />
                        <br />
                        <TextField
                            error={values.email.indexOf('@') !== -1 ? '' : values.emailError}
                            name="email"
                            id="email"
                            label="Email"
                            type="email"
                            variant="outlined"
                            value={values.email}
                            onChange={handleChange('email')}
                            margin="normal"
                            style={{width: '61ch'}}
                            className={classes.textField}
                            helperText={values.email.indexOf('@') !== -1 ? ''  : values.emailError}
                        />
                        <br />
                        <TextField
                            error={values.phoneNo.length >= 9 ? '' : values.phoneNumError}
                            name="phoneNo"
                            id="phoneNo"
                            label="Phone No."
                            variant="outlined"
                            value={values.phoneNo}
                            onChange={handleChange('phoneNo')}
                            margin="normal"
                            style={{width: '61ch'}}
                            className={classes.textField}
                            helperText={values.phoneNo.length >= 9 ? '' : values.phoneNumError}
                        />
                        <br />

                        <div >
                        <div style={{display: 'flex', justifyContent: 'center'}}>
                        <div className={classes.btn_submit_setion}>
                            <Link className={classes.cancel_link} to="/admin/dashboard/landlords">Cancel</Link>
                            <button 
                            className={classes.btn_submit_form} onClick={(e) => submitHandler(e)}>Update Landlord</button>
                        </div>
                    </div>
                            {
                                isLoading && 
                                <span style={{margin: '4em 0 0 2em'}}>
                                <img style={{marginRight: '0.5em'}} src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" alt="loading" />
                                Loading...
                                </span>
                            }
                        </div>
                    </form>
                </div>

                :
                <div>
                    <p>There has been an error. Retry</p>
                </div>
            }

        </div>
    )

}

export default EditLandlord