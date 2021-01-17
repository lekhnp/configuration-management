import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
//import { useForm } from "react-hook-form";
import { Divider, makeStyles } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
//import Card from "@material-ui/core/Card";
import Chip from "@material-ui/core/Chip";
import Switch from "@material-ui/core/Switch";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardHeader from "@material-ui/core/CardHeader";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MatCard from "../MaterialUi/MatCard";
import MatButton from "../MaterialUi/MatButton";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import { fetchClientById, addClientModules } from "../../actions/ClientActions";
import { showMessageDialog } from "../../actions/MessageDialogActions";
import {
  //COMMON_ERROR_MESSAGE,
  CONFIRM,
  DONE,
  EDIT_MODULE_ASSIGNMENT,
  removeAssociateModule,
} from "../../utils/Messages";
import { RESET_MODULE_ADDED } from "../../utils/AppConstants";
import { UPDATE_CLIENT_PROFILE } from "../../utils/FeatureConstants";

const useStyles = makeStyles((theme) => ({
  card: {
    marginTop: "16px",
  },
  cardHeading: {
    paddingTop: "12px",
    paddingBottom: "10px",
  },
  cardHeadingSize: {
    fontSize: "18px",
  },
  cardSubheadingSize: {
    fontSize: "16px",
    paddingTop: "10px",
  },
  row: {
    padding: "10px 0 0",
  },
  col: {
    padding: "5px 10px",
  },
  grow: {
    flexGrow: 1,
  },
  buttonCol: {
    padding: "10px 10px 0px",
    display: "flex",
  },
  cancelBtn: {
    marginRight: "16px",
  },
  switchList: {
    padding: "0px",
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
}));

const ClientModules = (props) => {
  const styles = useStyles();
  const dispatch = useDispatch();
  //const { handleSubmit } = useForm({ mode: "onBlur" });
  const { modulesList, details, isEditable, setEditable, name } = props;
  const loggedInUserData = useSelector(
    (state) => state.User.loggedInUser.details
  );
  const featuresAssigned = useSelector(
    (state) => state.User.features
  );
  const [checked, setChecked] = useState(
    details.modules && details.modules.map((module) => module.module.id)
  );
  const [selectedVersions] = useState(
    modulesList.reduce((prev, module) => {
      let result = module.versions
        .filter((version) => version.oobModuleStatus === "LABEL")
        .sort((a, b) =>
          new Date(a.createdDate) < new Date(b.createdDate) ? 1 : -1
        )[0];
      prev[module.module.id] = result;
      return prev;
    }, {})
  );
  const [selectedDefaultVersions] = useState(
    details.modules.reduce((prev, module) => {
      prev[module.module.id] = module;
      return prev;
    }, {})
  );
  const isClientModuleAdded = useSelector(
    (state) => state.Client.isClientModuleAdded
  );
  const [versionList, setVersionList] = useState(
    modulesList.reduce((prev, module) => {
      let result = module.versions
        .filter((version) => version.oobModuleStatus === "LABEL")
        .sort((a, b) =>
          new Date(a.createdDate) < new Date(b.createdDate) ? 1 : -1
        );
      if (
        result.length > 1 &&
        selectedDefaultVersions.hasOwnProperty(module.module.id)
      )
        prev[module.module.id] = result.filter(
          (e) =>
            e.version !==
            selectedDefaultVersions[module.module.id].moduleVersion
        );
      else if (
        result.length > 1 &&
        selectedVersions.hasOwnProperty(module.module.id)
      )
        prev[module.module.id] = result.filter(
          (e) => e.version !== selectedVersions[module.module.id].version
        );
      else prev[module.module.id] = {};
      return prev;
    }, {})
  );
  //const [apiError, setApiError] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [chipModuleId, setChipModuleId] = useState({});
  const [isUpdateCalled, setIsUpdateCalled] = useState(false);
  // const [isEditable, setEditable] = useState(false);
  //const [isDirty, setDirty] = useState(false);

  const handleCancel = () => {
    setChecked(props.details.modules.map((module) => module.module.id));
    setEditable(false);
    setIsUpdateCalled(false);
    //setDirty(false);
    //setApiError(false);
  };

  const handleEdit = () => {
    setEditable(true);
    setIsUpdateCalled(false);
    //setApiError(false);
  };

  const handleClick = (e, module) => {
    setChipModuleId({ id: module.module.id, name: module.module.moduleName });
    // let result = module.versions
    //   .filter((version) => version.oobModuleStatus === "LABEL")
    //   .sort((a, b) =>
    //     new Date(a.createdDate) < new Date(b.createdDate) ? 1 : -1
    //   );
    // if (result.length > 1)
    //   setVersionList(
    //     result.filter(
    //       (e) =>
    //         e.version !==
    //         (selectedDefaultVersions[module.module.id]
    //           ? selectedDefaultVersions[module.module.id].moduleVersion
    //           : selectedVersions[module.module.id].version)
    //     )
    //   );
    // else setVersionList([]);
    setAnchorEl(e.currentTarget);
  };

  const handleModuleSelection = (value) => () => {
    //setApiError(false);
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    if (newChecked.indexOf(value) === -1) {
      let newElement = {};
      if (selectedDefaultVersions.hasOwnProperty(value)) {
        newElement["moduleId"] = value;
        newElement["clientId"] = details.id;
        newElement["associate"] = false;
        newElement["oobModuleId"] = selectedDefaultVersions[value].oobModuleId;
        newElement["moduleVersion"] =
          selectedDefaultVersions[value].moduleVersion;
      }
      openConfirmDeleteDialog(
        [newElement],
        selectedDefaultVersions[value].module.moduleName
      );
    } else {
      let newElement = {};
      if (selectedVersions.hasOwnProperty(value)) {
        newElement["moduleId"] = value;
        newElement["clientId"] = details.id;
        newElement["associate"] = true;
        newElement["oobModuleId"] = selectedVersions[value].id;
        newElement["moduleVersion"] = selectedVersions[value].version;
      }
      dispatch(addClientModules([newElement]));
    }
  };

  const handleMenuItemClick = (e, id) => {
    let newElement = {};
    newElement["moduleId"] = chipModuleId.id;
    newElement["clientId"] = details.id;
    newElement["associate"] = true;
    newElement["oobModuleId"] = id.id;
    newElement["moduleVersion"] = id.version;

    openConfirmDeleteDialog(
      [newElement],
      chipModuleId.name,
      selectedDefaultVersions[`${chipModuleId.id}`].moduleVersion
    );

    setAnchorEl(null);
  };

  const handleClose = (e) => {
    setAnchorEl(null);
  };

  const openConfirmDeleteDialog = (e, name, version) => {
    let messageObj = {
      primaryButtonLabel: "Yes",
      primaryButtonAction: () => {
        dispatch(addClientModules(e, "update"));
      },
      secondaryButtonLabel: "No",
      secondaryButtonAction: () => {},
      title: CONFIRM,
      message: removeAssociateModule(name, version, e[0].moduleVersion),
    };
    dispatch(showMessageDialog(messageObj));
  };

  useEffect(() => {
    if (isClientModuleAdded) {
      dispatch(fetchClientById(details.id));
      dispatch({ type: RESET_MODULE_ADDED });
    }
  }, [dispatch, isClientModuleAdded, details]);

  return (
    <MatCard className={styles.card}>
      <CardHeader
        className={styles.cardHeading}
        title={
          <Typography variant="h6" className={styles.cardHeadingSize}>
            {name} Module(s)
          </Typography>
        }
      />
      <Divider />
      <CardContent>
        {/* {apiError && isUpdateCalled ? (
          <Grid item xs={12} className={styles.col}>
            <Card className={apiError.messageType === "error" ? styles.errorCard : styles.warningCard}>
              <Typography variant="body2">{COMMON_ERROR_MESSAGE}</Typography>
            </Card>
          </Grid>
        ) : null} */}
        {/* <form
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit(handleUpdateClientProfileModules)}
        > */}
        <Grid container className={styles.row}>
          {modulesList.map(
            (module) =>
              selectedVersions[module.module.id] && (
                <Grid key={module.module.id} item xs={4} className={styles.col}>
                  <Paper variant="outlined">
                    <List className={styles.switchList}>
                      <ListItem
                        disabled={
                          !isEditable ||
                          (selectedVersions &&
                            !selectedVersions[module.module.id])
                        }
                        className={styles.listGutter}
                        button
                        onClick={handleModuleSelection(module.module.id)}
                      >
                        <ListItemIcon className={styles.switchItem}>
                          <Switch
                            edge="end"
                            checked={
                              checked &&
                              checked.indexOf(module.module.id) !== -1
                            }
                            disableRipple
                          />
                        </ListItemIcon>
                        <ListItemText
                          primary={
                            <Typography
                              variant="subtitle2"
                              style={{ wordBreak: "break-word" }}
                            >
                              {module.module.moduleName}
                            </Typography>
                          }
                        />
                        {selectedVersions[module.module.id] &&
                          checked.indexOf(module.module.id) !== -1 && (
                            <ListItemSecondaryAction>
                              <Chip
                                className={styles.actionButton}
                                aria-controls="customized-menu"
                                aria-haspopup="true"
                                label={
                                  selectedDefaultVersions[module.module.id]
                                    ? selectedDefaultVersions[module.module.id]
                                      .moduleVersion
                                    : selectedVersions[module.module.id].version
                                }
                                onClick={
                                  isEditable &&
                                    versionList[module.module.id].length > 0
                                    ? (e) => handleClick(e, module)
                                    : null
                                }
                                onDelete={
                                  isEditable &&
                                    versionList[module.module.id].length > 0
                                    ? (e) => handleClick(e, module)
                                    : null
                                }
                                //onDelete={isEditable ? (e) => handleClick(e, module) : null}
                                deleteIcon={<ArrowDropDownIcon />}
                              />
                            </ListItemSecondaryAction>
                          )}
                      </ListItem>
                    </List>
                    {anchorEl && (
                      <Menu
                        id="customized-menu"
                        anchorEl={anchorEl}
                        elevation={0}
                        getContentAnchorEl={null}
                        anchorOrigin={{
                          vertical: "bottom",
                          horizontal: "center",
                        }}
                        transformOrigin={{
                          vertical: "top",
                          horizontal: "center",
                        }}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={(e) => handleClose(e)}
                      >
                        {/* <MenuItem>5</MenuItem>
                        <MenuItem>6</MenuItem> */}
                        {versionList[`${chipModuleId.id}`].length > 0 &&
                          versionList[`${chipModuleId.id}`].map(
                            (option, index) => (
                              <MenuItem
                                key={index}
                                onClick={(event) =>
                                  handleMenuItemClick(event, option)
                                }
                              >
                                {option.version}
                              </MenuItem>
                            )
                          )}
                      </Menu>
                    )}
                  </Paper>
                </Grid>
              )
          )}
        </Grid>
        <Grid item xs={12} className={styles.buttonCol}>
          <div className={styles.grow} />
          {!isEditable &&
            loggedInUserData.user_type !== "CLIENT" && featuresAssigned.indexOf(UPDATE_CLIENT_PROFILE) !== -1 &&
            !details.isDeleted && (
              <MatButton onClick={handleEdit}>
                {EDIT_MODULE_ASSIGNMENT}
              </MatButton>
            )}

          {isEditable && (
            <div>
              <MatButton
                className={styles.cancelBtn}
                color="primary"
                onClick={handleCancel}
              >
                {DONE}
              </MatButton>
              {/* <MatButton type="submit" disabled={!isDirty}>
                  Save Module Assignment
                </MatButton> */}
            </div>
          )}
        </Grid>
        {/* </form> */}
      </CardContent>
    </MatCard>
  );
};

export default ClientModules;
