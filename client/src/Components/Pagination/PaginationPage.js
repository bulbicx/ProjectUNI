import React from 'react'
import { Pagination } from 'react-bootstrap';

function PaginationPage( { page, setPage, hasNextPage, hasNextNextPage } )  {

    const adjustPage = (amount) => {
        setPage(prevPage => prevPage + amount)
    }

    return (
        <Pagination>
            {page !== 1 && <Pagination.Prev onMouseDown={e => e.preventDefault()} onClick={() => adjustPage(-1)} /> }
            {page !== 1 && <Pagination.Item onMouseDown={e => e.preventDefault()} onClick={() => setPage(1)}>1</Pagination.Item>}
            {page > 3 && <Pagination.Ellipsis /> }
            {page > 2 && <Pagination.Item onMouseDown={e => e.preventDefault()} onClick={() => adjustPage(-1)} >{page - 1}</Pagination.Item> }
            <Pagination.Item active>{page}</Pagination.Item>
            {hasNextPage && <Pagination.Item onMouseDown={e => e.preventDefault()} onClick={() => adjustPage(1)} >{page + 1}</Pagination.Item>}
            {hasNextNextPage && <Pagination.Item onMouseDown={e => e.preventDefault()} onClick={() => adjustPage(2)} >{page + 2}</Pagination.Item> }
            {hasNextPage && <Pagination.Next onMouseDown={e => e.preventDefault()} onClick={() => adjustPage(1)} /> }
        </Pagination>
    )
}


export default PaginationPage