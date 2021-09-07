import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom'
import { history } from '../../redux/helpers/history'
import { baseUrl } from '../../shared/baseUrl'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Loading } from '../LoadingComponent'
import { fetchRentProperties } from '../../redux/ActionCreators';
import { makeStyles } from '@material-ui/core'
import ReactTooltip from 'react-tooltip';
import CountProperties from '../CountProperties'
import SearchBar from './SearchBar'
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import no_image from '../../assets/images/no_image_available.jpeg'
import PaginationPage from '../Pagination/PaginationPage'
import underOfferStamp from '../../assets/images/underOfferStamp.png'
import soldIconStatus from '../../assets/images/soldIconStatus.png'
import rentedStatusIcon from '../../assets/images/rentedStatusIcon.png'
import newStampIcon from '../../assets/images/newStampIcon.png'
import deactivatedStampIcon from '../../assets/images/deactivatedStampIcon.png'

const useStyles = makeStyles({
    container: {
        marginTop: '2.4em',
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    root: {
        maxWidth: 285,
        maxHeight: 350,
        marginBottom: 25,
        
    },
    media: {
        maxHeight: 185,
        height: 180,
        position: 'relative'
    },
    property_container: {
        margin: '1em'
    },
    mini_description: {
        fontSize: '1rem',
        fontWeight: 'bold',
        color: 'black',
        marginTop: '0.6em',
        marginLeft: '0.2em'
    },
    pw: {
        marginRight: '1.4em',
        marginLeft: '0.2em'
    },
    heart: {
        fontSize: '2rem',
    },
    title_card: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    heart_div: {
        display: 'flex',
        justifyContent: 'center',
        fontSize: '1.8rem'
    },
    heartIcon: {
        color: 'red',
    },
    badge_section: {
        display: 'flex',
        flexWrap: 'wrap'
    },
    badge: {
        fontSize: '0.85rem',
        marginBottom: '0.5em',
        letterSpacing: '1px',
        marginLeft: '0.5em'
    },
    stamp: {
        position: 'absolute',
        top: '1%',
        zIndex: 0,
        fontSize: '1em',
        transform: 'rotate(-15deg)'
    }
})

const RenderPropertyCard = ({property, postFavourite, favourite, deleteFavourite}) => {
    const classes = useStyles()

    const loggedIn = useSelector(state => state.auth)

    const favouriteIcon = (propertyId) => {
        if (favourite && favourite.filter(fav => fav._id === propertyId).length > 0) {
            return <i className={`${"ri-heart-fill favorite"} ${classes.heartIcon}`} onClick={() => deleteFavourite(property._id)} data-tip="Remove from favourites ❤"></i>
        } else  {
            return <i className="ri-heart-line favorite" onClick={() => { postFavourite(property._id); redirectNotUser()}} data-tip="Add to favourites ❤"></i>
        }
    }

    const redirectNotUser = () => {
        if(!loggedIn.isAuthenticated) {
            history.push('/users/login')
            console.log('hey')
        }
    }

    const aSt = 'public'
    let path = property.pictures.length && property.pictures[0].picture.replace('\\', '/').split('/').join().replace(aSt, '').replace(',', '').replace(',', '')

    //format price to currency
    var formatter = new Intl.NumberFormat('en');
    return (
        <Card onMouseDown={e => e.preventDefault()} className={classes.root}>
            <CardActionArea>
            <Link to={`/properties-to-rent/${property._id}`}>
            <CardMedia
                className={classes.media}
                image={property.pictures.length ? baseUrl + path : no_image}
                component="img"
                alt={property.propertyName}
                height="100"
                title={property.propertyName}
                />
                {
                    property.status === 'underoffer' ?
                    <img className={classes.stamp} src={underOfferStamp} alt="under offer stamp" />
                    :
                    property.status === 'sold' ?
                    <img className={classes.stamp} src={soldIconStatus} alt="sold stamp" />
                    :
                    property.status === 'rented' ?
                    <img className={classes.stamp} src={rentedStatusIcon} alt="rented stamp" />
                    :
                    property.status === 'new' ?
                    <img className={classes.stamp} src={newStampIcon} alt="new stamp" />
                    :
                    property.status === 'deactivated' ?
                    <img className={classes.stamp} src={deactivatedStampIcon} alt="deactivated stamp" />
                    :
                    <></>
                }
            </Link>
            <CardContent style={{height: '18em'}}>
                <Typography gutterBottom variant="h5" component="h2">
                <span className={classes.title_card}>{property.propertyName} 
                    <span className={classes.heart_div} >
                        {favouriteIcon(property._id)}
                    </span>
                </span>
                </Typography>
                <Link to={`/properties-to-rent/${property._id}`}>
                <Typography variant="body2" color="textSecondary" component="p">
                <b className={classes.pw}>{`£${formatter.format(property.pricePw)} pw`}</b> {`£${formatter.format(property.pricePcm)} pcm`} 
                <p className={classes.mini_description}>{`${ property.bedNum } bedroom house to rent`}</p>
                </Typography>
                </Link>
                <div className={classes.badge_section}>
                    <span className={`${classes.badge} badge badge-warning`}>{property.pet === 'yes' && 'pet'}</span>
                    <span className={`${classes.badge} badge badge-primary`}>{property.school <= 15 && 'school'}</span>
                    <span className={`${classes.badge} badge badge-info`}>{property.train <= 15 && 'trains'}</span>
                    <span className={`${classes.badge} badge badge-dark`}>{property.crimeRate <= 25 && 'low crime'}</span>
                </div>
            </CardContent>
            </CardActionArea>
            <ReactTooltip place="top" type="dark" effect="solid"/>
        </Card>
    )
}

function PropertiesToRent(props) {
    const classes = useStyles()
    // const propertyCount = props.properties.count

    let propertiesList = useSelector(state => state.rentProperties)
    const { hasNextPage, hasNextNextPage, count } = propertiesList

    const [page, setPage] = useState(1)
    const dispatch = useDispatch()

    useEffect(() => {
        if (props.location.state) {

        } else {
            dispatch(fetchRentProperties())
        }
    }, [])

    const propertiesOnDisplay = props.properties.properties.map(property => {
        if (props.favourites.properties) {
            return (
                <div key={property._id} className={classes.property_container}>
                    <RenderPropertyCard 
                        property={property}
                        postFavourite={props.postFavourite}
                        deleteFavourite={props.deleteFavourite}
                        favourite={props.favourites.properties.filter(fav => fav._id === property._id)} 
                    />
                </div>
            )
        }
        else {
            return (
                <div key={property._id} className={classes.property_container}>
                    <RenderPropertyCard 
                        property={property}
                        favourite={false}
                        postFavourite={props.postFavourite}
                        deleteFavourite={props.deleteFavourite}
                    />
                </div>
            )
        }
    })

    if (props.properties.isLoading) {
        return (
            <div>
                <SearchBar criteria={null} page={page} setPage={setPage} />
                <div className={classes.container}>
                    <Loading />
                </div>
            </div>
        )
    }
    else if (props.properties.errMess) {
        return (
            <div >
                <SearchBar criteria={null} page={page} setPage={setPage} />
                <CountProperties category={"rent"} propertiesCount={count}/>
                <div className={classes.container}>
                    <h4>{props.properties.errMess}</h4>
                </div>
            </div>
        )
    }
    else {
        if (count === 0) {
            return (
                <div>
                    <SearchBar criteria={null} page={page} setPage={setPage} />
                    <CountProperties category={"rent"} propertiesCount={count} />
                    <div className={classes.container}>
                        <p style={{fontSize: '1.4rem', margin: '1.3em'}}>There are no properties to rent found. Retry with another search</p>
                    </div>
                </div>
            )
        }
        else if (props.properties) {
            return (
                <div>
                    <SearchBar criteria={props.location.state ? props.location.state.criteria : null} page={page} setPage={setPage} />
                    <CountProperties category={"rent"} propertiesCount={count} />
                    <div className={classes.container}>
                        {propertiesOnDisplay}
                    </div>
                    <div className="pagination_section">
                        <PaginationPage page={page} setPage={setPage} hasNextPage={hasNextPage} hasNextNextPage={hasNextNextPage}/>
                    </div>
                </div>
            )
        }
    }
}

export default withRouter(PropertiesToRent)