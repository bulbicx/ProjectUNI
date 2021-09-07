import React, { useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { makeStyles } from '@material-ui/core' 
import { getContractDetails } from '../../redux/ActionCreators'
import { Loading } from '../LoadingComponent'
import { baseUrl } from '../../shared/baseUrl'
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom'
import moment from 'moment'
import contractIcon from '../../assets/images/contractIcon.png'
import contractGainedIcon from '../../assets/images/contractGained.png'

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
    document_section: {
        marginTop: '3em',
        paddingLeft: '1em',
        display: 'flex',
        width: '19em',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginLeft: '1em',
        '&:hover': {
            textDecoration: 'none'
        }
    },
    document_sub_section: {
        background: '#2C3E50',
        padding: '0.6em',
        borderRadius: '50%',
        width: '6em',
        height: '6em',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        '&:hover': {
            background: '#5D6D7E'
        }
    },
    view: {
        fontSize: '1.8rem',
        color: '#808B96',
        marginBottom: 0,
        '&:hover': {
            textDecoration: 'underline'
        }
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

function ViewContract({ match }) {

    const contractsList = useSelector(state => state.contracts)
    const { contract, isLoading, errMess } = contractsList

    const classes = useStyles()
    const dispatch = useDispatch()

    const contractId = match.params.contractId

    useEffect(() => {
        
        if(contract._id !== contractId) {
            dispatch(getContractDetails(contractId))
        } 
    }, [contract])


    const aSt = 'public'
    let path = contract.document.length && contract.document.replace('\\', '/').split('/').join().replace(aSt, '').replace(',', '').replace(',', '')

    return (
        <div className={classes.details_container}>
        <Breadcrumb style={{width: '22em'}}>
            <BreadcrumbItem><Link to="/admin/dashboard">Dashboard</Link></BreadcrumbItem>
            <BreadcrumbItem><Link to="/admin/dashboard/contracts">Contracts</Link></BreadcrumbItem>
            <BreadcrumbItem active>Contract Details</BreadcrumbItem>
        </Breadcrumb>
            
        {
            isLoading ?
            <Loading />
            :
            errMess ?
            <p>{errMess}</p>
            :
            contract._id === contractId ?
            <div className={classes.sub_container}>
                <div className={classes.title_section}>
                    <span>
                        <img src={contractIcon} alt="contract icon page" />
                    </span>
                    <h3 className={classes.title_container}>Contract Details</h3>
                </div>
                <hr style={{marginBottom: '5em'}}/>
                <p className={classes.text_detail}><b>Contract ID:</b> {contract._id}</p>
                <p className={classes.text_detail}><b>Property ID:</b> {contract.property._id}</p>
                <p className={classes.text_detail}><b>Property Name:</b> {contract.property.propertyName}</p>
                <p className={classes.text_detail}><b>User ID:</b> {contract.user._id}</p>
                <p className={classes.text_detail}><b>First Name:</b> {contract.user.firstName}</p>
                <p className={classes.text_detail}><b>Last Name:</b> {contract.user.lastName}</p>
                <p className={classes.text_detail}><b>Start Date:</b> {moment(contract.start).format("DD/MM/YYYY")}</p>
                <p className={classes.text_detail}><b>End Date:</b> {moment(contract.end).format("DD/MM/YYYY")}</p>
                <a className={classes.document_section} target="_blank" href={baseUrl + path} >
                    <div className={classes.document_sub_section}>
                        <img width="55" src={contractGainedIcon} alt="contract" />
                    </div>
                    <p className={classes.view}>View contract</p>
                </a>

                <div className={classes.date_join_section}>
                    <p className={classes.user_join_date}>Contract signed on {moment(contract.createdAt).format("DD/MM/YYYY")}</p>
                </div>
            </div>
            :
            <p>There has been a problem. Retry</p>
        }
            
        </div>
    )
}

export default ViewContract