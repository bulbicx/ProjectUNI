import { makeStyles } from '@material-ui/core'
import React from 'react'
import coverImg from '../../../assets/images/view.jpg'

const useStyles = makeStyles({
    container: {
        position: 'relative',
        width: '100%',
        minHeight: 600,
        height: '600px',
        // zIndex: -1,
        OObjectFit: 'fill',
        objectFit: 'fill',
        display: 'flex',
        WebkitJustifyContent: 'center',
        msFlexPack: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        '@media (max-width: 600px)': { 
            textAlign: 'center'
        }
    },
    cover_img: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        OObjectFit: 'cover',
        opacity: '0.70',
    },
    subsection: {
        position: 'absolute',
        top: '10%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    title_section: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: '3.6rem',
        textShadow: '2px 2px 0 #7B7D7D',
        color: 'white',
        '@media (max-width: 600px)': { 
            fontSize: '2.8rem'
        }
    },
    subtitle: {
        fontSize: '2.4rem',
        textShadow: '1px 1px 0 #9A7D0A',
        color: '#F4D03F',
        marginTop: '35px',
        '@media (max-width: 800px)': { 
            fontSize: '1.8rem'
        }
    },
    p: {
        color: 'white',
        marginTop: '20px',
        fontSize: '1.6rem',
        display: 'flex',
        justifyContent: 'center',
        marginTop: '110px',
        '@media (max-width: 800px)': { 
            fontSize: '1.15rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
        }

    },
    num: {
        position: 'relative',
        transitionDuration: '0.2s',
        display: 'inline-block',
        marginLeft: 8,
        marginRight: 8,
        '&:hover': {
            fontSize: '2.2rem',
            marginLeft: 12,
            marginRight: 12,
            transitionDuration: '0.2s',
        },
        '@media (max-width: 800px)': { 
            fontSize: '1.3rem',
            marginTop: '1em'
        }
    },
    ask: {
        position: 'relative',
        transitionDuration: '0.2s',
        display: 'inline-block',
        marginLeft: 8,
        marginRight: 8,
        '&:hover': {
            textDecoration: 'underline',
            transitionDuration: '0.2s',
        },
        '@media (max-width: 800px)': { 
            marginTop: '1em'
        }
    },
    a: {
        '@media (max-width: 800px)': { 
            marginTop: '1em'
        }
    },
    btn_section: {
        position: 'absolute',
        top: '460px',
        color: 'white'
    },
    btn: {
        backgroundColor: '#2C3E50',
        color: 'white',
        borderRadius: 30,
        padding: '10px 20px',
        '&:hover': {
            padding: '15px 30px'
        }
    }
})

function MainSection(props) {
    const classes = useStyles()

    return (
        <div className={classes.container}>
            <img style={{zIndex: -1}} className={classes.cover_img} src={coverImg} alt="background image" />
            <div className={classes.subsection}>
                <div className={classes.title_section}>
                    <h1 className={classes.title}>Sell with Virtual home</h1>
                    <p className={classes.subtitle}>Our agents will help you sell your properties in no time!</p>
                    <div className={classes.p}>
                        <div className={classes.a}>Call us on </div>
                        <a className={classes.num} href="#"> 020 12112121 </a>
                        <div className={classes.a}> or </div>
                        <a className={classes.ask} href="#">ask us a question</a>
                    </div>
                </div>
                {/* <div className={classes.btn_section}>
                    <Button className={classes.btn} variant="contained" >
                    Book appointment
                    </Button>
                </div> */}
            </div>
        </div>
    )
}

export default MainSection