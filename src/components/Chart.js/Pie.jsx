import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, Tooltip, ArcElement, Legend, Title }from 'chart.js'
import randomColor from 'randomcolor';
ChartJS.register(Tooltip, ArcElement, Legend, Title);

const options = {
    plugins: {
        title: {
            display: true,
            text: 'Top Languages',
            font: {
                size: 20
            },
            // color: "#4f46e5",
        },
            legend: {
               position: "top",
            },
           
    },
  };
const PieChart = ({ langauage }) => {

    const labels = Object.keys(langauage);
    const data = Object.values(langauage);
    const colors = randomColor({
        count: data.length,
        // hue: 'blue',
        luminosity: "dark",
    })
    const chartData = {
        labels: labels,
        datasets: [
            {
                labels: labels,
                data: data, 
                backgroundColor: colors,
                borderWidth: 1,
            },
        ],
    };

    return <Pie options={options} data={chartData} />;
};

export default PieChart;
