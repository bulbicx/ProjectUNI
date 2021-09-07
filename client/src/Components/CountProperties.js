import { makeStyles } from '@material-ui/core'
import React from 'react'

const useStyles = makeStyles({
    container: {
        background: 'white',
        width: '100%',
        padding: '1em 2em',
        border: '1px solid black',
    },
    count_text: {
        fontSize: '2rem',
    }
})

function CountProperties({propertiesCount, category}) {
    const classes = useStyles()

    return (
        <div className={classes.container}>
            <p className={classes.count_text}>{propertiesCount} Properties found for {category} in London</p>
        </div>
    )
}

export default CountProperties