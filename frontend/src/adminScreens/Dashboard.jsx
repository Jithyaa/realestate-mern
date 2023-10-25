import React from 'react'
import AdminSideBar from '../components/AdminSideBar/AdminSideBar.jsx'
import { BarChart } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts';
import '../AdminCss/Dashboard.css';


const Dashboard = () => {

    const chartSetting = {
        yAxis: [
            {
                label: 'count',
            },
        ],
        width: 500,
        height: 300,
        sx: {
            [`.${axisClasses.left} .${axisClasses.label}`]: {
                transform: 'translate(-20px, 0)',
            },
        },
    };

    const dataset = [
        {
            buy: 4,
            rent: 5,
            month: 'Sep',
        },
        {
            buy: 2,
            rent: 1,
            month: 'Oct',
        },
    ];


    const valueFormatter = (value) => `${value}`;

    return (
        <main className='main-container'>
            <AdminSideBar />
            <div className='main-title'>
                <h3><b>DASHBOARD</b></h3>
            </div>
            <div className='main-cards'>
                <div className='card'>
                    <div className='card-inner'>
                        <h4>Total Users</h4>
                        <i class="fa-solid fa-user"></i>
                    </div>
                    <h1>2</h1>
                </div>
                <div className='card'>
                    <div className='card-inner'>
                        <h4>Total Bookings </h4>
                        <i class="fa-solid fa-book-open"></i>
                    </div>
                    <h1>12</h1>
                </div>
                <div className='card'>
                    <div className='card-inner'>
                        <h4>Total Residencies</h4>
                        <i class="fa-solid fa-house"></i>
                    </div>
                    <h1>4</h1>
                </div>
            </div>
            <div className='charts'>
                <BarChart
                    dataset={dataset}
                    xAxis={[{ scaleType: 'band', dataKey: 'month' }]}
                    series={[
                        { dataKey: 'buy', label: 'Buy', valueFormatter },
                        { dataKey: 'rent', label: 'Rent', valueFormatter },
                    ]}
                    {...chartSetting}
                />
            </div>

        </main>
    )
}

export default Dashboard
