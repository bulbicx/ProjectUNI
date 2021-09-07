import React from 'react'
import { makeStyles } from '@material-ui/core' 
import backgroundImage from '../../assets/images/notAuthorized.png'

const useStyles = makeStyles({
    main_section: {
        display: 'flex',
        width: '100%',
        justifyContent: 'center',
        OObjectFit: 'fill',
        objectFit: 'fill',
        alignItems: 'center',
    },
    background_img: {
        width: '100%',
        zIndex: -2,
        OObjectFit: 'cover',
        objectFit: 'cover',
    }
})

export default function Unauthorized(props) {
    const classes = useStyles()
    return (
        <div className={classes.main_section}>
            <img className={classes.background_img} src={backgroundImage} alt="background not authorized" />
        </div>
    )
}
