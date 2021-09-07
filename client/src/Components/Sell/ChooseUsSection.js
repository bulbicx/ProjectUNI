import React from 'react'
import { makeStyles } from '@material-ui/core'
import '../global.css'

const useStyles = makeStyles({
    container: {
        background: 'white',
        minHeight: '500px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '2em 3em'
    },
    title_section: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        '@media (max-width: 600px)': { 
            textAlign: 'center'
        }
    },
    title: {
        fontSize: '3rem'
    },
    subtitle: {
        fontSize: '1.3rem',
        marginTop: '0.7em'
    },
    subsection: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '2em 1.5em'
    },
    sub: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        maxWidth: '330px',
        minHeight: '180px',
        maxHeight: '220px',
        padding: '1em 1.5em',
        margin: '1em 1.8em',
        textAlign: 'center',
    },
    h3: {
        fontSize: '1.85rem',
        margin: 0
    },
    p: {
        fontSize: '1rem',
        margin: '1em 0.9em'
    }
})

function ChooseUsSection(props) {
    const classes = useStyles()

    return (
        <div className={classes.container}>
            <div className={classes.title_section}>
                <h2 className={classes.title}>Why you should choose us?</h2>
                <p className={classes.subtitle}>Our team will make any effort for selling your property</p>
            </div>
            <div className={classes.subsection}>
                <div className={classes.sub}>
                    <h3 className={classes.h3}>Customized Service</h3>
                    <p className={classes.p}>We believe that every person needs
                        a customized service depending 
                        on their needs and schedule.
                    </p>
                </div>
                <div className={classes.sub}>
                    <h3 className={classes.h3}>More Advertisement</h3>
                    <p className={classes.p}>We make any advertisement so that
                        we sell your property in no time.</p>
                </div>
                <div className={classes.sub}>
                    <h3 className={classes.h3}>Best in the market</h3>
                    <p className={classes.p}>We are the best according to the
                        last year award!</p>
                </div>
            </div>
        </div>
    )
}

export default ChooseUsSection