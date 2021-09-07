import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { SocialIcon } from 'react-social-icons'
import { Link } from 'react-router-dom'

const useStyles = makeStyles({
    footer: {
        background: '#2C3E50',
        color: 'white',
        fontSize: '1.2rem',
        padding: '1.2em 2.3em 1em',
    },
    first_batch: {
        display: 'flex',
        justifyContent: 'space-between',
        '@media (max-width: 1200px)': { 
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
        },
    },
    batch: {
        marginRight: '4em',
        '@media (max-width: 1200px)': {
            textAlign: 'center',
        }
    },
    second_batch: {
        display: 'flex',
        justifyContent: 'flex-end',
        fontSize: '0.85rem',
        '@media (max-width: 800px)': { 
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
        },
    },
    social: {
        marginLeft: '3em',
        '@media (max-width: 800px)': { 
            marginLeft: 0
        },
    },
    h3: {
        fontSize: '1.9rem',
        fontWeight: 'bold',
        marginBottom: '0.6em',
        '@media (max-width: 1200px)': { 
            marginTop: 30
        },
    },
    p: {
        marginRight: '2.2em',
    },
    social_buttons: {
        display: 'flex',
        justifyContent: 'center',
        height: '130px'
    },
    social_btn: {
        position: 'relative',
        transitionDuration: '0.2s',
        display: 'inline-block',
        margin: '10px',
        '&:hover': {
            paddingTop: '10px',
            transitionDuration: '0.2s',
        }
    },
    title_social: {
        textAlign: 'center',
    },
    a: {
        color: 'white',
        fontSize: '1.5rem',
        '&:hover': {
            textDecoration: 'underline'
        }
    },
    contact_box: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '1.3rem'
    },
    contact: {
        marginLeft: '0.7em',
        marginBottom: 0
    }
})

function Footer(props) {
    const classes = useStyles()

    return (
        <div className={classes.footer}>
            <div className={classes.first_batch}>
                <div className={classes.batch}>
                    <h3 className={classes.h3}>About VirtualHome</h3>
                    <Link to="/properties-to-buy" className={classes.a}><p>Buy</p></Link>
                    <Link to="/sell" className={classes.a}><p>Sell</p></Link>
                    <Link to="/properties-to-rent" className={classes.a}><p>Rent</p></Link>
                    <Link to="/let" className={classes.a}><p>Let</p></Link>
                    <Link to="/about-us" className={classes.a}><p>About us</p></Link>
                </div>
                <div className={classes.batch}>
                    <h3 className={classes.h3}>Popular searches</h3>
                    <Link to="" className={classes.a}><p>Holloway</p></Link>
                    <Link to="" className={classes.a}><p>Battersea</p></Link>
                    <Link to="" className={classes.a}><p>Crystal Palace</p></Link>
                </div>
                <div className={classes.batch}>
                    <h3 className={classes.h3}>Contact us</h3>
                    <div className={classes.contact_box}>
                        <i style={{fontSize: '1.5rem'}} className="ri-phone-line"></i><p className={classes.contact}>+44 (0) 20 3333 3333</p>
                    </div>
                    <div className={classes.contact_box}>
                    <i style={{fontSize: '1.5rem'}} className="fas fa-envelope"></i><a className={`${classes.a} ${classes.contact}`} href="mailto:fake@virtualhome.com">fake@virtualhome.com</a>
                    </div>
                </div>
                <div className={`${classes.batch}  ${classes.social}`}>
                    <h3 className={`${classes.h3} ${classes.title_social}`}>Follow us!</h3>
                    <div className={classes.social_buttons}>
                        <span className={classes.social_btn}><SocialIcon url="http://twitter.com/" fgColor="white"/></span>
                        <span className={classes.social_btn} ><SocialIcon url="https://www.facebook.com/" fgColor="white"/></span>
                        <span className={classes.social_btn}><SocialIcon url="https://www.youtube.com/" fgColor="white" /></span>
                        <span className={classes.social_btn}><SocialIcon url="https://www.linkedin.com/feed/" fgColor="white"/></span>
                        <span className={classes.social_btn}><SocialIcon url="https://www.pinterest.co.uk/" fgColor="white" /></span>
                        <span className={classes.social_btn}><SocialIcon url="https://www.instagram.com/" fgColor="white" /></span>
                    </div>
                </div>
            </div> 
            <div className={classes.second_batch}>
                <p className={classes.p}>© VirtualHome Estate Agents</p>
                <Link style={{color: 'white'}} to="/privacy-policy" className={classes.p}>Privacy & Cookies Policy</Link>
                <Link style={{color: 'white'}}  to="/term-and-conditions" className={classes.p}>Terms and Conditions</Link>
                <p className={classes.p}>Sitemap</p>
            </div>           
        </div>
    )
}

export default Footer