// components/Chart.tsx

import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    BarElement,
    CategoryScale,
    LinearScale,
} from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

interface ChartProps {
    data: number[];
}

const Chart: React.FC<ChartProps> = ({ data }) => {
    const chartData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
            {
                label: 'Monthly Data',
                data,
                backgroundColor: 'rgba(126, 34, 206, 0.6)',
                borderColor: 'rgba(126, 34, 206, 1)',
                borderWidth: 1,
            },
        ],
    };

    const options = {
        scales: {
            y: {
                beginAtZero: true,
            },
        },
        plugins: {
            legend: {
                display: false, // Disable the legend
            },
        },
    };

    return <Bar data={chartData} options={options} />;
};

export default Chart;
