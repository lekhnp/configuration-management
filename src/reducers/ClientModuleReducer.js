import {
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
  RESET_UPDATE_CLIENT_CONTROL_IS_DONE,
  FETCH_CLIENT_CONTROL_TIMELINE_COMPLETE,
  FETCH_CLIENT_CONTROL_TIMELINE_FAILURE,
  UPDATE_CLIENT_CONTROL_STATUS_COMPLETE,
  UPDATE_CLIENT_CONTROL_STATUS_FAILURE,
  RESET_CLIENT_CONTROL_STATUS_IS_DONE,
  CLIENT_CONTROL_RESTORED_COMPLETE,
  CLIENT_CONTROL_RESTORED_FAILURE,
  RESET_CLIENT_CONTROL_RESTORED_IS_DONE,
  BULK_CLIENT_CONTROL_STATUS_COMPLETE,
  BULK_CLIENT_CONTROL_STATUS_FAILURE,
  DEFAULT_START_INDEX,
  DEFAULT_PAGE_SIZE,
} from "../utils/AppConstants";

const initState = {
  clientModulesList: {
    list: [],
    totalElements: "",
    totalPages: "",
  },
  getClientModulesError: "",
  clientSubmodulesList: {
    list: [],
    totalElements: "",
    totalPages: "",
  },
  getClientSubmodulesError: "",
  clientControlsList: {
    list: [],
    totalElements: "",
    totalPages: "",
  },
  getClientControlsError: "",
  clientModuleById: {
    data: "",
    error: "",
  },
  clientSubmoduleById: {
    data: "",
    error: "",
  },
  clientControlById: {
    data: "",
    error: "",
    updateError: "",
    isControlUpdated: false,
    isStatusChanged: false,
    isControlRestored: false,
  },
  page: {
    startIndex: DEFAULT_START_INDEX,
    pageSize: DEFAULT_PAGE_SIZE,
  },
  submodulePage: {
    startIndex: DEFAULT_START_INDEX,
    pageSize: DEFAULT_PAGE_SIZE,
  },
  controlPage: {
    startIndex: DEFAULT_START_INDEX,
    pageSize: DEFAULT_PAGE_SIZE,
  },
  controlTimeline: {
    data: [],
    error: "",
  },
  bulkUpdate: false,
};

export const ClientModuleReducer = (state = initState, action) => {
  switch (action.type) {
    case FETCH_MHKCLIENT_MODULE_COMPLETE:
      return {
        ...state,
        clientModulesList: {
          list: action.payload.pageInfo.modules,
          totalElements: action.payload.pageInfo.totalElements,
          totalPages: action.payload.pageInfo.totalPages,
        },
        getClientModulesError: "",
        page: {
          startIndex: action.payload.startIndex,
          pageSize: action.payload.pageSize,
        },
      };

    case FETCH_MHKCLIENT_MODULE_FAILURE:
      return {
        ...state,
        clientModulesList: { list: [], totalElements: "", totalPages: "" },
        getClientModulesError: action.payload,
        page: { startIndex: DEFAULT_START_INDEX, pageSize: DEFAULT_PAGE_SIZE },
      };
    case FETCH_MHKCLIENT_SUBMODULE_COMPLETE:
      return {
        ...state,
        clientSubmodulesList: {
          list: action.payload.pageInfo.oobSubmodules,
          totalElements: action.payload.pageInfo.totalElements,
          totalPages: action.payload.pageInfo.totalPages,
        },
        getClientSubmodulesError: "",
        submodulePage: {
          startIndex: action.payload.startIndex,
          pageSize: action.payload.pageSize,
        },
      };

    case FETCH_MHKCLIENT_SUBMODULE_FAILURE:
      return {
        ...state,
        clientSubmodulesList: { list: [], totalElements: "", totalPages: "" },
        submodulePage: {
          startIndex: DEFAULT_START_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
        getClientSubmodulesError: action.payload,
      };
    case FETCH_MHKCLIENT_CONTROL_COMPLETE:
      return {
        ...state,
        clientControlsList: {
          list: action.payload.controls,
          totalElements: action.payload.pageInfo.totalElements,
          totalPages: action.payload.pageInfo.totalPages,
        },
        controlPage: {
          startIndex: action.payload.startIndex,
          pageSize: action.payload.pageSize,
        },
        getClientControlsError: "",
        bulkUpdate: false,
      };

    case FETCH_MHKCLIENT_CONTROL_FAILURE:
      return {
        ...state,
        clientControlsList: { list: [], totalElements: "", totalPages: "" },
        controlPage: {
          startIndex: DEFAULT_START_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
        getClientControlsError: action.payload,
        bulkUpdate: false,
      };

    case FETCH_CLIENT_MODULE_BY_ID_COMPLETE:
      return {
        ...state,
        clientModuleById: {
          data: action.payload,
          error: "",
        },
      };

    case FETCH_CLIENT_MODULE_BY_ID_FAILURE:
      return {
        ...state,
        clientModuleById: {
          ...state.clientModuleById,
          error: action.payload,
        },
      };

    case FETCH_CLIENT_SUBMODULE_BY_ID_COMPLETE:
      return {
        ...state,
        clientSubmoduleById: {
          data: action.payload,
          error: "",
        },
      };

    case FETCH_CLIENT_SUBMODULE_BY_ID_FAILURE:
      return {
        ...state,
        clientSubmoduleById: {
          ...state.clientSubmoduleById,
          error: action.payload,
        },
      };

    case FETCH_CLIENT_CONTROL_BY_ID_COMPLETE:
      return {
        ...state,
        clientControlById: {
          data: action.payload,
          error: "",
        },
      };

    case FETCH_CLIENT_CONTROL_BY_ID_FAILURE:
      return {
        ...state,
        clientControlById: {
          ...state.clientControlById,
          error: action.payload,
        },
      };

    case UPDATE_CLIENT_CONTROL_COMPLETE:
      return {
        ...state,
        clientControlById: {
          ...state.clientControlById,
          // data: action.payload,
          updateError: "",
          isControlUpdated: true,
        },
      };

    case UPDATE_CLIENT_CONTROL_FAILURE:
      return {
        ...state,
        clientControlById: {
          ...state.clientControlById,
          updateError: action.payload,
          isControlUpdated: false,
        },
      };

    case RESET_UPDATE_CLIENT_CONTROL_IS_DONE:
      return {
        ...state,
        clientControlById: {
          ...state.clientControlById,
          updateError: "",
          isControlUpdated: false,
        },
      };

    case FETCH_CLIENT_CONTROL_TIMELINE_COMPLETE:
      return {
        ...state,
        controlTimeline: {
          data: action.payload,
          error: "",
        },
      };

    case FETCH_CLIENT_CONTROL_TIMELINE_FAILURE:
      return {
        ...state,
        controlTimeline: {
          ...state.controlTimeline,
          error: action.payload,
        },
      };

    case UPDATE_CLIENT_CONTROL_STATUS_COMPLETE:
      return {
        ...state,
        clientControlById: {
          ...state.clientControlById,
          isStatusChanged: true,
        },
      };

    case UPDATE_CLIENT_CONTROL_STATUS_FAILURE:
      return {
        ...state,
        clientControlById: {
          ...state.clientControlById,
          isStatusChanged: false,
        },
      };

    case RESET_CLIENT_CONTROL_STATUS_IS_DONE:
      return {
        ...state,
        clientControlById: {
          ...state.clientControlById,
          isStatusChanged: false,
        },
      };

    case CLIENT_CONTROL_RESTORED_COMPLETE:
      return {
        ...state,
        clientControlById: {
          ...state.clientControlById,
          isControlRestored: true,
        },
      };

    case CLIENT_CONTROL_RESTORED_FAILURE:
      return {
        ...state,
        clientControlById: {
          ...state.clientControlById,
          isControlRestored: false,
        },
      };

    case RESET_CLIENT_CONTROL_RESTORED_IS_DONE:
      return {
        ...state,
        clientControlById: {
          ...state.clientControlById,
          isControlRestored: false,
        },
      };
    case BULK_CLIENT_CONTROL_STATUS_COMPLETE:
      return {
        ...state,
        bulkUpdate: true,
      };
    case BULK_CLIENT_CONTROL_STATUS_FAILURE:
      return {
        ...state,
        bulkUpdate: false,
      };

    default:
      return { ...state };
  }
};
