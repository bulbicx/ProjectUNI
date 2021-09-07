import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import no_photo from '../../assets/images/no_image_available.jpeg'
import { Loading } from '../LoadingComponent';
import { Link } from 'react-router-dom'
import { baseUrl } from '../../shared/baseUrl'
import underOfferStamp from '../../assets/images/underOfferStamp.png'
import soldIconStatus from '../../assets/images/soldIconStatus.png'
import rentedStatusIcon from '../../assets/images/rentedStatusIcon.png'
import newStampIcon from '../../assets/images/newStampIcon.png'
import deactivatedStampIcon from '../../assets/images/deactivatedStampIcon.png'

const useStyles = makeStyles({
    root: {
        maxWidth: 285,
        maxHeight: 350,
        marginBottom: 25,
        position: 'relative'
    },
    media: {
        maxHeight: 185,
        height: 185
    },
    featured_properties: {
        marginTop: 30,
        marginBottom: 30,
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    h2: {
        fontSize: '2rem',
        marginTop: '0.5em',
        marginLeft: '1.5em',
        '@media (max-width: 600px)': { 
            textAlign: 'center'
        }
    },
    badge_section: {
        display: 'flex',
        flexWrap: 'wrap',
        marginTop: '1em'
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
        zIndex: 2,
        fontSize: '1em',
        transform: 'rotate(-15deg)'
    }
});

var formatter = new Intl.NumberFormat('en');

function RenderCard({property, isLoading, errMess, propertyCat}) {
    const classes = useStyles()
    const category = propertyCat === 'rent' ? 'rent' : 'sale'
    const priceToShow = property.category === 'buy' ? property.salePrice : property.pricePw

    const aSt = 'public'
    let path = property.pictures.length && property.pictures[0].picture.replace('\\', '/').split('/').join().replace(aSt, '').replace(',', '').replace(',', '')

    return (
        <Link style={{ textDecoration: 'none' }} to={`/properties-to-${ property.category }/${ property._id }`}>
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
            <CardMedia
                className={classes.media}
                image={property.pictures.length ? baseUrl + path : no_photo}
                component="img"
                alt={property.propertyName}
                height="100"
                title={property.propertyName}
            />
            <CardContent style={{height: '16em'}}>
                <Typography gutterBottom variant="h5" component="h2">
                {property.propertyName}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                {property.bedNum} bedroom house for {category} starting at £{formatter.format(priceToShow)} {property.category === 'rent' && 'pw'}
                </Typography>
                 <div className={classes.badge_section}>
                    <span className={`${classes.badge} badge badge-warning`}>{property.pet === 'yes' && 'pet'}</span>
                    <span className={`${classes.badge} badge badge-primary`}>{property.school <= 15 && 'school'}</span>
                    <span className={`${classes.badge} badge badge-info`}>{property.train <= 15 && 'trains'}</span>
                    <span className={`${classes.badge} badge badge-dark`}>{property.crimeRate <= 25 && 'low crime'}</span>
                </div>
            </CardContent>
            </CardActionArea>
        </Card>
        </Link>
    )
}

function FeaturedProperties({properties, propertiesLoading, propertiesErrMess, user, auth}) {
    const classes = useStyles();

    const propertiesToDisplay = properties.map(property => {
        return (
            <div key={property._id} className={classes.property_container}>
                <RenderCard 
                    property={property} 
                    propertyCat={property.category} />
            </div>
        )
        
    })

    if (propertiesLoading) {
        return (
            <div className={classes.featured_properties}>
                <Loading /> 
            </div>
        )
    }
    else if (propertiesErrMess) {
        return (
            <div className={classes.featured_properties}>
                <h4>{propertiesErrMess}</h4>
            </div>
        )
    }
    else {
        return (
            <div>
                {/* <h2 className={`${classes.h2} featured_properties `}>Some of our properties...</h2> */}
                <div className={classes.featured_properties}>
                    {propertiesToDisplay}
                </div>
          </div>
        )
    }

}

export default FeaturedProperties