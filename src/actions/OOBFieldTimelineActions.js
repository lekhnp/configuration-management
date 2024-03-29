import {
    CONTROLAUDIT_API_URL,
    FETCH_CONTROLAUDIT_COMPLETE,
    FETCH_CONTROLAUDIT_FAILURE,
    START_SPINNER_ACTION,
  } from "../utils/AppConstants";
  import { setRequestHeader, stopLoading } from "../utils/helpers";

export const fetchOOBControlAudit = (controlId) => {
    let API_URL = CONTROLAUDIT_API_URL + "/"+controlId;

    return (dispatch) => {
      dispatch({ type: START_SPINNER_ACTION });
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
              data.responseObject.oobControlAudits.sort((a, b) => (new Date(a.createdDate) < new Date(b.createdDate) ? 1 : -1))
              dispatch({
                type: FETCH_CONTROLAUDIT_COMPLETE,
                payload: data.responseObject.oobControlAudits
              });
            } else {
              dispatch({ type: FETCH_CONTROLAUDIT_FAILURE, payload: data });
            }
            stopLoading(dispatch);
          },
          (error) => {
            dispatch({ type: FETCH_CONTROLAUDIT_FAILURE, payload: error });
            stopLoading(dispatch);
          }
        );
    };
  };
  