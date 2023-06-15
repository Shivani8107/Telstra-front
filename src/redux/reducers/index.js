import { combineReducers } from "redux";
import { productsReducer, selectedProductsReducer } from "./productsReducer";
import cartReducer from "./cartSlice"; 

const reducers = combineReducers({
  allProducts: productsReducer,
  product: selectedProductsReducer,
  cart: cartReducer, 
});

export default reducers;