import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { useAppDispatch, useAppSelector } from '../../hooks/spellHooks'
import { store } from '../../store';
import { BrowserRouter } from 'react-router-dom';
import Favorite from './Favorite';

jest.mock('../../hooks/spellHooks');

describe('Spell component', () => {

    it('should display favorite component with empty list',()=>{
        const dispatchMock = jest.fn();
        (useAppDispatch as jest.Mock).mockReturnValue(dispatchMock);
        const selectorMock = { spells: [], isLoading: false, favorite: [] };
        (useAppSelector as jest.Mock).mockReturnValue(selectorMock);
        renderWithProvider(
            <Favorite />
        );
        expect(screen.getByText("You don't have any favorite spell!")).toBeInTheDocument()
    })

  it('should display favorite component and check remove option',()=>{
    const dispatchMock = jest.fn();
    (useAppDispatch as jest.Mock).mockReturnValue(dispatchMock);
    const selectorMock = { spells: [], isLoading: false, favorite: [{index:'fire', name: 'Fire', url:'/fire' },{index:'ice', name: 'Ice', url:'/ice' },{index:'frost', name: 'Frost', url:'/frost' }] };
    (useAppSelector as jest.Mock).mockReturnValue(selectorMock);
    renderWithProvider(
        <Favorite />
    );
    expect(screen.getByText('My Favorite Spells')).toBeInTheDocument()
    const removeButtons = screen.getAllByTestId('remove')
    fireEvent.click(removeButtons[0])
    expect(dispatchMock).toHaveBeenCalledWith({ type: 'spells/addFavorite', payload:{index:'fire', name: 'Fire', url:'/fire' }})
})


})

function renderWithProvider(element:React.ReactElement){
    render(<Provider store={store}>
        <BrowserRouter>{element}</BrowserRouter>
    </Provider>)
}