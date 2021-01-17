import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import CardHeader from "@material-ui/core/CardHeader";
import Typography from "@material-ui/core/Typography";
import { Divider, makeStyles } from "@material-ui/core";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Grid from "@material-ui/core/Grid";

import MatCard from "../MaterialUi/MatCard";
import MatButton from "../MaterialUi/MatButton";
import { formatDate } from "../../utils/helpers";

import {
  fetchClientControlById,
  fetchClientControlAudit,
  changeSingleFieldStatus,
} from "../../actions/ClientModuleActions";

import { showMessageDialog } from "../../actions/MessageDialogActions";

import { RESET_CLIENT_CONTROL_STATUS_IS_DONE } from "../../utils/AppConstants";
import { CONFIRM, READY_TO_SIGNOFF, RETRACT_CONFIRM, SIGN_OFF_CONFIRM } from "../../utils/Messages";
import { FIELD_RETRACT_ACTION, FIELD_SIGN_OFF_ACTION } from "../../utils/FeatureConstants";

const useStyles = makeStyles((theme) => ({
  statusCard: {
    flex: 1,
  },
  cardHeading: {
    paddingTop: "12px",
    paddingBottom: "10px",
  },
  cardHeadingSize: {
    fontSize: "18px",
  },
  highlightedCell: {
    fontWeight: 500,
    width: "100px",
  },
  statusActive: {
    background: "#00c853",
  },
  statusInactive: {
    background: theme.palette.warning.main,
  },
  statusTerminated: {
    background: theme.palette.error.main,
  },
  row: {
    padding: "0px 0 0",
  },
  grow: {
    flexGrow: 1,
  },
  buttonCol: {
    padding: "12px 8px",
    display: "flex",
  },
}));

const FieldSignOffDetails = (props) => {
  const styles = useStyles();
  const dispatch = useDispatch();
  const { controlId } = useParams();
  const { isUpdated, fireOnUpdate, clientControlData } = props;

  const isStatusChanged = useSelector(
    (state) => state.ClientModule.clientControlById.isStatusChanged
  );
  const featuresAssigned = useSelector(
    (state) => state.User.features
  );

  const signOffControl = () => {
    let fieldLabel = "";
    fireOnUpdate(true);
    let payload = {
      clientControlDataId: clientControlData.id,
      status: "SIGN_OFF",
    };
    if (clientControlData.control.type === "form") {
      fieldLabel = clientControlData.controlData.label
        ? clientControlData.controlData.label
        : "";
    }
    dispatch(changeSingleFieldStatus(payload, "SIGN_OFF", fieldLabel));
  };

  const retractControl = () => {
    let fieldLabel = "";
    fireOnUpdate(true);
    let payload = {
      clientControlDataId: clientControlData.id,
      status: "RETRACT",
    };
    if (clientControlData.control.type === "form") {
      fieldLabel = clientControlData.controlData.label
        ? clientControlData.controlData.label
        : "";
    }
    dispatch(changeSingleFieldStatus(payload, "RETRACT", fieldLabel));
  };

  const confirmSignOffControl = () => {
    let messageObj = {
      primaryButtonLabel: "Sign Off",
      primaryButtonAction: () => {
        signOffControl();
      },
      secondaryButtonLabel: "Cancel",
      secondaryButtonAction: () => {},
      title: READY_TO_SIGNOFF,
      message: SIGN_OFF_CONFIRM,
    };
    dispatch(showMessageDialog(messageObj));
  };

  const confirmRetractControl = () => {
    let messageObj = {
      primaryButtonLabel: "Retract",
      primaryButtonAction: () => {
        retractControl();
      },
      secondaryButtonLabel: "Cancel",
      secondaryButtonAction: () => {},
      title: CONFIRM,
      message: RETRACT_CONFIRM,
    };
    dispatch(showMessageDialog(messageObj));
  };

  useEffect(() => {
    if (isStatusChanged && isUpdated) {
      dispatch(fetchClientControlById(controlId));
      dispatch(fetchClientControlAudit(controlId));
      dispatch({ type: RESET_CLIENT_CONTROL_STATUS_IS_DONE });
      fireOnUpdate(false);
    }
  }, [dispatch, controlId, isStatusChanged, isUpdated, fireOnUpdate]);

  return (
    <MatCard className={styles.statusCard}>
      <CardHeader
        className={styles.cardHeading}
        title={
          <Typography variant="h6" className={styles.cardHeadingSize}>
            Sign Off
          </Typography>
        }
      />
      <Divider />
      <TableContainer>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell className={styles.highlightedCell}>
                Signed Off By:
              </TableCell>
              <TableCell>
                {clientControlData.statusAudits &&
                  clientControlData.statusAudits.signoff &&
                  clientControlData.statusAudits.signoff.updatedBy
                  ? clientControlData.statusAudits.signoff.updatedBy
                  : "N/A"}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className={styles.highlightedCell}>
                Signed Off At:
              </TableCell>
              <TableCell>
                {clientControlData.statusAudits &&
                  clientControlData.statusAudits.signoff &&
                  clientControlData.statusAudits.signoff.updateAt
                  ? formatDate(clientControlData.statusAudits.signoff.updateAt)
                  : "N/A"}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Grid container className={styles.row}>
        <Grid item xs={12} className={styles.buttonCol}>
          <div className={styles.grow} />
          {(clientControlData.status === "AWAITING_SIGN_OFF" ||
            clientControlData.status === "RETRACT") && featuresAssigned.indexOf(FIELD_SIGN_OFF_ACTION) !== -1 && (
              <MatButton onClick={confirmSignOffControl}>Sign Off</MatButton>
            )}

          {clientControlData.status === "SIGN_OFF" && featuresAssigned.indexOf(FIELD_RETRACT_ACTION) !== -1 && (
            <MatButton onClick={confirmRetractControl}>Retract</MatButton>
          )}
        </Grid>
      </Grid>
    </MatCard>
  );
};

export default FieldSignOffDetails;
