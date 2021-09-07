import React, { useState } from 'react'
import { useStyles }from './styles/styles'
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem  } from 'reactstrap';
import { Link, NavLink, withRouter } from 'react-router-dom'
import logo from '../../assets/images/6-layers.png'
import logoIconHover from '../../assets/images/homeIconHover.png'
import FaceIcon from '@material-ui/icons/Face'
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom'
import FavoriteIcon from '@material-ui/icons/Favorite'
import AssignmentIcon from '@material-ui/icons/Assignment'
import DuoIcon from '@material-ui/icons/Duo';
import userIcon from '../../assets/images/user_icon.png'
import '../global.css'
import landlordIcon from '../../assets/images/landlord.png'
import logout from '../../assets/images/logoutad.png'
import crowd from '../../assets/images/crowd.png'
import scheduleIcon from '../../assets/images/schedule.png'
import saleIcon from '../../assets/images/saleIcon.png'
import contractIcon from '../../assets/images/contractIcon.png'
import propIcon from '../../assets/images/prop.png'
import dashboardIcon from '../../assets/images/dashboard.png'
import onlineIcon from '../../assets/images/online-lesson.png'
import feeIcon from '../../assets/images/discount.png'

function Header(props) {
  const styles = useStyles()
  
    const [isNavOpen, setIsNavOpen] = useState(false)
    const [dropdownOpen, setOpen] = useState(false)
 
  const toggle = () => setOpen(!dropdownOpen)
  
    String.prototype.capitalize = function() {
        return this.charAt(0).toUpperCase() + this.substring(1).toLocaleLowerCase()
    }

    const handleLogout = () => {
      toggleMenu()
      
      props.logoutUser()
    }

    const toggleMenu = () => {
      setIsNavOpen(!isNavOpen)
    }
    const inclusionArray = [
      '/',
      '/sell',
      '/let',
      '/about-us',
      '/users/signup',
      '/users/login',
      '/privacy-policy',
      '/term-and-conditions',
      '/cookie-policy',
      '/properties-to-buy',
      '/properties-to-rent',
      '/users/account',
      '/users/account/my-profile',
      '/users/account/my-tenancy',
      '/users/account/my-tenancy/contract',
      '/users/account/my-favourites',
      '/users/account/my-agent',
      '/load',
      '/auth/password/forgot',
      '/auth/password/reset'
  ]
  
  if (inclusionArray.indexOf( props.location.pathname) < 0) {
      return null
  }
  
    return (
      <div>
      <div  className={styles.nav_container}>
        <Link to="/">
          <img
            src={logo}
            alt="logo"
            className={styles.logo}
            onMouseOver={e => e.currentTarget.src = logoIconHover} 
            onMouseLeave={e => e.currentTarget.src = logo} 
          />
        </Link>

        <div className={styles.nav_link_area}>
          <div style={{display: 'flex', alignItems: 'center'}}>
            <NavLink 
              className={styles.nav_link}
              to="/properties-to-buy" 
              activeClassName="is-active" 
              activeStyle={{background: '#f4d03f', color: 'white'}} 
              onMouseDown={e => e.preventDefault()}>Buy</NavLink>
            <NavLink 
              className={styles.nav_link}
              to="/sell" 
              activeClassName="is-active" 
              activeStyle={{background: '#f4d03f', color: 'white'}} 
              onMouseDown={e => e.preventDefault()}>Sell</NavLink>
            <NavLink 
              className={styles.nav_link}
              to="/properties-to-rent" 
              activeClassName="is-active" 
              activeStyle={{background: '#f4d03f', color: 'white'}} 
              onMouseDown={e => e.preventDefault()}>Rent</NavLink>
            <NavLink 
              className={styles.nav_link}
              to="/let" 
              activeClassName="is-active" 
              activeStyle={{ background: '#f4d03f', color: 'white'}} 
              onMouseDown={e => e.preventDefault()}>Let</NavLink>
            <NavLink 
              className={styles.nav_link} 
              to="/about-us" 
              activeClassName="is-active" 
              activeStyle={{ background: '#f4d03f', color: 'white'}} 
              onMouseDown={e => e.preventDefault()}>About us</NavLink>
          </div>
          
            {//not authenticated
              !props.auth.isAuthenticated ?
            <div className={styles.login_container}>
              <div>
                <Link to="/users/login" className={styles.btn_login}><img src={userIcon} alt="user icon" style={{width: '1.9em', marginRight: '0.5em'}} />
                  Login
                </Link>
              </div> 
              <Link style={{color: '#2c3e50'}} to="/users/signup">not a member yet? Register!</Link>
            </div>
              :
            //admin
            localStorage.getItem('admin') === 'true' ?
            
              <ButtonDropdown 
                onMouseDown={e => e.preventDefault()} 
                className={styles.btn_drop} 
                isOpen={dropdownOpen} 
                toggle={toggle}
              >
              <DropdownToggle className={styles.btn_my_account} caret> 
                <img 
                  src={userIcon} 
                  alt="user icon" 
                  style={{width: '2.2em', marginRight: '0.5em', paddingLeft: 0}}
                />
              {props.auth.user.username.capitalize()}
              </DropdownToggle>
                    
              <DropdownMenu onMouseLeave={toggle} >
                <NavLink 
                  className={styles.dropdown_link} 
                  to="/admin/dashboard"
                > 
                  <DropdownItem className={styles.dropdown_item}>
                  <img style={{marginRight: '0.4em', width: '1.5em'}} src={dashboardIcon} alt="dashboard icon" /> Dashboard
                  </DropdownItem>
                </NavLink>
                      
                <NavLink
                  className={styles.dropdown_link}
                  to="/admin/dashboard/users"
                >
                  <DropdownItem className={styles.dropdown_item}>
                  <img style={{marginRight: '0.4em', width: '1.5em'}} src={crowd} alt="user icon" /> Users
                  </DropdownItem>
                </NavLink>
                      
                <NavLink
                  className={styles.dropdown_link}
                  to="/admin/dashboard/properties"
                > 
                  <DropdownItem className={styles.dropdown_item}>
                  <img style={{marginRight: '0.4em', width: '1.5em'}} src={propIcon} alt="property icon" /> Properties
                  </DropdownItem>
                </NavLink>

                <NavLink 
                  className={styles.dropdown_link} 
                  to="/admin/dashboard/landlords"
                > 
                  <DropdownItem className={styles.dropdown_item}>
                  <img style={{marginRight: '0.4em', width: '1.5em'}} src={landlordIcon} alt="landlord icon" /> Landlords
                  </DropdownItem>
                </NavLink>

                <NavLink 
                  className={styles.dropdown_link} 
                  to="/admin/dashboard/sales"
                > 
                  <DropdownItem className={styles.dropdown_item}>
                  <img style={{marginRight: '0.4em', width: '1.5em'}} src={saleIcon} alt="sales icon" /> Sales
                  </DropdownItem>
                </NavLink>
                
                <NavLink 
                  className={styles.dropdown_link} 
                  to="/admin/dashboard/fees"
                > 
                  <DropdownItem className={styles.dropdown_item}>
                  <img style={{marginRight: '0.4em', width: '1.5em'}} src={feeIcon} alt="fee icon" /> Fees
                  </DropdownItem>
                </NavLink>

                <NavLink 
                  className={styles.dropdown_link} 
                  to="/admin/dashboard/contracts"
                > 
                  <DropdownItem className={styles.dropdown_item}>
                  <img style={{marginRight: '0.4em', width: '1.5em'}} src={contractIcon} alt="contract icon" /> Contracts
                  </DropdownItem>
                </NavLink>

                <NavLink 
                  className={styles.dropdown_link} 
                  to="/admin/dashboard/calendar"
                > 
                  <DropdownItem className={styles.dropdown_item}>
                  <img style={{marginRight: '0.4em', width: '1.5em'}} src={scheduleIcon} alt="calendar icon" /> Calendar
                  </DropdownItem>
                </NavLink>
                      
                {/* <NavLink 
                  className={styles.dropdown_link} 
                  to="/load"
                > 
                  <DropdownItem className={styles.dropdown_item}>
                  <img style={{marginRight: '0.4em', width: '1.5em'}} src={onlineIcon} alt="viewing icon" /> Viewing
                  </DropdownItem>
                </NavLink> */}
                      
                <span className={styles.dropdown_item} style={{marginLeft: '1em'}}>  
                  <span>
                    <a className={styles.dropdown_link}  href="http://localhost:8080/" target="_blank" ><img style={{marginRight: '0.4em', width: '1.5em'}} src={onlineIcon} alt="viewing icon" />Viewing</a>
                  </span>        
                </span>
                <NavLink
                  className={styles.dropdown_link}
                  onClick={handleLogout} 
                  to="/users/login"
                > 
                  <DropdownItem className={styles.dropdown_item}>
                  <img style={{marginRight: '0.4em', width: '1.5em'}} src={logout} alt="logout icon" /> Sign out
                  </DropdownItem>
                </NavLink>
                      
                </DropdownMenu>
                    
            </ButtonDropdown>
            :
            //User  
            <ButtonDropdown 
              onMouseDown={e => e.preventDefault()} 
              className={styles.btn_drop} 
              isOpen={dropdownOpen} 
              toggle={toggle}
            >
              <DropdownToggle className={styles.btn_my_account} caret> 
              <img 
                src={userIcon} 
                alt="user icon" 
                style={{width: '2.2em', marginRight: '0.5em', paddingLeft: 0}}
              />
              {props.auth.user && props.auth.user.username.capitalize()}
              </DropdownToggle>
                      
                <DropdownMenu onMouseLeave={toggle} >
                  <NavLink 
                    className={styles.dropdown_link} 
                    to="/users/account"
                  > 
                    <DropdownItem className={styles.dropdown_item}>
                      <FaceIcon style={{marginRight: '0.4em'}}/> My Profile
                    </DropdownItem>
                  </NavLink>
                        
                  <NavLink
                    className={styles.dropdown_link}
                    to="/users/account/my-tenancy"
                  >
                    <DropdownItem className={styles.dropdown_item}>
                      <AssignmentIcon style={{marginRight: '0.4em'}}/> My Tenancy
                    </DropdownItem>
                  </NavLink>
                        
                  <NavLink
                    className={styles.dropdown_link}
                    to="/users/account/my-favourites"
                  > 
                    <DropdownItem className={styles.dropdown_item}>
                      <FavoriteIcon style={{marginRight: '0.4em'}}/>My Favourites
                    </DropdownItem>
                  </NavLink>
                        
                  {/* <NavLink 
                    className={styles.dropdown_link} 
                    to="/load"
                  > 
                    <DropdownItem className={styles.dropdown_item}>
                      <FaceIcon style={{marginRight: '0.4em'}}/> Viewing
                    </DropdownItem>
                  </NavLink> */}
                      
                  <a className={`${ styles.dropdown_item } ${ styles.dropdown_link }`} href="http://localhost:8080/" target="_blank" >
                    <DropdownItem className={styles.dropdown_item}>
                      <DuoIcon style={{ marginRight: '0.4em' }} />Viewing
                    </DropdownItem>
                  </a>
                      
                  <NavLink
                    className={styles.dropdown_link}
                    onClick={handleLogout} 
                    to="/users/login"
                  > 
                    <DropdownItem className={styles.dropdown_item}>
                      <MeetingRoomIcon style={{marginRight: '0.4em'}}/>Sign out
                    </DropdownItem>
                  </NavLink>
                        
                </DropdownMenu>
                      
              </ButtonDropdown>
            }
            
          
        <div className={styles.burgermenu} onClick={toggleMenu} >
          <div className={styles.bar1} style={{transform: isNavOpen && 'rotate(-45deg) translate(-9px, 6px)', transform: isNavOpen && 'rotate(-45deg) translate(-9px, 6px)'}}></div>
          <div className={styles.bar2} style={{opacity: isNavOpen && 0}}></div>
          <div className={styles.bar3} style={{transform: isNavOpen && 'rotate(45deg) translate(-8px, -8px)', transform: isNavOpen && 'rotate(45deg) translate(-8px, -8px)'}}></div>
        </div>
      </div>
      </div>
          {
            isNavOpen && 
              <div className={styles.hidden_nav}>
                <NavLink 
                  className={styles.nav_link2}
                  to="/properties-to-buy" 
                  activeClassName="is-active" 
                  activeStyle={{background: '#f4d03f', color: 'white'}} 
                  onClick={toggleMenu}
                  onMouseDown={e => e.preventDefault()}>Buy</NavLink>
                <NavLink 
                  className={styles.nav_link2}
                  to="/sell" 
                  activeClassName="is-active" 
                  activeStyle={{background: '#f4d03f', color: 'white'}} 
                  onClick={toggleMenu}
                  onMouseDown={e => e.preventDefault()}>Sell</NavLink>
                <NavLink 
                  className={styles.nav_link2}
                  to="/properties-to-rent" 
                  activeClassName="is-active" 
                  activeStyle={{background: '#f4d03f', color: 'white'}} 
                  onClick={toggleMenu}
                  onMouseDown={e => e.preventDefault()}>Rent</NavLink>
                <NavLink 
                  className={styles.nav_link2}
                  to="/let" 
                  activeClassName="is-active" 
                  activeStyle={{ background: '#f4d03f', color: 'white'}} 
                  onClick={toggleMenu}
                  onMouseDown={e => e.preventDefault()}>Let</NavLink>
                <NavLink 
                  className={styles.nav_link2} 
                  to="/about-us" 
                  activeClassName="is-active" 
                  activeStyle={{ background: '#f4d03f', color: 'white'}} 
                  onClick={toggleMenu}
                  onMouseDown={e => e.preventDefault()}>About us</NavLink>
                  <hr />
                  <div style={{borderTop: '3px black solid', width: '100%', paddingTop: '2em'}}></div>
                  
                  { props.auth.isAuthenticated &&
                  <>
                  <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <img src={userIcon} alt="user icon" style={{width: '4.2em'}}/>
                    {/* name of person loggin in */}
                    <div style={{fontSize: '1.3rem'}}>{props.auth.user.username.capitalize()}</div>
              </div>
              {
                localStorage.getItem('admin') === 'true' ?
                <>
                <Link 
                  className={styles.nav_link2} 
                  to="/admin/dashboard" 
                  onClick={toggleMenu} 
                  onMouseDown={e => e.preventDefault()}><img style={{marginRight: '0.4em', width: '1.5em'}} src={dashboardIcon} alt="dashboard icon" /> Dashboard
                </Link>
                <Link 
                  className={styles.nav_link2} 
                  to="/admin/dashboard/users" 
                  onClick={toggleMenu} 
                  onMouseDown={e => e.preventDefault()}><img style={{marginRight: '0.4em', width: '1.5em'}} src={crowd} alt="users icon" /> Users
                </Link>
                <Link 
                  className={styles.nav_link2}  
                  to="/admin/dashboard/properties" 
                  onClick={toggleMenu} 
                  onMouseDown={e => e.preventDefault()}><img style={{marginRight: '0.4em', width: '1.5em'}} src={propIcon} alt="property icon" /> Properties
                </Link>
                <Link 
                  className={styles.nav_link2}  
                  to="/admin/dashboard/landlords" 
                  onClick={toggleMenu} 
                  onMouseDown={e => e.preventDefault()}><img style={{marginRight: '0.4em', width: '1.5em'}} src={landlordIcon} alt="landlord icon" /> Landlords
                </Link>
                <Link 
                  className={styles.nav_link2}  
                  to="/admin/dashboard/sales" 
                  onClick={toggleMenu} 
                  onMouseDown={e => e.preventDefault()}><img style={{marginRight: '0.4em', width: '1.5em'}} src={saleIcon} alt="sales icon" /> Sales
                </Link>
                <Link 
                  className={styles.nav_link2}  
                  to="/admin/dashboard/fees" 
                  onClick={toggleMenu} 
                  onMouseDown={e => e.preventDefault()}><img style={{marginRight: '0.4em', width: '1.5em'}} src={feeIcon} alt="fee icon" /> Fees
                </Link>
                <Link 
                  className={styles.nav_link2}  
                  to="/admin/dashboard/contracts" 
                  onClick={toggleMenu} 
                  onMouseDown={e => e.preventDefault()}><img style={{marginRight: '0.4em', width: '1.5em'}} src={contractIcon} alt="contract icon" /> Contracts
                </Link>
                <Link 
                  className={styles.nav_link2}  
                  to="/admin/dashboard/calendar" 
                  onClick={toggleMenu} 
                  onMouseDown={e => e.preventDefault()}><img style={{marginRight: '0.4em', width: '1.5em'}} src={scheduleIcon} alt="calendar icon" /> Calendar
                </Link>
                <Link 
                  className={styles.nav_link2}  
                  to="/load" 
                  onClick={toggleMenu} 
                  onMouseDown={e => e.preventDefault()}><img style={{marginRight: '0.4em', width: '1.5em'}} src={onlineIcon} alt="vieqing icon" /> Viewing
                </Link>
                <Link 
                  className={styles.nav_link2}  
                  to="/users/login" 
                  onClick={handleLogout} 
                  onMouseDown={e => e.preventDefault()}><img style={{marginRight: '0.4em', width: '1.5em'}} src={logout} alt="logout icon" /> Sign out
                </Link>
                </>
                :
                <>
                <Link 
                  className={styles.nav_link2} 
                  to="/users/account" 
                  onClick={toggleMenu} 
                  onMouseDown={e => e.preventDefault()}
                ><FaceIcon /> My Profile
                </Link>
                    
                <Link 
                  className={styles.nav_link2} 
                  to="/users/account/my-tenancy" 
                  onClick={toggleMenu} 
                  onMouseDown={e => e.preventDefault()}
                ><AssignmentIcon />My Tenancy
                </Link>
                    
                <Link 
                  className={styles.nav_link2}  
                  to="/users/account/my-favourites" 
                  onClick={toggleMenu} 
                  onMouseDown={e => e.preventDefault()}
                ><FavoriteIcon />My Favourites
                </Link>
                
                <a className={styles.nav_link2} href="http://localhost:8080/" target="_blank" >    
                    <DuoIcon style={{ marginRight: '0.4em' }} />Viewing
                </a>
                    
                <Link 
                  className={styles.nav_link2}  
                  to="/users/login" 
                  onClick={handleLogout} 
                  onMouseDown={e => e.preventDefault()}
                ><MeetingRoomIcon />Sign out
                </Link>
                </>
              }
              </>
                  }
                  {!props.auth.isAuthenticated && 
                    <div>
                      <div>
                        <Link to="/users/login" onClick={toggleMenu} className={styles.btn_login}><img src={userIcon} alt="user icon" style={{width: '2.2em', marginRight: '0.5em'}}  />
                          Login
                        </Link>
                      </div> 
                      <Link style={{color: '#2c3e50'}} to="/users/signup" onClick={toggleMenu} >not a member yet? Register!</Link>
                    </div>  
                  }
              </div>
          }
      </div>
     
    )
}

export default withRouter(Header)