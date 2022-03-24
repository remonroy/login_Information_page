import * as Types from "../action/type";

export const userReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case Types.USER_LOGIN_REQUEST:
    case Types.USER_REGISTER_REQUEST:
    case Types.LOAD_USER_REQUEST:
      return {
        loading: true,
        isAuthenticated: false,
      };
    case Types.USER_LOGIN_SUCCESS:
    case Types.USER_REGISTER_SUCCESS:
    case Types.LOAD_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload,
      };
    case Types.LOGOUT_USER_SUCCESS:
      return {
        loading: false,
        isAuthenticated: false,
        user: null,
      };
    case Types.USER_LOGIN_FAIL:
    case Types.USER_REGISTER_FAIL:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        user: null,
        error: action.payload,
      };
    case Types.LOGOUT_USER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case Types.CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};
export const profileReducer = (state = {}, action) => {
  switch (action.type) {
    case Types.UPDATE_USER_REQUEST:
    case Types.UPDATE_PASSWORD_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case Types.UPDATE_USER_SUCCESS:
    case Types.UPDATE_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };

    case Types.UPDATE_USER_FAIL:
    case Types.UPDATE_PASSWORD_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case Types.UPDATE_USER_RESET:
    case Types.UPDATE_PASSWORD_RESET:
      return {
        ...state,
        isUpdated: false,
      };
    case Types.CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};
export const allUserReducer = (state = {}, action) => {
  switch (action.type) {
    case Types.SHOW_ALL_USER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case Types.SHOW_ALL_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        allUsers: action.payload,
      };

    case Types.SHOW_ALL_USER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case Types.CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};
export const forgotPasswordReducer = (state = {}, action) => {
  switch (action.type) {
    case Types.FORGOT_PASSWORD_REQUEST:
    case Types.RESET_PASSWORD_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case Types.FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        message: action.payload,
      };
    case Types.RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        success: action.payload,
      };

    case Types.FORGOT_PASSWORD_FAIL:
    case Types.RESET_PASSWORD_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case Types.FORGOT_PASSWORD_RESET:
      return {
        ...state,
        loading: false,
        message: null,
      };

    case Types.CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};
