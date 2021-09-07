import { makeStyles } from '@material-ui/core'
import React from 'react'
import lauraPic from '../../assets/images/expert.jpg'
import clarkPic from '../../assets/images/person4.jpg'
import martaPic from '../../assets/images/wom1.jpg'
import jhonnyPic from '../../assets/images/person1.jpg'
import michealPic from '../../assets/images/person3.jpg'
import dennisPic from '../../assets/images/person2.jpg'
import monikaPic from '../../assets/images/wom2.jpg'

const useStyles = makeStyles({
    container: {
        background: 'white',
        minHeight: 400,
        paddingBottom: '1em',

    },
    title_section: {
        textAlign: 'center',
        fontSize: '2.35rem',
        marginTop: '1em',
        marginBottom: '1.3em',
        paddingRight: '1em',
        paddingLeft: '1em'
    },
    agents_container: {
        display: 'flex',
        justifyContent: 'space-evenly',
        flexWrap: 'wrap'
    },
    card: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '1em 1.1em'
    },
    zone_name: {
        fontSize: '1.6rem',
        marginBottom: '0.4em'
    },
    card_img: {
        left: '50%',
        width: '125px',
        height: '125px',
        borderRadius: '50%',
        objectFit: 'cover',
    },
    agent_name: {
        fontSize: '1.2rem'
    }
})

function AgentsContent(props) {
    const classes = useStyles()

    return (
        <div className={classes.container}>
            <h2 className={classes.title_section}>Meet our Head Agents of the area</h2>
            <div className={classes.agents_container}>

                <div className={classes.card}>
                    <h3 className={classes.zone_name}>Crystal Palace</h3>
                    <img className={classes.card_img} src={lauraPic} alt="Agent Laura" style={{objectPosition: '20% 20%'}} />
                    <p className={classes.agent_name}>Laura</p>
                </div>

                <div className={classes.card}>
                    <h3 className={classes.zone_name}>Croydon</h3>
                    <img className={classes.card_img} src={clarkPic} alt="Agent Clark" />
                    <p className={classes.agent_name}>Clark</p>
                </div>

                <div className={classes.card}>
                    <h3 className={classes.zone_name}>Beckenham</h3>
                    <img className={classes.card_img} src={martaPic} alt="Agent Marta" />
                    <p className={classes.agent_name}>Marta</p>
                </div>

                <div className={classes.card}>
                    <h3 className={classes.zone_name}>Mitcham</h3>
                    <img className={classes.card_img} src={jhonnyPic} alt="Agent jhonny" style={{objectPosition: '0 150%'}} />
                    <p className={classes.agent_name}>Jhonny</p>
                </div>

                <div className={classes.card}>
                    <h3 className={classes.zone_name}>Wimbledon</h3>
                    <img className={classes.card_img} src={michealPic} alt="Agent Micheal" />
                    <p className={classes.agent_name}>Micheal</p>
                </div>

                <div className={classes.card}>
                    <h3 className={classes.zone_name}>Battersea</h3>
                    <img className={classes.card_img} src={dennisPic} alt="Agent Dennis" />
                    <p className={classes.agent_name}>Dennis</p>
                </div>

                <div className={classes.card}>
                    <h3 className={classes.zone_name}>Holloway</h3>
                    <img className={classes.card_img} src={monikaPic} alt="Agent Monika" style={{objectPosition: '20% 20%'}}/>
                    <p className={classes.agent_name}>Monika</p>
                </div>

            </div>
        </div>
    )
}

export default AgentsContent
