import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { history } from '../../../redux/helpers/history'
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux'
import * as ActionTypes from '../../../redux/ActionTypes'
import PaginationPage from '../../Pagination/PaginationPage'
import SearchIcon from '@material-ui/icons/Search'
import { Loading } from '../../LoadingComponent'
import ReactTooltip from 'react-tooltip';
import plusIcon from '../../../assets/images/plus.png'
import plusHovIcon from '../../../assets/images/plusHov.png'
import viewIcon from '../../../assets/images/view.png'
import viewHovIcon from '../../../assets/images/viewHov.png'
import editIcon from '../../../assets/images/edit.png'
import editHovIcon from '../../../assets/images/editHov.png'
import deleteIcon from '../../../assets/images/delete.png'
import deleteHovIcon from '../../../assets/images/deleteHov.png'
import { baseUrl } from '../../../shared/baseUrl'

import "../style.css"
import { deleteFee, getFeeDetails } from '../../../redux/ActionCreators';

function useFetchFees(query, page, limit, config) {
    const dispatch = useDispatch()
    const feesList = useSelector(state => state.fees)
    
    const pageNo = page ? `&page=${page}` : ''
    const pageNoNext = page ? `&page=${ page + 1 }` : ''
    const pageNoNext2 = page ? `&page=${page + 2}` : ''
    const pageLimit = limit ? `&limit=${limit}` : ''
    const BASE_URL = `${baseUrl}fees?q=${query}${pageNo}${pageLimit}`
    const BASE_URL2 = `${baseUrl}fees?q=${ query }${ pageNoNext }${ pageLimit }`
    const BASE_URL3 = `${baseUrl}fees?q=${query}${pageNoNext2}${pageLimit}`

    useEffect(() => {
        const cancelToken1 = axios.CancelToken.source()
        dispatch({ type:  ActionTypes.MAKE_REQUEST_FEES})
        axios.get(BASE_URL, config, {
            cancelToken: cancelToken1.token
        }).then(res => {
            dispatch({ type: ActionTypes.ADD_FEES, payload: res.data  }) 
        }).catch(e => {
            if (axios.isCancel(e)) return
            dispatch({ type: ActionTypes.FEES_FAILED, payload: e  }) 
        })

        const cancelToken2 = axios.CancelToken.source()
        axios.get(BASE_URL2, config, {
            cancelToken: cancelToken2.token
        }).then(res => {
            dispatch({ type: ActionTypes.UPDATE_HAS_NEXT_PAGE_FEES, payload: res.data.length !== 0  }) 
        }).catch(e => {
            if (axios.isCancel(e)) return
            dispatch({ type: ActionTypes.FEES_FAILED, payload: e  }) 
        })

        const cancelToken3 = axios.CancelToken.source()
        axios.get(BASE_URL3, config,  {
            cancelToken: cancelToken3.token
        }).then(res => {
            dispatch({ type: ActionTypes.UPDATE_HAS_NEXT_NEXT_PAGE_FEES, payload: res.data.length !== 0 }) 
        }).catch(e => {
            if (axios.isCancel(e)) return
            dispatch({ type: ActionTypes.FEES_FAILED, payload: e }) 
        })

        return () => {
            cancelToken1.cancel()
            cancelToken2.cancel()
            cancelToken3.cancel()
        }
    }, [query, page])
    
    return feesList
}

const RenderFee = ({fee, deleteFee}) => {
    const dispatch = useDispatch()

    const handleFeeView = async (feeId) => {
        await dispatch(getFeeDetails(feeId))

        history.push(`/admin/dashboard/fees/view_fee/${feeId}`)
    }

    const handleFeeEdit = async (feeId) => {
        await dispatch(getFeeDetails(feeId))

        history.push(`/admin/dashboard/fees/edit_fee/${feeId}`)
    }

    return (
        <tr>
            <td>{fee._id}</td>
            <td>{fee.category}</td>
            <td>{fee.percentage}%</td>
            <td className="action_cell_other">
                <span onClick={() => handleFeeView(fee._id)} className="action_icon" data-tip="View">
                    <img 
                        className="img_icon"
                        onMouseOver={e => e.currentTarget.src = viewHovIcon} 
                        onMouseLeave={e => e.currentTarget.src = viewIcon} 
                        src={viewIcon} 
                        alt="view icon" 
                        width="30" 
                    />
                </span>
                <span onClick={() => handleFeeEdit(fee._id)} className="action_icon" data-tip="Edit">
                    <img 
                        className="img_icon"
                        onMouseOver={e => e.currentTarget.src = editHovIcon} 
                        onMouseLeave={e => e.currentTarget.src = editIcon} 
                        src={editIcon} 
                        alt="edit icon" 
                        width="30" 
                    />
                </span>
                <span onClick={() => deleteFee(fee._id)} className="action_icon" data-tip="Delete">
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


export default function Fees(props) {
    const alert = useSelector(state => state.alert)
    const token = 'Bearer ' + localStorage.getItem('token')
    const config = { headers: { 'Authorization': token } }
    const [page, setPage] = useState(1)
    const [query, setQuery] = useState('') 
    const { fees, isLoading, errMess, hasNextPage, hasNextNextPage } = useFetchFees(query, page, 10, config)

    const dispatch = useDispatch()
    
    const handleChangeInput = (e) => {
        const value = e.target.value
        setPage(1)
        setQuery(value)
    }

    const handleDeleteSale = (id) => {
        dispatch(deleteFee(id))
    }

    const displayFees = fees.map(fee => {
        return (
            <RenderFee 
                key={fee._id} 
                fee={fee} 
                deleteFee={handleDeleteSale} 
            />
        )
    })

    return (
        <div className="main_container_users" style={{marginTop: '3.4em',}}>
        <Breadcrumb style={{width: '12em'}}>
            <BreadcrumbItem><Link to="/admin/dashboard">Dashboard</Link></BreadcrumbItem>
            <BreadcrumbItem active>Fees</BreadcrumbItem>
        </Breadcrumb>
            <div className="title_section">
                <h2 className="title_users">Fees</h2>
                <Link to="/admin/dashboard/fees/add_new_fee">
                <span className="plus_box" data-tip="Add new fee">
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
                <label className="search_label" htmlFor="search_input">Search by Fee ID, percentage or category</label><br/>
                <input 
                    type="search"
                    id="searchBar"
                    placeholder="eg. 5ffe356b6d0f985e4003cc82"
                    className="search_input"
                    name="search_input"
                    value={query}
                    onChange={handleChangeInput}
                />
                <div className="search_icon">
                {    query.length <= 0 && <SearchIcon />}
                </div>
            </div>
            {alert.message &&
                <div style={{width: '37em', marginLeft: '1.9em'}} className={`alert ${alert.type}`}>
                    {alert.message}
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
                fees.length ?
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>#ID</th>
                            <th>Category</th>
                            <th>Percentage</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                    { displayFees }
                    </tbody>
                </Table>
                :
                <div className="no_user_found">
                    <p className="message_no_user">There are no fees found. Retry with another search.</p>
                </div>
            }
            </div>
            <div className="pagination_section">
                <PaginationPage page={page} setPage={setPage} hasNextPage={hasNextPage} hasNextNextPage={hasNextNextPage}/>
            </div>
        </div>
    )
}
