import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Error from './pages/Error'
import Auth from './pages/Auth'

const Router = () => {

    return (
        <BrowserRouter basename="/">
            <Routes>
                <Route index element={<Auth />} />
                <Route path="/register" element={<Auth />} />
                <Route path="/home" element={<Home />} />
                <Route path="*" element={<Error />} />
            </Routes>
        </BrowserRouter>
    )
}

export default Router