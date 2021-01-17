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

import MatCard from "../../components/MaterialUi/MatCard";
import MatButton from "../MaterialUi/MatButton";
import MaterialTextField from "../MaterialUi/MatTextField";

import { makeStyles } from "@material-ui/core";

import { RESET_UPDATE_OOB_CONTROL_IS_DONE } from "../../utils/AppConstants";
import { UPDATE_ACTION_OOB_GLOBAL_CONFIG } from "../../utils/FeatureConstants";

import { updateOobControl } from "../../actions/OobControlActions";

import { fetchOOBControlAudit } from "../../actions/OOBFieldTimelineActions";
import {
  handleOobFieldDetailsError,
  CONF_METHOD_MANDATORY,
  CON_IS_MANDATORY,
  isMandatory,
  LIST_CAT_MANDATORY,
  NO_FIELD_AVAILABLE,
  NO_OPT_AVAILABLE,
  TABLE_NAME_IS_MANDATORY,
  VALUE_ALREADY_EXIST,
} from "../../utils/Messages";

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
    boxShadow: 'none !important',
    color: '#ffffff',
    padding: '12px 16px',
    marginBottom: '14px'
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

const OobFieldDetails = (props) => {
  const { OobControlData, isUpdated, fireOnUpdate } = props;
  const { oobSubmoduleId, versionId, oobControlId } = useParams();
  const dispatch = useDispatch();
  const styles = useStyles();
  const OobControlObj = useSelector((state) => state.OobControl.individual);
  const {
    register,
    handleSubmit,
    watch,
    // setValue,
    clearError,
    setError,
    errors,
    formState,
    reset,
  } = useForm({ mode: "onBlur" });
  let { dirty } = formState;
  const featuresAssigned = useSelector((state) => state.User.features);
  const OobModuleData = useSelector(
    (state) => state.OOBModule.OOBModuleById.data
  );
  const fieldList = OobControlData.control.format;
  const details = OobControlData.controlData;
  const isControlUpdated = useSelector(
    (state) => state.OobControl.individual.isControlUpdated
  );
  const [isEditable, setEditable] = useState(false);
  const [isSubmited, setIsSubmited] = useState(false);
  const [apiError, setApiError] = useState(null);
  const [inputs, setInputs] = useState({
    configMethod: "",
    listCategory: "",
    uniqueContext: "",
    uniqueTableName: "",
    ...details,
  });
  const [isSelectionChanged, setSelectionChanged] = useState(false);
  const [isDraft, setDraft] = useState(false);
  const configMethodList = [
    {
      key: "list_category",
      value: "List Category",
    },
    {
      key: "unique_table",
      value: "Unique Table",
    },
  ];

  let handleChange = (e) => {
    setApiError(null);
    const { name } = e.target;
    setInputs((inputs) => ({ ...inputs, [name]: watch(name) }));
  };

  const handleSelectChange = (e) => {
    setSelectionChanged(true);
    setApiError(null);
    const { name, value } = e.target;
    setInputs((inputs) => ({ ...inputs, [name]: value }));
  };

  let handleOptionChange = (e) => {
    const { value } = e.target;
    setApiError(null);
    clearError("optionField");
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
      id: OobControlData.id,
      oobSubmoduleId: oobSubmoduleId,
      masterControlId: OobControlData.control.id,
      controlData: { ...inputs },
    };
    dispatch(updateOobControl(formData));
  };

  const handleCancel = () => {
    fireOnUpdate(false);
    reset(details);
    setInputs(details);
    setOptionField("");
    setEditable(false);
    setSelectionChanged(false);
  };

  const [optionField, setOptionField] = useState("");

  useEffect(() => {
    if (OobControlObj.updateError && isUpdated) {
      setEditable(true);
      setIsSubmited(false);
      setApiError(handleOobFieldDetailsError(OobControlObj.updateError));
    } else {
      setEditable(false);
      setIsSubmited(false);
      setApiError(null);
    }
    if (OobModuleData) {
      let currentversion = OobModuleData.versions.filter(
        (obj) => obj.version === versionId
      );
      setDraft(currentversion[0].oobModuleStatus === "DRAFT" ? true : false);
    }
  }, [OobControlObj, isUpdated, OobModuleData, versionId]);

  useEffect(() => {
    if (isControlUpdated && isUpdated) {
      dispatch(fetchOOBControlAudit(oobControlId));
      dispatch({ type: RESET_UPDATE_OOB_CONTROL_IS_DONE });
    }
  }, [dispatch, isControlUpdated, oobControlId, isUpdated]);

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
          onSubmit={handleSubmit(handleUpdateControl)}
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
                            message: isMandatory(field.fieldLabel),
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
                        disabled={field.valueSetBy === "CLIENT" || !isEditable}
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
                            message: isMandatory(field.fieldLabel),
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
                        disabled={field.valueSetBy === "CLIENT" || !isEditable}
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
                        disabled={field.valueSetBy === "CLIENT" || !isEditable}
                        name={field.internalName}
                        label={field.fieldLabel}
                        inputRef={register({
                          required: {
                            value:
                              field.isFieldRequired === "Yes" &&
                              field.valueSetBy !== "CLIENT",
                            message: isMandatory(field.fieldLabel),
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
                            Link {inputs.controlType} {field.fieldLabel}
                          </Typography>
                          <Grid container>
                            <Grid item xs={4} className={styles.col}>
                              <MaterialTextField
                                inputRef={register({
                                  required: {
                                    value: false,
                                    message: CONF_METHOD_MANDATORY,
                                  },
                                })}
                                helperText={
                                  errors[field.internalName]
                                    ? errors[field.internalName].message
                                    : " "
                                }
                                required={false}
                                defaultValue={inputs["configMethod"]}
                                select
                                name="configMethod"
                                label="Config Method"
                                disabled={
                                  field.valueSetBy === "CLIENT" || !isEditable
                                }
                                onChange={handleSelectChange}
                              >
                                {configMethodList.map((option, index) => (
                                  <MenuItem value={option.key} key={index}>
                                    {option.value}
                                  </MenuItem>
                                ))}
                              </MaterialTextField>
                            </Grid>
                            {inputs["configMethod"] === "list_category" && (
                              <Grid item xs={4} className={styles.col}>
                                <MaterialTextField
                                  inputRef={register({
                                    required: {
                                      value: false,
                                      message: LIST_CAT_MANDATORY,
                                    },
                                  })}
                                  error={errors.listCategory ? true : false}
                                  helperText={
                                    errors.listCategory
                                      ? errors.listCategory.message
                                      : " "
                                  }
                                  defaultValue={inputs["listCategory"]}
                                  required={false}
                                  disabled={
                                    field.valueSetBy === "CLIENT" || !isEditable
                                  }
                                  name="listCategory"
                                  label="List Category"
                                  // value={fieldLabel}
                                  onChange={handleChange}
                                />
                              </Grid>
                            )}
                            {inputs["configMethod"] === "unique_table" && (
                              <>
                                <Grid item xs={4} className={styles.col}>
                                  <MaterialTextField
                                    inputRef={register({
                                      required: {
                                        value: false,
                                        message: CON_IS_MANDATORY,
                                      },
                                    })}
                                    error={errors.uniqueContext ? true : false}
                                    helperText={
                                      errors.uniqueContext
                                        ? errors.uniqueContext.message
                                        : " "
                                    }
                                    defaultValue={inputs["uniqueContext"]}
                                    required={false}
                                    disabled={
                                      field.valueSetBy === "CLIENT" ||
                                      !isEditable
                                    }
                                    name="uniqueContext"
                                    label="Unique"
                                    // value={fieldLabel}
                                    onChange={handleChange}
                                  />
                                </Grid>
                                <Grid item xs={4} className={styles.col}>
                                  <MaterialTextField
                                    inputRef={register({
                                      required: {
                                        value: false,
                                        message: TABLE_NAME_IS_MANDATORY,
                                      },
                                    })}
                                    error={
                                      errors.uniqueTableName ? true : false
                                    }
                                    helperText={
                                      errors.uniqueTableName
                                        ? errors.uniqueTableName.message
                                        : " "
                                    }
                                    defaultValue={inputs["uniqueTableName"]}
                                    required={false}
                                    disabled={
                                      field.valueSetBy === "CLIENT" ||
                                      !isEditable
                                    }
                                    name="uniqueTableName"
                                    label="Table Name"
                                    // value={fieldLabel}
                                    onChange={handleChange}
                                  />
                                </Grid>
                              </>
                            )}
                          </Grid>
                        </div>
                        <Divider />
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
                                        field.valueSetBy === "CLIENT" ||
                                        !isEditable
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
                                        field.valueSetBy === "CLIENT" ||
                                        !isEditable
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
                        {inputs["configMethod"] && (
                          <>
                            <Divider />
                            <div className={styles.addOption}>
                              <div className={styles.optionField}>
                                <MaterialTextField
                                  required
                                  name="optionField"
                                  disabled={
                                    field.valueSetBy === "CLIENT" || !isEditable
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
                          </>
                        )}
                      </Paper>
                    </Grid>
                  )}
                </React.Fragment>
              ))}
            <Grid item xs={12} className={styles.buttonCol}>
              <div className={styles.grow} />
              {!isEditable &&
                isDraft &&
                featuresAssigned.indexOf(UPDATE_ACTION_OOB_GLOBAL_CONFIG) !==
                  -1 && (
                  <MatButton onClick={() => setEditable(true)}>
                    Edit Details
                  </MatButton>
                )}

              {isEditable && (
                <div>
                  <MatButton
                    className={styles.cancelBtn}
                    color="primary"
                    onClick={handleCancel}
                  >
                    Cancel
                  </MatButton>
                  <MatButton
                    type="submit"
                    disabled={
                      (isSubmited || !dirty) && !isSelectionChanged && !apiError
                    }
                  >
                    Save Details
                  </MatButton>
                </div>
              )}
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </MatCard>
  );
};

export default OobFieldDetails;
