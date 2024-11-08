import React, { useEffect, useRef, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import SidebarLinkGroup from './SidebarLinkGroup';
import Logo from '../../images/logo/inventory_logo.png';
import { FaChartBar, FaCogs, FaBox, FaTruck, FaClipboardList, FaUsers, FaSignOutAlt, FaWarehouse, FaChartPie, FaFileExport } from 'react-icons/fa'; // Using icons from react-icons

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
    const location = useLocation();
    const { pathname } = location;

    const trigger = useRef(null);
    const sidebar = useRef(null);

    const storedSidebarExpanded = localStorage.getItem('sidebar-expanded');
    const [sidebarExpanded, setSidebarExpanded] = useState(
        storedSidebarExpanded === null ? false : storedSidebarExpanded === 'true'
    );

    // close on click outside
    useEffect(() => {
        const clickHandler = ({ target }) => {
            if (!sidebar.current || !trigger.current) return;
            if (
                !sidebarOpen ||
                sidebar.current.contains(target) ||
                trigger.current.contains(target)
            )
                return;
            setSidebarOpen(false);
        };
        document.addEventListener('click', clickHandler);
        return () => document.removeEventListener('click', clickHandler);
    });

    // close if the esc key is pressed
    useEffect(() => {
        const keyHandler = ({ keyCode }) => {
            if (!sidebarOpen || keyCode !== 27) return;
            setSidebarOpen(false);
        };
        document.addEventListener('keydown', keyHandler);
        return () => document.removeEventListener('keydown', keyHandler);
    });

    useEffect(() => {
        localStorage.setItem('sidebar-expanded', sidebarExpanded.toString());
        if (sidebarExpanded) {
            document.querySelector('body')?.classList.add('sidebar-expanded');
        } else {
            document.querySelector('body')?.classList.remove('sidebar-expanded');
        }
    }, [sidebarExpanded]);

    return (
        <aside
            ref={sidebar}
            className={`absolute left-0 top-0 z-9999 flex h-screen w-72.5 flex-col overflow-y-hidden bg-black duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                }`}
        >
            <div className="flex items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5">
                <NavLink to="/">
                    <img src={Logo} alt="Logo" />
                </NavLink>

                <button
                    ref={trigger}
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    aria-controls="sidebar"
                    aria-expanded={sidebarOpen}
                    className="block lg:hidden"
                >
                    <FaCogs />
                </button>
            </div>

            <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
                <nav className="mt-5 py-4 px-4 lg:mt-9 lg:px-6">
                    <div>
                        <h3 className="mb-4 ml-4 text-sm font-semibold text-bodydark2">
                            MENU
                        </h3>

                        <ul className="mb-6 flex flex-col gap-1.5">
                            <li>
                                <NavLink
                                    to="/dashboard"
                                    className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${pathname.includes('dashboard') && 'bg-graydark dark:bg-meta-4'
                                        }`}
                                >
                                    <FaChartBar />
                                    Dashboard
                                </NavLink>
                            </li>

                            <SidebarLinkGroup
                                activeCondition={pathname.includes('inventory')}
                            >
                                {(handleClick, open) => {
                                    return (
                                        <>
                                            <NavLink
                                                to="#"
                                                className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${pathname.includes('inventory') && 'bg-graydark dark:bg-meta-4'
                                                    }`}
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    sidebarExpanded
                                                        ? handleClick()
                                                        : setSidebarExpanded(true);
                                                }}
                                            >
                                                <FaWarehouse />
                                                Inventory Management
                                            </NavLink>

                                            <div className={`translate transform overflow-hidden ${!open && 'hidden'}`}>
                                                <ul className="mt-4 mb-5.5 flex flex-col gap-2.5 pl-6">
                                                    <li>
                                                        <NavLink
                                                            to="/inventory/list"
                                                            className="group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white"
                                                        >
                                                            Inventory List
                                                        </NavLink>
                                                    </li>
                                                    <li>
                                                        <NavLink
                                                            to="/inventory/add-edit"
                                                            className="group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white"
                                                        >
                                                            Add/Edit Product
                                                        </NavLink>
                                                    </li>
                                                    <li>
                                                        <NavLink
                                                            to="/inventory/stock-tracking"
                                                            className="group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white"
                                                        >
                                                            Stock Tracking
                                                        </NavLink>
                                                    </li>
                                                </ul>
                                            </div>
                                        </>
                                    );
                                }}
                            </SidebarLinkGroup>

                            <SidebarLinkGroup
                                activeCondition={pathname.includes('supplier')}
                            >
                                {(handleClick, open) => {
                                    return (
                                        <>
                                            <NavLink
                                                to="#"
                                                className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${pathname.includes('supplier') && 'bg-graydark dark:bg-meta-4'
                                                    }`}
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    sidebarExpanded
                                                        ? handleClick()
                                                        : setSidebarExpanded(true);
                                                }}
                                            >
                                                <FaTruck />
                                                Supplier Management
                                            </NavLink>

                                            <div className={`translate transform overflow-hidden ${!open && 'hidden'}`}>
                                                <ul className="mt-4 mb-5.5 flex flex-col gap-2.5 pl-6">
                                                    <li>
                                                        <NavLink
                                                            to="/supplier/list"
                                                            className="group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white"
                                                        >
                                                            Supplier List
                                                        </NavLink>
                                                    </li>
                                                    <li>
                                                        <NavLink
                                                            to="/supplier/add"
                                                            className="group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white"
                                                        >
                                                            Add Supplier
                                                        </NavLink>
                                                    </li>
                                                </ul>
                                            </div>
                                        </>
                                    );
                                }}
                            </SidebarLinkGroup>

                            <SidebarLinkGroup
                                activeCondition={pathname.includes('orders')}
                            >
                                {(handleClick, open) => {
                                    return (
                                        <>
                                            <NavLink
                                                to="#"
                                                className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${pathname.includes('orders') && 'bg-graydark dark:bg-meta-4'
                                                    }`}
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    sidebarExpanded
                                                        ? handleClick()
                                                        : setSidebarExpanded(true);
                                                }}
                                            >
                                                <FaClipboardList />
                                                Order Management
                                            </NavLink>

                                            <div className={`translate transform overflow-hidden ${!open && 'hidden'}`}>
                                                <ul className="mt-4 mb-5.5 flex flex-col gap-2.5 pl-6">
                                                    <li>
                                                        <NavLink
                                                            to="/orders/create"
                                                            className="group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white"
                                                        >
                                                            Create Order
                                                        </NavLink>
                                                    </li>
                                                    <li>
                                                        <NavLink
                                                            to="/orders/list"
                                                            className="group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white"
                                                        >
                                                            Order List
                                                        </NavLink>
                                                    </li>
                                                    <li>
                                                        <NavLink
                                                            to="/orders/fulfillment"
                                                            className="group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white"
                                                        >
                                                            Order Fulfillment
                                                        </NavLink>
                                                    </li>
                                                    <li>
                                                        <NavLink
                                                            to="/orders/tracking"
                                                            className="group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white"
                                                        >
                                                            Track Fulfillment
                                                        </NavLink>
                                                    </li>
                                                </ul>
                                            </div>
                                        </>
                                    );
                                }}
                            </SidebarLinkGroup>

                            <SidebarLinkGroup
                                activeCondition={pathname.includes('reports')}
                            >
                                {(handleClick, open) => {
                                    return (
                                        <>
                                            <NavLink
                                                to="#"
                                                className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${pathname.includes('reports') && 'bg-graydark dark:bg-meta-4'
                                                    }`}
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    sidebarExpanded
                                                        ? handleClick()
                                                        : setSidebarExpanded(true);
                                                }}
                                            >
                                                <FaChartPie />
                                                Reports and Analytics
                                            </NavLink>

                                            <div className={`translate transform overflow-hidden ${!open && 'hidden'}`}>
                                                <ul className="mt-4 mb-5.5 flex flex-col gap-2.5 pl-6">
                                                    <li>
                                                        <NavLink
                                                            to="/reports/sales"
                                                            className="group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white"
                                                        >
                                                            Sales Reports
                                                        </NavLink>
                                                    </li>
                                                    <li>
                                                        <NavLink
                                                            to="/reports/inventory"
                                                            className="group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white"
                                                        >
                                                            Inventory Reports
                                                        </NavLink>
                                                    </li>
                                                    <li>
                                                        <NavLink
                                                            to="/reports/export"
                                                            className="group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white"
                                                        >
                                                            Export Reports
                                                        </NavLink>
                                                    </li>
                                                </ul>
                                            </div>
                                        </>
                                    );
                                }}
                            </SidebarLinkGroup>

                            <SidebarLinkGroup
                                activeCondition={pathname.includes('users')}
                            >
                                {(handleClick, open) => {
                                    return (
                                        <>
                                            <NavLink
                                                to="#"
                                                className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${pathname.includes('users') && 'bg-graydark dark:bg-meta-4'
                                                    }`}
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    sidebarExpanded
                                                        ? handleClick()
                                                        : setSidebarExpanded(true);
                                                }}
                                            >
                                                <FaUsers />
                                                User Management
                                            </NavLink>

                                            <div className={`translate transform overflow-hidden ${!open && 'hidden'}`}>
                                                <ul className="mt-4 mb-5.5 flex flex-col gap-2.5 pl-6">
                                                    <li>
                                                        <NavLink
                                                            to="/users/roles"
                                                            className="group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white"
                                                        >
                                                            User Roles
                                                        </NavLink>
                                                    </li>
                                                    <li>
                                                        <NavLink
                                                            to="/users/manage"
                                                            className="group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white"
                                                        >
                                                            Manage Users
                                                        </NavLink>
                                                    </li>
                                                </ul>
                                            </div>
                                        </>
                                    );
                                }}
                            </SidebarLinkGroup>

                            <SidebarLinkGroup
                                activeCondition={pathname.includes('settings')}
                            >
                                {(handleClick, open) => {
                                    return (
                                        <>
                                            <NavLink
                                                to="#"
                                                className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${pathname.includes('settings') && 'bg-graydark dark:bg-meta-4'
                                                    }`}
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    sidebarExpanded
                                                        ? handleClick()
                                                        : setSidebarExpanded(true);
                                                }}
                                            >
                                                <FaCogs />
                                                Settings
                                            </NavLink>

                                            <div className={`translate transform overflow-hidden ${!open && 'hidden'}`}>
                                                <ul className="mt-4 mb-5.5 flex flex-col gap-2.5 pl-6">
                                                    <li>
                                                        <NavLink
                                                            to="/settings/profile"
                                                            className="group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white"
                                                        >
                                                            Profile
                                                        </NavLink>
                                                    </li>
                                                    <li>
                                                        <NavLink
                                                            to="/settings/system"
                                                            className="group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white"
                                                        >
                                                            System Settings
                                                        </NavLink>
                                                    </li>
                                                </ul>
                                            </div>
                                        </>
                                    );
                                }}
                            </SidebarLinkGroup>

                            <li>
                                <NavLink
                                    to="/logout"
                                    className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${pathname.includes('logout') && 'bg-graydark dark:bg-meta-4'
                                        }`}
                                >
                                    <FaSignOutAlt />
                                    Logout
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        </aside>
    );
};

export default Sidebar;
