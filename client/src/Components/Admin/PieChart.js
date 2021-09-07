import React, { Component } from 'react'
import { Bar, Line, Pie } from 'react-chartjs-2'



class PieChart extends Component {
    constructor(props) {
        super(props)
        this.state = {
            chartData: props.chartData
        }
    }

    static defaultProps = {
        displayTitle: true,
        displayLegend: true,
        legendPosition: 'right',
        location: 'City'
    }

    render() {
        return (
            <div style={{width: '650px', margin: 'auto'}}>
                <Pie
                    data={this.state.chartData}
                    width={100}
                    height={50}
                    options={{
                        title: {
                            display: this.props.displayTitle,
                            text: 'Sales in ' + this.props.location,
                            fontSize: 25
                        },
                        legend: {
                            display: this.props.displayLegend,
                            position: this.props.legendPosition
                        },
                    }}
                />
            </div>
        )
    }
}

export default PieChart