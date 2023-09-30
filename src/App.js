import React, { useState } from 'react'
import Home from './pages/Home'
import Uploads from './pages/Uploads'
import Realtime from './pages/Realtime'
import { Box } from '@mui/material'
import Header from './components/Header'

const App = () => {
    const [page, setPage] = useState("Home")

    return (
        <Box >
            <Header page={page} setPage={setPage} />

            {page === "Home" && <Home />}
            {page === "Real Time" && <Realtime />}
            {page === "Uploads" && <Uploads />}
        </Box>
    )
}

export default App