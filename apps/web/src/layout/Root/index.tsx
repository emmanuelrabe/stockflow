import React from 'react'
import { Outlet } from 'react-router'

import './Root.scss'

import SideBar from '@layout/SideBar'
import TopBar from '@layout/TopBar'

const Root: React.FC = () => {
    return (
        <>
            <SideBar />
            <TopBar />
            <main>
                <Outlet />
            </main>
        </>
    )
}

export default Root
