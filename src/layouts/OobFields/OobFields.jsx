import React, { useState, useEffect } from "react";
import { useHistory, useParams, useRouteMatch } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";

import Grid from "@material-ui/core/Grid";
//import Paper from '@material-ui/core/Paper';
//import InputBase from '@material-ui/core/InputBase';
//import Fab from '@material-ui/core/Fab';
//import SearchIcon from '@material-ui/icons/Search';
import MatCard from "../../components/MaterialUi/MatCard";
import MatButton from "../../components/MaterialUi/MatButton";
import MatContainer from "../../components/MaterialUi/MatContainer";
import PageHeading from "../../components/PageHeading";
import DataTable from "../../components/DataTable";
import BreadcrumbView from "../../components/BreadcrumbView";
//import SideSubMenu from "../../components/SideSubMenu";
import DeleteIcon from "@material-ui/icons/Delete";
import CommonMenu from "../../components/CommonMenu";
import AddDynamicFields from "../../components/AddDynamicFields";
import Search from "../../components/Search";
// import FieldListTable from "../../components/FieldListTable";

//import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import Card from "@material-ui/core/Card";
import RateReviewIcon from "@material-ui/icons/RateReview";
import VisibilityIcon from "@material-ui/icons/Visibility";
//import FormIcon from "../../assets/images/form-icon.svg";
//import MatInputField from "../../components/MaterialUi/MatInputField";
//import MenuItem from "@material-ui/core/MenuItem";
// import CardHeader from "@material-ui/core/CardHeader";
import Typography from "@material-ui/core/Typography";
// import Divider from "@material-ui/core/Divider";
import CardContent from "@material-ui/core/CardContent";
//import Chip from "@material-ui/core/Chip";
// import CategoriesIcon from "../../assets/images/categories-icon.svg";

import {
  fetchMasterControl,
  //fetchMasterControlById,
} from "../../actions/ControlActions";
import {
  fetchOobControl,
  deleteOOBControl,
} from "../../actions/OobControlActions";
import { fetchOOBSubmodulesById } from "../../actions/OOBSubmoduleActions";
import { fetchOOBModuleById } from "../../actions/OOBModuleActions";
//import { fetchOOBModule } from "../../actions/OOBModuleActions";
import { showMessageDialog } from "../../actions/MessageDialogActions";
import {
  handleOobFieldsError,
  CONFIRM,
  NO_RECORDS_MESSAGE,
  SELECT_STATUS,
  modulesLabel,
  TERM_FIELD,
  SEARCH,
  SEARCH_FIELD_TYPE,
  SELECT_SECTION,
  FIRST_ADD_MASTER,
  FieldTermMessage,
  VIEW_UPDATE_FIELD,
  VIEW_FIELD_DETAIL,
  ADD_NEW_FIELD,
} from "../../utils/Messages";
import { ADD_ACTION_OOB_GLOBAL_CONFIG, DELETE_ACTION_OOB_GLOBAL_CONFIG } from "../../utils/FeatureConstants";
import { SET_DEFAULT_STARTINDEX, RESET_DEFAULTVERSION, RESET_ADD_OOB_CONTROL_IS_DONE, DEFAULT_START_INDEX, DEFAULT_PAGE_SIZE } from "../../utils/AppConstants";
import { UPDATE_ACTION_OOB_GLOBAL_CONFIG } from "../../utils/FeatureConstants";

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
    paddingLeft: "290px",
  },
  searchInput: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    width: 300,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  search: {
    width: "30px",
    height: "30px",
    position: "fixed",
    marginLeft: "18%",
    marginTop: "6px",
  },
  filterDropdown: {
    display: "flex",
    paddingRight: "10px",
    minWidth: "300px",
  },
  subMenuGrid: {
    position: "fixed",
  },
  searchFilter: {
    padding: "8px 8px 0px",
  },
  moreChip: {
    "& .MuiChip-label": {
      paddingLeft: "0px",
    },
  },
  col: {
    paddingRight: "10px",
  },
  noDataCard: {
    minHeight: "200px",
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
  },
  cardHeading: {
    paddingTop: "10px",
    paddingBottom: "10px",
    backgroundColor: theme.palette.primary.light,
  },
  cardHeadingSize: {
    fontSize: "16px",
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
  statusActive: {
    background: "#00c853",
  },
  statusInactive: {
    background: theme.palette.warning.main,
  },
}));

const cols = [
  { id: "section", label: "Section" },
  { id: "label", label: "Field Name" },
  { id: "controlType", label: "Field Type" },
  { id: "hidden", label: "Hidden" },
  { id: "mandatory", label: "Mandatory" },
  { id: "disabled", label: "Disabled" },
  // { id: "fieldOob", label: "OOB" },
  // { id: "fieldStatus", label: "Status" },
];

// const searchFilter = [
//   // { id: "fieldName", label: "Field Name" },
//   //{ id: "fieldType", label: "Field Type" },
//   { id: "section", label: "Section" },
//   // { id: "parentSection", label: "Parent Section" },
//   { id: "status", label: "Status" },
// ];

const OobFields = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const styles = useStyles();
  const {
    moduleId,
    submoduleId,
    versionId,
    oobSubmoduleId,
    oobModuleId,
  } = useParams();
  const { url } = useRouteMatch();

  // const OobModuleData = useSelector(
  //   (state) => state.OOBModule.OOBModuleById.data
  // );

  // const versions =
  //   OobModuleData &&
  //   OobModuleData.versions.filter((obj) => obj.version !== versionId);

  // const versionList =
  //   versions && versions.sort((a, b) => (a.version < b.version ? 1 : -1));
  // const moduleIdError = useSelector((state) => state.OOBSubmodule.OobSubmoduleById.error);
  // const oobModuleIdError = useSelector((state) => state.OOBSubmodule.OobSubmoduleById.error);

  const oobControlIdError = useSelector((state) => state.OobControl.data.error);
  const featuresAssigned = useSelector((state) => state.User.features);
  const oobSubmoduleError = useSelector(
    (state) => state.OOBSubmodule.OobSubmoduleById.error
  );

  const OOBModuleById = useSelector(
    (state) => state.OOBModule.OOBModuleById.data
  );
  const [apiError, setApiError] = useState(null);

  const OobSubmoduleData = useSelector(
    (state) => state.OOBSubmodule.OobSubmoduleById.data
  );
  const submoduleData = OobSubmoduleData.subModule;

  const oobSubmoduleMeta =
    OobSubmoduleData &&
    OobSubmoduleData.metaTag &&
    JSON.parse(OobSubmoduleData.metaTag);

  const isControlDeleted = useSelector(
    (state) => state.OobControl.data.isControlDeleted
  );

  const controlList = useSelector((state) =>
    state.Control.data.list.filter((control) => {
      if (
        oobSubmoduleMeta &&
        oobSubmoduleMeta.controlType === control.type &&
        oobSubmoduleMeta.controlType === "form"
      ) {
        return true;
      } else if (
        oobSubmoduleMeta &&
        oobSubmoduleMeta.controlType === control.type &&
        oobSubmoduleMeta.controlType === "otherContent"
      ) {
        return control.id === oobSubmoduleMeta.controlId;
      }
      return false;
    })
  );
  const totalElements = useSelector(
    (state) => state.OobControl.data.totalElements
  );
  const startIndex = useSelector((state) => state.OobControl.page.startIndex);
  const pageSize = useSelector((state) => state.OobControl.page.pageSize);
  const reset = useSelector((state) => state.OobControl.reset);
  const OobControlData = useSelector((state) =>
    state.OobControl.data.list.map((data, index) => {
      let controlData = {
        id: data.id,
        // fieldOob: (
        //   <div>
        //     {
        //       <Chip
        //         label={index % 4 === 0 ? "No" : "Yes"}
        //         className={
        //           index % 4 === 0 ? styles.statusInactive : styles.statusActive
        //         }
        //         color="primary"
        //       />
        //     }
        //   </div>
        // ),
        // fieldStatus: (
        //   <div>
        //     {
        //       <Chip
        //         label={index % 3 === 0 ? "Awaiting Sign-Off" : "Signed Off"}
        //         className={index % 3 === 0 ? "" : styles.statusActive}
        //         color="primary"
        //       />
        //     }
        //   </div>
        // ),
        ...data.controlData,
      };
      return { ...controlData };
    })
  );

  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const [controlLabel, setControlLabel] = useState(null);
  const [controlId, setControlId] = useState(null);
  const [editable, setEditable] = useState(false);
  const isMenuOpen = Boolean(anchorEl);
  const [label, setLabel] = React.useState("");
  const [searchText, setSearchText] = useState("");
  const [inputs, setInputs] = React.useState({
    searchBy: "",
    search: "",
  });
  const { searchBy, search } = inputs;

  const handlePageChange = (start, size) => {
    //console.log("Label,start,size", label, start, size);
    dispatch(fetchOobControl(oobSubmoduleId, start, size, searchText));
  };

  const handleChange = (e) => {
    setSearchText(e.target.value);
    if (e.target.value === "") {
      dispatch({ type: SET_DEFAULT_STARTINDEX });
      dispatch(fetchOobControl(oobSubmoduleId, DEFAULT_START_INDEX, pageSize));
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  const handleSearch = () => {
    if (searchText !== "") {
      dispatch({ type: SET_DEFAULT_STARTINDEX });
      dispatch(
        fetchOobControl(
          oobSubmoduleId,
          DEFAULT_START_INDEX,
          pageSize,
          searchText
        )
      );
    }
  };

  const handleModuleBackButton = () => {
    if (label === "OOB") {
      history.push(`/admin/oob-config`);
      dispatch({ type: RESET_DEFAULTVERSION });
      //dispatch(fetchOOBModule("oob",DEFAULT_START_INDEX,DEFAULT_PAGE_SIZE));
    } else {
      history.push(`/admin/global-config`);
      dispatch({ type: RESET_DEFAULTVERSION });
      //dispatch(fetchOOBModule("global",DEFAULT_START_INDEX,DEFAULT_PAGE_SIZE));
    }
  };

  const handleSubmoduleBackButton = () => {
    if (label === "OOB") {
      history.push(
        `/admin/oob-config/components/${moduleId}/${oobModuleId}/${versionId}`
      );
    } else {
      history.push(
        `/admin/global-config/components/${moduleId}/${oobModuleId}/${versionId}`
      );
    }
  };

  useEffect(() => {
    if (OOBModuleById && OOBModuleById.versions) {
      let currentversion = OOBModuleById.versions.filter(
        (obj) => obj.version === versionId
      );
      setEditable(currentversion[0].oobModuleStatus === "DRAFT" ? true : false);
    }
  }, [OOBModuleById, versionId]);

  const BreadcrumbData = [
    {
      id: "modules",
      label: modulesLabel(label),
      action: handleModuleBackButton,
    },
    {
      id: "submodules",
      label:
        OOBModuleById &&
        OOBModuleById.module &&
        OOBModuleById.module.moduleName + " (" + versionId + ")",
      action: handleSubmoduleBackButton,
    },
    {
      id: "fields",
      label: submoduleData ? submoduleData.name : "",
    },
  ];

  const tableConfig = {
    tableType: "",
    selectAction: editable,
    paginationOption: "custom",
    menuOptions: featuresAssigned.indexOf(DELETE_ACTION_OOB_GLOBAL_CONFIG) !== -1 && [
      {
        type: "link",
        icon: featuresAssigned.indexOf(UPDATE_ACTION_OOB_GLOBAL_CONFIG) !== -1 ? <RateReviewIcon fontSize="small" /> : <VisibilityIcon fontSize="small" />,
        label: featuresAssigned.indexOf(UPDATE_ACTION_OOB_GLOBAL_CONFIG) !== -1 ? VIEW_UPDATE_FIELD : VIEW_FIELD_DETAIL,
        action: (data) => {
          if (label === "Global") {
            history.push(
              `/admin/global-config/field-details/${moduleId}/${oobModuleId}/${versionId}/${submoduleId}/${oobSubmoduleId}/${data.id}`
            );
          } else {
            history.push(
              `/admin/oob-config/field-details/${moduleId}/${oobModuleId}/${versionId}/${submoduleId}/${oobSubmoduleId}/${data.id}`
            );
          }
        },
      },
      {
        type: "link",
        icon: <DeleteIcon fontSize="small" />,
        label: TERM_FIELD,
        display: "Hide",
        action: (e) => {
          openConfirmDeleteDialog(e);
        },
      },
    ],
    actions:
    {
      icon: (featuresAssigned.indexOf(UPDATE_ACTION_OOB_GLOBAL_CONFIG) !== -1 && editable) ? <RateReviewIcon color="primary" fontSize="small" /> : <VisibilityIcon color="primary" fontSize="small" />,
      tooltipText: (featuresAssigned.indexOf(UPDATE_ACTION_OOB_GLOBAL_CONFIG) !== -1 && editable) ? VIEW_UPDATE_FIELD : VIEW_FIELD_DETAIL,
      action: (data) => {
        if (label === "Global") {
          history.push(
            `/admin/global-config/field-details/${moduleId}/${oobModuleId}/${versionId}/${submoduleId}/${oobSubmoduleId}/${data.id}`
          );
        } else {
          history.push(
            `/admin/oob-config/field-details/${moduleId}/${oobModuleId}/${versionId}/${submoduleId}/${oobSubmoduleId}/${data.id}`
          );
        }
      },
    }
  };

  const openConfirmDeleteDialog = (e) => {
    let columns = getTableCol();
    let messageObj = {
      primaryButtonLabel: "Yes",
      primaryButtonAction: () => {
        dispatch(deleteOOBControl(e.id, e.label?e.label:e[columns[0].id]));
      },
      secondaryButtonLabel: "No",
      secondaryButtonAction: () => { },
      title: CONFIRM,
      message: FieldTermMessage(e.label?e.label:e[columns[0].id]),
    };
    dispatch(showMessageDialog(messageObj));
  };

  const statusList = [
    { id: "ACTIVE", value: "ACTIVE" },
    { id: "INACTIVE", value: "INACTIVE" },
    { id: "TERMINATED", value: "TERMINATED" },
  ];
  const searchFieldLabel = {
    "": SEARCH,
    // fieldName: "Search by field name...",
    fieldType: SEARCH_FIELD_TYPE,
    section: SELECT_SECTION,
    // parentSection: "Select Parent Section",
    status: SELECT_STATUS,
  };

  const getTableCol = () => {
    if (oobSubmoduleMeta && oobSubmoduleMeta.controlType === "form") {
      return cols;
    } else {
      let controlCols = controlList[0] && controlList[0].format;
      let columns = [];
      controlCols &&
        controlCols.forEach((col, index) => {
          if (col.valueSetBy !== "CLIENT" && index < 4) {
            columns.push({
              id: col.internalName,
              label: col.fieldLabel,
            });
          }
        });
      return columns;
    }
  };

  const handleNewControl = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseControl = () => {
    setAnchorEl(null);
  };

  const openDynamicFormDialog = (label, id) => {
    dispatch({ type: RESET_ADD_OOB_CONTROL_IS_DONE });
    setControlLabel(label);
    setControlId(id);
    setOpen(true);
  };

  const closeDynamicFormDialog = () => {
    setOpen(false);
  };

  // let handleSearch = (e) => {
  //   const { name, value } = e.target;
  //   if (name === "searchBy" && value === "fieldName") {
  //     setInputs((inputs) => ({ ...inputs, search: "" }));
  //   }
  //   if (name === "searchBy" && value !== "fieldName") {
  //     setInputs((inputs) => ({ ...inputs, search: "All" }));
  //   }
  //   if (name === "search" && !searchBy) {
  //     setInputs((inputs) => ({ ...inputs, searchBy: "fieldName" }));
  //   }
  //   setInputs((inputs) => ({ ...inputs, [name]: value }));
  // };

  const controlMenuOptions =
    controlList.length > 0
      ? controlList.sort((a, b) => (a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1)).map((control) => {
        return {
          type: "link",
          icon: "",
          label: control.name,
          action: () => {
            openDynamicFormDialog(control.name, control.id);
          },
        };
      })
      : [
        {
          type: "label",
          icon: "",
          label: FIRST_ADD_MASTER,
        },
      ];

  // const handleBackButton = () => {
  //   history.goBack();
  // history.push(`/admin/oob-config/submodules`);
  //};

  // const handleSubMenuClick = (linkType) => {
  //   if (linkType === "Fields") {
  //     history.push(`/admin/oob-config/fields`);
  //   } else if (linkType === "Sections") {
  //     history.push(`/admin/oob-config/sections`);
  //   } else if (linkType === "Controls") {
  //     history.push(`/admin/oob-config/controls`);
  //   }
  // };

  // const subMenuOptions = [
  //   {
  //     type: "linkToBack",
  //     label: `Back to ${
  //       OobModuleData.module && OobModuleData.module.moduleName
  //       } Module`,
  //     action: handleBackButton,
  //     isExpandable: false,
  //     children: [],
  //   },
  //   {
  //     type: "menu",
  //     label: `${
  //       OobModuleData.module && OobModuleData.module.moduleName
  //       } (Current Version: ${versionId})`,
  //     action: () => { },
  //     isExpandable: false,
  //     children: [],
  //   },
  //   {
  //     type: "menu",
  //     label: `${submoduleData && submoduleData.name} - Submodule`,
  //     action: () => { },
  //     isExpandable: false,
  //     children: [
  //       {
  //         type: "linkWithAvatar",
  //         icon: FormIcon,
  //         label:
  //           oobSubmoduleMeta && oobSubmoduleMeta.controlType === "otherContent"
  //             ? controlList[0] && controlList[0].name + "s"
  //             : "Fields",
  //         subText: "",
  //         action: () => {
  //           // handleSubMenuClick("Fields");
  //         },
  //       },
  //     ],
  //   },
  // versionList.length > 0 && {
  //   type: "menu",
  //   icon: "",
  //   label: "Switch to Other Version(s)",
  //   subText: "",
  //   action: () => {},
  //   isExpandable: true,
  //   children: versionList.map((otherVersion) => ({
  //     type: "linkWithIcon",
  //     icon: <ArrowRightIcon />,
  //     label: otherVersion.version,
  //     subText: "",
  //     action: () => {
  //       if (label === "Global") {
  //         history.push(
  //           `/admin/global-config/fields/${moduleId}/${otherVersion.id}/${otherVersion.version}/${submoduleId}/${oobSubmoduleId}`
  //         );
  //       } else {
  //         history.push(
  //           `/admin/oob-config/fields/${moduleId}/${otherVersion.id}/${otherVersion.version}/${submoduleId}/${oobSubmoduleId}`
  //         );
  //       }
  //     },
  //   })),
  // },
  //];

  useEffect(() => {
    if (url.includes("/admin/global-config")) {
      setLabel("Global");
    } else {
      setLabel("OOB");
    }
    dispatch(fetchMasterControl());
    dispatch(
      fetchOobControl(oobSubmoduleId, DEFAULT_START_INDEX, DEFAULT_PAGE_SIZE)
    );
    dispatch(fetchOOBSubmodulesById(submoduleId, oobModuleId));
    dispatch(fetchOOBModuleById(moduleId));
  }, [dispatch, url, moduleId, oobModuleId, submoduleId, oobSubmoduleId]);

  useEffect(() => {
    if (isControlDeleted) {
      dispatch(fetchMasterControl());
      if (startIndex + 1 === totalElements && startIndex !== DEFAULT_START_INDEX)
        dispatch(fetchOobControl(oobSubmoduleId, startIndex - pageSize, pageSize, searchText));
      else
        dispatch(fetchOobControl(oobSubmoduleId, startIndex, pageSize, searchText));
      dispatch(fetchOOBSubmodulesById(submoduleId, oobModuleId));
      dispatch(fetchOOBModuleById(moduleId));
    }
  }, [
    dispatch,
    url,
    totalElements,
    startIndex,
    pageSize,
    searchText,
    submoduleId,
    moduleId,
    oobModuleId,
    oobSubmoduleId,
    isControlDeleted,
  ]);

  useEffect(() => {
    if (oobControlIdError || oobSubmoduleError)
      setApiError(handleOobFieldsError(oobControlIdError, oobSubmoduleError));
    else
      setApiError(false);
  },
    [oobControlIdError, oobSubmoduleError]
  );

  return (
    <MatContainer>
      {apiError ? (
        <Grid item xs={12} className={styles.error}>
          <Card className={apiError.messageType === "error" ? styles.errorCard : styles.warningCard}>
            <Typography variant="body2">{apiError.message}</Typography>
          </Card>
        </Grid>
      ) : (
          <>
            <BreadcrumbView options={BreadcrumbData}></BreadcrumbView>
            <PageHeading
              heading={submoduleData && submoduleData.name}
              action={
                <Grid container style={{ width: "auto" }}>
                  <Search searchText={searchText} handleChange={handleChange} handleKeyPress={handleKeyPress} handleSearch={handleSearch} />
                  <Grid item style={{ display: "flex", alignItems: "center" }}>
                    {editable &&
                      oobSubmoduleMeta &&
                      oobSubmoduleMeta.controlType === "form" &&
                      featuresAssigned.indexOf(ADD_ACTION_OOB_GLOBAL_CONFIG) !== -1 && (
                        <MatButton onClick={handleNewControl}>
                          {ADD_NEW_FIELD}
                        </MatButton>
                      )}
                    {editable &&
                      oobSubmoduleMeta &&
                      oobSubmoduleMeta.controlType === "otherContent" && (
                        <MatButton
                          onClick={() =>
                            openDynamicFormDialog(
                              controlList[0].name,
                              controlList[0].id
                            )
                          }
                        >
                          Add New {controlList[0] && controlList[0].name}
                        </MatButton>
                      )}
                  </Grid>
                </Grid>
              }
            />
            {OobControlData.length > 0 ? (
              <MatCard>
                <DataTable
                  cols={getTableCol()}
                  rows={OobControlData}
                  config={tableConfig}
                  resetPagination={reset}
                  totalElements={totalElements}
                  startIndex={startIndex}
                  handleNextPage={handlePageChange}
                />
              </MatCard>
            ) : (
                <MatCard>
                  <CardContent className={styles.noDataCard}>
                    <Typography variant="h5">{NO_RECORDS_MESSAGE}</Typography>
                  </CardContent>
                </MatCard>
              )}

            {open && (
              <AddDynamicFields
                controlLabel={controlLabel}
                controlId={controlId}
                handleClose={closeDynamicFormDialog}
                open={open}
                resetSearchText={() => setSearchText("")}
              />
            )}
            <CommonMenu
              anchorEl={anchorEl}
              open={isMenuOpen}
              activeRow={null}
              onClose={handleCloseControl}
              options={controlMenuOptions}
            />
          </>
        )}
    </MatContainer>
  );
};

export default OobFields;
