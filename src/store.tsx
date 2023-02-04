import { configureStore } from "@reduxjs/toolkit";
import spellSlice from "./features/spells/spellSlice";

export const store=configureStore({
    reducer:{
        spells:spellSlice
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch