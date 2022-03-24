import * as Types from "./type";
import axios from "axios";

//login user
export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: Types.USER_LOGIN_REQUEST });
    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.post(
      "/api/v1/login",
      { email, password },
      config
    );
    dispatch({
      type: Types.USER_LOGIN_SUCCESS,
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: Types.USER_LOGIN_FAIL,
      payload: error.response.data.message,
    });
  }
};
//register user
export const registerUser = (myForm) => async (dispatch) => {
  try {
    dispatch({ type: Types.USER_REGISTER_REQUEST });
    // const config = { headers: { "Content-Type": "multipart/form-data" } };
    const { data } = await axios.post("/api/v1/register", myForm);
    dispatch({
      type: Types.USER_REGISTER_SUCCESS,
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: Types.USER_REGISTER_FAIL,
      payload: error.response.data.message,
    });
  }
};
//register user
export const logoutUser = () => async (dispatch) => {
  try {
    await axios.get("/api/v1/logout");
    dispatch({
      type: Types.LOGOUT_USER_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: Types.LOGOUT_USER_FAIL,
      payload: error.response.data.message,
    });
  }
};

//load user
export const loadUser = () => async (dispatch) => {
  try {
    dispatch({ type: Types.LOAD_USER_REQUEST });

    const { data } = await axios.get("/api/v1/me");
    dispatch({
      type: Types.LOAD_USER_SUCCESS,
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: Types.LOAD_USER_FAIL,
      payload: error.response.data.message,
    });
  }
};

//edit profile
export const editUser = (myForm) => async (dispatch) => {
  try {
    dispatch({ type: Types.UPDATE_USER_REQUEST });

    const { data } = await axios.put("/api/v1/me/update", myForm);
    dispatch({
      type: Types.UPDATE_USER_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: Types.UPDATE_USER_FAIL,
      payload: error.response.data.message,
    });
  }
};

//get all users
export const getAllUsers = () => async (dispatch) => {
  try {
    dispatch({ type: Types.SHOW_ALL_USER_REQUEST });

    const { data } = await axios.get("/api/v1/admin/users");
    dispatch({
      type: Types.SHOW_ALL_USER_SUCCESS,
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: Types.SHOW_ALL_USER_FAIL,
      payload: error.response.data.message,
    });
  }
};

//password update
export const updatePassword = (password) => async (dispatch) => {
  try {
    dispatch({ type: Types.UPDATE_PASSWORD_REQUEST });

    const { data } = await axios.put("/api/v1/password/update", password);
    dispatch({
      type: Types.UPDATE_PASSWORD_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: Types.UPDATE_PASSWORD_FAIL,
      payload: error.response.data.message,
    });
  }
};

//Forgot password
export const forgotPasswordAction = (email) => async (dispatch) => {
  try {
    dispatch({ type: Types.FORGOT_PASSWORD_REQUEST });
    const { data } = await axios.post("/api/v1/password/forgot", email);
    dispatch({
      type: Types.FORGOT_PASSWORD_SUCCESS,
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: Types.FORGOT_PASSWORD_FAIL,
      payload: error.response.data.message,
    });
  }
};

//
export const resetPasswordAction = (token, password) => async (dispatch) => {
  try {
    dispatch({ type: Types.RESET_PASSWORD_REQUEST });
    const { data } = await axios.put(
      `/api/v1/password/reset/${token}`,
      password
    );
    dispatch({
      type: Types.RESET_PASSWORD_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: Types.RESET_PASSWORD_FAIL,
      payload: error.response.data.message,
    });
  }
};

//clearError
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: Types.CLEAR_ERRORS });
};
