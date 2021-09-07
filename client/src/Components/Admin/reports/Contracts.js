import React, { useState, useEffect } from 'react'
import Pdf from "react-to-pdf"
import DatePicker from "react-datepicker"
import { makeStyles, TextField } from '@material-ui/core'
import { Loading } from '../../LoadingComponent'
import { Table } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom'
import moment from 'moment'
import ChartBarData from '../BarChart2'

const useStyles = makeStyles({
    container: {
        marginTop: '4.4em',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        padding: '2em',
        textAlign: 'center',
    },
    title_section: {
        fontSize: '2.3rem',
        fontWeight: 'bold',
        letterSpacing: '1px',
        marginBottom: '1em',
        
    },
    subtitle: {
        fontSize: '1.5rem',
        letterSpacing: '1px'
    },
    report_produce: {
        border: '1px solid #808B96',
        marginBottom: '1em',
        padding: '1em',
        background: '#F2F3F4'
    },
    date_section: {
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems:'center',
        marginTop: '2.4em',
        width: '28em',
        fontSize: '1.3rem'
    },
    report_produced_section: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '2em'
    },
    btn: {
        margin: '0.5em 0',
        fontSize: '1.4rem',
        border: 'none',
        padding: '0.5em 1em',
        borderRadius: '0.6em',
        fontWeight: 'bold',
        letterSpacing: '1px',
        background: '#7DCEA0',
        cursor: 'pointer',
        '&:hover': {
            background: '#A3E4D7',
            color: 'white'
        }
    },
    produce_pdf_btn: {
        padding: '0.5em 1.4em',
        background: '#C39BD3',
        '&:hover': {
            background: '#D7BDE2'
        }
    },
})


const ref = React.createRef()

const RenderContract = ({contract}) => {
    
    return  contract.length ? contract.map(el => {
        let indexZ = Date.now() + Math.random()

        return (
        <tr key={indexZ + 's'}>
            <td>{el._id}</td>
            {/* <td>{el.property.propertyName}</td>
            <td>{el.user.firstName} {el.user.lastName}</td> */}
            <td>{moment(el.start).format("DD/MM/YYYY")}</td>
            <td>{moment(el.end).format("DD/MM/YYYY")}</td>
        </tr>
        )
    }) 
    : 
    null
}

const RenderTotalContracts = ({ tot }) => {
    let indexX = Date.now() + Math.random() + 10
    let total =  0
    total = tot

    return (
        <tr key={indexX}>
            <td></td>
            <td></td>
            {/* <td></td>
            <td></td> */}
            <td>Tot: {total}</td>
        </tr>
    )
}

let salesRange = [] 
let dates = []

function ContractsReportPage(props) {
    const [startDate, setStartDate] = useState(new Date())
    const [endDate, setEndDate] = useState(new Date())
    const classes = useStyles()

    const contractsReportArr = useSelector(state => state.contractReport)
    const { contractReport, isLoading, errMess } = contractsReportArr
    console.log(contractReport)

    let totSaleRange = 0
    let weeks = [] //used for display on labels
    let rangeDate = [] //used for query date

    let titleGraph = "New Contracts Report"
    let typeData = "Contracts"

    const handleEndDate = (date) => {
        date.setHours(23)
        date.setMinutes(59)
        date.setSeconds(59)
        setEndDate(date)
    }

    const usePrevious = (value) => { //this method use the value passed and return it
        const ref = React.useRef()
        useEffect(() => {
            ref.current = value
        })
        return ref.current
    }


    //store profit length value to compare it
    const prevContracts = usePrevious(contractReport.length)

    useEffect(() => {
        if (prevContracts <= contractReport.length && contractReport.length > 0) {
            salesRange = []
            totSaleRange = 0

            for (let y = 0; y < contractReport.length; y++) {
    
                if (contractReport[y].length < 1) {
                    salesRange.push(0)
                } else {
                    contractReport[y].map(sale => totSaleRange += 1)
                    salesRange.push(totSaleRange)
                }
                totSaleRange = 0
            }
        }
    }, [contractReport])

    const ProduceContractsReport = async () => {

        const first = new Date(startDate)
        const last = new Date(endDate)
        dates = []
        let n = 0, n2 = 0

        while(true) {
            let dat = new Date(startDate)
            let dat2 = new Date(startDate)
            dat.setDate(dat.getDate() + n)
            dat2.setDate(dat2.getDate() + n2)
            
            if (dat < last) {
                weeks.push(dat)
                rangeDate.push(dat2)
                dates.push(dat)
            }
            else {
                let temp = new Date(endDate)
                temp.setDate(temp.getDate() -1)
                weeks.push(temp)
                rangeDate.push(temp)
                weeks.push(last)
                rangeDate.push(last)
                rangeDate.push(last)
                dates.push(last)//this is used for labels
                break
            } // if date goes beyond range break
            n += 7
            n2 = n - 1
        }

        let s = 0
        while (s < weeks.length - 1) {
            
            await props.getCustomContractsReport(weeks[s], rangeDate[s + 1])
            s++
        }

        props.customContractsReportClear()
        

    }

    
    if (isLoading) {
        return(
            <div className={classes.container}>
                <Loading />
            </div>
        )
    }
    else if (errMess) {
        return (
            <div className={classes.container}>
                <h4>{errMess}</h4>
            </div>
        )
    }
    else if (contractReport.length) {
        let tot = 0

        let next = 0
        let upTo = 6
        const displayContracts = contractReport.map(contract => {
            let indexQ =  Date.now() + Math.random() + 20
            tot = 0
            let displayTot = contract.length > 0 && contract.map(el => tot += 1)
            let newDate = new Date(startDate)
            let upToDate = new Date(startDate)
            newDate.setDate(newDate.getDate() + next)
            upToDate.setDate(upToDate.getDate() + upTo)
            next += 7
            upTo += 7
            if (newDate >= endDate) {
                newDate = new Date(endDate)
            }
            
            if (upToDate >= endDate) {
                upToDate = new Date(endDate)
            }

            if (newDate >= upToDate) {
                return
            }
            let date = `FROM  (${newDate.toString().split(' ')[0] + ' ' + newDate.toString().split(' ')[1] + ' ' + newDate.toString().split(' ')[2] + ' ' + newDate.toString().split(' ')[3]})  TO (${upToDate.toString().split(' ')[0] + ' ' + upToDate.toString().split(' ')[1] + ' ' + upToDate.toString().split(' ')[2] + ' ' + upToDate.toString().split(' ')[3]})`
            return (
                <div>
                    <h3>{date}</h3>
                <Table key={indexQ + 'z'} style={{marginBottom: '3em'}} striped bordered hover>
                    <thead>
                        <tr>
                            <th>#Contract ID</th>
                            {/* <th>Property Name</th>
                            <th>User</th> */}
                            <th>Start</th>
                            <th>End</th>
                        </tr>
                    </thead>
                    <tbody>
                    {<RenderContract key={indexQ + 'f'}  contract={contract} />}

                    {<RenderTotalContracts key={indexQ + 'e'} tot={tot} /> }
    
                    </tbody>
                </Table>
                </div>
            )
        })

        return (
            <div className={classes.container}>
            <Breadcrumb>
                <BreadcrumbItem><Link to="/admin/dashboard">Dashboard</Link></BreadcrumbItem>
                <BreadcrumbItem active>New Contracts report</BreadcrumbItem>
            </Breadcrumb>
                <h2 className={classes.title_section}>Contracts Report</h2>
                <div className={classes.report_produce}>
                    <p className={classes.subtitle}>Select dates for producing a report</p>
                    <div className={classes.date_section} >
                        <span> From </span>
                        <div >
                        <DatePicker
                            selected={startDate}
                            onChange={date => setStartDate(date)}
                            isClearable
                            placeholderText="I have been cleared!"
                        />
                        </div>
                        <span> to </span>
                        <div>
                        <DatePicker
                            selected={endDate}
                            onChange={handleEndDate}
                            isClearable
                            placeholderText="I have been cleared!"
                        />
                        </div>
                    </div>
                    <hr/>
                    <button className={`${classes.btn} ${classes.produce_report_btn}`} onClick={ProduceContractsReport}>Produce report</button>
                </div>
                {/* <Pdf targetRef={ref} filename="report.pdf">
                    {({ toPdf }) => <button className={`${classes.btn} ${classes.produce_pdf_btn}`} onClick={toPdf}>Generate Pdf</button>}
                </Pdf> */}
                <div style={{height: '100%'}} className={classes.report_produced_section} ref={ref}>
                    <h1 style={{marginBottom: '1em'}}><b>New Contracts from</b> {moment(startDate).format("DD/MM/YYYY")} <b>to</b> {moment(endDate).format("DD/MM/YYYY")}</h1>
                    <div style={{ width: '36vw', margin: 'auto'}}>
                     
                    {displayContracts}
                    <ChartBarData labels={dates} datas={salesRange} titleGraph={titleGraph} typeData={typeData}/>
                    </div>
                </div>
            </div>
        )
    }
    else {
        return (
            <div className={classes.container}>
            <Breadcrumb>
                <BreadcrumbItem><Link to="/admin/dashboard">Dashboard</Link></BreadcrumbItem>
                <BreadcrumbItem active>New Contracts report</BreadcrumbItem>
            </Breadcrumb>
                 <h2 className={classes.title_section}>Contracts Report</h2>
                <div className={classes.report_produce}>
                    <p className={classes.subtitle}>Select the dates for producing a weekly report</p>
                    <div className={classes.date_section} >
                        <span> From </span>
                        <div>
                        <DatePicker
                            selected={startDate}
                            onChange={date => setStartDate(date)}
                            isClearable
                            placeholderText="I have been cleared!"
                        />
                        </div>
                        <span> to </span>
                        <div>
                        <DatePicker
                            selected={endDate}
                            onChange={handleEndDate}
                            isClearable
                            placeholderText="I have been cleared!"
                        />
                        </div>
                    </div>
                    <hr/>
                    <button className={`${classes.btn} ${classes.produce_report_btn}`} onClick={ProduceContractsReport}>Produce report</button>
                </div>
            </div>
        )
    }
}

export default ContractsReportPage