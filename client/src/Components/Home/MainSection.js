import React, { useState } from 'react'
import { Route, Redirect, Link } from 'react-router-dom';
import mainPic from '../../assets/images/agency.jpg'
import { history } from '../../redux/helpers/history'
import { Checkbox, makeStyles } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import SchoolIcon from '@material-ui/icons/School';
import PetsIcon from '@material-ui/icons/Pets';
import TrainIcon from '@material-ui/icons/Train';
import DirectionsWalkIcon from '@material-ui/icons/DirectionsWalk';
import FormControlLabel from '@material-ui/core/FormControlLabel'
import { useSelector } from 'react-redux'
import ViewHomesMap from './ViewHomesMap'
import pin from '../../assets/images/pin.png'
import pinbuy from '../../assets/images/pinbuy.png'


const useStyles = makeStyles({
    main_section: {
        display: 'flex',
        width: '100%',
        minHeight: '60em',
        height: '100%',
        // height: '750px',
        transition: 'height 0.6s ease-out',
        justifyContent: 'center',
        backgroundColor: 'transparent',
        backgroundImage: 'none',
        backgroundSize: 'auto',
        opacity: 1,
        backgroundClip: 'border-box',
        OObjectFit: 'fill',
        objectFit: 'fill',
        position: 'relative',
        alignItems: 'center',
        fontFamily: 'sans-serif',
        '@media (max-width: 1840px)': { 
            minHeight: '90em',
        }
    },
    cover_image: {
        width: '100%',
        height: '100%',
        minHeight: '60em',
        backgroundPosition: '0px 0px',
        // backgroundSize: 'auto',
        opacity: 0.66,
        color: '#050505',
        OObjectFit: 'cover',
        objectFit: 'cover',
        '@media (max-width: 1840px)': { 
            minHeight: '90em',
        }
    },
    main_section_div: {
        position: 'absolute',
        textAlign: 'center',
        top: '2%'
    
    },
    main_section_header: {
        marginTop: '116px',
        color: '#2c3e50',
        fontSize: '5.35rem',
        padding: '0 2em',
        '@media (max-width: 1900px)': { 
            fontSize: '4.7rem',
            '@media (max-width: 1050px)': { 
                fontSize: '3.6rem',
                '@media (max-width: 650px)': { 
                    fontSize: '3.2rem'
                }
            },
        }
        
    },
    main_section_p: {
        marginTop: '16px',
        color: '#2c3e50',
        padding: '0 2em',
        fontSize: '1.9rem',
        '@media (max-width: 1900px)': { 
            fontSize: '1.6rem',
            '@media (max-width: 950px)': { 
                fontSize: '1.4rem',
            }
        }
    },
    main_section_button: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        // position: 'relative',
        padding: '0 2em',
        marginTop: '6em'
    },
    btn: {
        fontSize: '1.8rem',
        borderRadius: '2em',
        padding: '0.5em 1em',
        border: 'none',
        '@media (max-width: 1900px)': { 
            fontSize: '1.6rem',
            '@media (max-width: 950px)': { 
                fontSize: '1.4rem',
            }
        }
    },
    btn_yellow: {
        background: '#f4d03f',
        color: '#2c3e50',
        '&:hover': {
            backgroundColor: '#F9E79F',
            textDecoration: 'none',
            color: 'white'
        }
    },
    btn_blue: {
        background: '#2c3e50',
        color: 'white',
        '&:hover': {
            backgroundColor: '#5D6D7E',
            textDecoration: 'none',
            color: '#f4d03f'
        }
    },
    main_section_search: {
        // fontFamily: 'Effra-Medium,Arial,Geneva,sans-serif',
        background: '#EAEDED',
        marginTop: '3em',
        minHeight: '5em',
        padding: '2em',
        borderTopLeftRadius: '0.8em',
        borderTopRightRadius: '0.8em'
    },
    searchTab: {
        fontFamily: 'Effra-Medium,Arial,Geneva,sans-serif',
        // paddingBottom: '2em',
        // letterSpacing: '1px',
        marginBottom: 0
    },
    map_container: {
        height: '730px',
        width: '1200px',
    },
    cat_btn: {
        background: '#EB984E',
        padding: '0.3em 0.5em',
        fontWeight: 'bold',
        color: 'white',
        borderTopLeftRadius: '0.8em',
        borderTopRightRadius: '0.8em',
        margin: '0 0.3em',
        '&:hover': {
            cursor: 'pointer',
            background: '#F5CBA7'
        }
    },
    cat_btn_on: {
        padding: '0.3em 0.5em',
        fontWeight: 'bold',
        background: '#F2F3F4',
        borderTopLeftRadius: '0.8em',
        borderTopRightRadius: '0.8em',
        margin: '0 0.3em',
    },
    map_btn: {
        background: '#16A085',
        padding: '0.3em 0.5em',
        fontWeight: 'bold',
        color: 'white',
        borderTopLeftRadius: '0.8em',
        borderTopRightRadius: '0.8em',
        margin: '0 0.3em',
        '&:hover': {
            cursor: 'pointer',
            background: '#73C6B6'
        }
    },
    map_btn_on: {
        padding: '0.3em 0.5em',
        fontWeight: 'bold',
        background: '#F2F3F4',
        borderTopLeftRadius: '0.8em',
        borderTopRightRadius: '0.8em',
        margin: '0 0.3em',
    },
    zone_btn: {
        background: '#566573',
        padding: '0.3em 0.5em',
        fontWeight: 'bold',
        color: 'white',
        borderTopLeftRadius: '0.8em',
        borderTopRightRadius: '0.8em',
        margin: '0 0.3em',
        '&:hover': {
            cursor: 'pointer',
            background: '#808B96'
        }
    },
    zone_btn_on: {
        padding: '0.3em 0.5em',
        fontWeight: 'bold',
        background: '#F2F3F4',
        borderTopLeftRadius: '0.8em',
        borderTopRightRadius: '0.8em',
        margin: '0 0.3em',
    },
    error_text: {
        color: 'red'
    }
})

export default function MainSection(props) {
    const classes = useStyles()

    const [category, setCategory] = useState('')
    const [zone, setZone] = useState('')
    const [isError, setIsError] = useState(false)
    const [errorMsg, setErrorMsg] = useState('')

    const [isMapOpen, setIsMapOpen] = useState(false)
    const [isCatOpen, setIsCatOpen] = useState(false)
    const [isZoneOpen, setIsZoneOpen] = useState(false)
    const [criteria, setCriteria] = useState('')
    const [redirect, setRedirect] = useState(false)

    const propertiesList = useSelector(state => state.properties)
    const { properties } = propertiesList

    const propertiesToRent = properties.filter(p => p.category === 'rent')
    const propertiesToBuy = properties.filter(p => p.category === 'buy')


    const handleChangeCat = (e) => {
        setCategory(e.target.value)
    }

    const handleChangeZone = (e) => {
        setZone(e.target.value)
    }

    const switchTabMap = () => {
        setIsCatOpen(false)
        setIsMapOpen(true)
        setIsZoneOpen(false)
        setIsError(false)
        setErrorMsg('')
    }

    const switchTabCat = () => {
        setIsMapOpen(false)
        setIsCatOpen(true)
        setIsZoneOpen(false)
        setIsError(false)
        setErrorMsg('')
    }

    const switchTabZone = () => {
        setIsMapOpen(false)
        setIsCatOpen(false)
        setIsZoneOpen(true)
        setIsError(false)
        setErrorMsg('')
    }

    const searchByCategory = () => {
        if (category === '') {
            setIsError(true)
            setErrorMsg('A category must be chosen')
        }
        else {
            setIsError(false)
            setErrorMsg('')
            history.push(`/properties-to-${category}`)
        }
    }

    // const searchByZone = () => {
    //     if (category === '' && zone === '') {
    //         setIsError(true)
    //         setErrorMsg('Category and area must be selected')
    //     }
    //     else if (category === '') {
    //         setIsError(true)
    //         setErrorMsg('A category must be chosen')
    //     }
    //     else if (zone === '') {
    //         setIsError(true)
    //         setErrorMsg('An area of choice must be selected')
    //     }
    //     else {
    //         setIsError(false)
    //         setErrorMsg('')
    //         setRedirect(true)
    //         setCriteria(zone)
    //     }
    // }

    const searchByZoneForBuy = () => {
        if (zone === '') {
            setIsError(true)
            setErrorMsg('An area of choice must be selected')
        }
        else {
            setCategory('buy')
            setIsError(false)
            setErrorMsg('')
            setCriteria(zone)
            setRedirect(true)
        }
    }

    const searchByZoneForRent = () => {
        if (zone === '') {
            setIsError(true)
            setErrorMsg('An area of choice must be selected')
        }
        else {
            setCategory('rent')
            setIsError(false)
            setErrorMsg('')
            setCriteria(zone)
            setRedirect(true)
        }
    }

    if (redirect) {
        return (
            <Redirect
                to={{
                    pathname: `/properties-to-${ category }`,
                    state: { criteria: criteria }
                }}
            />
        )
    }
    else {

        return (
            <div className={classes.main_section} style={{height: isMapOpen ? '100%' : '785px'}}>
                <img src={mainPic} className={classes.cover_image} alt="main pic" style={{zIndex: -1}}/>
                <div className={classes.main_section_div}>
                    <div className="main_section_first">
                        <h1 className={classes.main_section_header}>London&#x27;s Estate Agent</h1>
                        <p className={classes.main_section_p}>Chosen for our service. Famous for our results.</p>
                    </div>
                    <div className={classes.main_section_button}>
                        <Link to="/users/signup" className={`${classes.btn} ${classes.btn_blue}`}>Instant Valuation</Link>
                        <Link to="/users/signup" className={`${classes.btn} ${classes.btn_yellow}`}>Jump the queue</Link>
                    </div>
                    <div className={classes.main_section_search}>
                        <h2 className={classes.searchTab}><SearchIcon style={{fontSize: '1.4em'}} /> Search properties by
                            <span
                                onClick={switchTabCat}
                                className={`${isCatOpen ? classes.cat_btn_on : classes.cat_btn}`}
                            >
                                Category
                            </span>
                            |
                            <span
                                onClick={switchTabMap}
                                className={`${isMapOpen ? classes.map_btn_on : classes.map_btn}`}
                            >
                                Map 
                            </span>
                            |
                            <span
                                onClick={switchTabZone}
                                className={`${isZoneOpen ? classes.zone_btn_on : classes.zone_btn}`}
                            >
                                Area
                            </span>
                        </h2>
                        {
                            isMapOpen ?
                            <div className={classes.map_container} style={{background: '#F2F3F4', padding: '2em', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                                <ViewHomesMap propertiesToRent={propertiesToRent} propertiesToBuy={propertiesToBuy} properties={properties} />
                                <div className="mt-3 p-1 d-flex justify-content-around align-items-center" style={{ width: '14em', background: '#F8F9F9', borderRadius: '0.3em' }}>
                                    <small>Legend: </small>
                                    <span className="d-flex justify-content-around align-items-center">
                                        <img src={pin} alt="rent pin" width="40" />
                                        <small className="ml-1">rent</small>
                                    </span>
                                    <span className="d-flex justify-content-around align-items-center">
                                        <img src={pinbuy} alt="buy pin" width="40" />
                                        <small>buy</small>
                                    </span>
                                </div>
                            </div>
                            :
                            isCatOpen ?
                            <div className="row d-flex justify-content-center" style={{background: '#F2F3F4', padding: '2em'}}>
                                <div className="col-md-2">
                                    <select className="form-control" onChange={(e) => handleChangeCat(e)}>
                                        <option value="">Select</option>
                                        <option value="buy">Buy</option>
                                        <option value="rent">Rent</option>
                                    </select>
                                </div>
                                <div className="col-md-3">
                                    <button onMouseDown={e => e.preventDefault()} className="form-control btn btn-dark font-weight-bold" onClick={searchByCategory}>Search</button>
                                </div>
                            </div>
                            :
                            isZoneOpen ?
                            <div className="row d-flex justify-content-center" style={{ background: '#F2F3F4', padding: '2em' }}>
                                {/* <div className="col-md-2">
                                    <label style={{ fontSize: '1.3rem' }}>Category</label>
                                    <select className="form-control" onChange={(e) => handleChangeCat(e)}>
                                        <option value="">Select</option>
                                        <option value="buy">Buy</option>
                                        <option value="rent">Rent</option>
                                    </select>
                                </div> */}
                                <div className="col-md-3">
                                    {/* <label style={{fontSize: '1.3rem'}}>Area</label> */}
                                    <select className="form-control" onChange={(e) => handleChangeZone(e)}>
                                        <option value="">Select</option>
                                        <option value="Crystal Palace">Crystal Palace</option>
                                        <option value="Croydon">Croydon</option>
                                        <option value="Beckenham">Beckenham</option>
                                        <option value="Mitcham">Mitcham</option>
                                        <option value="Wimbledon">Wimbledon</option>
                                        <option value="Battersea">Battersea</option>
                                        <option value="Holloway">Holloway</option>
                                    </select>
                                </div>
                                <div className="col-md-2 d-flex align-items-end">
                                    <button
                                        onMouseDown={e => e.preventDefault()}
                                        onClick={searchByZoneForBuy}
                                        className="form-control btn btn-dark"
                                    >
                                        For sale
                                    </button>
                                </div>
                                <div className="col-md-2 d-flex align-items-end">
                                    <button
                                        onMouseDown={e => e.preventDefault()}
                                        onClick={searchByZoneForRent}
                                        className="form-control btn btn-dark"
                                    >
                                        To rent
                                    </button>
                                </div>
                            </div>
                            :
                            <div></div>
                        }
                        {
                            isError && <p className={classes.error_text}>{ errorMsg }</p>
                        }
                    </div>
                </div>
            </div>
        )
    }
}
