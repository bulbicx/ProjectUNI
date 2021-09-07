import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core' 
import {useDispatch, useSelector} from 'react-redux'
import TextField from '@material-ui/core/TextField'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import FormHelperText from '@material-ui/core/FormHelperText'
import InputLabel from '@material-ui/core/InputLabel'
import InputAdornment from '@material-ui/core/InputAdornment';
import { Loading } from '../LoadingComponent'
import IconButton from '@material-ui/core/IconButton'
import FilledInput from '@material-ui/core/FilledInput'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormLabel from '@material-ui/core/FormLabel'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import { getUserDetails, updateUser } from '../../redux/ActionCreators'
import editIcon from '../../assets/images/design-thinking.png'
import countries from '../../Components/SignUp/countries'
import { Link } from 'react-router-dom'
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';

const useStyles = makeStyles((theme) => ({
    edit_user_container: {
        marginTop: '4.4em',
        background: '#FBF5E0',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        margin: '3em auto',
        borderRadius: '2.2em',
        height: '100%'
    },
    edit_sub_container: {
        
    },
    title_section_user_edit: {
        display: 'flex',
        alignItems: 'flex-end',
        padding: '1.2em 1.5em',
    },
    title_user_edit: {
        fontSize: '3rem',
        color: '#EBB953',
        marginLeft: '0.6em',
        marginBottom: 0
    },
    form: {
        padding: '2em',
    },
    form_section: {
        padding: '2em',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        flowWrap: 'wrap',
        '@media (max-width: 895px)': { 
            flexDirection: 'column'
        }
    },
    radio_section: {
        marginLeft: '0.9em'
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: '38ch',
    },
    password_field: {
        width: '38ch',
        marginTop: 10,
        marginLeft: '0.5em'
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 165,
    },
    btn_submit_form: {
        padding: '0.8em 2.4em',
        border: 'none',
        borderRadius: '1.8em',
        background: '#2C3E50',
        color: 'white',
        fontWeight: 'bold',
        fontSize: '1.4rem',
        '&:hover': {
            background: '#85929E',
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
    toggle_pwd_division: {
        margin: '0.9em 0.5em',
        // textAlign: 'center',
        // display: 'flex',
        // flexDirection: 'column',
        // justifyContent: 'center',
        // alignItems: 'center'
    },
    toggle_password_btn: {
        fontSize: '1.6rem',
        fontWeight: 'bold',
        '&:hover': {
            cursor: 'pointer',
            color: 'red'
        }
    },
}))

function EditUser({ match }) {
    const classes = useStyles()

    const alertSelector = useSelector(state => state.alert)

    const usersList = useSelector(state => state.users)
    const {isLoading, user, errMess} = usersList
    const dispatch = useDispatch()

    const [modifyPwd, setModifyPwd] = useState(false)

    const userId = match.params.id

    const [values, setValues] = useState({
        title: '',
        username: '',
        email: '',
        firstName: '',
        lastName: '',
        address: '',
        postcode: '',
        country: '',
        city: '',
        phoneNum: '',
        newPassword: '',
        gender: '',
        lookingFor: '',
        showPassword: false,
        admin: ''
    })

    useEffect(() => {
        
        if(user._id !== userId) {
            dispatch(getUserDetails(userId))
        } else {
            setValues({
                title: user.title,
                username: user.username,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                address: user.address,
                postcode: user.postcode,
                country: user.country,
                city: user.city,
                phoneNum: user.phoneNumber,
                newPassword: '',
                gender: user.gender,
                lookingFor: user.lookingFor,
                showPassword: false,
                admin: user.admin
            })
        }
        // eslint-disable-next-line
    }, [user])

    const handleChange = (prop) => (e) => {
        setValues({ ...values, [prop]: e.target.value})
    } 

    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword })
    }
    
    const handleMouseDownPassword = (event) => {
        event.preventDefault()
    }
    
    const togglePassword = () => {
        setModifyPwd(prevValue => !prevValue)
    } 

    const validate = () => {
        let isError = false
        
        let errors = {
            titleError: '',
            usernameError: '',
            emailError: '',
            firstNameError: '',
            lastNameError: '',
            addressError: '',
            postcodeError: '',
            countryError: '',
            cityError: '',
            phoneNumError: '',
            genderError: '',
            lookingForError: '',
            adminError: '',
            newPasswordError: '',
        }

        if (values.title === '') {
            isError = true
            errors.titleError = 'A title must be selected'
        }

        if (values.username.length < 5) {
            isError = true
            errors.usernameError = 'Username must contain at least 5 characters long'
        }

        if (values.email.indexOf('@') === -1) {
            isError = true
            errors.emailError = 'Required a valid email'
        }

        if (values.firstName === '') {
            isError = true
            errors.firstNameError = 'Name must not contain numbers'
        }

        if (values.lastName === '') {
            isError = true
            errors.lastNameError = 'Last name must not contain numbers'
        }

        if (values.address.length < 5) {
            isError = true
            errors.addressError = 'Address length must be greater than 5 characters'
        }

        if (values.postcode.length < 5) {
            isError = true
            errors.postcodeError = 'Post code length must be greater than 5 characters'
        }

        if (values.country.length < 5) {
            isError = true
            errors.countryError = 'Country must be inserted in a correct format'
        }

        if (values.city === '') {
            isError = true
            errors.cityError = 'A City must be inserted'
        }

        if (values.phoneNum.length < 9) {
            isError = true
            errors.phoneNumError = 'Phone number must be inserted in a correct format'
        }

        if (modifyPwd && values.newPassword.length < 5) {
            isError = true
            errors.newPasswordError = 'Password length must be greater than 5 characters'
        }

        if (values.gender === '') {
            isError = true
            errors.genderError = 'A gender must be chosen'
        }

        if (values.lookingFor === '') {
            isError = true
            errors.lookingForError = 'A category must be chosen'
        }

        if (values.admin === '') {
            isError = true
            errors.adminError = 'Admin value need to be chosen'
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
        let user
        if (modifyPwd) { //if we are modifying password
            user = {
                _id: userId,
                username: values.username,
                password: values.newPassword,
                title: values.title,
                email: values.email.toLocaleLowerCase(),
                firstName: values.firstName.capitalize(),
                lastName: values.lastName.capitalize(),
                address: values.address.capitalize(),
                postcode: values.postcode.toLocaleUpperCase(),
                country: values.country,
                city: values.city.capitalize(),
                phoneNumber: values.phoneNum,
                gender: values.gender,
                lookingFor: values.lookingFor,
                admin: values.admin
            }
        }
        else { //not modifying password
            user = {
                _id: userId,
                username: values.username,
                password: 'same',
                title: values.title,
                email: values.email.toLocaleLowerCase(),
                firstName: values.firstName.capitalize(),
                lastName: values.lastName.capitalize(),
                address: values.address.capitalize(),
                postcode: values.postcode.toLocaleUpperCase(),
                country: values.country,
                city: values.city.capitalize(),
                phoneNumber: values.phoneNum,
                gender: values.gender,
                lookingFor: values.lookingFor,
                admin: values.admin
            }
        }

        const err = validate()
        if (!err) {
            dispatch(updateUser(user))
            setValues({
                title: '',
                titleError: '',
                username: '',
                usernameError: '',
                email: '',
                emailError: '',
                firstName: '',
                firstNameError: '',
                lastName: '',
                lastNameError: '',
                address: '',
                addressError: '',
                postcode: '',
                postcodeError: '',
                country: '',
                countryError: '',
                city: '',
                cityError: '',
                phoneNum: '',
                phoneNumError: '',
                newPassword: '',
                newPasswordError: '',
                gender: '',
                genderError: '',
                lookingFor: '',
                lookingForError: '',
                showPassword: false,
                admin: '',
                adminError: ''
            })
        }
    }


    return (
        <div className={classes.edit_user_container}>
            <Breadcrumb>
                <BreadcrumbItem><Link to="/admin/dashboard">Dashboard</Link></BreadcrumbItem>
                <BreadcrumbItem><Link to="/admin/dashboard/users">Users</Link></BreadcrumbItem>
                <BreadcrumbItem active>Edit User</BreadcrumbItem>
            </Breadcrumb>
            <div className={classes.edit_sub_container}>
                <div className={classes.title_section_user_edit}>
                    <span>
                        <img src={editIcon} alt="user edit icon" />
                    </span>
                    <h3 className={classes.title_user_edit}>Edit User</h3>
                </div>
                {alertSelector.message &&
                    <div className={`alert ${alertSelector.type}`}>
                        {alertSelector.message}
                    </div>
                }
                <hr />
                {
                    isLoading ?
                    <Loading />
                    :
                    errMess ?
                    <p>{errMess}</p>
                    :
                    user ?

                    <form className={classes.form}>
                     <FormControl error={values.title ? '' : values.titleError} className={classes.radio_section} component="fieldset">
                    <FormLabel component="legend">Title</FormLabel>
                        <RadioGroup row aria-label="title" name="title" value={values.title} onChange={handleChange('title')}>
                            <FormControlLabel value="Mr" control={<Radio color="primary"/>} label="Mr" />
                            <FormControlLabel value="Miss" control={<Radio color="primary"/>} label="Miss" />
                            <FormControlLabel value="Ms" control={<Radio color="primary"/>} label="Ms" />
                        </RadioGroup>
                        <FormHelperText id="component-error-text">{values.title ? '' : values.titleError}</FormHelperText>
                    </FormControl>
                    <br />
                    <TextField
                        error={values.username.length > 4 ? '' : values.usernameError}
                        name="username"
                        id="filled-textarea1"
                        label="Username"
                        multiline
                        variant="outlined"
                        value={values.username}
                        onChange={handleChange('username')}
                        margin="normal"
                        className={classes.textField}
                        helperText={values.username.length > 4 ? '' : values.usernameError}
                        style={{background: 'white'}}
                    />
                    <TextField
                        error={!(values.email.indexOf('@') === -1) ? '' : values.emailError}
                        name="email"
                        id="filled-textarea2"
                        label="Email address"
                        multiline
                        variant="outlined"
                        value={values.email}
                        onChange={handleChange('email')}
                        margin="normal"
                        className={classes.textField}
                        helperText={!(values.email.indexOf('@') === -1) ? '' : values.emailError}
                        style={{background: 'white'}}
                    />
                    <br />
                    <TextField
                        error={values.firstName ? '' : values.firstNameError}
                        name="firstName"
                        id="filled-textarea3"
                        label="First Name"
                        multiline
                        variant="outlined"
                        value={values.firstName}
                        onChange={handleChange('firstName')}
                        margin="normal"
                        className={classes.textField}
                        helperText={values.firstName ? '' : values.firstNameError}
                        style={{background: 'white'}}
                    />
                    <TextField
                        error={values.lastName ? '' : values.lastNameError}
                        name="lastName"
                        id="filled-textarea4"
                        label="Last Name"
                        multiline
                        variant="outlined"
                        value={values.lastName}
                        onChange={handleChange('lastName')}
                        margin="normal"
                        className={classes.textField}
                        helperText={values.lastName ? '' : values.lastNameError}
                        style={{background: 'white'}}
                    />
                    <br />
                    <TextField
                        error={values.address.length > 4 ? '' : values.addressError}
                        name="address"
                        id="filled-textarea5"
                        label="Address"
                        multiline
                        variant="outlined"
                        value={values.address}
                        onChange={handleChange('address')}
                        margin="normal"
                        className={classes.textField}
                        helperText={values.address.length > 4 ? '' : values.addressError}
                        style={{background: 'white'}}
                    />
                    <TextField
                        error={values.postcode.length > 4 ? '' : values.postcodeError}
                        name="postcode"
                        id="filled-textarea6"
                        label="Post Code"
                        multiline
                        variant="outlined"
                        value={values.postcode}
                        onChange={handleChange('postcode')}
                        margin="normal"
                        className={classes.textField}
                        helperText={values.postcode.length > 4 ? '' : values.postcodeError}
                        style={{background: 'white'}}
                    />
                    <br />
                    <FormControl error={values.country ? '' : values.countryError} variant="filled" style={    
                        {marginLeft: '0.5em', marginTop: '1em', marginBottom: 0, width: '22em'}} className={`${classes.formControl} ${classes.gender_ctr}`}>
                    <InputLabel htmlFor="gender">Country</InputLabel>
                    <Select
                        native
                        value={values.country}
                        onChange={handleChange('country')}
                        inputProps={{
                            name: 'country',
                            id: 'country',
                        }}
                        style={{background: 'white'}}
                    >
                        <option aria-label="None" value="" />
                        {
                            countries.map(country => {
                                return (
                                    <option key={country} value={country}>{country}</option>
                                )
                            })
                        }
                    </Select>
                    <FormHelperText id="component-error-text">{values.country ? '' : values.countryError}</FormHelperText>
                    </FormControl>
                    <TextField
                        error={values.city ? '' : values.cityError}
                        name="city"
                        id="filled-textarea-city"
                        label="City"
                        variant="outlined"
                        value={values.city}
                        onChange={handleChange('city')}
                        margin="normal"
                        className={classes.textField}
                        helperText={values.city ? '' : values.cityError}
                        style={{background: 'white'}}
                    />
                    <br />
                    <TextField
                        error={values.phoneNum.length > 8 ? '' : values.phoneNumError}
                        name="phoneNum"
                        id="filled-textarea8"
                        label="Phone number"
                        variant="outlined"
                        value={values.phoneNum}
                        onChange={handleChange('phoneNum')}
                        margin="normal"
                        className={classes.textField}
                        helperText={values.phoneNum.length > 8 ? '' : values.phoneNumError}
                        style={{marginTop: '0.65em', background: 'white'}}
                    />

                    <br />                                    
                    <FormControl error={values.gender ? '' : values.genderError} variant="filled" style={{marginLeft: '0.5em',}} className={`${classes.formControl} ${classes.gender_ctr}`}>
                        <InputLabel htmlFor="gender">Gender</InputLabel>
                        <Select
                        native
                        value={values.gender}
                        onChange={handleChange('gender')}
                        inputProps={{
                            name: 'gender',
                            id: 'gender',
                        }}
                        style={{background: 'white'}}
                        >
                        <option aria-label="None" value="" />
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Prefer not to say</option>
                        </Select>
                        <FormHelperText id="component-error-text">{values.gender ? '' : values.genderError}</FormHelperText>
                    </FormControl>
                    <FormControl error={values.lookingFor ? '' : values.lookingForError} variant="filled" className={`${classes.formControl} ${classes.looking_ctr}`}>
                        <InputLabel htmlFor="lookingFor">Looking for</InputLabel>
                        <Select
                        native
                        value={values.lookingFor}
                        onChange={handleChange('lookingFor')}
                        inputProps={{
                            name: 'lookingFor',
                            id: 'lookingFor',
                        }}
                        style={{background: 'white'}}
                        >
                        <option aria-label="None" value="" />
                        <option value="rent">Rent</option>
                        <option value="buy">Buy</option>
                        </Select>
                        <FormHelperText id="component-error-text">{values.lookingFor ? '' : values.lookingForError}</FormHelperText>
                    </FormControl>
                    <FormControl error={values.admin ? '' : values.adminError} variant="filled" className={`${classes.formControl} ${classes.looking_ctr}`}>
                        <InputLabel htmlFor="admin">Admin</InputLabel>
                        <Select
                            native
                            value={values.admin}
                            onChange={handleChange('admin')}
                            inputProps={{
                                name: 'admin',
                                id: 'admin',
                            }}
                            style={{background: 'white'}}
                        >
                        <option aria-label="None" value="" />
                        <option value="true">True</option>
                        <option value="false">False</option>
                        </Select>
                        <FormHelperText id="component-error-text">{values.admin ? '' : values.adminError}</FormHelperText>
                    </FormControl>
                    <br />
                    <div className={classes.toggle_pwd_division}>
                        <span className={classes.toggle_password_btn} onClick={togglePassword}>Modify password?</span>
                    </div>

                    <br />
                    {//modify password section hidden if false
                        modifyPwd &&
                        
                        <FormControl error={values.newPassword.length > 4 ? '' : values.newPasswordError} className={classes.password_field} variant="filled">
                        <InputLabel htmlFor="password">New Password</InputLabel>
                        <FilledInput
                            id="password"
                            type={values.showPassword ? 'text' : 'password'}
                            value={values.newPassword}
                            onChange={handleChange('newPassword')}
                            endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                                >
                                {values.showPassword ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                            </InputAdornment>
                            }
                            style={{background: 'white'}}
                        />
                        <FormHelperText id="component-error-text">{values.newPassword.length > 4 ? '' : values.newPasswordError}</FormHelperText>
                        </FormControl>
                    }
                    <div style={{display: 'flex', justifyContent: 'center'}}>
                    <div className={classes.btn_submit_setion}>
                        <Link className={classes.cancel_link} to="/admin/dashboard/users">Cancel</Link>
                        <button onMouseDown={e => e.preventDefault()} className={classes.btn_submit_form} onClick={(e) => submitHandler(e)}>Update User</button>
                    </div>
                    </div>
                                
                    {
                        isLoading && 
                        <span style={{margin: '4em 0 0 2em'}}>
                        <img style={{marginRight: '0.5em'}} src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" alt="loading" />
                        Loading...
                        </span>
                    }
                </form>

                :
                <div>
                    <p>No user uploaded. Retry</p>
                </div>
                }
                
            </div>

        </div>
    )
}

export default EditUser