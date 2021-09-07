import React from 'react'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles({
    container: {
        padding: '2em',
        fontSize: '1.4rem',
        '@media (max-width: 1500px)': { 
            fontSize: '1.15rem'
        }
    },
    link_container: {
        display: 'flex',
        flexDirection: 'row',
        fontSize: '1.6rem',
        '@media (max-width: 1500px)': { 
            fontSize: '1.35rem'
        }
    },
    content_page: {
        padding: '1em'
    },
    content_details: {
        padding: '1em'
    },
    link: {
        padding: '0 1.1em 1.1em 0',
        textDecoration: 'underline',
        color: '#2C3E50',
    },
    h1: {
        fontSize: '1.5rem',
        '@media (max-width: 1500px)': { 
            fontSize: '1.25rem'
        }
    },
    p: {
        marginBottom: '0.5em'
    },
})

function MyAgent(props) {
    const classes = useStyles()

    return (
        <div className={classes.container}>
            <div className={classes.link_container}>
                <p className={classes.link} to="/users/account/my-tenancy">My Agent</p>
            </div>
            <div className={classes.content_page}>
                <h1 className={classes.h1}>You have no agent yet!</h1>
                <div className={classes.content_details}>
                    <p className={classes.p}></p>
                </div>
            </div>
        </div>
    )
}

export default MyAgent