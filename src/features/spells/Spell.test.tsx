import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { useAppDispatch, useAppSelector } from '../../hooks/spellHooks'
import { store } from '../../store'
import Spell from './Spell'
import { BrowserRouter } from 'react-router-dom'

jest.mock('../../hooks/spellHooks')

describe('Spell component', () => {
  it('should display loading component', () => {
    const dispatchMock = jest.fn()
    ;(useAppDispatch as jest.Mock).mockReturnValue(dispatchMock)
    const selectorMock = {
      spells: [
        { index: 'test-spell1', name: 'Test Spell 1', url: '/test-spell1' },
        { index: 'test-spell2', name: 'Test Spell 2', url: '/test-spell2' },
      ],
      isLoading: true,
      favorite: [],
    }
    ;(useAppSelector as jest.Mock).mockReturnValue(selectorMock)
    renderWithProvider(<Spell />)
    expect(screen.getByTestId('loader')).toBeInTheDocument()
  })

  it('renders Spell component and check favorite option', () => {
    const dispatchMock = jest.fn()
    ;(useAppDispatch as jest.Mock).mockReturnValue(dispatchMock)
    const selectorMock = {
      spell: {
        name: 'test spell',
        index: 'test-spell',
        level: 6,
        components: ['V', 'S', 'M'],
        range: 'Self',
        classes: [{ index: 'class-1', name: 'Class 1' }],
        casting_time: '1 action',
        concentration: false,
        duration: 'Instantaneous',
        attack_type: 'Ranged',
        material: 'test material',
        damage: { damage_type_name: 'test damage type' },
        school: { name: 'Test School' },
        desc: ['test description'],
        higher_level: ['test higher level description'],
      },
      isLoading: false,
      favorite: [],
    }
    ;(useAppSelector as jest.Mock).mockReturnValue(selectorMock)

    renderWithProvider(<Spell />)

    expect(dispatchMock).toHaveBeenCalledTimes(1)
    const favoriteButton = screen.getByTestId('favorite')
    fireEvent.click(favoriteButton)
    expect(dispatchMock).toHaveBeenCalledWith({
      type: 'spells/addFavorite',
      payload: {
        name: 'test spell',
        index: 'test-spell',
        level: 6,
        components: ['V', 'S', 'M'],
        range: 'Self',
        classes: [{ index: 'class-1', name: 'Class 1' }],
        casting_time: '1 action',
        concentration: false,
        duration: 'Instantaneous',
        attack_type: 'Ranged',
        material: 'test material',
        damage: { damage_type_name: 'test damage type' },
        school: { name: 'Test School' },
        desc: ['test description'],
        higher_level: ['test higher level description'],
      },
    })

    expect(screen.getByText('test spell')).toBeInTheDocument()
    expect(screen.getByText('6')).toBeInTheDocument()
    expect(screen.getByText('Self')).toBeInTheDocument()
    expect(screen.getByText('Ranged')).toBeInTheDocument()
    expect(screen.getByText('test damage type')).toBeInTheDocument()
    expect(screen.getByText('test description')).toBeInTheDocument()
    expect(screen.getByText('test higher level description')).toBeInTheDocument()
    expect(screen.getByText('test material')).toBeInTheDocument()
    expect(screen.getByText('Instantaneous')).toBeInTheDocument()
    expect(screen.getByText('YES')).toBeInTheDocument()

    expect(dispatchMock).toHaveBeenCalledTimes(2)
  })
})

function renderWithProvider(element: React.ReactElement) {
  render(
    <Provider store={store}>
      <BrowserRouter>{element}</BrowserRouter>
    </Provider>,
  )
}
