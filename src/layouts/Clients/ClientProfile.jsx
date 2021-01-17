import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core";
import Card from "@material-ui/core/Card";
//import CircularProgress from "@material-ui/core/CircularProgress";

//import MatCard from "../../components/MaterialUi/MatCard";
import MatContainer from "../../components/MaterialUi/MatContainer";
import PageHeading from "../../components/PageHeading";
import ClientInfo from "../../components/ClientProfileDetails/ClientInfo";
import ClientStatus from "../../components/ClientProfileDetails/ClientStatus";
import ClientEnvironment from "../../components/ClientProfileDetails/ClientEnvironment";
import ClientModules from "../../components/ClientProfileDetails/ClientModules";

import { fetchClientById } from "../../actions/ClientActions";
import { updateHeaderTitle } from "../../actions/AppHeaderActions";
import { updateEntityId } from "../../actions/AppHeaderActions";
import { handleClientProfileError } from "../../utils/Messages";

//import { isEmpty } from "../../utils/helpers";

const useStyles = makeStyles((theme) => ({
  noDataCard: {
    minHeight: "200px",
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
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

const ClientProfile = () => {
  const styles = useStyles();
  const dispatch = useDispatch();
  const { clientId } = useParams();
  const [apiError, setApiError] = useState(null);
  const [isModuleUpdated, setIsModuleUpdated] = useState(false);
  const [isGlobalModuleUpdated, setIsGlobalModuleUpdated] = useState(false);
  //const spinner = useSelector(state => state.Client.spinner);
  const isClientUpdated = useSelector((state) => state.Client.isClientUpdated);
  const error = useSelector((state) => state.Client.getByIdError);
  const clientInfo = useSelector(
    (state) => state.Client.clientByIdDetails.details
  );
  const modulesList = useSelector(
    (state) => state.OOBModule.OOBModuleDetailsList.data.sort((a, b) => a.module.moduleName.toLowerCase() > b.module.moduleName.toLowerCase() ? 1 : -1)
  );
  const GlobalModuleDetailsList = useSelector(state =>
    state.OOBModule.GlobalModuleDetailsList.data.sort((a, b) => a.module.moduleName.toLowerCase() > b.module.moduleName.toLowerCase() ? 1 : -1));

  useEffect(() => {
    if (isClientUpdated) dispatch(fetchClientById(clientId));
  }, [dispatch, isClientUpdated, clientId]);

  useEffect(() => {
    dispatch(updateHeaderTitle(""));
    dispatch(updateEntityId(clientId));
  }, [dispatch, error, clientId]);

  useEffect(() => {
    if(error)
      setApiError(handleClientProfileError(error,clientId));
    else
      setApiError(false);
  },
    [error, clientId]
  );

  return (
    <MatContainer>
      {/* {spinner && (<MatCard>
                <CardContent className={styles.noDataCard}>
                    <CircularProgress color="secondary" />
                </CardContent>
            </MatCard>)} */}
      {apiError && !clientInfo && (
        <Grid item xs={12} className={styles.col}>
          <Card className={apiError.messageType === "error" ? styles.errorCard : styles.warningCard}>
            <Typography variant="body2">{apiError.message}</Typography>
          </Card>
        </Grid>
      )}
      {!apiError && clientInfo && (
        <PageHeading heading={clientInfo.clientName + `'s Profile`} />
      )}
      <Grid container>
        <Grid item xs={8}>
          {!apiError && clientInfo && <ClientInfo details={clientInfo} />}
        </Grid>
        <Grid item xs={4}>
          {!apiError && clientInfo && <ClientStatus details={clientInfo} />}
        </Grid>
        <Grid item xs={12}>
          {!apiError && clientInfo && (
            <ClientEnvironment details={clientInfo} />
          )}
        </Grid>
        <Grid item xs={12}>
          {!apiError && clientInfo && GlobalModuleDetailsList && (
            <ClientModules
              key={Math.random()}
              isEditable={isGlobalModuleUpdated}
              setEditable={setIsGlobalModuleUpdated}
              details={clientInfo}
              modulesList={GlobalModuleDetailsList}
              name={"Global"}
            />
          )}
        </Grid>
        <Grid item xs={12}>
          {!apiError && clientInfo && modulesList && (
            <ClientModules
              key={Math.random()}
              isEditable={isModuleUpdated}
              setEditable={setIsModuleUpdated}
              details={clientInfo}
              modulesList={modulesList}
              name={"OOB"}
            />
          )}
        </Grid>
      </Grid>
    </MatContainer>
  );
};

export default ClientProfile;
