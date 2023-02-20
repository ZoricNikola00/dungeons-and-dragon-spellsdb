import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import Pagination from './Pagination'

describe('Pagination component', () => {
  it('renders and functions correct', () => {
    const spellsPerPage = 10
    const totalSpells = 30
    const currentPage = 1
    const setCurrentPage = jest.fn()

    const { getByText } = render(
      <Pagination
        spellsPerPage={spellsPerPage}
        totalSpells={totalSpells}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />,
    )
    const firstPageBtn = getByText('1')
    const secondPageBtn = getByText('2')
    const thirdPageBtn = getByText('3')

    fireEvent.click(secondPageBtn)
    expect(setCurrentPage).toHaveBeenCalledWith(2)

    fireEvent.click(firstPageBtn)
    expect(setCurrentPage).toHaveBeenCalledWith(1)

    fireEvent.click(thirdPageBtn)
    expect(setCurrentPage).toHaveBeenCalledWith(3)
  })
})
