import React from 'react'
import { useSelector} from 'react-redux'
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Loading } from '../LoadingComponent';
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core'
import { FaStar } from 'react-icons/fa'

const useStyles = makeStyles({
    main_review_container: {
        margin: '2em',
    },
    sub_main_container: {
        padding: '2em'
    }
})

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

function Reviews({ match }) {

    const classes = useStyles()

    const reviewsList = useSelector(state => state.reviews)
    const {isLoading, errMess, reviews} = reviewsList
    const propertyId = match.params.propertyId

    
    const reviewsForSelectedProperty = reviews.filter(review => review.property === propertyId)
    console.log(reviewsForSelectedProperty)
    const countReviews = reviewsForSelectedProperty.length
    const doubleRatings = countReviews * 2
    console.log(doubleRatings)

    const ratingAvg = () => {
        let review = 0
        for (let i = 0; i < countReviews; i++) {//all reviewsthen calculate
                review += reviewsForSelectedProperty[i].landlordRating
                review += reviewsForSelectedProperty[i].propertyRating
            
        }
        return (review/doubleRatings).toFixed(1)//calculate avg and round up to just one decimal after .
    }
    return (
        <div className={classes.main_review_container}>
            <Breadcrumb>
                <BreadcrumbItem><Link to={`/properties-to-rent/${propertyId}`}>Property</Link></BreadcrumbItem>
                <BreadcrumbItem active>All reviews</BreadcrumbItem>
            </Breadcrumb>
            <div className={classes.sub_main_container}>
            {
                isLoading ?
                <Loading />
                :
                errMess ?
                <p>{errMess}</p>
                :
                countReviews ?
                <div style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start',}}>
                <h4 style={{fontWeight: 'bold', fontSize: '1.8rem'}}>Tenant reviews</h4>
                <div style={{display: 'flex', marginTop: '0.25em'}}>
                    <RatingStars rating={ratingAvg()} />
                    <p style={{marginLeft: '1em'}}>{ratingAvg()} out of 5</p>
                </div>
                <p style={{fontSize: '1.1rem', color: '#737679'}}>{countReviews} {countReviews > 1 ? 'ratings' : 'rating'}</p>
                <hr />
                <ul className="list-unstyled">
                    {reviewsForSelectedProperty.map(review => {
                            return (
                                <div key={review._id}>
                                    <li style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start', margin: '1em 1em 1.8em'}}>
                                        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '1em'}}>   
                                            <i style={{fontSize: '2em', marginRight: '0.4em'}} class="fas fa-user-circle"></i>
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
                        
                    })}
                </ul>
            </div>
                :
                <div className={classes.main_review_container}>
                    
                     <p style={{fontSize: '1.5rem'}}>There are no reviews on this property</p>
                </div>
            } 
            </div>           
        </div>

    )

    
}

export default Reviews