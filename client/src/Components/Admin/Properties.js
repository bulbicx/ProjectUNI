import React,  { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Loading } from '../LoadingComponent'
import { baseUrl } from '../../shared/baseUrl'
import { history } from '../../redux/helpers/history'
import { getPropertyDetails } from '../../redux/ActionCreators'
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Table } from 'react-bootstrap'
import * as ActionTypes from '../../redux/ActionTypes'
import PaginationPage from '../Pagination/PaginationPage'
import { useDispatch, useSelector } from 'react-redux'
import ReactTooltip from 'react-tooltip';
import { makeStyles } from '@material-ui/core'

import SearchIcon from '@material-ui/icons/Search'
import plusIcon from '../../assets/images/plus.png'
import plusHovIcon from '../../assets/images/plusHov.png'
import viewIcon from '../../assets/images/view.png'
import viewHovIcon from '../../assets/images/viewHov.png'
import editIcon from '../../assets/images/edit.png'
import editHovIcon from '../../assets/images/editHov.png'
import deleteIcon from '../../assets/images/delete.png'
import deleteHovIcon from '../../assets/images/deleteHov.png'
import no_image from '../../assets/images/no_image_available.jpeg'
import underOfferStamp from '../../assets/images/underOfferStamp.png'
import soldIconStatus from '../../assets/images/soldIconStatus.png'
import rentedStatusIcon from '../../assets/images/rentedStatusIcon.png'
import newStampIcon from '../../assets/images/newStampIcon.png'
import deactivatedStampIcon from '../../assets/images/deactivatedStampIcon.png'
import "./style.css"


const useStyles = makeStyles({
    stamp: {
        zIndex: 2,
        fontSize: '1em',
        transform: 'rotate(-4deg)',
        width: '8em'
    }
})


function useFetchProperties(query, page, limit) {
    const dispatch = useDispatch()
    const propertiesList = useSelector(state => state.properties)
    
    const pageNo = page ? `&page=${page}` : ''
    const pageNoNext = page ? `&page=${ page + 1 }` : ''
    const pageNoNext2 = page ? `&page=${page + 2}` : ''
    const pageLimit = limit ? `&limit=${limit}` : ''
    const BASE_URL = `${baseUrl}properties?q=${ query }${ pageNo }${ pageLimit }`
    const BASE_URL2 = `${baseUrl}properties?q=${ query }${ pageNoNext }${ pageLimit }`
    const BASE_URL3 = `${baseUrl}properties?q=${ query }${ pageNoNext2 }${ pageLimit }`

    useEffect(() => {
        const cancelToken1 = axios.CancelToken.source()
        dispatch({ type:  ActionTypes.MAKE_REQUEST_PROPERTIES})
        axios.get(BASE_URL, {
            cancelToken: cancelToken1.token
        }).then(res => {
            dispatch({ type: ActionTypes.ADD_PROPERTIES, payload: res.data  }) 
        }).catch(e => {
            if (axios.isCancel(e)) return
            dispatch({ type: ActionTypes.PROPERTIES_FAILED, payload: e  }) 
        })

        const cancelToken2 = axios.CancelToken.source()
        axios.get(BASE_URL2, {
            cancelToken: cancelToken2.token
        }).then(res => {
            dispatch({ type: ActionTypes.UPDATE_HAS_NEXT_PAGE_PROPERTIES, payload: res.data.length !== 0  }) 
        }).catch(e => {
            if (axios.isCancel(e)) return
            dispatch({ type: ActionTypes.PROPERTIES_FAILED, payload: e  }) 
        })

        const cancelToken3 = axios.CancelToken.source()
        axios.get(BASE_URL3, {
            cancelToken: cancelToken3.token
        }).then(res => {
            dispatch({ type: ActionTypes.UPDATE_HAS_NEXT_NEXT_PAGE_PROPERTIES, payload: res.data.length !== 0 }) 
        }).catch(e => {
            if (axios.isCancel(e)) return
            dispatch({ type: ActionTypes.PROPERTIES_FAILED, payload: e }) 
        })

        return () => {
            cancelToken1.cancel()
            cancelToken2.cancel()
            cancelToken3.cancel()
        }
    }, [query, page])
    
    return propertiesList
}

const RenderProperty = ({ property, propertyDelete }) => {
    const classes = useStyles()
    const cat = property.category.toLocaleLowerCase()
    const aSt = 'public'
    let path = property.pictures.length && property.pictures[0].picture.replace('\\', '/').split('/').join().replace(aSt, '').replace(',', '').replace(',', '')

    const handlePropertyEdit = async (propertyId) => {
        await getPropertyDetails(propertyId)
        history.push(`/admin/dashboard/properties/editProperty/${propertyId}`)
    }
    

    return (
        <tr>
            <td>{property._id}</td>
            <td style={{textAlign: 'center'}}>
                <img width="100" height="64" src={property.pictures.length ? baseUrl + path : no_image } alt={property.propertyName} />
            </td>
            <td>{property.category.capitalize()}</td>
            <td>{property.propertyName.capitalize()}</td>
            <td>{property.bedNum}</td>
            <td>
                {
                    property.status === 'underoffer' ?
                    <img className={classes.stamp} src={underOfferStamp} alt="under offer stamp" />
                    :
                    property.status === 'sold' ?
                    <img className={classes.stamp} src={soldIconStatus} alt="sold stamp" />
                    :
                    property.status === 'rented' ?
                    <img className={classes.stamp} src={rentedStatusIcon} alt="rented stamp" />
                    :
                    property.status === 'new' ?
                    <img className={classes.stamp} src={newStampIcon} alt="new stamp" />
                    :
                    property.status === 'deactivated' ?
                    <img className={classes.stamp} src={deactivatedStampIcon} alt="deactivated stamp" />
                    :
                    property.status
                }
            </td>
            <td className="action_cell">
                <Link to={`/properties-to-${cat}/${property._id}`} >
                    <span className="action_icon" data-tip="View">
                        <img 
                            className="img_icon"
                            onMouseOver={e => e.currentTarget.src = viewHovIcon} 
                            onMouseLeave={e => e.currentTarget.src = viewIcon} 
                            src={viewIcon} 
                            alt="view icon" 
                            width="30" 
                        />
                    <ReactTooltip place="top" type="dark" effect="solid"/>
                    </span>
                </Link>
                <span onClick={() => handlePropertyEdit(property._id)} className="action_icon" data-tip="Edit">
                    <img 
                        className="img_icon"
                        onMouseOver={e => e.currentTarget.src = editHovIcon} 
                        onMouseLeave={e => e.currentTarget.src = editIcon} 
                        src={editIcon} 
                        alt="edit icon" 
                        width="30" 
                    />
                    <ReactTooltip place="top" type="dark" effect="solid"/>
                </span>
                <span className="action_icon" onClick={() => propertyDelete(property._id)} data-tip="Delete">
                    <img 
                        className="img_icon"
                        onMouseOver={e => e.currentTarget.src = deleteHovIcon} 
                        onMouseLeave={e => e.currentTarget.src = deleteIcon} 
                        src={deleteIcon} 
                        alt="delete icon" 
                        width="30" 
                    />
                </span>
                <ReactTooltip place="top" type="dark" effect="solid"/>
            </td>
        </tr>
    )
}

export default function Properties(props) {
    
    const [page, setPage] = useState(1)
    const [query, setQuery] = useState('') 
    const { properties, isLoading, errMess, hasNextPage, hasNextNextPage } = useFetchProperties(query, page, 10)

    const handleChangeInput = (e) => {
        const value = e.target.value
        setPage(1)
        setQuery(value)
    }

    const displayProperties = properties.map(property => {
        return (
            <RenderProperty 
                key={property._id} 
                propertyDelete={props.propertyDelete} 
                property={property} 
            />
        )
    })


    return (
        <div className="main_container" style={{marginTop: '3.4em',}}>
        <Breadcrumb style={{width: '13em'}}>
            <BreadcrumbItem><Link to="/admin/dashboard">Dashboard</Link></BreadcrumbItem>
            <BreadcrumbItem active>Properties</BreadcrumbItem>
        </Breadcrumb>
            <div className="title_section">
                <h2 className="title">Properties List</h2>
                <Link to="/admin/dashboard/properties/add_new_property" >
                <span className="plus_box" data-tip="Add new property" >
                    <img 
                        className="img_plus"
                        onMouseOver={e => e.currentTarget.src = plusHovIcon} 
                        onMouseLeave={e => e.currentTarget.src = plusIcon} 
                        src={plusIcon} 
                        alt="plus icon" 
                        width="35" 
                    />
                </span>
                </Link>
                <ReactTooltip place="top" type="dark" effect="solid"/>
            </div>
            <div className="search_bar_box">
                <label className="search_label" htmlFor="search_input">Search by property name, category, bed number or status</label>
                    <input 
                        type="search"
                        id="search_input"
                        placeholder="eg. Villa bella"
                        className="search_input"
                        name="search_input"
                        value={query}
                        onChange={handleChangeInput}
                    />
                <div className="search_icon">
                {    query.length <= 0 &&
                <SearchIcon />}
                </div>
            </div>
            {props.alert.message &&
                <div style={{width: '37em', marginLeft: '1.9em'}} className={`alert ${props.alert.type}`}>
                    {props.alert.message}
                </div>
            }
            <div className="files">
            {
                isLoading ?

                <Loading />
                :
                errMess ?

                <p>{errMess}</p>
                :
                properties.length ?

                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>#ID</th>
                            <th>Picture</th>
                            <th>Category</th>
                            <th>Property name</th>
                            <th>Bed no.</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        { displayProperties }
                    </tbody>
                </Table>
                :
                <div className="no_user_found">
                    <p className="message_no_user">There are no properties found. Retry with another search.</p>
                </div>
            }
            </div>
            <div className="pagination_section">
                <PaginationPage page={page} setPage={setPage} hasNextPage={hasNextPage} hasNextNextPage={hasNextNextPage}/>
            </div>
        </div>
    )
}

