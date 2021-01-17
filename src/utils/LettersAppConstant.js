/**
 * API Urls Start
 */
export const CONTAINER_API_URL = process.env.CONTAINER_URL;
export const DOCUMENT_NAME = "document";


export const FETCH_BUSINESSLINE_API_URL =
  process.env.REACT_APP_API_DEV_URL + "/lat/businessLines";
export const FETCH_MODULES_API_URL =
  process.env.REACT_APP_API_DEV_URL + "/lat/modules";
export const FETCH_COMPANIES_API_URL =
  process.env.REACT_APP_API_DEV_URL + "/lat/companies";

  export const ADD_FILE_API_URL =
  process.env.REACT_APP_API_DEV_URL + "/lat/import";
  export const DELETE_FILE_API_URL =
  process.env.REACT_APP_API_DEV_URL + "/lat/import?id=";
  export const FETCH_FILE_API_URL =
  process.env.REACT_APP_API_DEV_URL + "/lat/import?id=";
  export const FETCH_ALLFILES_API_URL =
  process.env.REACT_APP_API_DEV_URL + "/lat/imports";
  export const UPDATE_FILE_API_URL =
  process.env.REACT_APP_API_DEV_URL + "/lat/import";
  
/**
 * API Urls End
 */
export const SHOW_SNACKBAR_ACTION = "SHOW_SNACKBAR_ACTION";


export const FETCH_BUSINESSLINE_COMPLETE = "FETCH_BUSINESSLINE_COMPLETE";
export const FETCH_BUSINESSLINE_FAILURE = "FETCH_BUSINESSLINE_FAILURE";

export const FETCH_MODULES_COMPLETE = "FETCH_MODULES_COMPLETE";
export const FETCH_MODULES_FAILURE = "FETCH_MODULES_FAILURE";

export const FETCH_COMPANY_COMPLETE = "FETCH_COMPANY_COMPLETE";
export const FETCH_COMPANY_FAILURE = "FETCH_COMPANY_FAILURE";

export const FETCH_ALLFILES_COMPLETE = "FETCH_ALLFILES_COMPLETE";
export const FETCH_ALLFILES_FAILURE = "FETCH_ALLFILES_FAILURE";
export const FETCH_ALLFILES_ERROR = "FETCH_ALLFILES_ERROR";

export const FETCH_FILE_COMPLETE = "FETCH_FILE_COMPLETE";
export const FETCH_FILE_FAILURE = "FETCH_FILE_FAILURE";
export const FETCH_FILE_ERROR = "FETCH_FILE_ERROR";

export const ADD_FILE_COMPLETE = "ADD_FILE_COMPLETE";
export const ADD_FILE_FAILURE = "ADD_FILE_FAILURE";
export const ADD_FILE_ERROR = "ADD_FILE_ERROR";
export const ADD_FILE_RESET = "ADD_FILE_RESET";

export const UPDATE_FILE_COMPLETE = "UPDATE_FILE_COMPLETE";
export const UPDATE_FILE_ERROR = "UPDATE_FILE_ERROR";
export const UPDATE_FILE_FAILURE = "UPDATE_FILE_FAILURE";

export const DELETE_FILE_COMPLETE = "DELETE_FILE_COMPLETE";
export const DELETE_FILE_ERROR = "DELETE_FILE_ERROR";
export const DELETE_FILE_FAILURE = "DELETE_FILE_FAILURE";

export const DEFAULT_PAGE_SIZE = 10;
export const DEFAULT_START_INDEX = 0;
export const DEFAULT_SORTBY ="id";