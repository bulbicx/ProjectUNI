import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import background from '../../assets/images/met.png'

const useStyles = makeStyles({
    section_in_touch: {
        position: 'relative',
        minHeight: 500,
        height: '500px',
        '@media (max-width: 600px)': { 
            textAlign: 'center'
        }
    },
    img: {
        maxWidth: '100%',
        display: 'block',
        objectFit: 'cover',
        minHeight: '500px',
    },
    title: {
        position: 'absolute',
        top: '40px',
        paddingLeft: 124,
        '@media (max-width: 700px)': { 
            paddingLeft: 20,
            paddingRight: 20,
        },
    },
    last_p: {
        position: 'absolute',
        top: '420px',
        paddingLeft: 124,
        '@media (max-width: 700px)': { 
            paddingLeft: 20,
            paddingRight: 20,
        }
    },
    h2: {
        fontSize: '2.9rem',
        marginBottom: 15,
        '@media (max-width: 700px)': { 
            fontSize: '2.5rem',
        }
    },
    p1: {
        fontSize: '1.5rem',
        '@media (max-width: 700px)': { 
            fontSize: '1.2rem'
        }
    },
    p2: {
        fontSize: '1.5rem',
        '@media (max-width: 700px)': { 
            fontSize: '1.2rem',
        }
    }
})

function SectionInTouch(props) {
    const classes = useStyles();
    return (
        <div className={classes.section_in_touch}>
           <img className={classes.img} src={background} alt="background image"/>
           <div className={classes.title}>
                <h2 className={classes.h2}>Stay in touch with your personal assistant!</h2>
                <p className={classes.p1}>We strongly believe in creating relations between our agents and yourself!</p>
            </div>
            <div className={classes.last_p}>
                <p className={classes.p2}>Our main purpose is to help you along the way</p>
            </div>
        </div>
    )
}

export default SectionInTouch