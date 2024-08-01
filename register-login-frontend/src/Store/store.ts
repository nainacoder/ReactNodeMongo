import { thunk } from 'redux-thunk';
import { Tuple, configureStore } from '@reduxjs/toolkit';
import ProductSliceReducer from '../components/reducer/ProductSliceReducer';

const store = configureStore({
  reducer: {
    cart: ProductSliceReducer,
  },
  middleware: () => new Tuple(thunk),
});

export default store;
