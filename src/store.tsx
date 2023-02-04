import { configureStore } from "@reduxjs/toolkit";
import spellSlice from "./features/spells/spellSlice";

export const store=configureStore({
    reducer:{
        spells:spellSlice
    }
})
