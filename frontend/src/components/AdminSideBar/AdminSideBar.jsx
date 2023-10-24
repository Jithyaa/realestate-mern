import React from 'react'
import { Link } from 'react-router-dom'
import '../AdminSideBar/AdminSideBar.css';

const AdminSideBar = () => {
    return (
        <div className="admin-sidebar">
            <ul className="adminsidebar-menu">
                <li>
                    <Link to="/admin/admin">
                        
                        <i class="fa-solid fa-user"></i>
                        User List
                    </Link>
                </li>
                <li>
                    <Link to="/admin/dashboard">
                        <i class="fa-solid fa-border-all"></i>
                        Dashbord
                    </Link>
                </li>
            </ul>
        </div>
    )
}

export default AdminSideBar
