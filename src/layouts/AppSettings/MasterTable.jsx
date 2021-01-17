// eslint-disable-next-line
import React, { useState, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { CardContent } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Chip from "@material-ui/core/Chip";
//import MenuItem from "@material-ui/core/MenuItem";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import RateReviewIcon from "@material-ui/icons/RateReview";
import VisibilityIcon from "@material-ui/icons/Visibility";
import DeleteIcon from "@material-ui/icons/Delete";
import Search from "../../components/Search";
import MatCard from "../../components/MaterialUi/MatCard";
//import MatButton from "../../components/MaterialUi/MatButton";
//import MatInputField from "../../components/MaterialUi/MatInputField";
import PageHeading from "../../components/PageHeading";
import DataTable from "../../components/DataTable";
import AddMasterTable from "../../components/ManageAppSettings/AddMasterTable";
//import UpdateMasterTable from "../../components/ManageAppSettings/UpdateMasterTable";
import TableCellShowMore from "../../components/TableCellShowMore";

import {
    SET_DEFAULT_STARTINDEX,
    //FETCH_COLUMN_LIST_FAILURE,
    //FETCH_MASTERTABLE_COMPLETE,
    DEFAULT_START_INDEX,
    DEFAULT_PAGE_SIZE,
} from "../../utils/AppConstants";
import { handleMasterTableError } from "../../utils/Messages";
import {
    // resetDuplicateError,
    // fetchTableById,
    deleteMasterTable,
    fetchTableById,
    fetchMasterTable,
} from "../../actions/MasterTableActions";
import { fetchMasterModule } from "../../actions/MasterModuleActions";
import { showMessageDialog } from "../../actions/MessageDialogActions";
import { formatDate } from "../../utils/helpers";
// import {
//   fetchListByPage,
//   resetTablePagination,
// } from "../../actions/PaginationActions";
import {
    //ADD_NEW_TABLE,
    termTableMessage,
    //COMMON_ERROR_MESSAGE,
    CONFIRM,
    NO_RECORDS_MESSAGE,
    VIEW_DETAILS,
    VIEW_UPDATE,
    TERM_TABLE,
    MASTER_TABLE,
} from "../../utils/Messages";
import {
    //ADD_ACTION_APP_SETTINGS, 
    DELETE_ACTION_APP_SETTINGS, UPDATE_ACTION_APP_SETTINGS
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
    warningCard: {
        background: theme.palette.warning.main,
        boxShadow: 'none !important',
        color: '#ffffff',
        padding: '12px 16px',
        marginBottom: '14px'
    },
}));


const cols = [
    { id: "tableName", label: "Table Name" },
    { id: "columns", label: "Filtered Columns" },
    { id: "module", label: "Module(s)" },
    { id: "createdAt", label: "Created On" },
];


const MasterTable = () => {
    const styles = useStyles();
    const dispatch = useDispatch();
    //const [open, setOpen] = useState(false);
    const [openUpdateTable, setOpenUpdateTable] = useState(false);
    const [searchText, setSearchText] = useState("");
    // const [selectedData, setSelectedData] = useState({});
    const [popUpAnchorEl, setPopUpAnchorEl] = useState(null);
    const [popUpOptions, setPopUpOptions] = useState(null);
    const [popUpFieldKey, setPopUpFieldKey] = useState("");
    const [popUpNestedFieldKey, setPopUpNestedFieldKey] = useState("");
    const isPopUpOpen = Boolean(popUpAnchorEl);
    const getApiError = useSelector((state) => state.MasterTable.getError);
    const [apiError, setApiError] = useState(null);
    //const [selected, setSelected] = useState('');
    const featuresAssigned = useSelector(
        (state) => state.User.features
    );
    const totalElements = useSelector(
        (state) => state.MasterTable.tableDetailsList.totalElements
    );
    const tableDetailsListById = useSelector((state) => state.MasterTable.tableDetailsById.data);
    // const isTableAdded = useSelector(
    //     (state) => state.MasterTable.isTableAdded
    // );
    const isTableUpdated = useSelector(
        (state) => state.MasterTable.isTableUpdated
    );
    const isTableDeleted = useSelector(
        (state) => state.MasterTable.isTableDeleted
    );
    // const tableDetailsById = useSelector(
    //     (state) => state.MasterTable.tableDetailsById.data
    // );
    const startIndex = useSelector(
        (state) => state.MasterTable.page.startIndex
    );
    const pageSize = useSelector((state) => state.MasterTable.page.pageSize);
    const reset = useSelector((state) => state.MasterTable.reset);

    const handlePopUpClick = (event, data, fieldKey, nestedFieldKey) => {
        setPopUpFieldKey(fieldKey);
        setPopUpOptions(data);
        setPopUpAnchorEl(event.currentTarget);
        setPopUpNestedFieldKey(nestedFieldKey);
    };

    const handlePopUpClose = () => {
        setPopUpAnchorEl(null);
    };

    const tableDetailsList = useSelector((state) =>

        state.MasterTable.tableDetailsList.list
            .map((data) => {
                let blankData = {
                    id: data.id,
                    tableName: data.tableName,
                    columns: data.mapField && (
                        <div>
                            {JSON.parse(data.mapField).map(
                                (col, index) =>
                                    index < 2 && (
                                        <Chip
                                            style={{ margin: "2px" }}
                                            key={index}
                                            label={col.mapObject.fieldName}
                                        />
                                    )
                            )}
                            {JSON.parse(data.mapField).length > 2 && (
                                <Chip
                                    className={styles.moreChip}
                                    icon={<MoreHorizIcon />}
                                    onClick={(e) =>
                                        handlePopUpClick(e, data.mapField, "mapObject", "fieldName")
                                    }
                                />
                            )}
                        </div>
                    ),
                    module: data.module && data.module.moduleName,
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
                icon: featuresAssigned.indexOf(UPDATE_ACTION_APP_SETTINGS) === -1 ? <VisibilityIcon fontSize="small" /> : <RateReviewIcon fontSize="small" />,
                label: featuresAssigned.indexOf(UPDATE_ACTION_APP_SETTINGS) === -1 ? VIEW_DETAILS : VIEW_UPDATE,
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
        actions: featuresAssigned.indexOf(DELETE_ACTION_APP_SETTINGS) === -1 &&
        {
            icon: featuresAssigned.indexOf(UPDATE_ACTION_APP_SETTINGS) === -1 ? <VisibilityIcon color="primary" fontSize="small" /> : <RateReviewIcon color="primary" fontSize="small" />,
            tooltipText: featuresAssigned.indexOf(UPDATE_ACTION_APP_SETTINGS) === -1 ? VIEW_DETAILS : VIEW_UPDATE,
            action: (e) => openUpdateTableDialog(e)
        }
    };

    const openUpdateTableDialog = (data) => {
        dispatch(fetchTableById(data.id));
        // setOpenUpdateTable(true);
        // setSelected(data.id);
    };

    const closeUpdateTableDialog = useCallback(() => {
        setOpenUpdateTable(false);
        //setSelected('');
        //dispatch(resetDuplicateError());
    }, []);

    // const openAddMasterTableFormDialog = () => {
    //     setOpen(true);
    // };

    // const closeAddMasterTableFormDialog = useCallback(() => {
    //     setOpen(false);
    //     dispatch({ type: FETCH_COLUMN_LIST_FAILURE });
    //     //dispatch({type:FETCH_MASTERTABLE_COMPLETE});
    //     //dispatch(resetDuplicateError());
    // }, []);
    // //}, [dispatch]);


    const openConfirmDeleteDialog = (e) => {
        let messageObj = {
            primaryButtonLabel: "Yes",
            primaryButtonAction: () => {
                dispatch(deleteMasterTable(e.id, e.tableName));
            },
            secondaryButtonLabel: "No",
            secondaryButtonAction: () => { },
            title: CONFIRM,
            message: termTableMessage(e.tableName),
        };
        dispatch(showMessageDialog(messageObj));
    };

    const handlePageChange = (start, size) => {
        dispatch(fetchMasterTable(start, size, searchText));
    };

    const handleChange = (e) => {
        setSearchText(e.target.value);
        if (e.target.value === "") {
            dispatch({ type: SET_DEFAULT_STARTINDEX });
            dispatch(fetchMasterTable(DEFAULT_START_INDEX, pageSize));
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter") handleSearch();
    };

    const handleSearch = () => {
        if (searchText !== "") {
            dispatch({ type: SET_DEFAULT_STARTINDEX });
            dispatch(fetchMasterTable(DEFAULT_START_INDEX, pageSize, searchText));
        }
    };

    useEffect(() => {
        dispatch(fetchMasterTable(DEFAULT_START_INDEX, DEFAULT_PAGE_SIZE));
    }, [dispatch]);

    // useEffect(() => {
    //     if (Object.keys(tableDetailsById).length !== 0) {
    //         setOpenUpdateTable(true);
    //     }
    // }, [dispatch, tableDetailsById]);

    // useEffect(() => {
    //     if (isTableAdded) {
    //         setSearchText("");
    //         dispatch({ type: SET_DEFAULT_STARTINDEX });
    //         dispatch(fetchMasterTable(DEFAULT_START_INDEX, pageSize));
    //         //dispatch(resetTablePagination(true));
    //         closeAddMasterTableFormDialog();
    //     }
    // }, [dispatch, isTableAdded, closeAddMasterTableFormDialog, pageSize]);

    // useEffect(() => {
    //     if (isTableUpdated) {
    //         dispatch(fetchMasterTable(startIndex, pageSize, searchText));
    //         closeUpdateTableDialog();
    //     }
    // }, [
    //     dispatch,
    //     isTableUpdated,
    //     closeUpdateTableDialog,
    //     startIndex,
    //     pageSize,
    //     searchText,
    // ]);

    // useEffect(() => {
    //     if (isTableDeleted) {
    //         dispatch(fetchMasterTable(startIndex, pageSize, searchText));
    //         dispatch(resetDuplicateError());
    //     }
    // }, [dispatch, isTableDeleted, startIndex, pageSize, searchText]);

    useEffect(() => {
        if (Object.keys(tableDetailsListById).length !== 0) {
            setOpenUpdateTable(true);
        }
    }, [dispatch, tableDetailsListById]);

    useEffect(() => {
        if (isTableUpdated) {
            dispatch(fetchMasterTable(startIndex, pageSize, searchText));
            closeUpdateTableDialog();
        }
    }, [
        dispatch,
        isTableUpdated,
        closeUpdateTableDialog,
        startIndex,
        pageSize,
        searchText,
    ]);

    useEffect(() => {
        if (isTableDeleted) {
            if (
                startIndex + 1 === totalElements &&
                startIndex !== DEFAULT_START_INDEX
            )
                dispatch(
                    fetchMasterTable(startIndex - pageSize, pageSize, searchText)
                );
            else dispatch(fetchMasterTable(startIndex, pageSize, searchText));
        }
    }, [dispatch, isTableDeleted, startIndex, pageSize, totalElements, searchText]);

    useEffect(() => {
        dispatch(fetchMasterModule());
    }, [dispatch]);

    useEffect(() => {
        if (getApiError) {
            setApiError(handleMasterTableError(getApiError));
        }
        else
            setApiError(false);
    }, [getApiError]);


    return (
        <>
            <PageHeading
                heading={MASTER_TABLE}
                action={
                    <Grid container style={{ width: "auto" }}>
                        <Search
                            searchText={searchText}
                            handleChange={handleChange}
                            handleKeyPress={handleKeyPress}
                            handleSearch={handleSearch}
                        />
                        {/* {featuresAssigned.indexOf(ADD_ACTION_APP_SETTINGS) !== -1 && <Grid item style={{ display: "flex", alignItems: "center" }}>
                            <MatButton onClick={openAddMasterTableFormDialog}>
                                {ADD_NEW_TABLE}
                            </MatButton>
                        </Grid>} */}
                    </Grid>
                }
            />
            {apiError ? (
                <Grid item xs={12} className={styles.error}>
                    <Card className={apiError.messageType === "error" ? styles.errorCard : styles.warningCard}>
                        <Typography variant="body2">{apiError.message}</Typography>
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
            {/* {open && (
                <AddMasterTable
                    handleClose={closeAddMasterTableFormDialog}
                    open={open}
                />
            )} */}
            {openUpdateTable && (
                <AddMasterTable
                    handleClose={closeUpdateTableDialog}
                    open={openUpdateTable}
                //selectedId={selected}
                />
            )}
            <TableCellShowMore
                anchorEl={popUpAnchorEl}
                open={isPopUpOpen}
                onClose={handlePopUpClose}
                moreItems={1}
                fieldProp={popUpFieldKey}
                nestedFieldProp={popUpNestedFieldKey}
                options={popUpOptions}
            />
        </>
    );
};

export default MasterTable;
