import { makeStyles, OutlinedInput } from '@material-ui/core'
import React, {useState} from 'react'
import backgroundImg from '../../assets/images/contact.jpg'
import TextField from '@material-ui/core/TextField'
import IconButton from '@material-ui/core/IconButton'
import FilledInput from '@material-ui/core/FilledInput'
import InputLabel from '@material-ui/core/InputLabel'
import InputAdornment from '@material-ui/core/InputAdornment'
import FormControl from '@material-ui/core/FormControl'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import { Link, Redirect, useHistory } from 'react-router-dom'
import FormHelperText from '@material-ui/core/FormHelperText'

const useStyles = makeStyles({
    container: {
        position: 'relative',
        width: '100%',
        minHeight: '65em',
        height: '100%',
        OObjectFit: 'fill',
        objectFit: 'fill',
        display: 'flex',
        WebkitJustifyContent: 'center',
        msFlexPack: 'center',
        justifyContent: 'center',
        alignItems: 'center',
    },
    background_img: {
        width: '100%',
        height: '100%',
        minHeight: '65em',
        // height: 1200,
        objectFit: 'cover',
        OObjectFit: 'cover',
    },
    form_container: {
        background: 'white',
        padding: '2.1em 2.2em 1.5em',
        position: 'absolute',
        top: '20%',
        // left: '40%',
        borderRadius: '2.2em',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        // '@media (max-width: 1000px)': {
        //     left: '20%',
        //     '@media (max-width: 600px)': {
        //         left: '8%'
        //     }
        // }
    },
    h2: {
        fontSize: '1.8rem',
        color: '#2c3e50',
        marginBottom: '1em'
    },
    form: {
        padding: '0.5em 1em',
        display: 'flex',
        flexDirection: 'column'
    },
    textField: {
        minWidth: '260px',
        marginBottom: '1.1em'
    },
    password_field: {
        minWidth: '260px',
    },
    forgot_pw: {
        marginRight: '8em',
        marginBottom: '2.75em',
        textDecoration: 'underline'
    },
    btn: {
        background: '#f4d03f',
        padding: '0.85em 5em',
        borderRadius: '1.6em',
        fontSize: '1.3rem',
        fontWeight: 'bold',
        marginBottom: '0.7em',
        border: 'none',
        // color: '#2c3e50',
        '&:hover': {
            background: '#2c3e50',
            color: 'white',
            cursor: 'pointer'
        }
    },
    register: {
        fontSize: '1rem',
        marginLeft: '4.6em',
    },
    link: {
        fontWeight: 'bold',
        color: '#2c3e50',
        '&:hover': {
            textDecoration: 'underline',
            color: '#F8C471'
        }
    }
})

function Login(props) {
    const classes = useStyles()
    const history = useHistory()
    
    const [values, setValues] = useState({
        username: '',
        usernameError: '',
        password: '',
        passwordError: '',
        showPassword: false,
    })

    const handleChange = (prop) => (e) => {
        setValues({ ...values, [prop]: e.target.value})
    } 

    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword })
    }
    
    const handleMouseDownPassword = (event) => {
        event.preventDefault()
    }

    const validate = () => {
        let error = false

        const errors = {
            usernameError: '',
            passwordError: '',
        }

        if (values.username === '') {
            error = true
            errors.usernameError = 'Username must be provided'
        }

        if (values.password === '') {
            error = true
            errors.passwordError = 'Password cannot be empty'
        }
        setValues({
            ...values,
            ...errors
        })

        return error
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        let err = validate()
        if (!err) {
            props.loginUser({ username: values.username, password: values.password})
            
            //alert(JSON.stringify(values))
            setValues({
                username: '',
                password: '',
                showPassword: false,
            })
        }
    }

    return (
        <div className={classes.container}>
            <img style={{zIndex: -1}} src={backgroundImg} alt="background image" className={classes.background_img} />
            <div className={classes.form_container}>
                {props.alert.message &&
                    <div className={`alert ${props.alert.type}`}>
                        {props.alert.message}
                    </div>
                }
                <h2 className={classes.h2}>Enter your details to log in</h2>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <TextField
                            name="username"
                            label="Username"
                            variant="outlined"
                            value={values.username}
                            onChange={handleChange('username')}
                            margin="normal"
                            className={classes.textField}
                            error={values.usernameError}
                            helperText={values.usernameError}
                    />
                    <br />
                    <FormControl
                        error={values.passwordError}
                        className={classes.password_field}
                        variant="outlined"
                    >
                        <InputLabel htmlFor="password">Password</InputLabel>
                        <OutlinedInput
                            required
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
                            labelWidth={70}
                        />
                        <FormHelperText id="component-error-text">
                            {values.passwordError}
                        </FormHelperText>
                    </FormControl>
                    <Link to="/auth/password/forgot" className={classes.forgot_pw}>Forgot Password?</Link>
                    {props.auth.isLoading &&
                        <img style={{width: '10px', height: '10px'}} src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                    }
                    <button
                        onMouseDown={e => e.preventDefault()}
                        className={classes.btn}
                        disabled={!values.username || !values.password}
                    >Login
                    </button>
                </form>
                <p className={classes.register}>You don't have an account? <Link to="/users/signup" className={classes.link}>Register</Link></p>
            </div>
        </div>
    )
}

export default Login