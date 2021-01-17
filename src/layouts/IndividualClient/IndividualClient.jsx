import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Switch, Route, useRouteMatch, useHistory } from "react-router-dom";
import MainMenu from "../../components/MainMenu/MainMenu";
import "./client.styles.scss";
import AppHeader from "../../components/AppHeader";
// import Clients from "../Clients";
// import Users from "../Users";
// import Home from "../Home";
// import UserProfile from "../UserProfile";
import ClientDashboard from "../ClientDashboard";
// import OobConfiguration from "../OobConfiguration";
// import AppSettings from "../AppSettings";
// import UserAccessControl from '../UserAccessControl';
import ClientProfile from "../Clients/ClientProfile";
import ClientHierarchy from "../ClientHierarchy";
import IndividualClientModules from "../IndividualClientModules";
import IndividualClientSubmodules from "../IndividualClientSubmodules";
import IndividualClientFields from "../IndividualClientFields";
import IndividualClientConfig from "../IndividualClientConfig";
import IndividualClientEnvironment from "../IndividualClientEnvironment";
import ManageClientField from "../ManageClientField";
import ClientLetters from "../ClientLetters";
import LetterReports from "../ClientLetters/LetterReports";
import LetterEditor from "../ClientLetters/LetterEditor";

//import { fetchModule } from "../../actions/ModuleActions";
import {
  fetchOOBModule,
  fetchGlobalModule,
} from "../../actions/OOBModuleActions";
import { fetchEnvironment } from "../../actions/EnvironmentActions";
import { fetchCodeVersion } from "../../actions/CodeVersionActions";
import { fetchUsers, fetchLoggedInUserInfo } from "../../actions/UserActions";
import { fetchClientById } from "../../actions/ClientActions";
import { fetchSessionTimeout } from "../../actions/SessionTimeoutActions";
import UserProfile from "../UserProfile";
import { RESET_ADD_CLIENT } from "../../utils/AppConstants";

function IndividualClient() {
  let { path } = useRouteMatch();
  const history = useHistory();
  const dispatch = useDispatch();
  const clientId = useSelector((state) => state.Header.entityId);
  const loggedInUserData = useSelector(
    (state) => state.User.loggedInUser.details
  );
  //const {clientId} = useParams();

  useEffect(() => {
    dispatch({ type: RESET_ADD_CLIENT });
    dispatch(fetchLoggedInUserInfo());
    dispatch(fetchSessionTimeout());
    dispatch(fetchOOBModule("oob"));
    dispatch(fetchGlobalModule());
    dispatch(fetchEnvironment());
    dispatch(fetchCodeVersion());
    dispatch(fetchUsers("","","","","name"));
  }, [dispatch]);

  useEffect(() => {
    if (clientId) dispatch(fetchClientById(clientId));
    if (
      !clientId &&
      loggedInUserData &&
      loggedInUserData.user_type === "CLIENT" &&
      loggedInUserData.clients
    ) {
      if (loggedInUserData.clients.length > 0) {
        history.push({
          pathname: `${path}/dashboard/${loggedInUserData.clients[0].id}`,
        });
      }
    }
  }, [dispatch, clientId, loggedInUserData, history, path]);

  return (
    <div className="container">
      <MainMenu />
      <div className="mainContainer">
        <AppHeader />
        <div className="childContainer">
          <Switch>
            <Route
              exact
              path={`${path}/profile/:clientId`}
              component={ClientProfile}
            />
            <Route
              path={`${path}/dashboard/:clientId`}
              component={ClientDashboard}
            />
            <Route
              path={`${path}/hierarchy/:clientId`}
              component={ClientHierarchy}
            />
            <Route
              path={`${path}/user-profile/:clientId/:email`}
              component={UserProfile}
            />
            <Route
              exact
              path={`${path}/modules/:clientId`}
              component={IndividualClientModules}
            />
            <Route
              exact
              path={`${path}/global-modules/:clientId`}
              component={IndividualClientModules}
            />
            <Route
              exact
              path={`${path}/components/:label/:clientId/:moduleId/:moduleVersionId/:version`}
              component={IndividualClientSubmodules}
            />
            <Route
              exact
              path={`${path}/fields/:label/:clientId/:moduleId/:moduleVersionId/:submoduleId/:submoduleVersionId/:version`}
              component={IndividualClientFields}
            />
            <Route
              exact
              path={`${path}/field-details/:label/:clientId/:moduleId/:moduleVersionId/:submoduleId/:submoduleVersionId/:controlId/:version`}
              component={ManageClientField}
            />
            <Route
              exact
              path={`${path}/config-deploy/:clientId`}
              component={IndividualClientConfig}
            />
            <Route
              exact
              path={`${path}/config-deploy/:clientId/:environment`}
              component={IndividualClientEnvironment}
            />
            <Route
              path={`${path}/letters/:clientId`}
              component={ClientLetters}
            />
            {/* <Route
              exact
              path={`${path}/global-modules/:clientId`}
              component={IndividualClientModules}
            /> */}
             <Route             
              path={`${path}/:clientId/letter-Editor`}
              component={LetterEditor} 
            />
              <Route             
              path={`${path}/:clientId/letter-Reports`}
              component={LetterReports} 
            />
          </Switch>
        </div>
      </div>
    </div>
  );
}

export default IndividualClient;
