import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";

import {
  Divider,
  makeStyles,
  // FormHelperText,
  CardContent,
} from "@material-ui/core";
// import ListSubheader from "@material-ui/core/ListSubheader";
import Grid from "@material-ui/core/Grid";
import CardHeader from "@material-ui/core/CardHeader";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import MatCard from "../MaterialUi/MatCard";
import MaterialTextField from "../MaterialUi/MatTextField";
import MatFormControl from "../MaterialUi/MatFormControl";
import MatSelect from "../MaterialUi/MatSelect";
import MatButton from "../MaterialUi/MatButton";
import InfoIcon from "../../assets/images/info-icon.svg";

// import {
//   updateClientProfile,
//   resetClientInfo,
// } from "../../actions/ClientActions";
// import { NAME_PATTERN } from "../../utils/AppConstants";
// import { UPDATE_CLIENT_PROFILE } from "../../utils/FeatureConstants";
import {
  // RELATIONSHIP_MANAGER_MANDATORY_MSG,
  // ACCOUNT_STATUS_MANDATORY_MSG,
  // CODE_VERSION_MANDATORY_MSG,
  // CLIENT_ALREADY_EXIST_MSG,
  COMMON_ERROR_MESSAGE,
  // CLIENT_NAME_MANDATORY_MSG,
  // VALID_NAME_MSG,
  // MAXIMUN_CHARACTER_ALLOWED_MSG,
  // SAVE_DETAILS,
  // CODE_VERSION,
} from "../../utils/Messages";

const useStyles = makeStyles((theme) => ({
  card: {
    flex: 1,
  },
  
  cardHeading: {
    paddingTop: "10px",
    paddingBottom: "8px",
  },
  cardHeadingSize: {
    fontSize: "16px",
    display: "flex",
    alignItems: "center"
  },

  iconSize:{
    fontSize: "16px",
    paddingRight: "5px",
    width: "18px"
  },

  row: {
    padding: "10px 0 0",
  },
  col: {
    padding: "5px 10px",
  },
  dialogTitle: {
    fontWeight: 300,
  },
  chip: {
    margin: "2px",
  },
  errorCard: {
    background: theme.palette.error.main,
    boxShadow: "none !important",
    color: "#ffffff",
    padding: "12px 16px",
    marginBottom: "14px",
  },
  grow: {
    flexGrow: 1,
  },
  buttonCol: {
    padding: "5px 10px",
    display: "flex",
  },
  cancelBtn: {
    marginRight: "16px",
  },
  disableClick: {
    pointerEvents: "none",
  },
  btn: {
    borderRadius: "4px",
    margin: "8px 4px",
    padding: "7px 16px",
    "&:hover":{
      backgroundColor:"#4054b2"
    }
  },
}));

const LetterDetails = (props) => {
  const styles = useStyles();
  // const dispatch = useDispatch();
  const {
    // register,
    // handleSubmit,
    // watch,
    // setValue,
    // setError,
    // clearError,
    // errors,
    formState,
    //reset,
  } = useForm({ mode: "onBlur" });
  //let { dirty } = formState;
  //const [isSubmited, setIsSubmited] = useState(false);
  const [isEditable, setEditable] = useState(false);
  const [isUpdateCalled, setIsUpdateCalled] = useState(false);
  const [apiError, setApiError] = useState(null);
  // const [isSelectionChanged, setSelectionChanged] = useState(false);

  // const loggedInUserData = useSelector(
  //   (state) => state.User.loggedInUser.details
  // );

  return (
    <MatCard className={styles.card}>
      <CardHeader
        className={styles.cardHeading}
        title={
          <Typography variant="h6" className={styles.cardHeadingSize}>
            <img src={InfoIcon} alt={InfoIcon + " icon"} className={styles.iconSize} /> Letter Details
          </Typography>
        }
        action={
          <>
          <MatButton className={styles.btn} color="primary">
             Previous
            </MatButton>
             <MatButton className={styles.btn} color="primary">
             Next
            </MatButton>
            </>
        }
      />
      <Divider />
      <CardContent>
        {apiError && isUpdateCalled ? (
          <Grid item xs={12} className={styles.col}>
            <Card className={styles.errorCard}>
              <Typography variant="body2">{COMMON_ERROR_MESSAGE}</Typography>
            </Card>
          </Grid>
        ) : null}
        <form noValidate autoComplete="off" id="updateClientInfo">
          <Grid container className={styles.row}>
            <Grid item xs={6} className={styles.col}>
              <MaterialTextField
                defaultValue="1553"
                label="Id"
                name="Id"
                disabled={!isEditable}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={6} className={styles.col}>
              <MatFormControl variant="filled" size="small">
                <InputLabel>Method Of Delivery</InputLabel>
                <MatSelect value="Fax" name="delivery">
                  <MenuItem value="Fax">Fax</MenuItem>
                  <MenuItem value="Mail">Mail</MenuItem>
                </MatSelect>
              </MatFormControl>
            </Grid>
            <Grid item xs={6} className={styles.col}>
              <MatFormControl variant="filled" size="small">
                <InputLabel>Module</InputLabel>
                <MatSelect value="GREVIENCE" name="Module">
                  <MenuItem value="GREVIENCE">GREVIENCE</MenuItem>
                  <MenuItem value="LTSS">LTSS</MenuItem>
                </MatSelect>
              </MatFormControl>
            </Grid>
            <Grid item xs={6} className={styles.col}>
              <MatFormControl variant="filled" size="small">
                <InputLabel>Company</InputLabel>
                <MatSelect value="Commercial" name="company">
                  <MenuItem value="Commercial">Commercial</MenuItem>
                  <MenuItem value="Medicare">Medicare</MenuItem>
                </MatSelect>
              </MatFormControl>
            </Grid>
            <Grid item xs={6} className={styles.col}>
              <MaterialTextField
                defaultValue="Appeal Received Notification Letter"
                label="Letter Name"
                name="letterName"
                disabled={!isEditable}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={6} className={styles.col}>
              <MatFormControl variant="filled" size="small">
                <InputLabel>Line Of Business</InputLabel>
                <MatSelect value="Healthy Choice" name="lob">
                  <MenuItem value="Healthy Choice">Healthy Choice</MenuItem>
                  <MenuItem value="Advantage Plus">Advantage Plus</MenuItem>
                </MatSelect>
              </MatFormControl>
            </Grid>
            <Grid item xs={6} className={styles.col}>
              <MatFormControl variant="filled" size="small">
                <InputLabel>Cover Sheet</InputLabel>
                <MatSelect value="--" name="coversheet">
                  <MenuItem value="--">--</MenuItem>
                  <MenuItem value="Provider fax cover sheet">Provider fax cover sheet</MenuItem>
                </MatSelect>
              </MatFormControl>
            </Grid>
            <Grid item xs={6} className={styles.col}>
              <MatFormControl variant="filled" size="small">
                <InputLabel>Letter Appendices</InputLabel>
                <MatSelect value="--" name="letterappendices">
                  <MenuItem value="--">--</MenuItem>
                  <MenuItem value="Standard Disclaimer (English)">Standard Disclaimer (English)</MenuItem>
                </MatSelect>
              </MatFormControl>
            </Grid>
            <Grid item xs={6} className={styles.col}>
              <MatFormControl variant="filled" size="small">
                <InputLabel>Letter Trigger</InputLabel>
                <MatSelect value="--" name="lettertrigger">
                  <MenuItem value="--">--</MenuItem>
                  <MenuItem value="Phase 2 funcionality">Phase 2 funcionality</MenuItem>
                </MatSelect>
              </MatFormControl>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </MatCard>
  );
};

export default LetterDetails;
