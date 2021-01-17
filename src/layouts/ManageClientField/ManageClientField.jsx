import React, { useState,useEffect } from "react";
import { useHistory, useParams, useRouteMatch } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { makeStyles } from "@material-ui/core";

import MatContainer from "../../components/MaterialUi/MatContainer";
import PageHeading from "../../components/PageHeading";
import BreadcrumbView from "../../components/BreadcrumbView";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";

import ClientFieldDetails from "../../components/ClientFieldDetails";
import OobFieldComments from "../../components/OobFieldComments";
// import OobFieldMapping from "../../components/OobFieldMapping";
import OobFieldTimeline from "../../components/OobFieldTimeline";
import FieldStatusDetails from "../../components/FieldStatusDetails";
import FieldSignOffDetails from "../../components/FieldSignOffDetails";
import FieldApproveDetails from "../../components/FieldApproveDetails";
import { fetchClientControlAudit } from "../../actions/ClientModuleActions";
import { updateEntityId } from "../../actions/AppHeaderActions";
//import { fetchOOBModule } from "../../actions/OOBModuleActions";
//import { RESET_DEFAULTVERSION } from "../../utils/AppConstants";

import {
  // fetchOobControl,
  fetchClientControlById,
} from "../../actions/ClientModuleActions";
import { fetchClientSubmoduleById } from "../../actions/ClientModuleActions";
import { fetchClientModuleById } from "../../actions/ClientModuleActions";
import { ADD_COMMENT_ON_CLIENT_FIELD } from "../../utils/FeatureConstants";
import { handleManageClientFieldError } from "../../utils/Messages";

const useStyles = makeStyles((theme) => ({
  col: {
    padding: "5px 10px",
  },
  errorCard: {
    background: theme.palette.error.main,
    boxShadow: "none !important",
    color: "#ffffff",
    padding: "12px 16px",
    marginBottom: "14px",
  },
  warningCard: {
    background: theme.palette.warning.main,
    boxShadow: 'none !important',
    color: '#ffffff',
    padding: '12px 16px',
    marginBottom: '14px'
  },
}));

const ManageClientField = () => {
  const history = useHistory();
  const {
    label,
    clientId,
    moduleId,
    moduleVersionId,
    submoduleId,
    submoduleVersionId,
    controlId,
    version,
  } = useParams();
  const styles = useStyles();
  const dispatch = useDispatch();
  const { url } = useRouteMatch();
  const [isDetailsUpdated, setDetailsUpdated] = React.useState(false);
  const [isSignOffUpdated, setSignOffUpdated] = React.useState(false);
  const [isApproveUpdated, setApproveUpdated] = React.useState(false);
  // const [isMappingUpdated, setMappingUpdated] = React.useState(false);
  const loggedInUserData = useSelector(
    (state) => state.User.loggedInUser.details
  );

  const featuresAssigned = useSelector(
    (state) => state.User.features
  );

  const clientModuleById = useSelector(
    (state) => state.ClientModule.clientModuleById.data
  );
  const clientSubmoduleById = useSelector(
    (state) => state.ClientModule.clientSubmoduleById.data
  );
  const submoduleData = clientSubmoduleById && clientSubmoduleById.subModule;

  const clientControlData = useSelector(
    (state) => state.ClientModule.clientControlById.data
  );

  const clientControlDataError = useSelector(
    (state) => state.ClientModule.clientControlById.error
  );
  const [apiError, setApiError] = useState(null);

  const controlAuditDetails = useSelector(
    (state) => state.ClientModule.controlTimeline.data
  );

  const handleModuleBackButton = () => {
    if (label === "OOB") {
      history.push(`/client/modules/${clientId}`);
    } else {
      history.push(`/client/global-modules/${clientId}`);
    }
  };

  const handleSubmoduleBackButton = () => {
    history.push(
      `/client/components/${label}/${clientId}/${moduleId}/${moduleVersionId}/${version}`
    );
  };

  const handleFieldsBackButton = () => {
    history.push(
      `/client/fields/${label}/${clientId}/${moduleId}/${moduleVersionId}/${submoduleId}/${submoduleVersionId}/${version}`
    );
  };

  const BreadcrumbData = [
    {
      id: "modules",
      label: label + " Modules",
      action: handleModuleBackButton,
    },
    {
      id: "submodules",
      label:
        clientModuleById &&
        clientModuleById.module &&
        clientModuleById.module.moduleName + " (" + version + ")",
      action: handleSubmoduleBackButton,
    },
    {
      id: "fields",
      label: submoduleData ? submoduleData.name : "",
      action: handleFieldsBackButton,
    },
    {
      id: "controls",
      label:
        clientControlData && clientSubmoduleById
          ? clientControlData.controlData.label
            ? clientControlData.controlData.label
            : clientControlData.control.format[0].fieldLabel +
            ": " +
            clientControlData.controlData[
            clientControlData.control.format[0].internalName
            ]
          : "",
      // label: clientControlData
      //   ? clientSubmoduleById &&
      //     clientSubmoduleById.metaTag &&
      //     clientSubmoduleById.metaTag.controlType === "form"
      //     ? clientControlData.controlData.label
      //     : clientControlData.control.format[0].fieldLabel +
      //       ": " +
      //       clientControlData.controlData[
      //         clientControlData.control.format[0].internalName
      //       ]
      //   : "",
    },
  ];

  useEffect(() => {
    dispatch(updateEntityId(clientId));
    dispatch(fetchClientControlById(controlId));
    dispatch(fetchClientControlAudit(controlId));
    dispatch(fetchClientSubmoduleById(submoduleId, moduleVersionId));
    if (loggedInUserData.user_type === "CLIENT") {
      dispatch(fetchClientModuleById(moduleId));
    } else {
      dispatch(fetchClientModuleById(moduleId, clientId));
    }
  }, [
    dispatch,
    url,
    submoduleId,
    moduleId,
    controlId,
    clientId,
    loggedInUserData.user_type,
    moduleVersionId,
  ]);

  useEffect(() => {
    if(clientControlDataError)
      setApiError(handleManageClientFieldError(clientControlDataError));
    else
      setApiError(false);
  },
    [clientControlDataError]
  );

  return (
    <MatContainer>
      <BreadcrumbView options={BreadcrumbData}></BreadcrumbView>
      <PageHeading
        heading={clientControlData && clientControlData.controlData.label}
      />
      <Grid container>
        {apiError && (
          <Grid item xs={12} className={styles.col}>
            <Card className={apiError.messageType === "error" ? styles.errorCard : styles.warningCard}>
              <Typography variant="body2">
                {apiError.message}
              </Typography>
            </Card>
          </Grid>
        )}
        <Grid item xs={8}>
          <Grid container style={{ display: "flex" }}>
            <Grid item xs={6} style={{ display: "flex", flex: 1 }}>
              {clientControlData && (
                <FieldSignOffDetails
                  isUpdated={isSignOffUpdated}
                  fireOnUpdate={setSignOffUpdated}
                  key={Math.random()}
                  clientControlData={clientControlData}
                  userType={loggedInUserData.user_type}
                />
              )}
            </Grid>
            <Grid item xs={6} style={{ display: "flex", flex: 1 }}>
              {clientControlData && (
                <FieldApproveDetails
                  isUpdated={isApproveUpdated}
                  fireOnUpdate={setApproveUpdated}
                  key={Math.random()}
                  clientControlData={clientControlData}
                  userType={loggedInUserData.user_type}
                />
              )}
            </Grid>
          </Grid>
          {clientControlData && (
            <ClientFieldDetails
              isUpdated={isDetailsUpdated}
              fireOnUpdate={setDetailsUpdated}
              key={Math.random()}
              clientControlData={clientControlData}
            />
          )}

          {/* {OobControlData && (
            <OobFieldMapping
              isUpdated={isMappingUpdated}
              fireOnUpdate={setMappingUpdated}
              key={Math.random()}
              OobControlData={OobControlData}
            />
          )} */}
        </Grid>
        <Grid item xs={4}>
          {clientControlData && (
            <FieldStatusDetails clientControlData={clientControlData} />
          )}
          {featuresAssigned.indexOf(ADD_COMMENT_ON_CLIENT_FIELD) !== -1 &&
            <OobFieldComments />
          }
          <OobFieldTimeline auditDetails={controlAuditDetails} />
        </Grid>
      </Grid>
    </MatContainer>
  );
};

export default ManageClientField;
