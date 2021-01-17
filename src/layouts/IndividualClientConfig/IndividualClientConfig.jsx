import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import { CardContent } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import CardHeader from "@material-ui/core/CardHeader";

import MatCard from "../../components/MaterialUi/MatCard";
import MatContainer from "../../components/MaterialUi/MatContainer";
import PageHeading from "../../components/PageHeading";
import DataTable from "../../components/DataTable";
import ConfigDeploymentAnalytics from "./ConfigDeploymentAnalytics";
import VisibilityIcon from "@material-ui/icons/Visibility";
import { updateEntityId } from "../../actions/AppHeaderActions";
import { handleIndividualClientConfigAnalyticsError,handleIndividualClientConfigError, NO_RECORDS_MESSAGE } from "../../utils/Messages";
import { fetchClientAllModuleAnalytics } from "../../actions/ClientAnalyticsActions";

const useStyles = makeStyles((theme) => ({
  card: {
    marginTop: "16px",
  },
  cardHeading: {
    paddingTop: "12px",
    paddingBottom: "10px",
  },
  cardHeadingSize: {
    fontSize: "18px",
  },
  moreChip: {
    "& .MuiChip-label": {
      paddingLeft: "0px",
    },
  },
  col: {
    paddingRight: "10px",
  },
  filterDropdown: {
    paddingRight: "10px",
    minWidth: "200px",
  },
  noDataCard: {
    minHeight: "200px",
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
  },
  disableClick: {
    pointerEvents: "none",
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
  statusActive: {
    background: "#00c853",
  },
  statusInactive: {
    background: theme.palette.warning.main,
  },
}));

const IndividualClientConfig = () => {
  const history = useHistory();
  const styles = useStyles();
  const dispatch = useDispatch();
  const { clientId } = useParams();
  const getApiError = useSelector(
    (state) => state.ClientModule.getClientModulesError
  );
  const allModuleAnalytics = useSelector(
    (state) => state.ClientAnalytics.AllModuleAnalytics.data
  );
  const allModuleAnalyticsError = useSelector(
    (state) => state.ClientAnalytics.AllModuleAnalytics.error
  );
  const [apiError, setApiError] = useState(null);
  const [analyticsError, setAnalyticsError] = useState(null);

  function createData(id, environment, connectstatus) {
    return { id, environment, connectstatus };
  }

  const ClientModuleList = [
    createData(1, "DEV", "Connected"),
    createData(2, "PRODUCTION", "Connected"),
    createData(3, "TRAINING", "Unable to Connect"),
    createData(4, "UAT", "Connected"),
  ];

  const cols = [
    { id: "environment", label: "Environment", minWidth: 200 },
    { id: "connectstatus", label: "Connection Status" },
  ];

  const tableConfig = {
    tableType: "",
    actions: {
      icon: <VisibilityIcon color="primary" fontSize="small" />,
      tooltipText: "View & Update Environment",
      action: (data) => {
        history.push(`/client/config-deploy/${clientId}/${data.environment}`);
      },
    },
  };

  useEffect(() => {
    dispatch(updateEntityId(clientId));
    dispatch(fetchClientAllModuleAnalytics(clientId));
  }, [dispatch, clientId]);

  useEffect(() => {
    if (allModuleAnalyticsError)
      setAnalyticsError(handleIndividualClientConfigAnalyticsError(allModuleAnalyticsError));
    else
      setAnalyticsError(false);
  },
    [allModuleAnalyticsError]
  );

  useEffect(() => {
    if(getApiError)
      setApiError(handleIndividualClientConfigError(getApiError));
    else
      setApiError(false);
  },
    [getApiError]
  );

  return (
    <MatContainer>
      <PageHeading heading="Configuration Deployment" />
      {analyticsError && (
        <Grid container>
          <Grid item xs={12} className={styles.error}>
            <Card className={analyticsError.messageType === "error" ? styles.errorCard : styles.warningCard}>
              <Typography variant="body2">
                {analyticsError.message}
              </Typography>
            </Card>
          </Grid>
        </Grid>
      )}
      {allModuleAnalytics && (
        <div className={styles.analyticsContainer}>
          <ConfigDeploymentAnalytics
            title={`Configuration Analytics`}
            analyticsData={allModuleAnalytics[1]}
          />
        </div>
      )}
      {apiError ? (
        <Grid item xs={12} className={styles.error}>
          <Card className={apiError.messageType === "error" ? styles.errorCard : styles.warningCard}>
            <Typography variant="body2">
              {apiError.message}
            </Typography>
          </Card>
        </Grid>
      ) : ClientModuleList.length > 0 ? (
        <MatCard className={styles.card}>
          <CardHeader
            className={styles.cardHeading}
            title={
              <Typography variant="h6" className={styles.cardHeadingSize}>
                Environment Status &amp; comparison
              </Typography>
            }
          />
          <DataTable cols={cols} rows={ClientModuleList} config={tableConfig} />
        </MatCard>
      ) : (
            <MatCard>
              <CardContent className={styles.noDataCard}>
                <Typography variant="h5">{NO_RECORDS_MESSAGE}</Typography>
              </CardContent>
            </MatCard>
          )}
    </MatContainer>
  );
};

export default IndividualClientConfig;
