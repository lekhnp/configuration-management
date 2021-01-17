import React, { useState, useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import MatFormControl from '../MaterialUi/MatFormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MatSelect from '../MaterialUi/MatSelect';
import { makeStyles, FormHelperText } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Grid from "@material-ui/core/Grid";
import MenuItem from "@material-ui/core/MenuItem";
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import MatButton from "../MaterialUi/MatButton";
import { addOobSubmodule, resetError } from "../../actions/OOBSubmoduleActions";
import { handleManageSubmoduleError, CONTROL_ASSIGNMENT_MANDATORY, CON_ASSIGNMENT_MANDATORY, SUB_ASSIGNMENT_MANDATORY } from "../../utils/Messages";
//import MaterialTextField from "../MaterialUi/MatTextField";

const useStyles = makeStyles((theme) => ({
  dialogTitle: {
    fontWeight: 300,
  },
  col: {
    padding: "10px",
  },
  errorCard: {
    background: theme.palette.error.main,
    boxShadow: 'none !important',
    color: '#ffffff',
    padding: '12px 16px',
    marginBottom: '14px'
  },
  warningCard: {
    background: theme.palette.warning.main,
    boxShadow: 'none !important',
    color: '#ffffff',
    padding: '12px 16px',
    marginBottom: '14px'
  },
}));


const ManageSubmodule = (props) => {
  const styles = useStyles();
  const dispatch = useDispatch();
  const { register, handleSubmit, setValue, clearError, errors, reset } = useForm({ mode: "onBlur" });

  const submodulesList = useSelector((state) => state.MasterSubmodule.submoduleDetailsList.list);
  const submodules = submodulesList.sort((a, b) => (a.name > b.name ? 1 : -1));
  const isSubmoduleAdded = useSelector((state) => state.OOBSubmodule.isSubmoduleAdded);
  const addApiError = useSelector(state => state.OOBSubmodule.addError);
  const [apiError, setApiError] = useState(null);
  //const [errorMsg,setErrorMsg] = useState("");

  const controlList = useSelector((state) => state.Control.data.list && state.Control.data.list.filter(obj => obj.type === 'otherContent'));
  const [isOtherContent, setIsOtherContent] = useState(false);
  const [inputs, setInputs] = useState({
    submoduleId: "",
    controlType: "",
    controlId: "",
  });
  const { submoduleId, controlType, controlId } = inputs;

  const handleCloseForm = useCallback(() => {
    dispatch(resetError());
    setApiError(false);
    clearError();
    props.handleClose();
  }, [props, dispatch, clearError]);



  let handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(resetError());
    setApiError(false);
    if (name === 'controlType' && value === 'otherContent')
      setIsOtherContent(true);
    if (name === 'controlType' && value !== 'otherContent') {
      reset();
      clearError("controlId");
      setIsOtherContent(false);

    }

    setInputs((inputs) => ({ ...inputs, [name]: value }));
  };

  const handleAddOOBSubmodule = () => {
    const submoduleName = submodulesList.filter(obj => obj.id === inputs.submoduleId);
    let formData = {
      "subModuleId": inputs.submoduleId,
      "oobModuleId": props.oobModuleId,
      "metaTag": { "controlType": inputs.controlType }
    }
    if (inputs.controlType === 'otherContent')
      formData.metaTag.controlId = inputs.controlId;

    dispatch(addOobSubmodule(formData, submoduleName[0].name));
  };

  useEffect(() => {
    if (submoduleId !== "") {
      setValue("submoduleId", submoduleId);
      clearError("submoduleId");
    } else {
      register({ name: 'submoduleId' }, { required: { value: true, message: SUB_ASSIGNMENT_MANDATORY } });
    }

    if (controlType !== "") {
      setValue("controlType", controlType);
      clearError("controlType");
    } else {
      register({ name: 'controlType' }, { required: { value: true, message: CONTROL_ASSIGNMENT_MANDATORY } });
    }


    if (controlType === "otherContent" && controlId === "") {
      register({ name: 'controlId' }, { required: { value: true, message: CON_ASSIGNMENT_MANDATORY } });
    }
    if (controlType === "otherContent" && controlId !== "") {
      setValue("controlId", controlId);
      clearError("controlId");
    }

    if (addApiError) {
      setApiError(handleManageSubmoduleError(addApiError));
    }
    else {
      setApiError(false);
    }

    if (isSubmoduleAdded) {
      handleCloseForm();
    }

  }, [register, clearError, setValue, addApiError, submoduleId, controlType, controlId, isSubmoduleAdded, handleCloseForm])

  return (
    <Dialog
      disableBackdropClick
      disableEscapeKeyDown
      open={props.open}
      onClose={props.handleClose}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle className={styles.dialogTitle}>
        {props.heading}
      </DialogTitle>
      <form noValidate autoComplete="off" onSubmit={handleSubmit(handleAddOOBSubmodule)} id="addOOBSubmodule">
        <DialogContent dividers="true">
          {apiError ?
            <Grid item xs={12} className={styles.col}>
              <Card className={apiError.messageType === "error" ? styles.errorCard : styles.warningCard}>
                <Typography variant="body2">{apiError.message}</Typography>
              </Card>
            </Grid>
            : null}
          <Grid container className={styles.row}>
            <Grid item xs={12} className={styles.col}>
              <MatFormControl required error={errors.submoduleId ? true : false}
                variant="filled" size="small">
                <InputLabel>Component</InputLabel>
                <MatSelect
                  value={submoduleId}
                  name="submoduleId"
                  onChange={handleChange}>
                  {submodules.map((option, key) => (
                    <MenuItem key={option.id} value={option.id}>
                      {option.name}
                    </MenuItem>
                  ))}
                </MatSelect>
                <FormHelperText>{errors.submoduleId ? errors.submoduleId.message : " "}</FormHelperText>
              </MatFormControl>
            </Grid>
            <Grid item xs={12} className={styles.col}>
              <MatFormControl required error={errors.controlType ? true : false}
                variant="filled" size="small">
                <InputLabel>Control Type</InputLabel>
                <MatSelect
                  value={controlType}
                  name="controlType"
                  onChange={handleChange}>
                  <MenuItem value="form">Form</MenuItem>
                  <MenuItem value="otherContent">Other Content</MenuItem>
                </MatSelect>
                <FormHelperText>{errors.controlType ? errors.controlType.message : " "}</FormHelperText>
              </MatFormControl>
            </Grid>
            {isOtherContent &&
              <Grid item xs={12} className={styles.col}>
                <MatFormControl required error={errors.controlId ? true : false}
                  variant="filled" size="small">
                  <InputLabel>Control</InputLabel>
                  <MatSelect
                    value={controlId}
                    name="controlId"
                    onChange={handleChange}>
                    {controlList.map((option, key) => (
                      <MenuItem key={option.id} value={option.id}>
                        {option.name}
                      </MenuItem>
                    ))}
                  </MatSelect>
                  <FormHelperText>{errors.controlId ? errors.controlId.message : " "}</FormHelperText>
                </MatFormControl>
              </Grid>
            }
          </Grid>
        </DialogContent>
        <DialogActions>
          <MatButton color="primary" onClick={handleCloseForm}>
            Cancel
        </MatButton>
          <MatButton type="submit">Add Component</MatButton>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default ManageSubmodule;
