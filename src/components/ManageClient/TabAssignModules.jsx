import React, {  useState,useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useForm } from "react-hook-form";
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import { makeStyles } from '@material-ui/core';
import AssignGlobalModuleList from './AssignGlobalModuleList';
import AssignModuleList from './AssignModuleList';
import { handleTabAssignModulesError } from '../../utils/Messages';

const useStyles = makeStyles((theme) => ({
    col: {
        padding: '10px'
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
        marginBottom: '14px'
    },
    cardHeadingSize: {
        fontSize: "18px",
    },
    cardHeadingSizeOOB: {
        fontSize: "18px",
        marginTop: "10px"
    },

    // dialogTitle: {
    //     fontWeight: 300
    // },
    // avatar: {
    //     backgroundColor: theme.palette.primary.main,
    // },
    // userCount: {
    //     backgroundColor: theme.palette.primary.main,
    //     marginTop: '8px'
    // },

    // topSection: {
    //     display: 'flex',
    //     marginBottom: '10px'
    // },
    // grow: {
    //     flexGrow: 1
    // },
    // moduleCard: {
    //     background: theme.palette.primary.light,
    //     cursor: 'pointer'
    // },
    // cardTitle: {
    //     fontWeight: 500,
    //     color: theme.palette.primary.dark
    // },
    // cardCaption: {
    //     color: '#84858a'
    // },
    // actionButton: {
    //     backgroundColor: theme.palette.grey[100],
    //     height: theme.spacing(3),
    //     color: theme.palette.grey[800],
    //     fontWeight: theme.typography.fontWeightRegular,
    // },

}));

function TabAssignModules(props) {
    const styles = useStyles();
    const { handleDisabled, handleNext } = props;
    const { handleSubmit } = useForm();
    const OOBModuleDetailsList = useSelector(state => state.OOBModule.OOBModuleDetailsList.data);
    const GlobalModuleDetailsList = useSelector(state => state.OOBModule.GlobalModuleDetailsList.data);
    const addApiError = useSelector(state => state.Client.addModuleError);
    const requestParamGlobal = useSelector(state => state.Client.addSelectedGlobalModule);
    const requestParamOOB = useSelector(state => state.Client.addSelectedOOBModule);
    const [apiError, setApiError] = useState(null);
    //const [requestParam, setRequestParam] = useState([]);


    //const [hover, setHover] = useState();

    // useEffect(() => {
    //     let result = clientInfo.modules && clientInfo.modules.map(item => item.id);
    //     setChecked(result);
    // }, [clientInfo]
    // )
    // const handleChange = (newValue) => {
    //     setRequestParam([...requestParam, newValue]);
    // }

    const assignModules = () => {
        handleNext([...requestParamOOB, ...requestParamGlobal]);
    }
    // const handleCheck = (e, id) => {
    //     if (checked.includes(id)) {
    //         let filteredArray = checked.filter(item => item !== id)
    //         setChecked(checked => [...filteredArray]);
    //     }
    //     else {
    //         setChecked(checked => [...checked, id])
    //     }
    // };

    // const showHideCheck = (id) => {
    //     setHover(id);
    // };

    useEffect(() => {
        if (requestParamOOB.length > 0 || requestParamGlobal.length > 0)
            handleDisabled(false);
        else
            handleDisabled(true);
    }, [requestParamOOB,requestParamGlobal,handleDisabled]);

    useEffect(() => {
        if (addApiError)
            setApiError(handleTabAssignModulesError(addApiError));
        else
            setApiError(false);
    }, [addApiError]);


    return (
        <form noValidate autoComplete="off" onSubmit={handleSubmit(assignModules)} id="addClientModule">
            {apiError ? (
                <Grid item xs={12} className={styles.col}>
                    <Card className={apiError.messageType === "error" ? styles.errorCard : styles.warningCard}>
                        <Typography variant="body2">
                            {apiError.message}
                        </Typography>
                    </Card>
                </Grid>
            ) : null}
            <Typography variant="h6" className={styles.cardHeadingSize}>
                Global Modules
                </Typography>
            <Grid container className={styles.row}>
                <AssignGlobalModuleList ModuleDetailsList={GlobalModuleDetailsList}
                />
            </Grid>
            <Typography variant="h6" className={styles.cardHeadingSizeOOB}>
                OOB Modules
                </Typography>
            <Grid container className={styles.row}>
                <AssignModuleList ModuleDetailsList={OOBModuleDetailsList}
                />
            </Grid>
            {/* <Grid container onMouseOut={() => showHideCheck(false)}>
                {
                    ModuleDetailsList.map((prop, key) => (
                        <Grid item xs={4} key={key}>
                            <MatCard className={styles.moduleCard} onClick={(e) => handleCheck(e, prop.id)} >
                                <CardHeader
                                    avatar={
                                        <Avatar aria-label="recipe" className={styles.avatar}>
                                            {
                                                (checked.includes(prop.id) || hover === prop.id) ? (
                                                    <CheckIcon />
                                                ) : (
                                                        <img src={ModuleIcon} alt="Module Icon" onMouseOver={() => showHideCheck(prop.id)} />
                                                    )
                                            }

                                        </Avatar>
                                    }
                                    title={
                                        <Typography className={styles.cardTitle} variant="subtitle1">
                                            {prop.moduleName}
                                        </Typography>
                                    }
                                />
                            </MatCard>
                        </Grid>
                    ))
                }
            </Grid> */}
        </form>
    );
}

export default TabAssignModules;

