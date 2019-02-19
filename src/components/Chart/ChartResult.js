import React from 'react';
import Chart from 'react-google-charts';
import '../../App.scss';

const ChartResult = (props) => {
    return (
        <Chart
            key={props.chartKey}
            height='79.5vh'
            chartType={props.chartType}
            data={
                [...props.chartData[0]]
            }
            options={{
                chartArea: { left: 60, right: 60, top: 60, bottom: 130 },
                legend: {position: 'none'},
                fontSize: 16,
                colors: ['darkorange'],
                backgroundColor: { fill:'transparent' },
                animation: {
                    duration: 1000,
                    easing: 'out',
                    startup: true,
                },
                hAxis: {
                    showTextEvery: 1,
                    textStyle : {
                        fontSize: 14
                    },
                    slantedText: true,
                    slantedTextAngle: 60
                },
                vAxis: {
                    textStyle : {
                        fontSize: 12,
                    },
                },
            }}
        />
    )
}

export default ChartResult;