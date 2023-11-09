import React, { useEffect, useState } from 'react'
import AdminSideBar from '../components/AdminSideBar/AdminSideBar.jsx'
import { BarChart } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts';
import '../AdminCss/Dashboard.css';
import axios from '../axioss'


const Dashboard = () => {

    const [bookingCounts,setBookingCounts] = useState({ buy:0 , rent:0 });
    const [userCount,setUserCount] = useState(0)
    const [residencyCount,setResidencyCount] = useState(0)

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
                transform: 'translate(-1px, 0)',
            },
        },
    };

    const dataset = [
       {
        buy : bookingCounts.buy,
        rent : bookingCounts.rent,
        month:'Nov'
       }
    ];
    console.log("😤😤😤😤😤",bookingCounts.buy)
    console.log("😤😤😤😤😤",bookingCounts.rent)


    const valueFormatter = (value) => `${value}`;

    const fetchBookingCounts = ()=>{
        axios.get("/admin/count-booking").then((response)=>{
            setBookingCounts(response.data);
        })

        .catch((error)=>{
            console.error("Error fetching counts :", error);
        });
    };

    useEffect(()=>{
        fetchBookingCounts();
        fetchUserCount();
        fetchResidencyCount();
    },[]);


    const fetchUserCount = ()=>{
        axios.post("/admin/count-user").then((response)=>{
            setUserCount(response.data.userCount);
        }).catch((error)=>{
            console.error("Error fetching user count:", error);
        });
    };

    const fetchResidencyCount = ()=>{
        axios.post("/admin/count-residency").then((response)=>{
            setResidencyCount(response.data.residencyCount);
        }).catch((error)=>{
            console.error("Error fetching residency count:", error);
        });
    };

    return (
        <main className='main-container'>
            <AdminSideBar />
            <div className='main-title'>
                <h3><b><u>DASHBOARD</u></b></h3>
            </div>
            <div className='main-cards'>
                <div className='card'>
                    <div className='card-inner'>
                        <h4>Total Users</h4>
                        <i className="fa-solid fa-user"></i>
                    </div>
                    <h1>{userCount}</h1>
                </div>
                <div className='card'>
                    <div className='card-inner'>
                        <h4>Total Bookings </h4>
                        <i className="fa-solid fa-book-open"></i>
                    </div>
                    <h1>{bookingCounts.buy + bookingCounts.rent}</h1>
                </div>
                <div className='card'>
                    <div className='card-inner'>
                        <h4>Total Residencies</h4>
                        <i className="fa-solid fa-house"></i>
                    </div>
                    <h1>{residencyCount}</h1>
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
