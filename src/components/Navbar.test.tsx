import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { Navbar } from './Navbar'
import { useNavigate } from 'react-router-dom'

jest.mock('react-router-dom', () => {
  return {
    useNavigate: jest.fn(),
  }
})

describe('Navbar component', () => {
  it('should render title and icon', () => {
    const { getByText, getByTestId } = render(<Navbar />)

    const title = getByText('Dungeons & Dragons SpellsDB')
    const icon = getByTestId('icon')

    expect(title).toBeInTheDocument()
    expect(icon).toBeInTheDocument()
  })

  it('should navigate to home page when title is clicked', () => {
    const navigate = jest.fn()
    ;(useNavigate as jest.Mock).mockReturnValue(navigate)

    const { getByText } = render(<Navbar />)

    const title = getByText('Dungeons & Dragons SpellsDB')

    fireEvent.click(title)

    expect(navigate).toHaveBeenCalledWith('/')
  })

  it('should navigate to favorite page when icon is clicked', () => {
    const navigate = jest.fn()
    ;(useNavigate as jest.Mock).mockReturnValue(navigate)

    const { getByTestId } = render(<Navbar />)

    const icon = getByTestId('icon')

    fireEvent.click(icon)

    expect(navigate).toHaveBeenCalledWith('/favorite')
  })
})
