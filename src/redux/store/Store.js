import { configureStore } from '@reduxjs/toolkit';
import weatherReducer from '../slices/whetherSlices'
const Store = configureStore({
    reducer: {
        weatherReducer
    }
});
export default Store;