import React, { useEffect, useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { getReviewDetails, updateReview } from '../../redux/ActionCreators'
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom'
import { Loading } from '../LoadingComponent';
import { makeStyles } from '@material-ui/core'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import FormHelperText from '@material-ui/core/FormHelperText'
import InputLabel from '@material-ui/core/InputLabel'
import TextField from '@material-ui/core/TextField'

const useStyles = makeStyles((theme) => ({
    main_container: {
        background: '#FCF3CF',
        width: '48em',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        margin: '3em auto',
        borderRadius: '2.2em',
        height: '100%'
    },
    title_section_edit: {
        display: 'flex',
        alignItems: 'flex-end',
        padding: '1.2em 1.5em',
    },
    title_edit: {
        fontSize: '3rem',
        color: '#F5B041',
        marginLeft: '0.6em',
        marginBottom: 0
    },
    form: {
        padding: '2em',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    textField: {
        margin: theme.spacing(2),
        background: 'white'
    },
    rating_section: {
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%',
        padding: '1em 1em 2em'
    },
    btn_submit_form: {
        marginTop: '2em',
        padding: '0.8em 2.4em',
        border: 'none',
        background: '#F1C40F',
        padding: '0.5em 2em',
        borderRadius: '1em',
        color: '#273746',
        fontSize: '1.5rem',
        fontWeight: 'bold',
        '&:hover': {
            color: 'white',
            textDecoration: 'none',
            cursor: 'pointer'
        }
    }
  }))

function ReviewDetail({ match }) {
    const dispatch = useDispatch()
    const classes = useStyles()

    const reviewsList = useSelector(state => state.reviews)
    const {isLoading, errMess, review} = reviewsList
    const reviewId = match.params.reviewId
    const alertSelector = useSelector(state => state.alert)
    
    const [values, setValues] = useState({
        landlordRating: '',
        propertyRating: '',
        title: '',
        reviewBody: ''
    })

    useEffect(() => {
        
        if(review._id !== reviewId) {
            dispatch(getReviewDetails(reviewId))
        } else {
            setValues({
                landlordRating: review.landlordRating,
                propertyRating: review.propertyRating,
                title: review.title,
                reviewBody: review.reviewBody
            })
        }
    }, [review])

    const handleChange = (prop) => (e) => {
        setValues({ ...values, [prop]: e.target.value})
    } 

    const validate = () => {
        let isError = false
        
        let errors = {
            landlordRatingError: '',
            propertyRatingError: '',
            titleError: '',
            reviewBodyError: ''
        }

        if (values.landlordRating === '') {
            isError = true
            errors.landlordRatingError = 'Rating for the landlord must be chosen'
        }

        if (values.propertyRating === '') {
            isError = true
            errors.propertyRatingError = 'Rating for the property must be chosen'
        }
        
        if (values.title === '') {
            isError = true
            errors.titleError = 'A title must be chosen'
        }

        if (values.reviewBody === '') {
            isError = true
            errors.reviewBodyError = 'Review must contain words'
        }

        setValues({
            ...values,
            ...errors
        })

        return isError
    }

    String.prototype.capitalize = function() {
        return this.charAt(0).toUpperCase() + this.substring(1).toLocaleLowerCase()
    }


    const submitHandler = (e) => {
        e.preventDefault()
        const review = {
            _id: reviewId,
            landlordRating: values.landlordRating,
            propertyRating: values.propertyRating,
            title: values.title.capitalize(),
            reviewBody: values.reviewBody.capitalize()        
        }

        const err = validate()
        if (!err) {

            dispatch(updateReview(review))

            setValues({
                landlordRatingError: '',
                propertyRatingError: '',
                titleError: '',
                reviewBodyError: '',
                landlordRating: '',
                propertyRating: '',
                title: '',
                reviewBody: ''
            })
            
        }
    }

    return (
        <div className={classes.main_container}>
            <Breadcrumb>
                <BreadcrumbItem><Link to="/users/account/my-tenancy">My Tenancy</Link></BreadcrumbItem>
                <BreadcrumbItem active>Edit Review</BreadcrumbItem>
            </Breadcrumb>
            <div className={classes.title_section_edit}>
                <span>
                    {/* <img src={editIcon} alt="landlord edit icon" /> */}
                </span>
                <h3 className={classes.title_edit}>Edit Review</h3>
            </div>
            {alertSelector.message &&
                <div className={`alert ${alertSelector.type}`}>
                    {alertSelector.message}
                </div>
            }
            {
                isLoading ?
                <Loading />
                :
                errMess ?
                <p>{errMess}</p>
                :
                review ?

                <div>
                    <form className={classes.form}>
                        <div className={classes.rating_section}>
                            <FormControl error={values.landlordRating ? '' : values.landlordRatingError} variant="filled" style={    
                                    {marginLeft: '0.5em', marginTop: '1em', marginBottom: 0, }} 
                                    className={classes.multiselector}>
                                <InputLabel htmlFor="landlordRating">Landlord rating</InputLabel>
                                <Select
                                    native
                                    value={values.landlordRating}
                                    onChange={handleChange('landlordRating')}
                                    inputProps={{
                                        name: 'landlordRating',
                                        id: 'landlordRating',
                                    }}
                                    style={{width: '18ch', background: 'white'}}
                                >
                                    <option aria-label="None" value="" />
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                </Select>
                                <FormHelperText id="component-error-text">{values.landlordRating ? '' : values.landlordRatingError}</FormHelperText>
                            </FormControl>
                            <FormControl error={values.propertyRating ? '' : values.propertyRatingError} variant="filled" style={    
                                    {marginLeft: '0.5em', marginTop: '1em', marginBottom: 0, }} className={`${classes.formControl}`}>
                                <InputLabel htmlFor="propertyRating">Property rating</InputLabel>
                                <Select
                                    native
                                    value={values.propertyRating}
                                    onChange={handleChange('propertyRating')}
                                    inputProps={{
                                        name: 'propertyRating',
                                        id: 'propertyRating',
                                    }}
                                    style={{width: '18ch', background: 'white'}}
                                >
                                    <option aria-label="None" value="" />
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                </Select>
                                <FormHelperText id="component-error-text">{values.propertyRating ? '' : values.propertyRatingError}</FormHelperText>
                            </FormControl>
                        </div>
                        <TextField
                            error={values.title ? '' : values.titleError}
                            name="title"
                            id="title"
                            label="Title"
                            variant="outlined"
                            value={values.title}
                            onChange={handleChange('title')}
                            margin="normal"
                            style={{width: '61ch'}}
                            className={classes.textField}
                            helperText={values.title ? '' : values.titleError}
                        />
                        <br />
                        <TextField
                            error={values.reviewBody ? '' : values.reviewBodyError}
                            name="reviewBody"
                            id="reviewBody"
                            label="Review"
                            multiline
                            rows={10}
                            variant="outlined"
                            value={values.reviewBody}
                            onChange={handleChange('reviewBody')}
                            margin="normal"
                            style={{width: '61ch'}}
                            className={classes.textField}
                            helperText={values.reviewBody ? '' : values.reviewBodyError}
                        />
                        <br />

                        <div >
                            <button 
                            className={classes.btn_submit_form} onClick={(e) => submitHandler(e)}>Update Review</button>
                            {
                                isLoading && 
                                <span style={{margin: '4em 0 0 2em'}}>
                                <img style={{marginRight: '0.5em'}} src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                                Loading...
                                </span>
                            }
                        </div>
                    </form>
                </div>

                :
                <div>
                    <p>There has been an error. Retry</p>
                </div>
            }
        </div>
    )
}

export default ReviewDetail