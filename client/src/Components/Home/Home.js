import React from 'react'
import FeaturedProperties from './FeaturedProperties'
import MainSection from './MainSection'
import SectionInTouch from './SectionInTouch'
import SectionReview from './SectionReview'
import CookieBanner from 'react-cookie-banner';
import { Link } from 'react-router-dom'

const styles = {
    banner: {
      fontFamily: 'Source Sans Pro',
      height: 97,
      background: 'rgba(52, 64, 81, 0.88) url(/cookie.png) 20px 50% no-repeat',
      backgroundSize: '30px 30px',
      backgroundColor: '',
      fontSize: '1.4rem',
        fontWeight: 600,
        position: 'fixed',
        bottom: '0%',
        padding: '0.5em',
    },
    button: {
      border: '1px solid white',
      borderRadius: 4,
      width: 86,
      height: 42,
      lineHeight: '32px',
      background: 'transparent',
      color: 'white',
      fontSize: '1.3rem',
      fontWeight: 600,
      opacity: 1,
      right: 20,
      marginTop: -18
    },
    message: {
      display: 'block',
      padding: '9px 67px',
      lineHeight: 1.3,
      textAlign: 'left',
      marginRight: 244,
      color: 'white'
    },
    link: {
      textDecoration: 'none',
      fontWeight: 'bold'
    }
}
  
function Home({properties, propertiesLoading, propertiesErrMess, user, auth}) {

    const message = "VirtualHome uses cookies to improve your experience on our site. By continuing to browse the site you're agreeing to our use of cookies."
    
    return (
        <div style={{position: 'relative'}}>
            <MainSection />
            <FeaturedProperties 
                properties={properties} 
                propertiesLoading={propertiesLoading} 
                propertiesErrMess={propertiesErrMess} 
                auth={auth}
            />
            <CookieBanner
                styles={styles}
                message={message}
                link={<Link to="/cookie-policy"> To find out more, read our cookie policy</Link>}
                onAccept={() => {}}
                cookie="user-has-accepted-cookies"
                buttonMessage='Close'
                dismissOnClick={true}
                dismissOnScroll={false}
            />
            <SectionInTouch />
            <SectionReview />
        </div>
    )
}

export default Home