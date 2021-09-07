import { makeStyles } from '@material-ui/core'
import React, {useEffect} from 'react'
import { NavLink, Switch, Route, useLocation } from 'react-router-dom'
import identity from '../../assets/images/id-card.png'
import tenancy from '../../assets/images/deal.png'
import heart from '../../assets/images/heart.png'
import agent from '../../assets/images/agent.png'
import logout from '../../assets/images/logout.png'
import Account from './Account'
import MyTenancy from '../MyTenancy/MyTenancy'
import MyProfile from './MyProfile'
import MyContract from '../MyTenancy/MyContract'
import MyFavourites from '../MyFavourites/MyFavourites'
import MyAgent from '../MyAgent/MyAgent'

const useStyles = makeStyles({
    container: {
        display: 'flex',
        position: 'relative',
        OObjectFit: 'fill',
        objectFit: 'fill',
    },
    left_board: {        
        minHeight: '800px',
        paddingTop: '5em',
        display: 'flex',
        flexDirection: 'column',
        position: 'absolute',
        top: '0%',
        minWidth: '380px',
        '@media (max-width: 1900px)': { 
            // width: '22%',
            '@media (max-width: 1500px)': { 
                minWidth: '6em',
                maxWidth: '6em',
                alignItems: 'flex-start',
                justifyContent: 'flex-start'
            }
        }
        // zIndex: -1
        // alignItems: 'flex-start'
    },
    sub_board: {
        minWidth: '380px',
        // width: '25%',
        minHeight: '800px',
        background: '#2C3E50',
        zIndex: -1,
        position: 'relative',
        '@media (max-width: 1900px)': { 
            // width: '22%',
            '@media (max-width: 1500px)': { 
                minWidth: '6em',
                maxWidth: '6em',
            }
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
            textDecoration: 'none'
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
        background: '',
    }
})

function DashboardUser({user, favourites, reviews, favLoadErr, contracts, allProperties, postReview, alert, auth, deleteFavourite, userIsLoading, userErrMess, logoutUser, deleteReview}) {
    const classes = useStyles()

    const location = useLocation()
    const contractsFiltered = contracts.contracts != null && contracts.contracts.filter(contract => user._id === contract.user._id)

    const todayDate = new Date()
    
    const presentTenancies = contractsFiltered && contractsFiltered.filter(contract => new Date(contract.end) >= todayDate)
    const pastTenancies = contractsFiltered && contractsFiltered.filter(contract => new Date(contract.end) < todayDate)
    
    
    
    const handleLogout = () => {
        logoutUser()
    }

    return (
        <div className={classes.container}>
            <div className={classes.sub_board}></div>
            <div className={classes.left_board}>
                
                <NavLink exact={true} 
                        activeClassName="is-active" 
                        activeStyle={{ background: '#F4D03F', color: 'white'}} 
                        style={{background: location.pathname == "/users/account/my-profile" && '#F4D03F', color: location.pathname == "/users/account/my-profile" && 'white'}}
                        to="/users/account" 
                        className={`${classes.my_profile_link} ${classes.active}`}
                    >
                    <img className={classes.icon} src={identity} alt="identity" />
                    <span className={classes.link}>My profile</span>
                </NavLink>
                <NavLink to="/users/account/my-tenancy"         
                        activeClassName="is-active" 
                        activeStyle={{ background: '#F4D03F', color: 'white'}} 
                        className={classes.my_profile_link}
                    >
                    <img src={tenancy} alt="tenancy-icon" 
                        className={classes.icon} />
                    <span className={classes.link}>My tenancy</span>
                </NavLink>
                <NavLink to="/users/account/my-favourites"  
                        activeClassName="is-active" 
                        activeStyle={{ background: '#F4D03F', color: 'white'}} 
                        className={classes.my_profile_link}
                    >
                        <img src={heart} alt="heart-icon" className={classes.icon} />
                        <span className={classes.link}>My favourites</span>
                </NavLink>
                <NavLink to="/users/account/my-agent" 
                        activeClassName="is-active" 
                        activeStyle={{ background: '#F4D03F', color: 'white'}} 
                        className={classes.my_profile_link}
                    >
                            <img src={agent} alt="agent-icon" className={classes.icon} />
                            <span className={classes.link}>My agent</span>
                </NavLink>
                <NavLink to="/users/login" 
                        activeClassName="is-active" 
                        activeStyle={{ background: '#F4D03F', color: 'white'}} 
                        onClick={handleLogout} 
                        className={classes.my_profile_link}
                    >
                            <img src={logout} alt="logout-icon" className={classes.icon} />
                            <span className={classes.link}>Sign out</span>
                </NavLink>
                
            </div>
            
            <Switch>
                <Route exact path="/users/account">
                    <Account 
                        loggedUser={user}
                        userIsLoading={userIsLoading}
                        userErrMess={userErrMess}
                    />
                </Route>
                <Route exact path="/users/account/my-profile">
                    <MyProfile 
                        loggedUser={user}
                        userIsLoading={userIsLoading}
                        userErrMess={userErrMess}
                    />
                </Route>
                <Route exact path="/users/account/my-tenancy">
                    <MyTenancy 
                        alert={alert}
                        tenancies={allProperties.filter(property => contractsFiltered.some(el => el.property._id === property._id))}
                        presentTenanciesAll={allProperties.filter(property => presentTenancies.some(el => el.property._id === property._id))}
                        pastTenanciesAll={allProperties.filter(property => pastTenancies.some(el => el.property._id === property._id))}
                        postReview={postReview}
                        contractsLoading={contracts.isLoading}
                        contractsErr={contracts.errMess}
                        reviews={reviews}
                        deleteReview={deleteReview}
                     />
                </Route>
                <Route exact path="/users/account/my-tenancy/contract">
                    <MyContract 
                        contracts={contractsFiltered}
                        loggedUser={user}
                        contractsLoading={contracts.isLoading}
                        contractsErr={contracts.errMess}
                    />
                </Route>
                <Route exact path="/users/account/my-favourites">
                    <MyFavourites 
                        favourites={favourites} 
                        favLoadErr={favLoadErr}
                        deleteFavourite={deleteFavourite}
                        alert={alert}
                    />
                </Route>
                <Route path="/users/account/my-agent">
                    <MyAgent />
                </Route>
            </Switch>
        </div>
    )
}

export default DashboardUser