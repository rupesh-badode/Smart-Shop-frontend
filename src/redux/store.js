import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./slicer"

export default  configureStore({
    reducer:{
        cart:cartSlice
    }
})
