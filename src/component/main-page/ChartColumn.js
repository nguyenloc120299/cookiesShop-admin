import React from 'react'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);
export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: true,
            text: 'Doanh thu theo tháng',
        },
    },
};

const labels = ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10'
    , 'Tháng 11', 'Tháng 12'
];

export const data = {
    labels,
    datasets: [
        {
            label: 'Tổng tiền',
            data: [20, 30, 40, 10, 20, 20, 30, 40, 10, 20, 50, 70],
            backgroundColor: 'rgb(26, 148, 255)',
        },

    ],
};
const ChartColumn = () => {
    return (
        <>
            <Bar options={options} data={data} />
        </>
    )
}

export default ChartColumn
