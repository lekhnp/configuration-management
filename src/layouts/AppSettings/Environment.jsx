import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core";
import { CardContent } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import MatButton from "../../components/MaterialUi/MatButton";
import MatCard from "../../components/MaterialUi/MatCard";
import DataTable from "../../components/DataTable";
import PageHeading from "../../components/PageHeading";
import AddEnvironment from "../../components/ManageAppSettings/AddEnvironment";
import DeleteIcon from "@material-ui/icons/Delete";
import { showMessageDialog } from "../../actions/MessageDialogActions";
import {
  resetDuplicateError,
  deleteEnvironment,
  fetchEnvironment,
} from "../../actions/EnvironmentActions";
import { formatDate } from "../../utils/helpers";
import { NO_RECORDS_MESSAGE, handleEnvironmentError, TERM_ENVI, CONFIRM ,termEnvironmentMessage, ENVIRONMENT, ADD_NEW_ENV} from "../../utils/Messages";
import { ADD_ACTION_APP_SETTINGS } from "../../utils/FeatureConstants";
import { DELETE_ACTION_APP_SETTINGS } from "../../utils/FeatureConstants";

const useStyles = makeStyles((theme) => ({
  col: {
    padding: "10px",
  },
  grow: {
    flexGrow: 1,
  },
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

const cols = [
  { id: "id", label: "ID" },
  { id: "environmentName", label: "Environment Name" },
  { id: "createdBy", label: "Created By" },
  { id: "createdAt", label: "Created Date", minWidth: 120 },
];

const Environment = () => {
  const styles = useStyles();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const getApiError = useSelector((state) => state.Environment.getError);
  const [apiError, setApiError] = useState(null);
  const isEnvironmentDeleted = useSelector(
    (state) => state.Environment.isEnvironmentDeleted
  );
  const featuresAssigned = useSelector(
    (state) => state.User.features
  );
  const isEnvironmentAdded = useSelector(
    (state) => state.Environment.isEnvironmentAdded
  );
  const environmentDetailsList = useSelector((state) =>
    state.Environment.environmentDetailsList.list.map((data) => {
      let environmentData = {
        id: data.id,
        environmentName: data.environmentName,
        createdBy: data.createdByUser,
        createdAt: formatDate(data.createdDate),
        updatedBy: data.updatedByUser,
        updatedAt: formatDate(data.updatedDate),
        deleted: data.deleted,
      };
      return { ...environmentData };
    })
  );

  const tableConfig = {
    tableType: "",
    actions: featuresAssigned.indexOf(DELETE_ACTION_APP_SETTINGS) !== -1 && {
      icon: <DeleteIcon fontSize="small" />,
      tooltipText: TERM_ENVI,
      display: "Hide",
      action: (e) => {
        openConfirmDeleteDialog(e);
      },
    },
  };

  const openConfirmDeleteDialog = (e) => {
    let messageObj = {
      primaryButtonLabel: "Yes",
      primaryButtonAction: () => {
        dispatch(deleteEnvironment(e.id, e.environmentName));
      },
      secondaryButtonLabel: "No",
      secondaryButtonAction: () => {},
      title: CONFIRM,
      message:
      termEnvironmentMessage(e.environmentName),
    };
    dispatch(showMessageDialog(messageObj));
  };

  const openAddEnvironmentDialog = () => {
    setOpen(true);
  };

  const closeAddEnvironmentDialog = useCallback(() => {
    dispatch(resetDuplicateError());
    setOpen(false);
  }, [dispatch]);

  useEffect(() => {
    if (isEnvironmentAdded) {
      dispatch(fetchEnvironment());
      closeAddEnvironmentDialog();
    }
  }, [dispatch, isEnvironmentAdded, closeAddEnvironmentDialog]);

  useEffect(() => {
    if (isEnvironmentDeleted) {
      dispatch(fetchEnvironment());
    }
  }, [dispatch, isEnvironmentDeleted]);

  useEffect(() => {
    if (getApiError) {
      setApiError(handleEnvironmentError(getApiError));
    }
    else
      setApiError(false);
  }, [getApiError]);

  return (
    <>
      <PageHeading
        heading={ENVIRONMENT}
        action={
          featuresAssigned.indexOf(ADD_ACTION_APP_SETTINGS) !== -1 &&
          <MatButton onClick={openAddEnvironmentDialog}>
            {ADD_NEW_ENV}
          </MatButton>
        }
      />
      {apiError ? (
        <Grid item xs={12} className={styles.col}>
          <Card className={apiError.messageType === "error" ? styles.errorCard : styles.warningCard}>
            <Typography variant="body2">{apiError.message}</Typography>
          </Card>
        </Grid>
      ) : environmentDetailsList.length > 0 ? (
        <MatCard>
          <DataTable
            cols={cols}
            rows={environmentDetailsList}
            config={tableConfig}
          />
        </MatCard>
      ) : (
            <MatCard>
              <CardContent className={styles.noDataCard}>
                <Typography variant="h5">{NO_RECORDS_MESSAGE}</Typography>
              </CardContent>
            </MatCard>
          )}
      <AddEnvironment handleClose={closeAddEnvironmentDialog} open={open} />
    </>
  );
};

export default Environment;
