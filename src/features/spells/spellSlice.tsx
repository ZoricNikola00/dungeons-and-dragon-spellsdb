import {createSlice} from '@reduxjs/toolkit'


const initialState={
    spells:[],
    isLoading:true,
    spell:{},
    favorites:[]
}


const spellSlice=createSlice({
    name:'spells',
    initialState,
    reducers:{

    },
})

export default spellSlice.reducer