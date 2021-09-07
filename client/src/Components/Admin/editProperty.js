import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {useDispatch, useSelector} from 'react-redux'
import TextField from '@material-ui/core/TextField'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import FormHelperText from '@material-ui/core/FormHelperText'
import InputLabel from '@material-ui/core/InputLabel'
import InputAdornment from '@material-ui/core/InputAdornment';
import { makeStyles } from '@material-ui/core' 
import { baseUrl } from '../../shared/baseUrl'
import { getPropertyDetails, updateProperty } from "../../redux/ActionCreators";
import { Loading } from '../LoadingComponent'
import propertyIcon from '../../assets/images/houseIcon.png'
import loc from './locationAreas'
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom'
 

const useStyles = makeStyles((theme) => ({
    main_container: {
        marginTop: '4.4em',
        background: '#E6EFFE',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        height: '100%',
        alignItems: 'center',
        margin: '3em auto',
        borderRadius: '2.2em'
    },
    title_section_property_edit: {
        display: 'flex',
        alignItems: 'flex-end',
        padding: '1.8em 2em',
    },
    title_property_edit: {
        fontSize: '3rem',
        color: '#6B8FF9',
        marginLeft: '0.6em',
        marginBottom: 0
    },
    property_form: {
        display: 'flex',
        flexDirection: 'row',
        padding: '2em',
    },
    left_section: {
        marginRight: '3.5em'
    },
    textField: {
        margin: theme.spacing(2),
        background: 'white'
    },
    multiselector: {
        margin: theme.spacing(2),
    },
    further_det_station_section: {
        display: 'flex'
    },
    extra_section: {
        background: '#B2C5FC',
        borderRadius: '1.1em',
        marginLeft: '1em'
    },
    extra_det_title: {
        margin: '1em 0 0.3em 0.65em',
    },
    btn_submit_form: {
        padding: '0.8em 2.4em',
        border: 'none',
        borderRadius: '1.8em',
        background: '#2C3E50',
        color: 'white',
        fontWeight: 'bold',
        fontSize: '1.4rem',
        '&:hover': {
            background: '#5D6D7E',
            cursor: 'pointer'
        }
    },
    feature_list_area: {
        background: 'white',
        padding: '0.6em',
        margin: '1em',
        border: '1px solid grey'
    },
    feat_text: {
        marginBottom: '0.3em',
        fontSize: '1.1rem',
        letterSpacing: '1px'
    },
    btn_add_feature: {
        marginRight: '1em',
        '&:hover': {
            cursor: 'pointer'
        }
    },
    trash_icon: {
        fontSize: '1.3rem',
        '&:hover': {
            color: 'red',
            cursor: 'pointer'
        }
    },
    btn_submit_setion: {
        marginTop: '3em',
        padding: '2em 1em',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '24em',
    },
    cancel_link: {
        fontSize: '1.5rem',
        color: 'black'
    },
    list_add_new: {
        display: 'flex',
        alignItems: 'center',
    }
  }))

const EditProperty = ({ match }) => {
    const classes = useStyles()

    const id = match.params.id    

    const dispatch = useDispatch()
    const properties = useSelector(state => state.properties)
    const {isLoading, errMess, property, editSuccess} = properties

    const landlordsList = useSelector(state => state.landlords)
    const { landlords } = landlordsList

    const alertSelector = useSelector(state => state.alert)

    const [detailsLoad, setDetailsLoad] = useState(true)
    const [uploading, setUploading] = useState(false)

    const [values, setValues] = useState({
        name: '',
        category: '',
        pricePw: '',
        pricePcm: '',
        salePrice: '',
        propertyInfo: '',
        bed: 0,
        bath: 0,
        pet: '',
        school: '',
        crimeRate: '',
        train: '',
        features: [],
        stations: [],
        floorplan: [],
        images: [],
        deposit: '',
        councilTax: '',
        localAuthority: '',
        squares: '',
        featured: '',
        landlord: '',
        feature: '',
        station: '',
        locationArea: '',
        status: ''
    })

    const [selectedFile, setSelectedFile] = useState([])
    const [imgSelected, setImgSelected] = useState([])

    const [featuresList, setFeaturesList] = useState([])
    const [featuresListShow, setFeaturesListShow] = useState([])

    const [stationsShow, setStationsShow] = useState([])
    const [coords, setCoords] = useState({ lat: 0, lng: 0 })
    
    const handleChange = (prop) => (e) => {
        setValues({ ...values, [prop]: e.target.value})
    } 

    const handleChangeCoords = (prop) => (e) => {
        setCoords({ ...coords, [prop]: e.target.value})
    } 

    const validate = () => {
        let isError = false
        
        let errors = {
            nameError: '',
            categoryError: '',
            propertyInfoError: '',
            bedError: '',
            bathError: '',
            petError: '',
            schoolError: '',
            crimeRateError: '',
            trainError: '',
            featureError: '',
            stationsError: '',
            depositError: '',
            councilTaxError: '',
            localAuthorityError: '',
            squaresError: '',
            featuredError: '',
            landlordError: '',
            locationAreaError: '',
            latError: '',
            lngError: ''
    
        }

        if (values.name === '') {
            isError = true
            errors.nameError = 'Property must have a name'
        }

        if (values.category === '') {
            isError = true
            errors.categoryError = 'A category must be selected'
        }

        if (values.propertyInfo === '') {
            isError = true
            errors.propertyInfoError = 'Property must have information'
        }

        if (values.bed <= 0) {
            isError = true
            errors.bedError = 'Bed number must be selected'
        }

        if (values.bath <= 0) {
            isError = true
            errors.bathError = 'Bath number must be selected'
        }
        
        if (values.school === '') {
            isError = true
            errors.schoolError = 'School distance must be selected'
        }

        if (values.crimeRate === '') {
            isError = true
            errors.crimeRateError = 'Crime percentage must be selected'
        }

        if (values.train === '') {
            isError = true
            errors.trainError = 'Train distance must be selected'
        }

        if (featuresListShow.length < 1) {
            isError = true
            errors.featureError = 'Features must be present'
        }

        if (values.stations.length < 1) {
            isError = true
            errors.stationsError = 'Stations must be present'
        }

        // if (values.deposit === '') {
        //     isError = true
        //     errors.depositError = 'Deposit must be present'
        // }

        if (values.councilTax === '') {
            isError = true
            errors.councilTaxError = 'Council tax must be present'
        }

        // if (values.pet === '') {
        //     isError = true
        //     errors.petError = 'Pet choice must be present'
        // }

        if (values.localAuthority === '') {
            isError = true
            errors.localAuthorityError = 'Local authority must be present'
        }

        if (values.squares === '') {
            isError = true
            errors.squaresError = 'Square Ft must be present'
        }

        if (values.featured === '') {
            isError = true
            errors.featuredError = 'Featured choice must be selected'
        }

        if (values.landlord === '') {
            isError = true
            errors.landlordError = 'A landlord must be selected'
        }

        if (values.locationArea === '') {
            isError = true
            errors.locationAreaError = 'A location area must be selected'
        }

        if (coords.lat === 0 || coords.lat === '0' || coords.lat === '') {
            isError = true
            errors.latError = 'Latitude must be specified'
        }

        if (coords.lng === 0 || coords.lng === '0' || coords.lng === '') {
            isError = true
            errors.lngError = 'Longitude must be specified'
        }

        setValues({
            ...values,
            ...errors
        })

        setCoords({
            ...coords,
            ...errors
        })

        return isError
    }

    const addFeatureToList = async (e) => {
        e.preventDefault()

        await featuresListShow.push({
            _id: (Date.now() + Math.random()).toString(),
            feat: values.feature.toLocaleLowerCase()
        })

        setValues(prevValues => ({
            ...prevValues,
            feature: ''
        }))
    }

    const addStationToList = async (e) => {
        e.preventDefault()

        await stationsShow.push({
            _id: await (Date.now() + Math.random()).toString(),
            stationName: values.station.toLocaleLowerCase()
        })

        setValues(prevValues => ({
            ...prevValues,
            station: ''
        }))
    }

    useEffect(async () => {
        if(property._id !== id) {
            dispatch(getPropertyDetails(id))
        } else {
            setStationsShow(property.stations)
            setFeaturesListShow(property.features)
            setValues({
                name: property.propertyName,
                category: property.category,
                pricePw: property.pricePw != null ? property.pricePw : '',
                pricePcm: property.pricePcm != null ? property.pricePcm : '',
                salePrice: property.salePrice != null ? property.salePrice : '',
                propertyInfo: property.propertyInfo,
                bed: property.bedNum,
                bath: property.bathNum,
                pet: property.pet,
                school: property.school,
                crimeRate: property.crimeRate,
                train: property.train,
                features: property.features,
                stations: property.stations,
                floorplan: [],
                images: [],
                deposit: property.deposit,
                councilTax: property.councilTax,
                localAuthority: property.localAuthority,
                squares: property.squares,
                featured: property.featured,
                landlord: property.landlord,
                locationArea: property.locationArea,
                status: property.status
            })
            setCoords({
                lat: property.lat,
                lng: property.lng
            })


        }
    }, [property])
    
    //   const uploadImgHandler = async (e) => {
    //     const file = e.target.files[0];
    //     const formData = new FormData();
    //     formData.append("images", file);
    //     setUploading(true)
    //     try {
    //       const config = {
    //         headers: {
    //           "Content-Type": "multipart/form-data",              
    //         },
    //       };    
    //       const { data } = await axios.post(baseUrl + 'upload', formData, config)             
          
    //       images.push({
    //           picture: data
    //       })

    //       setUploading(false)
         
    //     } catch (error) {
    //       console.error(error);   
    //       setUploading(false)       
    //     }
    // };

    // const uploadFloorplanHandler = async (e) => {
    //     const file = e.target.files[0];
    //     const formData = new FormData();
    //     formData.append("images", file);
    //     setUploading(true)
    //     try {
    //       const config = {
    //         headers: {
    //           "Content-Type": "multipart/form-data",              
    //         },
    //       };    
    //       const { data } = await axios.post(baseUrl + 'upload', formData, config)             
          
    //       setFloorplan(data)

    //       setUploading(false)
         
    //     } catch (error) {
    //       console.error(error);   
    //       setUploading(false)       
    //     }
    // };

    const uploadImg = async (file) => {
        // const file = e.target.files[0];
        const formData = new FormData();
        formData.append("images", file);
        setUploading(true)
        try {
          const config = {
            headers: {
              "Content-Type": "multipart/form-data",              
            },
          };    
          const { data } = await axios.post(baseUrl + 'upload', formData, config)             
          
          imgSelected.push({
              picture: data
          })

          setUploading(false)
         
        } catch (error) {
          console.error(error);   
          setUploading(false)       
        }
    };


    //used for the image preview
    const uploadFloorplanHandler = async (file) => {
        // const file = e.target.files[0];
        const formData = new FormData();
        formData.append("images", file);
        setUploading(true)
        try {
          const config = {
            headers: {
              "Content-Type": "multipart/form-data",              
            },
          };    
          const { data } = await axios.post(baseUrl + 'upload', formData, config)             
          
          values.floorplan.push({
            floorImg: data
        })
          setUploading(false)
         
        } catch (error) {
          console.error(error);   
          setUploading(false)       
        }
    };

    String.prototype.capitalize = function() {
        return this.charAt(0).toUpperCase() + this.substring(1).toLocaleLowerCase()
    }
     
    const submitHandler = async (e) => {
        e.preventDefault()  
        
        const err = validate()

        if (!err) {
            // for(let x = 0; x < values.images.length; x++) {
            //     await uploadImg(values.images[x])
            // }   
    
            // await uploadFloorplanHandler(selectedFile[0]) 
            for (var x = 0; x < stationsShow.length; x++) {
                await delete stationsShow[x]._id
            }

            for (var y = 0; y < featuresListShow.length; y++) {
                await delete featuresListShow[y]._id
            }

            setValues(prevState => ({
                ...prevState,
                stations: stationsShow,
                features: featuresListShow
            }))

            const property = {
                _id: id,
                propertyName: values.name.capitalize(),
                category: values.category,
                pricePw: values.pricePw == '' ? null : values.pricePw,
                pricePcm: values.pricePcm == '' ? null : values.pricePcm,
                salePrice: values.salePrice == '' ? null : values.salePrice,
                propertyInfo: values.propertyInfo.capitalize(),
                bedNum: values.bed,
                bathNum: values.bath,
                pet: values.pet,
                school: values.school,
                crimeRate: values.crimeRate,
                train: values.train,
                features: values.features,
                stations: values.stations,
                // floorplan: values.floorplan,
                // pictures: imgSelected,
                deposit: values.deposit,
                councilTax: values.councilTax,
                localAuthority: values.localAuthority.capitalize(),
                squares: values.squares,
                featured: values.featured,
                landlord: values.landlord,
                locationArea: values.locationArea,
                lat: coords.lat,
                lng: coords.lng,
                status: values.status
            }
            dispatch(updateProperty(property))    

            setValues ({
                name: '',
                category: '',
                pricePw: '',
                pricePcm: '',
                salePrice: '',
                propertyInfo: '',
                bed: 0,
                bath: 0,
                pet: '',
                school: '',
                crimeRate: '',
                train: '',
                feature: '',
                features: [],
                stations: [],
                floorplan: [],
                images: [],
                deposit: '',
                councilTax: '',
                localAuthority: '',
                squares: '',
                featured: '',
                landlord: '',
                nameError: '',
                categoryError: '',
                propertyInfoError: '',
                bedError: '',
                bathError: '',
                petError: '',
                schoolError: '',
                crimeRateError: '',
                trainError: '',
                featureError: '',
                stationsError: '',
                depositError: '',
                councilTaxError: '',
                localAuthorityError: '',
                squaresError: '',
                featuredError: '',
                landlordError: '',
                station: '',
                locationArea: '',
                locationAreaError: '',
                latError: '',
                lngError: '',
                status: ''
            })
            
            setCoords({
                lat: 0,
                lng: 0
            })

            setImgSelected([])
            setSelectedFile([])
            setFeaturesList([])
            setFeaturesListShow([])
            setStationsShow([])
        }
         
    }

    //  //execute preview whenever image is uploaded
    //  useEffect(() => {
    //     //Check File API support
    //     if ( window.File && window.FileList && window.FileReader )
    //     {
    //         var filesInput = document.getElementById("file_pictures");

    //         filesInput.addEventListener 
    //         ( 
    //             "change", function ( event )
    //             {
    //                 var files = event.target.files; //FileList object
    //                 var output = document.getElementById ( "result" );

    //                 for ( var i = 0; i< files.length; i++ )
    //                 {
    //                     var file = files [ i ];

    //                     //Only pics
    //                     if ( !file.type.match ( 'image' ) )
    //                     continue;

    //                     values.images.push(files[i])

    //                     var picReader = new FileReader();

    //                     picReader.addEventListener 
    //                     ( 
    //                         "load", function ( event )
    //                         {                    
    //                             var picFile = event.target;
                            
    //                             var div = document.createElement ( "div" )
    //                             // images.push(event.target.result)

    //                             div.innerHTML = "<img width='250' className={classes.thumbnail} src='" + picFile.result + "'" + "title='" + picFile.name + "'/>";

    //                             output.insertBefore ( div, null );
    //                         }
    //                     );

    //                 //Read the image
    //                 picReader.readAsDataURL ( file );
    //                 }                               
    //             }
    //         );
    //     }
    //     else
    //     {
    //         console.log ( "Your browser does not support File API" );
    //     }
    // }, [values.images])


    // useEffect(() => {//floorplan file preview
    //     //Check File API support
    //     if ( window.File && window.FileList && window.FileReader )
    //     {
    //         var filesInput = document.getElementById("file_floorplan");

    //         filesInput.addEventListener 
    //         ( 
    //             "change", function ( event )
    //             {
    //                 var files = event.target.files; //FileList object
    //                 var output = document.getElementById ( "resultFile" );
    //                 var file = files [ 0 ];

    //                 selectedFile.push(files[0])

    //                 var picReader = new FileReader();

    //                 picReader.addEventListener 
    //                 ( 
    //                     "load", function ( event )
    //                     {                    
    //                         var picFile = event.target;
                            
    //                         var div = document.createElement ( "div" )
    //                         // images.push(event.target.result)

    //                         div.innerHTML = "<img width='250' className={classes.thumbnail} src='" + picFile.result + "'" + "title='" + picFile.name + "'/>";

    //                         output.insertBefore ( div, null );
    //                     }
    //                 );

    //                 //Read the image
    //                 picReader.readAsDataURL ( file );                          
    //             }
    //         );
    //     }
    //     else
    //     {
    //         console.log ( "Your browser does not support File API" );
    //     }
    // }, [values.floorplan])

    let ukey = -1 //unique key for feature trash icon

    const handleDeleteFeature = async (uid) => {
        for (var i = 0; i < featuresListShow.length; i++) {
            if(featuresListShow[i]._id == uid) {
                
                await featuresListShow.splice(i, 1)

            }
        }
    }

    
    const handleDeleteStation = async (uid) => {
        for (var x = 0; x < stationsShow.length; x++) {
            if(stationsShow[x]._id == uid) {
                
                await stationsShow.splice(x, 1)

            }
        }
    }

    return (
        <div className={classes.main_container}>
                <Breadcrumb>
                    <BreadcrumbItem><Link to="/admin/dashboard">Dashboard</Link></BreadcrumbItem>
                    <BreadcrumbItem><Link to="/admin/dashboard/properties">Properties</Link></BreadcrumbItem>
                    <BreadcrumbItem active>Edit Property</BreadcrumbItem>
                </Breadcrumb>
            <div className={classes.title_section_property_edit}>
                <span>
                    <img src={propertyIcon} alt="property edit icon" />
                </span>
                <h3 className={classes.title_property_edit}>Edit Property</h3>
            </div>
            {alertSelector.message &&
                <div className={`alert ${alertSelector.type}`}>
                    {alertSelector.message}
                </div>
            }
            { 
                isLoading ?
                <Loading />
                :
                errMess ?
                <p>{errMess}</p>           
                :
                property ?

            <div>
                <form className={classes.property_form}>
                    <div className={classes.left_section}>
                        <TextField
                            error={values.name ? '' : values.nameError}
                            name="property_name"
                            id="property_name"
                            label="Property's name"
                            variant="outlined"
                            value={values.name}
                            onChange={handleChange('name')}
                            margin="normal"
                            style={{width: '61ch'}}
                            className={classes.textField}
                            helperText={values.name ? '' : values.nameError}
                        />
                        <br />
                        <FormControl 
                            className={classes.multiselector}
                            style={{marginRight: '3em'}}
                            error={values.category ? '' : values.categoryError} 
                            variant="outlined" >
                            <InputLabel htmlFor="category">Category</InputLabel>
                            <Select
                                native
                                value={values.category}
                                onChange={handleChange('category')}
                                inputProps={{
                                    name: 'category',
                                    id: 'category',
                                }}
                                style={{width: '26ch', background: 'white'}}
                                label="Category"
                            >
                            <option aria-label="None" value="" />
                            <option value="rent">Rent</option>
                            <option value="buy">Buy</option>
                            </Select>
                            <FormHelperText id="component-error-text">
                                {values.category ? '' : values.categoryError}
                                </FormHelperText>
                        </FormControl>
                        {
                            values.category === 'buy' &&
                            <TextField
                                className={classes.textField}
                                label="Sale price"
                                type="number"
                                id="sale_price"
                                value={values.salePrice}
                                onChange={handleChange('salePrice')}
                                InputProps={{
                                    startAdornment: <InputAdornment position="start">£</InputAdornment>,
                                }}
                                variant="outlined"
                                style={{width: '25ch'}}
                            />
                        }
                         <br />
                        {
                            values.category === 'rent' &&
                            <>
                            <TextField
                                className={classes.textField}
                                label="Price pw"
                                type="number"
                                id="price_pw"
                                value={values.pricePw}
                                onChange={handleChange('pricePw')}
                                InputProps={{
                                    startAdornment: <InputAdornment position="start">£</InputAdornment>,
                                }}
                                variant="outlined"
                                style={{width: '25ch', marginRight: '3em'}}
                            />
                            <TextField
                                className={classes.textField}
                                label="Price pcm"
                                type="number"
                                id="price_pcm"
                                value={values.pricePcm}
                                onChange={handleChange('pricePcm')}
                                InputProps={{
                                    startAdornment: <InputAdornment position="start">£</InputAdornment>,
                                }}
                                variant="outlined"
                                style={{width: '25ch'}}
                            />
                            </>
                        }
                        <br />
                        <TextField
                            error={values.propertyInfo ? '' : values.propertyInfoError}
                            className={classes.textField}
                            id="Property info"
                            label="Property info"
                            multiline
                            rows={7}
                            variant="outlined"
                            value={values.propertyInfo}
                            onChange={handleChange('propertyInfo')} 
                            style={{width: '61ch'}}
                            helperText={values.propertyInfo ? '' : values.propertyInfoError}
                        />
                        <br />
                        <div className={classes.further_det_station_section}>
                            <div className={classes.extra_section}>
                            <h4 className={classes.extra_det_title}>Further details:</h4>
                            <TextField
                                className={classes.textField}
                                error={values.deposit ? '' : values.depositError}
                                name="deposit"
                                id="deposit"
                                label="Deposit"
                                variant="outlined"
                                value={values.deposit}
                                onChange={handleChange('deposit')}
                                margin="normal"
                                style={{width: '20ch'}}
                                helperText={values.deposit ? '' : values.depositError}
                            />
                            <br />
                            <TextField
                                className={classes.textField}
                                error={values.localAuthority ? '' : values.localAuthorityError}
                                name="local_authority"
                                id="local_authority"
                                label="Local authority"
                                variant="outlined"
                                value={values.localAuthority}
                                onChange={handleChange('localAuthority')}
                                margin="normal"
                                style={{width: '20ch'}}
                                helperText={values.localAuthority ? '' : values.localAuthorityError}
                            />
                            <br />
                            <TextField
                                className={classes.textField}
                                error={values.councilTax ? '' : values.councilTaxError}
                                label="Council tax"
                                type="number"
                                id="council_tax"
                                value={values.councilTax}
                                onChange={handleChange('councilTax')}
                                InputProps={{
                                    startAdornment: <InputAdornment position="start">£</InputAdornment>,
                                }}
                                variant="outlined"
                                style={{width: '20ch'}}
                                helperText={values.councilTax ? '' : values.councilTaxError}
                            />
                            <br />
                            <TextField
                                error={values.squares ? '' : values.squaresError}
                                className={classes.textField}
                                label="Squares Ft"
                                type="number"
                                id="Squares_ft"
                                value={values.squares}
                                onChange={handleChange('squares')}
                                InputProps={{
                                    startAdornment: <InputAdornment position="start">sq</InputAdornment>,
                                }}
                                variant="outlined"
                                style={{width: '20ch'}}
                                helperText={values.squares ? '' : values.squaresError}
                            />
                            </div>
                            <div className={classes.extra_section}>
                                <h4 className={classes.extra_det_title}>Add features:</h4>
                                <div className={classes.list_add_new}>
                                    <TextField
                                    error={featuresList.length ? '' : values.featureError}
                                    className={classes.textField}
                                    id="feature"
                                    label="Feature"
                                    variant="outlined"
                                    value={values.feature}
                                    onChange={handleChange('feature')} 
                                    style={{width: '38ch'}}
                                    helperText={featuresList.length ? '' : values.featureError}
                                />
                                <button disabled={!values.feature} className={classes.btn_add_feature} onClick={(e) => addFeatureToList(e)}>Add Feature</button>
                                </div>
                            <br />
                            <div className={classes.feature_list_area}>
                            {   
                                featuresListShow.map(feat => {
                                    ukey++
                                    return (
                                        <div key={ukey} style={{display: 'flex', justifyContent: 'space-between'}}>
                                            <p key={feat.feat} className={classes.feat_text}>{feat.feat}</p>
                                            <i onClick={() => handleDeleteFeature(feat._id)} key={feat._id} className={`fas fa-trash-alt ${classes.trash_icon}`}></i>
                                        </div>
                                    )
                                })
                                
                            }
                            </div>
                            </div>
                        </div>
                    </div>
                    <div className={classes.right_section}>
                        <FormControl className={classes.multiselector} 
                            error={values.featured ? '' : values.featuredError} 
                            variant="outlined">
                        <InputLabel htmlFor="featured">Featured</InputLabel>
                        <Select
                            native
                            value={values.featured}
                            onChange={handleChange('featured')}
                            label="Featured"
                            inputProps={{
                            name: 'featured',
                            id: 'featured',
                            }}
                            style={{width: '19ch', background: 'white'}}
                        >
                        <option aria-label="None" value="" />
                        <option value="true">True</option>
                        <option value="false">False</option>
                        </Select>
                        <FormHelperText id="component-error-text">
                                {values.featured ? '' : values.featuredError}
                        </FormHelperText>
                        </FormControl>
                        <FormControl className={classes.multiselector}
                            error={values.bed ? '' : values.bedError} 
                            variant="outlined" >
                            <InputLabel htmlFor="bedNum">Bed no.</InputLabel>
                            <Select
                                native
                                value={values.bed}
                                onChange={handleChange('bed')}
                                inputProps={{
                                    name: 'bedNum',
                                    id: 'bedNum',
                                }}
                                style={{width: '15ch', background: 'white'}}
                                label="Bed no."
                            >
                            <option aria-label="None" value="" />
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            </Select>
                            <FormHelperText id="component-error-text">
                                {values.bed ? '' : values.bedError}
                            </FormHelperText>
                        </FormControl>
                        <br />

                        <FormControl className={classes.multiselector}
                            error={values.bath ? '' : values.bathError} 
                            variant="outlined" >
                            <InputLabel htmlFor="bathNum">Bathroom no.</InputLabel>
                            <Select
                                native
                                value={values.bath}
                                onChange={handleChange('bath')}
                                inputProps={{
                                    name: 'bathNum',
                                    id: 'bathNum',
                                }}
                                style={{width: '19ch', background: 'white'}}
                                label="Bathroom no."
                            >
                            <option aria-label="None" value="" />
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            </Select>
                            <FormHelperText id="component-error-text">
                                {values.bath ? '' : values.bathError}
                            </FormHelperText>
                        </FormControl>

                        <FormControl className={classes.multiselector}
                            error={values.pet ? '' : values.petError} 
                            variant="outlined" >
                        <InputLabel htmlFor="pet">Pet allowed</InputLabel>
                        <Select
                            native
                            value={values.pet}
                            onChange={handleChange('pet')}
                            inputProps={{
                                name: 'pet',
                                id: 'pet',
                            }}
                            label="Pet allowed"
                            style={{width: '15ch', background: 'white'}}
                        >
                        <option aria-label="None" value="" />
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                        </Select>
                        <FormHelperText id="component-error-text">
                            {values.pet ? '' : values.petError}
                        </FormHelperText>
                        </FormControl>
                        <br />     

                        <FormControl className={classes.multiselector}      
                            error={values.school ? '' : values.schoolError} 
                            variant="outlined">
                        <InputLabel htmlFor="school">School</InputLabel>
                        <Select
                            native
                            value={values.school}
                            onChange={handleChange('school')}
                            label="School"
                            inputProps={{
                            name: 'school',
                            id: 'school',
                            }}
                            style={{width: '19ch', background: 'white'}}
                        >
                            <option aria-label="None" value="" />
                            <option value="5">within 5 miles</option>
                            <option value="15">within 15 miles</option>
                            <option value="25">within 25 miles</option>
                            <option value="50">within 50 miles</option>
                            <option value="100">up to 100 miles</option>
                        </Select>
                        <FormHelperText id="component-error-text">
                            {values.school ? '' : values.schoolError}
                        </FormHelperText>
                        </FormControl>   
                        <FormControl className={classes.multiselector}
                            error={values.crimeRate ? '' : values.crimeRateError} 
                            variant="outlined" >
                        <InputLabel htmlFor="crime">Crime rate</InputLabel>
                        <Select
                            native
                            value={values.crimeRate}
                            onChange={handleChange('crimeRate')}
                            label="Crime rate"
                            inputProps={{
                                name: 'crime',
                                id: 'crime',
                            }}
                            style={{width: '15ch', background: 'white'}}
                        >
                        <option aria-label="None" value="" />
                        <option value="25">up to 25%</option>
                        <option value="50">up to 50%</option>
                        <option value="75">up to 75%</option>
                        <option value="100">up to 100%</option>
                        </Select>
                        <FormHelperText id="component-error-text">
                            {values.crimeRate ? '' : values.crimeRateError}
                        </FormHelperText>
                        </FormControl>   
                        <br />
                        <FormControl className={classes.multiselector}
                            error={values.train ? '' : values.trainError} 
                            variant="outlined" >
                        <InputLabel htmlFor="pet">Train distance</InputLabel>
                        <Select
                            native
                            value={values.train}
                            onChange={handleChange('train')}
                            inputProps={{
                                name: 'train',
                                id: 'train',
                            }}
                            label="Train distance"
                            style={{width: '19ch', background: 'white'}}
                        >
                        <option aria-label="None" value="" />
                        <option value="5">within 5 miles</option>
                        <option value="15">within 15 miles</option>
                        <option value="25">within 25 miles</option>
                        <option value="50">within 50 miles</option>
                        <option value="100">up to 100 miles</option>
                        </Select>
                        <FormHelperText id="component-error-text">
                            {values.train ? '' : values.trainError}
                        </FormHelperText>
                        </FormControl>

                        <FormControl className={classes.multiselector} 
                            error={values.locationArea ? '' : values.locationAreaError} 
                            variant="outlined">
                        <InputLabel htmlFor="featured">Area</InputLabel>
                        <Select
                            native
                            value={values.locationArea}
                            onChange={handleChange('locationArea')}
                            label="Area"
                            inputProps={{
                            name: 'locationArea',
                            id: 'locationArea',
                            }}
                            style={{width: '24ch', background: 'white'}}
                        >
                        <option aria-label="None" value="" />
                        {
                            loc.map(place => {
                                return (
                                    <option key={place.id} value={place.area}>{place.area}</option>
                                )
                            })
                        }
                        </Select>
                        <FormHelperText id="component-error-text">
                                {values.locationArea ? '' : values.locationAreaError}
                        </FormHelperText>
                        </FormControl>
                        <br />
                        <TextField
                            error={coords.latError}
                            className={classes.textField}
                            id="latitude"
                            label="Latitude"
                            variant="outlined"
                            value={coords.lat}
                            onChange={handleChangeCoords('lat')} 
                            style={{ width: '18ch' }}
                            helperText={coords.latError}
                        />
                        <TextField
                            error={coords.lngError}
                            className={classes.textField}
                            id="longitude"
                            label="Longitude"
                            variant="outlined"
                            value={coords.lng}
                            onChange={handleChangeCoords('lng')} 
                            style={{ width: '18ch' }}
                            helperText={coords.lngError}
                        />
                        <br />
                        <div className={classes.list_add_new}>
                            <TextField
                                error={values.stations.length ? '' : values.stationsError}
                                className={classes.textField}
                                id="station"
                                label="Station"
                                variant="outlined"
                                value={values.station}
                                onChange={handleChange('station')} 
                                style={{width: '38ch'}}
                                helperText={values.stations.length ? '' : values.stationsError}
                            />
                            <button disabled={!values.station}  className={classes.btn_add_feature} onClick={(e) => addStationToList(e)}>Add Station</button>
                        </div>
                        <br />
                        <div className={classes.feature_list_area}>
                        {
                            stationsShow.map(station => {
                                ukey++
                                return (
                                    <div key={ukey} style={{display: 'flex', justifyContent: 'space-between'}}>
                                        <p key={station.stationName} className={classes.feat_text}>{station.stationName}</p>
                                        <i onClick={() => handleDeleteStation(station._id)} key={station._id} className={`fas fa-trash-alt ${classes.trash_icon}`}></i>
                                    </div>
                                )
                            })
                        }
                        </div>
                        <br />
                        <FormControl 
                            className={classes.multiselector}
                            style={{marginRight: '3em'}}
                            error={values.landlord ? '' : values.landlordError} 
                            variant="outlined" >
                            <InputLabel htmlFor="category">Landlord</InputLabel>
                            <Select
                                native
                                value={values.landlord}
                                onChange={handleChange('landlord')} 
                                inputProps={{
                                    name: 'landlord',
                                    id: 'landlord',
                                }}
                                style={{width: '38ch', background: 'white'}}
                                label="Landlord"
                            >
                            <option aria-label="None" value="" />
                            {
                                landlords.map(landlord => {
                                    return (
                                        <option key={landlord._id} value={landlord._id}>
                                            {`${landlord.firstName} ${landlord.lastName}`}
                                        </option>
                                    )
                                })   
                            }
                            </Select>
                            <FormHelperText id="component-error-text">
                                {values.landlord ? '' : values.landlordError}
                            </FormHelperText>
                        </FormControl>
                        <br />
                        <FormControl 
                            className={classes.multiselector}
                            style={{marginRight: '3em'}}
                            // error={values.status ? '' : values.categoryError} 
                            variant="outlined" >
                            <InputLabel htmlFor="category">Status</InputLabel>
                            <Select
                                native
                                value={values.status}
                                onChange={handleChange('status')}
                                inputProps={{
                                    name: 'status',
                                    id: 'status',
                                }}
                                style={{width: '26ch', background: 'white'}}
                                label="Status"
                            >
                            <option aria-label="None" value="" />
                            <option value="active">Active</option>
                            <option value="underoffer">Under offer</option>
                            <option value="sold">Sold</option>
                            <option value="rented">Rented</option>
                            <option value="new">New</option>
                            <option value="deactivated">Deactivated</option>
                                
                            </Select>
                            {/* <FormHelperText id="component-error-text">
                                {values.category ? '' : values.categoryError}
                                </FormHelperText> */}
                        </FormControl>
                        {/* <label htmlFor="file_pictures">Upload pictures</label> <br />
                        <input id="file_pictures" type="file" multiple={true}  />
                        <output id="result" width="250"/>
                        {uploading && <CircularProgress size={15} />  }
                        <br />
                        <label htmlFor="file_floorplan">Upload floorplan</label> <br />
                        <input  id="file_floorplan" type="file" />
                        <output id="resultFile" width="250"/>

                        <br /> */}
                        <div className={classes.btn_submit_setion}>
                            <Link className={classes.cancel_link} to="/admin/dashboard/properties">Cancel</Link>  
                            <button className={classes.btn_submit_form} onClick={(e) => submitHandler(e)}>Update Property</button>
                        </div>
                        
                        {
                            isLoading && 
                            <span style={{margin: '4em 0 0 2em'}}>
                            <img style={{marginRight: '0.5em'}} src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                            Loading...
                            </span>


                        }
                    </div>
                    
                </form>
            </div>
            :
            <div>
                <p>There was a problem. Retry.</p>
            </div>
        }
        </div>
    )
}

export default EditProperty
