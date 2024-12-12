import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, Tooltip, Title, CategoryScale, LinearScale, LineElement, ArcElement  } from 'chart.js'
ChartJS.register(Tooltip, BarElement, ArcElement, Title, CategoryScale, LinearScale, LineElement);
import randomColor from 'randomcolor';
 

const options = {
    plugins: {
        title: {
            display: true,
            text: 'Top Project by Stars',
            font: {
                size: 20
            },
        },
        legend: {
            display : false,
        }
    },
  };
const BarChart = ({ generateRandomColors, repos }) => {
    
// Generate multiple random colors
const labels = Object.keys(repos);
const data = Object.values(repos);
const colors = randomColor({
    count: data.length, // Number of colors to generate
    // hue: 'blue', // Generate a blueish color
  luminosity: 'dark' // Generate a light color
  });
    console.log(labels, data);
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

    return <Bar options={options} data={chartData}/>;
};

export default BarChart;
