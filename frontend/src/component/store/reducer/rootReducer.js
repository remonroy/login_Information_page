import { combineReducers } from "redux";
import {
  allUserReducer,
  forgotPasswordReducer,
  profileReducer,
  userReducer,
} from "./userReducer";

const reducer = combineReducers({
  user: userReducer,
  profile: profileReducer,
  totalUser: allUserReducer,
  forgotPassword: forgotPasswordReducer,
});
export default reducer;
