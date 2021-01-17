// eslint-disable-next-line
import React, { useState, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { CardContent } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Chip from "@material-ui/core/Chip";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import RateReviewIcon from "@material-ui/icons/RateReview";
import VisibilityIcon from "@material-ui/icons/Visibility";
import DeleteIcon from "@material-ui/icons/Delete";
import Search from "../../components/Search";
import MatCard from "../../components/MaterialUi/MatCard";
import MatButton from "../../components/MaterialUi/MatButton";
import PageHeading from "../../components/PageHeading";
import DataTable from "../../components/DataTable";
import AddMasterSysVariable from "../../components/ManageAppSettings/AddMasterSysVariable";
import UpdateMasterTable from "../../components/ManageAppSettings/UpdateMasterTable";
import TableCellShowMore from "../../components/TableCellShowMore";

import {
  SET_DEFAULT_STARTINDEX,
  RESET_MASTERSYSVARIABLE_ADDED,
  DEFAULT_START_INDEX,
  DEFAULT_PAGE_SIZE,
} from "../../utils/AppConstants";

import { fetchMasterModule } from "../../actions/MasterModuleActions";
import { showMessageDialog } from "../../actions/MessageDialogActions";
import { formatDate } from "../../utils/helpers";
import {
  ADD_SYSTEM_VARIABLE,
  systemVariableMessage,
  COMMON_ERROR_MESSAGE,
  CONFIRM,
  NO_RECORDS_MESSAGE,
  VIEW_DETAILS,
  VIEW_UPDATE,
  TERM_TABLE,
  MASTER_SYS_VAR_LIST,
} from "../../utils/Messages";
import {
  ADD_ACTION_APP_SETTINGS,
  DELETE_ACTION_APP_SETTINGS,
  UPDATE_ACTION_APP_SETTINGS,
} from "../../utils/FeatureConstants";

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
    paddingLeft: "290px",
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
  filterDropdown: {
    paddingRight: "10px",
    minWidth: "200px",
  },
  noDataCard: {
    minHeight: "200px",
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
  },
  errorCard: {
    background: theme.palette.error.main,
    boxShadow: "none !important",
    color: "#ffffff",
    padding: "12px 16px",
    marginBottom: "14px",
  },
}));

const cols = [
  { id: "sysVarCode", label: "System Variable Code", minWidth: "160px" },
  { id: "modules", label: "Modules(s)" },
  { id: "table", label: "Table", minWidth: "80px" },
  { id: "uniqueColumn", label: "Primary Column", minWidth: "130px" },
  { id: "shortDescription", label: "Short Description", minWidth: "160px" },
];

// const searchFilter = [
//   { id: "tableName", label: "Table Name" },
//   { id: "createdBy", label: "Created By" },
// ];

const MasterSystemVariables = () => {
  const styles = useStyles();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [openUpdateTable, setOpenUpdateTable] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [popUpAnchorEl, setPopUpAnchorEl] = useState(null);
  const [popUpOptions, setPopUpOptions] = useState(null);
  const [popUpFieldKey, setPopUpFieldKey] = useState("");
  const isPopUpOpen = Boolean(popUpAnchorEl);
  const getApiError = useSelector((state) => state.MasterSysVariable.getError);
  const featuresAssigned = useSelector((state) => state.User.features);
  const totalElements = useSelector(
    (state) => state.MasterSysVariable.tableDetailsList.totalElements
  );
  const isTableAdded = useSelector(
    (state) => state.MasterSysVariable.isTableAdded
  );
  //   const isTableUpdated = useSelector(
  //     (state) => state.MasterSysVariable.isTableUpdated
  //   );
  //   const isTableDeleted = useSelector(
  //     (state) => state.MasterSysVariable.isTableDeleted
  //   );
  //   const tableDetailsById = useSelector(
  //     (state) => state.MasterSysVariable.tableDetailsById.data
  //   );
  const startIndex = useSelector(
    (state) => state.MasterSysVariable.page.startIndex
  );
  //const url = useSelector((state) => state.Pagination.page.url);
  const pageSize = useSelector(
    (state) => state.MasterSysVariable.page.pageSize
  );
  const reset = useSelector((state) => state.MasterSysVariable.reset);

  const handlePopUpClick = (event, data, fieldKey) => {
    setPopUpFieldKey(fieldKey);
    setPopUpOptions(data);
    setPopUpAnchorEl(event.currentTarget);
  };

  const handlePopUpClose = () => {
    setPopUpAnchorEl(null);
  };

  const tableDetailsList = useSelector((state) =>
    state.MasterSysVariable.tableDetailsList.list.map((data) => {
      let blankData = {
        id: data.id,
        sysVarCode: data.code,
        uniqueColumn: data.uniqueColumn && (
          <div>
            {data.uniqueColumn.mapLabel
              ? data.uniqueColumn.mapLabel
              : data.uniqueColumn.mapObject.fieldName}
          </div>
        ),
        module: data.module,
        shortDescription: data.shortDescription,
        createdAt: formatDate(data.createdDate),
      };
      return { ...data, ...blankData };
    })
  );

  const tableConfig = {
    tableType: "",
    paginationOption: "custom",
    menuOptions: [
      {
        type: "link",
        icon:
          featuresAssigned.indexOf(UPDATE_ACTION_APP_SETTINGS) === -1 ? (
            <VisibilityIcon fontSize="small" />
          ) : (
            <RateReviewIcon fontSize="small" />
          ),
        label:
          featuresAssigned.indexOf(UPDATE_ACTION_APP_SETTINGS) === -1
            ? VIEW_DETAILS
            : VIEW_UPDATE,
        action: (e) => openUpdateTableDialog(e),
      },
      {
        type: "link",
        icon: <DeleteIcon fontSize="small" />,
        label: TERM_TABLE,
        action: (e) => {
          openConfirmDeleteDialog(e);
        },
      },
    ],
    actions: featuresAssigned.indexOf(DELETE_ACTION_APP_SETTINGS) === -1 && {
      icon:
        featuresAssigned.indexOf(UPDATE_ACTION_APP_SETTINGS) === -1 ? (
          <VisibilityIcon color="primary" fontSize="small" />
        ) : (
          <RateReviewIcon color="primary" fontSize="small" />
        ),
      tooltipText:
        featuresAssigned.indexOf(UPDATE_ACTION_APP_SETTINGS) === -1
          ? VIEW_DETAILS
          : VIEW_UPDATE,
      action: (e) => openUpdateTableDialog(e),
    },
  };

  const openUpdateTableDialog = (data) => {
    //dispatch(fetchTableById(data.id));
  };

  const closeUpdateTableDialog = useCallback(() => {
    setOpenUpdateTable(false);
    //dispatch(resetDuplicateError());
  }, []);

  const openAddMasterTableFormDialog = () => {
    dispatch({ type: RESET_MASTERSYSVARIABLE_ADDED });
    setOpen(true);
  };

  const closeAddMasterTableFormDialog = useCallback(() => {
    setOpen(false);
    //dispatch(resetDuplicateError());
  }, []);
  //}, [dispatch]);

  const openConfirmDeleteDialog = (e) => {
    let messageObj = {
      primaryButtonLabel: "Yes",
      primaryButtonAction: () => {
        //dispatch(deleteMasterTable(e.id, e.tableName));
      },
      secondaryButtonLabel: "No",
      secondaryButtonAction: () => {},
      title: CONFIRM,
      message: systemVariableMessage(e.tableName),
    };
    dispatch(showMessageDialog(messageObj));
  };

  const handlePageChange = (start, size) => {
    //dispatch(fetchMasterTable(start, size, searchText));
  };

  const handleChange = (e) => {
    setSearchText(e.target.value);
    if (e.target.value === "") {
      dispatch({ type: SET_DEFAULT_STARTINDEX });
      //dispatch(fetchMasterTable(DEFAULT_START_INDEX, pageSize));
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  const handleSearch = () => {
    if (searchText !== "") {
      dispatch({ type: SET_DEFAULT_STARTINDEX });
      //dispatch(fetchMasterTable(DEFAULT_START_INDEX, pageSize, searchText));
    }
  };

  useEffect(() => {
    dispatch(fetchMasterModule());
  }, [dispatch]);

  return (
    <>
      <PageHeading
        heading={MASTER_SYS_VAR_LIST}
        action={
          <Grid container style={{ width: "auto" }}>
            <Search
              searchText={searchText}
              handleChange={handleChange}
              handleKeyPress={handleKeyPress}
              handleSearch={handleSearch}
            />

            {featuresAssigned.indexOf(ADD_ACTION_APP_SETTINGS) !== -1 && (
              <Grid item style={{ display: "flex", alignItems: "center" }}>
                <MatButton onClick={openAddMasterTableFormDialog}>
                  {ADD_SYSTEM_VARIABLE}
                </MatButton>
              </Grid>
            )}
          </Grid>
        }
      />
      {getApiError ? (
        <Grid item xs={12} className={styles.error}>
          <Card className={styles.errorCard}>
            <Typography variant="body2">{COMMON_ERROR_MESSAGE}</Typography>
          </Card>
        </Grid>
      ) : tableDetailsList.length ? (
        <MatCard>
          <DataTable
            cols={cols}
            rows={tableDetailsList}
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
        <AddMasterSysVariable
          handleClose={closeAddMasterTableFormDialog}
          open={open}
        />
      )}
      {openUpdateTable && (
        <UpdateMasterTable
          handleClose={closeUpdateTableDialog}
          open={openUpdateTable}
        />
      )}
      <TableCellShowMore
        anchorEl={popUpAnchorEl}
        open={isPopUpOpen}
        onClose={handlePopUpClose}
        moreItems={1}
        fieldProp={popUpFieldKey}
        options={popUpOptions}
      />
    </>
  );
};

export default MasterSystemVariables;
