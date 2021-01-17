import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core";
import MatButton from "../../components/MaterialUi/MatButton";
import MatCard from "../../components/MaterialUi/MatCard";
import DataTable from "../../components/DataTable";
import PageHeading from "../../components/PageHeading";
import AddVersion from "../../components/ManageAppSettings/AddCodeVersion";
import DeleteIcon from "@material-ui/icons/Delete";
import { CardContent } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import { showMessageDialog } from "../../actions/MessageDialogActions";
import { ADD_ACTION_APP_SETTINGS } from "../../utils/FeatureConstants";
import {
  deleteCodeVersion,
  resetDuplicateError,
  fetchCodeVersion,
} from "../../actions/CodeVersionActions";
import { formatDate } from "../../utils/helpers";
import {
  NO_RECORDS_MESSAGE,
  handleCodeVersionError,
  TERM_CODE_VER,
  CONFIRM,
  CODE_VERSION,
  ADD_NEW_CODE_VER,
  codeTermVersionMessage,
} from "../../utils/Messages";
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
  { id: "codeVersion", label: "Code Version" },
  { id: "type", label: "Version Type" },
  { id: "createdBy", label: "Created By" },
  { id: "createdAt", label: "Created Date", minWidth: 120 },
];

const CodeVersion = () => {
  const styles = useStyles();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const getApiError = useSelector((state) => state.CodeVersion.getError);
  const [apiError, setApiError] = useState(null);
  const isCodeVersionDeleted = useSelector(
    (state) => state.CodeVersion.isCodeVersionDeleted
  );
  const featuresAssigned = useSelector(
    (state) => state.User.features
  );
  const isCodeVersionAdded = useSelector(
    (state) => state.CodeVersion.isCodeVersionAdded
  );
  const codeVersionDetailsList = useSelector((state) =>
    state.CodeVersion.codeVersionDetailsList.list.map((data) => {
      let codeVersionData = {
        id: data.id,
        codeVersion: data.codeVersion,
        type: data.type,
        createdBy: data.createdByUser,
        createdAt: formatDate(data.createdDate),
        updatedBy: data.updatedByUser,
        updatedAt: formatDate(data.updatedDate),
        deleted: data.deleted,
      };
      return { ...codeVersionData };
    })
  );

  const tableConfig = {
    tableType: "",
    actions: featuresAssigned.indexOf(DELETE_ACTION_APP_SETTINGS) !== -1 && {
      icon: <DeleteIcon fontSize="small" />,
      tooltipText: TERM_CODE_VER,
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
        dispatch(deleteCodeVersion(e.id, e.codeVersion));
      },
      secondaryButtonLabel: "No",
      secondaryButtonAction: () => {},
      title: CONFIRM,
      message: codeTermVersionMessage(e.codeVersion),
    };
    dispatch(showMessageDialog(messageObj));
  };

  const openAddVersionDialog = () => {
    setOpen(true);
  };

  const closeAddVersionDialog = useCallback(() => {
    dispatch(resetDuplicateError());
    setOpen(false);
  }, [dispatch]);

  useEffect(() => {
    if (isCodeVersionAdded) {
      dispatch(fetchCodeVersion());
      closeAddVersionDialog();
    }
  }, [dispatch, isCodeVersionAdded, closeAddVersionDialog]);

  useEffect(() => {
    if (isCodeVersionDeleted) {
      dispatch(fetchCodeVersion());
    }
  }, [dispatch, isCodeVersionDeleted]);

  useEffect(() => {
    if (getApiError) {
      setApiError(handleCodeVersionError(getApiError));
    }
    else
      setApiError(false);
  }, [getApiError]);

  return (
    <>
      <PageHeading
        heading={CODE_VERSION}
        action={
          featuresAssigned.indexOf(ADD_ACTION_APP_SETTINGS) !== -1 &&
          <MatButton onClick={openAddVersionDialog}>
            {ADD_NEW_CODE_VER}
          </MatButton>
        }
      />
      {apiError ? (
        <Grid item xs={12} className={styles.col}>
          <Card className={apiError.messageType === "error" ? styles.errorCard : styles.warningCard}>
            <Typography variant="body2">{apiError.message}</Typography>
          </Card>
        </Grid>
      ) : codeVersionDetailsList.length > 0 ? (
        <MatCard>
          <DataTable
            cols={cols}
            rows={codeVersionDetailsList}
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
      <AddVersion handleClose={closeAddVersionDialog} open={open} />
    </>
  );
};

export default CodeVersion;
