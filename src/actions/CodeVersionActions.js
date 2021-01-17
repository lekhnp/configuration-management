import {
  FETCHCODEVERSION_API_URL,
  FETCH_CODEVERSION_COMPLETE,
  FETCH_CODEVERSION_FAILURE,
  ADDCODEVERSION_API_URL,
  ADD_CODEVERSION_COMPLETE,
  ADD_CODEVERSION_ERROR,
  ADD_CODEVERSION_FAILURE,
  DELETECODEVERSION_API_URL,
  DELETE_CODEVERSION_COMPLETE,
  DELETE_CODEVERSION_ERROR,
  DELETE_CODEVERSION_FAILURE,
  SHOW_SNACKBAR_ACTION,
  START_SPINNER_ACTION,
  HIDE_MESSAGE_DIALOG,
  RESET_DUPLICATE_ERROR,
} from "../utils/AppConstants";
import { setRequestHeader, stopLoading } from "../utils/helpers";
import { handleCodeVersionAddMsg,handleCodeVersionTermMsg } from "../utils/Messages";

export const fetchCodeVersion = () => {
  return (dispatch) => {
    dispatch({ type: START_SPINNER_ACTION });
    return fetch(FETCHCODEVERSION_API_URL, {
      headers: setRequestHeader(),
    })
      .then((response) => response.json())
      .then(
        (data) => {
          if (
            data &&
            (data.responseCode === "200" || data.responseCode === 200)
          ) {
            data.responseObject.sort((a, b) => (a.id < b.id ? 1 : -1));
            dispatch({
              type: FETCH_CODEVERSION_COMPLETE,
              payload: data.responseObject,
            });
          } else {
            dispatch({ type: FETCH_CODEVERSION_FAILURE, payload: data });
          }
          stopLoading(dispatch);
        },
        (error) => {
          dispatch({ type: FETCH_CODEVERSION_FAILURE, payload: error });
          stopLoading(dispatch);
        }
      );
  };
};

export const addCodeVersion = (formData) => {
  let addCodeVersionFormData = {
    codeVersion: formData.codeVersion.trim(),
    type: formData.versionType === "Released" ? 0 : 1,
  };
  return (dispatch) => {
    dispatch({ type: START_SPINNER_ACTION });
    return fetch(ADDCODEVERSION_API_URL, {
      method: "post",
      body: JSON.stringify(addCodeVersionFormData),
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
              type: ADD_CODEVERSION_COMPLETE,
              //payload: data.responseObject,
            });
            dispatch({
              type: SHOW_SNACKBAR_ACTION,
              payload: {
                detail: handleCodeVersionAddMsg(
                  addCodeVersionFormData.codeVersion,
                  data.responseCode
                ).message,
                severity: handleCodeVersionAddMsg(
                  addCodeVersionFormData.codeVersion,
                  data.responseCode
                ).messageType,
              },
            });
          } else {
            dispatch({ type: ADD_CODEVERSION_ERROR, payload: data });
            // dispatch({
            //   type: SHOW_SNACKBAR_ACTION,
            //   payload: {
            //     detail: "An error occurred. Please try again later.",
            //     severity: "error",
            //   },
            // });
          }
          stopLoading(dispatch);
        },
        (error) => {
          dispatch({ type: ADD_CODEVERSION_FAILURE, payload: error });
          // dispatch({
          //   type: SHOW_SNACKBAR_ACTION,
          //   payload: {
          //     detail: "An error occurred. Please try again later.",
          //     severity: "error",
          //   },
          // });
          stopLoading(dispatch);
        }
      );
  };
};

export const deleteCodeVersion = (codeVersionId, codeVersionName) => {
  let DELETE_CODEVERSION_API = DELETECODEVERSION_API_URL + codeVersionId;
  return (dispatch) => {
    dispatch({ type: START_SPINNER_ACTION });
    return fetch(DELETE_CODEVERSION_API, {
      method: "put",
      headers: setRequestHeader(),
    })
      .then((response) => response.json())
      .then(
        (data) => {
          if (
            data &&
            (data.responseCode === "200" || data.responseCode === 200)
          ) {
            // var foundIndex = codeVersionList.findIndex(
            //   (x) => x.id === codeVersionId
            // );
            // codeVersionList[foundIndex] = data.responseObject;
            dispatch({
              type: DELETE_CODEVERSION_COMPLETE,
              //payload: codeVersionList,
            });
            dispatch({
              type: SHOW_SNACKBAR_ACTION,
              payload: {
                detail: handleCodeVersionTermMsg(codeVersionName,data.responseCode).message,
                severity: handleCodeVersionTermMsg(codeVersionName,data.responseCode).messageType
              },
            });
          } else {
            dispatch({ type: DELETE_CODEVERSION_ERROR, payload: data });
            dispatch({
              type: SHOW_SNACKBAR_ACTION,
              payload: {
                detail: handleCodeVersionTermMsg(codeVersionName,data.responseCode).message,
                severity: handleCodeVersionTermMsg(codeVersionName,data.responseCode).messageType
              },
            });
          }
          stopLoading(dispatch);
          dispatch({ type: HIDE_MESSAGE_DIALOG, payload: undefined });
        },
        (error) => {
          dispatch({ type: DELETE_CODEVERSION_FAILURE, payload: error });
          stopLoading(dispatch);
          dispatch({ type: HIDE_MESSAGE_DIALOG, payload: undefined });
          dispatch({
            type: SHOW_SNACKBAR_ACTION,
            payload: {
              detail: handleCodeVersionTermMsg("","").message,
              severity: handleCodeVersionTermMsg("","").messageType
            },
          });
        }
      );
  };
};

export const resetDuplicateError = () => {
  return {
    type: RESET_DUPLICATE_ERROR,
    payload: undefined,
  };
};
