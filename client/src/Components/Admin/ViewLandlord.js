import React, { useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { makeStyles } from '@material-ui/core' 
import { getLandlordDetails } from '../../redux/ActionCreators'
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom'
import moment from 'moment'

const useStyles = makeStyles({
    landlord_details_container: {
        padding: '4em',
        background: '#FADBD8',
        width: '100%'
    },
    landlord_sub_container: {
        background: '#F1F4F6',
        padding: '3em',
        boxShadow: '0px 0 6px 0px #707070',
    },
    title_section_landlord: {
        display: 'flex'
    },
    title_landlord_container: {
        fontSize: '3rem',
        marginLeft: '0.6em',
        marginBottom: 0
    },
    text_landlord_detail: {
        fontSize: '1.8rem',
        marginTop: '1em',
        marginLeft: '1em',
        letterSpacing: '2px',
    },
    date_join_section: {
        display: 'flex',
        justifyContent: 'flex-end'
    },
    landlord_join_date: {
        fontSize: '1.4rem',
        marginTop: '2em'
    }
})

function ViewLandlord({ match }) {
    const classes = useStyles()

    const landlordsList = useSelector(state => state.landlords)
    const { isLoading, errMess, landlord } = landlordsList
    const dispatch = useDispatch()

    const landlordId = match.params.landlordId

    
    useEffect(() => {
        
        if(landlord._id !== landlordId) {
            dispatch(getLandlordDetails(landlordId))
        } 
    }, [landlord])


    return (
        <div className={classes.landlord_details_container}>
            <Breadcrumb style={{width: '23em'}}>
                <BreadcrumbItem><Link to="/admin/dashboard">Dashboard</Link></BreadcrumbItem>
                <BreadcrumbItem><Link to="/admin/dashboard/landlords">Landlords</Link></BreadcrumbItem>
                <BreadcrumbItem active>Landlord Details</BreadcrumbItem>
            </Breadcrumb>
            <div className={classes.landlord_sub_container}>
                <div className={classes.title_section_landlord}>
                    <span>
                        {/* <img src={userIcon} alt="landlord icon page" /> */}
                    </span>
                    <h3 className={classes.title_landlord_container}>Landlord Details</h3>
                </div>
                <hr style={{marginBottom: '5em'}}/>
                <p className={classes.text_landlord_detail}><b>Landlord ID:</b> {landlord._id}</p>
                <p className={classes.text_landlord_detail}><b>First Name:</b> {landlord.firstName}</p>
                <p className={classes.text_landlord_detail}><b>Last Name:</b> {landlord.lastName}</p>
                <p className={classes.text_landlord_detail}><b>Email:</b> {landlord.email}</p>
                <p className={classes.text_landlord_detail}><b>Phone number:</b> {landlord.phoneNumber}</p>

                <div className={classes.date_join_section}>
                    <p className={classes.user_join_date}>Landlord file created on {moment(landlord.createdAt).format("DD/MM/YYYY")}</p>
                </div>
            </div>
        </div>
    )
}

export default ViewLandlord