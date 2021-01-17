import React, { useState, useEffect } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core";
//import Fab from '@material-ui/core/Fab';
import Card from "@material-ui/core/Card";
//import Paper from '@material-ui/core/Paper';
import Typography from "@material-ui/core/Typography";
//import InputBase from '@material-ui/core/InputBase';
import { CardContent } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";

import MatCard from "../../components/MaterialUi/MatCard";
import MatButton from "../../components/MaterialUi/MatButton";
import MatContainer from "../../components/MaterialUi/MatContainer";
import PageHeading from "../../components/PageHeading";
import DataTable from "../../components/DataTable";
import ManageModule from "../../components/ManageModule";

//import RateReviewIcon from "@material-ui/icons/RateReview";
import DeleteIcon from "@material-ui/icons/Delete";
//import SearchIcon from '@material-ui/icons/Search';
import VisibilityIcon from "@material-ui/icons/Visibility";
import ListAltIcon from "@material-ui/icons/ListAlt";
import ModuleIcon from "../../assets/images/module-icon.svg";
//import MatInputField from "../../components/MaterialUi/MatInputField";
import Search from "../../components/Search";
import { showMessageDialog } from "../../actions/MessageDialogActions";
import {
  fetchOOBModule,
  deleteOOBModule,
} from "../../actions/OOBModuleActions";
import {
  NO_RECORDS_MESSAGE,
  MODULE_NAME,
  CUR_VERSION,
  submoduleCount,
  SubmoduleLabel,
  addNewModule,
  moduleWarningMessage,
  handleModulesError,
  termModuleMessage,
  moduleLabel,
  CONFIRM,
  VER_HISTORY,
  WARNING,
} from "../../utils/Messages";
import { SET_DEFAULT_STARTINDEX, RESET_DEFAULTVERSION, DEFAULT_PAGE_SIZE, DEFAULT_START_INDEX } from "../../utils/AppConstants";
import { ADD_ACTION_OOB_GLOBAL_CONFIG, DELETE_ACTION_OOB_GLOBAL_CONFIG } from "../../utils/FeatureConstants";

const useStyles = makeStyles((theme) => ({
  moreChip: {
    "& .MuiChip-label": {
      paddingLeft: "0px",
    },
  },
  col: {
    paddingRight: "10px",
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
    width: "37px",
    height: "30px",
    position: "absolute",
    right: "15px",
    marginTop: "6px",
  },
  filterDropdown: {
    display: "flex",
    position: "relative",
    paddingRight: "10px",
    minWidth: "300px",
  },
  noDataCard: {
    minHeight: "200px",
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
  },
  disableClick: {
    pointerEvents: "none",
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
}));

const Modules = () => {
  const [open, setOpen] = React.useState(false);
  const history = useHistory();
  const styles = useStyles();
  const dispatch = useDispatch();
  const { url } = useRouteMatch();
  const [label, setLabel] = useState();
  const [searchText, setSearchText] = useState("");
  const featuresAssigned = useSelector(
    (state) => state.User.features
  );
  const getApiError = useSelector((state) => state.OOBModule.getError);
  const [apiError, setApiError] = useState(null);
  const isModuleDeleted = useSelector(
    (state) => state.OOBModule.isModuleDeleted
  );
  const totalElements = useSelector(
    (state) => state.OOBModule.OOBModuleDetailsList.totalElements
  );
  const startIndex = useSelector((state) => state.OOBModule.page.startIndex);
  const pageSize = useSelector((state) => state.OOBModule.page.pageSize);
  const reset = useSelector((state) => state.OOBModule.reset);
  const OOBModuleList = useSelector((state) =>
    state.OOBModule.OOBModuleDetailsList.data.map((data) => {
      data.versions.sort((a, b) =>
        new Date(a.createdDate) < new Date(b.createdDate) ? 1 : -1
      );
      let OOBModuleData = {
        id: data.module.id,
        moduleName: data.module.moduleName,
        currentVersion: data.versions.length > 0 && data.versions[0].version,
        oobModuleId: data.versions.length > 0 && data.versions[0].id,
        submoduleCount: data.subModuleCount,
        oobModuleStatus:
          data.versions.length > 0 && data.versions[0].oobModuleStatus,
        // submoduleCount: data.versions[len - 1].oobSubModule.length,
      };
      return { ...OOBModuleData };
    })
  );
  // const styles = useStyles();

  const cols = [
    { id: "moduleName", label: MODULE_NAME },
    { id: "currentVersion", label: CUR_VERSION },
    { id: "submoduleCount", label: submoduleCount(label) },
  ];

  const tableConfig = {
    tableType: "tableWithIcon",
    paginationOption: "custom",
    iconType: "imgIcon",
    iconSource: ModuleIcon,
    menuOptions: featuresAssigned.indexOf(DELETE_ACTION_OOB_GLOBAL_CONFIG) !== -1 ? [
      {
        type: "link",
        icon: <VisibilityIcon fontSize="small" />,
        label: SubmoduleLabel(label),
        action: (data) => {
          history.push(
            `${url}/components/${data.id}/${data.oobModuleId}/${data.currentVersion}`
          );
        },
      },
      {
        type: "link",
        icon: <DeleteIcon fontSize="small" />,
        label: moduleLabel(label),
        action: (e) => {
          if (e.oobModuleStatus && e.oobModuleStatus === "LABEL") {
            openDeleteWarningDialog(e);
          }
          if (e.oobModuleStatus && e.oobModuleStatus === "DRAFT") {
            openConfirmDeleteDialog(e);
          }
        },
      },
      {
        type: "link",
        icon: <ListAltIcon fontSize="small" />,
        label: VER_HISTORY,
        action: (data) => {
          history.push(
            `${url}/version-history/${data.id}/${data.oobModuleId}/${data.currentVersion}`
          );
        }
      }]
      :
      [{
        type: "link",
        icon: <VisibilityIcon fontSize="small" />,
        label: "View " + label + " Component",
        action: (data) => {
          history.push(
            `${url}/components/${data.id}/${data.oobModuleId}/${data.currentVersion}`
          );
        },
      },
      {
        type: "link",
        icon: <ListAltIcon fontSize="small" />,
        label: "Version History",
        action: (data) => {
          history.push(
            `${url}/version-history/${data.id}/${data.oobModuleId}/${data.currentVersion}`
          );
        }
      }]
    // {
    //   type: "link",
    //   icon: <DeleteIcon fontSize="small" />,
    //   label: "Delete Module",
    //   action: () => {},
    // },
    // { type: "label", icon: "", label: "Previous Versions", action: () => { } },
    // { type: "link", icon: "", label: "v1.2.6", action: () => { } },
    // { type: "link", icon: "", label: "v1.2.5", action: () => { } },
    // { type: "link", icon: "", label: "v1.2.4", action: () => { } },

  };

  const openManageModuleDialog = () => {
    dispatch({ type: RESET_DEFAULTVERSION });
    setOpen(true);
  };

  const closeManageModuleDialog = () => {
    dispatch({ type: RESET_DEFAULTVERSION });
    setOpen(false);
  };

  const handleChange = (e) => {
    setSearchText(e.target.value);
    if (e.target.value === "") {
      dispatch({ type: SET_DEFAULT_STARTINDEX });
      dispatch(
        fetchOOBModule(
          label.toLowerCase(),
          DEFAULT_START_INDEX,
          DEFAULT_PAGE_SIZE
        )
      );
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  const handleSearch = () => {
    if (searchText !== "") {
      dispatch({ type: SET_DEFAULT_STARTINDEX });
      dispatch(
        fetchOOBModule(
          label.toLowerCase(),
          DEFAULT_START_INDEX,
          DEFAULT_PAGE_SIZE,
          searchText
        )
      );
    }
  };

  const handlePageChange = (start, size) => {
    dispatch(fetchOOBModule(label.toLowerCase(), start, size, searchText));
  };

  const openDeleteWarningDialog = (e) => {
    let messageObj = {
      primaryButtonLabel: "OK",
      primaryButtonAction: () => {},
      secondaryButtonLabel: "",
      secondaryButtonAction: () => {},
      title: WARNING,
      message: moduleWarningMessage(e.moduleName, e.currentVersion),
    };
    dispatch(showMessageDialog(messageObj));
  };

  const openConfirmDeleteDialog = (e) => {
    let messageObj = {
      primaryButtonLabel: "Yes",
      primaryButtonAction: () => {
        dispatch(
          deleteOOBModule(e.oobModuleId, e.moduleName, e.currentVersion)
        );
      },
      secondaryButtonLabel: "No",
      secondaryButtonAction: () => {},
      title: CONFIRM,
      message: termModuleMessage(e.moduleName),
    };
    dispatch(showMessageDialog(messageObj));
  };

  useEffect(() => {
    if (url === "/admin/global-config") {
      setLabel("Global");
      dispatch(
        fetchOOBModule("global", DEFAULT_START_INDEX, DEFAULT_PAGE_SIZE)
      );
    } else {
      setLabel("OOB");
      dispatch(fetchOOBModule("oob", DEFAULT_START_INDEX, DEFAULT_PAGE_SIZE));
    }
  }, [dispatch, url]);

  useEffect(() => {
    dispatch({ type: RESET_DEFAULTVERSION });
  }, [dispatch]);

  useEffect(() => {
    if (isModuleDeleted && label === "Global")
      if (
        startIndex + 1 === totalElements &&
        startIndex !== DEFAULT_START_INDEX
      )
        dispatch(
          fetchOOBModule("global", startIndex - pageSize, pageSize, searchText)
        );
      else dispatch(fetchOOBModule("global", startIndex, pageSize, searchText));
    if (isModuleDeleted && label === "OOB")
      if (
        startIndex + 1 === totalElements &&
        startIndex !== DEFAULT_START_INDEX
      )
        dispatch(
          fetchOOBModule("oob", startIndex - pageSize, pageSize, searchText)
        );
      else dispatch(fetchOOBModule("oob", startIndex, pageSize, searchText));
  }, [
    dispatch,
    isModuleDeleted,
    label,
    pageSize,
    searchText,
    startIndex,
    totalElements,
  ]);

  useEffect(() => {
    if(getApiError)
      setApiError(handleModulesError(getApiError));
    else
      setApiError(false);
  },
    [getApiError]
  );

  return (
    <MatContainer>
      {/* <MatCard className={styles.globalConfigCard}>
                <DataTable 
                    cols={globalConfigCols} 
                    rows={globalConfigRows} 
                    config={globalConfig}
                 />
            </MatCard> */}
      <PageHeading
        heading={label + " Module"}
        action={
          <Grid container style={{ width: "auto" }}>
            <Search searchText={searchText} handleChange={handleChange} handleKeyPress={handleKeyPress} handleSearch={handleSearch} />
            {featuresAssigned.indexOf(ADD_ACTION_OOB_GLOBAL_CONFIG) !== -1 && <Grid item style={{ display: "flex", alignItems: "center" }}>
              <MatButton onClick={openManageModuleDialog}>
              {addNewModule(label)}
            </MatButton>
            </Grid>}
          </Grid>
        }
      />
      {apiError ? (
        <Grid item xs={12} className={styles.error}>
          <Card className={apiError.messageType === "error" ? styles.errorCard : styles.warningCard}>
            <Typography variant="body2">
              {apiError.message}
            </Typography>
          </Card>
        </Grid>
      ) : OOBModuleList.length > 0 ? (
        <MatCard>
          <DataTable
            cols={cols}
            rows={OOBModuleList}
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

      {/* {
        <MatCard>
          <DataTable cols={cols} rows={rows} config={tableConfig} />
        </MatCard>
      } */}
      {open && (
        <ManageModule
          addFor={label}
          heading={"Add New " + label + " Module"}
          handleClose={closeManageModuleDialog}
          open={open}
          resetSearchText={() => setSearchText("")}
        />
      )}
    </MatContainer>
  );
};

export default Modules;
