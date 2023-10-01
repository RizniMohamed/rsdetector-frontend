import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import App from './pages/App'
import Realtime from './pages/Realtime'
import Uploads from './pages/Uploads'
import Error from './pages/Error'

const Router = () => {

    return (
        <BrowserRouter basename="/">
            <Routes>
                <Route path="/" element={<App />} >
                    <Route index element={<Home />} />
                    <Route path="/realtime" element={<Realtime />} />
                    <Route path="/uploads" element={<Uploads />} />
                </Route>
                <Route path="*" element={<Error />} />
            </Routes>
        </BrowserRouter>
    )
}

export default Router