import React, { useEffect } from "react";
import { Switch, Route, useRouteMatch, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import MatContainer from "../../components/MaterialUi/MatContainer";
//import Modules from "./Modules";
import MasterModule from "./MasterModule";
import MasterSubmodule from "./MasterSubmodule";
//import MasterSection from "./MasterSection";
import MasterTable from "./MasterTable";
import MasterSystemVariables from "./MasterSystemVariables";
import CodeVersion from "./CodeVersion";
import Environment from "./Environment";
import Categories from "./Categories";
import Controls from "./Controls";
import ControlGroup from "./ControlGroup";
import Session from "./Sessions";

import SideSubMenu from "../../components/SideSubMenu";
import ModuleIcon from "../../assets/images/module-icon.svg";
import tableIcon from "../../assets/images/table-icon.svg";
import EnvironmentIcon from "../../assets/images/environment-icon.svg";
import CategoriesIcon from "../../assets/images/categories-icon.svg";
import SessionIcon from "../../assets/images/session-icon.svg";
import VersionIcon from "../../assets/images/version_icon.svg";
import { fetchUsers } from "../../actions/UserActions";
//import { fetchModule } from "../../actions/ModuleActions";
//import { fetchMasterModule } from "../../actions/MasterModuleActions";
//import { fetchMasterSubmodule } from "../../actions/MasterSubmoduleActions";
import { fetchCodeVersion } from "../../actions/CodeVersionActions";
import { fetchEnvironment } from "../../actions/EnvironmentActions";
//import { fetchCategories } from "../../actions/CategoriesActions";
import { updateHeaderTitle } from "../../actions/AppHeaderActions";
import { fetchSessionTimeout } from "../../actions/SessionTimeoutActions";
import SubmoduleIcon from "../../assets/images/submodule-icon.svg";
import {
  APP_SETTINGS,
  CODE_VERSION,
  ENVIRONMENT,
  MASTER_MODULE,
  MASTER_SUBMODULE,
  SESSION_TIME,
  MASTER_CONTROL,
  MASTER_TABLE,
  MASTER_SYSTEM_VARIABLES,
} from "../../utils/Messages";
//import SectionIcon from "../../assets/images/form-icon.svg";

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
    paddingLeft: "290px",
  },
  subMenuGrid: {
    position: "fixed",
  },
}));

const AppSettings = () => {
  let { path } = useRouteMatch();
  const history = useHistory();
  const dispatch = useDispatch();
  const styles = useStyles();

  useEffect(() => {
    dispatch(updateHeaderTitle(APP_SETTINGS));
    dispatch(fetchUsers());
    //dispatch(fetchModule());
    //dispatch(fetchMasterModule());
    //dispatch(fetchMasterSubmodule());
    dispatch(fetchCodeVersion());
    dispatch(fetchEnvironment());
    //dispatch(fetchCategories());
    dispatch(fetchSessionTimeout());
  }, [dispatch]);

  const subMenuOptions = [
    {
      type: "menu",
      label: APP_SETTINGS,
      action: () => { },
      isExpandable: false,
      children: [
        {
          type: "linkWithAvatar",
          icon: ModuleIcon,
          label: MASTER_MODULE,
          subText: "",
          action: () => {
            history.push("/admin/app-setting");
          },
          path: "/admin/app-setting",
          activePages: ["/admin/app-setting"],
          children: [],
        },
        {
          type: "linkWithAvatar",
          icon: SubmoduleIcon,
          label: MASTER_SUBMODULE,
          subText: "",
          action: () => {
            history.push("/admin/app-setting/master-component");
          },
          path: "/admin/app-setting/master-component",
          activePages: ["/admin/app-setting/master-component"],
          children: [],
        },
        // Master section is temporary hidden it could be visible based on client requirement
        // {
        //   type: "linkWithAvatar",
        //   icon: SectionIcon,
        //   label: "Master Section",
        //   subText: "",
        //   action: () => {
        //     history.push("/admin/app-setting/master-section");
        //   },
        //   path: "/admin/app-setting/master-module",
        //   activePages: ["/admin/app-setting/master-section"],
        //   children: [],
        // },
        {
          type: "linkWithAvatar",
          icon: CategoriesIcon,
          label: MASTER_CONTROL,
          subText: "",
          action: () => {
            history.push("/admin/app-setting/controls");
          },
          path: "/admin/app-setting/controls",
          activePages: [
            "/admin/app-setting/controls",
            "/admin/app-setting/control-group",
          ],
          children: [],
        },
        {
          type: "linkWithAvatar",
          icon: tableIcon,
          label: MASTER_TABLE,
          subText: "",
          action: () => {
            history.push("/admin/app-setting/tables");
          },
          path: "/admin/app-setting/tables",
          activePages: [
            "/admin/app-setting/tables",
            //"/admin/app-setting/control-group",
          ],
          children: [],
        },
        {
          type: "linkWithAvatar",
          icon: tableIcon,
          label: MASTER_SYSTEM_VARIABLES,
          subText: "",
          action: () => {
            history.push("/admin/app-setting/system-variables");
          },
          path: "/admin/app-setting/system-variables",
          activePages: [
            "/admin/app-setting/system-variables",
            //"/admin/app-setting/control-group",
          ],
          children: [],
        },
        {
          type: "linkWithAvatar",
          icon: VersionIcon,
          label: CODE_VERSION,
          subText: "",
          action: () => {
            history.push("/admin/app-setting/code-version");
          },
          path: "/admin/app-setting/code-version",
          activePages: ["/admin/app-setting/code-version"],
          children: [],
        },
        {
          type: "linkWithAvatar",
          icon: EnvironmentIcon,
          label: ENVIRONMENT,
          subText: "",
          action: () => {
            history.push("/admin/app-setting/environment");
          },
          path: "/admin/app-setting/environment",
          activePages: ["/admin/app-setting/environment"],
          children: [],
        },
        // {
        //   type: "linkWithAvatar",
        //   icon: CategoriesIcon,
        //   label: "Categories",
        //   subText: "",
        //   action: () => {
        //     history.push("/admin/app-setting/categories");
        //   },
        //   children: [],
        // },

        {
          type: "linkWithAvatar",
          icon: SessionIcon,
          label: SESSION_TIME,
          subText: "",
          action: () => {
            history.push("/admin/app-setting/session-time");
          },
          path: "/admin/app-setting/session-time",
          activePages: ["/admin/app-setting/session-time"],
          children: [],
        },
      ],
    },
  ];

  return (
    <MatContainer>
      <Grid container wrap="nowrap">
        <Grid item className={styles.subMenuGrid}>
          <SideSubMenu options={subMenuOptions}></SideSubMenu>
        </Grid>
        <Grid item className={styles.grow}>
          <Switch>
            <Route exact path={`${path}`} component={MasterModule} />
            <Route
              exact
              path={`${path}/master-component`}
              component={MasterSubmodule}
            />
            {/* <Route
              exact
              path={`${path}/master-section`}
              component={MasterSection}
            /> */}
            <Route exact path={`${path}/controls`} component={Controls} />
            <Route exact path={`${path}/tables`} component={MasterTable} />
            <Route exact path={`${path}/system-variables`} component={MasterSystemVariables} />
            <Route
              exact
              path={`${path}/control-group/:controlId`}
              component={ControlGroup}
            />
            <Route
              exact
              path={`${path}/code-version`}
              component={CodeVersion}
            />
            <Route exact path={`${path}/environment`} component={Environment} />
            <Route exact path={`${path}/categories`} component={Categories} />

            <Route exact path={`${path}/session-time`} component={Session} />
          </Switch>
        </Grid>
      </Grid>
    </MatContainer>
  );
};

export default AppSettings;
