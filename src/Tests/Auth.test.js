import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import Auth from '../pages/Auth';
import '@testing-library/jest-dom/extend-expect';


describe('Auth Component', () => {

    it('should display the Login component when the URL path is /', () => {
        render(
            <MemoryRouter initialEntries={['/']}>
                <Routes>
                    <Route index element={<Auth />} />
                </Routes>
            </MemoryRouter>
        );
        expect(screen.getByText('Login')).toBeInTheDocument()
    });

    it('should display the Register component when the URL path is /register', () => {
        render(
            <MemoryRouter initialEntries={['/register']}>
                <Routes>
                    <Route path="/register" element={<Auth />} />
                </Routes>
            </MemoryRouter>
        );
        expect(screen.getByText('Register')).toBeInTheDocument();
    });

    it('should clear localStorage on initial render', () => {
        localStorage.setItem('token', 'some-token');
        render(
            <MemoryRouter initialEntries={['/']}>
                <Routes>
                    <Route index element={<Auth />} />
                </Routes>
            </MemoryRouter>
        );
        expect(localStorage.getItem('token')).toBeNull();
    });

});

