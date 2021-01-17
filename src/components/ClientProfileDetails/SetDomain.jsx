/* eslint-disable no-unused-vars */
import React, { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { makeStyles } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Grid from "@material-ui/core/Grid";
//import FormControlLabel from '@material-ui/core/FormControlLabel';
//import Paper from "@material-ui/core/Paper";
//import Switch from "@material-ui/core/Switch";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
//import MenuItem from '@material-ui/core/MenuItem';

import MatButton from "../MaterialUi/MatButton";
import MaterialTextField from "../MaterialUi/MatTextField";
import {
  //addMasterModule,
  resetDuplicateError,
} from "../../actions/MasterModuleActions";
import {
  COMMON_ERROR_MESSAGE,
  DOMAIN_NAME,
  DOMAIN_NAME_MANDATORY,
} from "../../utils/Messages";
//import { NAME_PATTERN } from "../../utils/AppConstants";

const useStyles = makeStyles((theme) => ({
  dialogTitle: {
    fontWeight: 300,
  },
  col: {
    padding: "10px",
  },
  label: {
    margin: "0px",
  },
  errorCard: {
    background: theme.palette.error.main,
    boxShadow: "none !important",
    color: "#ffffff",
    padding: "12px 16px",
    //marginBottom: '14px'
  },
}));

const SetDomain = (props) => {
  const styles = useStyles();
  const dispatch = useDispatch();
  const { register, handleSubmit, watch, clearError, errors } = useForm({
    mode: "onBlur",
  });
  const [isSubmited, setIsSubmited] = useState(false);
  const [isEmpty, setIsEmpty] = useState(true);
  //const [isSelectionChanged, setSelectionChanged] = useState(false);
  //const isModuleAdded = useSelector(state => state.MasterModule.isModuleAdded);
  //const [apiError, setApiError] = useState(null);
  //const addApiError = useSelector(state => state.MasterModule.addError);
  //const categoryOptions = useSelector(state => state.ModuleConfig.configModuleList);
  //const [domainName, setDomainName] = useState("");
  // const [inputs, setInputs] = useState({
  //     moduleName: "",
  //     isGlobal: false,
  //     category: "",
  //     description: "",
  // });

  const handleCloseForm = useCallback(() => {
    setIsSubmited(false);
    clearError();
    props.handleClose();
  }, [props, clearError]);

  let handleChange = (e) => {
    dispatch(resetDuplicateError());
    //setApiError(false);
    const { name, value } = e.target;
    if (value === "") setIsEmpty(true);
    else setIsEmpty(false);
    // if (name === "category") {
    //     setInputs((inputs) => ({ ...inputs, [name]: value }));
    // } else {
    //     setInputs((inputs) => ({ ...inputs, [name]: watch(name) }));
    // }
    //setSelectionChanged(true);
  };

  // useEffect(() => {
  //     if (!!addApiError) {
  //         setIsSubmited(false);
  //     }

  //     if (addApiError && !(addApiError.responseCode === "201" || addApiError.responseCode === 201)) {
  //         setApiError(true);
  //     }
  //     if (addApiError.responseMessage && addApiError.responseMessage.includes("Module name") && addApiError.responseMessage.includes("exist")) {
  //         setIsSubmited(false);
  //         setApiError(false);
  //         setError("moduleName", "notMatch", "Module name already exists");
  //     }

  //     if (isModuleAdded) {
  //         handleCloseForm();
  //         dispatch(resetDuplicateError());
  //     }

  // },
  //     [dispatch, addApiError, setError, isModuleAdded, handleCloseForm]
  // );

  const handleSetEnvironment = () => {
    setIsSubmited(true);
    props.onSubmit(watch().domainName);
  };

  return (
    <Dialog
      disableBackdropClick
      disableEscapeKeyDown
      open={props.open}
      onClose={props.handleClose}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle className={styles.dialogTitle}>Set Environment</DialogTitle>
      <form
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit(handleSetEnvironment)}
      >
        <DialogContent dividers="true">
          {/* {apiError ? (
            <Grid item xs={12} className={styles.col}>
              <Card className={styles.errorCard}>
                <Typography variant="body2">{COMMON_ERROR_MESSAGE}</Typography>
              </Card>
            </Grid>
          ) : null} */}
          <Grid container className={styles.row}>
            <Grid item xs={12} className={styles.col}>
              <MaterialTextField
                inputRef={register({
                  required: {
                    value: true,
                    message: DOMAIN_NAME_MANDATORY,
                  },
                  // pattern: {
                  //   value: /^((https?|ftp|smtp):\/\/)?(www.)?[a-z0-9.-:]+\.?:[a-z0-9.-:]+(\/[a-zA-Z0-9#.-?/&]+\/?)*$/,
                  //   message: "Enter valid Domain name",
                  // },
                  //   maxLength: {
                  //     value: 50,
                  //     message: "Maximum 50 characters allowed",
                  //   },
                })}
                defaultValue={props.name}
                error={errors.domainName ? true : false}
                helperText={errors.domainName?.message}
                onChange={handleChange}
                required
                name="domainName"
                label={DOMAIN_NAME}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <MatButton color="primary" onClick={handleCloseForm}>
            Cancel
          </MatButton>
          <MatButton type="submit" disabled={isSubmited || isEmpty}>
            Save
          </MatButton>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default SetDomain;
