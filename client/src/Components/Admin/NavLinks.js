import React from 'react'
import { makeStyles } from '@material-ui/core'
import { NavLink } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { logoutUser } from '../../redux/ActionCreators'

import dashboardIcon from '../../assets/images/dashboard.png'
import propIcon from '../../assets/images/prop.png'
import landlordIcon from '../../assets/images/landlord.png'
import logout from '../../assets/images/logoutad.png'
import crowd from '../../assets/images/crowd.png'
import scheduleIcon from '../../assets/images/schedule.png'
import saleIcon from '../../assets/images/saleIcon.png'
import contractIcon from '../../assets/images/contractIcon.png'
import feeIcon from '../../assets/images/discount.png'
import onlineIcon from '../../assets/images/online-lesson.png'
import offerIcon from '../../assets/images/offerIcon.png'
import reservationIcon from '../../assets/images/reservation.png'

const useStyles = makeStyles({

})

export default function NavLinks() {
  const classes = useStyles()
  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(logoutUser())
  }

  return (
    <>
      <NavLink 
        className={`${classes.dropdown_link} dropdown-item`}
        to="/admin/dashboard"
        style={{background: 'white', color: 'black'}}
      > 
        <span className={classes.dropdown_item}>
            <img style={{marginRight: '0.4em', width: '1.5em'}} src={dashboardIcon} alt="dashboard icon" /> Dashboard
        </span>
      </NavLink>
  
      <NavLink
        className={`${classes.dropdown_link} dropdown-item`}
        to="/admin/dashboard/users"
      >
        <span className={classes.dropdown_item}>
        <img style={{marginRight: '0.4em', width: '1.5em'}} src={crowd} alt="user icon" /> Users
        </span>
      </NavLink>
          
      <NavLink
        className={`${classes.dropdown_link} dropdown-item`}
        to="/admin/dashboard/properties"
      > 
        <span className={classes.dropdown_item}>
        <img style={{marginRight: '0.4em', width: '1.5em'}} src={propIcon} alt="property icon" /> Properties
        </span>
      </NavLink>

      <NavLink 
        className={`${classes.dropdown_link} dropdown-item`}
        to="/admin/dashboard/landlords"
      > 
        <span className={classes.dropdown_item}>
        <img style={{marginRight: '0.4em', width: '1.5em'}} src={landlordIcon} alt="landlord icon" /> Landlords
        </span>
      </NavLink>

      <NavLink 
        className={`${classes.dropdown_link} dropdown-item`}
        to="/admin/dashboard/sales"
      > 
        <span className={classes.dropdown_item}>
        <img style={{marginRight: '0.4em', width: '1.5em'}} src={saleIcon} alt="sales icon" /> Sales
        </span>
      </NavLink>

      <NavLink 
        className={`${classes.dropdown_link} dropdown-item`}
        to="/admin/dashboard/fees"
      > 
        <span className={classes.dropdown_item}>
        <img style={{marginRight: '0.4em', width: '1.5em'}} src={feeIcon} alt="fee icon" /> Fees
        </span>
      </NavLink>

      <NavLink 
        className={`${classes.dropdown_link} dropdown-item`}
        to="/admin/dashboard/contracts"
      > 
        <span className={classes.dropdown_item}>
        <img style={{marginRight: '0.4em', width: '1.5em'}} src={contractIcon} alt="contract icon" /> Contracts
        </span>
      </NavLink>

      <NavLink 
        className={`${classes.dropdown_link} dropdown-item`}
        to="/admin/dashboard/calendar"
      > 
        <span className={classes.dropdown_item}>
        <img style={{marginRight: '0.4em', width: '1.5em'}} src={scheduleIcon} alt="calendar icon" /> Calendar
        </span>
      </NavLink>
  
      {/* <NavLink 
        className={`${classes.dropdown_link} dropdown-item`}
        to="/load"
      > 
        <span className={classes.dropdown_item}>
        <img style={{marginRight: '0.4em', width: '1.5em'}} src={onlineIcon} alt="viewing icon" /> Viewing
        </span>
      </NavLink> */}
          
      <span className={classes.dropdown_item} >  
        <a
          className={`${ classes.dropdown_link } dropdown-item`}
          href="http://localhost:8080/"
          target="_blank"
        >
          <img style={{ marginRight: '0.4em', width: '1.5em' }} src={onlineIcon} alt="viewing icon" />
          Viewing
        </a>
      </span>

      <NavLink 
        className={`${classes.dropdown_link} dropdown-item`}
        to="/admin/dashboard/offers"
      > 
        <span className={classes.dropdown_item}>
        <img style={{marginRight: '0.4em', width: '1.5em'}} src={offerIcon} alt="offer icon" /> Offers
        </span>
      </NavLink>

      <NavLink 
        className={`${classes.dropdown_link} dropdown-item`}
        to="/admin/dashboard/viewings"
      > 
        <span className={classes.dropdown_item}>
        <img style={{marginRight: '0.4em', width: '1.5em'}} src={reservationIcon} alt="view icon" /> Viewings
        </span>
      </NavLink>

      <NavLink
        className={`${classes.dropdown_link} dropdown-item`}
        onClick={handleLogout} 
        to="/users/login"
      > 
        <span className={classes.dropdown_item}>
        <img style={{marginRight: '0.4em', width: '1.5em'}} src={logout} alt="logout icon" /> Sign out
        </span>
      </NavLink>
    </>
  )
}
