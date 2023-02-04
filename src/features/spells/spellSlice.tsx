import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'
const url='https://www.dnd5eapi.co/api/spells/'

interface SpellsType{
    index:string,
    name:string,
    url:string
}

interface SpellType{
    index:string,
    name:string,
    desc:string[],
    higher_level?:string[],
    range:string,
    components:string[],
    material:string,
    area_of_effect?:{
        type:string,
        size:number
    }
    ritual:boolean,
    duration:string,
    concetration:boolean,
    casting_time:string,
    level:number,
    attack_type:string,
    school:SpellType,
    dc?:{
        dc_type:SpellType,
        dc_success:string
    }
    damage?:any,
    classes:SpellType[],
    subclasses:SpellType[],
    url:string}

interface InitialStateType{
    spells:SpellsType[],
    isLoading:boolean,
    spell:SpellType|{},
    favorites?:SpellType[]
}

const initialState:InitialStateType={
    spells:[],
    isLoading:true,
    spell:{},
    favorites:[]
}
export interface formType{
    letter?:string,
    query:string
}
export const getAllSpells=createAsyncThunk('spells/getAll', async({letter, query}:formType)=>{
    try{
        const res = await axios(url)
        const data=res.data.results
        return (
        letter!=='#'?data.filter((item:SpellsType)=>item.name[0]===letter)
        : 
        query ? data.filter((item:SpellsType)=>item.name.toLowerCase().includes(query.toLowerCase()))
        :
        data
        )
    }
    catch(err){
        console.log(err)
    }
})

export const getSpell=createAsyncThunk('spells/single',async (id:string|undefined) => {
    try{
        const res = await axios(url+id)
        return res.data
    }catch(err){
        console.log(err)
    }
})

const spellSlice=createSlice({
    name:'spells',
    initialState,
    reducers:{

    },
    extraReducers(builder){
        builder.addCase(getAllSpells.pending, (state)=>{
            state.isLoading=true
        });
        builder.addCase(getAllSpells.fulfilled, (state, action)=>{
            state.isLoading=false
            state.spells=action.payload
        });
        builder.addCase(getAllSpells.rejected, (state)=>{
            state.isLoading=false
        });
        builder.addCase(getSpell.pending, (state)=>{
            state.isLoading=true
        });
        builder.addCase(getSpell.fulfilled, (state,action)=>{
            state.isLoading=false
            state.spell=action.payload
        });
        builder.addCase(getSpell.rejected, (state)=>{
            state.isLoading=false
        });

    }
})

export default spellSlice.reducer