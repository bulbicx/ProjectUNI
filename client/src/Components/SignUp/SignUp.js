import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core'
import backgroundImg from '../../assets/images/contact.jpg'
import { Link } from 'react-router-dom'
import TextField from '@material-ui/core/TextField'
import IconButton from '@material-ui/core/IconButton'
import InputLabel from '@material-ui/core/InputLabel'
import InputAdornment from '@material-ui/core/InputAdornment'
import FormControl from '@material-ui/core/FormControl'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormLabel from '@material-ui/core/FormLabel'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormHelperText from '@material-ui/core/FormHelperText'
import Checkbox from '@material-ui/core/Checkbox';
import countries from './countries'

const useStyles = makeStyles((theme) => ({
    container: {
        position: 'relative',
        width: '100%',
        minHeight: '110em',
        height: '100%',
        OObjectFit: 'fill',
        objectFit: 'fill',
        display: 'flex',
        WebkitJustifyContent: 'center',
        msFlexPack: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        '@media (max-width: 894px)': { 
            minHeight: '120em',
        }
    },
    background_img: {
        width: '100%',
        height: '100%',
        minHeight: '110em',
        // height: 1200,
        objectFit: 'cover',
        OObjectFit: 'cover',
        '@media (max-width: 894px)': { 
            minHeight: '120em',
        }
    },
    sub_container: {
        position: 'absolute',
        top: '7%',
        left: '30%',
        backgroundColor: '#F8F9F9',
        padding: '1em 1.5em',
        justifyContent: 'center',
        borderRadius: '2em',
        '@media (max-width: 1500px)': { 
            left: '15%',
            '@media (max-width: 1060px)': { 
                left: '3%',
            }
        }
    },
    title_section: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '1em 1.2em',
    },
    h2: {
        fontSize: '2.2rem',
        color: '#2c3e50',
        '@media (max-width: 890px)': { 
            fontSize: '1.7em',
        }
    },
    p: {
        fontSize: '1.4rem'
    },
    form_section: {
        padding: '1em',
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
    gender_ctr: {
        marginLeft: '1em',
        width: '38ch',
        '@media (max-width: 897px)': { 
           marginLeft: '0.5em'
        }
    },
    looking_ctr: {
        marginBottom: '1.7em'
    },
    btn: {
        background: '#f4d03f',
        padding: '0.85em 3.7em',
        borderRadius: '1.6em',
        fontSize: '1.3rem',
        fontWeight: 'bold',
        marginLeft: '65%',
        marginBottom: '1em',
        border: 'none',
        '&:hover': {
            background: '#F8C471',
            cursor: 'pointer'
        },
        '@media (max-width: 895px)': { 
            marginLeft: 0,

        }
    },
    message: {
        fontSize: '1.1rem',
        marginLeft: '55%',
        '@media (max-width: 895px)': { 
            marginLeft: 0
        }
    },
    link: {
        color: '#2c3e50',
        fontWeight: 'bold',
        '&:hover': {
            textDecoration: 'underline',
            color: '#F5B041',
        }
    }
  }))

function SignUp(props) {
    const classes = useStyles()

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
        password: '',
        repeatPwd: '',
        gender: '',
        lookingFor: '',
        showPassword: false,
        privacyTerms: false
    })

    const handleChange = (prop) => (e) => {
        setValues({ ...values, [prop]: e.target.value})
    } 

    const handleChangeCheckbox = (prop) => (e) => {
        setValues({ ...values, [prop]: e.target.checked})
    }
    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword })
    }
    
    const handleMouseDownPassword = (event) => {
        event.preventDefault()
    }

    const validate = () => {
        let isError = false
        let re = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/
        
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
            passwordError: '',
            passwordMatch: '',
            genderError: '',
            lookingForError: '',
            privacyTermsError: ''
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

        if (/\d/.test(values.firstName) || values.firstName === '') {
            isError = true
            errors.firstNameError = 'Name must not contain numbers'
        }

        if (/\d/.test(values.lastName)  || values.lastName === '') {
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

        if (values.phoneNum.length < 9 || /\D/.test(values.phoneNum)) {
            isError = true
            errors.phoneNumError = 'Phone number must be inserted in a correct format'
        }

        if (!values.password.match(re)) {
            isError = true
            errors.passwordError = 'Password is not strong enough'
        }

        if (values.password !== values.repeatPwd) {
            isError = true
            errors.passwordError = 'Passwords do not match'
            errors.passwordMatch = 'Passwords do not match'
        }

        if (values.gender === '') {
            isError = true
            errors.genderError = 'A gender must be chosen'
        }

        if (values.lookingFor === '') {
            isError = true
            errors.lookingForError = 'A category must be chosen'
        }

        if (values.privacyTerms === false) {
            isError = true
            errors.privacyTermsError = 'Privacy terms must be accepted'
        }

        setValues({
            ...values,
            ...errors
        })

        return isError
    }

    String.prototype.capitalize = function() {
        return this.charAt(0).toUpperCase() + this.substring(1).toLocaleLowerCase()
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const err = validate()
        if (!err) {
            props.signupUser({
                username: values.username,
                password: values.password,
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
                privacyPolicyAccepted: values.privacyTerms
            })

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
                password: '',
                passwordError: '',
                repeatPwd: '',
                passwordMatch: '',
                gender: '',
                genderError: '',
                lookingFor: '',
                lookingForError: '',
                showPassword: false,
                privacyTermsError: '',
                privacyTerms: false
            })
        }
        
    }

    const checkMinChar = () => {
        if (values.password.length >= 8) {
            return true
        }
        else {
            return false
        }
    }

    const checkOneNumChar = () => {
        if (/\d/.test(values.password)) {
            return true
        }
        else {
            return false
        }
    }

    const checkOneLowChar = () => {
        if (/[a-z]/.test(values.password)) {
            return true
        }
        else {
            return false
        }
    }

    const checkOneUpChar = () => {
        if (/[A-Z]/.test(values.password)) {
            return true
        }
        else {
            return false
        }
    }

    const checkOneSpecChar = () => {
        if (/[^\w\s]/.test(values.password)) {
            return true
        }
        else {
            return false
        }
    }

    const checkPwdMatch = () => {
        if (values.password === values.repeatPwd && values.password !== '' && values.repeatPwd !== '') {
            return true
        }
        else {
            return false
        }
    }

    const { registering } = props

    return (
        <div className={classes.container}>
            <img style={{zIndex: -1}} src={backgroundImg} alt="background image" className={classes.background_img} />
            <div className={classes.sub_container}>
                <div className={classes.title_section}>
                    {props.alert.message &&
                        <div className={`alert ${props.alert.type}`}>
                            {props.alert.message}
                        </div>
                    }
                    <h2 className={classes.h2}>Become a virtual member today!</h2>
                    <p className={classes.p}>Tell us about yourself</p>
                </div>
                <div className={`${ classes.form_section }`}>
                    <form onSubmit={handleSubmit} >
                    <div className="row">
                        <div className="col">
                            <FormControl error={values.titleError} className={classes.radio_section} component="fieldset">
                            <FormLabel component="legend">Title</FormLabel>
                                <RadioGroup row aria-label="title" name="title" value={values.title} onChange={handleChange('title')}>
                                    <FormControlLabel value="Mr" control={<Radio color="primary"/>} label="Mr" />
                                    <FormControlLabel value="Miss" control={<Radio color="primary"/>} label="Miss" />
                                    <FormControlLabel value="Ms" control={<Radio color="primary"/>} label="Ms" />
                                </RadioGroup>
                                <FormHelperText id="component-error-text">{values.titleError}</FormHelperText>
                            </FormControl>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <TextField
                                required
                                error={values.usernameError}
                                name="username"
                                id="filled-textarea1"
                                label="Username"
                                variant="outlined"
                                value={values.username}
                                onChange={handleChange('username')}
                                margin="normal"
                                className={classes.textField}
                                helperText={values.usernameError}
                            />

                        </div>
                        <div className="col">
                            <TextField
                                required
                                error={values.emailError}
                                name="email"
                                id="filled-textarea2"
                                label="Email address"
                                variant="outlined"
                                value={values.email}
                                onChange={handleChange('email')}
                                margin="normal"
                                className={classes.textField}
                                helperText={values.emailError}
                            />

                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <TextField
                                required
                                error={values.firstNameError}
                                name="firstName"
                                id="filled-textarea3"
                                label="First Name"
                                variant="outlined"
                                value={values.firstName}
                                onChange={handleChange('firstName')}
                                margin="normal"
                                className={classes.textField}
                                helperText={values.firstNameError}
                            />
                        </div>
                        <div className="col">
                            <TextField
                                required
                                error={values.lastNameError}
                                name="lastName"
                                id="filled-textarea4"
                                label="Last Name"
                                variant="outlined"
                                value={values.lastName}
                                onChange={handleChange('lastName')}
                                margin="normal"
                                className={classes.textField}
                                helperText={values.lastNameError}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <TextField
                                required
                                error={values.addressError}
                                name="address"
                                id="filled-textarea5"
                                label="Address"
                                variant="outlined"
                                value={values.address}
                                onChange={handleChange('address')}
                                margin="normal"
                                className={classes.textField}
                                helperText={values.addressError}
                            />
                        </div>
                        <div className="col">
                            <TextField
                                variant="outlined"
                                required
                                error={values.postcodeError}
                                name="postcode"
                                id="filled-textarea6"
                                label="Post Code"
                                value={values.postcode}
                                onChange={handleChange('postcode')}
                                margin="normal"
                                className={classes.textField}
                                helperText={values.postcodeError}
                            />
                        </div>
                    </div>    
                    <div className="row">
                        <div className="col">
                            <TextField
                                variant="outlined"
                                required
                                error={values.countryError}
                                select
                                label="Country"
                                value={values.country}
                                onChange={handleChange('country')}
                                margin="normal"
                                SelectProps={{
                                    native: true,
                                }}
                                helperText={values.countryError}
                                className={classes.textField}
                                >
                                <option aria-label="None" value="" />
                                {
                                    countries.map(country => {
                                        return (
                                            <option key={country} value={country}>{country}</option>
                                        )
                                    })
                                }
                            </TextField>
                        </div>
                        <div className="col">
                            <TextField
                                required
                                error={values.cityError}
                                name="city"
                                id="filled-textarea-city"
                                label="City"
                                variant="outlined"
                                value={values.city}
                                onChange={handleChange('city')}
                                margin="normal"
                                className={classes.textField}
                                helperText={values.cityError}
                            />
                        </div>
                    </div>       
                    <div className="row">
                        <div className="col">
                            <TextField
                                variant="outlined"
                                required
                                error={values.genderError}
                                select
                                label="Gender"
                                value={values.gender}
                                onChange={handleChange('gender')}
                                margin="normal"
                                SelectProps={{
                                    native: true,
                                }}
                                helperText={values.genderError}
                                className={classes.textField}
                                >
                            <option aria-label="None" value="" />
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Prefer not to say</option>
                            </TextField>
                        </div>
                        <div className="col">
                            <TextField
                                variant="outlined"
                                required
                                error={values.lookingForError}
                                select
                                label="Looking for"
                                value={values.lookingFor}
                                onChange={handleChange('lookingFor')}
                                margin="normal"
                                SelectProps={{
                                    native: true,
                                }}
                                helperText={values.lookingForError}
                                className={classes.textField}
                                >
                                <option aria-label="None" value="" />
                                <option value="rent">Rent</option>
                                <option value="buy">Buy</option>
                            </TextField>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <TextField
                                required
                                error={values.phoneNumError}
                                name="phoneNum"
                                id="filled-textarea8"
                                label="Phone number"
                                variant="outlined"
                                value={values.phoneNum}
                                onChange={handleChange('phoneNum')}
                                margin="normal"
                                className={classes.textField}
                                helperText={values.phoneNumError}
                                style={{marginTop: '0.65em'}}
                            />
                        </div>
                    </div> 
                    <div className="row">
                        <div className="col">
                            <FormControl
                                error={values.passwordError}
                                className={classes.password_field}
                                variant="outlined"
                                required
                            >
                                <InputLabel htmlFor="password">Password</InputLabel>
                                    <OutlinedInput
                                        // error={values.passwordError === '' ? false : true}
                                    id="password"
                                    type={values.showPassword ? 'text' : 'password'}
                                    value={values.password}
                                    onChange={handleChange('password')}
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
                                    labelWidth={75}
                                />
                                    <FormHelperText id="component-error-text">
                                        {values.passwordError}
                                    </FormHelperText>
                            </FormControl>
                        </div>
                        <div className="col">
                            <FormControl
                                error={values.passwordMatch}
                                className={classes.password_field}
                                variant="outlined"
                                required
                            >
                                <InputLabel htmlFor="password">Repeat Password</InputLabel>
                                <OutlinedInput
                                    id="password"
                                    type={values.showPassword ? 'text' : 'password'}
                                    value={values.repeatPwd}
                                    onChange={handleChange('repeatPwd')}
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
                                    labelWidth={140}
                                />
                                    <FormHelperText id="component-error-text">
                                        {values.passwordMatch}
                                    </FormHelperText>
                            </FormControl>
                        </div>
                    </div>
                    <p className="ml-2 mt-3"><b>Password must contain:</b></p>
                    <div className="row mt-3">
                        <div className="col">
                            <ul>
                                <li>
                                    <i
                                        style={{ color: checkMinChar() ? 'green' : 'red' }}
                                        className={`fas fa-${ checkMinChar() ? 'check' : 'times' } mr-3`}
                                    >
                                    </i>At least 8 characters
                                </li>
                                <li>
                                    <i
                                        style={{ color: checkOneNumChar() ? 'green' : 'red' }}
                                        className={`fas fa-${ checkOneNumChar() ? 'check' : 'times' } mr-3`}
                                    >
                                    </i>At least 1 numeric character
                                </li>
                                <li>
                                    <i
                                        style={{ color: checkOneLowChar() ? 'green' : 'red' }}
                                        className={`fas fa-${ checkOneLowChar() ? 'check' : 'times' } mr-3`}
                                    >
                                    </i>At least 1 lowercase letter
                                </li>
                                <li>
                                    <i
                                        style={{ color: checkOneUpChar() ? 'green' : 'red' }}
                                        className={`fas fa-${ checkOneUpChar() ? 'check' : 'times' } mr-3`}
                                    >
                                    </i>At least 1 uppercase letter
                                </li>
                                <li>
                                    <i
                                        style={{ color: checkOneSpecChar() ? 'green' : 'red' }}
                                        className={`fas fa-${ checkOneSpecChar() ? 'check' : 'times' } mr-3`}
                                    >
                                    </i>At least 1 special character
                                </li>
                                <li>
                                    <i
                                        style={{ color: checkPwdMatch() ? 'green' : 'red' }}
                                        className={`fas fa-${ checkPwdMatch() ? 'check' : 'times' } mr-3`}
                                    >
                                    </i>Passwords match
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="row text-left">
                        <div className="col text-left ml-2">
                            <FormControl required error={values.privacyTermsError}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={values.privacyTerms}
                                            onChange={handleChangeCheckbox('privacyTerms')}
                                            name="privacyTerms"
                                            color="primary"
                                        />
                                    }
                                    label={
                                        <div>
                                            <span>I acknowledge that I have read and agree to the </span>
                                            <Link to="/term-and-conditions">Terms and Conditions</Link>
                                            <span> and </span>
                                            <Link to="/privacy-policy">Privacy Policy</Link>
                                        </div>
                                    }
                                        
                                />
                                <FormHelperText>{ values.privacyTermsError }</FormHelperText>
                            </FormControl>

                        </div>
                    </div>
                        
                    <br />

                    <button
                        onMouseDown={e => e.preventDefault()}
                        className={classes.btn}
                        disabled={!values.title
                            || !values.username
                            || !values.email 
                            || !values.firstName
                            || !values.lastName
                            || !values.address
                            || !values.postcode
                            || !values.country
                            || !values.city
                            || !values.phoneNum
                            || !values.password
                            || !values.repeatPwd
                            || !values.gender
                            || !values.lookingFor
                        }
                        >Register!
                    </button>
                    { registering &&
                        <img alt="loader" src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />

                    }
                    <p className={classes.message}>Do you have already an account? <Link className={classes.link} to="/users/login">Sign in</Link></p>
                    </form>
                </div>        
            </div>
        </div>
    )
}

export default SignUp