import { makeStyles } from '@material-ui/core'
import React, { useState } from 'react'
import { NavLink, Switch, Route, useLocation } from 'react-router-dom'
import UsersReportPage from './reports/Users'
import Users from './Users'
import Properties from './Properties'
import Landlords from './Landlords'
import DashboardPage from './DashboardPage'
import Demo from './scheduler'
import Profit from './reports/Profit'
import AddProperty from './addProperty'
import AddLandlord from './AddLandlord'
import AddUser from './AddUser'
import EditProperty from './editProperty'
import ViewUser from './ViewUser'
import EditUser from './EditUser'
import ViewLandlord from './ViewLandlord'
import EditLandlord from './EditLandlord'
import Sales from './Sales'
import AddSale from './AddSale'
import ViewSale from './ViewSale'
import EditSale from './EditSale'
import Contracts from './Contracts'
import AddContract from './AddContract'
import ViewContract from './ViewContract'
import EditContract from './EditContract'
import PropertiesReportPage from './reports/Properties'
import ContractsReportPage from './reports/Contracts'
import Fees from './Fees/Fees'
import AddFee from './Fees/AddFee'
import ViewFee from './Fees/ViewFee'
import EditFee from './Fees/EditFee'
import NavLinks from './NavLinks'
import Offers from './Offers/Offers'
import moment from 'moment'

import logo from '../../assets/images/6-layers.png'
import logoHover from '../../assets/images/homeIconHover.png'
import dashboardIcon from '../../assets/images/dashboard.png'
import propIcon from '../../assets/images/prop.png'
import landlordIcon from '../../assets/images/landlord.png'
import logout from '../../assets/images/logoutad.png'
import crowd from '../../assets/images/crowd.png'
import scheduleIcon from '../../assets/images/schedule.png'
import saleIcon from '../../assets/images/saleIcon.png'
import contractIcon from '../../assets/images/contractIcon.png'
import feeIcon from '../../assets/images/discount.png'
import offerIcon from '../../assets/images/offerIcon.png'
import moneyIcon from '../../assets/images/moneyIcon.png'
import viewingBook from '../../assets/images/viewingBook.png'
import reservationIcon from '../../assets/images/reservation.png'
import { useDispatch, useSelector } from 'react-redux'
import { deleteNotification, fetchNotifications } from '../../redux/ActionCreators'
import Viewings from './Viewings/Viewings'


const useStyles = makeStyles({
    container: {
        display: 'flex',
        position: 'relative',
        OObjectFit: 'fill',
        objectFit: 'fill',
        width: '100%',
        height: '100%',
        margin: 0,
    },
    left_board: {        
        minHeight: '1400px',
        height: '100%',
        paddingTop: '5em',
        display: 'flex',
        flexDirection: 'column',
        position: 'absolute',
        top: '0%',
        minWidth: '380px',
        '@media (max-width: 1500px)': { 
            minWidth: '6em',
            maxWidth: '6em',
            alignItems: 'flex-start',
            justifyContent: 'flex-start'
        }
    },
    sub_board: {
        minWidth: '380px',
        // width: '25%',
        minHeight: '1400px',
        background: '#353C48',
        zIndex: -1,
        position: 'relative',
        '@media (max-width: 1500px)': { 
            minWidth: '6em',
            maxWidth: '6em',
        }

    },
    my_profile_link: {
        fontSize: '1.7rem',
        color: 'white',
        display: 'flex',
        width: '100%',
        padding: '1em 0em 1em 2em',
        '&:hover': {
            background: '#F4D03F',
            textDecoration: 'none',
            color: '#2C3E50'
        },
        '@media (max-width: 1500px)': { 
            alignItems: 'center',
            justifyContent: 'center',
            paddingLeft: 0,
            paddingRight: 'auto',
        }
    },
    icon: {
        width: '50px',
        marginRight: '1em',
        '@media (max-width: 1500px)': { 
            width: '1em',
            marginRight: 'auto',
            marginLeft: 'auto'
        }
    },
    link: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        '@media (max-width: 1500px)': { 
            display: 'none'
        }
    },
    active: {
        background: ''
    },
    top_bar: {
        position: 'fixed',
        background: '#353C48',
        boxShadow: '0 2px 9px #2f343d',
        width: '100%',
        height: '3.4em',
        zIndex: 4,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    main_logo: {
        marginLeft: '2.3em',
        width: '7em',
        boxShadow: '0 2px 9px #2f343d',
    },
    notification_bar: {
        position: 'relative',
        display: 'block',
        padding: '0.7em 0.6em 0.4em 0',
        '&:hover': {
            cursor: 'pointer'
        }
    },
    notificationIcon: {
        color: 'white',
        fontSize: '1.45em',
    },
    badge_pill: {
        position: 'absolute',
        top: '0.6em',
        left: '1.2em',
        fontFamily: 'Roboto, sans-serif',
        fontWeight: '400'
    },
    profile_bar: {
        display: 'flex',
        alignItems: 'center',
        color: 'white',
        '&:hover': {
            cursor: 'pointer'
        }
    },
    profile_icon: {
        color: 'white',
        fontSize: '2.2em',
        marginLeft: '1.2em'
    },
    home_link: {
        color: 'white',
        fontWeight: 'bold',
        margin: '0 1em',
        '&:hover': {
            textDecoration: 'none',
            color: '#5D6D7E'
        }
    },
    notification_section: {
        padding: '',
        background: '#3C4452',
        opacity: '0.7',
        height: '100%',
        width: '0em',
        position: 'absolute',
        right: 0,
        zIndex: 2,
        transition: 'width 0.7s',
        overflowY: 'scroll'
    },
    toast: {
        margin: '0.5em 0',
        opacity: '1',
    },
    toast_header: {
        background: '#FAFAFA',
        opacity: '1',
        padding: '0.45em 0.8em',
        letterSpacing: '1px',
        display: 'flex',
        justifyContent: 'space-between'
    },
    toast_body: {
        background: '#E9E9EB',
        opacity: '1',
        padding: '0.9em 0.8em',
        letterSpacing: '1px'
    }
})

function Dashboard({users, properties, sales, fees, todaySales, minus7Sales, minus14Sales, minus21Sales, minus28Sales, minus35Sales, contractsLastMonth, profitLastMonth, logoutUser, profitThisYear, newUsersLastMonth, getCustomProfitReport, customProfitReport, propertyDelete, propertyCreate, alert, createUser, deleteUser, createLandlord, landlords, deleteLandlord, getUserDetails, createSale, deleteSale, contracts, deleteContract, customProfitClear, getCustomUsersReport, customUsersReportClear, customPropertiesReportClear, getCustomPropertiesReport, getCustomContractsReport, customContractsReportClear}) {
    const classes = useStyles()

    const [isOpen, setIsOpen] = useState(false)

    const notificationList = useSelector(state => state.notifications)
    const { notifications } = notificationList

    const appointmentsList = useSelector(state => state.appointments)
    const { appointments } = appointmentsList

    const dispatch = useDispatch()

    const location = useLocation()
    
    const handleLogout = () => {
        logoutUser()
    }

    const toggleNotifications = () => {
        dispatch(fetchNotifications())
        setIsOpen(!isOpen)
    }
    
    const removeNotification = (id) => {
        dispatch(deleteNotification(id))
    }

    const { username } = JSON.parse(localStorage.getItem('user'))

    const displayAllNotifications = notifications && notifications.length > 0 ?
        notifications.map((notification, i) => {
          let content=`The property ${notification.property ? notification.property.propertyName : '[DELETED]'} has received a new ${notification.type === 'offer' ? 'offer' : 'viewing booking'} from ${notification.user.firstName}`
    
          return (
            <div key={i} className={classes.toast} >
                  <div className={classes.toast_header} style={{ width: isOpen ? '100%' : 0, padding: isOpen ? '0.45em 0.8em' : '0em' }}>
                    {
                        notification.type === 'offer' ?
                        <img src={moneyIcon} alt="money" style={{ width: '1.4em', height: '1.4em', marginRight: '0.4em' }} />
                        :
                        <img src={viewingBook} alt="viewing" style={{width: '1.4em', height: '1.4em', marginRight: '0.4em'}} />
                    }
                    <strong className="mr-auto text-primary">New { notification.type }</strong>
                      <small className="text-muted">{moment(notification.createdAt).fromNow()}</small>
                    <button type="button" className="ml-2 mb-1 close" onClick={() => removeNotification(notification._id)}>&times;</button>
                </div>
                <div className={classes.toast_body} style={{width: isOpen ? '100%' : 0, padding: isOpen ? '0.9em 0.8em' : '0em'  }}>
                    {isOpen && content}
                </div>
            </div>
          )
        })
        : <p style={{fontSize: '1.4rem'}}>You have no notifications</p>
    

    return (
        <div className={classes.container}>
            <div className={classes.top_bar}>
                <NavLink to="/">
                    <img
                        src={logo}
                        alt="logo"
                        className={classes.main_logo}
                        onMouseOver={e => e.currentTarget.src = logoHover} 
                        onMouseLeave={e => e.currentTarget.src = logo} 
                        style={{cursor: 'pointer'}}
                    />
                    <span className={classes.home_link}>Home</span>
                </NavLink>
                <span style={{ display: 'flex', alignItems: 'center', marginRight: '3em' }}>
                    <span onClick={toggleNotifications} className={classes.notification_bar}>
                        <i className={`${ classes.notificationIcon } far fa-bell`}></i>
                        {notifications && notifications.length > 0 &&
                            <span className={`${ classes.badge_pill } badge badge-pill badge-info`}>{notifications.length}</span>
                        }
                    </span>
                    <span className={`${ classes.profile_bar }`} >
                        <span className="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <i className={`${ classes.profile_icon } fas fa-user-circle`}></i>
                            <small style={{ fontSize: '1.1rem', color: 'white', margin: '0 0.5em' }}>{username}</small>
                        </span>
                        <div className="dropdown-menu dropdown-menu-right">
                            {NavLinks()}
                        </div>
                    </span>
                </span>
            </div>
            
            <div className={classes.notification_section} style={{ width: isOpen ? '25em' : '0em', padding: isOpen ? '4.4em 2em 3em' : '' }}>
            { displayAllNotifications }
            </div>
            <div className={classes.sub_board}></div>
            <div className={classes.left_board}>
                
                <NavLink exact={true} 
                    activeClassName="is-active" 
                    activeStyle={{ background: '#F4D03F', color: '#2C3E50'}} 
                    style={{background: location.pathname == "/admin/dashboard" && '#F4D03F'}}
                    to="/admin/dashboard" 
                    className={`${classes.my_profile_link} ${classes.active}`}
                >
                    <img className={classes.icon} src={dashboardIcon} alt="dashboard icon" />
                    <span className={classes.link}>Dashboard</span>
                </NavLink>
                <NavLink to="/admin/dashboard/users"         
                    activeClassName="is-active" 
                    activeStyle={{ background: '#F4D03F', color: '#2C3E50'}} 
                    className={classes.my_profile_link}
                >
                    <img src={crowd} alt="users icon" 
                        className={classes.icon} />
                    <span className={classes.link}>Users</span>
                </NavLink>
                <NavLink to="/admin/dashboard/properties"  
                    activeClassName="is-active" 
                    activeStyle={{ background: '#F4D03F', color: '#2C3E50'}} 
                    className={classes.my_profile_link}
                >
                    <img src={propIcon} alt="properties icon" className={classes.icon} />
                    <span className={classes.link}>Properties</span>
                </NavLink>
                <NavLink to="/admin/dashboard/landlords" 
                    activeClassName="is-active" 
                    activeStyle={{ background: '#F4D03F', color: '#2C3E50'}} 
                    className={classes.my_profile_link}
                >
                    <img src={landlordIcon} alt="landlord icon" className={classes.icon} />
                    <span className={classes.link}>Landlords</span>
                </NavLink>
                <NavLink to="/admin/dashboard/sales" 
                    activeClassName="is-active" 
                    activeStyle={{ background: '#F4D03F', color: '#2C3E50'}} 
                    className={classes.my_profile_link}
                >
                    <img src={saleIcon} alt="landlord icon" className={classes.icon} />
                    <span className={classes.link}>Sales</span>
                </NavLink>
                <NavLink to="/admin/dashboard/fees" 
                    activeClassName="is-active" 
                    activeStyle={{ background: '#F4D03F', color: '#2C3E50'}} 
                    className={classes.my_profile_link}
                >
                    <img src={feeIcon} alt="fee icon" className={classes.icon} />
                    <span className={classes.link}>Fees</span>
                </NavLink>
                <NavLink to="/admin/dashboard/contracts" 
                    activeClassName="is-active" 
                    activeStyle={{ background: '#F4D03F', color: '#2C3E50'}} 
                    className={classes.my_profile_link}
                >
                    <img src={contractIcon} alt="contract icon" className={classes.icon} />
                    <span className={classes.link}>Contracts</span>
                </NavLink>
                <NavLink to="/admin/dashboard/calendar" 
                    activeClassName="is-active" 
                    activeStyle={{ background: '#F4D03F', color: '#2C3E50'}} 
                    className={classes.my_profile_link}
                >
                    <img src={scheduleIcon} alt="landlord icon" className={classes.icon} />
                    <span className={classes.link}>Calendar</span>
                </NavLink>
                <NavLink to="/admin/dashboard/offers" 
                    activeClassName="is-active" 
                    activeStyle={{ background: '#F4D03F', color: '#2C3E50'}} 
                    className={classes.my_profile_link}
                >
                    <img src={offerIcon} alt="offer icon" className={classes.icon} />
                    <span className={classes.link}>Offers</span>
                </NavLink>
                <NavLink to="/admin/dashboard/viewings" 
                    activeClassName="is-active" 
                    activeStyle={{ background: '#F4D03F', color: '#2C3E50'}} 
                    className={classes.my_profile_link}
                >
                    <img src={reservationIcon} alt="viewing icon" className={classes.icon} />
                    <span className={classes.link}>Viewings</span>
                </NavLink>
                <NavLink to="/users/login" 
                    activeClassName="is-active" 
                    activeStyle={{ background: '#F4D03F'}} 
                    onClick={handleLogout} 
                    className={classes.my_profile_link}
                >
                    <img src={logout} alt="logout-icon" className={classes.icon} />
                    <span className={classes.link}>Sign out</span>
                </NavLink>
                
            </div>

            <Switch style={{height: '100%'}}>
                <Route exact path="/admin/dashboard">
                    <DashboardPage 
                        sales={sales}
                        fees={fees}
                        todaySales={todaySales}
                        minus7Sales={minus7Sales}
                        minus14Sales={minus14Sales}
                        minus21Sales={minus21Sales}
                        minus28Sales={minus28Sales}
                        minus35Sales={minus35Sales}
                        contractsLastMonth={contractsLastMonth}
                        profitLastMonth={profitLastMonth}
                        profitThisYear={profitThisYear}
                        newUsersLastMonth={newUsersLastMonth}
                        getCustomProfitReport={getCustomProfitReport}
                    />
                </Route>
                <Route exact path="/admin/dashboard/users">
                    <Users 
                        users={users}
                        deleteUser={deleteUser}
                        alert={alert}
                        getUserDetails={getUserDetails}
                    />
                </Route>
                <Route exact path="/admin/dashboard/users/view_user/:id" component={ ViewUser}/>
                <Route exact path="/admin/dashboard/users/add_new_user">
                    <AddUser 
                        createUser={createUser}    
                    />
                </Route>
                <Route exact path="/admin/dashboard/users/edit_user/:id" component={EditUser} />
                <Route exact path="/admin/dashboard/properties">
                    <Properties 
                        properties={properties}
                        propertyDelete={propertyDelete}
                        propertyCreate={propertyCreate}
                        alert={alert}
                    />
                </Route>
                <Route exact path="/admin/dashboard/properties/add_new_property">
                    <AddProperty propertyCreate={propertyCreate} alert={alert} />
                </Route>
                <Route exact path="/admin/dashboard/properties/editProperty/:id" component={EditProperty} />                    
               
                <Route exact path="/admin/dashboard/landlords">
                    <Landlords 
                        landlords={landlords}
                        alert={alert}
                        deleteLandlord={deleteLandlord}
                    />
                </Route>
                <Route exact path="/admin/dashboard/landlords/add_new_landlord">
                    <AddLandlord 
                        createLandlord={createLandlord}
                    />
                </Route>
                <Route exact path="/admin/dashboard/landlords/view_landlord/:landlordId" component={ViewLandlord} />
                <Route exact path="/admin/dashboard/landlords/edit_landlord/:landlordId" component={EditLandlord} />
                <Route exact path="/admin/dashboard/calendar">
                    <Demo appointments={appointments}/>
                </Route>
                <Route exact path="/admin/dashboard/report-profit">
                    <Profit 
                        getCustomProfitReport={getCustomProfitReport}
                        customProfitReport={customProfitReport}
                        customProfitClear={customProfitClear}
                    />
                </Route>
                <Route exact path="/admin/dashboard/report-users">
                    <UsersReportPage 
                        getCustomUsersReport={getCustomUsersReport}
                        customUsersReportClear={customUsersReportClear}
                    />
                </Route>
                <Route exact path="/admin/dashboard/report-properties">
                    <PropertiesReportPage 
                        customPropertiesReportClear={customPropertiesReportClear}
                        getCustomPropertiesReport={getCustomPropertiesReport}
                    />
                </Route>
                <Route exact path="/admin/dashboard/report-contracts">
                    <ContractsReportPage 
                        customContractsReportClear={customContractsReportClear}
                        getCustomContractsReport={getCustomContractsReport}
                    />
                </Route>
                <Route exact path="/admin/dashboard/fees" >
                    <Fees />
                </Route>
                <Route exact path="/admin/dashboard/fees/add_new_fee">
                    <AddFee />
                </Route>
                <Route exact path="/admin/dashboard/fees/view_fee/:feeId" component={ViewFee} />
                <Route exact path="/admin/dashboard/fees/edit_fee/:feeId" component={EditFee} />
                <Route exact path="/admin/dashboard/sales">
                    <Sales 
                        alert={alert}
                        sales={sales}
                        deleteSale={deleteSale}
                    />
                </Route>
                <Route exact path="/admin/dashboard/sales/add_new_sale">
                    <AddSale 
                        createSale={createSale}
                    />
                </Route>
                <Route exact path="/admin/dashboard/sales/view_sale/:saleId" component={ViewSale} />
                <Route exact path="/admin/dashboard/sales/edit_sale/:saleId" component={EditSale} />
                <Route exact path="/admin/dashboard/contracts">
                    <Contracts 
                        contracts={contracts}
                        alert={alert}
                        deleteContract={deleteContract}
                    />
                </Route>
                <Route exact path="/admin/dashboard/contracts/add_new_contract">
                    <AddContract />
                </Route>
                <Route exact path="/admin/dashboard/contracts/view_contract/:contractId" component={ViewContract} />
                <Route exact path="/admin/dashboard/contracts/edit_contract/:contractId" component={EditContract} />
                <Route exact path="/admin/dashboard/offers" component={Offers} />
                <Route exact path="/admin/dashboard/viewings" component={Viewings} />
            </Switch>
            
        </div>
    )
}

export default Dashboard