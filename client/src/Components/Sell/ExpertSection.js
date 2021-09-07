import { makeStyles } from '@material-ui/core'
import React from 'react'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import firstImgCover from '../../assets/images/metting-client.jpg'
import backgroundImg from '../../assets/images/group-help.jpg'
import img_card from '../../assets/images/expert.jpg'

const useStyles = makeStyles({
    container: {
        minHeight: 1000,
    },
    first_section: {
        minHeight: 500,
        maxHeight: 500,
        position: 'relative',
    },
    first_img_cover: {
        width: '100%',
        maxWidth: '100%',
        display: 'block',
        objectFit: 'cover',
        minHeight: '500px',
        maxHeight: '500px',
        opacity: '0.70',
    },
    h2: {
        position: 'absolute',
        top: '20px',
        fontSize: '3.4rem',
        padding: '1em 0.7em',
        '@media (max-width: 700px)': { 
            fontSize: '2.5rem'
        },
    },
    p: {
        position: 'absolute',
        top: '150px',
        fontSize: '1.7rem',
        maxWidth: '900px',
        padding: '1em 1.5em',
        marginTop: '1em',
        '@media (max-width: 700px)': { 
            fontSize: '1.35rem'
        },
    },
    card: {
        position: "absolute",
        top: '1500px',
        right: '130px',
        '@media (max-width: 1325px)': { 
            top: '1750px',
            '@media (max-width: 940px)': { 
                top: '1950px',
                '@media (max-width: 605px)': { 
                    top: '2140px'
                },
            },
        },
    },
    root: {
        maxWidth: 310,
        maxHeight: 450,
        marginBottom: 25,
    },
    media: {
        maxHeight: 215,
        minHeight: 215
    },
    card_title: {
        textAlign: 'center',
        padding: '0.5em 0.8em',
        fontSize: '1.28rem'
    },
    btn_section: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    second_section: {
        minHeight: 500,
        position: 'relative',
        zIndex: -1
    },
    cover_img: {
        width: '100%',
        maxWidth: '100%',
        display: 'block',
        objectFit: 'cover',
        minHeight: '500px',
        maxHeight: '500px',
    }
})

function ExpertSection(props) {
    const classes = useStyles()

    const handleClick = () => {
        alert('Become part of the family and we will get you a personal agent!')
    }

    return (
        <div className={classes.container}>
            <div className={classes.first_section}>
                <img src={firstImgCover} alt="image cover section" className={classes.first_img_cover}/>
                <h2 className={classes.h2}>We help buyers along the way</h2>
                <p className={classes.p}>Our team of experts is in constant communication with the
                buyers. We help them on calculating their mortgage, we ease their process with their mortgage broker, solicitors and much more.</p>
            </div>
            <div className={classes.card}>
                <Card className={classes.root}>
                    <CardActionArea>
                        <Typography gutterBottom variant="h5" component="h3" className={classes.card_title}>
                            Meet with your local expert!
                        </Typography>
                        <CardMedia
                        className={classes.media}
                            image={img_card}
                            component="img"
                            alt="Card agent"
                            height="100"
                            title="Card agent"
                        />
                        <CardContent>
                            <Typography variant="body2" color="textSecondary" component="p">
                            Laura has won best seller month challenge in the Holloway area. Discover who might be your personal agent!
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                    <CardActions className={classes.btn_section}>
                        <Button onClick={handleClick} size="large" color="secondary">
                            Meet your agent!
                        </Button>
                    </CardActions>
                </Card>
            </div>
            <div className={classes.second_section}>
                <img src={backgroundImg} alt="background image" className={classes.cover_img} />
            </div>
        </div>
    )
}

export default ExpertSection