import {
  FETCH_BUSINESSLINE_COMPLETE,
  FETCH_BUSINESSLINE_FAILURE,
  FETCH_MODULES_COMPLETE,
  FETCH_MODULES_FAILURE,
  FETCH_COMPANY_COMPLETE,
  FETCH_COMPANY_FAILURE,
  FETCH_ALLFILES_COMPLETE,
  FETCH_ALLFILES_FAILURE,
  FETCH_ALLFILES_ERROR,
  FETCH_FILE_COMPLETE,
  FETCH_FILE_FAILURE,
  FETCH_FILE_ERROR,
  ADD_FILE_COMPLETE,
  ADD_FILE_ERROR,
  ADD_FILE_FAILURE,
  ADD_FILE_RESET,
  UPDATE_FILE_COMPLETE,
  UPDATE_FILE_ERROR,
  UPDATE_FILE_FAILURE,
  DELETE_FILE_COMPLETE,
  DELETE_FILE_ERROR,
  DELETE_FILE_FAILURE,
  DEFAULT_PAGE_SIZE,
  DEFAULT_START_INDEX,
} from "../utils/LettersAppConstant";

const initState = {
  businessList: [],
  modulesList: [],
  companyList: [],
  fileData: [],
  allFilesData: {
    isFileAdded: false,
    isFetchCalled: false,
    list: [],
    error: "",
    responseCode: "",
    responseMessage: "",
    totalElements: "",
    totalPages: "",
  },
  page: {
    startIndex: DEFAULT_START_INDEX,
    pageSize: DEFAULT_PAGE_SIZE,
  },

  getError: "",
  getByIdError: "",
  updateError: "",
  addInfoError: "",
  addModuleError: "",
  addEnvError: "",
};

export const LettersReducer = (state = initState, action) => {
  switch (action.type) {
    case FETCH_BUSINESSLINE_COMPLETE:
      return {
        ...state,
        businessList: [...action.payload.bisunessLines],
        addInfoError: action.payload,
      };
    case FETCH_BUSINESSLINE_FAILURE:
      return {
        ...state,
        businessList: [],
        addInfoError: action.payload,
      };

    case FETCH_MODULES_COMPLETE:
      return {
        ...state,
        modulesList: [...action.payload.modules],
        addInfoError: action.payload,
      };
    case FETCH_MODULES_FAILURE:
      return {
        ...state,
        modulesList: [],
        addInfoError: action.payload,
      };

    case FETCH_COMPANY_COMPLETE:
      return {
        ...state,
        companyList: [...action.payload.companies],
        addInfoError: action.payload,
      };
    case FETCH_COMPANY_FAILURE:
      return {
        ...state,
        companyList: [],
        addInfoError: action.payload,
      };

    case FETCH_ALLFILES_COMPLETE:
      return {
        ...state,
        allFilesData: {
          ...state.allFilesData,
          isFileAdded: false,
          list: action.payload.filesInfo.responseObject.importedLetters,
          responseCode: action.payload.filesInfo.responseCode,
          responseMessage: action.payload.filesInfo.responseMessage,
          totalElements: action.payload.filesInfo.responseObject.totalElements,
          totalPages: action.payload.filesInfo.responseObject.totalPages,
          error: undefined,
          fecthError: undefined,
        },
        page: {
          startIndex: action.payload.startIndex,
          pageSize: action.payload.pageSize,
        },
      };

    case FETCH_ALLFILES_ERROR:
      return {
        ...state,
        allFilesData: {
          ...state.allFilesData,
          isFetchCalled: true,
          isFileAdded: false,
          responseCode: action.payload.responseCode,
          responseMessage: action.payload.responseMessage,
          totalElements: "",
          totalPages: "",
          fecthError: action.payload,
          error: undefined,
        },
        page: {
          startIndex: DEFAULT_START_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      };

    case FETCH_ALLFILES_FAILURE:
      return {
        ...state,
        allFilesData: {
          ...state.allFilesData,
          isFileAdded: false,
          list: [],
          responseCode: "",
          responseMessage: "",
          totalElements: "",
          totalPages: "",
          fecthError: action.payload,
          error: undefined,
        },
        page: {
          startIndex: DEFAULT_START_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      };

    case ADD_FILE_COMPLETE:
      return {
        ...state,
        fileData: [
          ...state.fileData,
          {
            isFileAdded: true,
            responseCode: action.payload.data.responseCode,
            responseMessage: action.payload.data.responseMessage,
            //resFileData: action.payload.data.responseObject,
            error: undefined,
            fileName: action.payload.originalFileName,
          },
        ],
      };

    case ADD_FILE_ERROR:
      return {
        ...state,
        fileData: [
          ...state.fileData,
          {
            responseCode: action.payload.data.responseCode,
            responseMessage: action.payload.data.responseMessage,
            error: action.payload.data,
            fileName: action.payload.originalFileName,
          },
        ],
      };

    case ADD_FILE_FAILURE:
      return {
        ...state,
        fileData: [
          {
            responseCode: "",
            responseMessage: "",
            error: action.payload.error,
            fileName: action.payload.originalFileName,
          },
        ],
      };

    case ADD_FILE_RESET:
      return {
        ...state,
        fileData: [],
      };

      case UPDATE_FILE_COMPLETE:
      return {
        ...state,
        updatedFiles: [{
          details: action.payload.responseObject,
          error: undefined,
        }], 
      };

    case UPDATE_FILE_ERROR:
      return {
        ...state,
        profile: {
          ...state.profile,
          isUpdateCalled: true,
          isAuditUpdated: false,
          isFetchCalled: false,
          error: action.payload,
        },
      };

    case UPDATE_FILE_FAILURE:
      return {
        ...state,
        profile: {
          details: "",
          isUpdateCalled: true,
          isAuditUpdated: false,
          isFetchCalled: false,
          error: action.payload,
        },
      };

    default:
      return { ...state };
  }
};
