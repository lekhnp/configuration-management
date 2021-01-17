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
import { FIELD_APPROVE_ACTION } from "../../utils/FeatureConstants";

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

const FieldApproveDetails = (props) => {
  const styles = useStyles();
  const dispatch = useDispatch();
  const { controlId } = useParams();
  const { isUpdated, fireOnUpdate, clientControlData, userType } = props;

  const isStatusChanged = useSelector(
    (state) => state.ClientModule.clientControlById.isStatusChanged
  );
  const featuresAssigned = useSelector(
    (state) => state.User.features
  );

  const approveControl = () => {
    let fieldLabel = "";
    fireOnUpdate(true);
    let payload = {
      clientControlDataId: clientControlData.id,
      status: "APPROVED",
    };
    if (clientControlData.control.type === "form") {
      fieldLabel = clientControlData.controlData.label
        ? clientControlData.controlData.label
        : "";
    }
    dispatch(changeSingleFieldStatus(payload, "APPROVED", fieldLabel));
  };

  const confirmApproveControl = () => {
    let messageObj = {
      primaryButtonLabel: "Approve",
      primaryButtonAction: () => {
        approveControl();
      },
      secondaryButtonLabel: "Cancel",
      secondaryButtonAction: () => { },
      title: "Ready to approve?",
      message: `Please click on "Approve" to confirm your approval.`,
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
            Approve
          </Typography>
        }
      />
      <Divider />
      <TableContainer>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell className={styles.highlightedCell}>
                Approved By:
              </TableCell>
              <TableCell>
                {clientControlData.statusAudits &&
                  clientControlData.statusAudits.approved &&
                  clientControlData.statusAudits.approved.updatedBy
                  ? clientControlData.statusAudits.approved.updatedBy
                  : "N/A"}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className={styles.highlightedCell}>
                Approved At:
              </TableCell>
              <TableCell>
                {clientControlData.statusAudits &&
                  clientControlData.statusAudits.approved &&
                  clientControlData.statusAudits.approved.updateAt
                  ? formatDate(clientControlData.statusAudits.approved.updateAt)
                  : "N/A"}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Grid container className={styles.row}>
        <Grid item xs={12} className={styles.buttonCol}>
          <div className={styles.grow} />
          {clientControlData.status === "SIGN_OFF" && userType === "MHK" && featuresAssigned.indexOf(FIELD_APPROVE_ACTION) !== -1 && (
            <MatButton onClick={confirmApproveControl}>Approve</MatButton>
          )}
        </Grid>
      </Grid>
    </MatCard>
  );
};

export default FieldApproveDetails;
