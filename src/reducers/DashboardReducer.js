import {
  FETCH_SYSTEM_INFO_COMPLETE,
  FETCH_SYSTEM_INFO_FAILURE,
  FETCH_ROLE_TREND_COMPLETE,
  FETCH_ROLE_TREND_FAILURE,
  FETCH_MODULE_USAGE_COMPLETE,
  FETCH_MODULE_USAGE_FAILURE,
  FETCH_CLIENT_USAGE_COMPLETE,
  FETCH_CLIENT_USAGE_FAILURE,
  RESET_DASHBOARD_DATA,
} from "../utils/AppConstants";

const initState = {
  systemData: {
    userStats: {},
    clientStats: {},
    controlStats: {},
    moduleStats: {},
    getError: "",
  },
  roleData: [],
  moduleUsageData: [],
  clientUsageData: []
};

export const DashboardReducer = (state = initState, action) => {
  switch (action.type) {
    case FETCH_SYSTEM_INFO_COMPLETE:
      return {
        ...state,
        systemData: {
          userStats: action.payload.userStats,
          clientStats: action.payload.clientStats,
          controlStats: action.payload.controlStats,
          moduleStats: action.payload.moduleStats,
          getError: "",
        },
      };
    case FETCH_SYSTEM_INFO_FAILURE:
      return {
        ...state,
        systemData: {
          userStats: {},
          clientStats: {},
          controlStats: {},
          moduleStats: {},
          getError: action.payload,
        },
      };
    case FETCH_ROLE_TREND_COMPLETE:
      return {
        ...state,
        roleData: action.payload,
      };
    case FETCH_ROLE_TREND_FAILURE:
      return {
        ...state,
        roleData: [],
      };
    case FETCH_MODULE_USAGE_COMPLETE:
      return {
        ...state,
        moduleUsageData: action.payload,
      };
    case FETCH_MODULE_USAGE_FAILURE:
      return {
        ...state,
        moduleUsageData: [],
      };
    case FETCH_CLIENT_USAGE_COMPLETE:
      return {
        ...state,
        clientUsageData: action.payload,
      };
    case FETCH_CLIENT_USAGE_FAILURE:
      return {
        ...state,
        clientUsageData: [],
      };
    case RESET_DASHBOARD_DATA:
      return {
        systemData: {
          userStats: {},
          clientStats: {},
          controlStats: {},
          moduleStats: {},
          getError: "",
        },
        roleData: [],
        moduleUsageData: [],
        clientUsageData: []
      };
    default:
      return { ...state };
  }
};
