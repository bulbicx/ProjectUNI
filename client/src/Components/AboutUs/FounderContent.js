import { makeStyles } from '@material-ui/core'
import React from 'react'
import coverBackgroundImg from '../../assets/images/offices.jpg'
import founderImg1 from '../../assets/images/JamesF.jpg'
import founderImg2 from '../../assets/images/karl.jpg'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles({
    container: {
        position: 'relative',
        minHeight: 550,
        '@media (max-width: 725px)': {
            maxHeight: 900,
        }
    },
    cover_img_el: {
        width: '100%',
        // display: 'block',
        objectFit: 'cover',
        minHeight: 550,
        height: 550,
        '@media (max-width: 725px)': {
            height: 900,
        }
    },
    card_elements: {
        position: 'absolute',
        top: '12%',
        display: 'flex',
        left: '25%',
        '@media (max-width: 1500px)': {
            left: '15%',
            '@media (max-width: 1100px)': {
                left: '7%',
                '@media (max-width: 725px)': {
                    flexDirection: 'column',
                    left: '20%',
                    top: '5%'
                }
            }
        }
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
    signature: {
        
    },
    other_card: {
        marginLeft: '15em',
        '@media (max-width: 1100px)': {
            marginLeft: '8em',
            '@media (max-width: 835px)': {
                marginLeft: '2em',
                '@media (max-width: 725px)': {
                    marginLeft: 0
                }
            }
        }
    }

})

function FounderContent(props) {
    const classes = useStyles()

    return (
        <div className={classes.container}>
            <img src={coverBackgroundImg} alt="cover background" className={classes.cover_img_el} />
            <div className={classes.card_elements}>
                <Card className={classes.root}>
                    <CardActionArea>
                        <CardMedia
                        className={classes.media}
                            image={founderImg1}
                            component="img"
                            alt="Card founder"
                            height="100"
                            title="Card founder"
                        />
                        <CardContent>
                            <Typography variant="body2" color="textSecondary" component="p">
                            “ I always admired people doing  the job of their dream in a place of their dream. As soon as I met Karl we knew this dream would be reality soon. What we offer to our loyal customer is a different service as nothing they have seen before.”
                            </Typography>
                            <Typography className={classes.signature}>
                                <br />
                            James K. K. 
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>

                <Card className={`${classes.root} ${classes.other_card}`}>
                    <CardActionArea>
                        <CardMedia
                        className={classes.media}
                            image={founderImg2}
                            component="img"
                            alt="Card founder2"
                            height="100"
                            title="Card founder2"
                        />
                        <CardContent>
                            <Typography variant="body2" color="textSecondary" component="p">
                            “People have to understand that the sky is the limit. We offer services which are the best you can ever find. Virtual Home is the place that we transform dreams into reality, believe it or not!”
                            <br />
                            <br />
                            <br />
                            </Typography>
                            <Typography className={classes.signature}>
                            Karl . J. B.
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </div>
        </div>
    )
}

export default FounderContent