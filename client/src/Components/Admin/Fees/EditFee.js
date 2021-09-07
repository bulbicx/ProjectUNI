import React, { useState, useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { makeStyles } from '@material-ui/core'
import { Loading } from '../../LoadingComponent'
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom'
import feeIcon from '../../../assets/images/discount.png'
import TextField from '@material-ui/core/TextField'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import FormHelperText from '@material-ui/core/FormHelperText'
import InputLabel from '@material-ui/core/InputLabel'
import { getFeeDetails, updateFee } from '../../../redux/ActionCreators'

const useStyles = makeStyles((theme) => ({
    main_container: {
        marginTop: '4.4em',
        background: '#FADBD8',
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
        color: '#EC7063',
        marginLeft: '0.6em',
        marginBottom: 0
    },
    aform: {
        padding: '2em',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    textField: {
        // margin: theme.spacing(2),
        background: 'white',
        margin: '1em 1em'
    },
    btn_submit_form: {
        padding: '0.8em 2.4em',
        border: 'none',
        borderRadius: '1.8em',
        background: '#EC7063',
        color: 'white',
        fontWeight: 'bold',
        fontSize: '1.4rem',
        '&:hover': {
            background: '#F1948A',
            cursor: 'pointer'
        }
    },
    multiselector: {
        margin: '1em 2em'
    },
    btn_submit_setion: {
        marginTop: '3em',
        padding: '2em 1em',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '22em',
    },
    cancel_link: {
        fontSize: '1.5rem',
        color: 'black'
    },
  }))


function EditFee({ match }) {
    const classes = useStyles()

    const feeId = match.params.feeId

    const dispatch = useDispatch()
    const feesList = useSelector(state => state.fees)
    const { isLoading, fee, errMess } = feesList

    const alertSelector = useSelector(state => state.alert)


    const [values, setValues] = useState({
        percentage: '',
        category: '',
    })

    useEffect(() => {
        
        if(fee._id !== feeId) {
            dispatch(getFeeDetails(feeId))
        } else {
            setValues({
                percentage: fee.percentage,
                category: fee.category
            })
        }


    }, [fee])

    const handleChange = (prop) => (e) => {
        setValues({ ...values, [prop]: e.target.value})
    } 

    
    const validate = () => {
        let isError = false
        
        let errors = {
            percentageError: '',
            categoryError: '',
        }

        if (values.percentage === '') {
            isError = true
            errors.percentageError = 'A percentage must be selected'
        }

        if (values.category === '') {
            isError = true
            errors.categoryError = 'A category must be selected'
        }

        setValues({
            ...values,
            ...errors
        })

        return isError
    }

    const submitHandler = (e) => {
        e.preventDefault()
        const fee = {
            _id: feeId,
            percentage: values.percentage,
            category: values.category
        }

        const err = validate()
        if (!err) {

            dispatch(updateFee(fee))


            setValues({
                percentage: '',
                percentageError: '',
                category: '',
                categoryError: '',
            })
            
        }
    }

    return (
        <div className={classes.main_container}>
            <Breadcrumb>
                <BreadcrumbItem><Link to="/admin/dashboard">Dashboard</Link></BreadcrumbItem>
                <BreadcrumbItem><Link to="/admin/dashboard/fees">Fees</Link></BreadcrumbItem>
                <BreadcrumbItem active>Edit Fee</BreadcrumbItem>
            </Breadcrumb>
            <div className={classes.title_section_edit}>
                <span>
                    <img src={feeIcon} alt="Fee edit icon" />
                </span>
                <h3 className={classes.title_edit}>Edit Fee</h3>
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
                fee ?

                <div>
                    <form className={classes.aform}>
                        <FormControl 
                        className={classes.multiselector}
                        style={{marginRight: '3em'}}
                        error={values.categoryError}
                        variant="outlined" >
                        <InputLabel htmlFor="category">Category</InputLabel>
                        <Select
                            native
                            value={values.category}
                            onChange={handleChange('category')}
                            inputProps={{
                                name: 'category',
                                id: 'category',
                            }}
                            style={{width: '32ch', background: 'white'}}
                            label="Category"
                        >
                        <option aria-label="None" value="" />
                        <option value="rent">Rent</option>
                        <option value="buy">Buy</option>
                        </Select>
                        <FormHelperText id="component-error-text">
                            {values.categoryError}
                        </FormHelperText>
                    </FormControl>
                    <br />
                    <TextField
                        error={values.percentageError}
                        name="percentage"
                        id="percentage"
                        type="percentage"
                        label="Percentage"
                        variant="outlined"
                        value={values.percentage}
                        onChange={handleChange('percentage')}
                        margin="normal"
                        style={{width: '27ch'}}
                        className={classes.textField}
                        helperText={values.percentageError}
                    />
                    <br />

                    <div >
                    <div style={{display: 'flex', justifyContent: 'center'}}>
                    <div className={classes.btn_submit_setion}>
                        <Link className={classes.cancel_link} to="/admin/dashboard/fees">Cancel</Link>
                        <button 
                        className={classes.btn_submit_form} onClick={(e) => submitHandler(e)}>Update Fee</button>
                    </div>
                </div>
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
            <p>There has been a problem loading the page. Retry</p>
        }

        </div>
    )

}

export default EditFee