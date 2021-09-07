import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core'
import moment from 'moment'
import ReactTooltip from 'react-tooltip';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { acceptOffer, declineOffer, deleteOffer, fetchOffers, modifyOffer } from '../../../redux/ActionCreators';
import { Loading } from '../../LoadingComponent';

const useStyles = makeStyles({
  container: {
    margin: '3.4em 2em',
    padding: '1em 0',
    border: '1px solid black',
    overflowY: 'scroll',
    height: '70em',
    minWidth: '40em',
  },
  offer_container: {
    margin: '1.2em 0.4em',
    minWidth: '40em',
    fontSize: '1.3rem'
  },
  offer_sub_container: {
    padding: '1.35em 1.3em',
    background: '#E9E9EB',
  },
  offer_header: {
    background: '#FAFAFA',
    opacity: '1',
    padding: '0.45em 0.8em',
    letterSpacing: '1px',
    display: 'flex',
    justifyContent: 'space-between',
  },
  offer_text: {
    marginBottom: '0.2em',
    letterSpacing: '1px'
  },
  offer_two_col: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  accept_decline_container: {
    margin: '1.3em 0 0.4em',
    height: '3rem',
    display: 'flex',
    justifyContent: 'flex-end'
  },
  icon_section: {
    margin: '0.8em'
  },
  accept_icon: {
    color: 'green',
    fontSize: '2rem',
    '&:hover': {
      fontSize: '2.3rem',
      cursor: 'pointer'
    }
  },
  hold_icon: {
    fontSize: '2rem',
    color: 'blue',
    '&:hover': {
      fontSize: '2.3rem',
      cursor: 'pointer'
    }
  },
  decline_icon: {
    fontSize: '2rem',
    color: 'red',
    marginLeft: '1em',
    '&:hover': {
      fontSize: '2.3rem',
      cursor: 'pointer'
    }
  }
})

export default function Offers() {
  const classes = useStyles()
  const [document, setDocument] = useState([])

  const dispatch = useDispatch()
  const offersList = useSelector(state => state.offers)
  const { offers, isLoading, errMess } = offersList
  const landlordList = useSelector(state => state.landlords)
  const { landlords } = landlordList
  const alert = useSelector(state => state.alert)
  const usersList = useSelector(state => state.users)
  // 📝
  const notify = () => toast.dark('🎫 Wow so easy!', {
    toastId: '03994945nnignvi',
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });

  useEffect(() => {
    dispatch(fetchOffers())
  }, [])

  const removeOffer = (id) => {
    dispatch(deleteOffer(id))
  }

  var formatter = new Intl.NumberFormat('en');//currency

  const newOffers = offers && offers.length > 0 && offers.filter(offer => offer.onHold === false && offer.accepted !== true)
  const offersOnHold = offers && offers.length > 0 && offers.filter(offer => offer.onHold === true && offer.accepted !== true)

  const toggleOfferOnHold = (id) => {
    const offer = {
      _id: id,
      onHold: true
    }

    dispatch(modifyOffer(offer))
  }

  const toggleAcceptOffer = (offerId, userId) => {
    const { users } = usersList
    const userPrevDoc = users && users.filter(user => user._id === userId && user.documents.length > 0)//get user

    if (userPrevDoc && userPrevDoc.length > 0) { //check for previous offer and add them
      setDocument(userPrevDoc.documents)
    }
    //add new recent offer to array
    document.push({ doc: offerId })

    
    const offer = {
      _id: offerId,
      onHold: false,
      accepted: true
    }

    const user = {
      _id: userId,
      documents: document,
    }

    dispatch(acceptOffer(offer, user))
  }

  const toggleDeclineOffer = (offerId, userId) => {
    const { users } = usersList
    const userPrevDoc = users && users.filter(user => user._id === userId && user.documents.length > 0)//get user

    if (userPrevDoc && userPrevDoc.length > 0) { //check for previous offer and add them
      setDocument(userPrevDoc.documents)
    }
    //add new recent offer to array
    document.push({ doc: offerId })

    
    const offer = {
      _id: offerId,
      onHold: false,
      accepted: false,
      declined: true
    }

    const user = {
      _id: userId,
      documents: document,
    }

    dispatch(declineOffer(offer, user))
  }

  
  const showOffers = (offers) => {
    const filteredOffers = offers && offers.length > 0 && offers.filter(offer => !offer.declined)
    if (offers && offers.length > 0) {
      return (
        filteredOffers.map((offer, i) => {
          let typeOffer = offer.property ? offer.property.category : '[DELETED]'
          let active = offer.property ? true : false
          let userActive = offer.user ? true : false
          return (
            <div key={i} className={classes.offer_container}>
              <div className={classes.offer_header}>
                <strong className="mr-auto text-primary" style={{ fontSize: '1.6rem' }}>Offer { offer._id}</strong>
                    <small className="text-muted">{moment(offer.createdAt).fromNow()}</small>
                  <button type="button" className="ml-2 mb-1 close" onClick={() => removeOffer(offer._id)}>&times;</button>
              </div>
              <div className={classes.offer_sub_container}>
                <div className={classes.offer_two_col}>
                  <p className={classes.offer_text}><b>Offer:</b> £{formatter.format(offer.offerSum)}</p>
                  <p className={classes.offer_text}><b>Original price:</b> £{typeOffer === 'rent' ? formatter.format(active && offer.property.pricePcm) : formatter.format(active && offer.property.salePrice)}</p>
                </div>
                <br />
                {
                  active && offer.property.category !== 'buy' &&
                  <>
                  <p className={classes.offer_text}><b>Move in date:</b> {moment(offer.moveInDate).format("DD/MM/YYYY")}</p>
                  <p className={classes.offer_text}><b>Move out date:</b> {moment(offer.moveOutDate).format("DD/MM/YYYY")}</p>
                  </>
                }
              </div>
              <div className={classes.offer_sub_container}>
                <h4 style={{fontSize: '1.7rem', marginBottom: '1em'}}><b>User</b></h4>
                <p className={classes.offer_text}><b>From:</b> {userActive ? offer.user.title : '[DELETED]'} {offer.user.firstName} {offer.user.lastName}</p>
                <p className={classes.offer_text}><b>Gender:</b> {userActive ? offer.user.gender : '[DELETED]'}</p>
                <p className={classes.offer_text}><b>Current address:</b> {userActive ? offer.user.address : '[DELETED]'}</p>
                <p className={classes.offer_text}><b>Postcode:</b> {userActive ? offer.user.postcode : '[DELETED]'}</p>
                <p className={classes.offer_text}><b>Phone Number:</b> {userActive ? offer.user.phoneNumber : '[DELETED]'}</p>
                <p className={classes.offer_text}><b>Email:</b> {userActive ? offer.user.email : '[DELETED]'}</p>
              </div>
              <hr style={{margin: '2px' }}/>
              <div className={classes.offer_sub_container}>
              <h4 style={{fontSize: '1.7rem', marginBottom: '1em'}}><b>Property</b></h4>
                <p className={classes.offer_text}><b>Property ID:</b> {active ? offer.property._id : '[DELETED]'}</p>
                <p className={classes.offer_text}><b>Property name:</b> {active ? offer.property.propertyName : '[DELETED]'}</p>
                <p className={classes.offer_text}><b>Category:</b> {active ? offer.property.category : '[DELETED]'}</p>
                <p className={classes.offer_text}><b>Location Area:</b> {active ? offer.property.locationArea : '[DELETED]'}</p>
                <p className={classes.offer_text}><b>Bed number:</b> {active ? offer.property.bedNum : '[DELETED]'}</p>
                <p className={classes.offer_text}><b>Bath number:</b> {active ? offer.property.bathNum : '[DELETED]'}</p>
                <p className={classes.offer_text}><b>Pet allowed:</b> {active ? offer.property.pet : '[DELETED]'}</p>
                <p className={classes.offer_text}><b>School distance:</b> within {active ? offer.property.school : '[DELETED]'} miles</p>
                <p className={classes.offer_text}><b>Crime rate:</b> up to {active ? offer.property.crimeRate : '[DELETED]'}%</p>
                <p className={classes.offer_text}><b>Train distance:</b> within {active ? offer.property.train : '[DELETED]'} miles</p>
                <p className={classes.offer_text}><b>Status:</b> {active ? offer.property.status : '[DELETED]'}</p>
                <p className={classes.offer_text}><b>Landlord ID:</b> {active ? offer.property.landlord : '[DELETED]'}</p>
                <div className={classes.accept_decline_container}>
                  <span className={classes.icon_section}>
                    {
                      offer.onHold === true &&
                      <i
                        className={`${ classes.accept_icon } fas fa-check`}
                        data-tip="Accept"
                        onClick={() => toggleAcceptOffer(offer._id, offer.user._id)}
                      ></i>
                    }
                    {
                      offer.onHold === false &&
                      <i
                        className={`${ classes.hold_icon } fas fa-thumbtack`}
                        data-tip="Put on hold"
                        onClick={() => toggleOfferOnHold(offer._id)}
                      ></i>
                    }
                    {
                      !offer.declined &&
                      <i
                        className={`${classes.decline_icon} fas fa-thumbs-down`}
                        data-tip="Decline"
                        onClick={() => toggleDeclineOffer(offer._id, offer.user._id)} 
                      ></i>
                    }
                    <ReactTooltip place="top" type="dark" effect="solid"/>
                  </span>
                </div>
              </div>
            </div>
            )
          }
        )
      )
    } 
    else {
      return (
        <div>
          <p style={{ fontSize: '1.6rem', marginLeft: '0.8em' }}>There are no offers at the moment</p>
        </div>
      )
    }
  }

  let newOffersCount = newOffers && newOffers.filter(offer => offer.declined !== true && offer.accepted !== true)
  
  return (
    <div style={{ marginTop: '5.4em', marginLeft: '2em' }}>
      {alert.message &&
        <div className={`alert ${alert.type}`}>
            {alert.message}
        </div>
      }
      <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
        <div>
          <h3 style={{ fontSize: '2rem', textAlign: 'center' }}>New Offers({ newOffersCount ? newOffersCount.length : 0})</h3>
          <div className={classes.container}>
            {
              isLoading ?
              <Loading />
              :
              errMess ?
              <div className="alert alert-danger" role="alert">{errMess}</div>
              :
              showOffers(newOffers)
            }

          </div>
        </div>
        <div>
          <h3 style={{ fontSize: '2rem', textAlign: 'center' }}>Offers on hold({ offersOnHold ? offersOnHold.length : 0})</h3>
          <div className={classes.container}>
            {
              isLoading ?
              <Loading />
              :
              errMess ?
              <div className="alert alert-danger" role="alert">{errMess}</div>
              :
              showOffers(offersOnHold)
            }
          </div>
        </div>
      </div>
      {/* <button onClick={notify}>Notify !</button> */}
      {/* <ToastContainer /> */}
    </div>
  )
}