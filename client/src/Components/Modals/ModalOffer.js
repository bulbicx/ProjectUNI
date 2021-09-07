import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { history } from '../../redux/helpers/history'
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { useDispatch, useSelector } from 'react-redux'
import { makeNewOffer } from '../../redux/ActionCreators';
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

export default function ModalOffer(propertyId, user, category) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  
  const dispatch = useDispatch()
  const offersList = useSelector(state => state.offers)
  const { isLoading } = offersList

  const alertSelector = useSelector(state => state.alert)

  const [values, setValues] = React.useState({
    offerSum: 0,
    moveInDate: '',
    moveOutDate: '',
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

    const offer = {
      offerSum: values.offerSum,
      moveInDate: new Date(values.moveInDate),
      moveOutDate: new Date(values.moveOutDate),
      user: user._id,
      property: propertyId
    }

    dispatch(makeNewOffer(offer))

    setValues({
      offerSum: 0,
      moveInDate: '',
      moveOutDate: '',
      user: '',
      property: ''
    }) 
  }

  return (
    <div>
      <button
        onMouseDown={e => e.preventDefault()}
        type="button"
        onClick={handleOpen}
        className={`${ classes.btn } ${ classes.btn_yell }`}
      >
        Make an offer
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
            <h2 className={classes.title}>Make an offer</h2>
            <div className="form-group">
              <label className={classes.label} htmlFor="offerSum">Offer sum{category === 'rent' ? '(pcm)' : ''}:</label>
              <input
                className="form-control"
                type="number"
                id="offerSum"
                value={values.offerSum}
                onChange={handleChange('offerSum')}
                required
              /> 
              </div>
              {
                category === 'rent' ?
                <>
                <div className="form-group">
                  <label className={classes.label} htmlFor="moveIn">Proposed move-in date:</label>
                    <input
                      className="form-control"
                      type="date"
                      id="moveIn"
                      value={values.moveInDate}
                      onChange={handleChange('moveInDate')}
                      required
                    /> 
                </div>
                <div className="form-group">
                  <label className={classes.label} htmlFor="moveOut">Expected move-out date:</label>
                    <input
                      className="form-control"
                      type="date"
                      id="moveOut"
                      value={values.moveOutDate}
                      onChange={handleChange('moveOutDate')}
                      required
                    /> 
                </div>
                <button
                  onClick={onSubmit}
                  className="btn btn-primary"
                  disabled={
                    values.offerSum <= 0
                    || values.moveInDate === ''
                    || values.moveOutDate === ''
                  }
                >Submit
                </button>
                </>
                :
                <button
                  onClick={onSubmit}
                  className="btn btn-primary"
                  disabled={values.offerSum <= 0}
                >Submit
                </button>
              }
            <small style={{marginTop: '1.4em'}} id="emailHelp" className="form-text text-muted">By submitting this form you are instructing us to enter into negotiations with the owner of your chosen property</small>
          </form>
        }
        </div>
      </Fade>
      </Modal>
      
    </div>
  );
}