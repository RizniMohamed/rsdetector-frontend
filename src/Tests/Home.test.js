import '@testing-library/jest-dom'
import { render, screen } from "@testing-library/react"
import Home from "../pages/Home"

test("home component", () => {
    render(<Home />)
    const text = screen.getByText(/Home/i);
    expect(text).toBeInTheDocument();
})