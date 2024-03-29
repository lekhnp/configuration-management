import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { loginReducer } from "../reducers/LoginReducer";
import { ManageClientReducer } from "../reducers/ManageClientReducer";
import { ModuleReducer } from "../reducers/ModuleReducer";
import { PaginationReducer } from "../reducers/PaginationReducer";
import { MasterModuleReducer } from "../reducers/MasterModuleReducer";
import { ModuleConfigReducer } from "../reducers/ModuleConfigReducer";
import { MasterSubmoduleReducer } from "../reducers/MasterSubmoduleReducer";
import { MasterTableReducer } from "../reducers/MasterTableReducer";
import { MasterSectionReducer } from "../reducers/MasterSectionReducer";
import { MessageDialogReducer } from "../reducers/MessageDialogReducer";
import { UserReducer } from "../reducers/UserReducer";
import { UserTimelineReducer } from "../reducers/UserTimelineReducer";
import { RoleReducer } from "../reducers/RoleReducer";
import { ClientReducer, ClientApiReducer } from "../reducers/ClientReducer";
import { ClientModuleReducer } from "../reducers/ClientModuleReducer";
import { FeatureReducer } from "../reducers/FeatureReducer";
import { ClientHierarchyReducer } from "../reducers/ClientHierarchyReducer";
import { QueueReducer } from "../reducers/QueueReducer";
import { PermissionReducer } from "../reducers/PermissionReducer";
import { CodeVersionReducer } from "../reducers/CodeVersionReducer";
import { EnvironmentReducer } from "../reducers/EnvironmentReducer";
import { CategoriesReducer } from "../reducers/CategoriesReducer";
import { AppHeaderReducer } from "../reducers/AppHeaderReducer";
import { SpinnerReducer } from "../reducers/SpinnerReducer";
import { SnackbarReducer } from "../reducers/SnackbarReducer";
import { ControlReducer } from "../reducers/ControlReducer";
import { ControlCommentReducer } from "../reducers/ControlCommentReducer";
import { ControlGroupReducer } from "../reducers/ControlGroupReducer";
import { OobControlReducer } from "../reducers/OobControlReducer";
import { OOBFieldTimelineReducer } from "../reducers/OOBFieldTimelineReducer";
import { OobControlGroupReducer } from "../reducers/OobControlGroupReducer";
import { SessionTimeoutReducer } from "../reducers/SessionTimeoutReducer";
import { OOBModuleReducer } from "../reducers/OOBModuleReducer";
import { OOBSubmoduleReducer } from "../reducers/OOBSubmoduleReducer";
import { ChangePasswordReducer } from "../reducers/ChangePasswordReducer";
import { ClientAnalyticsReducer } from "../reducers/ClientAnalyticsReducer";
import {MasterSystemVariableReducer} from "../reducers/MasterSystemVariableReducer";
import { DashboardReducer} from "../reducers/DashboardReducer";
import { LettersReducer} from "../reducers/LettersReducer";

const combinedReducer = combineReducers({
  login: loginReducer,
  ManageClient: ManageClientReducer,
  Module: ModuleReducer,
  Pagination: PaginationReducer,
  ModuleConfig: ModuleConfigReducer,
  MasterModule: MasterModuleReducer,
  MasterSubmodule: MasterSubmoduleReducer,
  MasterTable: MasterTableReducer,
  MasterSysVariable: MasterSystemVariableReducer,
  MasterSection: MasterSectionReducer,
  AppMessages: MessageDialogReducer,
  User: UserReducer,
  UserTimeline: UserTimelineReducer,
  Role: RoleReducer,
  Client: ClientReducer,
  MhkClient: ClientApiReducer,
  Feature: FeatureReducer,
  Queue: QueueReducer,
  Permission: PermissionReducer,
  CodeVersion: CodeVersionReducer,
  Environment: EnvironmentReducer,
  Categories: CategoriesReducer,
  ClientHierarchy: ClientHierarchyReducer,
  ClientModule: ClientModuleReducer,
  Header: AppHeaderReducer,
  Spinner: SpinnerReducer,
  Snackbar: SnackbarReducer,
  Control: ControlReducer,
  ControlComment: ControlCommentReducer,
  ControlGroup: ControlGroupReducer,
  OobControl: OobControlReducer,
  OobControlGroup: OobControlGroupReducer,
  OOBFieldTimeline: OOBFieldTimelineReducer,
  SessionTimeout: SessionTimeoutReducer,
  OOBModule: OOBModuleReducer,
  OOBSubmodule: OOBSubmoduleReducer,
  ChangePassword: ChangePasswordReducer,
  ClientAnalytics: ClientAnalyticsReducer,
  Dashboard:DashboardReducer,
  Letters:LettersReducer,
});

const rootReducer = (state, action) => {
  // when a logout action is dispatched it will reset redux state
  if (action.type === "USER_LOGGED_OUT") {
    state = undefined;
  }

  return combinedReducer(state, action);
};

export default createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);
