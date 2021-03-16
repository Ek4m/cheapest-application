import { combineReducers } from "redux";
import { userReducer } from "./user";
import { wishlistReducer } from "./wishlist";

export const rootReducer = combineReducers({
    user:userReducer,
    wishlist: wishlistReducer
})