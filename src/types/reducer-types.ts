import { CartItem, ShippingInfo, User } from "./types";

export interface IUserReducerInitialState {
  user: User | null;
  loading: boolean;
}

export interface ICartReducerInitialState {
  loading: boolean;
  cartItems: CartItem[];
  subTotal: number;
  tax: number;
  shippingCharges: number;
  discount: number;
  total: number;
  shippingInfo: ShippingInfo;
}
