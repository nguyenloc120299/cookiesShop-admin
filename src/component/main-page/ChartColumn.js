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

const ChartColumn = ({ revenue }) => {
    console.log(revenue);
    const labels = revenue.map((item) => 'Tháng' + item.thang)

    const options = {
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
    const data = {
        labels,
        datasets: [
            {
                label: 'Tổng tiền',
                data: revenue.map((item) => item.total),
                backgroundColor: 'rgb(26, 148, 255)',
            },

        ],
    };
    return (
        <>
            <Bar options={options} data={data} />
        </>
    )
}

export default ChartColumn
