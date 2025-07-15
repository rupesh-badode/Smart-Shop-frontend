import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    cartItems: [],
    cartItemsCount: 0
}

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const existingItem = state.cartItems.find(item => item.id === action.payload.id);
            if (existingItem) {
                existingItem.quantity = (existingItem.quantity || 1) + 1;
            } else {
                state.cartItems.push({ ...action.payload, quantity: 1 });
            }
            state.cartItemsCount = state.cartItems.reduce((sum, item) => sum + item.quantity, 0);
        },

        removeFromCart: (state, action) => {
            const idToRemove = action.payload.id;

            // 1. FIX: You used () instead of .filter()
            state.cartItems = state.cartItems.filter(item => item.id !== idToRemove);

            // 2. FIX: Use + instead of - in reduce (you want total sum)
            state.cartItemsCount = state.cartItems.reduce((sum, item) => sum + item.quantity, 0);
        },
        decreaseQty: (state, action) => {
            const item = state.cartItems.find(item => item.id === action.payload.id);
            if (item) {
                if (item.quantity > 1) {
                    item.quantity -= 1;
                } else {
                    // Remove the item if quantity is 1
                    state.cartItems = state.cartItems.filter(i => i.id !== item.id);
                }
            }
            state.cartItemsCount = state.cartItems.reduce((sum, item) => sum + item.quantity, 0);
        }
    }
})

export const { addToCart, removeFromCart,decreaseQty} = cartSlice.actions;
export default cartSlice.reducer;
