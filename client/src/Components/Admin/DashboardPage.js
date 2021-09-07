import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core'
import { Loading } from '../LoadingComponent'
import "react-datepicker/dist/react-datepicker.css"
import profitIcon from '../../assets/images/profit.png'
import contractsIcon from '../../assets/images/contractGained.png'
import soldPropertyIcon from '../../assets/images/sold.png'
import statisticIcon from '../../assets/images/statistics.png'
import chart1 from '../../assets/images/chart1.PNG'
import chart2 from '../../assets/images/chart2.PNG'
import chart3 from '../../assets/images/chart3.PNG'
import chart4 from '../../assets/images/chart4.PNG'
import BarChart from './BarChart'
import PieChart from './PieChart'
import LineChart from './LineChart'
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import Slider from 'react-slick'
import './style.css'

const useStyles = makeStyles((theme) => ({
    container: {
        marginTop: '3.4em',
        width: '100%',
        background: '#F1F4F6',
    },
    title_section: {
        background: '#F7F9FA',
        display: 'flex',
        alignItems: 'center',
        padding: '0 2em'
    },
    title: {
        width: '100%',
        padding: '1.3em 1em',
        fontSize: '1.9rem',
        marginBottom: 0
    },
    performance_container: {
        margin: '1.3em 2em',
        background: 'white',
        boxShadow: '0px 0 6px 0px #707070',
    },
    performance_title: {
        padding: '0.5em 1.2em',
        marginBottom: 0,
        fontSize: '1.4rem'
    },
    performance_sub_container: {
        width: '100%',
        display: 'flex',
        '@media (max-width: 75em)': { //1200px
            flexDirection: 'column',
            alignItems: 'center'
        }
    },
    permormance_report: {
        width: '33.3%',
        display: 'flex',
        padding: '1em',
        '@media (max-width: 75em)': { //1200px
            width: '100%',
            justifyContent: 'center'
        }
    },
    performance_detail: {
        marginLeft: '1em'
    },
    performance_btn_section: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '1.1em'
    },
    icon_performance: {
        background: '#ABEBC6',
        borderRadius: '50%',
        width: 78,
        height: 78,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    performance_def: {
        fontSize: '1rem',
        marginBottom: 0,
        color: '#BEC0C3'
    },
    number_performance: {
        fontWeight: 'bold',
        fontSize: '2.4rem',
        marginBottom: 0
    },
    btn_complete_report: {
        background: '#5499C7',
        padding: '0.8em 1.65em',
        borderRadius: '3em',
        fontWeight: 'bold',
        color: 'white',
        border: 'none',
        boxShadow: '0px 0 3px 0px #707070',
        '&:hover': {
            background: '#7FB3D5'
        }
    },
    chart_timeline_section: {
        margin: '2em',
        display: 'flex',
        justifyContent: 'space-between',
        '@media (max-width: 118.75em)': { 
            flexDirection: 'column'
        }
    },
    chart_section: {
        background: 'white',
        width: '48%',
        boxShadow: '0px 0 6px 0px #707070',
        height: '27em',
        '@media (max-width: 118.75em)': { 
            width: '100%',
        }
    },
    chart_title: {
        padding: '0.5em 1.2em',
        marginBottom: 0,
        fontSize: '1.4rem'
    },
    mini_chart_section: {
        display: 'flex',
        justifyContent: 'space-between',
        margin: '2em',
        '@media (max-width: 93.75em)': { 
            flexDirection: 'column'
        }
    },
    mini_chart: {
        background: 'white',
        padding: '1em',
        width: '22%',
        boxShadow: '0px 0 6px 0px #707070',
        '@media (max-width: 93.75em)': { 
            width: '80%',
            marginTop: '1em'
        }
    },
    mini_chart_def: {
        color: '#BEC0C3',
        marginLeft: '1em'
    },
    mini_chart_amount: {
        fontWeight: 'bold',
        fontSize: '2.1rem',
        marginBottom: 0,
        marginLeft: '0.5em',
        marginTop: '0.8em'
    },
    span: {
        fontSize: '1.3rem',
        color: '#7F8C8D',
        fontWeight: 'normal'
    },
    timeline_section: {
        boxShadow: '0px 0 6px 0px #707070',
        background: 'white',
        width: '48%',
        height: '27em',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        '@media (max-width: 118.75em)': { 
            marginTop: '2em',
            width: '100%',
        }
    },
    container_btn_report: {
        display: 'flex',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        flexWrap: 'wrap'
    },
    report_btn: {
        background: 'red',
        borderRadius: '0.2em',
        height: '2em',
        width: '5.8em',
        display: 'flex',
        justifyContent:'center',
        alignItems: 'center',
        fontSize: '2rem',
        fontWeight: 'bold',
        marginTop: '0.5em'
    },
    profit_btn: {
        background: '#52BE80', 
        color: 'white',
        '&:hover': {
            background: '#229954',
            color: 'white',
            cursor: 'pointer',
            textDecoration: 'none',
        }
    },
    user_btn: {
        background: '#FBF5E0', 
        color: '#EBB953',
        '&:hover': {
            background: '#F7DC6F',
            color: 'white',
            cursor: 'pointer'
        }
    },
    property_btn: {
        background: '#E6EFFE', 
        color: '#6B8FF9',
        '&:hover': {
            background: '#6B8FF9',
            color: 'white',
            cursor: 'pointer'
        }
    },
    contract_btn: {
        background: '#D2B4DE', 
        color: '#A569BD',
        '&:hover': {
            background: '#AF7AC5',
            color: 'white',
            cursor: 'pointer'
        }
    },
    link_report: {
        '&:hover': {
            textDecoration: 'none',
        }
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        width: '31em'
    },
}))


function DashboardPage(props) {
    const classes = useStyles()

    const todayDate = new Date()
    const todayMonth = parseInt(todayDate.getMonth()) + 1
    const formattedTodayDate = todayDate.getDate() + '-' + todayMonth + '-' + todayDate.getFullYear()

    const minus7Date = new Date()
    minus7Date.setDate(minus7Date.getDate() - 7)
    const minus7Month = parseInt(minus7Date.getMonth()) + 1
    const formattedMinus7Date = minus7Date.getDate() + '-' + minus7Month + '-' + minus7Date.getFullYear()

    const minus14Date = new Date()
    minus14Date.setDate(minus14Date.getDate() - 14)
    const minus14Month = parseInt(minus14Date.getMonth()) + 1
    const formattedMinus14Date = minus14Date.getDate() + '-' + minus14Month + '-' + minus14Date.getFullYear()

    const minus21Date = new Date()
    minus21Date.setDate(minus21Date.getDate() - 21)
    const minus21Month = parseInt(minus21Date.getMonth()) + 1
    const formattedMinus21Date = minus21Date.getDate() + '-' + minus21Month + '-' + minus21Date.getFullYear()

    const minus28Date = new Date()
    minus28Date.setDate(minus28Date.getDate() - 28)
    const minus28Month = parseInt(minus28Date.getMonth()) + 1
    const formattedMinus28Date = minus28Date.getDate() + '-' + minus28Month + '-' + minus28Date.getFullYear()

    const minus35Date = new Date()
    minus35Date.setDate(minus35Date.getDate() - 35)
    const minus35Month = parseInt(minus35Date.getMonth()) + 1
    const formattedMinus35Date = minus35Date.getDate() + '-' + minus35Month + '-' + minus35Date.getFullYear()

    //sales chart 6 weeks
    let totSalesToday = 0
    if (props.todaySales.todaySales.length > 0) {
        props.todaySales.todaySales.map(sale => totSalesToday += sale.amount)
    }

    let totOneWeekBeforeSales = 0
    if(props.minus7Sales.minus7Sales.length > 0) {
        props.minus7Sales.minus7Sales.map(sale => totOneWeekBeforeSales += sale.amount)
    }

    let totTwoWeekBeforeSales = 0
    if(props.minus14Sales.minus14Sales.length > 0) {
        props.minus14Sales.minus14Sales.map(sale => totTwoWeekBeforeSales += sale.amount)
    }

    let totThreeWeekBeforeSales = 0
    if(props.minus21Sales.minus21Sales.length > 0) {
        props.minus21Sales.minus21Sales.map(sale => totThreeWeekBeforeSales += sale.amount)
    }

    let totFourWeekBeforeSales = 0
    if(props.minus28Sales.minus28Sales.length > 0) {
        props.minus28Sales.minus28Sales.map(sale => totFourWeekBeforeSales += sale.amount)
    }

    let totFiveWeekBeforeSales = 0
    if(props.minus35Sales.minus35Sales.length > 0) {
        props.minus35Sales.minus35Sales.map(sale => totFiveWeekBeforeSales += sale.amount)
    }
     
// eslint-disable-next-line
    const [chartData, setChartData] = useState({
        labels: [
            formattedMinus35Date, 
            formattedMinus28Date, 
            formattedMinus21Date, 
            formattedMinus14Date, 
            formattedMinus7Date, 
            formattedTodayDate
        ],
        datasets:[
        {
            label:'Sales',
            data:[ //values for population num
                totFiveWeekBeforeSales,
                totFourWeekBeforeSales,
                totThreeWeekBeforeSales,
                totTwoWeekBeforeSales,
                totOneWeekBeforeSales,
                totSalesToday
            ],
            backgroundColor:[
                'rgba(255, 99, 132, 0.6)',
                'rgba(54, 162, 235, 0.6)',
                'rgba(255, 206, 86, 0.6)',
                'rgba(75, 192, 192, 0.6)',
                'rgba(153, 102, 255, 0.6)',
                'rgba(255, 159, 64, 0.6)',
                'rgba(255, 99, 132, 0.6)'
            ]
        }
        ]
    })
    let charts = [
        <LineChart chartData={chartData} location="London" legendPosition="bottom" />,
        <BarChart chartData={chartData} location="London" legendPosition="bottom" />,
        <PieChart chartData={chartData} location="London" legendPosition="bottom" />
    ]

    const settings = {
        dots: true,
        fade: true,
        infinite: true,
        speed: 500,
        slideToShow: 1,
        arrows: true,
        slidesToScroll: 1,
        className: 'slides'
    }

    // let displayProfitResult = 0
    
    //last month reports
    let totLastMonthContract = 0
    if(props.contractsLastMonth !== false) {
        totLastMonthContract = props.contractsLastMonth.length
    }
    
    let totProfitLastMonth = 0
    let totLastMonthSoldProperties = 0
    if(props.profitLastMonth !== false) {
       props.profitLastMonth.map(sale => totProfitLastMonth += sale.amount)
       totLastMonthSoldProperties = props.profitLastMonth.filter(sale => sale.fee.category === 'buy').length 
    }

    let totNewUsersLastMonth = 0
    if(props.newUsersLastMonth !== false) {
        totNewUsersLastMonth = props.newUsersLastMonth.length
    }
    
    //this year report
    let totProfitThisYear = 0
    let totContractThisYear = 0
    let totSoldPropertiesThisYear = 0
    if(props.profitThisYear !== false) {
        props.profitThisYear.map(sale => totProfitThisYear += sale.amount)
        totContractThisYear = props.profitThisYear.filter(sale => sale.fee.category === 'rent').length
        totSoldPropertiesThisYear = props.profitThisYear.filter(sale => sale.fee.category === 'buy').length
    }

    let aKey = 0
    var formatter = new Intl.NumberFormat('en');
    
    return (
        <div className={classes.container}>
            <div className={classes.title_section}>
                <img src={statisticIcon} alt="icon statistic" />
                <h2 className={classes.title}>Analytics Dashboard</h2>
            </div>
            <div className={classes.performance_container}>
                <p className={classes.performance_title}>Performance</p>
                <hr style={{margin: 0}} />
                <div className={classes.performance_sub_container}>
                    <div className={classes.permormance_report}>
                        <span className={classes.icon_performance}><img width="55" src={profitIcon} alt="profit icon" /></span>
                        <div className={classes.performance_detail}>
                            <p className={classes.performance_def}>Profit (this year)</p>
                            <p style={{color: '#82E0AA'}} className={classes.number_performance}>{formatter.format(totProfitThisYear)}£</p>
                        </div>
                    </div>
                    <div className={classes.permormance_report}>
                        <span style={{background: '#F7DC6F'}} className={classes.icon_performance}><img style={{marginLeft: '0.6em'}} width="55" src={contractsIcon} alt="contract icon" /></span>
                        <div className={classes.performance_detail}>
                            <p className={classes.performance_def}>New Contracts (this year)</p>
                            <p style={{color: '#F4D03F'}} className={classes.number_performance}>
                                {totContractThisYear}
                            </p>
                        </div>
                    </div>
                    <div className={classes.permormance_report}>
                        <span style={{background: '#E74C3C'}} className={classes.icon_performance}><img width="55" src={soldPropertyIcon} alt="property icon" /></span>
                        <div className={classes.performance_detail}>
                            <p className={classes.performance_def}>Sold Properties (this year)</p>
                            <p style={{color: '#E74C3C'}} className={classes.number_performance}>
                                {totSoldPropertiesThisYear}
                            </p>
                        </div>
                    </div>
                </div>
                {/* <hr style={{margin: 0}} />
                <div className={classes.performance_btn_section}>
                    <button className={classes.btn_complete_report}>View Complete Report</button>
                </div> */}
            </div>
            <div className={classes.chart_timeline_section}>
                <div className={classes.chart_section}>
                    <p className={classes.chart_title}>Sales Reports</p>
                    <hr style={{margin: 0}} />
                    {
                        props.todaySales.isLoading ||
                        props.minus7Sales.isLoading ||
                        props.minus14Sales.isLoading ||
                        props.minus21Sales.isLoading ||
                        props.minus28Sales.isLoading ||
                        props.minus35Sales.isLoading
                        ?
                        <div className={classes.container}>
                            <Loading />
                        </div>
                        :
                        props.todaySales.errMess ||
                        props.minus7Sales.errMess ||
                        props.minus14Sales.errMess ||
                        props.minus21Sales.errMess ||
                        props.minus28Sales.errMess ||
                        props.minus35Sales.errMess
                        ?
                        <div className={classes.container}>
                            <h4>An error occured! Retry</h4>
                        </div>
                        :
                        props.todaySales.todaySales.length > 0 ||
                        props.minus7Sales.minus7Sales.length > 0 ||
                        props.minus14Sales.minus14Sales.length > 0 ||
                        props.minus21Sales.minus21Sales.length > 0 ||
                        props.minus28Sales.minus28Sales.length > 0 ||
                        props.minus35Sales.minus35Sales.length > 0
                        ?
                        <div style={{ width: '36vw', margin: 'auto'}}>
                            <Slider {...settings}>
                                {charts.map(chart => {
                                    aKey++
                                    return(
                                        <div key={aKey} style={{display: 'flex', justifyContent: 'center'}}>

                                            {chart} 
                                        </div>
                                    )
                                })}
                            </Slider>
                        </div>
                        :
                        <div></div>
                    }
                </div>
                <div className={classes.timeline_section}>
                <p className={classes.chart_title}>Produce Reports</p>
                <hr style={{margin: 0}} />
                <div className={classes.container_btn_report}>
                    <Link className={classes.link_report} to="/admin/dashboard/report-profit">
                        <div className={`${classes.report_btn} ${classes.profit_btn}`}>
                        Profit
                        </div>
                    </Link>
                    <Link className={classes.link_report} to="/admin/dashboard/report-users">
                        <div className={`${classes.report_btn} ${classes.user_btn}`}>Users</div>
                    </Link>
                    <Link className={classes.link_report} to="/admin/dashboard/report-properties">
                        <div className={`${classes.report_btn} ${classes.property_btn}`}>Properties</div>
                    </Link>
                    <Link className={classes.link_report} to="/admin/dashboard/report-contracts">
                        <div className={`${classes.report_btn} ${classes.contract_btn}`}>Contracts</div>
                    </Link>
                </div>
                </div>
            </div>
            <div className={classes.mini_chart_section}>
                <div style={{borderBottom: '4px solid #3AC47D'}} className={classes.mini_chart}>
                    <p className={classes.mini_chart_amount}>
                        <span className={classes.span}>£</span>{formatter.format(totProfitLastMonth)}
                    </p>
                    <p className={classes.mini_chart_def}>sales last month</p>
                    <img width="100%" src={chart1} alt="chart 1" />
                </div>
                <div style={{borderBottom: '4px solid #3F6AD8'}} className={classes.mini_chart}>
                    <p className={classes.mini_chart_amount}>
                        <span className={classes.span}>no. </span>{totNewUsersLastMonth}
                    </p>
                    <p className={classes.mini_chart_def}>new users last month</p>
                    <img width="100%" src={chart2} alt="chart 2" />
                </div>
                <div style={{borderBottom: '4px solid #F7B924'}} className={classes.mini_chart}>
                    <p className={classes.mini_chart_amount}>
                        <span className={classes.span}>no. </span>{totLastMonthSoldProperties}
                    </p>
                    <p className={classes.mini_chart_def}>sold properties last month</p>
                    <img width="100%" src={chart3} alt="chart 3" />
                </div>
                <div style={{borderBottom: '4px solid #D92550'}} className={classes.mini_chart}>
                    <p className={classes.mini_chart_amount}>
                        <span className={classes.span}>no. </span>{totLastMonthContract}
                    </p>
                    <p className={classes.mini_chart_def}>new contracts last month</p>
                    <img width="100%" src={chart4} alt="chart 4" />
                </div>
            </div>
        </div>
    )
}

export default DashboardPage