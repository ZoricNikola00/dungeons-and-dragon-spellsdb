import React from 'react'
type pagination = {
  spellsPerPage: number
  totalSpells: number
  currentPage: number
  setCurrentPage: (n: number) => void
}
const Pagination = ({ spellsPerPage, totalSpells, currentPage, setCurrentPage }: pagination) => {
  const pageNumbers = []

  for (let i = 1; i <= Math.ceil(totalSpells / spellsPerPage); i++) {
    pageNumbers.push(i)
  }
  return (
    <ul className='text-white flex items-center justify-center text-lg md:text-3xl mb-4 md:mb-0'>
      {pageNumbers.map((number) => (
        <li
          key={number}
          onClick={() => setCurrentPage(number)}
          className={`${
            currentPage === number ? 'bg-[#666633]' : 'bg-transparent'
          } rounded p-3 md:p-4 transition duration-300 hover:bg-[#666633] cursor-pointer m-1 md:m-2`}
        >
          {number}
        </li>
      ))}
    </ul>
  )
}

export default Pagination
