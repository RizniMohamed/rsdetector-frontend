import { Box } from '@mui/material'
import React from 'react'
import Header from '../components/Header'
import { Outlet } from 'react-router-dom'

const App = () => {
    return (
        <Box>
            <Header />
            <Box px={1}>
                <Outlet />
            </Box>
        </Box>
    )
}

export default App