import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { history } from '../../redux/helpers/history'
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { useDispatch, useSelector } from 'react-redux'
import { bookViewing } from '../../redux/ActionCreators';
import { Loading } from '../LoadingComponent';


const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  title: {
    fontSize: '3.1rem',
    marginBottom: '1em'
  },
  btn: {
    fontSize: '1.7rem',
    padding: '0.5em 1em',
    fontWeight: 'bold',
    width: '300px',
    borderRadius: '2em',
    border: 'none',
    transitionDuration: '0.2s',
    '&:hover': {
      fontSize: '1.8rem',
      transitionDuration: '0.2s',
    },
    '@media (max-width: 1850px)': { 
      fontSize: '1.4rem',
      width: '285px',
    }
  },
  btn_yell: {
    background: '#F4D03F',
    color: '#2C3E50',
    '&:hover': {
      background: '#F9E79F',
      cursor: 'pointer'
    },
    '@media (max-width: 700px)': { 
      marginTop: '2em'
    }
  },
  btn_blue: {
    background: '#2C3E50',
    color: 'white',
    '&:hover': {
      background: '#5A7693',
      cursor: 'pointer'
    },
  },
}));

export default function ModalViewing(propertyId, user, colour) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  
  const dispatch = useDispatch()
  const viewingsList = useSelector(state => state.viewings)
  const { isLoading } = viewingsList

  const alertSelector = useSelector(state => state.alert)

  const [values, setValues] = React.useState({
    date: '',
    time: '',
    user: '',
    property: ''
  }) 

  const handleOpen = () => {
    const user = JSON.parse(localStorage.getItem('user'))
    if (!user) {
      history.push('/users/login') 
    } else {
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = name => event => {
    setValues({...values, [name]: event.target.value })
  }


  const onSubmit = e => {
    e.preventDefault()

    const viewing = {
      date: new Date(values.date),
      time: values.time,
      user: user._id,
      property: propertyId
    }

    dispatch(bookViewing(viewing))

    setValues({
      date: '',
      time: '',
      user: '',
      property: ''
    }) 
  }

  const slots = ['10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '16:00', '16:30']

  return (
    <div>
      <button
        onMouseDown={e => e.preventDefault()}
        type="button"
        onClick={handleOpen}
        className={`${ classes.btn } ${ colour === 'blue' ? classes.btn_blue : classes.btn_yell }`}
      >
        Arrange a viewing
      </button>  
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
      <Fade in={open}>
        <div className={classes.paper}>
        {
          isLoading ?
          <Loading />
          :
          <form className={classes.form_container}>
          {alertSelector.message &&
              <div className={`alert ${alertSelector.type}`}>
                  {alertSelector.message}
              </div>
          }
            <h2 className={classes.title}>Book a Viewing</h2>
            <div className="form-group">
              <label className={classes.label} htmlFor="date">Date:</label>
                <input
                  className="form-control"
                  type="date"
                  id="date"
                  value={values.date}
                  onChange={handleChange('date')}
                  required
                /> 
            </div>
            <div className="form-group">
              <label className={classes.label} htmlFor="time">What time?</label>
                <select
                  className="form-control"
                  value={values.time}
                  onChange={handleChange('time')}
                  id="time"
                >
                      <option value=""></option>
                {
                  slots.map(slot => (
                    <option value={slot}>{slot}</option>
                  ))
                }
              </select>
            </div>
            <button
              onClick={onSubmit}
              className="btn btn-primary"
              disabled={
                values.data === ''
                || values.time === ''
              }
            >Submit
            </button>
            <small style={{marginTop: '1.4em'}} id="emailHelp" className="form-text text-muted">By submitting this form you commit to be present to the viewing</small>
          </form>
        }
        </div>
      </Fade>
      </Modal>
      
    </div>
  );
}