import {
    ADD_MASTERSYSVARIABLE_COMPLETE,
  } from "../utils/AppConstants";

export const AddMSysVariable = (formData) => {
    return (dispatch) => {
        dispatch({ type: ADD_MASTERSYSVARIABLE_COMPLETE, payload: formData });
    };
  };