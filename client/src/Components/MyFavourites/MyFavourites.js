import React from 'react'
import { makeStyles } from '@material-ui/core'
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import { Link } from 'react-router-dom'
import { Loading } from '../LoadingComponent'
import no_image from '../../assets/images/no_image_available.jpeg'
import { baseUrl } from '../../shared/baseUrl'
import { Alert } from 'reactstrap';
import ReactTooltip from 'react-tooltip';
import underOfferStamp from '../../assets/images/underOfferStamp.png'
import soldIconStatus from '../../assets/images/soldIconStatus.png'
import rentedStatusIcon from '../../assets/images/rentedStatusIcon.png'
import newStampIcon from '../../assets/images/newStampIcon.png'
import deactivatedStampIcon from '../../assets/images/deactivatedStampIcon.png'

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
        display: 'flex',
        flexWrap: 'wrap'
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
        marginBottom: 0,
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
    p: {
        marginBottom: 0,
        width: '100%',
        background: '#34495E',
        color: 'white',
        height: '2.5em',
        padding: '0 1em',
        display: 'flex',
        alignItems: 'center',
        fontSize: '1.6rem',
    },
    root: {
        maxWidth: 285,
        maxHeight: 350,
        marginBottom: 25,
        position: 'relative'
    },
    media: {
        maxHeight: 185,
        minHeight: 180
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
    mini_description: {
        fontSize: '1rem',
        fontWeight: 'bold',
        color: 'black',
        marginTop: '0.6em'
    },
    price: {
        marginRight: '1.4em'
    },
    property_container: {
        margin: '1em'
    },
    heartIcon: {
        color: 'red',
    },
    stamp: {
        position: 'absolute',
        top: '1%',
        zIndex: 2,
        fontSize: '1em',
        transform: 'rotate(-15deg)'
    }
})


const RenderPropertyCard = ({property, deleteFavourite}) => {
    const classes = useStyles()
    const cat = property.category.toLowerCase()

    
    const aSt = 'public'
    let path = property.pictures.length && property.pictures[0].picture.replace('\\', '/').split('/').join().replace(aSt, '').replace(',', '').replace(',', '')
        return (
            <Card onMouseDown={e => e.preventDefault()} className={classes.root}>
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
                <CardActionArea>
                <Link to={`/properties-to-${cat}/${property._id}`}>
                <CardMedia
                    className={classes.media}
                    image={property.pictures.length ? baseUrl + path : no_image}
                    component="img"
                    alt={property.propertyName}
                    height="100"
                    title={property.propertyName}
                />
                </Link>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                    <span className={classes.title_card}>{property.propertyName} 
                        <span onClick={() => deleteFavourite(property._id)} className={classes.heart_div} data-tip="Remove from favourites ❤">
                            <i className={`${"ri-heart-fill favorite"} ${classes.heartIcon}`} ></i>
                        </span>
                    </span>
                    </Typography>
                    <Link to={`/properties-to-${cat}/${property._id}`}>
                    {
                        cat === 'buy' ?
                        <Typography variant="body2" color="textSecondary" component="p">
                        <b className={classes.price}>{`£${property.salePrice}`}</b> 
                        <p className={classes.mini_description}>{`${property.bedNum} bedroom house ${cat === 'buy' ? 'for sale' : 'to rent'}`}</p>
                        </Typography>
                        :
                        <Typography variant="body2" color="textSecondary" component="p">
                        <b className={classes.pw}>{`£${property.pricePw} pw`}</b> {`£${property.pricePcm} pcm`} 
                        <p className={classes.mini_description}>{`${property.bedNum} bedroom house to rent`}</p>
                        </Typography>
                    }
                    </Link>
                </CardContent>
                </CardActionArea>
                <ReactTooltip place="top" type="dark" effect="solid"/>
            </Card>
        )
}

function MyFavourites(props) {
    const classes = useStyles()

    if (props.favLoadErr.isLoading) {
        return (
            <div>
                <div className={classes.container}>
                    <Loading />
                </div>
            </div>
        )
    }
    else if (props.favLoadErr.errMess) {
        return (
            <div>
                <div className={classes.container}>
                    <Alert color="danger">
                        {props.favourites.errMess}
                    </Alert>
                </div>
            </div>
        )
    }
    else if (props.favourites.favourites) {
        if (props.favourites.favourites.properties.length > 0) {

            const favourites = props.favourites.favourites.properties.map(property => {
                return (
                    <div key={property._id} className={classes.property_container}>
                        <RenderPropertyCard key={property._id} property={property} deleteFavourite={props.deleteFavourite} />
                    </div>
                )
            })
    
            return (
                <div className={classes.container}>
                    <div className={classes.link_container}>
                        <p className={`${classes.link} ${classes.current}`}>Summary</p>
                    </div>
                    <div className={classes.content_page}>
                        <h1 className={classes.h1}>My Favourites</h1>
                        <hr />
                        {props.alert.message &&
                            <div className={`alert ${props.alert.type}`}>
                                {props.alert.message}
                            </div>
                        }
                        <div className={classes.content_details}>
                            {favourites}
                        </div>
                    </div>
                </div>
            )
        } else {
            return (
                <div className={classes.container}>
                    <div className={classes.link_container}>
                        <p className={`${classes.link} ${classes.current}`}>Summary</p>
                    </div>
                    <div className={classes.content_page}>
                        <h1 className={classes.h1}>My Favourites</h1>
                        <hr />
                        {props.alert.message &&
                            <div className={`alert ${props.alert.type}`}>
                                {props.alert.message}
                            </div>
                        }
                        <div className={classes.content_details}>
                            <p className={classes.p}>You have no favourites</p>
                        </div>
                    </div>
                </div>
            )
        }
    }
    else {
        return (
            <div className={classes.container}>
                <div className={classes.link_container}>
                    <p className={`${classes.link} ${classes.current}`}>Summary</p>
                </div>
                <div className={classes.content_page}>
                    <h1 className={classes.h1}>My Favourites</h1>
                    <hr />
                    {props.alert.message &&
                        <div className={`alert ${props.alert.type}`}>
                            {props.alert.message}
                        </div>
                    }
                    <div className={classes.content_details}>
                        <p className={classes.p}>You have no favourites</p>
                    </div>
                </div>
            </div>
        )
    }


}

export default MyFavourites