import React, { useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, makeStyles } from '@material-ui/core' 
import { deleteUser, getUserDetails } from '../../redux/ActionCreators'
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import { Link } from 'react-router-dom'
import moment from 'moment'
import { Loading } from '../LoadingComponent'
import { baseUrl } from '../../shared/baseUrl'
import { Table } from 'react-bootstrap'
import userIcon from '../../assets/images/contact-book.png'
import no_image from '../../assets/images/no_image_available.jpeg'
import editIcon from '../../assets/images/edit2.png'
import ReactTooltip from 'react-tooltip';
import { history } from '../../redux/helpers/history';

const useStyles = makeStyles({
    user_details_container: {
        padding: '4em',
        background: '#FBF5E0',
        width: '100%'
    },
    user_sub_container: {
        background: '#F1F4F6',
        padding: '3em',
        boxShadow: '0px 0 6px 0px #707070',
    },
    sub_container: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    title_section_user: {
        display: 'flex'
    },
    title_user_container: {
        fontSize: '3rem',
        marginLeft: '0.6em',
        marginBottom: 0
    },
    text_user_detail: {
        fontSize: '1.8rem',
        marginTop: '1em',
        marginLeft: '1em',
        letterSpacing: '2px',
    },
    date_join_section: {
        display: 'flex',
        justifyContent: 'flex-end'
    },
    user_join_date: {
        fontSize: '1.4rem',
        marginTop: '2em'
    },
    favourites_section_title: {
        display: 'flex',
        alignItems: 'center',
        marginTop: '2.5em',
        padding: '1.5em'
    },
    favourite_title: {
        fontSize: '2.1rem',
        fontWeight: 'bold',
        margin: 0
    },
    no_fav_text: {
        fontSize: '1.4rem',
        marginLeft: '1.7em'
    },
    root: {
        maxWidth: 165,
        maxHeight: 160,
        margin: '1em'
    },
    media: {
        maxHeight: 90,
        minHeight: 80
    },
    favourites_titles: {
        width: '100%',
        display: 'flex',
        flexWrap: 'wrap',
    },
    title_card: {
        fontSize: '1.2rem',
    },
    view: {
        fontSize: '1.2rem',
        color: '#808B96',
        marginBottom: 0,
        '&:hover': {
            textDecoration: 'underline'
        }
    },
    edit_icon: {
        width: '3em',
        height: '3em',
        '&:hover': {
            width: '3.3em',
            height: '3.3em',
            cursor: 'pointer'
        }
    },
    btn_delete: {
        fontSize: '1.3rem',
        cursor: 'pointer',
        margin: '2.3em 1em 2em',
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

function ViewUser({ match }) {
    const [open, setOpen] = React.useState(false);
    const usersList = useSelector(state => state.users)
    const {isLoading, user, errMess} = usersList
    const classes = useStyles()
    const dispatch = useDispatch()
    var formatter = new Intl.NumberFormat('en')

    const userId = match.params.id
    const favouritesList = useSelector(state => state.favourites)

    const { favourites } = favouritesList
    let favouritesUser = favourites.filter(fav => fav.user._id === userId)[0]

    const contractsList = useSelector(state => state.contracts)
    const { contracts } = contractsList
   
    const offersList = useSelector(state => state.offers)
    const { offers } = offersList

    //filtering contracts for the user viewed
    const filteredContracts = contracts.filter(contract => contract.user._id === userId)

    //map all the contracts and display them
    const displayContracts = filteredContracts.map(contract => {
        const aSt = 'public'
        let path = contract.document.length && contract.document.replace('\\', '/').split('/').join().replace(aSt, '').replace(',', '').replace(',', '')
        const activeProperty = contract.property ? true : false
        return (
            <tr key={contract._id}>
                <td>{ activeProperty ? contract.property._id : '[DELETED]' }</td>
                <td>{ activeProperty ? contract.property.propertyName : '[DELETED]' }</td>
                <td>{ moment(contract.start).format("DD/MM/YYYY") }</td>
                <td>{ moment(contract.end).format("DD/MM/YYYY") }</td>
                <td><a className={classes.view} target="_blank" rel="noreferrer" href={baseUrl + path}>View contract</a></td>
            </tr>
        )
    })

    const fileteredOffers = offers.filter(offer => offer.user._id === userId)

    const displayOffers = fileteredOffers.map(offer => {
        const activeProperty = offer.property ? true : false
        return (
            <tr key={offer._id} style={{background: offer.accepted ? '#D4EFDF' : offer.onHold ? '#FCF3CF' : offer.declined ? '#E6B0AA' : ''}}>
                <td>{ offer._id }</td>
                <td>{ activeProperty ? offer.property.propertyName : '[DELETED]'}</td>
                <td>{ activeProperty ? offer.property.category : '[DELETED]' }</td>
                <td>{ offer.offerSum }</td>
                <td>£{activeProperty && offer.property.category !== 'buy' ? formatter.format(activeProperty ? offer.property.pricePcm : '[DELETED]') + ` pcm` : formatter.format(activeProperty ? offer.property.salePrice : '[DELETED]')}</td>
                <td>{ offer.accepted ? 'accepted' : offer.onHold ? 'on hold' : offer.declined ? 'declined' : 'none' }</td>
            </tr>
        )
    })

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    const deleteAccount = async (id) => {
        await dispatch(deleteUser(id))
        history.push('/admin/dashboard/users')
    }

    useEffect(() => {
        
        if (user._id !== userId) {
            dispatch(getUserDetails(userId))
        } 
        // eslint-disable-next-line
    }, [user])

    const handleUserEdit = async (userId) => {
        await dispatch(getUserDetails(userId))
        history.push(`/admin/dashboard/users/edit_user/${userId}`)
    }

    if (favouritesUser) {
        const displayFavourites = favouritesUser.properties.map(fav => {
                                
            const aSt = 'public'
            let path = fav.pictures.length && fav.pictures[0].picture.replace('\\', '/').split('/').join().replace(aSt, '').replace(',', '').replace(',', '')
            
            return (
                <Link to={`/properties-to-${fav.category}/${fav._id}`}>
                <Card key={fav._id} onMouseDown={e => e.preventDefault()} className={classes.root}>
                    <CardActionArea>
                    <CardMedia
                        className={classes.media}
                        image={fav.pictures.length ? baseUrl + path : no_image}
                        component="img"
                        alt={fav.propertyName}
                        height="100"
                        title={fav.propertyName}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                        <span className={classes.title_card}>
                            {fav.propertyName} 
                        </span>
                        </Typography>
                    </CardContent>
                    </CardActionArea>
                    </Card>
                </Link>
            )
        })
        
        return (
            <div className={classes.user_details_container}>
                <Breadcrumb style={{width: '20em'}}>
                    <BreadcrumbItem><Link to="/admin/dashboard">Dashboard</Link></BreadcrumbItem>
                    <BreadcrumbItem><Link to="/admin/dashboard/users">Users</Link></BreadcrumbItem>
                    <BreadcrumbItem active>User Details</BreadcrumbItem>
                </Breadcrumb>
                <div className={classes.user_sub_container}>
                    <div className={classes.sub_container}>
                        <div className={classes.title_section_user}>
                            <span>
                                <img src={userIcon} alt="user icon page" />
                            </span>
                            <h3 className={classes.title_user_container}>User Details</h3>
                        </div>
                        <img onClick={ () => handleUserEdit(user._id) } className={classes.edit_icon} src={editIcon} alt="edit icon" data-tip="Edit User" />
                        <ReactTooltip place="top" type="dark" effect="solid"/>
                    </div>
                    <hr style={{ marginBottom: '5em' }} />
                    {
                        isLoading ?
                        <Loading />
                        :
                        errMess ?
                        <div class="alert alert-danger" role="alert">
                            <h4>{errMess}</h4>
                        </div>
                                
                        :
                        <>
                        <p className={classes.text_user_detail}><b>User ID:</b> {user._id}</p>
                        <p className={classes.text_user_detail}><b>Title:</b> {user.title}</p>
                        <p className={classes.text_user_detail}><b>Username:</b> {user.username}</p>
                        <p className={classes.text_user_detail}><b>Email:</b> {user.email}</p>
                        <p className={classes.text_user_detail}><b>First Name:</b> {user.firstName}</p>
                        <p className={classes.text_user_detail}><b>Last Name:</b> {user.lastName}</p>
                        <p className={classes.text_user_detail}><b>Address:</b> {user.address}</p>
                        <p className={classes.text_user_detail}><b>Post code:</b> {user.postcode}</p>
                        <p className={classes.text_user_detail}><b>Country:</b> {user.country}</p>
                        <p className={classes.text_user_detail}><b>City:</b> {user.city}</p>
                        <p className={classes.text_user_detail}><b>Phone Number:</b> {user.phoneNumber}</p>
                        <p className={classes.text_user_detail}><b>Gender:</b> {user.gender}</p>
                        <p className={classes.text_user_detail}><b>Looking for:</b> {user.lookingFor}</p>
                        <div className={classes.favourites_section_title}>

                        <i style={{fontSize: '1.9rem', marginRight: '0.6em'}} className="fas fa-heart"></i>
                        <h3 className={classes.favourite_title}>User's Favourites</h3>
                        </div>
                        <div className={classes.favourites_titles}>
                        { displayFavourites }   
                        </div>
                        <div className={classes.favourites_section_title}>
                            <i style={{fontSize: '1.9rem', marginRight: '0.6em'}} className="fas fa-file-contract"></i>
                            <h3 className={classes.favourite_title}>User's Contracts</h3>
                        </div>
                        {
                            displayContracts.length > 0 ?
                                        
                            <Table striped bordered hover style={{width: '64em', marginTop: '1.2em'}}>
                                <thead>
                                    <tr>
                                        <th>Property ID</th>
                                        <th>Property Name</th>
                                        <th>Start</th>
                                        <th>End</th>
                                        <th>Document</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {displayContracts}
                                </tbody>
                            </Table>
                            :
                            <p className={classes.no_fav_text}>This user has no contracts to display</p>
                        }
                        <div className={classes.favourites_section_title}>
                            <i style={{fontSize: '1.9rem', marginRight: '0.6em'}} className="fas fa-th-list"></i>
                            <h3 className={classes.favourite_title}>User's Offers</h3>
                        </div>
                        {//offers display
                        displayOffers.length > 0 ?
                        <div>
                            <Table striped bordered hover style={{width: '64em',  marginTop: '1.2em'}}>
                                <thead>
                                    <tr>
                                        <th>Offer ID</th>
                                        <th>Property Name</th>
                                        <th>Category</th>
                                        <th>Amount</th>
                                        <th>Original</th>
                                        <th>State</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {displayOffers}
                                </tbody>
                            </Table>
                        </div>
                        :
                        <p className={classes.no_fav_text}>This user has no offers to display</p>
                    
                        }
                        <div className={classes.date_join_section}>
                            <p className={classes.user_join_date}>User joined on {moment(user.createdAt).format("DD/MM/YYYY")}</p>
                        </div>
                        </>
                                
                    }
                    <button onMouseDown={e => e.preventDefault()} className={classes.btn_delete} onClick={handleClickOpen}>Delete this account</button>
                    <Dialog
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">{"Important!"}</DialogTitle>
                        <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Are you sure you want to delete this account?
                        </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <button className={`${classes.btn_decision_no} ${classes.btn}`} onClick={handleClose}>No</button>
                            <button className={`${classes.btn_decision_yes} ${classes.btn}`} onClick={() =>  deleteAccount(user._id)} >Yes</button>
                        </DialogActions>
                    </Dialog>
                </div>
            </div>
        )
    } 
    
    return (
        <div className={classes.user_details_container}>
            <Breadcrumb style={{width: '20em'}}>
                <BreadcrumbItem><Link to="/admin/dashboard">Dashboard</Link></BreadcrumbItem>
                <BreadcrumbItem><Link to="/admin/dashboard/users">Users</Link></BreadcrumbItem>
                <BreadcrumbItem active>User Details</BreadcrumbItem>
            </Breadcrumb>
            <div className={classes.user_sub_container}>
            <div className={classes.sub_container}>
                <div className={classes.title_section_user}>
                        <span>
                            <img src={userIcon} alt="user icon page" />
                        </span>
                        <h3 className={classes.title_user_container}>User Details</h3>
                    </div>
                    <img onClick={ () => handleUserEdit(user._id) } className={classes.edit_icon} src={editIcon} alt="edit icon" data-tip="Edit User" />
                    <ReactTooltip place="top" type="dark" effect="solid"/>
                </div>
                <hr style={{ marginBottom: '5em' }} />
                {
                    isLoading ?
                    <Loading />
                    :
                    errMess ?
                    <div class="alert alert-danger" role="alert">
                        <h4>{errMess}</h4>
                    </div>
                            
                    :
                    <>
                    <p className={classes.text_user_detail}><b>User ID:</b> {user._id}</p>
                    <p className={classes.text_user_detail}><b>Title:</b> {user.title}</p>
                    <p className={classes.text_user_detail}><b>Username:</b> {user.username}</p>
                    <p className={classes.text_user_detail}><b>Email:</b> {user.email}</p>
                    <p className={classes.text_user_detail}><b>First Name:</b> {user.firstName}</p>
                    <p className={classes.text_user_detail}><b>Last Name:</b> {user.lastName}</p>
                    <p className={classes.text_user_detail}><b>Address:</b> {user.address}</p>
                    <p className={classes.text_user_detail}><b>Post code:</b> {user.postcode}</p>
                    <p className={classes.text_user_detail}><b>Country:</b> {user.country}</p>
                    <p className={classes.text_user_detail}><b>City:</b> {user.city}</p>
                    <p className={classes.text_user_detail}><b>Phone Number:</b> {user.phoneNumber}</p>
                    <p className={classes.text_user_detail}><b>Gender:</b> {user.gender}</p>
                    <p className={classes.text_user_detail}><b>Looking for:</b> {user.lookingFor}</p>
                    
                    <div className={classes.favourites_section_title}>
                        <i style={{fontSize: '1.9rem', marginRight: '0.6em'}} className="fas fa-heart"></i>
                        <h3 className={classes.favourite_title}>User's Favourites</h3>
                    </div>
                    <p className={classes.no_fav_text}>This user has no favourites</p>
                    <div className={classes.favourites_section_title}>
                        <i style={{fontSize: '1.9rem', marginRight: '0.6em'}} className="fas fa-file-contract"></i>
                        <h3 className={classes.favourite_title}>User's Contracts</h3>
                    </div>
                    {
                        displayContracts.length > 0 ?
                                    
                        <Table striped bordered hover style={{width: '64em',  marginTop: '1.2em'}}>
                            <thead>
                                <tr>
                                    <th>Property ID</th>
                                    <th>Property Name</th>
                                    <th>Start</th>
                                    <th>End</th>
                                    <th>Document</th>
                                </tr>
                            </thead>
                            <tbody>
                            {displayContracts}
                            </tbody>
                        </Table>
                        :
                        <p className={classes.no_fav_text}>This user has no contracts to display</p>
                    }
                    <div className={classes.favourites_section_title}>
                        <i style={{fontSize: '1.9rem', marginRight: '0.6em'}} className="fas fa-th-list"></i>
                        <h3 className={classes.favourite_title}>User's Offers</h3>
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
                                    </tr>
                                </thead>
                                <tbody>
                                {displayOffers}
                                </tbody>
                            </Table>
                        </div>
                        :
                        <p className={classes.no_fav_text}>This user has no offers to display</p>
                    
                    }
                    <button onMouseDown={e => e.preventDefault()} className={classes.btn_delete} onClick={handleClickOpen}>Delete this account</button>
                    <Dialog
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">{"Important!"}</DialogTitle>
                        <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Are you sure you want to delete this account?
                        </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <button className={`${classes.btn_decision_no} ${classes.btn}`} onClick={handleClose}>No</button>
                            <button className={`${classes.btn_decision_yes} ${classes.btn}`} onClick={() =>  deleteAccount(user._id)} >Yes</button>
                        </DialogActions>
                    </Dialog>
                    <div className={classes.date_join_section}>
                        <p className={classes.user_join_date}>User joined on {moment(user.createdAt).format("DD/MM/YYYY")}</p>
                    </div>
                    </>
                            
                }
            </div>
        </div>
    )
}

export default ViewUser