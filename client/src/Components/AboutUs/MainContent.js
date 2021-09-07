import { makeStyles } from '@material-ui/core'
import React from 'react'
import coverImg from '../../assets/images/us.jpg'

// eslint-disable-next-line
const useStyles = makeStyles({
    container: {
        position: 'relative',
        width: '100%',
        minHeight: 500,
        height: '500px',
        OObjectFit: 'fill',
        objectFit: 'fill',
        display: 'flex',
        WebkitJustifyContent: 'center',
        msFlexPack: 'center',
        justifyContent: 'center',
        alignItems: 'center',
    },
    cover_img: {
        zIndex: -1,
        width: '100%',
        objectFit: 'cover',
        OObjectFit: 'cover',
        minHeight: 500,
        height: 500,
        opacity: '0.72'
    },
    main_content: {
        position: 'absolute',
        padding: '2.1em 2.2em 1.5em',
        top: '10%',
        color: 'white',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    h2: {
        fontSize: '3.7rem',
        textShadow: '2px 2px 0 #000',
        '@media (max-width: 825px)': {
            fontSize: '3rem',
        }
    },
    p: {
        fontSize: '2.4rem',
        textShadow: '1px 1px 0 #FFFFF0',
        color: '#2C3E50',
        marginTop: '1.5em',
        '@media (max-width: 825px)': {
            fontSize: '2rem',
            maxWidth: '550px',
        }
    }
})

function MainContent(props) {
    const classes = useStyles()

    return (
        <div className={classes.container}>
            <img src={coverImg} alt="background cover" className={classes.cover_img} />
            <div className={classes.main_content}>
                <h2 className={classes.h2}>About Virtual Home</h2>
                <p className={classes.p}>Founded by two of the best agents in the market</p>
            </div>
        </div>
    )
}

export default MainContent