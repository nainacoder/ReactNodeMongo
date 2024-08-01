import { createSlice } from '@reduxjs/toolkit';

type InitialState = any;

const initialState = {
  products: [],
  cartItems: [],
} as InitialState;

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    getProducts(state, action) {
      const productIds = action.payload.map((item: any) => item._id); //[]
      state.cartItems = state.cartItems.filter((item: any) =>
        productIds.includes(item._id)
      );
      state.products = action.payload;
    },

    addToCart(state, action) {
      const itemIndex = state.cartItems.findIndex(
        (item: any) => item._id === action.payload._id
      );
      if (itemIndex >= 0) {
        state.cartItems[itemIndex].cartQuantity += 1;
      } else {
        const tempProduct = {
          ...action.payload,
          cartQuantity: 1,
        };
        state.cartItems.push(tempProduct);
      }
    },
  },
});

export const { addToCart, getProducts } = cartSlice.actions;
export default cartSlice.reducer;
