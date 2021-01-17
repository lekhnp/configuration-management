import {
  LOGIN_COMPLETE,
  LOGIN_FAILURE,
  LOGIN_API_URL,
  //MHK_USER_LOGIN_API_URL,
  RESET_PASSWORD_CODE_API_URL,
  RESET_PASSWORD_CODE_SUCCESS,
  FORGET_PASSWORD_API_URL,
  FORGET_PASSWORD_SUCCESS,
  FORGET_PASSWORD_FAILURE,
  RESET_PASSWORD_CODE_FAILURE,
  LOGIN_ERROR,
  START_SPINNER_ACTION,
  SHOW_SNACKBAR_ACTION,
} from "../utils/AppConstants";
import {
  setRequestHeader,
  saveDataInLocalStorage,
  stopLoading,
} from "../utils/helpers";
import { DEFAULT_ERROR_MSG, LOGIN_SUCCESSFULLY_MSG, PASSWORD_UPDATED_SUCCESSFULLY_MSG} from "../utils/Messages";

export const doCognitoLogin = (username, password) => {
  return (dispatch) => {
    //const API_URL = userType === "MHK" ? MHK_USER_LOGIN_API_URL : LOGIN_API_URL;
    dispatch({ type: START_SPINNER_ACTION });
    return fetch(LOGIN_API_URL, {
      method: "post",
      body: JSON.stringify({ username, password }),
      headers: setRequestHeader(),
    })
      .then((response) => response.json())
      .then(
        (data) => {
          if (data && data.responseCode && data.responseCode !== "9000") {
            let resData = {
              responseCode: data.responseCode,
              responseMessage: data.responseMessage || "",
              responseObject: data.responseObject || data,
            };
            if (
              resData.responseCode === "9131" ||
              resData.responseCode === "9124"
            ) {
              saveDataInLocalStorage(resData);
              dispatch({
                type: SHOW_SNACKBAR_ACTION,
                payload: {
                  detail: LOGIN_SUCCESSFULLY_MSG,
                },
              });
            }
            // let userInfo = { ...data, ...getUserProfileInfo() }
            dispatch({ type: LOGIN_COMPLETE, payload: resData });
          } else {
            dispatch({
              type: LOGIN_ERROR,
              payload: data ? data : { message: DEFAULT_ERROR_MSG },
            });
          }
          stopLoading(dispatch);
        },
        (error) => {
          dispatch({ type: LOGIN_FAILURE, payload: error });
          stopLoading(dispatch);
        }
      );
  };
};

export const getForgetPasswordCode = (email) => {
  return (dispatch) => {
    //const API_URL = userType === "MHK" ? MHK_USER_LOGIN_API_URL : LOGIN_API_URL;
    dispatch({ type: START_SPINNER_ACTION });
    return fetch(RESET_PASSWORD_CODE_API_URL, {
      method: "post",
      body: email,
      //headers: setRequestHeader(),
    })
      .then((response) => response.json())
      .then(
        (data) => {
          if (
            data &&
            (data.responseCode === "200" || data.responseCode === 200)
          ) {
            dispatch({
              type: RESET_PASSWORD_CODE_SUCCESS,
              payload: true,
            });
          } else {
            dispatch({
              type: RESET_PASSWORD_CODE_FAILURE,
              payload: data.responseCode,
            });
          }
          stopLoading(dispatch);
        },
        (error) => {
          dispatch({ type: RESET_PASSWORD_CODE_FAILURE, payload: error });
          stopLoading(dispatch);
        }
      );
  };
};

export const forgetPassword = (payload) => {
  return (dispatch) => {
    //const API_URL = userType === "MHK" ? MHK_USER_LOGIN_API_URL : LOGIN_API_URL;
    dispatch({ type: START_SPINNER_ACTION });
    return fetch(FORGET_PASSWORD_API_URL, {
      method: "post",
      body: JSON.stringify(payload),
      headers: setRequestHeader(),
    })
      .then((response) => response.json())
      .then(
        (data) => {
          if (
            data &&
            (data.responseCode === "200" || data.responseCode === 200)
          ) {
            dispatch({
              type: FORGET_PASSWORD_SUCCESS,
              payload: true,
            });
            dispatch({
              type: SHOW_SNACKBAR_ACTION,
              payload: {
                detail: PASSWORD_UPDATED_SUCCESSFULLY_MSG,
              },
            });
          } else {
            dispatch({
              type: FORGET_PASSWORD_FAILURE,
              payload: data.responseCode,
            });
          }
          stopLoading(dispatch);
        },
        (error) => {
          dispatch({ type: FORGET_PASSWORD_FAILURE, payload: error });
          stopLoading(dispatch);
        }
      );
  };
};
