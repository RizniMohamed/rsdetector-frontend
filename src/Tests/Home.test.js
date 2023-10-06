import '@testing-library/jest-dom'
import { render, screen } from "@testing-library/react"
import Home from "../pages/Home"
import { ThemeProvider, createTheme } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';
import Theme from '../theme';


test("home component", () => {
    const theme = createTheme(Theme)
    render(
        <ThemeProvider theme={theme}>
            <BrowserRouter>
                <Home />
            </BrowserRouter>
        </ThemeProvider>
    );

    const text = screen.getByText(/Welcome to our Road Sign Detection project/i);
    expect(text).toBeInTheDocument();
})