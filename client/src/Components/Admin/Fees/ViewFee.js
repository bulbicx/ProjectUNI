import React, { useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { makeStyles } from '@material-ui/core' 
import feeIcon from '../../../assets/images/discount.png'
import { Loading } from '../../LoadingComponent'
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom'
import moment from 'moment'
import { getFeeDetails } from '../../../redux/ActionCreators'

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


function ViewFee({ match }) {
    const classes = useStyles()

    const feeId = match.params.feeId

    const dispatch = useDispatch()
    const feesList = useSelector(state => state.fees)
    const { isLoading, fee, errMess } = feesList

    // const propertiesList = useSelector(state => state.properties)
    // const {properties} = propertiesList

    // const feeList = useSelector(state => state.fees)
    // const {fees} = feeList

    useEffect(() => {
        
        if(fee._id !== feeId) {
            dispatch(getFeeDetails(feeId))
        } 


    }, [fee])

    return (
        <div className={classes.details_container}>
            <Breadcrumb style={{width: '19em'}}>
                <BreadcrumbItem><Link to="/admin/dashboard">Dashboard</Link></BreadcrumbItem>
                <BreadcrumbItem><Link to="/admin/dashboard/fees">Fees</Link></BreadcrumbItem>
                <BreadcrumbItem active>Fee Details</BreadcrumbItem>
            </Breadcrumb>
            
        {
            isLoading ?
            <Loading />
            :
            errMess ?
            <p>{errMess}</p>
            :
            fee._id === feeId ?
            <div className={classes.sub_container}>
                <div className={classes.title_section}>
                    <span>
                        <img src={feeIcon} alt="fee icon page" />
                    </span>
                    <h3 className={classes.title_container}>Fee Details</h3>
                </div>
                <hr style={{marginBottom: '5em'}}/>
                <p className={classes.text_detail}><b>Fee ID:</b> {fee._id}</p>
                <p className={classes.text_detail}><b>Category:</b> {fee.category}</p>
                <p className={classes.text_detail}><b>Percentage:</b> {fee.percentage}%</p>

                <div className={classes.date_join_section}>
                    <p className={classes.user_join_date}>Fee created on { moment(fee.createdAt).format("DD/MM/YYYY")} </p>
                </div>
            </div>
            :
            <p>There has been a problem. Retry</p>
        }
            
        </div>
    )

}

export default ViewFee