import React from 'react'
import {render} from '@testing-library/react'
import Background from './Background'

describe('Background component', () => {
  test('renders background image and overlay', () => {
    const {getByAltText, getByRole} = render(<Background />)
    const backgroundImage = getByAltText('background')
    const overlay = getByRole('presentation')

    expect(backgroundImage).toBeInTheDocument()
    expect(overlay).toBeInTheDocument()
  })
})