import React,  { useEffect, useState } from 'react'
import axios from 'axios'
import { Loading } from '../LoadingComponent'
import { Link } from 'react-router-dom'
import { history } from '../../redux/helpers/history'
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Table } from 'react-bootstrap'
import PaginationPage from '../Pagination/PaginationPage'
import { useDispatch, useSelector } from 'react-redux'
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
import * as ActionTypes from '../../redux/ActionTypes'


function useFetchUsers(query, page, limit, config) {
    const dispatch = useDispatch()
    const usersList = useSelector(state => state.users)
    
    const pageNo = page ? `&page=${page}` : ''
    const pageNoNext = page ? `&page=${ page + 1 }` : ''
    const pageNoNext2 = page ? `&page=${page + 2}` : ''
    const pageLimit = limit ? `&limit=${limit}` : ''
    const BASE_URL = `${baseUrl}users?q=${query}${pageNo}${pageLimit}`
    const BASE_URL2 = `${baseUrl}users?q=${ query }${ pageNoNext }${ pageLimit }`
    const BASE_URL3 = `${baseUrl}users?q=${query}${pageNoNext2}${pageLimit}`

    useEffect(() => {
        const cancelToken1 = axios.CancelToken.source()
        dispatch({ type:  ActionTypes.MAKE_REQUEST})
        axios.get(BASE_URL, config, {
            cancelToken: cancelToken1.token
        }).then(res => {
            dispatch({ type: ActionTypes.ADD_USERS, payload: res.data  }) 
        }).catch(e => {
            if (axios.isCancel(e)) return
            dispatch({ type: ActionTypes.USERS_FAILED, payload: e  }) 
        })

        const cancelToken2 = axios.CancelToken.source()
        axios.get(BASE_URL2, config, {
            cancelToken: cancelToken2.token
        }).then(res => {
            dispatch({ type: ActionTypes.UPDATE_HAS_NEXT_PAGE, payload: res.data.length !== 0  }) 
        }).catch(e => {
            if (axios.isCancel(e)) return
            dispatch({ type: ActionTypes.USERS_FAILED, payload: e  }) 
        })

        const cancelToken3 = axios.CancelToken.source()
        axios.get(BASE_URL3, config, {
            cancelToken: cancelToken3.token
        }).then(res => {
            dispatch({ type: ActionTypes.UPDATE_HAS_NEXT_NEXT_PAGE, payload: res.data.length !== 0 }) 
        }).catch(e => {
            if (axios.isCancel(e)) return
            dispatch({ type: ActionTypes.USERS_FAILED, payload: e }) 
        })

        return () => {
            cancelToken1.cancel()
            cancelToken2.cancel()
            cancelToken3.cancel()
        }
    }, [query, page])
    
    return usersList
}

const RenderUser = ({user, deleteUser, getUserDetails}) => {

    const handleUserView = async (userId) => {
        await getUserDetails(userId)
        history.push(`/admin/dashboard/users/view_user/${userId}`)
    }

    const handleUserEdit = async (userId) => {
        await getUserDetails(userId)
        history.push(`/admin/dashboard/users/edit_user/${userId}`)
    }

    return (
        <tr>
            <td>{user._id}</td>
            <td>{user.firstName}</td>
            <td>{user.lastName}</td>
            <td>{user.email}</td>
            <td className="action_cell_other">
                <span onClick={() => handleUserView(user._id)} className="action_icon" data-tip="View">
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
                <span onClick={() => handleUserEdit(user._id)} className="action_icon" data-tip="Edit">
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
                <span onClick={() => deleteUser(user._id)} className="action_icon" data-tip="Delete">
                    <img 
                        className="img_icon"
                        onMouseOver={e => e.currentTarget.src = deleteHovIcon} 
                        onMouseLeave={e => e.currentTarget.src = deleteIcon} 
                        src={deleteIcon} 
                        alt="delete icon" 
                        width="30" 
                    />
                    <ReactTooltip place="top" type="dark" effect="solid"/>
                </span>
            </td>
        </tr>
    )
}

export default function Users(props) {

    const token = 'Bearer ' + localStorage.getItem('token')
    const config = { headers: { 'Authorization': token } }
    const [page, setPage] = useState(1)
    const [query, setQuery] = useState('') 
    const { users, isLoading, errMess, hasNextPage, hasNextNextPage } = useFetchUsers(query, page, 10, config)
    
    const handleChangeInput = (e) => {
        const value = e.target.value
        setPage(1)
        setQuery(value)
    }
    

    const displayUsers = users.map(user => {
        return (
            <RenderUser 
                key={user._id} 
                user={user} 
                deleteUser={props.deleteUser} 
                getUserDetails={props.getUserDetails}
            />
        )
    })
  
  
    return (
        <div className="main_container_users" style={{marginTop: '3.4em',}}>
        <Breadcrumb style={{width: '13em'}}>
            <BreadcrumbItem><Link to="/admin/dashboard">Dashboard</Link></BreadcrumbItem>
            <BreadcrumbItem active>Users</BreadcrumbItem>
        </Breadcrumb>
            <div className="title_section">
                <h2 className="title_users">Users List</h2>
                <Link to="/admin/dashboard/users/add_new_user" data-tip="Add new user">
                <span className="plus_box">
                    <img 
                        className="img_icon"
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
                <label className="search_label" htmlFor="search_input">Search by User ID or First name</label>
                <input 
                    type="search"
                    id="searchBar"
                    placeholder="eg. Micheal"
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
                users.length ?
                <div>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>#ID</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        displayUsers
                    }
                    </tbody>
                </Table>
                </div>
                :
                <div className="no_user_found">
                    <p className="message_no_user">There are no users found. Retry with another search.</p>
                </div>
            }
            </div>
            <div className="pagination_section">
                <PaginationPage page={page} setPage={setPage} hasNextPage={hasNextPage} hasNextNextPage={hasNextNextPage}/>
            </div>
        </div>
    )
}