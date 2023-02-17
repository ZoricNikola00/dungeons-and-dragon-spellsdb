import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { useAppDispatch, useAppSelector } from '../../hooks/spellHooks'
import { store } from '../../store';
import { BrowserRouter } from 'react-router-dom';
import Spells from './Spells';

jest.mock('../../hooks/spellHooks');

describe('Spells component', () => {
    it('should display loading component',()=>{
        const dispatchMock = jest.fn();
        (useAppDispatch as jest.Mock).mockReturnValue(dispatchMock);
        const selectorMock = { spells: [], isLoading: true };
        (useAppSelector as jest.Mock).mockReturnValue(selectorMock);
        renderWithProvider(
            <Spells />
        );
        expect(screen.getByTestId('loader')).toBeInTheDocument()
    })

  it('should render Spells component and check search and letter filter', () => {
    const dispatchMock = jest.fn();
    (useAppDispatch as jest.Mock).mockReturnValue(dispatchMock);
    const selectorMock = { spells: [{index:'fire', name: 'Fire', url:'/fire' },{index:'ice', name: 'Ice', url:'/ice' },{index:'frost', name: 'Frost', url:'/frost' },], isLoading: false};
    (useAppSelector as jest.Mock).mockReturnValue(selectorMock);

    renderWithProvider(
        <Spells />
    );
    //Initial state
    expect(screen.getByTestId('head')).toHaveTextContent('All Spells')
    const spells=screen.getByTestId('spells')
    expect(spells.childElementCount).toEqual(3)

    //Filter spells by letter F
    const letterI = screen.getByText('F');
    fireEvent.click(letterI);
    expect(screen.getByTestId('head')).toHaveTextContent('All spells on letter: F')
    expect(spells.childElementCount).toEqual(2)

    //Filter to show all spells
    const letterAll=screen.getByText('#')
    fireEvent.click(letterAll)
    expect(screen.getByTestId('head')).toHaveTextContent('All Spells')
    expect(spells.childElementCount).toEqual(3)

    //Filter spells with search input
    fireEvent.change(screen.getByPlaceholderText("Search for spell..."), {
        target: { value: "Ice" }
      });
    const submitBtn = screen.getByRole('button');
    fireEvent.click(submitBtn)
    expect(spells.childElementCount).toEqual(1)
    expect(screen.getByTestId('head')).toHaveTextContent('Your search word was: Ice')

  });
});

function renderWithProvider(element:React.ReactElement){
    render(<Provider store={store}>
        <BrowserRouter>{element}</BrowserRouter>
    </Provider>)
}