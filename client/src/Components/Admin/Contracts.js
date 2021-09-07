import React,  { useEffect, useState } from 'react'
import axios from 'axios'
import moment from 'moment'
import { Breadcrumb, BreadcrumbItem } from 'reactstrap'
import { Loading } from '../LoadingComponent'
import { Link } from 'react-router-dom'
import { history } from '../../redux/helpers/history'
import { getContractDetails } from '../../redux/ActionCreators'
import { Table } from 'react-bootstrap'
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

function useFetchContracts(query, page, limit, config) {
    const dispatch = useDispatch()
    const contractsList = useSelector(state => state.contracts)
    
    const pageNo = page ? `&page=${page}` : ''
    const pageNoNext = page ? `&page=${ page + 1 }` : ''
    const pageNoNext2 = page ? `&page=${page + 2}` : ''
    const pageLimit = limit ? `&limit=${limit}` : ''
    const BASE_URL = `${baseUrl}contract?q=${query}${pageNo}${pageLimit}`
    const BASE_URL2 = `${baseUrl}contract?q=${ query }${ pageNoNext }${ pageLimit }`
    const BASE_URL3 = `${baseUrl}contract?q=${query}${pageNoNext2}${pageLimit}`
    

    useEffect(() => {
        const cancelToken1 = axios.CancelToken.source()
        dispatch({ type:  ActionTypes.MAKE_REQUEST_CONTRACTS})
        axios.get(BASE_URL, config,{
            cancelToken: cancelToken1.token
        }).then(res => {
            dispatch({ type: ActionTypes.ADD_CONTRACTS, payload: res.data  }) 
        }).catch(e => {
            if (axios.isCancel(e)) return
            dispatch({ type: ActionTypes.CONTRACTS_FAILED, payload: e  }) 
        })

        const cancelToken2 = axios.CancelToken.source()
        axios.get(BASE_URL2, config,{
            cancelToken: cancelToken2.token
        }).then(res => {
            dispatch({ type: ActionTypes.UPDATE_HAS_NEXT_PAGE_CONTRACTS, payload: res.data.length !== 0  }) 
        }).catch(e => {
            if (axios.isCancel(e)) return
            dispatch({ type: ActionTypes.CONTRACTS_FAILED, payload: e  }) 
        })

        const cancelToken3 = axios.CancelToken.source()
        axios.get(BASE_URL3, config ,{
            cancelToken: cancelToken3.token
        }).then(res => {
            dispatch({ type: ActionTypes.UPDATE_HAS_NEXT_NEXT_PAGE_CONTRACTS, payload: res.data.length !== 0 }) 
        }).catch(e => {
            if (axios.isCancel(e)) return
            dispatch({ type: ActionTypes.CONTRACTS_FAILED, payload: e }) 
        })

        return () => {
            cancelToken1.cancel()
            cancelToken2.cancel()
            cancelToken3.cancel()
        }
        // eslint-disable-next-line
    }, [query, page])
    
    return contractsList
}

const RenderContract = ({contract, deleteContract}) => {
    const dispatch = useDispatch()

    const handleContractView = async (contractId) => {
        await dispatch(getContractDetails(contractId))

        history.push(`/admin/dashboard/contracts/view_contract/${contractId}`)
    }

    const handleContractEdit = async (contractId) => {
        await dispatch(getContractDetails(contractId))

        history.push(`/admin/dashboard/contracts/edit_contract/${contractId}`)
    }

    const propertyGone = contract.property ? contract.property._id : '[DELETED]'
    const userGone = contract.user ? contract.user._id : '[DELETED]'

    return (
        <tr>
            <td>{contract._id}</td>
            <td>{propertyGone}</td>
            <td>{userGone}</td>
            <td>{moment(contract.start).format("DD/MM/YYYY")}</td>
            <td>{moment(contract.end).format("DD/MM/YYYY")}</td>
            <td className="action_cell_other">
                <span onClick={() => handleContractView(contract._id)} className="action_icon" data-tip="View">
                    <img 
                        className="img_icon"
                        onMouseOver={e => e.currentTarget.src = viewHovIcon} 
                        onMouseLeave={e => e.currentTarget.src = viewIcon} 
                        src={viewIcon} 
                        alt="view icon" 
                        width="30" 
                    />
                </span>
                <span onClick={() => handleContractEdit(contract._id)} className="action_icon" data-tip="Edit">
                    <img 
                        className="img_icon"
                        onMouseOver={e => e.currentTarget.src = editHovIcon} 
                        onMouseLeave={e => e.currentTarget.src = editIcon} 
                        src={editIcon} 
                        alt="edit icon" 
                        width="30" 
                    />
                </span>
                <span onClick={() => deleteContract(contract._id)} className="action_icon" data-tip="Delete">
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

export default function Contracts(props) {
        
    const token = 'Bearer ' + localStorage.getItem('token')
    const config = { headers: { 'Authorization': token } }
    const [page, setPage] = useState(1)
    const [query, setQuery] = useState('') 
    const { contracts, isLoading, errMess, hasNextPage, hasNextNextPage } = useFetchContracts(query, page, 10, config)

    
    const handleChangeInput = (e) => {
        const value = e.target.value
        setPage(1)
        setQuery(value)
    }

    const displayContracts = contracts.map(contract => {
        return (
            <RenderContract
                key={contract._id} 
                contract={contract} 
                deleteContract={props.deleteContract}
            />
        )
    })

    return (
        <div className="main_container_users" style={{marginTop: '3.4em',}}>
        <Breadcrumb style={{width: '13em'}}>
            <BreadcrumbItem><Link to="/admin/dashboard">Dashboard</Link></BreadcrumbItem>
            <BreadcrumbItem active>Contracts</BreadcrumbItem>
        </Breadcrumb>
            <div className="title_section">
                <h2 className="title_users">Contracts</h2>
                <Link to="/admin/dashboard/contracts/add_new_contract" >
                <span className="plus_box" data-tip="Add new contract">
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
                 <label className="search_label" htmlFor="search_input">Search by Property ID or User ID</label><br />
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
                contracts.length ?
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>#ID</th>
                            <th>Property ID</th>
                            <th>User ID</th>
                            <th>Start</th>
                            <th>End</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                    {displayContracts}
                    </tbody>
                </Table>
                :
                <div className="no_user_found">
                    <p className="message_no_user">There are no contracts found. Retry with another search.</p>
                </div>
            }
            </div>
            <div className="pagination_section">
                <PaginationPage page={page} setPage={setPage} hasNextPage={hasNextPage} hasNextNextPage={hasNextNextPage}/>
            </div>
        </div>
    )
}
