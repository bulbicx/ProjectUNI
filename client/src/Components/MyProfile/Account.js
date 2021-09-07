import React from 'react'
import { makeStyles } from '@material-ui/core'
import moment from 'moment'
import { Link } from 'react-router-dom'
import { Loading } from '../LoadingComponent'
import { useSelector } from 'react-redux'
import { Table } from 'react-bootstrap'

const useStyles = makeStyles({
    container: {
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
    h1: {
        fontSize: '1.6rem',
        color: '#34495E',
        '@media (max-width: 1500px)': { 
            fontSize: '1.45rem'
        }
    },
    section_page: {
        display: 'flex',
        alignItems: 'center',
        marginTop: '2.5em',
        padding: '1.5em'
    },
    section_title: {
        fontSize: '2.1rem',
        fontWeight: 'bold',
        margin: 0
    },
    no_text: {
        fontSize: '1.4rem',
        marginLeft: '1.7em'
    }
})

function Account({loggedUser, userIsLoading, userErrMess}) {
    const classes = useStyles()
    var formatter = new Intl.NumberFormat('en')
    // const user = loggedUser.firstName
    const offersList = useSelector(state => state.offers)
    const { offers } = offersList
    
    const reviewsList = useSelector(state => state.reviews)
    const { reviews } = reviewsList

    const viewingsList = useSelector(state => state.viewings)
    const { viewings } = viewingsList

    const filteredOffers = offers && offers.filter(offer => offer.user._id === loggedUser._id)
    const displayOffers = filteredOffers && filteredOffers.map(offer => {
        const propertyActive = offer.property ? true : false
        return (
            <tr key={offer._id} style={{background: offer.accepted ? '#D4EFDF' : offer.onHold ? '#FCF3CF' : offer.declined ? '#E6B0AA' : ''}}>
                <td>{ offer._id }</td>
                <td>{ propertyActive ? offer.property.propertyName : '[DELETED]' }</td>
                <td>{ propertyActive ? offer.property.category : '[DELETED]'  }</td>
                <td>£{ formatter.format(offer.offerSum) }</td>
                <td>£{propertyActive && offer.property.category !== 'buy' ? formatter.format(propertyActive ? offer.property.pricePcm : '[DELETED]') + ` pcm` : formatter.format(propertyActive ? offer.property.salePrice : '[DELETED]')}</td>
                <td>{offer.accepted ? 'accepted' : offer.onHold ? 'on hold' : offer.declined ? 'declined' : 'none'}</td>
                <td>{ moment(offer.createdAt).fromNow() }</td>
            </tr>
        )
    })

    const todayDate = new Date()
    const filteredViewings = viewings && viewings.filter(viewing => viewing.user._id === loggedUser._id && new Date(viewing.date) >= todayDate)
    const displayViewingsPresent = filteredViewings && filteredViewings.map(viewing => {
        const propertyActive = viewing.property ? true : false
        return (
            <tr key={viewing._id}>
                <td>{ propertyActive ? viewing.property.propertyName : '[DELETED]' }</td>
                <td>{ propertyActive ? viewing.property.category : '[DELETED]' }</td>
                <td>{ moment(viewing.date).format("DD/MM/YYYY") }</td>
                <td>{ viewing.time }</td>
            </tr>
        )
    })
    
    const viewingsPast = viewings && viewings.filter(viewing => viewing.user._id === loggedUser._id && new Date(viewing.date) < todayDate)
    const displayViewingsPast = viewingsPast && viewingsPast.map(viewing => {
        const propertyActive = viewing.property ? true : false
        return (
            <tr key={viewing._id}>
                <td>{ propertyActive ? viewing.property.propertyName : '[DELETED]'  }</td>
                <td>{ propertyActive ? viewing.property.category : '[DELETED]' }</td>
                <td>{ moment(viewing.date).format("DD/MM/YYYY") }</td>
                <td>{ viewing.time }</td>
            </tr>
        )
    })

    
    const filteredReviews = reviews && reviews.filter(review => review.author._id === loggedUser._id)

    String.prototype.capitalize = function() {
        return this.charAt(0).toUpperCase() + this.substring(1).toLocaleLowerCase()
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
                    <Link className={`${classes.link} ${classes.current}`} to="/users/account">Overview</Link>
                    <Link className={classes.link} to="/users/account/my-profile">My profile</Link>
                </div>
                <div className={classes.content_page}>
                    <h1 className={classes.h1}>Welcome to Virtual Home, {loggedUser.firstName.capitalize()}</h1>
                    <hr />
                    <div>
                        <div className={classes.section_page}>
                            <i style={{fontSize: '1.9rem', marginRight: '0.6em'}} className="fas fa-th-list"></i>
                            <h3 className={classes.section_title}>Your Offers <small>({ filteredOffers.length > 0 ? filteredOffers.length : 0})</small></h3>
                        </div>
                        {//offers display
                            displayOffers.length > 0 ?
                            <div>
                                <Table striped bordered hover style={{width: '64em',  marginTop: '1.2em'}}>
                                    <thead>
                                        <tr style={{background: '#F8F9F9'}}>
                                            <th>Offer ID</th>
                                            <th>Property Name</th>
                                            <th>Category</th>
                                            <th>Amount</th>
                                            <th>Original</th>
                                            <th>State</th>
                                            <th>Made</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {displayOffers}
                                    </tbody>
                                </Table>
                            </div>
                            :
                            <p className={classes.no_text}>You have not made any offer yet</p>
                        }
                        <div className={classes.section_page}>
                            <i style={{fontSize: '1.9rem', marginRight: '0.6em'}} className="fas fa-star"></i>
                            <h3 className={classes.section_title}>Your Reviews</h3>
                        </div>
                        <p style={{marginLeft: '1.7em'}}>You have made <b>{ filteredReviews && filteredReviews.length }</b> review/s at the moment</p>
                        <div className={classes.section_page}>
                            <i style={{fontSize: '1.9rem', marginRight: '0.6em'}} className="far fa-calendar-check"></i>
                            <h3 className={classes.section_title}>Your Viewings</h3>
                        </div>
                        {displayViewingsPast.length > 0 && <p style={{ fontSize: '1.4rem' }}>Present ({displayViewingsPresent ? displayViewingsPresent.length : 0 })</p>}
                        {//viewings present display
                            displayViewingsPresent.length > 0 ?
                            <div>
                                <Table striped bordered hover style={{width: '64em',  marginTop: '1.2em'}}>
                                    <thead>
                                        <tr style={{background: '#F8F9F9'}}>
                                            <th>Property Name</th>
                                            <th>Category</th>
                                            <th>Date</th>
                                            <th>Time</th>
                                        </tr>
                                        </thead>
                                    <tbody>
                                    {displayViewingsPresent}
                                    </tbody>
                                </Table>
                            </div>
                            :
                            <p className={classes.no_text}>You do not have any viewing booked</p>
                        }
                        {displayViewingsPast.length > 0 && <p style={{ fontSize: '1.4rem' }}>Past ({displayViewingsPast ? displayViewingsPast.length : 0})</p>}
                        {//viewings past display
                            displayViewingsPast.length > 0 &&
                            <div>
                                <Table striped bordered hover style={{width: '64em',  marginTop: '1.2em'}}>
                                    <thead>
                                        <tr style={{background: '#F8F9F9'}}>
                                            <th>Property Name</th>
                                            <th>Category</th>
                                            <th>Date</th>
                                            <th>Time</th>
                                        </tr>
                                        </thead>
                                    <tbody>
                                    {displayViewingsPast}
                                    </tbody>
                                </Table>
                            </div>
                        }
                    </div>
                </div>
            </div>
        )
    }

}

export default Account