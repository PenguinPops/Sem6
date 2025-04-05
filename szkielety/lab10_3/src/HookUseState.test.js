import { render, fireEvent, screen } from '@testing-library/react'
import HookUseState from './HookUseState'
import App from './App'

describe('Testowanie stanu i właściwości', () => {
  it('po wciśnięciu przycisku zmienia się wartość state', () => {
    render(<HookUseState />)

    expect(screen.getByTestId('state-value').textContent).toBe("Wartość początkowa")
    fireEvent.click(screen.getByText("Zmień stan"))
    expect(screen.getByTestId('state-value').textContent).toBe("Inna wartość")
  })

  it('po wciśnięciu przycisku zmienia się wartość props', () => {
    render(<App />)
    
    expect(screen.getByTestId('name-value').textContent).toBe("zielony")
    fireEvent.click(screen.getByText("Zmień nazwę"))
    expect(screen.getByTestId('name-value').textContent).toBe("czerwony")
  })
})