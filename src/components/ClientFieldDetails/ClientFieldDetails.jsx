import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

import CardHeader from "@material-ui/core/CardHeader";
import Grid from "@material-ui/core/Grid";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import MenuItem from "@material-ui/core/MenuItem";
import Paper from "@material-ui/core/Paper";
import Chip from "@material-ui/core/Chip";
import Card from "@material-ui/core/Card";

import MatCard from "../MaterialUi/MatCard";
import MatButton from "../MaterialUi/MatButton";
import MaterialTextField from "../MaterialUi/MatTextField";

import { makeStyles } from "@material-ui/core";

import {
  RESET_UPDATE_CLIENT_CONTROL_IS_DONE,
  RESET_CLIENT_CONTROL_RESTORED_IS_DONE,
} from "../../utils/AppConstants";

import { FIELD_RESTORE_OOB_ACTION, UPDATE_CLIENT_FIELD_ACTION } from "../../utils/FeatureConstants";

import { showMessageDialog } from "../../actions/MessageDialogActions";

import {
  updateClientControl,
  restoreOobSingleField,
  fetchClientControlAudit,
  fetchClientControlById,
} from "../../actions/ClientModuleActions";
import { ATTEMPT_TO_SAVE_OUT_OF_BOX_CONF, handleClientFieldDetails, NO_FIELD_AVAILABLE, NO_OPT_AVAILABLE, PLEASE_ACKN, RESTORE_OUT_OF_BOX_CONF, SAVE_DETAILS, VALUE_ALREADY_EXIST } from "../../utils/Messages";

const useStyles = makeStyles((theme) => ({
  cardHeading: {
    paddingTop: "12px",
    paddingBottom: "10px",
  },
  cardHeadingSize: {
    fontSize: "18px",
  },
  row: {
    padding: "10px 0 0",
  },
  col: {
    padding: "5px 8px",
  },
  dialogTitle: {
    fontWeight: 300,
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
  optionBox: {
    padding: "10px 12px",
  },
  chip: {
    margin: theme.spacing(0.5),
  },
  addOption: {
    padding: "10px 12px",
    display: "flex",
    alignItems: "center",
  },
  optionButton: {
    paddingBottom: "15px",
    marginLeft: "10px",
  },
  optionField: {
    width: "300px",
  },
}));

const ClientFieldDetails = (props) => {
  const { clientControlData, isUpdated, fireOnUpdate } = props;
  const { submoduleVersionId, controlId, clientId } = useParams();
  const dispatch = useDispatch();
  const styles = useStyles();
  const clientControlUpdateError = useSelector(
    (state) => state.ClientModule.clientControlById.updateError
  );
  const {
    register,
    handleSubmit,
    watch,
    // setValue,
    setError,
    //clearError,
    errors,
    formState,
    reset,
  } = useForm({ mode: "onBlur" });
  let { dirty } = formState;
  const fieldList = clientControlData.control.format;
  const details = clientControlData.controlData;
  const featuresAssigned = useSelector(
    (state) => state.User.features
  );
  const isControlUpdated = useSelector(
    (state) => state.ClientModule.clientControlById.isControlUpdated
  );
  const isControlRestored = useSelector(
    (state) => state.ClientModule.clientControlById.isControlRestored
  );
  const [isSubmited, setIsSubmited] = useState(false);
  const [apiError, setApiError] = useState(null);
  const [inputs, setInputs] = useState({ ...details });
  const [isSelectionChanged, setSelectionChanged] = useState(false);

  let handleChange = (e) => {
    setApiError(null);
    const { name } = e.target;
    setInputs((inputs) => ({ ...inputs, [name]: watch(name) }));
  };

  const handleSelectChange = (e) => {
    setSelectionChanged(true);
    const { name, value } = e.target;
    setInputs((inputs) => ({ ...inputs, [name]: value }));
  };

  let handleOptionChange = (e) => {
    const { value } = e.target;
    setOptionField(value);
  };

  const handleDelete = (fieldName, optionToDelete) => () => {
    setSelectionChanged(true);
    let fieldOptions = inputs[fieldName].filter(
      (option) =>
        (typeof option === "string" ? option.toLowerCase() : option.label) !==
        (typeof optionToDelete === "string"
          ? optionToDelete.toLowerCase()
          : optionToDelete.label)
    );
    setInputs((inputs) => ({ ...inputs, [fieldName]: fieldOptions }));
  };

  const handleAddOption = (fieldName) => {
    setSelectionChanged(true);
    let fieldOptions = [...inputs[fieldName]];
    let isDuplicate = fieldOptions.some((option) => {
      if (typeof option === "string") {
        return option.toLowerCase().trim() === optionField.toLowerCase().trim();
      } else {
        return (
          option.label.toLowerCase().trim() === optionField.toLowerCase().trim()
        );
      }
    });
    if (isDuplicate) {
      setError("optionField", "notMatch", VALUE_ALREADY_EXIST);
    } else {
      // let newOption = {
      //   key: fieldOptions.length,
      //   label: optionField,
      // };
      fieldOptions.push(optionField);
      setInputs((inputs) => ({ ...inputs, [fieldName]: fieldOptions }));
      setOptionField("");
    }
  };

  const handleUpdateControl = () => {
    fireOnUpdate(true);
    let formData = {
      id: clientControlData.id,
      oobSubmoduleId: +submoduleVersionId,
      masterControlId: clientControlData.control.id,
      controlData: { ...inputs },
    };
    dispatch(updateClientControl(formData));
  };

  const handleCancel = () => {
    fireOnUpdate(false);
    reset(details);
    setInputs(details);
    setSelectionChanged(false);
  };

  const confirmUpdateControl = () => {
    let messageObj = {
      primaryButtonLabel: "Save",
      primaryButtonAction: () => {
        handleUpdateControl();
      },
      secondaryButtonLabel: "Cancel",
      secondaryButtonAction: () => {
        handleCancel();
      },
      title: PLEASE_ACKN,
      message: ATTEMPT_TO_SAVE_OUT_OF_BOX_CONF,
    };
    dispatch(showMessageDialog(messageObj));
  };

  const restoreOobControl = () => {
    let fieldLabel = "";
    fireOnUpdate(true);
    if (clientControlData.control.type === "form") {
      fieldLabel = clientControlData.controlData.label
        ? clientControlData.controlData.label
        : "";
    }
    dispatch(restoreOobSingleField(clientId, clientControlData.id, fieldLabel));
  };

  const confirmApproveControl = () => {
    let messageObj = {
      primaryButtonLabel: "Restore",
      primaryButtonAction: () => {
        restoreOobControl();
      },
      secondaryButtonLabel: "Cancel",
      secondaryButtonAction: () => { },
      title: PLEASE_ACKN,
      message: RESTORE_OUT_OF_BOX_CONF,
    };
    dispatch(showMessageDialog(messageObj));
  };

  const [optionField, setOptionField] = useState("");

  useEffect(() => {
    if (clientControlUpdateError && isUpdated) {
      setIsSubmited(false);
      setApiError(handleClientFieldDetails(clientControlUpdateError));
      fireOnUpdate(false);
    } else {
      setIsSubmited(false);
      setApiError(null);
    }
  }, [clientControlUpdateError, isUpdated, fireOnUpdate]);

  useEffect(() => {
    if (isControlUpdated && isUpdated) {
      dispatch(fetchClientControlById(controlId));
      dispatch(fetchClientControlAudit(controlId));
      dispatch({ type: RESET_UPDATE_CLIENT_CONTROL_IS_DONE });
      fireOnUpdate(false);
    }
  }, [dispatch, isControlUpdated, controlId, isUpdated, fireOnUpdate]);

  useEffect(() => {
    if (isControlRestored && isUpdated) {
      dispatch(fetchClientControlById(controlId));
      dispatch(fetchClientControlAudit(controlId));
      dispatch({ type: RESET_CLIENT_CONTROL_RESTORED_IS_DONE });
      fireOnUpdate(false);
    }
  }, [dispatch, controlId, isControlRestored, isUpdated, fireOnUpdate]);

  return (
    <MatCard>
      <CardHeader
        className={styles.cardHeading}
        title={
          <Typography variant="h6" className={styles.cardHeadingSize}>
            {"Details"}
          </Typography>
        }
      />
      <Divider />
      <CardContent>
        <form
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit(confirmUpdateControl)}
        >
          <Grid container className={styles.row}>
            {apiError && (
              <Grid item xs={12} className={styles.col}>
                <Card className={apiError.messageType === "error" ? styles.errorCard : styles.warningCard}>
                  <Typography variant="body2">{apiError.message}</Typography>
                </Card>
              </Grid>
            )}
            {fieldList && fieldList.length <= 0 && (
              <Grid
                item
                xs={12}
                className={styles.col}
                style={{ textAlign: "center" }}
              >
                <Typography variant="body2">{NO_FIELD_AVAILABLE}</Typography>
              </Grid>
            )}
            <Grid item xs={4} className={styles.col}>
              <MaterialTextField
                helperText=""
                defaultValue={inputs.controlType}
                disabled
                name="fieldType"
                label="Field Type"
                // value={fieldLabel}
                onChange={handleChange}
              />
            </Grid>
            {fieldList &&
              fieldList.length > 0 &&
              fieldList.map((field) => (
                <React.Fragment key={field.internalName}>
                  {field.fieldType === "textbox" && (
                    <Grid item xs={4} className={styles.col}>
                      <MaterialTextField
                        inputRef={register({
                          required: {
                            value: false && field.isFieldRequired === "Yes",
                            message: `${field.fieldLabel} is mandatory.`,
                          },
                        })}
                        error={errors[field.internalName] ? true : false}
                        helperText={
                          errors[field.internalName]
                            ? errors[field.internalName].message
                            : " "
                        }
                        defaultValue={inputs[field.internalName]}
                        required={field.isFieldRequired === "Yes"}
                        disabled={
                          field.valueSetBy === "MHK" ||
                          !(
                            clientControlData.controlData.configMapping &&
                            clientControlData.controlData.configMapping[
                            field.internalName
                            ]
                          ) ||
                          clientControlData.status === "SIGN_OFF" ||
                          clientControlData.status === "APPROVED" ||
                          featuresAssigned.indexOf(UPDATE_CLIENT_FIELD_ACTION) < 0
                        }
                        name={field.internalName}
                        label={field.fieldLabel}
                        // value={fieldLabel}
                        onChange={handleChange}
                      />
                    </Grid>
                  )}

                  {field.fieldType === "select" && (
                    <Grid item xs={4} className={styles.col}>
                      <MaterialTextField
                        inputRef={register({
                          required: {
                            value: field.isFieldRequired === "Yes",
                            message: `${field.fieldLabel} is mandatory.`,
                          },
                        })}
                        defaultValue={inputs[field.internalName]}
                        error={errors[field.internalName] ? true : false}
                        helperText={
                          errors[field.internalName]
                            ? errors[field.internalName].message
                            : " "
                        }
                        required={field.isFieldRequired === "Yes"}
                        select
                        name={field.internalName}
                        label={field.fieldLabel}
                        disabled={
                          field.valueSetBy === "MHK" ||
                          !(
                            clientControlData.controlData.configMapping &&
                            clientControlData.controlData.configMapping[
                            field.internalName
                            ]
                          ) ||
                          clientControlData.status === "SIGN_OFF" ||
                          clientControlData.status === "APPROVED" ||
                          featuresAssigned.indexOf(UPDATE_CLIENT_FIELD_ACTION) < 0
                        }
                        // value={fieldLabel}
                        onChange={handleSelectChange}
                      >
                        {field.options &&
                          field.options.map((option) => (
                            <MenuItem value={option.label}>
                              {option.label}
                            </MenuItem>
                          ))}
                      </MaterialTextField>
                    </Grid>
                  )}

                  {field.fieldType === "textarea" && (
                    <Grid item xs={12} className={styles.col}>
                      <MaterialTextField
                        multiline
                        rows={3}
                        defaultValue={inputs[field.internalName]}
                        disabled={
                          field.valueSetBy === "MHK" ||
                          !(
                            clientControlData.controlData.configMapping &&
                            clientControlData.controlData.configMapping[
                            field.internalName
                            ]
                          ) ||
                          clientControlData.status === "SIGN_OFF" ||
                          clientControlData.status === "APPROVED" ||
                          featuresAssigned.indexOf(UPDATE_CLIENT_FIELD_ACTION) < 0
                        }
                        name={field.internalName}
                        label={field.fieldLabel}
                        inputRef={register({
                          required: {
                            value:
                              field.isFieldRequired === "Yes" &&
                              field.valueSetBy !== "CLIENT",
                            message: `${field.fieldLabel} is mandatory.`,
                          },
                        })}
                        error={errors[field.internalName] ? true : false}
                        helperText={
                          errors[field.internalName]
                            ? errors[field.internalName].message
                            : " "
                        }
                        required={field.isFieldRequired === "Yes"}
                        onChange={handleChange}
                      />
                    </Grid>
                  )}

                  {field.fieldType === "option" && (
                    <Grid
                      item
                      xs={12}
                      className={styles.col}
                      style={{ paddingTop: "0px", paddingBottom: "16px" }}
                    >
                      <Paper variant="outlined">
                        <div className={styles.optionBox}>
                          <Typography
                            variant="subtitle1"
                            style={{ fontWeight: 500 }}
                            gutterBottom
                          >
                            {field.fieldLabel} (
                            {inputs[field.internalName] &&
                              inputs[field.internalName].length}
                            )
                          </Typography>
                          <div>
                            {inputs[field.internalName] &&
                              inputs[field.internalName].length > 0 ? (
                                inputs[field.internalName].map((data) => {
                                  if (typeof data === "string") {
                                    return (
                                      <Chip
                                        label={data}
                                        disabled={
                                          field.valueSetBy === "MHK" ||
                                          !(
                                            clientControlData.controlData
                                              .configMapping &&
                                            clientControlData.controlData
                                              .configMapping[field.internalName]
                                          ) ||
                                          clientControlData.status ===
                                          "SIGN_OFF" ||
                                          clientControlData.status === "APPROVED" ||
                                          featuresAssigned.indexOf(UPDATE_CLIENT_FIELD_ACTION) < 0
                                        }
                                        onDelete={handleDelete(
                                          field.internalName,
                                          data
                                        )}
                                        className={styles.chip}
                                      />
                                    );
                                  } else {
                                    return (
                                      <Chip
                                        label={data.label}
                                        disabled={
                                          field.valueSetBy === "MHK" ||
                                          !(
                                            clientControlData.controlData
                                              .configMapping &&
                                            clientControlData.controlData
                                              .configMapping[field.internalName]
                                          ) ||
                                          clientControlData.status ===
                                          "SIGN_OFF" ||
                                          clientControlData.status === "APPROVED" ||
                                          featuresAssigned.indexOf(UPDATE_CLIENT_FIELD_ACTION) < 0
                                        }
                                        onDelete={handleDelete(
                                          field.internalName,
                                          data
                                        )}
                                        className={styles.chip}
                                      />
                                    );
                                  }
                                })
                              ) : (
                                <Typography variant="body2" gutterBottom>
                                  {NO_OPT_AVAILABLE}
                                </Typography>
                              )}
                          </div>
                        </div>
                        <Divider />
                        <div className={styles.addOption}>
                          <div className={styles.optionField}>
                            <MaterialTextField
                              required
                              name="optionField"
                              disabled={
                                field.valueSetBy === "MHK" ||
                                !(
                                  clientControlData.controlData.configMapping &&
                                  clientControlData.controlData.configMapping[
                                  field.internalName
                                  ]
                                ) ||
                                clientControlData.status === "SIGN_OFF" ||
                                clientControlData.status === "APPROVED" ||
                                featuresAssigned.indexOf(UPDATE_CLIENT_FIELD_ACTION) < 0
                              }
                              label="Enter option name..."
                              value={optionField}
                              error={errors.optionField ? true : false}
                              helperText={
                                errors.optionField
                                  ? errors.optionField.message
                                  : " "
                              }
                              onChange={handleOptionChange}
                            />
                          </div>
                          <div className={styles.optionButton}>
                            <MatButton
                              disabled={!optionField.trim()}
                              type="button"
                              color="primary"
                              onClick={() =>
                                handleAddOption(field.internalName)
                              }
                            >
                              Add
                            </MatButton>
                          </div>
                        </div>
                      </Paper>
                    </Grid>
                  )}
                </React.Fragment>
              ))}
            <Grid item xs={12} className={styles.buttonCol}>
              {clientControlData.oobChangeStatus === "NO" && featuresAssigned.indexOf(FIELD_RESTORE_OOB_ACTION) !== -1 && (
                <MatButton
                  disabled={
                    clientControlData.status === "SIGN_OFF" ||
                    clientControlData.status === "APPROVED"
                  }
                  className={styles.cancelBtn}
                  color="primary"
                  onClick={confirmApproveControl}
                >
                  Restore OOB
                </MatButton>
              )}
              <div className={styles.grow} />

              {featuresAssigned.indexOf(UPDATE_CLIENT_FIELD_ACTION) !== -1 && <MatButton
                type="submit"
                disabled={
                  (isSubmited || !dirty) && !isSelectionChanged && !apiError
                }
              >
                {SAVE_DETAILS}
              </MatButton>}
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </MatCard>
  );
};

export default ClientFieldDetails;
