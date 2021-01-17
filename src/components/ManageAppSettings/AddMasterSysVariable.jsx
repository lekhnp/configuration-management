import React, { useState, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { makeStyles, FormHelperText } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import Divider from "@material-ui/core/Divider";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import MatButton from "../MaterialUi/MatButton";
import MaterialTextField from "../MaterialUi/MatTextField";
import MatFormControl from "../MaterialUi/MatFormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MatSelect from "../MaterialUi/MatSelect";
import MenuItem from "@material-ui/core/MenuItem";
import InputAdornment from '@material-ui/core/InputAdornment';
//import PropertyMapping from "../ManageMapping/PropertyMapping";
import { AddMSysVariable } from "../../actions/MasterSysVariable";
import { defaultControlProperty } from "../../utils/ConfigConstants";
import DynamicForms from "./DynamicForms";

import {
  MODULE_ASSI_MAND,
  CONTROL_PROPERTY_MANDATORY,
  CODEVERSION_MANDATORY_MSG,
  VALID_CODEVERSION_MSG,
  //TABLE_IS_MANDATORY,
  ADD_SYSTEM_VARIABLE,
  COMMON_ERROR_MESSAGE,
  MAXIMUN_CHARACTER_ALLOWED_MSG,
  SUB_NAME_EXIST,
  SYSVARIABLECODE_MANDATORY,
  SYSVARIABLEDESC_MANDATORY,
  // SYSVARIABLEUNIQUE_MANDATORY,
} from "../../utils/Messages";

const useStyles = makeStyles((theme) => ({
  dialogTitle: {
    fontWeight: 300,
  },
  col: {
    padding: "10px",
  },
  input: {
    color: theme.palette.primary.main
  },
  switchList: {
    padding: "4px",
  },
  switchItem: {
    marginRight: "6px",
  },
  listGutter: {
    paddingTop: "2px",
    paddingBottom: "2px",
    paddingLeft: "6px",
    "&.Mui-disabled": {
      opacity: "0.8",
    },
  },
  cardHeadingSize: {
    fontSize: "18px",
  },
  errorCard: {
    background: theme.palette.error.main,
    boxShadow: "none !important",
    color: "#ffffff",
    padding: "12px 16px",
    marginBottom: '14px'
  },
}));

const AddMasterSysVariable = (props) => {
  const styles = useStyles();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    setError,
    clearError,
    errors,
  } = useForm({ mode: "onBlur" });
  const [isSubmited, setIsSubmited] = useState(false);
  const [tableList, setTableList] = useState([]);
  const [inputs, setInputs] = useState({
    code: "",
    shortDescription: "",
    moduleName: "",
    minCv: "",
    maxCV: "",
    controlProperty: "",
    codeProperty: [],

  });

  const {
    code,
    shortDescription,
    moduleName,
    minCv,
    maxCV,
    controlProperty,
    codeProperty,
  } = inputs;

  const isTableAdded = useSelector(
    (state) => state.MasterSysVariable.isTableAdded
  );
  const [apiError, setApiError] = useState(null);
  const addApiError = useSelector((state) => state.MasterSysVariable.addError);

  const moduleDetailsList = useSelector((state) =>
    state.MasterModule.moduleDetailsList.list.sort((a, b) =>
      a.moduleName > b.moduleName ? 1 : -1
    )
  );

  const tableDetailsList = useSelector((state) =>
    state.MasterTable.tableDetailsList.list.sort((a, b) =>
      a.tableName > b.tableName ? 1 : -1
    )
  );

  //const defaultValueType = ["str_value", "INT_VALUE", "LONG_VALUE", "list_value_id"];

  const handleCloseForm = useCallback(() => {
    setIsSubmited(false);
    clearError();
    props.handleClose();
  }, [props, clearError]);

  let handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((inputs) => ({ ...inputs, [name]: value }));
    setApiError(false);
  };

  useEffect(() => {
    if (moduleName !== "") {
      setValue("moduleName", moduleName);
      clearError("moduleName");
    } else {
      register(
        { name: "moduleName" },
        { required: { value: true, message: MODULE_ASSI_MAND } }
      );
    }
  }, [clearError, moduleName, register, setValue]);

  useEffect(() => {
    if (controlProperty !== "") {
      setValue("controlProperty", controlProperty);
      clearError("controlProperty");
    } else {
      register(
        { name: "controlProperty" },
        { required: { value: true, message: CONTROL_PROPERTY_MANDATORY } }
      );
    }
  }, [clearError, controlProperty, register, setValue]);

  useEffect(() => {
    if (!!addApiError) {
      setIsSubmited(false);
    }

    if (
      addApiError &&
      !(addApiError.responseCode === "201" || addApiError.responseCode === 201)
    ) {
      setApiError(true);
    }
    if (
      addApiError.responseMessage &&
      addApiError.responseMessage.includes("Table name") &&
      addApiError.responseMessage.includes("exist")
    ) {
      setIsSubmited(false);
      setApiError(false);
      setError("tableName", "notMatch", SUB_NAME_EXIST);
    }

    if (isTableAdded) {
      handleCloseForm();
    }
  }, [dispatch, addApiError, setError, isTableAdded, handleCloseForm]);

  const handleCreateTable = () => {
    setIsSubmited(true);
    let payloadJson = {
      id: tableDetailsList.length + 1,
      modules: inputs.moduleName,
      table: inputs.tableName,
      code: inputs.code,
      shortDescription: inputs.shortDescription,
      uniqueColumn: inputs.uniqueColumn,
      createdByUser: "Narendra Bisht",
      createdDate: "2020-10-09T07:16:52.000+0000",
      updatedByUser: null,
      updatedDate: null,
    };
    dispatch(AddMSysVariable(payloadJson));
  };

  return (
    <Dialog
      disableBackdropClick
      disableEscapeKeyDown
      open={props.open}
      onClose={props.handleClose}
      fullWidth
      maxWidth="md"
    >
      <DialogTitle className={styles.dialogTitle}>
        {ADD_SYSTEM_VARIABLE}
      </DialogTitle>
      <form
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit(handleCreateTable)}
      >
        <DialogContent dividers="true">
          {apiError ? (
            <Grid item xs={12} className={styles.col}>
              <Card className={styles.errorCard}>
                <Typography variant="body2">{COMMON_ERROR_MESSAGE}</Typography>
              </Card>
            </Grid>
          ) : null}
          <Typography variant="h6" className={styles.cardHeadingSize}>
            Details
          </Typography>
          <Grid container className={styles.row}>
            <Grid item xs={4} className={styles.col}>
              <MaterialTextField
                inputRef={register({
                  required: {
                    value: true,
                    message: SYSVARIABLECODE_MANDATORY,
                  },
                  maxLength: {
                    value: 200,
                    message: MAXIMUN_CHARACTER_ALLOWED_MSG,
                  },
                })}
                error={errors.code ? true : false}
                helperText={errors.code?.message}
                onChange={handleChange}
                required
                name="code"
                label="System Variable Code"
              />
            </Grid>
            <Grid item xs={8} className={styles.col}>
              <MaterialTextField
                inputRef={register({
                  required: {
                    value: true,
                    message: SYSVARIABLEDESC_MANDATORY,
                  },
                  maxLength: {
                    value: 50,
                    message: MAXIMUN_CHARACTER_ALLOWED_MSG,
                  },
                })}
                InputProps={{
                  endAdornment: (<InputAdornment position="end" className={styles.input}>{shortDescription.length}/50</InputAdornment>)
                }}
                error={errors.shortDescription ? true : false}
                helperText={errors.shortDescription?.message}
                onChange={handleChange}
                required
                name="shortDescription"
                label="Short Description"
              />
            </Grid>
            <Grid item xs={4} className={styles.col}>
              <MaterialTextField
                error={errors.moduleName ? true : false}
                helperText={
                  errors.moduleName ? errors.moduleName.message : " "
                }
                select
                required
                label="Module(s)"
                onChange={handleChange}
                name="moduleName"
              >
                {moduleDetailsList.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.moduleName}
                  </MenuItem>
                ))}
              </MaterialTextField>
            </Grid>
            <Grid item xs={4} className={styles.col}>
              <MaterialTextField
                inputRef={register({
                  required: { value: true, message: CODEVERSION_MANDATORY_MSG },
                  pattern: {
                    value: /^\d{1,2}\.\d{1,2}(?:\.\d{1,2})?$/,
                    message: VALID_CODEVERSION_MSG,
                  },
                })}
                error={errors.minCV ? true : false}
                helperText={errors.minCV?.message}
                onChange={handleChange}
                required
                name="minCV"
                label="Minimum Code Version"
              />
            </Grid>
            <Grid item xs={4} className={styles.col}>
              <MaterialTextField
                inputRef={register({
                  pattern: {
                    value: /^\d{1,2}\.\d{1,2}(?:\.\d{1,2})?$/,
                    message: VALID_CODEVERSION_MSG,
                  },
                })}
                error={errors.maxCV ? true : false}
                helperText={errors.maxCV?.message}
                onChange={handleChange}
                name="maxCV"
                label="Maximum Code Version"
              />
            </Grid>
            <Grid item xs={4} className={styles.col}>
              <MaterialTextField
                error={errors.controlProperty ? true : false}
                helperText={
                  errors.controlProperty ? errors.controlProperty.message : " "
                }
                select
                required
                label="Control Category"
                onChange={handleChange}
                name="controlProperty"
              >
                {defaultControlProperty.map((option, key) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </MaterialTextField>
            </Grid>
            <Grid item xs={12} className={styles.col}>
              <Divider variant="middle" />
            </Grid>
            <Typography variant="h6" className={styles.cardHeadingSize}>
              Configuration Settings
          </Typography>
            <DynamicForms />
          </Grid>
        </DialogContent>
        <DialogActions>
          <MatButton color="primary" onClick={handleCloseForm}>
            Cancel
          </MatButton>
          <MatButton type="submit" disabled={isSubmited}>
            Submit
          </MatButton>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default AddMasterSysVariable;
