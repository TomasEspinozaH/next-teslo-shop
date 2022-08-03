import { createContext } from 'react';
import { IPCartProduct, ShippingAddress } from '../../interfaces';

interface ContextProps {
  isLoaded: boolean;
  cart: IPCartProduct[];
  numberOfItems: number;
  subTotal: number;
  tax: number;
  total: number;

  shippingAddress?: ShippingAddress;

  //Methods
  addProductToCart: (product: IPCartProduct) => void; 
  updateCartQuantity: (product: IPCartProduct) => void;
  removeCartProduct: (product: IPCartProduct) => void;
  updateAddress: (address: ShippingAddress) => void

  // Orders
  createOrder: () => Promise<{ hasError: boolean; message: string }>;
}

export const CartContext = createContext({} as ContextProps);