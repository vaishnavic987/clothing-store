import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  totalAmount: 0,
  totalQuantity: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.items.find(
        item => item.id === newItem.id && item.selectedSize === newItem.selectedSize
      );

      if (existingItem) {
        existingItem.quantity++;
        existingItem.totalPrice = existingItem.quantity * existingItem.price;
      } else {
        state.items.push({
          id: newItem.id,
          name: newItem.name,
          price: newItem.price,
          image: newItem.image,
          selectedSize: newItem.selectedSize,
          quantity: 1,
          totalPrice: newItem.price,
        });
      }

      state.totalQuantity++;
      state.totalAmount += newItem.price;
    },

    removeFromCart: (state, action) => {
      const { id, selectedSize } = action.payload;
      const existingItem = state.items.find(
        item => item.id === id && item.selectedSize === selectedSize
      );

      if (existingItem) {
        state.totalQuantity -= existingItem.quantity;
        state.totalAmount -= existingItem.totalPrice;
        state.items = state.items.filter(
          item => !(item.id === id && item.selectedSize === selectedSize)
        );
      }
    },

    updateQuantity: (state, action) => {
      const { id, selectedSize, quantity } = action.payload;
      const existingItem = state.items.find(
        item => item.id === id && item.selectedSize === selectedSize
      );

      if (existingItem && quantity > 0) {
        const difference = quantity - existingItem.quantity;
        existingItem.quantity = quantity;
        existingItem.totalPrice = existingItem.quantity * existingItem.price;
        state.totalQuantity += difference;
        state.totalAmount += difference * existingItem.price;
      }
    },

    clearCart: (state) => {
      state.items = [];
      state.totalAmount = 0;
      state.totalQuantity = 0;
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
