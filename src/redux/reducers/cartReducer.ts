import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICartReducerInitialState } from "../../types/reducer-types";
import { CartItem, ShippingInfo } from "../../types/types";

const initialState: ICartReducerInitialState = {
  loading: false,
  cartItems: [],
  subTotal: 0,
  tax: 0,
  shippingCharges: 0,
  discount: 0,
  total: 0,
  shippingInfo: {
    address: "",
    city: "",
    state: "",
    country: "",
    pincode: "",
  },
};

export const cartReducer = createSlice({
  name: "cartReducer",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      state.loading = true;

      const index = state.cartItems.findIndex(
        (i) => i.productId === action.payload.productId
      );

      if (index !== -1) state.cartItems[index] = action.payload; //check later
      else {
        state.cartItems.push(action.payload);
      }

      state.loading = false;
    },

    removeFromCart: (state, action: PayloadAction<string>) => {
      state.loading = true;

      state.cartItems = state.cartItems.filter(
        (item) => item.productId !== action.payload
      );

      state.loading = false;
    },

    calculatePrice: (state) => {
      if (state.cartItems.length !== 0) {
        //check later
        state.subTotal = state.cartItems.reduce(
          (total, item) => item.price * item.quantity + total,
          0
        );

        state.shippingCharges = state.subTotal > 1000 ? 0 : 200;

        state.tax = Math.round(state.subTotal * 0.18);
        state.total =
          state.subTotal + state.tax + state.shippingCharges - state.discount;
      }
    },

    applyDiscount: (state, action: PayloadAction<number>) => {
      state.discount = action.payload;
    },

    saveShippingInfo: (state, action: PayloadAction<ShippingInfo>) => {
      state.shippingInfo = action.payload;
    },

    resetCart: () => initialState,
  },
});

export const {
  addToCart,
  removeFromCart,
  calculatePrice,
  applyDiscount,
  saveShippingInfo,
  resetCart,
} = cartReducer.actions;
