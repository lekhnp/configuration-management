import React, { useState, Fragment } from "react";
import { makeStyles, FormHelperText } from "@material-ui/core";
import { useForm } from "react-hook-form";
import Grid from "@material-ui/core/Grid";
import IconButton from '@material-ui/core/IconButton';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import DeleteIcon from '@material-ui/icons/Delete';
import MatButton from "../MaterialUi/MatButton";
import Typography from "@material-ui/core/Typography";
import MaterialTextField from "../MaterialUi/MatTextField";
// import MatFormControl from "../MaterialUi/MatFormControl";
// import InputLabel from "@material-ui/core/InputLabel";
// import MatSelect from "../MaterialUi/MatSelect";
import InputAdornment from '@material-ui/core/InputAdornment';
import MenuItem from "@material-ui/core/MenuItem";
import Checkbox from '@material-ui/core/Checkbox';
import { defaultFunctionName, defaultValueType } from "../../utils/ConfigConstants";


const useStyles = makeStyles((theme) => ({
    col: {
        padding: "10px",
    },
    input: {
        color: theme.palette.primary.main
    },
    deleteButton:
    {
        marginLeft: '10px',
        backgroundColor: theme.palette.warning.main,
        "&:hover": { backgroundColor: theme.palette.warning.dark, }
    },
    cardHeadingSize: {
        marginTop: '2%',
        fontSize: "18px",
    },

}));

const DynamicForms = (props) => {
    const styles = useStyles();
    const {
        register,
        // handleSubmit,
        // watch,
        // setValue,
        // setError,
        // clearError,
        errors,
    } = useForm({ mode: "onBlur" });
    const [inputFields, setInputFields] = useState([{ label: "", otherLabel: "", inputRows: [{ type: "", value: "", checked: false, delimeter: "" }] }]);
    //const [inputRows, setInputRows] = useState([{ type: "", value: "", delimeter: "" }]);

    const handleAddFields = () => {
        const values = [...inputFields];
        values.push({ label: '', otherLabel: '', inputRows: [{ type: "", value: "", checked: false, delimeter: "" }] });
        setInputFields(values);
    };

    const handleRemoveFields = index => {
        const values = [...inputFields];
        values.splice(index, 1);
        setInputFields(values);
    };

    const handleAddRows = (index) => {
        let newArray = [...inputFields]
        newArray[index] = { ...newArray[index], inputRows: [...newArray[index].inputRows, { type: "", value: "", delimeter: "" }] };
        console.log("newArray", newArray);
        setInputFields(newArray);
    };

    const handleRemoveRows = (index, indexRow) => {
        let newArray = [...inputFields]
        newArray.forEach((item, itemIndex) => item.inputRows.forEach((subItem, indexsubItem) => {
            if (itemIndex === index && indexsubItem === indexRow) {
                return item.inputRows.splice(indexRow, 1);
            }
        }));
        setInputFields(newArray);
    };

    const handleInputChange = (index, event) => {
        const values = [...inputFields];
        if (event.target.name === "label") {
            values[index].label = event.target.value;
        } else {
            values[index].otherLabel = event.target.value;
        }

        setInputFields(values);
    };

    const handleInputRowChange = (index, indexRow, event) => {
        const values = [...inputFields];
        if (event.target.name === "type") {
            values[index].inputRows[indexRow].type = event.target.value;
        } else if (event.target.name === "value") {
            values[index].inputRows[indexRow].value = event.target.value;
        } else if (event.target.name === "checked") {
            values[index].inputRows[indexRow].checked = !values[index].inputRows[indexRow].checked;
        }
        else {
            values[index].inputRows[indexRow].delimeter = event.target.value;
        }

        setInputFields(values);
    };


    return (
        <>
            {inputFields.map((inputField, index) => (
                <Fragment key={`${inputField}~${index}`}>
                    <Grid container className={styles.row}>
                        <Grid item xs={4} className={styles.col}>
                            <MaterialTextField
                                // error={errors.label ? true : false}
                                // helperText={
                                //     errors.label ? errors.label.message : " "
                                // }
                                select
                                required
                                label="Function##Label"
                                onChange={event => handleInputChange(index, event)}
                                name="label"
                            >
                                {defaultFunctionName.map((option, key) => (
                                    <MenuItem key={option} value={option}>
                                        {option}
                                    </MenuItem>
                                ))}
                            </MaterialTextField>
                        </Grid>
                        {inputField.label === 'Other' && <Grid item xs={4} className={styles.col}>
                            <MaterialTextField
                                inputRef={register({
                                    required: {
                                        value: true,
                                        message: 'label is mandatory',
                                    },
                                    maxLength: {
                                        value: 20,
                                        message: 'Maximum 20 Characters allowed',
                                    },
                                })}
                                InputProps={{
                                    endAdornment: (<InputAdornment position="end" className={styles.input}>{inputField.otherLabel.length}/20</InputAdornment>)
                                }}
                                error={errors.otherLabel ? true : false}
                                helperText={errors.otherLabel?.message}
                                onChange={event => handleInputChange(index, event)}
                                required
                                name="otherLabel"
                                label="Function##Label Other"
                            />
                        </Grid>}

                        {inputField.inputRows.map((inputRow, indexRow) => (
                            <Fragment key={`${inputRow}~${indexRow}`}>
                                <Grid container className={styles.row}>
                                    <Grid item xs={2} className={styles.col}>
                                        <MaterialTextField
                                            // error={errors.type ? true : false}
                                            // helperText={
                                            //     errors.type ? errors.type.message : " "
                                            // }
                                            select
                                            required
                                            label="value Type"
                                            onChange={event => handleInputRowChange(index, indexRow, event)}
                                            name="type"
                                        >
                                            {defaultValueType.map((option, key) => (
                                                <MenuItem key={option} value={option}>
                                                    {option}
                                                </MenuItem>
                                            ))}
                                        </MaterialTextField>
                                    </Grid>
                                    <Typography variant="h6" className={styles.cardHeadingSize}>
                                        =
                                    </Typography>
                                    <Grid item xs={4} className={styles.col}>
                                        {inputRow.type !== 'Client Value' ?
                                            <MaterialTextField
                                                // inputRef={register({
                                                //     required: {
                                                //         value: true,
                                                //         message: 'label is mandatory',
                                                //     },
                                                //     maxLength: {
                                                //         value: 20,
                                                //         message: 'Maximum 20 Characters allowed',
                                                //     },
                                                // })}
                                                // error={errors.value ? true : false}
                                                // helperText={errors.value?.message}
                                                onChange={event => handleInputRowChange(index, indexRow, event)}
                                                required
                                                name="value"
                                                label="Value"
                                            />
                                            :
                                            <Checkbox
                                                name="checked"
                                                checked={inputRow.checked}
                                                onChange={event => handleInputRowChange(index, indexRow, event)}
                                            />}
                                    </Grid>
                                    <Grid item xs={2} className={styles.col}>
                                        {inputRow.type === 'STR Value' &&
                                            <MaterialTextField
                                                inputRef={register({
                                                    required: {
                                                        value: true,
                                                        message: 'label is mandatory',
                                                    },
                                                })}
                                                error={errors.delimeter ? true : false}
                                                helperText={errors.delimeter?.message}
                                                onChange={event => handleInputRowChange(index, indexRow, event)}
                                                required
                                                name="delimeter"
                                                label="Delimeter"
                                            />}
                                    </Grid>

                                    <Grid item xs={2} className={styles.col}>
                                        <IconButton color="primary" onClick={() => handleAddRows(index)}>
                                            <AddCircleIcon />
                                        </IconButton>
                                        <IconButton style={{ color: "#ff9800" }} onClick={() => handleRemoveRows(index, indexRow)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </Grid>
                                </Grid>
                            </Fragment>
                        ))}

                        <Grid item xs={6} className={styles.col}>
                            <MatButton color="primary" onClick={() => handleAddFields()}>
                                Add Function
                            </MatButton>
                            <MatButton className={styles.deleteButton} onClick={() => handleRemoveFields(index)}>
                                Delete Function
                            </MatButton>
                        </Grid>
                    </Grid>
                </Fragment>
            ))}
        </>
    );
};

export default DynamicForms;
