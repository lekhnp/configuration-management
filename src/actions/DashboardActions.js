import {
  START_SPINNER_ACTION,
  SYSTEM_INFO_API_URL,
  ROLE_TREND_API_URL,
  MODULE_USAGE_API_URL,
  CLIENT_USAGE_API_URL,
  FETCH_SYSTEM_INFO_COMPLETE,
  FETCH_SYSTEM_INFO_FAILURE,
  FETCH_ROLE_TREND_COMPLETE,
  FETCH_ROLE_TREND_FAILURE,
  FETCH_MODULE_USAGE_COMPLETE,
  FETCH_MODULE_USAGE_FAILURE,
  FETCH_CLIENT_USAGE_COMPLETE,
  FETCH_CLIENT_USAGE_FAILURE
} from "../utils/AppConstants";
import { setRequestHeader, stopLoading } from "../utils/helpers";

export const fetchSystemInfo = (rmUserId) => {
  let API_URL = SYSTEM_INFO_API_URL;
  if (rmUserId)
    API_URL = API_URL + "?&rmUserId=" + rmUserId;
  return (dispatch) => {
    dispatch({ type: START_SPINNER_ACTION });
    return fetch(API_URL, {
      headers: setRequestHeader(),
    })
      .then((response) => response.json())
      .then(
        (data) => {
          if (
            data && data.responseCode === "200"
          ) {
            dispatch({
              type: FETCH_SYSTEM_INFO_COMPLETE,
              payload: data.responseObject,
            });
          } else {
            dispatch({ type: FETCH_SYSTEM_INFO_FAILURE, payload: data });
          }
          stopLoading(dispatch);
        },
        (error) => {
          dispatch({ type: FETCH_SYSTEM_INFO_FAILURE, payload: error });
          stopLoading(dispatch);
        }
      );
  };
};

export const fetchRoleInfo = () => {
  return (dispatch) => {
    dispatch({ type: START_SPINNER_ACTION });
    return fetch(ROLE_TREND_API_URL, {
      headers: setRequestHeader(),
    })
      .then((response) => response.json())
      .then(
        (data) => {
          if (
            data && data.responseCode === "200"
          ) {
            dispatch({
              type: FETCH_ROLE_TREND_COMPLETE,
              payload: data.responseObject,
            });
          } else {
            dispatch({ type: FETCH_ROLE_TREND_FAILURE, payload: data });
          }
          stopLoading(dispatch);
        },
        (error) => {
          dispatch({ type: FETCH_ROLE_TREND_FAILURE, payload: error });
          stopLoading(dispatch);
        }
      );
  };
};

export const fetchModuleUsage = (rmUserId) => {
  let API_URL = MODULE_USAGE_API_URL;
  // if (rmUserId)
  //   API_URL = API_URL + "?&rmUserId=" + rmUserId;
  return (dispatch) => {
    dispatch({ type: START_SPINNER_ACTION });
    return fetch(API_URL, {
      headers: setRequestHeader(),
    })
      .then((response) => response.json())
      .then(
        (data) => {
          if (
            data && data.responseCode === "200"
          ) {
            dispatch({
              type: FETCH_MODULE_USAGE_COMPLETE,
              payload: data.responseObject,
            });
          } else {
            dispatch({ type: FETCH_MODULE_USAGE_FAILURE, payload: data });
          }
          stopLoading(dispatch);
        },
        (error) => {
          dispatch({ type: FETCH_MODULE_USAGE_FAILURE, payload: error });
          stopLoading(dispatch);
        }
      );
  };
};

export const fetchClientUsage = () => {
  return (dispatch) => {
    dispatch({ type: START_SPINNER_ACTION });
    return fetch(CLIENT_USAGE_API_URL, {
      headers: setRequestHeader(),
    })
      .then((response) => response.json())
      .then(
        (data) => {
          if (
            data && data.responseCode === "200"
          ) {
            dispatch({
              type: FETCH_CLIENT_USAGE_COMPLETE,
              payload: data.responseObject,
            });
          } else {
            dispatch({ type: FETCH_CLIENT_USAGE_FAILURE, payload: data });
          }
          stopLoading(dispatch);
        },
        (error) => {
          dispatch({ type: FETCH_CLIENT_USAGE_FAILURE, payload: error });
          stopLoading(dispatch);
        }
      );
  };
};
