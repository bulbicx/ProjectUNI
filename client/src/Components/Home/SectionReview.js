import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import backgroundImg from '../../assets/images/happy-man.jpg'
import starsImg from '../../assets/images/stars.png'

const useStyles = makeStyles({
    section_review: {
        position: 'relative',
        width: '100%',
        minHeight: 500,
        height: '500px',
        OObjectFit: 'fill',
        objectFit: 'fill',
        display: '-webkit-box',
        display: '-webkit-flex',
        display: '-ms-flexbox',
        display: 'flex',
        WebkitJustifyContent: 'flex-start',
        msFlexPack: 'flex-start',
        justifyContent: 'center',
        alignItems: 'center',
    },
    img: {
        width: '100%',
        maxWidth: '100%',
        objectFit: 'cover',
        OObjectFit: 'cover',
        minHeight: '500px',
        maxHeight: '500px'
    },
    header: {
        position: 'absolute',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        top: '10%',
        color: 'white',
        padding: '1em 0.8em',
        marginLeft: '2.4em'
    },
    star_img: {
        position: "absolute",
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        top: '50%',
        marginLeft: '2.4em',
        padding: '1em 0.8em',
        '@media (max-width: 700px)': { 
            top: '44%'
        },
    },
    parag: {
        position: 'absolute',
        marginLeft: '2.4em',
        padding: '1em 0.8em',
        top: '75%',
        color: 'white',
        '@media (max-width: 700px)': { 
            top: '64%'
        },
    },
    star_img_sub: {
        maxHeight: '100%',
        height: '55px',
        '@media (max-width: 700px)': { 
            height: '28px'
        },
    },
    h2: {
        fontSize: '2.4rem',
        '@media (max-width: 700px)': { 
            fontSize: '1.9rem'
        },
    },
    p: {
        fontSize: '1.2rem',
        '@media (max-width: 700px)': { 
            fontSize: '1rem',
        },
    }

})

function SectionReview(props) {
    const classes = useStyles()

    return (
        <div className={classes.section_review}>
            <img src={backgroundImg} className={classes.img} alt="background image"/>
            <div className={classes.header}>
                <h2 className={classes.h2}>"Very impressed with the overall<br/> experience. Our flat was better <br/>than expected!"</h2>
            </div>
            <div className={classes.star_img}>
                <img className={classes.star_img_sub} src={starsImg} alt="stars" />
            </div>
            <div className={classes.parag}>
                <p className={classes.p}>Jonhson Mc Culkin</p>
            </div>
        </div>
    )
}

export default SectionReview