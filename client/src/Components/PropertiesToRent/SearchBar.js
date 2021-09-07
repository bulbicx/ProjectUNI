import React, { useState, useEffect } from 'react'
import { Checkbox, makeStyles } from '@material-ui/core'
import AttachMoneyIcon from '@material-ui/icons/AttachMoney'
import SearchIcon from '@material-ui/icons/Search'
import SchoolIcon from '@material-ui/icons/School'
import PetsIcon from '@material-ui/icons/Pets'
import TrainIcon from '@material-ui/icons/Train'
import DirectionsWalkIcon from '@material-ui/icons/DirectionsWalk'
import HotelIcon from '@material-ui/icons/Hotel'
import Slider from '@material-ui/core/Slider'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import { useDispatch, useSelector } from 'react-redux'
import { isThereNextNextPageRent, isThereNextPageRent, searchRentProperty } from '../../redux/ActionCreators'

const useStyles = makeStyles((theme) => ({
    container: {
        minHeight: 116,
        width: '100%',
    },
    sub_container: {
        height: '100%',
        objectFit: 'cover',
        OObjectFit: 'cover',
        display: 'flex',
        width: '100%',
        '@media (max-width: 2000px)': { 
            flexDirection: 'column'
        }
    },
    search_bar_box: {
        width: '500',
        padding: '3.4em 3em 1em',
        height: '100%',
        borderRight: '1px black solid',
        borderBottom: '1px black solid',
        position: 'relative',
        '@media (max-width: 2000px)': { 
            width: '100%',
        }
    },
    search_input: {
        background: '#F1F2F4',
        padding: '0.6em 1em',
        fontSize: '1.1rem',
        width: '400px',
        borderRadius: '0.7em',
        boxShadow: '1px 0 10px 1px #707070',
        '@media (max-width: 2000px)': { 
            width: '90%',
        }
    },
    search_icon: {
        position: 'absolute',
        top: '57%',
        left: '83%',
        '@media (max-width: 2000px)': { 
            left: '85%',
            '@media (max-width: 1800px)': { 
                left: '80%',
                '@media (max-width: 855px)': { 
                    left: '75%',
                }
            }
        }
    },
    filter_container: {
        display: 'flex',
        width: '80%',
        '@media (max-width: 2000px)': { 
            width: '100%',
            '@media (max-width: 1550px)': { 
                flexDirection: 'column'
            }
        }
    },
    sub_filter_container: {
        display: 'flex',
        width: '50%',
        '@media (max-width: 1550px)': { 
            display: 'flex',
            width: '100%',
        }
    },
    school_section: {
        width: '33%',
        textAlign: 'center',
        borderLeft: '1px black solid',
        borderRight: '1px black solid',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: '100%',
        paddingTop: '2.1em',
        background: 'white',
        border: '1px black solid',
        minHeight: 119,
        position: 'relative',
        zIndex: 1,
    },
    pet_section: {
        width: '34%',
        textAlign: 'center',
        borderLeft: '1px black solid',
        borderRight: '1px black solid',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: '100%',
        paddingTop: '2.1em',
        background: 'white',
        border: '1px black solid',
        minHeight: 119,
    },
    tube_station_section: {
        width: '33%',
        textAlign: 'center',
        borderLeft: '1px black solid',
        borderRight: '1px black solid',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: '100%',
        paddingTop: '2.1em',
        background: 'white',
        border: '1px black solid',
        minHeight: 119,
        position: 'relative'
    },
    crime_section: {
        width: '34%',
        textAlign: 'center',
        borderLeft: '1px black solid',
        borderRight: '1px black solid',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: '100%',
        paddingTop: '2.1em',
        background: '',
        background: 'white',
        border: '1px black solid',
        minHeight: 119,
        position: 'relative'
    },
    crime_sub_box: {
        background: '#F9E79F',
        width:'100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingBottom: '1em',
        paddingTop: '1.5em'
    },  
    crime_div: {
        minHeight: '2em',
        width: '100%',
        cursor: 'pointer',
        '&:hover': {
            background: '#F4D03F'
        }
    },
    text_in: {
        fontSize: '1.1em'
    },   
    btn_section: {
        width: '16%',
        textAlign: 'center',
        borderLeft: '1px black solid',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: '100%',
        paddingTop: '2.1em',
        background: 'white',
        border: '1px black solid',
        minHeight: 119,
        '@media (max-width: 1550px)': { 
            width: '100%',
        },
    },
    btn: {
        background: '#2C3E50',
        padding: '0.4em 1.6em',
        fontSize: '1.3rem',
        borderRadius: '0.8em',
        color: 'white',
        '&:hover': {
            background: '#5D6D7E',
            fontSize: '1.35rem',
            cursor: 'pointer'
        }
    },
    price_box: {
        width: '33%',
        textAlign: 'center',
        border: '1px black solid',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: '100%',
        paddingTop: '2.1em',
        background: 'white',
        minHeight: 119,
        zIndex: 1,
        position: 'relative'
    },
    slider_container: {
        background: '#F9E79F',
        width:'100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingBottom: '1em',
        // zIndex: 1
    },
    slider: {
        paddingTop: '2em',
        width: 100 + theme.spacing(3) * 2,
    },
    clear_price_btn: {
        '&:hover': {
            textDecoration: 'underline',
            color: '#2c3e50',
            fontWeight: 'bold'
        }
    },
    bed_section: {
        width: '33%',
        textAlign: 'center',
        borderLeft: '1px black solid',
        borderRight: '1px black solid',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: '100%',
        paddingTop: '2.1em',
        background: '',
        background: 'white',
        border: '1px black solid',
        minHeight: 119,
        position: 'relative'
    },
    bed_sub_box: {
        background: '#F9E79F',
        width:'100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingBottom: '1em',
        paddingTop: '1.5em',
    },
    bed_div: {
        minHeight: '2em',
        width: '100%',
        cursor: 'pointer',
        '&:hover': {
            background: '#F4D03F'
        }
    },
    clear_btn: {
        paddingTop: '1em',
        '&:hover': {
            textDecoration: 'underline',
            color: '#2c3e50',
            fontWeight: 'bold'
        }
    },
}))



  const pricesMarks = [
    {
        value: 0,
        scaledValue: 500,
        label: '£500'
    },
    {
        value: 25,
        scaledValue: 1000,
        label: '£1k'
    },
    {
        value: 50,
        scaledValue: 5000,
        label: '£5k',
    },
    {
        value: 75,
        scaledValue: 10000,
        label: '£10k'
    },
    {
        value: 100,
        scaledValue: 15000,
        label: '£15k'
    },
  ]

  const scale = value => {
      const previousMarkIndex = Math.floor(value / 25)
      const previousMark = pricesMarks[previousMarkIndex]
      const remainder = value % 25
      if (remainder === 0) {
          return previousMark.scaledValue
      }
      const nextMark = pricesMarks[previousMarkIndex + 1]
      const increment = (nextMark.scaledValue - previousMark.scaledValue) / 25
      return remainder * increment + previousMark.scaledValue
  }

function numFormatter(num) {
    if (num > 999 && num < 1000000) {
        return (num / 1000).toFixed(0) + 'K' //convert to K for number from > 1000 and < 10000
    } 
    else if (num >= 1000000) {
        return (num / 1000000).toFixed(0) + 'M' //convert to M for number >= 1 million
    } 
    else if (num < 1000) {
        return num //if value < 1000 then nothing to do
    }
}

function SearchBar(props) {

    const classes = useStyles()
    const [value, setValue] = useState(100)

    const [searchValue, setSearchValue] = useState('')
    const [crimeRate, setCrimeRate] = useState(100)
    const [numBeds, setNumBeds] = useState(6) //6 means any
    const [school, setSchool] = useState(100)
    const [train, setTrain] = useState(100)
    
    const [locationChecked, setLocationChecked] = useState(true)
    const [moneyChecked, setMoneyChecked] = useState(false)
    const [schoolChecked, setSchoolChecked] = useState(false)
    const [petsChecked, setPetsChecked] = useState(false)
    const [trainChecked, setTrainChecked] = useState(false)
    const [crimeChecked, setCrimeChecked] = useState(false)
    const [bedChecked, setBedChecked] = useState(false)

    let limitPage = 30

    const dispatch = useDispatch()

    const handleSliderChange = (event, newValue) => {
        setValue(newValue)
    }

    const clearPrice = () => {
        setValue(100)
        setMoneyChecked(false)
    }

    const clearCrime = () => {
        setCrimeRate(100)
        setCrimeChecked(false)
    }

    const clearBed = () => {
        setNumBeds(6)
        setBedChecked(false)
    }

    const setBeds = (bed) => {
        setNumBeds(bed)
        setBedChecked(false)
    }

    const clearSchool = () => {
        setSchool(100)
        setSchoolChecked(false)
    }

    const setSchoolRadar = (miles) => {
        setSchool(miles)
        setSchoolChecked(false)
    }

    const clearTrain = () => {
        setTrain(100)
        setTrainChecked(false)
    }

    const setTrainRadar = (miles) => {
        setTrain(miles)
        setTrainChecked(false)
    }

    const handleChangeInput = (e) => {
        const {value} = e.target
        setSearchValue(value)
    }

    const setCrimeRateInput = (rate) => {
        setCrimeRate(rate)
        setCrimeChecked(false)
    }

    const handleCrimeTextChange = (text) => {
        let word = ''
        if (text == 25) {
            return word = 'less than 25%'
        }
        else if (text == 50) {
            return word = 'less than 50%'
        }
        else if (text == 75) {
            return word = 'less than 75%'
        }
    }

    const searchStuff = (search) => {
        let pet = petsChecked ? 'yes' : ''

        dispatch(searchRentProperty(search, scale(value), school, train, numBeds, crimeRate, pet, props.page, limitPage))

        dispatch(isThereNextPageRent(search, scale(value), school, train, numBeds, crimeRate, pet, props.page + 1, limitPage))

        dispatch(isThereNextNextPageRent(search, scale(value), school, train, numBeds, crimeRate, pet, props.page + 2, limitPage))
    }

    useEffect(() => {
        if (props.criteria !== null && searchValue === props.criteria) { //Whenever the search value changes and the criteria is chosen in homepage we search (2nd)
            searchStuff(props.criteria)
        } 
    }, [searchValue])

    useEffect(() => {//whenever the criteria is selected in homepage we set the search (1st)
        if (props.criteria !== null) {
            setSearchValue(props.criteria)
        } 
    }, [props.criteria])

    useEffect(() => {
        let pet = petsChecked ? 'yes' : ''

        dispatch(searchRentProperty(props.criteria ? props.criteria : searchValue, scale(value), school, train, numBeds, crimeRate, pet, props.page, limitPage))

        dispatch(isThereNextPageRent(props.criteria ? props.criteria : searchValue, scale(value), school, train, numBeds, crimeRate, pet, props.page + 1, limitPage))

        dispatch(isThereNextNextPageRent(props.criteria ? props.criteria : searchValue, scale(value), school, train, numBeds, crimeRate, pet, props.page + 2, limitPage))

    }, [props.page])
    
    /**
     * We need to track the state of has next and nextnext changes as page changes
     */
    // let propertiesList = useSelector(state => state.rentProperties)
    // const { hasNextPage, hasNextNextPage } = propertiesList
    
    //set up next and nextnext as they change
    // props.setHasNext(hasNextPage)
    // props.setHasNextNext(hasNextNextPage)

    const handleClickSearch = (e) => {
        let pet = petsChecked ? 'yes' : ''

        setCrimeChecked(false)
        setTrainChecked(false)
        setSchoolChecked(false)
        setBedChecked(false)
        setMoneyChecked(false)

        props.setPage(1)
        dispatch(searchRentProperty(searchValue, scale(value), school, train, numBeds, crimeRate, pet, props.page, limitPage))
        dispatch(isThereNextPageRent(searchValue, scale(value), school, train, numBeds, crimeRate, pet, props.page + 1, limitPage))
        dispatch(isThereNextNextPageRent(searchValue, scale(value), school, train, numBeds, crimeRate, pet, props.page + 2, limitPage))
        
    }


    return (
        <div className={classes.container}>
            <div className={classes.sub_container}>
                <div className={classes.search_bar_box}>
                    <input 
                        type="search"
                        id="searchBar"
                        placeholder="e.g. 'Holloway', 'Wimbledon' or 'Villa Giulia'"
                        className={classes.search_input}
                        value={searchValue}
                        onChange={handleChangeInput}
                    />
                    <div className={classes.search_icon}>
                    {    searchValue.length <= 0 &&
                    <SearchIcon />}
                    </div>
                </div>
                <div className={classes.filter_container} style={{zIndex: 1}}>
                <div className={classes.sub_filter_container}>
                <div style={{backgroundColor: moneyChecked && '#F9E79F'}} className={classes.price_box}>
                    <div style={{position: 'absolute', width: '100%'}}>
                    <FormControlLabel 
                        control={
                            <Checkbox 
                            checked={moneyChecked}
                            onChange={e => setMoneyChecked(e.target.checked)}
                            icon={<AttachMoneyIcon style={{ fontSize: 35 }} />}
                            checkedIcon={<AttachMoneyIcon style={{ fontSize: 38 }} />}
                            className={classes.checkbox}
                        />
                        }
                    label={<span style={{ fontSize: '1rem', fontWeight: "bold" }}>{value == 100 ? 'Any price' : `Up to £${scale(value)} pcm`} </span>}
                        labelPlacement="left"
                    />
                    {moneyChecked &&
                    <div className={classes.slider_container}>
                        <div className={classes.slider}>
                            <Slider
                                style={{ maxWidth: 500, color: '#2c3e50' }}
                                value={value}
                                min={0}
                                step={1}
                                max={100}
                                valueLabelFormat={numFormatter}
                                marks={pricesMarks}
                                scale={scale}
                                onChange={handleSliderChange}
                                valueLabelDisplay="auto"
                                aria-labelledby="non-linear-slider"
                            />
                            <button className={classes.clear_price_btn} onClick={clearPrice}>Clear</button>
                        </div>
                    </div>
                    }
                    </div>
                </div>
                <div className={classes.school_section} style={{backgroundColor: schoolChecked && '#F9E79F'}}>
                    <div style={{position: 'absolute', width: '100%'}}>
                    <FormControlLabel 
                        control={
                            <Checkbox 
                            checked={schoolChecked}
                            onChange={e => setSchoolChecked(e.target.checked)}
                            icon={<SchoolIcon style={{ fontSize: 35 }} />}
                            checkedIcon={<SchoolIcon style={{ fontSize: 38 }} />}
                            className={classes.checkbox}
                        />
                        }
                        label={<span style={{ fontSize: '1rem', fontWeight: "bold" }}>School: {school == 100 ? 'Any case' : `${school} miles` }</span>}
                        labelPlacement="left"
                    />
                    {schoolChecked &&
                        <div className={classes.bed_sub_box}>
                            <div className={classes.bed_div} onClick={() => setSchoolRadar(5)}>
                                <p className={classes.text_in}>within 5 miles</p>
                            </div>
                            <div className={classes.bed_div} onClick={() => setSchoolRadar(15)}>
                                <p className={classes.text_in}>within 15 miles</p>
                            </div>
                            <div className={classes.bed_div} onClick={() => setSchoolRadar(25)}>
                                <p className={classes.text_in}>within 25 miles</p>
                            </div>
                            <div className={classes.bed_div} onClick={() => setSchoolRadar(50)}>
                                <p className={classes.text_in}>within 50 miles</p>
                            </div>
                            <div className={classes.bed_div} onClick={() => setSchoolRadar(100)}>
                                <p className={classes.text_in}>Any case</p>
                            </div>
                            <button className={classes.clear_btn} onClick={clearSchool}>Clear</button>
                        </div>
                    }
                    </div>
                </div>
                <div className={classes.pet_section}>
                    <FormControlLabel 
                        control={
                            <Checkbox 
                            checked={petsChecked}
                            onChange={e => setPetsChecked(e.target.checked)}
                            icon={<PetsIcon style={{ fontSize: 35 }} />}
                            checkedIcon={<PetsIcon style={{ fontSize: 38 }} />}
                            className={classes.checkbox}
                        />
                        }
                        label={<span style={{ fontSize: '1rem', fontWeight: "bold" }}>Pets: {petsChecked ? 'allowed' : 'Any case'}</span>}
                        labelPlacement="left"
                    />
                </div>
                </div>
                <div className={classes.sub_filter_container}>
                <div style={{backgroundColor: trainChecked && '#F9E79F'}} className={classes.tube_station_section} >
                    <div style={{position: 'absolute', width: '100%'}}>
                    <FormControlLabel 
                        control={
                            <Checkbox 
                            checked={trainChecked}
                            onChange={e => setTrainChecked(e.target.checked)}
                            icon={<TrainIcon style={{ fontSize: 35 }} />}
                            checkedIcon={<TrainIcon style={{ fontSize: 38 }} />}
                            className={classes.checkbox}
                        />
                        }
                        label={<span style={{ fontSize: '1rem', fontWeight: "bold", '&:active': {textDecoration: 'underline'}  }}>Trains: {train == 100 ? 'Any case' : `${train} miles` }</span>}
                        labelPlacement="left"
                    />
                    {trainChecked &&
                        <div className={classes.bed_sub_box} >
                            <div className={classes.bed_div} onClick={() => setTrainRadar(5)}>
                                <p className={classes.text_in}>within 5 miles</p>
                            </div>
                            <div className={classes.bed_div} onClick={() => setTrainRadar(15)}>
                                <p className={classes.text_in}>within 15 miles</p>
                            </div>
                            <div className={classes.bed_div} onClick={() => setTrainRadar(25)}>
                                <p className={classes.text_in}>within 25 miles</p>
                            </div>
                            <div className={classes.bed_div} onClick={() => setTrainRadar(50)}>
                                <p className={classes.text_in}>within 50 miles</p>
                            </div>
                            <div className={classes.bed_div} onClick={() => setTrainRadar(100)}>
                                <p className={classes.text_in}>Any case</p>
                            </div>
                            <button className={classes.clear_btn} onClick={clearTrain}>Clear</button>
                        </div>
                    }
                    </div>
                </div>
                
                {/* <div> */}
                <div className={classes.bed_section} style={{backgroundColor: bedChecked && '#F9E79F'}} >
                    <div style={{position: 'absolute', width: '100%'}}>
                    <FormControlLabel 
                        control={
                            <Checkbox 
                            checked={bedChecked}
                            onChange={e => setBedChecked(e.target.checked)}
                            icon={<HotelIcon style={{ fontSize: 35 }} />}
                            checkedIcon={<HotelIcon style={{ fontSize: 38 }} />}
                            className={classes.checkbox}
                        />
                        }
                        label={<span style={{ fontSize: '1rem', fontWeight: "bold" }}>{numBeds == 6 ? 'All bedrooms' : `${numBeds} bedroom` }</span>}
                        labelPlacement="left"
                    />
                    {bedChecked &&
                        <div className={classes.bed_sub_box}>
                            <div className={classes.bed_div} onClick={() => setBeds(1)}>
                                <p className={classes.text_in}>1 bedroom</p>
                            </div>
                            <div className={classes.bed_div} onClick={() => setBeds(2)}>
                                <p className={classes.text_in}>2 bedrooms</p>
                            </div>
                            <div className={classes.bed_div} onClick={() => setBeds(3)}>
                                <p className={classes.text_in}>3 bedrooms</p>
                            </div>
                            <div className={classes.bed_div} onClick={() => setBeds(4)}>
                                <p className={classes.text_in}>4 bedrooms</p>
                            </div>
                            <div className={classes.bed_div} onClick={() => setBeds(5)}>
                                <p className={classes.text_in}>5 bedrooms</p>
                            </div>
                            <button className={classes.clear_btn} onClick={clearBed}>Clear</button>
                        </div>
                    }
                    </div>
                </div>
                {/* </div> */}

                <div className={classes.crime_section} style={{backgroundColor: crimeChecked && '#F9E79F'}} >
                    <div style={{position: 'absolute', width: '100%'}}>
                    <FormControlLabel 
                        control={
                            <Checkbox 
                            checked={crimeChecked}
                            onChange={e => setCrimeChecked(e.target.checked)}
                            icon={<DirectionsWalkIcon style={{ fontSize: 35 }} />}
                            checkedIcon={<DirectionsWalkIcon style={{ fontSize: 38 }} />}
                            className={classes.checkbox}
                        />
                        }
                        label={<span style={{ fontSize: '1rem', fontWeight: "bold" }}>Crime rate: <br />{crimeRate != 100 ? handleCrimeTextChange(crimeRate) : 'Any'}</span>}
                        labelPlacement="left"
                    />
                    {crimeChecked &&
                        <div className={classes.crime_sub_box}>
                            <div className={classes.crime_div} onClick={() => setCrimeRateInput(25)}>
                                <p className={classes.text_in}>Less than 25%</p>
                            </div>
                            <div className={classes.crime_div} onClick={() => setCrimeRateInput(50)}>
                                <p className={classes.text_in}>Less than 50%</p>
                            </div>
                            <div className={classes.crime_div} onClick={() => setCrimeRateInput(75)}>
                                <p className={classes.text_in}>Less than 75%</p>
                            </div>
                            <div className={classes.crime_div} onClick={() => setCrimeRateInput('Any')}>
                                <p className={classes.text_in}>Any</p>
                            </div>
                            <button className={classes.clear_btn} onClick={clearCrime}>Clear</button>
                        </div>
                    }
                    </div>
                </div>
                </div>
                <div className={classes.btn_section}>
                    <button onClick={handleClickSearch} onMouseDown={e => e.preventDefault()} className={classes.btn}>Search</button>
                </div>
                

                </div>
            </div>
        </div>
    )
}

export default SearchBar