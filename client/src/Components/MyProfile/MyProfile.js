import React from 'react'
import { makeStyles } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { Loading } from '../LoadingComponent'
import { useDispatch } from 'react-redux'
import { deleteUser, logoutUser } from '../../redux/ActionCreators'
import { history } from '../../redux/helpers/history'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const useStyles = makeStyles({
    container: {
        // padding: '2em',
        fontSize: '1.4rem',
        '@media (max-width: 1500px)': { 
            fontSize: '1.15rem'
        },
        width: '100%',
        height: '100%',
    },
    link_container: {
        height: '4.5em',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-end',
        fontSize: '1.6rem',
        marginLeft: '1em',
        '@media (max-width: 1500px)': { 
            fontSize: '1.35rem'
        }
    },
    content_page: {
        padding: '2em',
        width: '100%',
        height: '100%',
        background: '#F2F4F4'
    },
    content_details: {
        marginTop: '1.2em',
        boxShadow: '0px 0 5px 1px #707070'
    },
    link: {
        padding: '0 1em',
        color: '#AEB6BF',
        '&:hover': {
            textDecoration: 'none',
            borderBottom: '2px solid #34495E',
            color: '#34495E'
        }
    },
    current: {
        color: '#34495E',
        borderBottom: '2px solid #34495E',
        cursor: 'context-menu',
        '&:hover': {
            color: '#2C3E50',
        }
    },
    p: {
        marginBottom: 0,
        background: 'white',
        color: '#34495E',
        height: '2.5em',
        padding: '0 1em',
        display: 'flex',
        alignItems: 'center',
        fontSize: '1.6rem',
    },
    span: {
        fontWeight: 'bold',
        paddingRight: '0.5em'
    },
    h1: {
        fontSize: '1.6rem',
        color: '#34495E',
        '@media (max-width: 1500px)': { 
            fontSize: '1.45rem'
        }
    },
    btn_delete: {
        cursor: 'pointer',
        margin: '1em',
        background: '#F1948A',
        '&:hover': {
            background: '#F1948A',
            color: 'white',
        }
    },
    btn: {
        cursor: 'pointer',
        fontSize: '1.2rem'
    },
    btn_decision_no: {
        background: '#7DCEA0',
        '&:hover': {
            background: '#A9DFBF',
            color: 'white',
        }
    },
    btn_decision_yes: {
        background: '#EC7063',
        
        '&:hover': {
            background: '#F1948A',
            color: 'white',
        }
    }
})

function MyAccount({loggedUser, userIsLoading, userErrMess}) {
    const classes = useStyles()

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    const dispatch = useDispatch()

    const deleteAccount = async (id) => {
        await dispatch(deleteUser(id))
        await dispatch(logoutUser())
        history.push('/')
    }

    if (userIsLoading) {
        return (
            <div>
                <div className={classes.container}>
                    <Loading />
                </div>
            </div>
        )
    }
    else if (userErrMess) {
        return (
            <div>
                <div className={classes.container}>
                    <h4>{userErrMess}</h4>
                </div>
            </div>
        )
    }
    else {
        return (
            <div className={classes.container}>
                <div className={classes.link_container}>
                    <Link className={classes.link} to="/users/account">Overview</Link>
                    <Link className={`${classes.link} ${classes.current}`} to="/users/account/my-profile">My profile</Link>
                </div>
                <div className={classes.content_page}>
                    <h1 className={classes.h1}>My personal details</h1>
                    <hr />
                    <div className={classes.content_details}>
                        <p className={classes.p}><span className={classes.span}>Username:</span> {loggedUser.username}</p>
                        <p className={classes.p}><span className={classes.span}>Title:</span> {loggedUser.title}</p>
                        <p className={classes.p}><span className={classes.span}>First name:</span> {loggedUser.firstName}</p>
                        <p className={classes.p}><span className={classes.span}>Surname:</span> {loggedUser.lastName}</p>
                        <p className={classes.p}><span className={classes.span}>Gender:</span> {loggedUser.gender}</p>
                        <p className={classes.p}><span className={classes.span}>Address:</span> {loggedUser.address}</p>
                        <p className={classes.p}><span className={classes.span}>Postcode:</span> {loggedUser.postcode}</p>
                        <p className={classes.p}><span className={classes.span}>Country:</span> {loggedUser.country}</p>
                        <p className={classes.p}><span className={classes.span}>City:</span> {loggedUser.city}</p>
                        <p className={classes.p}><span className={classes.span}>Mobile phone:</span> {loggedUser.phoneNumber}</p>
                        <p className={classes.p}><span className={classes.span}>Email:</span> {loggedUser.email}</p>
                        <button onMouseDown={e => e.preventDefault()} className={classes.btn_delete} onClick={handleClickOpen} >Delete account</button>
                        <Dialog
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                        >
                            <DialogTitle id="alert-dialog-title">{"You are leaving us?"}</DialogTitle>
                            <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                Are you sure you want to delete this account?
                            </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <button className={`${classes.btn_decision_no} ${classes.btn}`} onClick={handleClose}>No</button>
                                <button className={`${classes.btn_decision_yes} ${classes.btn}`} onClick={() =>  deleteAccount(loggedUser._id)} >Yes</button>
                            </DialogActions>
                        </Dialog>
                    </div>
                </div>
            </div>
        )
    }
}

export default MyAccount