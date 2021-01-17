export const BACKEND_API_URL_MHK_QA = "https://MHKqa.us1.cloud.realm.io/"; // 35.166.127.0
export const BACKEND_API_URL_MHK_PROD = "http://18.236.60.131:9080/"; // ec2-18-236-60-131.us-west-2.compute.amazonaws.com
export const BACKEND_API_URL_MHK_PRE_PROD = "http://54.148.193.102:9080/"; // ec2-54-148-193-102.us-west-2.compute.amazonaws.com
export const BACKEND_API_URL_MHK_PRE_PROD_2 =
  "https://MHKpreprod.puresoftware.cloud.realm.io/"; // 52.11.176.189
export const BACKEND_API_URL_MHK_STAGE =
  "https://MHK.puresoftware.cloud.realm.io/"; // 52.11.176.189
export const BACKEND_API_URL_MHK_QA2 = "http://qa2.MHKapi.puresoftware.info/";
export const BACKEND_API_URL_MHK_SECURITYLOAD =
  "https://securityload-MHK-api.prscloud.net/";
export const BACKEND_API_URL_MHK_STAGE2 =
  "https://stage2-MHK-api.prscloud.net/";
export const GOOGLE_API_KEY = "AIzaSyDuZDd_4Q4UxdfjPajkDk8F6hbnIjuYiZU";

export const QA2_USER = "admin";
export const QA2_PASSWORD = "adminMHK";

/**
 * API Urls
 */

export const LOGIN_API_URL = process.env.REACT_APP_API_DEV_URL + "/user/login";
export const RESET_PASSWORD_CODE_API_URL =
  process.env.REACT_APP_API_DEV_URL + "/user/forgotPassword";
export const FORGET_PASSWORD_API_URL =
  process.env.REACT_APP_API_DEV_URL + "/user/confirmForgotPassword";
export const MHK_USER_LOGIN_API_URL =
  process.env.REACT_APP_API_DEV_URL + "/admin/loginMhk";
export const FETCH_USERS_API_URL =
  process.env.REACT_APP_API_DEV_URL + "/user/getUserList";
export const FETCH_USER_PROFILE_API_URL =
  process.env.REACT_APP_API_DEV_URL + "/user/getUserByEmail";
export const FETCH_ROLES_API_URL =
  process.env.REACT_APP_API_DEV_URL + "/user/getAllRoles";
export const FETCH_FEATURES_API_URL =
  process.env.REACT_APP_API_DEV_URL + "/user/getAllFeatures";
export const FETCH_FEATURE_PROFILE_API_URL =
  process.env.REACT_APP_API_DEV_URL + "/user/getFeatureById";
export const UPDATE_FEATURE_API_URL =
  process.env.REACT_APP_API_DEV_URL + "/user/updateFeatureById";
export const FETCH_QUEUES_API_URL =
  process.env.REACT_APP_API_DEV_URL + "/user/getAllQueueList";
export const FETCH_QUEUE_PROFILE_API_URL =
  process.env.REACT_APP_API_DEV_URL + "/user/getQueueById";
export const UPDATE_QUEUE_API_URL =
  process.env.REACT_APP_API_DEV_URL + "/user/updateQueueById";
export const ADD_USER_API_URL =
  process.env.REACT_APP_API_DEV_URL + "/user/addNewUser";
export const UPDATE_USER_API_URL =
  process.env.REACT_APP_API_DEV_URL + "/user/addExistingUser";
export const FETCH_CLIENT_API_URL =
  process.env.REACT_APP_API_DEV_URL + "/user/clients";
export const FETCH_SESSION_TIMEOUT_API_URL =
  process.env.REACT_APP_API_DEV_URL + "/user/getUserTimeOut";
export const UPDATE_SESSION_TIMEOUT_API_URL =
  process.env.REACT_APP_API_DEV_URL + "/user/setUserTimeOut/";
export const CHANGE_PASSWORD_API_URL =
  process.env.REACT_APP_API_DEV_URL + "/user/changePassword";

// start - port 8080
export const FETCH_ROLE_PROFILE_API_URL =
  process.env.REACT_APP_API_DEV_URL + "/user/getRoleById";
export const UPDATE_ROLE_API_URL =
  process.env.REACT_APP_API_DEV_URL + "/user/updateRoleById";
// end - port 8080

// export const FETCH_CLIENT_PROFILE_API_URL =
//   process.env.REACT_APP_API_DEV_URL + "/user/getAllClients";
// export const FETCH_CLIENTBYID_API_URL =
//   process.env.REACT_APP_API_DEV_URL + "/user/getClientById?id=";
// export const ADD_CLIENT_PROFILE_API_URL =
//   process.env.REACT_APP_API_DEV_URL + "/user/addNewClient";
// export const UPDATE_CLIENT_PROFILE_API_URL =
//   process.env.REACT_APP_API_DEV_URL + "/user/updateClientById";
// export const DELETECLIENT_API_URL =
//   process.env.REACT_APP_API_DEV_URL + "/user/termClientById?id=";

export const FETCH_HIERARCHY_COMPANY_API_URL =
  process.env.REACT_APP_API_DEV_URL + "/user/getCompanyList?id=";
export const FETCH_HIERARCHY_BUSINESSLINE_API_URL =
  process.env.REACT_APP_API_DEV_URL + "/user/getBusinessLineList?id=";
export const FETCH_HIERARCHY_ELIGIBILITYPLAN_API_URL =
  process.env.REACT_APP_API_DEV_URL + "/user/getEligibilityPlanList?id=";
export const FETCH_HIERARCHY_ELIGIBILITYGROUP_API_URL =
  process.env.REACT_APP_API_DEV_URL + "/user/getEligibilityGroupList?id=";
export const DELETE_HIERARCHYBYID_API_URL =
  process.env.REACT_APP_API_DEV_URL + "/user/clients/deleteClientExcel?id=";
export const UPLOAD_HIERARCHYBYID_API_URL =
  process.env.REACT_APP_API_DEV_URL + "/user/clients/uploadClientExcel";

export const FETCHMODULE_API_URL =
  process.env.REACT_APP_API_DEV_URL + "/user/getModuleList";
export const ADDMODULE_API_URL =
  process.env.REACT_APP_API_DEV_URL + "/user/addNewModule";
export const UPDATEMODULE_API_URL =
  process.env.REACT_APP_API_DEV_URL + "/user/updateModuleById";
export const DELETEMODULE_API_URL =
  process.env.REACT_APP_API_DEV_URL + "/user/termModuleById?id=";

export const FETCHCODEVERSION_API_URL =
  process.env.REACT_APP_API_DEV_URL + "/user/getCodeVersionList";
export const ADDCODEVERSION_API_URL =
  process.env.REACT_APP_API_DEV_URL + "/user/addNewCodeVersion";
export const DELETECODEVERSION_API_URL =
  process.env.REACT_APP_API_DEV_URL + "/user/termCodeVersionById?id=";

export const FETCHENVIRONMENT_API_URL =
  process.env.REACT_APP_API_DEV_URL + "/user/getEnvironmentList";
export const ADDENVIRONMENT_API_URL =
  process.env.REACT_APP_API_DEV_URL + "/user/addNewEnvironment";
export const DELETEENVIRONMENT_API_URL =
  process.env.REACT_APP_API_DEV_URL + "/user/termEnvironmentById?id=";

export const FETCH_CATEGORIES_API_URL =
  process.env.REACT_APP_API_DEV_URL + "/user/getCategoryList";
export const ADD_CATEGORIES_API_URL =
  process.env.REACT_APP_API_DEV_URL + "/user/addNewCategory";
export const DELETE_CATEGORIES_API_URL =
  process.env.REACT_APP_API_DEV_URL + "/user/termCategoryById?id=";

export const CLIENT_API_URL =
  process.env.REACT_APP_API_DEV_URL + "/user/clients";

export const CLIENT_ASSIGNENVIRONMENT_API_URL =
  process.env.REACT_APP_API_DEV_URL + "/user/clients/associateEnv";

export const CLIENT_ASSIGNMODULE_API_URL =
  process.env.REACT_APP_API_DEV_URL + "/user/clients/assignClientModule";

export const MHKCLIENT_MODULE_API_URL =
  process.env.REACT_APP_API_DEV_URL + "/mhkclient/modules";

export const MHKCLIENT_CONTROL_API_URL =
  process.env.REACT_APP_API_DEV_URL + "/oobclient/controls";

export const CLIENT_CONTROL_SIGN_OFF_API_URL =
  process.env.REACT_APP_API_DEV_URL + "/oobclient/controls/signoff";

export const CLIENT_CONTROL_RESTORE_API_URL =
  process.env.REACT_APP_API_DEV_URL + "/oobclient/controls/restore";

export const OOBCLIENT_MODULE_API_URL =
  process.env.REACT_APP_API_DEV_URL + "/oobclient/modules";

export const OOBCLIENT_SUBMODULE_API_URL =
  process.env.REACT_APP_API_DEV_URL + "/oobclient/submodules";

export const CLIENT_CONTROL_BY_ID_API_URL =
  process.env.REACT_APP_API_DEV_URL + "/oobclient/controls/controlById";

export const CLIENT_CONTROL_AUDIT_API_URL =
  process.env.REACT_APP_API_DEV_URL + "/oobclient/controlaudit";

export const CLIENT_CONTROL_COMMENT_API_URL =
  process.env.REACT_APP_API_DEV_URL + "/oobclient/controls/comment";

export const CLIENT_ANALYTICS_API_URL =
  process.env.REACT_APP_API_DEV_URL + "/oobclient/stats/modules";

export const OOB_MODULE_API_URL =
  process.env.REACT_APP_API_DEV_URL + "/oob/modules";

export const FETCH_DEFAULTVERSION_API_URL =
  process.env.REACT_APP_API_DEV_URL + "/oob/modules/getNextVersion/";

export const OOB_SUBMODULE_API_URL =
  process.env.REACT_APP_API_DEV_URL + "/oob/submodules";

export const FETCH_OOBSUBMODULEBYID_API_URL =
  process.env.REACT_APP_API_DEV_URL + "/admin/getOOBSubmodulesByOOBModileId?";

export const MASTERMODULE_API_URL =
  process.env.REACT_APP_API_DEV_URL + "/master/modules";

export const MASTERSUBMODULE_API_URL =
  process.env.REACT_APP_API_DEV_URL + "/master/submodules";

export const MASTERSECTION_API_URL =
  process.env.REACT_APP_API_DEV_URL + "/master/sections";

export const MASTER_CONTROL_API_URL =
  process.env.REACT_APP_API_DEV_URL + "/master/controls";

export const OOB_CONTROL_COMMENT_API_URL =
  process.env.REACT_APP_API_DEV_URL + "/oob/controls/comment";

export const OOB_CONTROL_API_URL =
  process.env.REACT_APP_API_DEV_URL + "/oob/controls";

export const CONTROLAUDIT_API_URL =
  process.env.REACT_APP_API_DEV_URL + "/oob/controlaudit";

export const USERAUDIT_API_URL =
  process.env.REACT_APP_API_DEV_URL + "/user/userAudit";

export const CONFIG_NAMELIST_API_URL =
  process.env.REACT_APP_API_DEV_URL + "/config/config/moduleNameList";

export const CONFIG_MODULEBYID_API_URL =
  process.env.REACT_APP_API_DEV_URL + "/config/config/tableListByModule";

export const CONFIG_TABLEFIELD_API_URL =
  process.env.REACT_APP_API_DEV_URL + "/config/config/tableFields";

export const SYSTEM_INFO_API_URL =
  process.env.REACT_APP_API_DEV_URL + "/stats/admin/systemInfo";
export const ROLE_TREND_API_URL =
  process.env.REACT_APP_API_DEV_URL + "/stats/admin/usersRole";
export const MODULE_USAGE_API_URL =
  process.env.REACT_APP_API_DEV_URL + "/stats/admin/moduleUsageTrend";
export const CLIENT_USAGE_API_URL =
  process.env.REACT_APP_API_DEV_URL + "/stats/admin/clientUsageTrend";

export const MASTERTABLE_API_URL =
  process.env.REACT_APP_API_DEV_URL + "/config/config";
export const COLUMN_LIST_API_URL = process.env.REACT_APP_API_DEV_URL + "/config/config/tableFields/"
/**
 * Reducer flags
 */
export const LOGIN_COMPLETE = "LOGIN_COMPLETE";
export const LOGOUT_COMPLETE = "LOGOUT_COMPLETE";
export const LOGIN_FAILURE = "LOGIN_FAILURE";
export const LOGOUT_FAILURE = "LOGOUT_FAILURE";
export const LOGIN_ERROR = "LOGIN_ERROR";
export const RESET_LOGIN_IS_DONE = "RESET_LOGIN_IS_DONE";

export const RESET_PASSWORD_CODE = "RESET_PASSWORD_CODE";
export const RESET_PASSWORD_CODE_SUCCESS = "RESET_PASSWORD_CODE_SUCCESS";
export const RESET_PASSWORD_CODE_FAILURE = "RESET_PASSWORD_CODE_FAILURE";

export const RESET_FORGET_PASSWORD = "RESET_FORGET_PASSWORD";
export const FORGET_PASSWORD_SUCCESS = "FORGET_PASSWORD_SUCCESS";
export const FORGET_PASSWORD_FAILURE = "FORGET_PASSWORD_FAILURE";

export const FETCH_CLIENT_MODULE_COMPLETE = "FETCH_MODULE_COMPLETE";
export const FETCH_CLIENT_MODULE_FAILURE = "FETCH_MODULE_FAILURE";
export const FETCH_STATE_COMPLETE = "FETCH_STATE_COMPLETE";
export const FETCH_STATE_FAILURE = "FETCH_STATE_FAILURE";
export const FETCH_VERSION_COMPLETE = "FETCH_VERSION_COMPLETE";
export const FETCH_VERSION_FAILURE = "FETCH_VERSION_FAILURE";

export const FETCH_MODULE_COMPLETE = "FETCH_MODULE_COMPLETE";
export const FETCH_MODULE_FAILURE = "FETCH_MODULE_FAILURE";
export const ADD_MODULE_COMPLETE = "ADD_MODULE_COMPLETE";
export const ADD_MODULE_ERROR = "ADD_MODULE_ERROR";
export const ADD_MODULE_FAILURE = "ADD_MODULE_FAILURE";
export const UPDATE_MODULE_COMPLETE = "UPDATE_MODULE_COMPLETE";
export const UPDATE_MODULE_ERROR = "UPDATE_MODULE_ERROR";
export const UPDATE_MODULE_FAILURE = "UPDATE_MODULE_FAILURE";
export const UPDATE_MODULE_DIALOG = "UPDATE_MODULE_DIALOG";
export const DELETE_MODULE_COMPLETE = "DELETE_MODULE_COMPLETE";
export const DELETE_MODULE_ERROR = "DELETE_MODULE_ERROR";
export const DELETE_MODULE_FAILURE = "DELETE_MODULE_FAILURE";
export const RESET_DUPLICATE_ERROR = "RESET_DUPLICATE_ERROR";

export const FETCH_LISTBYPAGE_COMPLETE = "FETCH_LISTBYPAGE_COMPLETE";
export const FETCH_LISTBYPAGE_FAILURE = "FETCH_LISTBYPAGE_FAILURE";
export const RESET_PAGINATION_DATA = "RESET_PAGINATION_DATA";
export const SET_DEFAULT_STARTINDEX = "SET_DEFAULT_STARTINDEX";

export const FETCH_MASTERMODULE_COMPLETE = "FETCH_MASTERMODULE_COMPLETE";
export const FETCH_MASTERMODULE_FAILURE = "FETCH_MASTERMODULE_FAILURE";
export const FETCH_MASTERMODULEBYID_COMPLETE =
  "FETCH_MASTERMODULEBYID_COMPLETE";
export const FETCH_MASTERMODULEBYID_FAILURE = "FETCH_MASTERMODULEBYID_FAILURE";
export const ADD_MASTERMODULE_COMPLETE = "ADD_MASTERMODULE_COMPLETE";
export const ADD_MASTERMODULE_ERROR = "ADD_MASTERMODULE_ERROR";
export const ADD_MASTERMODULE_FAILURE = "ADD_MASTERMODULE_FAILURE";
export const FETCH_CONFIG_NAMELIST_COMPLETE = "FETCH_CONFIG_NAMELIST_COMPLETE";
export const FETCH_CONFIG_NAMELIST_FAILURE = "FETCH_CONFIG_NAMELIST_FAILURE";
export const FETCH_CONFIG_MODULEBYID_COMPLETE =
  "FETCH_CONFIG_MODULEBYID_COMPLETE";
export const FETCH_CONFIG_MODULEBYID_FAILURE =
  "FETCH_CONFIG_MODULEBYID_FAILURE";
export const FETCH_CONFIG_TABLEFIELD_COMPLETE =
  "FETCH_CONFIG_TABLEFIELD_COMPLETE";
export const FETCH_CONFIG_TABLEFIELD_FAILURE =
  "FETCH_CONFIG_TABLEFIELD_FAILURE";
export const UPDATE_MASTERMODULE_COMPLETE = "UPDATE_MASTERMODULE_COMPLETE";
export const UPDATE_MASTERMODULE_ERROR = "UPDATE_MASTERMODULE_ERROR";
export const UPDATE_MASTERMODULE_FAILURE = "UPDATE_MASTERMODULE_FAILURE";
export const DELETE_MASTERMODULE_COMPLETE = "DELETE_MASTERMODULE_COMPLETE";
export const DELETE_MASTERMODULE_ERROR = "DELETE_MASTERMODULE_ERROR";
export const DELETE_MASTERMODULE_FAILURE = "DELETE_MASTERMODULE_FAILURE";
export const RESET_UPDATE_ERROR = "RESET_UPDATE_ERROR";

export const FETCH_MASTERSUBMODULE_COMPLETE = "FETCH_MASTERSUBMODULE_COMPLETE";
export const FETCH_MASTERSUBMODULE_FAILURE = "FETCH_MASTERSUBMODULE_FAILURE";
export const FETCH_MASTERSUBMODULEBYID_COMPLETE =
  "FETCH_MASTERSUBMODULEBYID_COMPLETE";
export const FETCH_MASTERSUBMODULEBYID_FAILURE =
  "FETCH_MASTERSUBMODULEBYID_FAILURE";
export const ADD_MASTERSUBMODULE_COMPLETE = "ADD_MASTERSUBMODULE_COMPLETE";
export const ADD_MASTERSUBMODULE_ERROR = "ADD_MASTERSUBMODULE_ERROR";
export const ADD_MASTERSUBMODULE_FAILURE = "ADD_MASTERSUBMODULE_FAILURE";
export const UPDATE_MASTERSUBMODULE_COMPLETE =
  "UPDATE_MASTERSUBMODULE_COMPLETE";
export const UPDATE_MASTERSUBMODULE_ERROR = "UPDATE_MASTERSUBMODULE_ERROR";
export const UPDATE_MASTERSUBMODULE_FAILURE = "UPDATE_MASTERSUBMODULE_FAILURE";
export const DELETE_MASTERSUBMODULE_COMPLETE =
  "DELETE_MASTERSUBMODULE_COMPLETE";
export const DELETE_MASTERSUBMODULE_ERROR = "DELETE_MASTERSUBMODULE_ERROR";
export const DELETE_MASTERSUBMODULE_FAILURE = "DELETE_MASTERSUBMODULE_FAILURE";

export const FETCH_MASTERTABLE_COMPLETE = "FETCH_MASTERTABLE_COMPLETE";
export const FETCH_MASTERTABLE_FAILURE = "FETCH_MASTERTABLE_FAILURE";
export const FETCH_MASTERTABLEBYID_COMPLETE = "FETCH_MASTERTABLEBYID_COMPLETE";
export const FETCH_MASTERTABLEBYID_FAILURE = "FETCH_MASTERTABLEBYID_FAILURE";
export const ADD_MASTERTABLE_COMPLETE = "ADD_MASTERTABLE_COMPLETE";
export const ADD_MASTERTABLE_ERROR = "ADD_MASTERTABLE_ERROR";
export const ADD_MASTERTABLE_FAILURE = "ADD_MASTERTABLE_FAILURE";
export const UPDATE_MASTERTABLE_COMPLETE = "UPDATE_MASTERTABLE_COMPLETE";
export const UPDATE_MASTERTABLE_ERROR = "UPDATE_MASTERTABLE_ERROR";
export const UPDATE_MASTERTABLE_FAILURE = "UPDATE_MASTERTABLE_FAILURE";
export const DELETE_MASTERTABLE_COMPLETE = "DELETE_MASTERTABLE_COMPLETE";
export const DELETE_MASTERTABLE_ERROR = "DELETE_MASTERTABLE_ERROR";
export const DELETE_MASTERTABLE_FAILURE = "DELETE_MASTERTABLE_FAILURE";

export const FETCH_MASTERSYSVARIABLE_COMPLETE =
  "FETCH_MASTERSYSVARIABLE_COMPLETE";
export const FETCH_MASTERSYSVARIABLE_FAILURE =
  "FETCH_MASTERSYSVARIABLE_FAILURE";
export const FETCH_MASTERSYSVARIABLEBYID_COMPLETE =
  "FETCH_MASTERSYSVARIABLEBYID_COMPLETE";
export const FETCH_MASTERSYSVARIABLEBYID_FAILURE =
  "FETCH_MASTERSYSVARIABLEBYID_FAILURE";
export const ADD_MASTERSYSVARIABLE_COMPLETE = "ADD_MASTERSYSVARIABLE_COMPLETE";
export const ADD_MASTERSYSVARIABLE_ERROR = "ADD_MASTERSYSVARIABLE_ERROR";
export const ADD_MASTERSYSVARIABLE_FAILURE = "ADD_MASTERSYSVARIABLE_FAILURE";
export const UPDATE_MASTERSYSVARIABLE_COMPLETE =
  "UPDATE_MASTERSYSVARIABLE_COMPLETE";
export const UPDATE_MASTERSYSVARIABLE_ERROR = "UPDATE_MASTERSYSVARIABLE_ERROR";
export const UPDATE_MASTERSYSVARIABLE_FAILURE =
  "UPDATE_MASTERSYSVARIABLE_FAILURE";
export const DELETE_MASTERSYSVARIABLE_COMPLETE =
  "DELETE_MASTERSYSVARIABLE_COMPLETE";
export const DELETE_MASTERSYSVARIABLE_ERROR = "DELETE_MASTERSYSVARIABLE_ERROR";
export const DELETE_MASTERSYSVARIABLE_FAILURE =
  "DELETE_MASTERSYSVARIABLE_FAILURE";
export const RESET_MASTERSYSVARIABLE_ADDED = "RESET_MASTERSYSVARIABLE_ADDED";

export const FETCH_MASTERSECTION_COMPLETE = "FETCH_MASTERSECTION_COMPLETE";
export const FETCH_MASTERSECTION_FAILURE = "FETCH_MASTERSECTION_FAILURE";
export const FETCH_MASTERSECTIONBYID_COMPLETE =
  "FETCH_MASTERSECTIONBYID_COMPLETE";
export const FETCH_MASTERSECTIONBYID_FAILURE =
  "FETCH_MASTERSECTIONBYID_FAILURE";
export const ADD_MASTERSECTION_COMPLETE = "ADD_MASTERSECTION_COMPLETE";
export const ADD_MASTERSECTION_ERROR = "ADD_MASTERSECTION_ERROR";
export const ADD_MASTERSECTION_FAILURE = "ADD_MASTERSECTION_FAILURE";
export const UPDATE_MASTERSECTION_COMPLETE = "UPDATE_MASTERSECTION_COMPLETE";
export const UPDATE_MASTERSECTION_ERROR = "UPDATE_MASTERSECTION_ERROR";
export const UPDATE_MASTERSECTION_FAILURE = "UPDATE_MASTERSECTION_FAILURE";
export const DELETE_MASTERSECTION_COMPLETE = "DELETE_MASTERSECTION_COMPLETE";
export const DELETE_MASTERSECTION_ERROR = "DELETE_MASTERSECTION_ERROR";
export const DELETE_MASTERSECTION_FAILURE = "DELETE_MASTERSECTION_FAILURE";

export const FETCH_CODEVERSION_COMPLETE = "FETCH_CODEVERSION_COMPLETE";
export const FETCH_CODEVERSION_FAILURE = "FETCH_CODEVERSION_FAILURE";
export const ADD_CODEVERSION_COMPLETE = "ADD_CODEVERSION_COMPLETE";
export const ADD_CODEVERSION_ERROR = "ADD_CODEVERSION_ERROR";
export const ADD_CODEVERSION_FAILURE = "ADD_CODEVERSION_FAILURE";
export const DELETE_CODEVERSION_COMPLETE = "DELETE_CODEVERSION_COMPLETE";
export const DELETE_CODEVERSION_ERROR = "DELETE_CODEVERSION_ERROR";
export const DELETE_CODEVERSION_FAILURE = "DELETE_CODEVERSION_FAILURE";

export const FETCH_ENVIRONMENT_COMPLETE = "FETCH_ENVIRONMENT_COMPLETE";
export const FETCH_ENVIRONMENT_FAILURE = "FETCH_ENVIRONMENT_FAILURE";
export const ADD_ENVIRONMENT_COMPLETE = "ADD_ENVIRONMENT_COMPLETE";
export const ADD_ENVIRONMENT_ERROR = "ADD_ENVIRONMENT_ERROR";
export const ADD_ENVIRONMENT_FAILURE = "ADD_ENVIRONMENT_FAILURE";
export const DELETE_ENVIRONMENT_COMPLETE = "DELETE_ENVIRONMENT_COMPLETE";
export const DELETE_ENVIRONMENT_ERROR = "DELETE_ENVIRONMENT_ERROR";
export const DELETE_ENVIRONMENT_FAILURE = "DELETE_ENVIRONMENT_FAILURE";

export const FETCH_CATEGORIES_COMPLETE = "FETCH_CATEGORIES_COMPLETE";
export const FETCH_CATEGORIES_FAILURE = "FETCH_CATEGORIES_FAILURE";
export const ADD_CATEGORIES_COMPLETE = "ADD_CATEGORIES_COMPLETE";
export const ADD_CATEGORIES_ERROR = "ADD_CATEGORIES_ERROR";
export const ADD_CATEGORIES_FAILURE = "ADD_CATEGORIES_FAILURE";
export const DELETE_CATEGORIES_COMPLETE = "DELETE_CATEGORIES_COMPLETE";
export const DELETE_CATEGORIES_ERROR = "DELETE_CATEGORIES_ERROR";
export const DELETE_CATEGORIES_FAILURE = "DELETE_CATEGORIES_FAILURE";

export const FETCH_SESSION_TIMEOUT_COMPLETE = "FETCH_USER_TIMEOUT_COMPLETE";
export const FETCH_SESSION_TIMEOUT_FAILURE = "FETCH_USER_TIMEOUT_FAILURE";
export const UPDATE_SESSION_TIMEOUT_COMPLETE = "UPDATE_USER_TIMEOUT_COMPLETE";
export const UPDATE_SESSION_TIMEOUT_FAILURE = "UPDATE_USER_TIMEOUT_FAILURE";

export const SHOW_MESSAGE_DIALOG = "SHOW_MESSAGE_DIALOG";
export const HIDE_MESSAGE_DIALOG = "HIDE_MESSAGE_DIALOG";

export const FETCH_ROLES_COMPLETE = "FETCH_ROLES_COMPLETE";
export const FETCH_ROLES_FAILURE = "FETCH_ROLES_FAILURE";
export const FETCH_ROLES_ERROR = "FETCH_ROLES_ERROR";
export const FETCH_ROLE_PROFILE_COMPLETE = "FETCH_ROLE_PROFILE_COMPLETE";
export const FETCH_ROLE_PROFILE_ERROR = "FETCH_ROLE_PROFILE_ERROR";
export const FETCH_ROLE_PROFILE_FAILURE = "FETCH_ROLE_PROFILE_FAILURE";
export const UPDATE_ROLE_COMPLETE = "UPDATE_ROLE_COMPLETE";
export const UPDATE_ROLE_ERROR = "UPDATE_ROLE_ERROR";
export const UPDATE_ROLE_FAILURE = "UPDATE_ROLE_FAILURE";

export const FETCH_USERS_COMPLETE = "FETCH_USERS_COMPLETE";
export const FETCH_USERS_FAILURE = "FETCH_USERS_FAILURE";
export const FETCH_USERS_ERROR = "FETCH_USERS_ERROR";
export const ADD_USER_COMPLETE = "ADD_USER_COMPLETE";
export const ADD_USER_ERROR = "ADD_USER_ERROR";
export const ADD_USER_FAILURE = "ADD_USER_FAILURE";
export const RESET_USER_IS_DONE = "RESET_USER_IS_DONE";
export const RESET_ADD_USER_ERROR = "RESET_ADD_USER_ERROR";
export const FETCH_USER_PROFILE_COMPLETE = "FETCH_USER_PROFILE_COMPLETE";
export const FETCH_USER_PROFILE_ERROR = "FETCH_USER_PROFILE_ERROR";
export const FETCH_USER_PROFILE_FAILURE = "FETCH_USER_PROFILE_FAILURE";
export const UPDATE_USER_PROFILE_COMPLETE = "UPDATE_USER_PROFILE_COMPLETE";
export const UPDATE_USER_PROFILE_ERROR = "UPDATE_USER_PROFILE_ERROR";
export const UPDATE_USER_PROFILE_FAILURE = "UPDATE_USER_PROFILE_FAILURE";
export const RESET_UPDATE_USERAUDIT_IS_DONE = "RESET_UPDATE_USERAUDIT_IS_DONE";
export const RESET_USERAUDIT = "RESET_USERAUDIT";
export const FETCH_LOGGED_IN_USER_INFO_COMPLETE =
  "FETCH_LOGGED_IN_USER_INFO_COMPLETE";
export const FETCH_LOGGED_IN_USER_INFO_ERROR =
  "FETCH_LOGGED_IN_USER_INFO_ERROR";
export const FETCH_LOGGED_IN_USER_INFO_FAILURE =
  "FETCH_LOGGED_IN_USER_INFO_FAILURE";

export const FETCH_CLIENT_PROFILE_COMPLETE = "FETCH_CLIENT_PROFILE_COMPLETE";
export const FETCH_CLIENT_PROFILE_FAILURE = "FETCH_CLIENT_PROFILE_FAILURE";
export const FETCH_CLIENTBYID_COMPLETE = "FETCH_CLIENTBYID_COMPLETE";
export const FETCH_CLIENTBYID_FAILURE = "FETCH_CLIENTBYID_FAILURE";
export const ADD_CLIENT_PROFILE_COMPLETE = "ADD_CLIENT_PROFILE_COMPLETE";
export const ADD_CLIENT_PROFILE_ERROR = "ADD_CLIENT_PROFILE_ERROR";
export const ADD_CLIENT_PROFILE_FAILURE = "ADD_CLIENT_PROFILE_FAILURE";
export const ADD_CLIENT_ENVIRONMENT_COMPLETE =
  "ADD_CLIENT_ENVIRONMENT_COMPLETE";
export const ADD_CLIENT_ENVIRONMENT_FAILURE = "ADD_CLIENT_ENVIRONMENT_FAILURE";
export const ADD_CLIENT_MODULE_COMPLETE = "ADD_CLIENT_MODULE_COMPLETE";
export const ADD_CLIENT_MODULE_FAILURE = "ADD_CLIENT_MODULE_FAILURE";
export const UPDATE_CLIENT_PROFILE_COMPLETE = "UPDATE_CLIENT_PROFILE_COMPLETE";
export const UPDATE_CLIENT_PROFILE_ERROR = "UPDATE_CLIENT_PROFILE_ERROR";
export const UPDATE_CLIENT_PROFILE_FAILURE = "UPDATE_CLIENT_PROFILE_FAILURE";
export const DELETE_CLIENT_COMPLETE = "DELETE_CLIENT_COMPLETE";
export const DELETE_CLIENT_ERROR = "DELETE_CLIENT_ERROR";
export const DELETE_CLIENT_FAILURE = "DELETE_CLIENT_FAILURE";
export const SAVE_CLIENT_INFO = "SAVE_CLIENT_INFO";
export const RESET_CLIENT_INFO = "RESET_CLIENT_INFO";
export const RESET_ADD_CLIENT = "RESET_ADD_CLIENT";
export const RESET_ADD_CLIENT_INFO = "RESET_ADD_CLIENT_INFO";
export const RESET_ASSIGN_MODULE_ERROR = "RESET_ASSIGN_MODULE_ERROR";
export const RESET_MODULE_ADDED = "RESET_MODULE_ADDED";
export const SELECTED_GLOBAL_MODULE = "SELECTED_GLOBAL_MODULE";
export const SELECTED_OOB_MODULE = "SELECTED_OOB_MODULE";
export const FETCH_CLIENTPROFILE_COMPLETE = "FETCH_CLIENTPROFILE_COMPLETE";
export const FETCH_CLIENTPROFILE_FAILURE = "FETCH_CLIENTPROFILE_FAILURE";

export const FETCH_MHKCLIENT_MODULE_COMPLETE =
  "FETCH_MHKCLIENT_MODULE_COMPLETE";
export const FETCH_MHKCLIENT_MODULE_FAILURE = "FETCH_MHKCLIENT_MODULE_FAILURE";
export const FETCH_MHKCLIENT_SUBMODULE_COMPLETE =
  "FETCH_MHKCLIENT_SUBMODULE_COMPLETE";
export const FETCH_MHKCLIENT_SUBMODULE_FAILURE =
  "FETCH_MHKCLIENT_SUBMODULE_FAILURE";
export const FETCH_MHKCLIENT_CONTROL_COMPLETE =
  "FETCH_MHKCLIENT_CONTROL_COMPLETE";
export const FETCH_MHKCLIENT_CONTROL_FAILURE =
  "FETCH_MHKCLIENT_CONTROL_FAILURE";

export const FETCH_CLIENT_MODULE_BY_ID_COMPLETE =
  "FETCH_CLIENT_MODULE_BY_ID_COMPLETE";
export const FETCH_CLIENT_MODULE_BY_ID_FAILURE =
  "FETCH_CLIENT_MODULE_BY_ID_FAILURE";

export const FETCH_CLIENT_SUBMODULE_BY_ID_COMPLETE =
  "FETCH_CLIENT_SUBMODULE_BY_ID_COMPLETE";
export const FETCH_CLIENT_SUBMODULE_BY_ID_FAILURE =
  "FETCH_CLIENT_SUBMODULE_BY_ID_FAILURE";

export const FETCH_CLIENT_CONTROL_BY_ID_COMPLETE =
  "FETCH_CLIENT_CONTROL_BY_ID_COMPLETE";
export const FETCH_CLIENT_CONTROL_BY_ID_FAILURE =
  "FETCH_CLIENT_CONTROL_BY_ID_FAILURE";

export const UPDATE_CLIENT_CONTROL_COMPLETE = "UPDATE_CLIENT_CONTROL_COMPLETE";
export const UPDATE_CLIENT_CONTROL_FAILURE = "UPDATE_CLIENT_CONTROL_FAILURE";
export const RESET_UPDATE_CLIENT_CONTROL_IS_DONE =
  "RESET_UPDATE_CLIENT_CONTROL_IS_DONE";

export const UPDATE_CLIENT_CONTROL_STATUS_COMPLETE =
  "UPDATE_CLIENT_CONTROL_STATUS_COMPLETE";
export const UPDATE_CLIENT_CONTROL_STATUS_FAILURE =
  "UPDATE_CLIENT_CONTROL_STATUS_FAILURE";
export const BULK_CLIENT_CONTROL_STATUS_COMPLETE =
  "BULK_CLIENT_CONTROL_STATUS_COMPLETE";
export const BULK_CLIENT_CONTROL_STATUS_FAILURE =
  "BULK_CLIENT_CONTROL_STATUS_FAILURE";
export const RESET_CLIENT_CONTROL_STATUS_IS_DONE =
  "RESET_CLIENT_CONTROL_STATUS_IS_DONE";

export const CLIENT_CONTROL_RESTORED_COMPLETE =
  "CLIENT_CONTROL_RESTORED_COMPLETE";
export const CLIENT_CONTROL_RESTORED_FAILURE =
  "CLIENT_CONTROL_RESTORED_FAILURE";
export const RESET_CLIENT_CONTROL_RESTORED_IS_DONE =
  "RESET_CLIENT_CONTROL_RESTORED_IS_DONE";

export const FETCH_CLIENT_CONTROL_TIMELINE_COMPLETE =
  "FETCH_CLIENT_CONTROL_TIMELINE_COMPLETE";
export const FETCH_CLIENT_CONTROL_TIMELINE_FAILURE =
  "FETCH_CLIENT_CONTROL_TIMELINE_FAILURE";

export const FETCH_CLIENTS_API_COMPLETE = "FETCH_CLIENTS_API_COMPLETE";
export const FETCH_CLIENTS_API_FAILURE = "FETCH_CLIENTS_API_FAILURE";
export const FETCH_CLIENTS_API_ERROR = "FETCH_CLIENTS_API_ERROR";

export const FETCH_FEATURES_COMPLETE = "FETCH_FEATURES_COMPLETE";
export const FETCH_FEATURES_FAILURE = "FETCH_FEATURES_FAILURE";
export const FETCH_FEATURES_ERROR = "FETCH_FEATURES_ERROR";
export const FETCH_FEATURE_PROFILE_COMPLETE = "FETCH_FEATURE_PROFILE_COMPLETE";
export const FETCH_FEATURE_PROFILE_FAILURE = "FETCH_FEATURE_PROFILE_FAILURE";
export const FETCH_FEATURE_PROFILE_ERROR = "FETCH_FEATURE_PROFILE_ERROR";
export const UPDATE_FEATURE_COMPLETE = "UPDATE_FEATURE_COMPLETE";
export const UPDATE_FEATURE_ERROR = "UPDATE_FEATURE_ERROR";
export const UPDATE_FEATURE_FAILURE = "UPDATE_FEATURE_FAILURE";

export const FETCH_QUEUES_COMPLETE = "FETCH_QUEUES_COMPLETE";
export const FETCH_QUEUES_FAILURE = "FETCH_QUEUES_FAILURE";
export const FETCH_QUEUES_ERROR = "FETCH_QUEUES_ERROR";
export const FETCH_QUEUE_PROFILE_COMPLETE = "FETCH_QUEUE_PROFILE_COMPLETE";
export const FETCH_QUEUE_PROFILE_FAILURE = "FETCH_QUEUE_PROFILE_FAILURE";
export const FETCH_QUEUE_PROFILE_ERROR = "FETCH_QUEUE_PROFILE_ERROR";
export const UPDATE_QUEUES_COMPLETE = "UPDATE_QUEUES_COMPLETE";
export const UPDATE_QUEUES_ERROR = "UPDATE_QUEUES_ERROR";
export const UPDATE_QUEUES_FAILURE = "UPDATE_QUEUES_FAILURE";

export const FETCH_PERMISSIONS_COMPLETE = "FETCH_PERMISSIONS_COMPLETE";
export const FETCH_PERMISSIONS_FAILURE = "FETCH_PERMISSIONS_FAILURE";

export const FETCH_COMPANY_LIST_SUCCESS = "FETCH_COMPANY_LIST_SUCCESS";
export const FETCH_COMPANY_LIST_FAILURE = "FETCH_COMPANY_LIST_FAILURE";

export const FETCH_BUSINESS_LINE_SUCCESS = "FETCH_BUSINESS_LINE_SUCCESS";
export const FETCH_BUSINESS_LINE_FAILURE = "FETCH_BUSINESS_LINE_FAILURE";

export const FETCH_ELIGIBILITY_PLAN_SUCCESS = "FETCH_ELIGIBILITY_PLAN_SUCCESS";
export const FETCH_ELIGIBILITY_PLAN_FAILURE = "FETCH_ELIGIBILITY_PLAN_FAILURE";

export const FETCH_ELIGIBILITY_GROUP_SUCCESS =
  "FETCH_ELIGIBILITY_GROUP_SUCCESS";
export const FETCH_ELIGIBILITY_GROUP_FAILURE =
  "FETCH_ELIGIBILITY_GROUP_FAILURE";

export const DELETE_HIERARCHYBYID_COMPLETE = "DELETE_HIERARCHYBYID_COMPLETE";
export const DELETE_HIERARCHYBYID_ERROR = "DELETE_HIERARCHYBYID_ERROR";
export const DELETE_HIERARCHYBYID_FAILURE = "DELETE_HIERARCHYBYID_FAILURE";

export const UPLOAD_HIERARCHYBYID_COMPLETE = "UPLOAD_HIERARCHYBYID_COMPLETE";
export const UPLOAD_HIERARCHYBYID_ERROR = "UPLOAD_HIERARCHYBYID_ERROR";
export const UPLOAD_HIERARCHYBYID_FAILURE = "UPLOAD_HIERARCHYBYID_FAILURE";

export const RESET_HIERARCHY_ERROR = "RESET_HIERARCHY_ERROR";
export const RESET_HIERARCHY_DETAILS = "RESET_HIERARCHY_DETAILS";

export const UPDATE_HEADER_TEXT = "UPDATE_HEADER_TEXT";
export const UPDATE_ENTITY_ID = "UPDATE_ENTITY_ID";

export const START_SPINNER_ACTION = "START_SPINNER_ACTION";
export const STOP_SPINNER_ACTION = "STOP_SPINNER_ACTION";
export const SHOW_SNACKBAR_ACTION = "SHOW_SNACKBAR_ACTION";
export const HIDE_SNACKBAR_ACTION = "HIDE_SNACKBAR_ACTION";

export const FETCH_CONTROL_COMPLETE = "FETCH_CONTROL_COMPLETE";
export const FETCH_CONTROL_ERROR = "FETCH_CONTROL_ERROR";
export const FETCH_CONTROL_FAILED = "FETCH_CONTROL_FAILED";
export const ADD_CONTROL_COMPLETE = "ADD_CONTROL_COMPLETE";
export const ADD_CONTROL_ERROR = "ADD_CONTROL_ERROR";
export const DELETE_MASTERCONTROL_COMPLETE = "DELETE_MASTERCONTROL_COMPLETE";
export const DELETE_MASTERCONTROL_FAILURE = "DELETE_MASTERCONTROL_FAILURE";
export const DELETE_CONTROL_PROPERTY_COMPLETE =
  "DELETE_CONTROL_PROPERTY_COMPLETE";
export const DELETE_CONTROL_PROPERTY_FAILURE =
  "DELETE_CONTROL_PROPERTY_FAILURE";
export const ADD_CONTROL_FAILED = "ADD_CONTROL_FAILED";
export const RESET_ADD_CONTROL_ERROR = "RESET_ADD_CONTROL_ERROR";
export const RESET_ADD_CONTROL_IS_DONE = "RESET_ADD_CONTROL_IS_DONE";
export const UPDATE_CONTROL_COMPLETE = "UPDATE_CONTROL_COMPLETE";
export const UPDATE_CONTROL_ERROR = "UPDATE_CONTROL_ERROR";
export const UPDATE_CONTROL_FAILED = "UPDATE_CONTROL_FAILED";
export const UPDATE_CONTROL_COMMENT_COMPLETE =
  "UPDATE_CONTROL_COMMENT_COMPLETE";
export const UPDATE_CONTROL_COMMENT_FAILURE = "UPDATE_CONTROL_COMMENT_FAILURE";
export const RESET_COMMENT_STATUS = "RESET_COMMENT_STATUS";
export const RESET_UPDATE_CONTROL_ERROR = "RESET_UPDATE_CONTROL_ERROR";
export const RESET_UPDATE_CONTROL_IS_DONE = "RESET_UPDATE_CONTROL_IS_DONE";

export const FETCH_CONTROL_FIELDS_COMPLETE = "FETCH_CONTROL_FIELDS_COMPLETE";
export const FETCH_CONTROL_FIELDS_ERROR = "FETCH_CONTROL_FIELDS_ERROR";
export const FETCH_CONTROL_FIELDS_FAILED = "FETCH_CONTROL_FIELDS_FAILED";
export const ADD_CONTROL_FIELD_COMPLETE = "ADD_CONTROL_FIELD_COMPLETE";
export const ADD_CONTROL_FIELD_ERROR = "ADD_CONTROL_FIELD_ERROR";
export const ADD_CONTROL_FIELD_FAILED = "ADD_CONTROL_FIELD_FAILED";
export const RESET_ADD_CONTROL_FIELD_ERROR = "RESET_ADD_CONTROL_FIELD_ERROR";
export const RESET_ADD_CONTROL_FIELD_IS_DONE =
  "RESET_ADD_CONTROL_FIELD_IS_DONE";

export const FETCH_OOB_CONTROL_COMPLETE = "FETCH_OOB_CONTROL_COMPLETE";
export const FETCH_OOB_CONTROL_ERROR = "FETCH_OOB_CONTROL_ERROR";
export const FETCH_OOB_CONTROL_FAILED = "FETCH_OOB_CONTROL_FAILED";
export const ADD_OOB_CONTROL_COMPLETE = "ADD_OOB_CONTROL_COMPLETE";
export const ADD_OOB_CONTROL_ERROR = "ADD_OOB_CONTROL_ERROR";
export const ADD_OOB_CONTROL_FAILED = "ADD_OOB_CONTROL_FAILED";
export const DELETE_OOBCONTROL_COMPLETE = "DELETE_OOBCONTROL_COMPLETE";
export const DELETE_OOBCONTROL_FAILURE = "DELETE_OOBCONTROL_FAILURE";
export const RESET_OOB_CONTROL_ERROR = "RESET_OOB_CONTROL_ERROR";
export const RESET_ADD_OOB_CONTROL_IS_DONE = "RESET_ADD_OOB_CONTROL_IS_DONE";

export const FETCH_OOB_CONTROL_BY_ID_COMPLETE =
  "FETCH_OOB_CONTROL_BY_ID_COMPLETE";
export const FETCH_OOB_CONTROL_BY_ID_ERROR = "FETCH_OOB_CONTROL_BY_ID_ERROR";
export const FETCH_OOB_CONTROL_BY_ID_FAILED = "FETCH_OOB_CONTROL_BY_ID_FAILED";
export const UPDATE_OOB_CONTROL_COMPLETE = "UPDATE_OOB_CONTROL_COMPLETE";
export const UPDATE_OOB_CONTROL_ERROR = "UPDATE_OOB_CONTROL_ERROR";
export const UPDATE_OOB_CONTROL_FAILED = "UPDATE_OOB_CONTROL_FAILED";
export const RESET_UPDATE_OOB_CONTROL_IS_DONE =
  "RESET_UPDATE_OOB_CONTROL_IS_DONE";

export const FETCH_INDIVIDUAL_CONTROL_COMPLETE =
  "FETCH_INDIVIDUAL_CONTROL_COMPLETE";
export const FETCH_INDIVIDUAL_CONTROL_ERROR = "FETCH_INDIVIDUAL_CONTROL_ERROR";
export const FETCH_INDIVIDUAL_CONTROL_FAILURE =
  "FETCH_INDIVIDUAL_CONTROL_FAILURE";
export const ADD_MASTER_CONTROL_FIELD_COMPLETE =
  "ADD_MASTER_CONTROL_FIELD_COMPLETE";
export const ADD_MASTER_CONTROL_FIELD_ERROR = "ADD_MASTER_CONTROL_FIELD_ERROR";
export const ADD_MASTER_CONTROL_FIELD_FAILED =
  "ADD_MASTER_CONTROL_FIELD_FAILED";
export const RESET_ADD_MASTER_CONTROL_FIELD_ERROR =
  "RESET_ADD_MASTER_CONTROL_FIELD_ERROR";
export const RESET_ADD_MASTER_CONTROL_FIELD_IS_DONE =
  "RESET_ADD_MASTER_CONTROL_FIELD_IS_DONE";

export const FETCH_OOB_CONTROL_FIELDS_COMPLETE =
  "FETCH_OOB_CONTROL_FIELDS_COMPLETE";
export const FETCH_OOB_CONTROL_FIELDS_ERROR = "FETCH_OOB_CONTROL_FIELDS_ERROR";
export const FETCH_OOB_CONTROL_FIELDS_FAILED =
  "FETCH_OOB_CONTROL_FIELDS_FAILED";
export const ADD_OOB_CONTROL_FIELD_COMPLETE = "ADD_OOB_CONTROL_FIELD_COMPLETE";
export const ADD_OOB_CONTROL_FIELD_ERROR = "ADD_OOB_CONTROL_FIELD_ERROR";
export const ADD_OOB_CONTROL_FIELD_FAILED = "ADD_OOB_CONTROL_FIELD_FAILED";
export const RESET_OOB_CONTROL_FIELD_ERROR = "RESET_OOB_CONTROL_FIELD_ERROR";
export const RESET_OOB_ADD_CONTROL_FIELD_IS_DONE =
  "RESET_OOB_ADD_CONTROL_FIELD_IS_DONE";

export const FETCH_CONTROLAUDIT_COMPLETE = "FETCH_CONTROLAUDIT_COMPLETE";
export const FETCH_CONTROLAUDIT_FAILURE = "FETCH_CONTROLAUDIT_FAILURE";
export const FETCH_USERAUDIT_COMPLETE = "FETCH_USERAUDIT_COMPLETE";
export const FETCH_USERAUDIT_FAILURE = "FETCH_USERAUDIT_FAILURE";

export const FETCH_OOBMODULE_COMPLETE = "FETCH_OOBMODULE_COMPLETE";
export const FETCH_OOBMODULE_FAILURE = "FETCH_OOBMODULE_FAILURE";
export const FETCH_GLOBALMODULE_COMPLETE = "FETCH_GLOBALMODULE_COMPLETE";
export const FETCH_GLOBALMODULE_FAILURE = "FETCH_GLOBALMODULE_FAILURE";
export const DELETE_OOBMODULE_COMPLETE = "DELETE_OOBMODULE_COMPLETE";
export const DELETE_OOBMODULE_FAILURE = "DELETE_OOBMODULE_FAILURE";
export const FETCH_OOBMODULEBYID_COMPLETE = "FETCH_OOBMODULEBYID_COMPLETE";
export const FETCH_OOBMODULEBYID_FAILURE = "FETCH_OOBMODULEBYID_FAILURE";
export const FETCH_DEFAULTVERSION_COMPLETE = "FETCH_DEFAULTVERSION_COMPLETE";
export const FETCH_DEFAULTVERSION_FAILURE = "FETCH_DEFAULTVERSION_FAILURE";
export const RESET_DEFAULTVERSION = "RESET_DEFAULTVERSION";
export const ADD_OOBMODULE_COMPLETE = "ADD_OOBMODULE_COMPLETE";
export const ADD_OOBMODULE_FAILURE = "ADD_OOBMODULE_FAILURE";
export const UPDATE_OOBMODULE_COMPLETE = "UPDATE_OOBMODULE_COMPLETE";
export const UPDATE_OOBMODULE_FAILURE = "UPDATE_OOBMODULE_FAILURE";
export const RESET_ERROR = "RESET_ERROR";
export const FETCH_COMPARE_VERSION_COMPLETE = "FETCH_COMPARE_VERSION_COMPLETE";
export const FETCH_COMPARE_VERSION_FAILURE = "FETCH_COMPARE_VERSION_FAILURE";
export const RESET_FETCH_COMPARE_VERSION = "RESET_FETCH_COMPARE_VERSION";

export const FETCH_OOBSUBMODULEBYOOBMODULEID_COMPLETE =
  "FETCH_OOBSUBMODULEBYOOBMODULEID_COMPLETE";
export const FETCH_OOBSUBMODULEBYOOBMODULEID_FAILURE =
  "FETCH_OOBSUBMODULEBYOOBMODULEID_FAILURE";

export const RESET_OOB_CONTROL_IS_FETCH_DONE =
  "RESET_OOB_CONTROL_IS_FETCH_DONE";

export const FETCH_OOB_SUBMODULE_BY_ID_COMPLETE =
  "FETCH_OOB_SUBMODULE_BY_ID_COMPLETE";
export const FETCH_OOB_SUBMODULE_BY_ID_FAILURE =
  "FETCH_OOB_SUBMODULE_BY_ID_FAILURE";

export const FETCH_SUBMODULE_COMPLETE = "FETCH_SUBMODULE_COMPLETE";
export const FETCH_SUBMODULE_FAILURE = "FETCH_SUBMODULE_FAILURE";
export const DELETE_OOBSUBMODULE_COMPLETE = "DELETE_OOBSUBMODULE_COMPLETE";
export const DELETE_OOBSUBMODULE_FAILURE = "DELETE_OOBSUBMODULE_FAILURE";
export const ADD_SUBMODULE_COMPLETE = "ADD_SUBMODULE_COMPLETE";
export const ADD_SUBMODULE_ERROR = "ADD_SUBMODULE_ERROR";
export const ADD_SUBMODULE_FAILURE = "ADD_SUBMODULE_FAILURE";
export const UPDATE_SUBMODULE_COMPLETE = "UPDATE_SUBMODULE_COMPLETE";
export const UPDATE_SUBMODULE_ERROR = "UPDATE_SUBMODULE_ERROR";
export const UPDATE_SUBMODULE_FAILURE = "UPDATE_SUBMODULE_FAILURE";
export const UPDATE_SUBMODULE_DIALOG = "UPDATE_SUBMODULE_DIALOG";
export const DELETE_SUBMODULE_COMPLETE = "DELETE_SUBMODULE_COMPLETE";
export const DELETE_SUBMODULE_ERROR = "DELETE_SUBMODULE_ERROR";
export const DELETE_SUBMODULE_FAILURE = "DELETE_SUBMODULE_FAILURE";
export const RESET_SUBMODULE_DUPLICATE_ERROR =
  "RESET_SUBMODULE_DUPLICATE_ERROR";

export const CHANGE_PASSWORD_COMPLETE = "CHANGE_PASSWORD_COMPLETE";
export const CHANGE_PASSWORD_ERROR = "CHANGE_PASSWORD_ERROR";
export const CHANGE_PASSWORD_FAILURE = "CHANGE_PASSWORD_FAILURE";
export const RESET_CHANGE_PASSWORD_DATA = "RESET_CHANGE_PASSWORD_DATA";

export const USER_LOGGED_OUT = "USER_LOGGED_OUT";

export const FETCH_OOB_SUBMODULE_COMPLETE = "FETCH_OOB_SUBMODULE_COMPLETE";
export const FETCH_OOB_SUBMODULE_FAILURE = "FETCH_OOB_SUBMODULE_FAILURE";
export const ADD_OOB_SUBMODULE_COMPLETE = "ADD_OOB_SUBMODULE_COMPLETE";
export const ADD_OOB_SUBMODULE_FAILURE = "ADD_OOB_SUBMODULE_FAILURE";

export const FETCH_CLIENT_ALL_MODULE_ANALYTICS_COMPLETE =
  "FETCH_CLIENT_ALL_MODULE_ANALYTICS_COMPLETE";
export const FETCH_CLIENT_ALL_MODULE_ANALYTICS_FAILURE =
  "FETCH_CLIENT_ALL_MODULE_ANALYTICS_FAILURE";

export const FETCH_CLIENT_OOB_MODULE_ANALYTICS_COMPLETE =
  "FETCH_CLIENT_OOB_MODULE_ANALYTICS_COMPLETE";
export const FETCH_CLIENT_OOB_MODULE_ANALYTICS_FAILURE =
  "FETCH_CLIENT_OOB_MODULE_ANALYTICS_FAILURE";

export const FETCH_CLIENT_GLOBAL_MODULE_ANALYTICS_COMPLETE =
  "FETCH_CLIENT_GLOBAL_MODULE_ANALYTICS_COMPLETE";
export const FETCH_CLIENT_GLOBAL_MODULE_ANALYTICS_FAILURE =
  "FETCH_CLIENT_GLOBAL_MODULE_ANALYTICS_FAILURE";

export const FETCH_CLIENT_SINGLE_MODULE_ANALYTICS_COMPLETE =
  "FETCH_CLIENT_SINGLE_MODULE_ANALYTICS_COMPLETE";
export const FETCH_CLIENT_SINGLE_MODULE_ANALYTICS_FAILURE =
  "FETCH_CLIENT_SINGLE_MODULE_ANALYTICS_FAILURE";

export const FETCH_SYSTEM_INFO_COMPLETE = "FETCH_SYSTEM_INFO_COMPLETE";
export const FETCH_SYSTEM_INFO_FAILURE = "FETCH_SYSTEM_INFO_FAILURE";
export const FETCH_ROLE_TREND_COMPLETE = "FETCH_ROLE_TREND_COMPLETE";
export const FETCH_ROLE_TREND_FAILURE = "FETCH_ROLE_TREND_FAILURE";
export const FETCH_MODULE_USAGE_COMPLETE = "FETCH_MODULE_USAGE_COMPLETE";
export const FETCH_MODULE_USAGE_FAILURE = "FETCH_MODULE_USAGE_FAILURE";
export const FETCH_CLIENT_USAGE_COMPLETE = "FETCH_CLIENT_USAGE_COMPLETE";
export const FETCH_CLIENT_USAGE_FAILURE = "FETCH_CLIENT_USAGE_FAILURE";
export const RESET_DASHBOARD_DATA = "RESET_DASHBOARD_DATA";

export const FETCH_COLUMN_LIST_COMPLETE = "FETCH_COLUMN_LIST_COMPLETE";
export const FETCH_COLUMN_LIST_FAILURE = "FETCH_COLUMN_LIST_FAILURE";

/**
 * Application flags
 */
export const NAME_PATTERN = /^[a-zA-Z][a-zA-Z0-9-_\s]*$/;
// export const EMAIL_VALIDATION_PATTERN = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
// export const EMAIL_VALIDATION_PATTERN = /^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/;
export const EMAIL_VALIDATION_PATTERN = /^[a-zA-Z0-9._-]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/;
export const PHONE_VALIDATION_PATTERN = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;
export const PASSWORD_VALIDATION_PATTERN = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#%&])(?=.{8,})/;
export const LOCAL_ACCESS_TOKEN = localStorage.getItem("access_token");
export const LOCAL_ID_TOKEN = localStorage.getItem("idToken");
export const DEFAULT_PAGE_SIZE = 10;
export const DEFAULT_START_INDEX = 0;
