import React, { useEffect, useRef, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import SidebarLinkGroup from './SidebarLinkGroup';
import Logo from '../../images/logo/logo.png';
import {
    FaChartBar, FaCogs, FaWarehouse, FaAdjust, FaSignOutAlt
} from 'react-icons/fa';
import { signOut } from 'firebase/auth';
import auth from '../../firebaseInit';

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
    const location = useLocation();
    const { pathname } = location;

    const trigger = useRef(null);
    const sidebar = useRef(null);

    const storedSidebarExpanded = localStorage.getItem('sidebar-expanded');
    const [sidebarExpanded, setSidebarExpanded] = useState(
        storedSidebarExpanded === null ? false : storedSidebarExpanded === 'true'
    );

    useEffect(() => {
        const clickHandler = ({ target }) => {
            if (!sidebar.current || !trigger.current) return;
            if (!sidebarOpen || sidebar.current.contains(target) || trigger.current.contains(target)) return;
            setSidebarOpen(false);
        };
        document.addEventListener('click', clickHandler);
        return () => document.removeEventListener('click', clickHandler);
    }, [sidebarOpen]);

    useEffect(() => {
        const keyHandler = ({ keyCode }) => {
            if (!sidebarOpen || keyCode !== 27) return;
            setSidebarOpen(false);
        };
        document.addEventListener('keydown', keyHandler);
        return () => document.removeEventListener('keydown', keyHandler);
    }, [sidebarOpen]);

    useEffect(() => {
        localStorage.setItem('sidebar-expanded', sidebarExpanded.toString());
        document.querySelector('body')?.classList.toggle('sidebar-expanded', sidebarExpanded);
    }, [sidebarExpanded]);

    return (
        <aside
            ref={sidebar}
            className={`absolute left-0 top-0 z-9999 flex h-screen w-72.5 flex-col overflow-y-hidden bg-black duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
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
                        <h3 className="mb-4 ml-4 text-sm font-semibold text-bodydark2">MENU</h3>
                        <ul className="mb-6 flex flex-col gap-1.5">
                            <li>
                                <NavLink
                                    to="/dashboard"
                                    className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${pathname.includes('dashboard') && 'bg-graydark dark:bg-meta-4'}`}
                                >
                                    <FaChartBar />
                                    Dashboard
                                </NavLink>
                            </li>

                            <SidebarLinkGroup activeCondition={pathname.includes('wallet')}>
                                {(handleClick, open) => (
                                    <>
                                        <NavLink
                                            to="#"
                                            className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${pathname.includes('wallet') && 'bg-graydark dark:bg-meta-4'}`}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                sidebarExpanded ? handleClick() : setSidebarExpanded(true);
                                            }}
                                        >
                                            <FaWarehouse />
                                            Wallet
                                        </NavLink>
                                        <div className={`translate transform overflow-hidden ${!open && 'hidden'}`}>
                                            <ul className="mt-4 mb-5.5 flex flex-col gap-2.5 pl-6">
                                                <li>
                                                    <NavLink
                                                        to="/wallet/add-money"
                                                        className="group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white"
                                                    >
                                                        Add Money
                                                    </NavLink>
                                                </li>
                                                <li>
                                                    <NavLink
                                                        to="/wallet/add-money-status"
                                                        className="group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white"
                                                    >
                                                        Add Money Status
                                                    </NavLink>
                                                </li>
                                                {/* <li>
                                                    <NavLink
                                                        to="/wallet/pay-link"
                                                        className="group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white"
                                                    >
                                                        Pay Link
                                                    </NavLink>
                                                </li>
                                                <li>
                                                    <NavLink
                                                        to="/wallet-history"
                                                        className="group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white"
                                                    >
                                                        Wallet Flow
                                                    </NavLink>
                                                </li> */}
                                            </ul>
                                        </div>
                                    </>
                                )}
                            </SidebarLinkGroup>

                            <SidebarLinkGroup activeCondition={pathname.includes('ad')}>
                                {(handleClick, open) => (
                                    <>
                                        <NavLink
                                            to="#"
                                            className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${pathname.includes('ad') && 'bg-graydark dark:bg-meta-4'}`}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                sidebarExpanded ? handleClick() : setSidebarExpanded(true);
                                            }}
                                        >
                                            <FaAdjust />
                                            Manage Ad Managers
                                        </NavLink>
                                        <div className={`translate transform overflow-hidden ${!open && 'hidden'}`}>
                                            <ul className="mt-4 mb-5.5 flex flex-col gap-2.5 pl-6">
                                                <li>
                                                    <NavLink
                                                        to="/ad/apply"
                                                        className="group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white"
                                                    >
                                                        Apply For Ad Manager
                                                    </NavLink>
                                                </li>
                                                <li>
                                                    <NavLink
                                                        to="/ad/account-list"
                                                        className="group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white"
                                                    >
                                                        Ad Account List
                                                    </NavLink>
                                                </li>
                                            </ul>
                                        </div>
                                    </>
                                )}
                            </SidebarLinkGroup>

                            <SidebarLinkGroup activeCondition={pathname.includes('settings')}>
                                {(handleClick, open) => (
                                    <>
                                        <NavLink
                                            to="#"
                                            className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${pathname.includes('settings') && 'bg-graydark dark:bg-meta-4'}`}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                sidebarExpanded ? handleClick() : setSidebarExpanded(true);
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
                                )}
                            </SidebarLinkGroup>

                            <li onClick={() => signOut(auth)}>
                                <NavLink
                                    to="/auth/signin"
                                    className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${pathname.includes('logout') && 'bg-graydark dark:bg-meta-4'}`}
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
