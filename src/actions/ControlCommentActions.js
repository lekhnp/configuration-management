import {
  CLIENT_CONTROL_COMMENT_API_URL,
  OOB_CONTROL_COMMENT_API_URL,
  START_SPINNER_ACTION,
  SHOW_SNACKBAR_ACTION,
  UPDATE_CONTROL_COMMENT_COMPLETE,
  UPDATE_CONTROL_COMMENT_FAILURE
} from "../utils/AppConstants";
import { setRequestHeader, stopLoading } from "../utils/helpers";
import {handleUpdateControlComment} from  "../utils/Messages"
export const updateControlComment = (comment, controlId,updateFor) => {
  let updateComment = {
      comment: comment,
      controlDataId: controlId
  };
  let API_URL = "";
  if(updateFor === 'client')
    API_URL = CLIENT_CONTROL_COMMENT_API_URL
  else
    API_URL = OOB_CONTROL_COMMENT_API_URL

  return (dispatch) => {
    dispatch({ type: START_SPINNER_ACTION });
    return fetch(API_URL, {
      method: "put",
      body: JSON.stringify(updateComment),
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
              type: UPDATE_CONTROL_COMMENT_COMPLETE,
              //payload: moduleDetails.list,
            });
            dispatch({
              type: SHOW_SNACKBAR_ACTION,
              payload: {
                detail:handleUpdateControlComment(data.responseCode).message,
                severity: handleUpdateControlComment(data.responseCode).messageType,
              },
            });
          } else {
            dispatch({ type: UPDATE_CONTROL_COMMENT_FAILURE, payload: data });
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
          dispatch({ type: UPDATE_CONTROL_COMMENT_FAILURE, payload: error });
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
