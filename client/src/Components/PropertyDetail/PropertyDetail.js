import { makeStyles } from '@material-ui/core'
import React from 'react'
import { Loading } from '../LoadingComponent'
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Redirect, useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { FaStar } from 'react-icons/fa'
import { baseUrl } from '../../shared/baseUrl'
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import './style.css'
import bath from '../../assets/images/bath.png'
import bed from '../../assets/images/bed.png'
import pets from '../../assets/images/pawprint.png'
import thief from '../../assets/images/thief.png'
import school from '../../assets/images/school.png'
import no_photo from '../../assets/images/no_image_available.jpeg'
import  MapContainer from '../MapContainer';
import ModalViewing from '../Modals/ModalViewing';
import ModalOffer from '../Modals/ModalOffer';

const useStyles = makeStyles({
    container: {
        marginTop: '3em'
    },
    wrap: {
        // padding: 24
    },
    main_show: {
        display: 'flex',
        paddingLeft: '3em',
        paddingTop: '1.8em',
        '@media (max-width: 1400px)': { 
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            '@media (max-width: 1400px)': { 
                paddingLeft: 0
            }
        }
    },
    slider_show: {
        width: '65%',
        '@media (max-width: 1400px)': { 
            width: '90%'
        }
    },
    description_section: {
        width: '35%',
        padding: '0.4em 2em 0.4em 2em',
        '@media (max-width: 1400px)': { 
            width: '70%',
            textAlign: 'center',
            marginTop: '3em'
        }
    },
    prop_name: {
        fontSize: '3.9rem',
        fontWeight: 'bold',
        marginLeft: '0.3em',
        '@media (max-width: 2420px)': { 
            fontSize: '3.1rem',
            '@media (max-width: 2000px)': {
                fontSize: '2.6rem',   
                '@media (max-width: 1770px)': { 
                    fontSize: '2.1rem'
                }
            }
        }
    },
    price_section: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '1em 1em',
        fontSize: '1.7rem',
        heigth: '80px',
        '@media (max-width: 1850px)': { 
            fontSize: '1.3rem',
            '@media (max-width: 1570px)': { 
                fontSize: '1.2rem',
                '@media (max-width: 1400px)': { 
                    justifyContent: 'space-evenly',
                    '@media (max-width: 750px)': {
                        flexDirection: 'column'
                    }
                }
            }
        }
    },
    pw: {
        marginRight: '1.4em'
    },
    bedInfo: {
        display: 'flex',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        width: '210px',
        margin: 0,
        padding: 0,
        '@media (max-width: 1850px)': { 
            fontSize: '1.3rem',
            '@media (max-width: 1570px)': { 
                fontSize: '1.2rem'
            }
        }
    },
    bed_icon: {
        width: '40px',
        '@media (max-width: 1570px)': { 
            width: '36px'
        }
    },
    bath_icon: {
        width: '40px', 
        marginLeft: '1.3em', 
        marginBottom: '0.4em',
        '@media (max-width: 1570px)': { 
            width: '36px'
        }
    },
    property_info: {
        display: 'flex',
        justifyContent: 'center',
        textAlign: 'center', 
        paddingTop: '5em',
        '@media (max-width: 1820px)': { 
            paddingTop: '5em',
            '@media (max-width: 1570px)': { 
                width: '500px',
                '@media (max-width: 1400px)': { 
                    // width: '800px',
                    width: 'auto',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    '@media (max-width: 1275px)': { 
                    //    alignItems: 'flex-end',
                    //    width: 'auto'
                    }
                }
            }
        }
    },
    desc: {
        fontSize: '2.6rem',
        maxWidth: '650px',
        '@media (max-width: 2420px)': { 
            fontSize: '2rem',
            '@media (max-width: 2000px)': {
                fontSize: '1.55rem',   
                '@media (max-width: 1770px)': { 
                    fontSize: '1.3rem'
                }
            }
        }
    },
    btn_section: {
        marginTop: '5em',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        height: '130px',
        '@media (max-width: 1880px)': { 
            marginTop: '4.5em',
            flexDirection: 'column',
            '@media (max-width: 700px)': { 
                flexDirection: 'column'
            }
        }
    },
    btn_sub: {
        position: 'relative',
        display: 'inline-block',
    },
    btn: {
        fontSize: '1.7rem',
        padding: '0.6em 1em',
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
        },
    },
    call_us: {
        textAlign: 'center',
        marginTop: '2em',
        fontSize: '1.4rem',
        '@media (max-width: 1895px)': { 
            fontSize: '1.2rem',
            marginTop: '1em',
            '@media (max-width: 1570px)': { 
                marginTop: '0.8em',
                '@media (max-width: 1570px)': { 
                    marginTop: '1.7em'
                }
            }
        }
    },
    //Section middle
    middle_section: {
        display: 'flex',
        marginBottom: '2em',
        padding: '0.8em 4em 1.25em',
        '@media (max-width: 1400px)': {
            flexDirection: 'column',
            // justifyContent: 'center',
            alignItems: 'center',
            paddingLeft: 0,
            paddingRight: 0
        }
    },
    features: {
        width: '55%',
        '@media (max-width: 1200px)': {
            width: '80%'
        }

    },
    map: {
        // width: '45%'
    },
    feat_title: {
        fontSize: '2.1rem',
        fontWeight: 'bold',
        marginTop: '2em',
        // marginBottom: '0.65em'
    },
    extra_detail: {
        display: 'flex',
        padding: '0.7em 0.25em',
        alignItems: 'flex-end'
    },
    icons: {
        paddingRight: '1.5em'
    },
    filter_detail: {
        display: 'flex',
        justifyContent: 'center',
        fontSize: '1.2rem',
        marginLeft: '1.4em'
    },
    p_tag: {
        fontSize: '1.3rem'
    },
    train_section: {
        display: 'flex',
        flexDirection: 'column',
        margin: '2.3em 2em 1em 2em',
        padding: '2em',
    },
    train_title: {
        display: 'flex',
        height: '4em',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    icon_t: {
        // marginTop: '2.4em',
        marginRight: '1em',
        fontSize: '2em'
    },
    stations: {
        display: 'flex',
        flexDirection: 'column',
        marginLeft: '0.6em',
        '@media (max-width: 1200px)': {
            maxWidth: '400px'
        }
    },
    img_floorplan: {
        width: '390px',
        marginTop: '1em',
        transition: 'transform .5s',
        '&:hover': {
            transform: 'scale(1.5)',
            marginLeft: '4em'
        },
    },
    review_stars: {
        display: 'flex',
        justifyContent: 'center'
    },
    review_title: {
        fontSize: '1.4rem',
    },
    rating: {
        marginRight: '1em'
    },
    rating_box: {
        marginBottom: '1.3em',
        display: 'flex',
        alignItems: 'center'
    },
    review_body: {
        marginTop: '1em',
        fontSize: '1.3rem'
    },
    review_date: {
        fontSize: '0.9rem', 
        color: '#737679'
    },
    view_all_review_link: {
        fontSize: '1.5rem',
        color: 'black',
        margin: '1em'
    },
    map_container: {
        marginBottom: '2em',
        height: '700px',
        width: '1200px',
        // '@media (max-width: 1400px)': {
        //     width: '900px',
        // }
    },
    stations_section: {
        padding: '3em 2em 0 0'
    },
    map_title: {
        fontSize: '2.1rem',
        fontWeight: 'bold',
        marginBottom: '1em',
    },
    title_icon_section: {
        display: 'flex'
    },
    badge: {
        fontSize: '1.6rem',
        margin: '0.5em',
        '@media (max-width: 1750px)': {
            fontSize: '1.1rem',
        }
    }
})

const RenderImages = ({property}) => {
    const classes = useStyles()
    let propertyPhotos = property.pictures
    const settings = {
        dots: true,
        fade: true,
        infinite: true,
        speed: 500,
        slideToShow: 1,
        arrows: true,
        slidesToScroll: 1,
        className: 'slides'
    }

    return (
        <div className={classes.wrap}>
            {
                propertyPhotos.length ?
                <Slider {...settings}>
                    {propertyPhotos.map(photo => {
                        const aSt = 'public'
                        let path = photo.picture.replace('\\', '/').split('/').join().replace(aSt, '').replace(',', '').replace(',', '')
                        return (
                            <div key={property._id}>
                                <img src={baseUrl + path} alt={photo.picture} width="100%" />
                            </div>
                        )
                    })}
                </Slider>
                :
                <div>
                    <img style={{objectFit: 'cover', maxHeight: '850px'}} src={no_photo} alt="picture"  width="100%" />
                </div>
            }
        </div>
    )
}

var formatter = new Intl.NumberFormat('en');

const RenderDescription = ({property}) => {
    const classes = useStyles()
    const user = JSON.parse(localStorage.getItem('user'))
    return (
        <div>
        <h2 className={classes.prop_name}>
            {property.propertyName}, {property.locationArea}
        </h2>
        <div className={classes.price_section}>
            {
                property.salePrice !== null ?
                <p className={classes.pw}>£{formatter.format(property.salePrice)}</p>
                :
                <p><b className={classes.pw}>£{formatter.format(property.pricePw)} pw</b>£{formatter.format(property.pricePcm)} pcm </p>
            }
            <p className={classes.bedInfo}><img className={classes.bed_icon} src={bed} alt="bed" />{property.bedNum} <img className={classes.bath_icon} src={bath} alt="bath" />{property.bathNum}</p>
        </div>
        <div className={classes.badge_section}>
            <span className={`${classes.badge} badge badge-warning`}>{property.pet === 'yes' && 'pet'}</span>
            <span className={`${classes.badge} badge badge-primary`}>{property.school <= 15 && 'school'}</span>
            <span className={`${classes.badge} badge badge-info`}>{property.train <= 15 && 'trains'}</span>
            <span className={`${classes.badge} badge badge-dark`}>{property.crimeRate <= 25 && 'low crime'}</span>
        </div>
        <div className={classes.property_info}>
            <p className={classes.desc}>{property.propertyInfo}</p>
        </div>
        <div className={classes.btn_section}>
            <div className={classes.btn_sub}>
                {ModalViewing(property._id, user, 'blue')}
            </div>
            <div className={classes.btn_sub}>
                {ModalOffer(property._id, user, property.category)}
            </div>
        </div>
        <div className={classes.call_us}><p>Call us on 020 020 0209</p></div>
        </div>
    )
}

const RenderFeatures = ({property}) => {
    const classes = useStyles()
    const features = property.features
    return (
        <div>
            <h3 className={classes.feat_title}>Key features</h3>
            <hr style={{width: '30em', marginLeft: 0}}/>
            {
                features.map(feature => {
                    return (
                        <div key={feature._id}>
                            <p className={classes.p_tag} > -{feature.feat}</p>
                        </div>
                    )
                })
            }
            <h3 className={classes.feat_title}>Some details</h3>
            <hr style={{width: '30em', marginLeft: 0}}/>
            {property.category != 'buy' &&
            <span className={classes.extra_detail}>
                <img className={classes.icons} src={pets} alt="pets" /><b className={classes.p_tag}>Pets:</b><span className={classes.filter_detail}>{property.pet == 'yes' ? 'allowed' : 'not allowed'}</span>
            </span>
            
            }
            <span className={classes.extra_detail}>
                <img className={classes.icons} src={school} alt="school" /><b className={classes.p_tag}>School:</b><span className={classes.filter_detail}>within {property.school} miles</span>
            </span>
            <span className={classes.extra_detail}>
                <img className={classes.icons} src={thief} alt="thief" /><b className={classes.p_tag}>Crime rate:</b><span className={classes.filter_detail}>within {property.crimeRate}%</span>
            </span>
            <span className={classes.extra_detail}>
                <i style={{fontSize: '2rem', paddingRight: '0.9em'}} className={`${classes.icons} fas fa-subway`}></i><b className={classes.p_tag}>Train:</b><span className={classes.filter_detail}>within {property.train} miles</span>
            </span>
            <h3 className={classes.feat_title}>Further Details</h3>
            <hr style={{ width: '30em', marginLeft: 0 }} />
            {
                property.category === 'rent' &&
            <p className={classes.p_tag}><b>Deposit: </b> {property.deposit}</p>
            }
            <p className={classes.p_tag}><b>Council tax:</b> £{formatter.format(property.councilTax)} per year</p>
            <p className={classes.p_tag}><b>Local authority:</b> {property.localAuthority}</p>
            <p className={classes.p_tag}><b>Total Sq Ft:</b> {property.squares} approx.</p>
            <p className={classes.p_tag}><b>Reference:</b> {property._id}</p>
        </div>
    )
}

const RenderMap = ({property}) => {
    const classes = useStyles()
    const stations = property.stations
    return (
        <div className={classes.train_section}>
            <div className={classes.title_icon_section}>
                <i style={{fontSize: '2.2em', marginRight: '0.7em'}} className="fas fa-map-marked-alt"></i>
                <h3 className={classes.map_title}>Map</h3>
            </div>
            <div className={classes.map_container}>
                <MapContainer name={property.propertyName} lat={ property.lat } lng={ property.lng } />
            </div>
            <div className={classes.stations_section}>
                <div className={classes.train_title}>
                    <i style={{fontSize: '2rem', paddingRight: '0.9em'}} className={`${classes.icons} fas fa-subway`}></i>
                    <b  style={{ fontSize: '2rem' }} className={classes.p_tag}>Nearest Stations</b>
                </div>
                <hr style={{width: '30em', marginLeft: 0}}/>
                <div className={classes.stations}>
                {stations.map(station => {
                    return (
                        <div key={station.stationName}>
                        <p className={classes.p_tag} >{station.stationName}</p><br/>
                        </div>
                    )
                })}
                </div>
            </div>
        </div>
    )
}

const RatingStars = ({rating}) => {
    const classes = useStyles()
    let someId = 0
    return (
        <div className={classes.review_stars}>
            {[...Array(5)].map((star, i) => {
                someId++
                const ratingValue = i + 1
                return (
                    <label key={someId}>
                        <input style={{display: 'none'}}        
                            type="radio" 
                            name="rating" 
                            value={ratingValue}
                            />
                        <FaStar className={classes.star}
                            size="20"
                            color={ratingValue <= rating ? '#ffc107' : '#e4e5e9'}
                            />
                    </label>
                )
            })}
        </div>
    )
}

const RenderReviews = ({reviews, currentProperty}) => {
    const classes = useStyles()
    const lengthReviews = reviews.reviews.filter(review => review.property === currentProperty).length
    const double = lengthReviews * 2
    
    const ratingAvg = () => {
        let review = 0
        for (let i = 0; i < reviews.reviews.length; i++) {//all reviews
            if (reviews.reviews[i].property == currentProperty) {//if review correspond to property then calculate
                review += reviews.reviews[i].landlordRating
                review += reviews.reviews[i].propertyRating
            }
        }
        return (review/double).toFixed(1)//calculate avg and round up to just one decimal after .
    }

    //capitalize first letter of a string
    String.prototype.capitalize = function() {
        return this.charAt(0).toUpperCase() + this.substring(1).toLocaleLowerCase()
    }

    //if reviews are present and there are more than 0 review for the current property then display them
    if (reviews.reviews != null && reviews.reviews.filter(review => review.property === currentProperty).length > 0) {
        return (
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start', letterSpacing: '1px'}}>
                <h4 style={{fontWeight: 'bold', fontSize: '1.8rem', marginLeft: '1em'}}>Tenant reviews</h4>
                <div style={{display: 'flex', marginTop: '0.25em', marginLeft: '2em'}}>
                    <RatingStars rating={ratingAvg()} />
                    <p style={{marginLeft: '1em'}}>{ratingAvg()} out of 5</p>
                </div>
                <p style={{fontSize: '1.1rem', color: '#737679', marginLeft: '2em'}}>{lengthReviews} {lengthReviews > 1 ? 'ratings' : 'rating'}</p>
                <hr />
                <ul className="list-unstyled">
                    {reviews.reviews.map(review => {
                        if (review.property === currentProperty) { //if current review correspond to current property...
                            return (
                                <div key={review._id} style={{maxWidth: '50%'}}>
                                    <li style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start', margin: '1em 1em 1.8em', background: '#FFFAF0', borderRadius: '2em', padding: '1.5em'}}>
                                        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '1em'}}>   
                                            <i style={{fontSize: '2em', marginRight: '0.4em'}} className="fas fa-user-circle"></i>
                                            <p style={{marginBottom: 0,}}>
                                                {review.author.firstName.capitalize()} {review.author.lastName.capitalize()}
                                            </p>
                                        </div> 
                                        <div style={{display: 'flex', flexDirection: 'column'}}>
                                            <p className={classes.review_title}>{review.title.capitalize()}</p>

                                            <span className={classes.rating_box} >
                                            <b className={classes.rating} >Landlord</b>
                                            <RatingStars rating={review.landlordRating} />
                                            </span>
                                            <span className={classes.rating_box} style={{marginBottom: 0}} >
                                            <b className={classes.rating}>Property</b>
                                            <RatingStars rating={review.propertyRating} />
                                            </span>
                                            <p className={classes.review_date}>Reviewed on {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day:'2-digit'}).format(new Date(Date.parse(review.updatedAt)))}</p>

                                            <p className={classes.review_body}>{review.reviewBody.capitalize()}</p>
                                        </div>
                                    </li>
                                    <hr style={{width: '50vw'}}/>
                                </div>
                            )
                        }
                    })}
                </ul>
                <Link to={`/properties-to-rent/${currentProperty}/reviews`} className={classes.view_all_review_link}>View all reviews...</Link>
            </div>
        )
    }
    else {
        return (
            <div style={{margin: '4em 2em 3em', display: 'flex', flexDirection: 'column', alignItems: 'flex-start'}}>
                <h4 style={{fontWeight: 'bold', fontSize: '1.8rem'}}>Tenant reviews</h4>
                <RatingStars rating={0} />
                <h4 style={{fontSize: '1.4rem', marginTop: '1em'}}>There are no reviews yet</h4>
            </div>
        )
    }
}

function PropertyDetail({properties, isLoading, errMess, reviews}) {
    const classes = useStyles()
    const {propertyId} = useParams()

    const property = properties.find(property => property._id === propertyId)
    
    if (isLoading) {
        return (
            <div className={classes.container}>
                <div className={classes.main_show}>
                    <Loading />
                </div>
            </div>
        )
    }
    else if (errMess) {
        return (
            <div className={classes.container}>
                <div className={classes.main_show}>
                    <h4>{errMess}</h4>
                </div>
            </div>
        )
    }
    else if (property != null) {
        const cat = property.category
        const aSt = 'public'
        let path = property.floorplan.length && property.floorplan[0].floorImg.replace('\\', '/').split('/').join().replace(aSt, '').replace(',', '').replace(',', '')
        return (
            <div className={classes.container}>
            <Breadcrumb style={{width: '19em', marginLeft: '2em'}}>
                <BreadcrumbItem><Link to={`/properties-to-${cat}`}>Properties to {cat}</Link></BreadcrumbItem>
                <BreadcrumbItem active>Property Detail</BreadcrumbItem>
            </Breadcrumb>
                <div className={classes.main_show}>
                    <div className={classes.slider_show}>
                        <RenderImages property={property} />
                    </div>
                    <div className={classes.description_section}>
                        <RenderDescription property={property} />
                    </div>
                </div>
                <div className={classes.middle_section}>
                    <div className={classes.features}>
                        <RenderFeatures property={property} />
                        <img src={path ? baseUrl + path : no_photo} className={classes.img_floorplan} />
                    </div>
                    <div className={classes.map}>
                        <RenderMap property={property}/>
                    </div>
                </div>
                {property.category === 'rent' &&
                    <div style={{marginLeft: '2em'}}>
                        <RenderReviews reviews={reviews} currentProperty={property._id} />
                    </div>
                }
            </div>
        )
    }
    else {
        return (
            <div></div>
        )
    }
}

export default PropertyDetail