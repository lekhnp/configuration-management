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

import OobFieldDetails from "../../components/OobFieldDetails";
import OobFieldComments from "../../components/OobFieldComments";
import OobFieldMapping from "../../components/OobFieldMapping";
import OobFieldTimeline from "../../components/OobFieldTimeline";
import { fetchOOBControlAudit } from "../../actions/OOBFieldTimelineActions";
import { fetchConfigTableById } from "../../actions/ModuleConfigActions";
//import { fetchOOBModule } from "../../actions/OOBModuleActions";
import { RESET_DEFAULTVERSION } from "../../utils/AppConstants";
import { handleManageOobFieldError } from "../../utils/Messages";
import { UPDATE_ACTION_OOB_GLOBAL_CONFIG } from "../../utils/FeatureConstants";
import {
  // fetchOobControl,
  fetchOobControlById,
} from "../../actions/OobControlActions";
import { fetchOOBSubmodulesById } from "../../actions/OOBSubmoduleActions";
import { fetchOOBModuleById } from "../../actions/OOBModuleActions";

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

const ManageOobField = () => {
  const history = useHistory();
  const {
    moduleId,
    oobModuleId,
    versionId,
    submoduleId,
    oobSubmoduleId,
    oobControlId,
  } = useParams();
  const styles = useStyles();
  const dispatch = useDispatch();
  const { url } = useRouteMatch();
  const [label, setLabel] = React.useState("");
  const [isDetailsUpdated, setDetailsUpdated] = React.useState(false);
  const [isMappingUpdated, setMappingUpdated] = React.useState(false);
  const featuresAssigned = useSelector(
    (state) => state.User.features
  );
  const OOBModuleById = useSelector(
    (state) => state.OOBModule.OOBModuleById.data
  );
  const OobSubmoduleData = useSelector(
    (state) => state.OOBSubmodule.OobSubmoduleById.data
  );
  const submoduleData = OobSubmoduleData.subModule;

  const OobControlData = useSelector(
    (state) => state.OobControl.individual.details
  );

  const OobControlDataError = useSelector(
    (state) => state.OobControl.individual.fetchError
  );
  const [apiError, setApiError] = useState(null);

  const controlAuditDetails = useSelector(
    (state) => state.OOBFieldTimeline.controlAuditDetails
  );

  const handleModuleBackButton = () => {
    if (label === "OOB") {
      history.push(`/admin/oob-config`);
      dispatch({ type: RESET_DEFAULTVERSION });
      //dispatch(fetchOOBModule("oob"));
    } else {
      history.push(`/admin/global-config`);
      dispatch({ type: RESET_DEFAULTVERSION });
      //dispatch(fetchOOBModule("global"));
    }
  };

  const handleSubmoduleBackButton = () => {
    if (label === "OOB") {
      history.push(
        `/admin/oob-config/components/${moduleId}/${oobModuleId}/${versionId}`
      );
    } else {
      history.push(
        `/admin/global-config/components/${moduleId}/${oobModuleId}/${versionId}`
      );
    }
  };

  const handleFieldsBackButton = () => {
    if (label === "OOB") {
      history.push(
        `/admin/oob-config/fields/${moduleId}/${oobModuleId}/${versionId}/${submoduleId}/${oobSubmoduleId}`
      );
    } else {
      history.push(
        `/admin/global-config/fields/${moduleId}/${oobModuleId}/${versionId}/${submoduleId}/${oobSubmoduleId}`
      );
    }
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
        OOBModuleById &&
        OOBModuleById.module &&
        OOBModuleById.module.moduleName + " (" + versionId + ")",
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
        OobControlData && OobSubmoduleData
          ? OobControlData.controlData.label
            ? OobControlData.controlData.label
            : OobControlData.control.format[0].fieldLabel +
              ": " +
              OobControlData.controlData[
                OobControlData.control.format[0].internalName
              ]
          : "",
    },
  ];

  useEffect(() => {
    if (url.includes("/admin/global-config")) {
      setLabel("Global");
    } else {
      setLabel("OOB");
    }
    dispatch(fetchOobControlById(oobControlId));
    // dispatch(fetchOobControl(oobSubmoduleId));
    dispatch(fetchOOBControlAudit(oobControlId));
    dispatch(fetchOOBSubmodulesById(submoduleId, oobModuleId));
    dispatch(fetchOOBModuleById(moduleId));
    dispatch(fetchConfigTableById(moduleId));
  }, [
    dispatch,
    url,
    submoduleId,
    moduleId,
    oobModuleId,
    oobSubmoduleId,
    oobControlId,
  ]);

  useEffect(() => {
    if(OobControlDataError)
      setApiError(handleManageOobFieldError(OobControlDataError));
    else
      setApiError(false);
  },
    [OobControlDataError]
  );

  return (
    <MatContainer>
      <BreadcrumbView options={BreadcrumbData}></BreadcrumbView>
      <PageHeading
        heading={OobControlData && OobControlData.controlData.label}
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
          {OobControlData && (
            <OobFieldDetails
              isUpdated={isDetailsUpdated}
              fireOnUpdate={setDetailsUpdated}
              key={Math.random()}
              OobControlData={OobControlData}
            />
          )}
          {OobControlData && (
            <OobFieldMapping
              isUpdated={isMappingUpdated}
              fireOnUpdate={setMappingUpdated}
              key={Math.random()}
              OobControlData={OobControlData}
            />
          )}
        </Grid>
        <Grid item xs={4}>
          {/* <FieldStatusDetails />
          <FieldSignOffDetails /> */}
          {featuresAssigned.indexOf(UPDATE_ACTION_OOB_GLOBAL_CONFIG) !== -1 && <OobFieldComments />}
          <OobFieldTimeline auditDetails={controlAuditDetails} />
        </Grid>
      </Grid>
    </MatContainer>
  );
};

export default ManageOobField;
