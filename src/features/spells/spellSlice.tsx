import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
const url = 'https://www.dnd5eapi.co/api/spells/'

interface SpellsType {
  index: string
  name: string
  url: string
}

interface SpellType {
  index: string
  name: string
  desc: string[]
  higher_level?: string[]
  range: string
  components: string[]
  material: string
  area_of_effect?: {
    type: string
    size: number
  }
  ritual: boolean
  duration: string
  concentration: boolean
  casting_time: string
  level: number
  attack_type: string
  school: SpellsType
  dc?: {
    dc_type: SpellsType
    dc_success: string
  }
  damage?: any
  classes: SpellsType[]
  subclasses: SpellsType[]
  url: string
}

interface InitialStateType {
  spells: SpellsType[]
  isLoading: boolean
  spell: SpellType | null
  favorite: SpellType[]
}

const initialState: InitialStateType = {
  spells: [],
  isLoading: true,
  spell: null,
  favorite:
    localStorage.getItem('favorite') !== undefined
      ? JSON.parse(localStorage.getItem('favorite') || '[]')
      : [],
}
export interface formType {
  letter?: string
  query: string
}
export const getAllSpells = createAsyncThunk('spells/getAll', async (_, { getState }: any) => {
  let data = getState().spells.spells
  try {
    if (data.length < 1) {
      const res = await axios(url)
      data = res.data.results
    }
    return data
  } catch (err) {
    console.log(err)
  }
})

export const getSpell = createAsyncThunk(
  'spells/single',
  async (id: string | undefined, { getState }: any) => {
    let data = getState().spells.spell
    try {
      if (!data || data.index !== id) {
        const res = await axios(url + id)
        data = res.data
      }
      return data
    } catch (err) {
      console.log(err)
    }
  },
)

const spellSlice = createSlice({
  name: 'spells',
  initialState,
  reducers: {
    addFavorite: (state, action) => {
      const newSpell: SpellType = action.payload
      const existingSpell = state.favorite?.find(
        (spell: SpellType) => spell.index === newSpell.index,
      )
      if (!existingSpell) {
        state.favorite.push(newSpell)
      } else {
        state.favorite = state.favorite?.filter(
          (spell: SpellType) => spell.index !== newSpell.index,
        )
      }
      localStorage.setItem('favorite', JSON.stringify(state.favorite))
    },
  },
  extraReducers(builder) {
    builder.addCase(getAllSpells.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(getAllSpells.fulfilled, (state, action) => {
      state.isLoading = false
      state.spells = action.payload
    })
    builder.addCase(getAllSpells.rejected, (state) => {
      state.isLoading = false
    })
    builder.addCase(getSpell.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(getSpell.fulfilled, (state, action) => {
      state.isLoading = false
      state.spell = action.payload
    })
    builder.addCase(getSpell.rejected, (state) => {
      state.isLoading = false
    })
  },
})

export const { addFavorite } = spellSlice.actions

export default spellSlice.reducer
