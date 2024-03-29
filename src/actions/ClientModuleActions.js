import {
  MHKCLIENT_MODULE_API_URL,
  MHKCLIENT_CONTROL_API_URL,
  OOBCLIENT_MODULE_API_URL,
  OOBCLIENT_SUBMODULE_API_URL,
  CLIENT_CONTROL_BY_ID_API_URL,
  CLIENT_CONTROL_AUDIT_API_URL,
  CLIENT_CONTROL_SIGN_OFF_API_URL,
  CLIENT_CONTROL_RESTORE_API_URL,
  START_SPINNER_ACTION,
  SHOW_SNACKBAR_ACTION,
  FETCH_MHKCLIENT_MODULE_COMPLETE,
  FETCH_MHKCLIENT_MODULE_FAILURE,
  FETCH_MHKCLIENT_SUBMODULE_COMPLETE,
  FETCH_MHKCLIENT_SUBMODULE_FAILURE,
  FETCH_MHKCLIENT_CONTROL_COMPLETE,
  FETCH_MHKCLIENT_CONTROL_FAILURE,
  FETCH_CLIENT_MODULE_BY_ID_COMPLETE,
  FETCH_CLIENT_MODULE_BY_ID_FAILURE,
  FETCH_CLIENT_SUBMODULE_BY_ID_COMPLETE,
  FETCH_CLIENT_SUBMODULE_BY_ID_FAILURE,
  FETCH_CLIENT_CONTROL_BY_ID_COMPLETE,
  FETCH_CLIENT_CONTROL_BY_ID_FAILURE,
  UPDATE_CLIENT_CONTROL_COMPLETE,
  UPDATE_CLIENT_CONTROL_FAILURE,
  FETCH_CLIENT_CONTROL_TIMELINE_COMPLETE,
  FETCH_CLIENT_CONTROL_TIMELINE_FAILURE,
  UPDATE_CLIENT_CONTROL_STATUS_COMPLETE,
  UPDATE_CLIENT_CONTROL_STATUS_FAILURE,
  BULK_CLIENT_CONTROL_STATUS_COMPLETE,
  BULK_CLIENT_CONTROL_STATUS_FAILURE,
  CLIENT_CONTROL_RESTORED_COMPLETE,
  CLIENT_CONTROL_RESTORED_FAILURE,
} from "../utils/AppConstants";
import { setRequestHeader, stopLoading } from "../utils/helpers";
import { 
  handleUpdateClientControl,
  handleChangeSingleFieldStatus,
  handleRestoreOobSingleField,
  handleBulkFieldStatus
} from "../utils/Messages";

export const fetchClientModule = (
  moduleType,
  clientId,
  clientType,
  startIndex,
  pageSize,
  search
) => {
  let API_URL = "";
  if (moduleType === "global") {
    API_URL =
      OOBCLIENT_MODULE_API_URL +
      "?sortBy=id&clientId=" +
      clientId +
      "&isglobal=true";
    if (clientType !== 'CLIENT') {
      API_URL =
        MHKCLIENT_MODULE_API_URL +
        "?sortBy=id&client_id=" +
        clientId +
        "&isglobal=true";
    }
  }
  if (moduleType === "oob") {
    API_URL =
      OOBCLIENT_MODULE_API_URL +
      "?sortBy=id&clientId=" +
      clientId +
      "&isglobal=false";
    if (clientType !== 'CLIENT') {
      API_URL =
        MHKCLIENT_MODULE_API_URL +
        "?sortBy=id&client_id=" +
        clientId +
        "&isglobal=false";
    }
  }

  if (search)
    API_URL =
      API_URL +
      "&startIndex=" +
      startIndex +
      "&pageSize=" +
      pageSize +
      "&search=" +
      search;
  if (!search && pageSize)
    API_URL = API_URL + "&startIndex=" + startIndex + "&pageSize=" + pageSize;

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
            // data.responseObject.modules.sort((a, b) => (a.id < b.id ? 1 : -1));
            dispatch({
              type: FETCH_MHKCLIENT_MODULE_COMPLETE,
              payload: {
                pageInfo: data.responseObject,
                startIndex: startIndex,
                pageSize: pageSize,
              },
              //payload: data.responseObject.modules,
            });
          } else {
            dispatch({ type: FETCH_MHKCLIENT_MODULE_FAILURE, payload: data });
          }
          stopLoading(dispatch);
        },
        (error) => {
          dispatch({ type: FETCH_MHKCLIENT_MODULE_FAILURE, payload: error });
          stopLoading(dispatch);
        }
      );
  };
};

export const fetchClientSubmodule = (
  moduleId,
  clientId,
  version,
  startIndex,
  pageSize,
  search
) => {
  let API_URL =
    MHKCLIENT_MODULE_API_URL + "/" + moduleId + "/" + clientId + "/" + version;

  if (search)
    API_URL =
      API_URL +
      "?startIndex=" +
      startIndex +
      "&pageSize=" +
      pageSize +
      "&search=" +
      search;
  if (!search && pageSize)
    API_URL = API_URL + "?startIndex=" + startIndex + "&pageSize=" + pageSize;

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
            // data.responseObject.modules.sort((a, b) => (a.id < b.id ? 1 : -1));
            dispatch({
              type: FETCH_MHKCLIENT_SUBMODULE_COMPLETE,
              payload: {
                pageInfo: data.responseObject,
                startIndex: startIndex,
                pageSize: pageSize,
              },
              //payload: data.responseObject.oobSubmodules,
            });
          } else {
            dispatch({
              type: FETCH_MHKCLIENT_SUBMODULE_FAILURE,
              payload: data,
            });
          }
          stopLoading(dispatch);
        },
        (error) => {
          dispatch({ type: FETCH_MHKCLIENT_SUBMODULE_FAILURE, payload: error });
          stopLoading(dispatch);
        }
      );
  };
};

export const fetchClientControl = (
  submoduleId,
  startIndex,
  pageSize,
  search
) => {
  let API_URL = MHKCLIENT_CONTROL_API_URL + "/" + submoduleId;
  if (search)
    API_URL =
      API_URL +
      "?startIndex=" +
      startIndex +
      "&pageSize=" +
      pageSize +
      "&search=" +
      search;
  if (!search && pageSize)
    API_URL = API_URL + "?startIndex=" + startIndex + "&pageSize=" + pageSize;
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
            let controls = [];
            if (data.responseObject && data.responseObject.controls) {
              data.responseObject.controls.sort((a, b) =>
                a.createdDate < b.createdDate ? -1 : 1
              );
              controls = data.responseObject.controls.map((control) => {
                if (control.controlData) {
                  control.controlData = JSON.parse(control.controlData);
                }
                return control;
              });
            }
            dispatch({
              type: FETCH_MHKCLIENT_CONTROL_COMPLETE,
              payload: {
                controls: controls,
                pageInfo: data.responseObject,
                startIndex: startIndex,
                pageSize: pageSize,
              },
            });
          } else {
            dispatch({ type: FETCH_MHKCLIENT_CONTROL_FAILURE, payload: data });
          }
          stopLoading(dispatch);
        },
        (error) => {
          dispatch({ type: FETCH_MHKCLIENT_CONTROL_FAILURE, payload: error });
          stopLoading(dispatch);
        }
      );
  };
};

export const fetchClientModuleById = (moduleId, clientId) => {
  let API_URL = `${OOBCLIENT_MODULE_API_URL}/${moduleId}`;
  if (clientId) {
    API_URL = `${MHKCLIENT_MODULE_API_URL}/${moduleId}/${clientId}`;
  }
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
            dispatch({
              type: FETCH_CLIENT_MODULE_BY_ID_COMPLETE,
              payload: data.responseObject,
            });
          } else {
            dispatch({
              type: FETCH_CLIENT_MODULE_BY_ID_FAILURE,
              payload: data,
            });
          }
          stopLoading(dispatch);
        },
        (error) => {
          dispatch({ type: FETCH_CLIENT_MODULE_BY_ID_FAILURE, payload: error });
          stopLoading(dispatch);
        }
      );
  };
};

export const fetchClientSubmoduleById = (
  submoduleId,
  clientModuleVersionId
) => {
  let API_URL = `${OOBCLIENT_SUBMODULE_API_URL}/${submoduleId}/${clientModuleVersionId}`;
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
            dispatch({
              type: FETCH_CLIENT_SUBMODULE_BY_ID_COMPLETE,
              payload: data.responseObject.oobSubmodules[0],
            });
          } else {
            dispatch({
              type: FETCH_CLIENT_SUBMODULE_BY_ID_FAILURE,
              payload: data,
            });
          }
          stopLoading(dispatch);
        },
        (error) => {
          dispatch({
            type: FETCH_CLIENT_SUBMODULE_BY_ID_FAILURE,
            payload: error,
          });
          stopLoading(dispatch);
        }
      );
  };
};

export const fetchClientControlById = (controlId) => {
  let API_URL = `${CLIENT_CONTROL_BY_ID_API_URL}/${controlId}`;
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
            let controlByIdData = "";

            if (data.responseObject) {
              controlByIdData = data.responseObject;
              controlByIdData.control.format = JSON.parse(
                controlByIdData.control.format
              );
              controlByIdData.controlData = JSON.parse(
                controlByIdData.controlData
              );
            }
            dispatch({
              type: FETCH_CLIENT_CONTROL_BY_ID_COMPLETE,
              payload: controlByIdData,
            });
          } else {
            dispatch({
              type: FETCH_CLIENT_CONTROL_BY_ID_FAILURE,
              payload: data,
            });
          }
          stopLoading(dispatch);
        },
        (error) => {
          dispatch({
            type: FETCH_CLIENT_CONTROL_BY_ID_FAILURE,
            payload: error,
          });
          stopLoading(dispatch);
        }
      );
  };
};

export const updateClientControl = (fromObj) => {
  return (dispatch) => {
    dispatch({ type: START_SPINNER_ACTION });
    return fetch(MHKCLIENT_CONTROL_API_URL, {
      method: "put",
      body: JSON.stringify(fromObj),
      headers: setRequestHeader(),
    })
      .then((response) => response.json())
      .then(
        (data) => {
          if (
            data &&
            (data.responseCode === "201" || data.responseCode === 201)
          ) {
            let controlByIdData = "";
            if (data.responseObject && data.responseObject.controls) {
              controlByIdData = data.responseObject.controls;
              controlByIdData.control.format = JSON.parse(
                controlByIdData.control.format
              );
              controlByIdData.controlData = JSON.parse(
                controlByIdData.controlData
              );
            }
            dispatch({
              type: UPDATE_CLIENT_CONTROL_COMPLETE,
              payload: controlByIdData,
            });
            dispatch({
              type: SHOW_SNACKBAR_ACTION,
              payload: {
                detail: handleUpdateClientControl(data.responseCode).message,
                severity: handleUpdateClientControl(data.responseCode)
                  .messageType,
              },
            });
          } else {
            dispatch({ type: UPDATE_CLIENT_CONTROL_FAILURE, payload: data });
          }
          stopLoading(dispatch);
        },
        (error) => {
          dispatch({ type: UPDATE_CLIENT_CONTROL_FAILURE, payload: error });
          stopLoading(dispatch);
        }
      );
  };
};

export const fetchClientControlAudit = (controlId) => {
  let API_URL = CLIENT_CONTROL_AUDIT_API_URL + "/" + controlId;

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
            data.responseObject.oobControlAudits.sort((a, b) =>
              new Date(a.createdDate) < new Date(b.createdDate) ? 1 : -1
            );
            dispatch({
              type: FETCH_CLIENT_CONTROL_TIMELINE_COMPLETE,
              payload: data.responseObject.oobControlAudits,
            });
          } else {
            dispatch({
              type: FETCH_CLIENT_CONTROL_TIMELINE_FAILURE,
              payload: data,
            });
          }
          stopLoading(dispatch);
        },
        (error) => {
          dispatch({
            type: FETCH_CLIENT_CONTROL_TIMELINE_FAILURE,
            payload: error,
          });
          stopLoading(dispatch);
        }
      );
  };
};

export const changeSingleFieldStatus = (payload, status, fieldName) => {
  return (dispatch) => {
    dispatch({ type: START_SPINNER_ACTION });
    return fetch(CLIENT_CONTROL_SIGN_OFF_API_URL, {
      method: "put",
      body: JSON.stringify([payload]),
      headers: setRequestHeader(),
    })
      .then((response) => response.json())
      .then(
        (data) => {
          if (
            data &&
            data.responseCode === "201" &&
            data.responseObject &&
            data.responseObject.controls &&
            data.responseObject.controls[0] &&
            data.responseObject.controls[0].executionResult &&
            (data.responseObject.controls[0].executionResult.messageCode ===
              "2125" ||
              data.responseObject.controls[0].executionResult.messageCode ===
                "2128" ||
              data.responseObject.controls[0].executionResult.messageCode ===
                "2132")
          ) {
            const statusLabel = {
              SIGN_OFF: "signed off",
              APPROVED: "approved",
              RETRACT: "retracted",
            };
            dispatch({
              type: UPDATE_CLIENT_CONTROL_STATUS_COMPLETE,
            });
            dispatch({
              type: SHOW_SNACKBAR_ACTION,
              payload: {
                detail: handleChangeSingleFieldStatus(fieldName,statusLabel[status],data.responseCode).message,
                severity: handleChangeSingleFieldStatus(fieldName,statusLabel[status],data.responseCode).messageType,
              },
            });
          } else if (
            data &&
            data.responseCode === "201" &&
            data.responseObject &&
            data.responseObject.controls &&
            data.responseObject.controls[0] &&
            data.responseObject.controls[0].executionResult &&
            data.responseObject.controls[0].executionResult.message
          ) {
            dispatch({
              type: UPDATE_CLIENT_CONTROL_STATUS_FAILURE,
            });
            dispatch({
              type: SHOW_SNACKBAR_ACTION,
              payload: {
                detail: data.responseObject.controls[0].executionResult.message,
                severity: "warning",
              },
            });
          } else {
            dispatch({
              type: UPDATE_CLIENT_CONTROL_STATUS_FAILURE,
            });
            dispatch({
              type: SHOW_SNACKBAR_ACTION,
              payload: {
                detail: handleChangeSingleFieldStatus(fieldName,'',data.responseCode).message,
                severity: handleChangeSingleFieldStatus(fieldName,'',data.responseCode).messageType,
              },
            });
          }
          stopLoading(dispatch);
        },
        (error) => {
          dispatch({
            type: UPDATE_CLIENT_CONTROL_STATUS_FAILURE,
          });
          dispatch({
            type: SHOW_SNACKBAR_ACTION,
            payload: {
              detail: handleChangeSingleFieldStatus(fieldName,'','').message,
              severity: handleChangeSingleFieldStatus(fieldName,'','').messageType,
            },
          });
          stopLoading(dispatch);
        }
      );
  };
};

export const restoreOobSingleField = (clientId, clientControlId, fieldName) => {
  const API_URL = `${CLIENT_CONTROL_RESTORE_API_URL}/${clientId}/${clientControlId}`;
  return (dispatch) => {
    dispatch({ type: START_SPINNER_ACTION });
    return fetch(API_URL, {
      headers: setRequestHeader(),
    })
      .then((response) => response.json())
      .then(
        (data) => {
          if (data && data.responseCode === "200") {
            dispatch({
              type: CLIENT_CONTROL_RESTORED_COMPLETE,
            });
            dispatch({
              type: SHOW_SNACKBAR_ACTION,
              payload: {
                detail: handleRestoreOobSingleField(fieldName,data.responseCode).message,
                severity: handleRestoreOobSingleField(fieldName,data.responseCode).messageType,
              },
            });
          } else {
            dispatch({
              type: CLIENT_CONTROL_RESTORED_FAILURE,
            });
            if (data && data.responseMessage) {
              dispatch({
                type: SHOW_SNACKBAR_ACTION,
                payload: {
                  detail: data.responseMessage,
                  severity: "warning",
                },
              });
            } else {
              dispatch({
                type: SHOW_SNACKBAR_ACTION,
                payload: {
                  detail: handleRestoreOobSingleField(fieldName,data.responseCode).message,
                  severity: handleRestoreOobSingleField(fieldName,data.responseCode).messageType,
                },
              });
            }
          }
          stopLoading(dispatch);
        },
        (error) => {
          dispatch({
            type: CLIENT_CONTROL_RESTORED_FAILURE,
          });
          dispatch({
            type: SHOW_SNACKBAR_ACTION,
            payload: {
              detail: handleRestoreOobSingleField(fieldName,'').message,
              severity: handleRestoreOobSingleField(fieldName,'').messageType,
            },
          });
          stopLoading(dispatch);
        }
      );
  };
};

export const bulkFieldStatus = (payload) => {
  return (dispatch) => {
    dispatch({ type: START_SPINNER_ACTION });
    return fetch(CLIENT_CONTROL_SIGN_OFF_API_URL, {
      method: "put",
      body: JSON.stringify(payload),
      headers: setRequestHeader(),
    })
      .then((response) => response.json())
      .then(
        (data) => {
          if (
            data &&
            (data.responseCode === "201" || data.responseCode === 201)
          ) {
            // data.responseObject.modules.sort((a, b) => (a.id < b.id ? 1 : -1));
            dispatch({
              type: BULK_CLIENT_CONTROL_STATUS_COMPLETE,
              //payload: data.responseObject
              //payload: data.responseObject.modules,
            });
            const statusLabel = {
              SIGN_OFF: "signed off",
              APPROVED: "approved",
            };
            dispatch({
              type: SHOW_SNACKBAR_ACTION,
              payload: {
                detail: handleBulkFieldStatus(statusLabel[payload[0].status],data.responseCode).message,
                severity: handleBulkFieldStatus(statusLabel[payload[0].status],data.responseCode).messageType,
              },
            });
          } else {
            dispatch({ type: BULK_CLIENT_CONTROL_STATUS_FAILURE });
            dispatch({
              type: SHOW_SNACKBAR_ACTION,
              payload: {
                detail: handleBulkFieldStatus('',data.responseCode).message,
                severity: handleBulkFieldStatus('',data.responseCode).messageType,
              },
            });
          }
          stopLoading(dispatch);
        },
        (error) => {
          dispatch({
            type: BULK_CLIENT_CONTROL_STATUS_FAILURE,
            payload: error,
          });
          stopLoading(dispatch);
          dispatch({
            type: SHOW_SNACKBAR_ACTION,
            payload: {
              detail: handleBulkFieldStatus('','').message,
              severity: handleBulkFieldStatus('','').messageType,
            },
          });
        }
      );
  };
};
