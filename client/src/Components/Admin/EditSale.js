import React, { useState, useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { makeStyles } from '@material-ui/core'
import { getSaleDetails, updateSale } from '../../redux/ActionCreators'
import { Loading } from '../LoadingComponent'
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom'
import saleIcon from '../../assets/images/saleIcon.png'
import TextField from '@material-ui/core/TextField'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import FormHelperText from '@material-ui/core/FormHelperText'
import InputLabel from '@material-ui/core/InputLabel'

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


function EditSale({ match }) {
    const classes = useStyles()

    const saleId = match.params.saleId

    const dispatch = useDispatch()
    const salesList = useSelector(state => state.sales)
    const {isLoading, sale, errMess} = salesList

    const propertiesList = useSelector(state => state.properties)
    const {properties} = propertiesList

    const feeList = useSelector(state => state.fees)
    const {fees} = feeList

    const alertSelector = useSelector(state => state.alert)


    const [values, setValues] = useState({
        property: '',
        fee: '',
        amount: '',
    })

    // eslint-disable-next-line
    useEffect(() => {
        
        if(sale._id !== saleId) {
            dispatch(getSaleDetails(saleId))
        } else {
            setValues({
                property: sale.property._id,
                fee: sale.fee._id,
                amount: sale.amount,
            })
        }

// eslint-disable-next-line
    }, [sale])

    // eslint-disable-next-line
    useEffect(() => {
        let totAmount

        if(values.property && values.fee) {
            let selectedProperty = properties.filter(property => property._id === values.property)
            let selectedFee = fees.filter(fee => fee._id === values.fee)
            // console.log(selectedFee)
            if (selectedProperty[0].category === 'rent') {
                totAmount = (parseInt(selectedProperty[0].pricePcm) * parseInt(selectedFee[0].percentage)) /100
            }
    
            if (selectedProperty[0].category === 'buy') {
                totAmount = (parseInt(selectedProperty[0].salePrice) * parseInt(selectedFee[0].percentage)) /100
            }
            setValues(prevState => ({
                ...prevState,
                amount: totAmount
            }))
            console.log(totAmount)

        }
        // eslint-disable-next-line
    }, [values.property, values.fee])

    const handleChange = (prop) => (e) => {
        setValues({ ...values, [prop]: e.target.value})
    } 

    
    const validate = () => {
        let isError = false
        
        let errors = {
            propertyError: '',
            feeError: '',
            amountError: ''
        }

        if (values.property === '') {
            isError = true
            errors.propertyError = 'A property must be selected'
        }

        if (values.fee === '') {
            isError = true
            errors.feeError = 'A fee must be selected'
        }

        if (values.amount === '' || /\D/.test(values.amount)) {
            isError = true
            errors.amountError = 'An amount must be present'
        }

        setValues({
            ...values,
            ...errors
        })

        return isError
    }

    const submitHandler = (e) => {
        e.preventDefault()
        const sale = {
            _id: saleId,
            property: values.property,
            fee: values.fee,
            amount: values.amount
        }

        const err = validate()
        if (!err) {

            dispatch(updateSale(sale))

            setValues({
                property: '',
                fee: '',
                amount: '',
                propertyError: '',
                feeError: '',
                amountError: ''
            })
            
        }
    }

    return (
        <div className={classes.main_container}>
            <Breadcrumb>
                <BreadcrumbItem><Link to="/admin/dashboard">Dashboard</Link></BreadcrumbItem>
                <BreadcrumbItem><Link to="/admin/dashboard/sales">Sales</Link></BreadcrumbItem>
                <BreadcrumbItem active>Edit Sale</BreadcrumbItem>
            </Breadcrumb>
            <div className={classes.title_section_edit}>
                <span>
                    <img src={saleIcon} alt="Sale edit icon" />
                </span>
                <h3 className={classes.title_edit}>Edit Sale</h3>
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
                sale ?

                <div>
                    <form className={classes.aform}>
                    <FormControl 
                        className={classes.multiselector}
                        style={{marginRight: '3em'}}
                        error={values.propertyError}
                        variant="outlined" >
                        <InputLabel htmlFor="category">Property</InputLabel>
                        <Select
                            native
                            value={values.property}
                            onChange={handleChange('property')}
                            inputProps={{
                                name: 'property',
                                id: 'property',
                            }}
                            style={{width: '32ch', background: 'white'}}
                            label="Property"
                        >
                        <option aria-label="None" value="" />
                        {
                            properties.map(property => {
                                return (
                                    <option key={property._id} value={property._id}>{property.propertyName}</option>
                                )
                            })
                        }
                        </Select>
                        <FormHelperText id="component-error-text">
                            {values.propertyError}
                        </FormHelperText>
                    </FormControl>
                    <br/>
                    <FormControl 
                        className={classes.multiselector}
                        style={{marginRight: '3em'}}
                        error={values.feeError}
                        variant="outlined" >
                        <InputLabel htmlFor="category">Fee</InputLabel>
                        <Select
                            native
                            value={values.fee}
                            onChange={handleChange('fee')}
                            inputProps={{
                                name: 'fee',
                                id: 'fee',
                            }}
                            style={{width: '32ch', background: 'white'}}
                            label="Fee"
                        >
                        <option aria-label="None" value="" />
                        {
                            fees.map(fee => {
                                return (
                                    <option key={fee._id} value={fee._id}>{fee.percentage}%</option>
                                )
                            })
                        }
                        </Select>
                        <FormHelperText id="component-error-text">
                            {values.categoryError}
                        </FormHelperText>
                    </FormControl>
                    <br />
                        <TextField
                            error={values.amountError}
                            name="amount"
                            id="amount"
                            type="number"
                            label="Amount"
                            variant="outlined"
                            value={values.amount}
                            onChange={handleChange('amount')}
                            margin="normal"
                            style={{width: '27ch'}}
                            className={classes.textField}
                            helperText={values.amountError}
                        />
                        <br />

                        <div >
                        <div style={{display: 'flex', justifyContent: 'center'}}>
                        <div className={classes.btn_submit_setion}>
                            <Link className={classes.cancel_link} to="/admin/dashboard/sales">Cancel</Link>
                            <button 
                            className={classes.btn_submit_form} onClick={(e) => submitHandler(e)}>Update Sale</button>
                        </div>
                    </div>
                        {
                            isLoading && 
                            <span style={{margin: '4em 0 0 2em'}}>
                            <img style={{marginRight: '0.5em'}} src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" alt="loading" />
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

export default EditSale