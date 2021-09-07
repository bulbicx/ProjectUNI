import React, { useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import axios from 'axios'
import { makeStyles } from '@material-ui/core'
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom'
import { baseUrl } from '../../shared/baseUrl'
import { createContract } from '../../redux/ActionCreators'
import contractIcon from '../../assets/images/contractIcon.png'
import TextField from '@material-ui/core/TextField'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import FormHelperText from '@material-ui/core/FormHelperText'
import InputLabel from '@material-ui/core/InputLabel'


const useStyles = makeStyles((theme) => ({
    main_container: {
        marginTop: '4.4em',
        background: '#FADBD8',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        margin: '3em auto',
        borderRadius: '2.2em',
        height: '100%'
    },
    title_section_edit: {
        display: 'flex',
        alignItems: 'flex-end',
        padding: '1.2em 1.5em',
    },
    title_edit: {
        fontSize: '3rem',
        color: '#EC7063',
        marginLeft: '0.6em',
        marginBottom: 0
    },
    aform: {
        padding: '2em',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    textField: {
        background: 'white',
        margin: '1em 1em'
    },
    date_section: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    btn_submit_form: {
        padding: '0.8em 2.4em',
        border: 'none',
        borderRadius: '1.8em',
        background: '#EC7063',
        color: 'white',
        fontWeight: 'bold',
        fontSize: '1.4rem',
        '&:hover': {
            background: '#F1948A',
            cursor: 'pointer'
        }
    },
    multiselector: {
        margin: '1em 2em'
    },
    btn_submit_setion: {
        marginTop: '3em',
        padding: '2em 1em',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '23em',
    },
    cancel_link: {
        fontSize: '1.5rem',
        color: 'black'
    },
  }))


function AddContract(props) {
    const classes = useStyles()

    const dispatch = useDispatch()
    const salesList = useSelector(state => state.sales)
    const { isLoading } = salesList

    const propertiesList = useSelector(state => state.properties)
    const { properties } = propertiesList

    const usersList = useSelector(state => state.users)
    const { users } = usersList

    const alertSelector = useSelector(state => state.alert)
    // eslint-disable-next-line
    const [uploading, setUploading] = useState(false)

    const rentProperty = properties.filter(property => property.category === 'rent')

    const [values, setValues] = useState({
        property: '',
        user: '',
        start: new Date().toISOString().split('T')[0],
        end: new Date().toISOString().split('T')[0],
        document: ''
    })

    const handleChange = (prop) => (e) => {
        setValues({ ...values, [prop]: e.target.value})
    } 
    
    const validate = () => {
        let isError = false
        
        let errors = {
            propertyError: '',
            userError: '',
            startError: '',
            endError: '',
        }

        if (values.property === '') {
            isError = true
            errors.propertyError = 'A property must be selected'
        }

        if (values.user === '') {
            isError = true
            errors.userError = 'A user must be selected'
        }

        // if (values.start === '')) {
        //     isError = true
        //     errors.startError = 'A start date must be present'
        // }

        // if (values.end === '')) {
        //     isError = true
        //     errors.endError = 'A end date must be present'
        // }

        setValues({
            ...values,
            ...errors
        })

        return isError
    }

    const uploadFileHandler = async (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append("file", file);
        setUploading(true)
        try {   
          const { data } = await axios.post(baseUrl + 'fileUpload', formData)             
          
          setValues(prevState => ({
              ...prevState,
              document: data
          }))

          setUploading(false)
         
        } catch (error) {
          console.error(error);   
          setUploading(false)       
        }
    };

    const submitHandler = (e) => {
        e.preventDefault()

        
        const err = validate()
        if (!err) {
            const contract = {
                property: values.property,
                user: values.user,
                start: values.start,
                end: values.end,
                document: values.document
            }

            dispatch(createContract(contract))

            setValues({
                property: '',
                user: '',
                start: new Date().toISOString(),
                end: new Date().toISOString(),
                document: '',
                propertyError: '',
                userError: '',
                startError: '',
                endError: '',
            })
            
        }
    }

    return (
        <div className={classes.main_container}>
            <Breadcrumb>
                <BreadcrumbItem><Link to="/admin/dashboard">Dashboard</Link></BreadcrumbItem>
                <BreadcrumbItem><Link to="/admin/dashboard/contracts">Contracts</Link></BreadcrumbItem>
                <BreadcrumbItem active>Add Contract</BreadcrumbItem>
            </Breadcrumb>
            <div className={classes.title_section_edit}>
                <span>
                    <img src={contractIcon} alt="Contract edit icon" />
                </span>
                <h3 className={classes.title_edit}>Add Contract</h3>
            </div>
            {alertSelector.message &&
                <div className={`alert ${alertSelector.type}`}>
                    {alertSelector.message}
                </div>
            }

            <div>
                <form className={classes.aform}>
                    <div className={classes.date_section}>
                    <TextField
                        id="date"
                        label="Start"
                        type="date"
                        value={values.start}
                        onChange={handleChange('start')}
                        className={classes.textField}
                        InputLabelProps={{
                        shrink: true,
                        }}
                    />
                    <TextField
                        id="date"
                        label="End"
                        type="date"
                        value={values.end}
                        onChange={handleChange('end')}
                        className={classes.textField}
                        InputLabelProps={{
                        shrink: true,
                        }}
                    />
                    </div>
                    <FormControl 
                        className={classes.multiselector}
                        style={{marginRight: '3em'}}
                        error={values.propertyError}
                        variant="outlined" >
                        <InputLabel htmlFor="category">Property</InputLabel>
                        <Select
                            native
                            value={values.property}
                            onChange={handleChange('property')}
                            inputProps={{
                                name: 'property',
                                id: 'property',
                            }}
                            style={{width: '41ch', background: 'white'}}
                            label="Property"
                        >
                        <option aria-label="None" value="" />
                        {
                            rentProperty.map(property => {
                                return (
                                    <option key={property._id} value={property._id}>{property.propertyName}</option>
                                )
                            })
                        }
                        </Select>
                        <FormHelperText id="component-error-text">
                            {values.propertyError}
                        </FormHelperText>
                    </FormControl>

                    <br/>
                    <FormControl 
                        className={classes.multiselector}
                        style={{marginRight: '3em'}}
                        error={values.userError}
                        variant="outlined" >
                        <InputLabel htmlFor="category">User</InputLabel>
                        <Select
                            native
                            value={values.user}
                            onChange={handleChange('user')}
                            inputProps={{
                                name: 'user',
                                id: 'user',
                            }}
                            style={{width: '41ch', background: 'white'}}
                            label="User"
                        >
                        <option aria-label="None" value="" />
                        {
                            users.map(user => {
                                return (
                                    <option key={user._id} value={user._id}>{user.firstName} {user.lastName}</option>
                                )
                            })
                        }
                        </Select>
                        <FormHelperText id="component-error-text">
                            {values.userError}
                        </FormHelperText>
                    </FormControl>
                    <br />
                    <label htmlFor="file_document">Upload file
                        <input onChange={uploadFileHandler} type="file" id="file_document" style={{ marginLeft: '1em'}}/>
                    </label>
                    <br />

                    <div >
                    <div style={{display: 'flex', justifyContent: 'center'}}>
                        <div className={classes.btn_submit_setion}>
                            <Link className={classes.cancel_link} to="/admin/dashboard/contracts">Cancel</Link>
                            <button 
                            className={classes.btn_submit_form} onClick={(e) => submitHandler(e)}>Add Contract</button>
                        </div>
                    </div>
                        {
                            isLoading && 
                            <span style={{margin: '4em 0 0 2em'}}>
                            <img style={{marginRight: '0.5em'}} src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" alt="loading" />
                            Loading...
                            </span>
                        }
                    </div>
                </form>
            </div>

        </div>
    )

}

export default AddContract