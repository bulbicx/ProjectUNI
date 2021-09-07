import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core'
import { Link } from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import { history } from '../../redux/helpers/history'
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import { FaStar } from 'react-icons/fa'
import { Button, Modal, ModalHeader, ModalBody, Row, Col, Label, ModalFooter } from 'reactstrap'
import { Control, LocalForm } from 'react-redux-form'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Loading } from '../LoadingComponent'
import no_image from '../../assets/images/no_image_available.jpeg'
import { baseUrl } from '../../shared/baseUrl';
import { getReviewDetails } from '../../redux/ActionCreators';


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
    content_details: {
        marginTop: '1.2em',
    },
    content_tenancy: {
        padding: '1em',
        marginBottom: '1em',
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
    },
    media: {
        maxHeight: 185,
        minHeight: 180
    },
    title_card: {
        display: 'flex',
        justifyContent: 'center',
        color: '#34495E',
        padding: '0.3em'
    },
    property_container: {
        margin: '1em'
    },
    review_stars: {
        display: 'flex',
        justifyContent: 'center'
    },
    btn_section: {
        display: 'flex',
        justifyContent: 'center'
    },
    btn_edit_del: {
        padding: '0.5em 2em',
        borderRadius: '1em',
        fontWeight: 'bold',
        '&:hover': {
            color: 'white',
            textDecoration: 'none',
            cursor: 'pointer'
        }
    },
    btn_edit_review: {
        background: '#F1C40F',
        color: '#273746',
        padding: '0.5em 2.45em',
        marginBottom: '1em',
        '&:hover': {
            background: '#F7DC6F'
        }
    },
    btn_delete_review: {
        background: '#E74C3C',
        color: '#273746',
        '&:hover': {
            background: '#F1948A'
        }
    }
})

const RenderPropertyCard = ({tenancy}) => {
    const classes = useStyles()

    const cat = tenancy.category.toLocaleLowerCase()
    const aSt = 'public'
    let path = tenancy.pictures.length && tenancy.pictures[0].picture.replace('\\', '/').split('/').join().replace(aSt, '').replace(',', '').replace(',', '')

    return (
        <Card onMouseDown={e => e.preventDefault()} className={classes.root}>
            <CardActionArea>
                <Link to={`/properties-to-${cat}/${tenancy._id}`}>
                <Typography gutterBottom variant="h5" component="h2">
                <span className={classes.title_card}>{tenancy.propertyName} 
                </span>
                </Typography>
                <CardMedia
                    className={classes.media}
                    image={tenancy.pictures.length ? baseUrl + path : no_image}
                    component="img"
                    alt={tenancy.propertyName}
                    height="100"
                    title={tenancy.propertyName}
                />
                </Link>
                <CardContent 
                    className={classes.review_stars}>
                    {/* <RatingStars /> */}
                    
                </CardContent>
            </CardActionArea>
        </Card>
    )
}

function PostReviewModal(props) {
    const classes = useStyles()
    const [ratingLandlord, setRatingLandlord] = useState(null)
    const [ratingProperty, setRatingProperty] = useState(null)
    const [landlordHover, setLandlordHover] = useState(null)
    const [propertyHover, setPropertyHover] = useState(null)
    const [isModalOpen, setIsModalOpen] = useState(false)

    const reviewsList = useSelector(state => state.reviews)
    const userLogged = useSelector(state => state.auth)

    const dispatch = useDispatch()


    const reviewUserPosted = reviewsList.reviews.filter(review => review.author.username === userLogged.user.username)
    const reviewAlreadyPosted = reviewUserPosted.filter(review => review.property === props.propertyId)

    const reviewId = reviewAlreadyPosted.length ? reviewAlreadyPosted[0]._id : ''

    // const propertyReviewedCount = props.reviews.filter(review => review.property === props.propertyId).length
    // const reviewEdit = props.reviews.filter(review => review.property === props.propertyId)[0]
    

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen)
    }

    const handleEditReview = async (reviewId) => {
        await dispatch(getReviewDetails(reviewId))
        history.push(`/reviews/${reviewId}`)
    }

    // const getRatingAvg = () => {
    //     return parseInt((ratingLandlord + ratingProperty) / 2)
    // }

    const handleSubmit = (values) => {
        toggleModal()

        props.postReview(ratingLandlord, ratingProperty, values.title, values.writtenReview, props.propertyId)
    }

    return (
        <div>
        {
        reviewAlreadyPosted.length < 1 
        ?
        <div className={classes.btn_section}>
        <Button style={{fontSize: '1.5rem'}} color="warning" onClick={toggleModal}>
            Write a review
        </Button>
        <Modal isOpen={isModalOpen} toggle={toggleModal}>
            <ModalHeader toggle={toggleModal}>Write a review</ModalHeader>
            <ModalBody>
                <LocalForm onSubmit={values => handleSubmit(values)}>
                    <Row className="form-group">
                        <Col style={{display: 'flex', alignItems: 'flex-start', flexDirection: 'column'}}>
                            <Label htmlFor="landlord">Landlord</Label>
                            <div id="landlord">
                            <div className={classes.review_stars}>
                                {[...Array(5)].map((star, i) => {
                                    const ratingValue = i + 1
                                    return (
                                        <label>
                                            <input style={{display: 'none'}}        
                                                type="radio" 
                                                name="rating" 
                                                value={ratingValue}
                                                onClick={() => {setRatingLandlord(ratingValue)}}
                                                />
                                            <FaStar className={classes.star}
                                            size="40"
                                                color={ratingValue <= (landlordHover || ratingLandlord) ? '#ffc107' : '#e4e5e9'}
                                                onMouseEnter={() => setLandlordHover(ratingValue)}
                                                onMouseLeave={() => setLandlordHover(null)} 
                                                />
                                        </label>
                                    )
                                })}
                            </div>
                            </div>
                        </Col>
                    </Row>
                    <Row className="form-group">
                        <Col style={{display: 'flex', alignItems: 'flex-start', flexDirection: 'column'}}>
                            <Label htmlFor="property">Property</Label>
                            <div id="property">
                            <div className={classes.review_stars}>
                                {[...Array(5)].map((star, i) => {
                                    const ratingValue = i + 1
                                    return (
                                        <label>
                                            <input style={{display: 'none'}}        
                                                type="radio" 
                                                name="rating" 
                                                value={ratingValue}
                                                onClick={() => {setRatingProperty(ratingValue)}}
                                                />
                                            <FaStar className={classes.star}
                                            size="40"
                                                color={ratingValue <= (propertyHover || ratingProperty) ? '#ffc107' : '#e4e5e9'}
                                                onMouseEnter={() => setPropertyHover(ratingValue)}
                                                onMouseLeave={() => setPropertyHover(null)} 
                                                />
                                        </label>
                                    )
                                })}
                            </div>
                            </div>
                        </Col>
                    </Row>
                    <Row className="form-group">
                        <Col>
                            <Label htmlFor="title">Add a title</Label>
                            <Control.input model=".title" id="title" className="form-control" />
                        </Col>
                    </Row>
                    <Row className="form-group">
                        <Col>
                            <Label htmlFor="writtenReview">Add a written review</Label>
                            <Control.textarea model=".writtenReview" id="writtenReview" rows="6" className="form-control" />
                        </Col>
                    </Row>
                    <Row className="form-group">
                        <Col>
                        <Button type="submit" className="bg-primary">
                            Submit
                        </Button>
                        </Col>
                    </Row>
                </LocalForm>
            </ModalBody>
            <br />
        </Modal>
        </div>
        :
        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
        <span className={`${classes.btn_edit_review} ${classes.btn_edit_del}`} onClick={() => handleEditReview(reviewId)}>Edit review</span>
        <span className={`${classes.btn_delete_review} ${classes.btn_edit_del}`} onClick={() => props.deleteReview(reviewId)}>Delete review</span>
        
        </div>
        }
        
        </div>
    )
}

function MyTenancy(props) {
    const classes = useStyles()

    if (props.contractsLoading) {
        return (
            <div>
                <div className={classes.container}>
                    <Loading />
                </div>
            </div>
        )
    }
    else if (props.contractsErr) {
        return (
            <div>
                <div className={classes.container}>
                    <h4>{props.contractsErr}</h4>
                </div>
            </div>
        )
    }
    else if (props.tenancies.length > 0) {
        const countPresentTenancies = props.presentTenanciesAll.length
        const countPastTenancies = props.pastTenanciesAll.length

        const presentTenancies = props.presentTenanciesAll.map(tenancy => {
            return (
                <div key={tenancy._id} className={classes.property_container}>
                    <RenderPropertyCard tenancy={tenancy} />
                    {
                        tenancy.category !== 'buy' &&
                        <PostReviewModal 
                            propertyId={tenancy._id} 
                            postReview={props.postReview} 
                            reviews={props.reviews}
                            deleteReview={props.deleteReview}
                        />
                    }
                </div>
            )
        })

        const pastTenancies = props.pastTenanciesAll.map(tenancy => {
            return (
                <div key={tenancy._id} className={classes.property_container}>
                    <RenderPropertyCard tenancy={tenancy} />
                    {
                        tenancy.category !== 'buy' &&
                        <PostReviewModal 
                            propertyId={tenancy._id} 
                            postReview={props.postReview} 
                            reviews={props.reviews}
                            deleteReview={props.deleteReview}
                        />
                    }
                </div>
            )
        })

        // const tenancies = props.tenancies.map(tenancy => {
        //     return (
        //         <div key={tenancy._id} className={classes.property_container}>
        //             <RenderPropertyCard tenancy={tenancy} />
        //             {
        //                 tenancy.category !== 'buy' &&
        //                 <PostReviewModal 
        //                     propertyId={tenancy._id} 
        //                     postReview={props.postReview} 
        //                     reviews={props.reviews}
        //                     deleteReview={props.deleteReview}
        //                 />
        //             }
        //         </div>
        //     )
        // })
    
        return (
            <div className={classes.container}>
                <div className={classes.link_container}>
                    <Link className={`${classes.link} ${classes.current}`}  to="/users/account/my-tenancy">My Tenancy</Link>
                    <Link className={classes.link} to="/users/account/my-tenancy/contract">My Contract</Link>
                </div>
                <div className={classes.content_page}>
                    <h1 className={classes.h1}>My tenancies (Tenant)</h1>
                    <hr />
                    <div className={classes.content_details}>
                        <p className={classes.p}>Present({countPresentTenancies})</p>
                        {props.alert.message &&
                            <div className={`alert ${props.alert.type}`}>
                                {props.alert.message}
                            </div>
                        }
                        <div className={classes.content_tenancy}>
                            {/* {tenancies} */}
                            {presentTenancies}
                        </div>
                        <p className={classes.p}>Past({countPastTenancies})</p>
                        <div className={classes.content_tenancy}>
                            {/* {tenancies} */}
                            {pastTenancies}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    else {
        return (
            <div className={classes.container}>
                <div className={classes.link_container}>
                    <Link className={`${classes.link} ${classes.current}`}  to="/users/account/my-tenancy">My Tenancy</Link>
                    <Link className={classes.link} to="/users/account/my-tenancy/contract">My Contract</Link>
                </div>
                <div className={classes.content_page}>
                    <h1 className={classes.h1}>My tenancies (Tenant)</h1>
                    <hr />
                    <div className={classes.content_details}>
                        <p className={classes.p}>No tenancies to view yet!</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default MyTenancy