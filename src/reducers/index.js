import { combineReducers } from "redux";
import usersReducer from "./usersReducer";
import numbersReducer from "./numbersReducer"

export default combineReducers({
    users: usersReducer,
    phones: numbersReducer,
});

