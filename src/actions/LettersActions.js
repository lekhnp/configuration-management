import {
  START_SPINNER_ACTION,
  // SHOW_SNACKBAR_ACTION,
  // SHOW_MESSAGE_DIALOG,
  HIDE_MESSAGE_DIALOG
} from "../utils/AppConstants";
import {
  FETCH_BUSINESSLINE_API_URL,
  FETCH_MODULES_API_URL,
  FETCH_COMPANIES_API_URL,
  FETCH_BUSINESSLINE_COMPLETE,
  FETCH_BUSINESSLINE_FAILURE,
  FETCH_MODULES_COMPLETE,
  FETCH_MODULES_FAILURE,
  FETCH_COMPANY_COMPLETE,
  FETCH_COMPANY_FAILURE,
  ADD_FILE_API_URL,
  DELETE_FILE_API_URL,
  ADD_FILE_COMPLETE,
  ADD_FILE_ERROR,
  ADD_FILE_FAILURE,
  ADD_FILE_RESET,
  UPDATE_FILE_API_URL,
  UPDATE_FILE_COMPLETE,
  UPDATE_FILE_ERROR,
  UPDATE_FILE_FAILURE,
  DELETE_FILE_COMPLETE,
  DELETE_FILE_ERROR,
  DELETE_FILE_FAILURE,
  FETCH_ALLFILES_API_URL,
  FETCH_ALLFILES_COMPLETE,
  FETCH_ALLFILES_FAILURE,
  FETCH_ALLFILES_ERROR,
  
  
} from "../utils/LettersAppConstant";
import { DEFAULT_ERROR_MSG } from "../utils/Messages";
import { setRequestHeader, stopLoading } from "../utils/helpers";

export const fetchBusinessByClientId = (clientId) => {
  let apiUrl = FETCH_BUSINESSLINE_API_URL + "?&clientId=" + clientId;
  return (dispatch) => {
    //dispatch({ type: RESET_ADD_CLIENT });
    return fetch(apiUrl, {
      method: "get",
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
              type: FETCH_BUSINESSLINE_COMPLETE,
              payload: data.responseObject,
            });
          } else {
            dispatch({ type: FETCH_BUSINESSLINE_FAILURE, payload: data });
          }
          //stopLoading(dispatch);
        },
        (error) => {
          dispatch({ type: FETCH_BUSINESSLINE_FAILURE, payload: error });
          //stopLoading(dispatch);
        }
      );
  };
};


export const fetchModulesByClientId = (clientId) => {
  let apiUrl = FETCH_MODULES_API_URL + "?&clientId=" + clientId;
  return (dispatch) => {
    //dispatch({ type: RESET_ADD_CLIENT });
    return fetch(apiUrl, {
      method: "get",
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
              type: FETCH_MODULES_COMPLETE,
              payload: data.responseObject,
            });
          } else {
            dispatch({ type: FETCH_MODULES_FAILURE, payload: data });
          }
        },
        (error) => {
          dispatch({ type: FETCH_MODULES_FAILURE, payload: error });
        }
      );
  };
};


export const fetchCompanyByClientId = (clientId) => {
  let apiUrl = FETCH_COMPANIES_API_URL + "?&clientId=" + clientId;
  return (dispatch) => {
    //dispatch({ type: RESET_ADD_CLIENT });
    return fetch(apiUrl, {
      method: "get",
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
              type: FETCH_COMPANY_COMPLETE,
              payload: data.responseObject,
            });
          } else {
            dispatch({ type: FETCH_COMPANY_FAILURE, payload: data });
          }
        },
        (error) => {
          dispatch({ type: FETCH_COMPANY_FAILURE, payload: error });
        }
      );
  };
};

export const addFiles = (fileDetails, clientId, increment) => {
  return (dispatch) => {
    let apiUrl = ADD_FILE_API_URL + "?clientId=" + clientId;
    return fetch(apiUrl, {
      method: "post",
      body: JSON.stringify({ ...fileDetails }),
      headers: setRequestHeader(),
    })
      .then((response) => response.json())
      .then(
        (data) => {
          if (
            data &&
            (data.responseCode === "201" || data.responseCode === 201)
          ) {
            dispatch({
              type: ADD_FILE_COMPLETE,
              payload: {data, originalFileName: fileDetails.originalFileName},
            });
            increment();
          } else {
            dispatch({ type: ADD_FILE_ERROR, payload: {data, originalFileName: fileDetails.originalFileName} });
            increment();
          }
          // stopLoading(dispatch);
        },
        (error) => {
          dispatch({ type: ADD_FILE_FAILURE, payload: {error, originalFileName: fileDetails.originalFileName} });
          increment();
        }
      );
  };
};

export const addFilesReset = () => (dispatch) => {
  dispatch({ type: ADD_FILE_RESET });
}

export const deleteFile = (fileId, fileName) => {
  let DELETE_CATEGORY_API = DELETE_FILE_API_URL + fileId;
  return (dispatch) => {
    dispatch({ type: START_SPINNER_ACTION });
    return fetch(DELETE_CATEGORY_API, {
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
            dispatch({
              type: DELETE_FILE_COMPLETE
              //payload: categoryList,
            });
            // dispatch({
            //   type: SHOW_SNACKBAR_ACTION,
            //   payload: {
            //     detail: handleCategoryTerm(fileName, data.responseCode)
            //       .message,
            //     severity: handleCategoryTerm(fileName, data.responseCode)
            //       .messageType,
            //   },
            // });
          } else {
            dispatch({ type: DELETE_FILE_ERROR, payload: data });
            // dispatch({
            //   type: SHOW_SNACKBAR_ACTION,
            //   payload: {
            //     detail: handleCategoryTerm(fileName, data.responseCode)
            //       .message,
            //     severity: handleCategoryTerm(fileName, data.responseCode)
            //       .messageType,
            //   },
            // });
          }
          stopLoading(dispatch);
          dispatch({ type: HIDE_MESSAGE_DIALOG, payload: undefined });
        },
        (error) => {
          dispatch({ type: DELETE_FILE_FAILURE, payload: error });
          stopLoading(dispatch);
          dispatch({ type: HIDE_MESSAGE_DIALOG, payload: undefined });
          // dispatch({
          //   type: SHOW_SNACKBAR_ACTION,
          //   payload: {
          //     detail: handleCategoryTerm(fileName, "").message,
          //     severity: handleCategoryTerm(fileName, "").messageType,
          //   },
          // });
        }
      );
  };
};


export const fetchFiles = (startIndex, pageSize, sorting, clientId) => {
  let API_URL = FETCH_ALLFILES_API_URL;
  if (pageSize)
    API_URL = API_URL + "?clientId=" + clientId + "&startIndex=" + startIndex + "&pageSize=" + pageSize;
  //if (filter) API_URL = API_URL + "&filterby=" + filter;
  if (sorting) API_URL = API_URL + "&sortBy=" + sorting;
  return (dispatch) => {
    if(startIndex>=10){
        dispatch({ type: START_SPINNER_ACTION });
    }
    
    return fetch(API_URL, {
      headers: setRequestHeader(),
    })
      .then((response) => response.json())
      .then(
        (data) => {
          if (
            data &&
            (data.responseCode === "200" || data.responseCode === 200)
          ) {
            // data.responseObject.users &&
            //   data.responseObject.users.sort((a, b) =>
            //     a.last_login_time > b.last_login_time ? -1 : 1
            //   );
            dispatch({
              type: FETCH_ALLFILES_COMPLETE,
              payload: {
                filesInfo: data,
                startIndex: startIndex,
                pageSize: pageSize,
              },
            });
          } else {
            dispatch({
              type: FETCH_ALLFILES_ERROR,
              payload: data ? data : { message: DEFAULT_ERROR_MSG },
            });
          }
          
          stopLoading(dispatch);
        },
        (error) => {
          dispatch({ type: FETCH_ALLFILES_FAILURE, payload: error });
          stopLoading(dispatch);
        }
      );
  };
};

export const updateFile = (formData, increment) => {
  // let updateUserData = {
  //   id: formData.id,
  //   firstname: formData.firstName,
  //   lastname: formData.lastName,
  //   email: formData.email,
  //   mobileNumber: formData.contactNumber,
  //   groupName: formData.userType,
  //   clients: formData.clients,
  //   roles: formData.roles,
  //   status: formData.status,
  // };
  return (dispatch) => {
    dispatch({ type: START_SPINNER_ACTION });
    return fetch(UPDATE_FILE_API_URL, {
      method: "put",
      body: JSON.stringify(formData),
      headers: setRequestHeader(),
    })
      .then((response) => response.json())
      .then(
        (data) => {
          if (
            data &&
            (!data.hasOwnProperty("error") ||
              data.responseCode === "200" ||
              data.responseCode === 200)
          ) {
            dispatch({ type: UPDATE_FILE_COMPLETE, payload: data });
            increment();
            // dispatch({
            //   type: SHOW_SNACKBAR_ACTION,
            //   payload: {
            //     detail: "",
            //   },
            // });
          } else {
            dispatch({
              type: UPDATE_FILE_ERROR,
              payload: data ? data : { message: DEFAULT_ERROR_MSG },
            });
            increment();
          }
          stopLoading(dispatch);
        },
        (error) => {
          dispatch({ type: UPDATE_FILE_FAILURE, payload: error });
          stopLoading(dispatch);
          increment();
        }
      );
  };
};
