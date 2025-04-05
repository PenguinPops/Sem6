import { render, screen } from '@testing-library/react'
import App from './App'

test('renders Migawka heading', () => {
  render(<App />)
  const headingElement = screen.getByText(/Migawka/i)
  expect(headingElement).toBeInTheDocument()
})