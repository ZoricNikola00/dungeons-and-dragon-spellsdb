import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import Home from './Home'
import { useNavigate } from 'react-router-dom'

jest.mock('react-router-dom', () => {
  return {
    useNavigate: jest.fn(),
  }
})

describe('Home component', () => {
  it('should render title and button', () => {
    const { getByText, getByTestId } = render(<Home />)

    const title = getByText('Welcome to the Dungeons & Dragons SpellsDB')
    const button = getByTestId('check-spells')

    expect(title).toBeInTheDocument()
    expect(button).toBeInTheDocument()
  })

  it('should navigate to spells page when button is clicked', () => {
    const navigate = jest.fn()
    ;(useNavigate as jest.Mock).mockReturnValue(navigate)

    const { getByTestId } = render(<Home />)

    const button = getByTestId('check-spells')

    fireEvent.click(button)

    expect(navigate).toHaveBeenCalledWith('/spells')
  })
})
