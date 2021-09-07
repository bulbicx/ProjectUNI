import React, { useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { makeStyles } from '@material-ui/core' 
import saleIcon from '../../assets/images/saleIcon.png'
import { getSaleDetails } from '../../redux/ActionCreators'
import { Loading } from '../LoadingComponent'
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom'
import moment from 'moment'

const useStyles = makeStyles({
    details_container: {
        padding: '4em',
        background: '#FBF5E0',
        width: '100%'
    },
    sub_container: {
        background: '#F1F4F6',
        padding: '3em',
        boxShadow: '0px 0 6px 0px #707070',
    },
    title_section: {
        display: 'flex'
    },
    title_container: {
        fontSize: '3rem',
        marginLeft: '0.6em',
        marginBottom: 0
    },
    text_detail: {
        fontSize: '1.8rem',
        marginTop: '1em',
        marginLeft: '1em',
        letterSpacing: '2px',
    },
    date_join_section: {
        display: 'flex',
        justifyContent: 'flex-end'
    },
    join_date: {
        fontSize: '1.4rem',
        marginTop: '2em'
    }
})


function ViewSale({ match }) {
    const classes = useStyles()

    const saleId = match.params.saleId

    const dispatch = useDispatch()
    const salesList = useSelector(state => state.sales)
    const {isLoading, sale, errMess} = salesList

    // const propertiesList = useSelector(state => state.properties)
    // const {properties} = propertiesList

    // const feeList = useSelector(state => state.fees)
    // const {fees} = feeList

    useEffect(() => {
        
        if(sale._id !== saleId) {
            dispatch(getSaleDetails(saleId))
        } 


    }, [sale])

    var formatter = new Intl.NumberFormat('en');

    return (
        <div className={classes.details_container}>
            <Breadcrumb style={{width: '19em'}}>
                <BreadcrumbItem><Link to="/admin/dashboard">Dashboard</Link></BreadcrumbItem>
                <BreadcrumbItem><Link to="/admin/dashboard/sales">Sales</Link></BreadcrumbItem>
                <BreadcrumbItem active>Sale Details</BreadcrumbItem>
            </Breadcrumb>
            
        {
            isLoading ?
            <Loading />
            :
            errMess ?
            <p>{errMess}</p>
            :
            sale._id === saleId ?
            <div className={classes.sub_container}>
                <div className={classes.title_section}>
                    <span>
                        <img src={saleIcon} alt="sale icon page" />
                    </span>
                    <h3 className={classes.title_container}>Sale Details</h3>
                </div>
                <hr style={{marginBottom: '5em'}}/>
                <p className={classes.text_detail}><b>Sale ID:</b> {sale._id}</p>
                <p className={classes.text_detail}><b>Property ID:</b> {sale.property._id}</p>
                <p className={classes.text_detail}><b>Property Name:</b> {sale.property.propertyName}</p>
                <p className={classes.text_detail}><b>Fee:</b> {sale.fee.percentage}%</p>
                <p className={classes.text_detail}><b>Amount:</b> £{formatter.format(sale.amount)}</p>

                <div className={classes.date_join_section}>
                    <p className={classes.user_join_date}>Sale created on { moment(sale.createdAt).format("DD/MM/YYYY")} </p>
                </div>
            </div>
            :
            <p>There has been a problem. Retry</p>
        }
            
        </div>
    )

}

export default ViewSale