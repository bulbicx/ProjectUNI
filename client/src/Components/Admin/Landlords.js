import React,  { useEffect, useState }  from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Loading } from '../LoadingComponent'
import { history } from '../../redux/helpers/history'
import { getLandlordDetails } from '../../redux/ActionCreators'
import { Table } from 'react-bootstrap'
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import PaginationPage from '../Pagination/PaginationPage'
import { useDispatch, useSelector } from 'react-redux'
import * as ActionTypes from '../../redux/ActionTypes'
import ReactTooltip from 'react-tooltip';
import { baseUrl } from '../../shared/baseUrl'

import SearchIcon from '@material-ui/icons/Search'
import plusIcon from '../../assets/images/plus.png'
import plusHovIcon from '../../assets/images/plusHov.png'
import viewIcon from '../../assets/images/view.png'
import viewHovIcon from '../../assets/images/viewHov.png'
import editIcon from '../../assets/images/edit.png'
import editHovIcon from '../../assets/images/editHov.png'
import deleteIcon from '../../assets/images/delete.png'
import deleteHovIcon from '../../assets/images/deleteHov.png'
import "./style.css"


function useFetchLandlords(query, page, limit, config) {
    const dispatch = useDispatch()
    const landlordsList = useSelector(state => state.landlords)
    
    const pageNo = page ? `&page=${page}` : ''
    const pageNoNext = page ? `&page=${ page + 1 }` : ''
    const pageNoNext2 = page ? `&page=${page + 2}` : ''
    const pageLimit = limit ? `&limit=${limit}` : ''
    const BASE_URL = `${baseUrl}landlords?q=${query}${pageNo}${pageLimit}`
    const BASE_URL2 = `${baseUrl}landlords?q=${ query }${ pageNoNext }${ pageLimit }`
    const BASE_URL3 = `${baseUrl}landlords?q=${query}${pageNoNext2}${pageLimit}`

    useEffect(() => {
        const cancelToken1 = axios.CancelToken.source()
        dispatch({ type:  ActionTypes.MAKE_REQUEST_LANDLORDS})
        axios.get(BASE_URL, config, {
            cancelToken: cancelToken1.token
        }).then(res => {
            dispatch({ type: ActionTypes.ADD_LANDLORDS, payload: res.data  }) 
        }).catch(e => {
            if (axios.isCancel(e)) return
            dispatch({ type: ActionTypes.LANDLORDS_FAILED, payload: e  }) 
        })

        const cancelToken2 = axios.CancelToken.source()
        axios.get(BASE_URL2, config, {
            cancelToken: cancelToken2.token
        }).then(res => {
            dispatch({ type: ActionTypes.UPDATE_HAS_NEXT_PAGE_LANDLORDS, payload: res.data.length !== 0  }) 
        }).catch(e => {
            if (axios.isCancel(e)) return
            dispatch({ type: ActionTypes.LANDLORDS_FAILED, payload: e  }) 
        })

        const cancelToken3 = axios.CancelToken.source()
        axios.get(BASE_URL3, config, {
            cancelToken: cancelToken3.token
        }).then(res => {
            dispatch({ type: ActionTypes.UPDATE_HAS_NEXT_NEXT_PAGE_LANDLORDS, payload: res.data.length !== 0 }) 
        }).catch(e => {
            if (axios.isCancel(e)) return
            dispatch({ type: ActionTypes.LANDLORDS_FAILED, payload: e }) 
        })

        return () => {
            cancelToken1.cancel()
            cancelToken2.cancel()
            cancelToken3.cancel()
        }
    }, [query, page])
    
    return landlordsList
}

const RenderLandlord = ({landlord, deleteLandlord}) => {
    
    const handleLandlordView = async (landlordId) => {
        await getLandlordDetails(landlordId)
        history.push(`/admin/dashboard/landlords/view_landlord/${landlordId}`)
    }

    const handleLandlordEdit = async (landlordId) => {
        await getLandlordDetails(landlordId)
        history.push(`/admin/dashboard/landlords/edit_landlord/${landlordId}`)
    }
    
    return (
        <tr>
            <td>{landlord._id}</td>
            <td>{landlord.firstName}</td>
            <td>{landlord.lastName}</td>
            <td>{landlord.email}</td>
            <td>{landlord.phoneNumber}</td>
            <td className="action_cell_other">
                <span onClick={() => handleLandlordView(landlord._id)} className="action_icon" data-tip="View">
                    <img 
                        className="img_icon"
                        onMouseOver={e => e.currentTarget.src = viewHovIcon} 
                        onMouseLeave={e => e.currentTarget.src = viewIcon} 
                        src={viewIcon} 
                        alt="view icon" 
                        width="30" 
                    />
                </span>
                <span onClick={() => handleLandlordEdit(landlord._id)} className="action_icon" data-tip="Edit">
                    <img 
                        className="img_icon"
                        onMouseOver={e => e.currentTarget.src = editHovIcon} 
                        onMouseLeave={e => e.currentTarget.src = editIcon} 
                        src={editIcon} 
                        alt="edit icon" 
                        width="30" 
                    />
                </span>
                <span className="action_icon" onClick={() => deleteLandlord(landlord._id)} data-tip="Delete">
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


export default function Landlords(props) {

    const token = 'Bearer ' + localStorage.getItem('token')
    const config = { headers: { 'Authorization': token } }
    const [page, setPage] = useState(1)
    const [query, setQuery] = useState('') 
    const { landlords, isLoading, errMess, hasNextPage, hasNextNextPage } = useFetchLandlords(query, page, 10, config)
    
    const handleChangeInput = (e) => {
        const value = e.target.value
        setPage(1)
        setQuery(value)
    }

    const displayLandlords = landlords.map(landlord => {
        return (
            <RenderLandlord  
                key={landlord._id} 
                deleteLandlord={props.deleteLandlord} 
                landlord={landlord} 
            />
        )
    })

    return (
        <div className="main_container_landlords" style={{marginTop: '3.4em',}}>
        <Breadcrumb style={{width: '13em'}}>
            <BreadcrumbItem><Link to="/admin/dashboard">Dashboard</Link></BreadcrumbItem>
            <BreadcrumbItem active>Landlords</BreadcrumbItem>
        </Breadcrumb>
            <div className="title_section">
                <h2 className="title_landlords">Landlords</h2>
                <Link to="/admin/dashboard/landlords/add_new_landlord" data-tip="Add new landlord">
                <span className="plus_box">
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
                <label className="search_label" htmlFor="search_input" >Search by first name</label>
                    <input 
                        type="search"
                        id="search_input"
                        placeholder="eg. Nicholas"
                        className="search_input"
                        name="search_input"
                        value={query}
                        onChange={handleChangeInput}
                    />
                <div className="search_icon">
                {    query.length <= 0 && <SearchIcon />}
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
                    landlords.length ?
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>#ID</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Email</th>
                                <th>Phone number</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {displayLandlords}
                                        
                        </tbody>
                    </Table>
                    :
                    <div className="no_user_found">
                        <p className="message_no_user">There are no landlords found. Retry with another search.</p>
                    </div>
                }

            </div>
            <div className="pagination_section">
                <PaginationPage page={page} setPage={setPage} hasNextPage={hasNextPage} hasNextNextPage={hasNextNextPage}/>
            </div>
        </div>
    )
}


