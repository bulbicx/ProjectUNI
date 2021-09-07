import { makeStyles } from '@material-ui/core'
import React from 'react'
import { Link } from 'react-router-dom'
import contractIcon from '../../assets/images/contract.png'
import { Loading } from '../LoadingComponent'
import { baseUrl } from '../../shared/baseUrl'
import { useSelector } from 'react-redux'
import ReactTooltip from 'react-tooltip';
import moment from 'moment'

const useStyles = makeStyles({
    container: {
        // padding: '2em',
        fontSize: '1.4rem',
        '@media (max-width: 1500px)': { 
            fontSize: '1.15rem'
        },
        width: '100%',
        height: '100%',
    },
    link_container: {
        height: '4.5em',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-end',
        fontSize: '1.6rem',
        marginLeft: '1em',
        '@media (max-width: 1500px)': { 
            fontSize: '1.35rem'
        }
    },
    content_page: {
        padding: '2em',
        width: '100%',
        height: '100%',
        background: '#F2F4F4'
    },
    content_details: {
        marginTop: '1.2em',
        boxShadow: '0px 0 5px 1px #707070'
    },
    link: {
        padding: '0 1em',
        color: '#AEB6BF',
        '&:hover': {
            textDecoration: 'none',
            borderBottom: '2px solid #34495E',
            color: '#34495E'
        }
    },
    current: {
        color: '#34495E',
        borderBottom: '2px solid #34495E',
        cursor: 'context-menu',
        '&:hover': {
            color: '#2C3E50',
        }
    },
    h1: {
        fontSize: '1.6rem',
        color: '#34495E',
        '@media (max-width: 1500px)': { 
            fontSize: '1.45rem'
        }
    },
    p: {
        marginBottom: 0,
        background: '#34495E',
        color: 'white',
        height: '2.5em',
        padding: '0 1em',
        display: 'flex',
        alignItems: 'center',
        fontSize: '1.6rem',
    },
    contract_row: {
        background: 'white',
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '1em',
    },
    document_section: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: '1em',
        '&:hover': {
            textDecoration: 'none'
        }
    },
    document_sub_section: {
        background: '#2C3E50',
        padding: '0.6em',
        borderRadius: '50%',
        '&:hover': {
            background: '#5D6D7E'
        }
    },
    document_text: {
        background: 'white'
    },
    main_document_text: {
        fontSize: '1.5rem',
        marginBottom: '0.9em',
        color: '#34495E'
    },
    sub_document_text: {
        fontSize: '1.2rem',
        color: '#34495E',
        marginBottom: 11
    },
    date_document_text: {
        fontSize: '0.9rem',
        color: '#808B96',
        fontStyle: 'italic',
        marginBottom: 0
    },
    view: {
        fontSize: '1.1rem',
        color: '#808B96'
    },
    hr: {
        margin: 0,
        border: '1px solid #808B96',
    }
})

const RenderDocument = ({doc}) => {
    const classes = useStyles()
    var formatter = new Intl.NumberFormat('en') //currecny

    return (
        <div className={classes.contract_row}>
            <div className={classes.document_text} style={{width: '100%'}}>
                <h2 className={classes.main_document_text}>Offer for property {doc.property.propertyName} ({doc.property.category}) </h2>
                <h2 className={classes.main_document_text}><b>Offered:</b> £{formatter.format(doc.offerSum)} </h2>
                <h2 className={classes.main_document_text}><b>State:</b> { doc.accepted === true ? 'accepted' : doc.declined ? 'declined' : 'on hold'}</h2>
                <p className={classes.sub_document_text}>Made by {doc.user.title} {doc.user.firstName} {doc.user.lastName}</p>
                <p className={classes.date_document_text}>Accepted {moment(doc.updatedAt).fromNow()}</p>
            <hr style={{width: '100%'}} />
            </div>
        </div>
    )
}

const RenderContract = ({contract, user}) => {
    const classes = useStyles()

    String.prototype.capitalize = function() {
        return this.charAt(0).toUpperCase() + this.substring(1).toLocaleLowerCase()
    }

    const aSt = 'public'
    let path = contract.document.length && contract.document.replace('\\', '/').split('/').join().replace(aSt, '').replace(',', '').replace(',', '')

    //https://localhost:3443/images/2714803.pdf
    return (
        <div className={classes.contract_row}>
            <div className={classes.document_text}>
                <h2 className={classes.main_document_text}>Tenancy Agreement (Signed By Tenant)</h2>
                <p className={classes.sub_document_text}>Signed by {user.title.capitalize()} {user.firstName.capitalize()} {user.lastName.capitalize()}</p>
                <p className={classes.date_document_text}>Created on  {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day:'2-digit'}).format(new Date(Date.parse(contract.updatedAt)))}</p>
            </div>
            <a className={classes.document_section} target="_blank" href={baseUrl + path} data-tip="View Document">
                <div className={classes.document_sub_section}>
                    <img  width="45" src={contractIcon} alt="contract" />
                </div>
                <p className={classes.view}>View</p>
            </a>
            <ReactTooltip place="top" type="info" effect="solid"/>
        </div>
    )
}

function MyContract(props) {
    const classes = useStyles()
    const user = props.loggedUser

    const offersList = useSelector(state => state.offers)
    const { offers } = offersList

    const getDocUser = offers && offers.filter(offer => offer.user._id === user._id && (offer.accepted === true || offer.declined === true))

    const showAllDocs = getDocUser && getDocUser.map((doc, i) => {
        return (
            <RenderDocument key={i} doc={doc} />
        )
    })

    if (props.contractsLoading) {
        return (
            <div>
                <div className={classes.container}>
                    <Loading />
                </div>
            </div>
        )
    }
    else if (props.contractsErr) {
        return (
            <div>
                <div className={classes.container}>
                    <h4>{props.contractsErr}</h4>
                </div>
            </div>
        )
    }
    else if (props.contracts.length > 0) {
        const allContracts = props.contracts.map(contract => {
            return (
                <div key={contract._id}>
                    <RenderContract contract={contract} user={user} />
                    <hr className={classes.hr} />
                </div>
            )
        })

        return (
            <div className={classes.container}>
                <div className={classes.link_container}>
                    <Link className={classes.link}  to="/users/account/my-tenancy">My Tenancy</Link>
                    <Link className={`${classes.link} ${classes.current}`} to="/users/account/my-tenancy/contract">My Contract</Link>
                </div>
                <div className={classes.content_page}>
                    <h1 className={classes.h1}>Tenancy documents</h1>
                    <hr />
                    <div className={classes.content_details}>
                        <p className={classes.p}>Tenancy documents</p>
                        {allContracts}
                    </div>
                    <div className={classes.content_details}>
                        <p className={classes.p}>Other documents</p>
                        {showAllDocs}
                    </div>
                </div>
            </div>
        )
    }
    else {
        return (
            <div className={classes.container}>
                <div className={classes.link_container}>
                    <Link className={classes.link}  to="/users/account/my-tenancy">My Tenancy</Link>
                    <Link className={`${classes.link} ${classes.current}`} to="/users/account/my-tenancy/contract">My Contract</Link>
                </div>
                <div className={classes.content_page}>
                    <h1 className={classes.h1}>Tenancy documents</h1>
                    <hr />
                    <p style={{marginTop: '2em'}}>You have no contract yet!</p>
                    <div className={classes.content_details}>
                        <p className={classes.p}>Other documents</p>
                        {showAllDocs}
                    </div>
                </div>
            </div>
        )
    }
}

export default MyContract