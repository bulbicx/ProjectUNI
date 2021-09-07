import React, { Component } from 'react'
import { Bar } from 'react-chartjs-2'


class BarChart extends Component {
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
                <Bar
                    data={this.state.chartData}
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
                        scales: {
                            yAxes: [{
                                ticks: {
                                    callback: function(value, index, values) {
                                        return '£' + value;
                                    }
                                }
                            }]
                        }
                    }}
                />
            </div>
        )
    }
}

export default BarChart