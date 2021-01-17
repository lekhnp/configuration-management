import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
// import Paper from "@material-ui/core/Paper";
import Tooltip from "../MaterialUi/MatTooltip";
import Checkbox from "@material-ui/core/Checkbox";
import TablePagination from "@material-ui/core/TablePagination";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Chip from "@material-ui/core/Chip";
import CustomPagination from "../../components/DataTable/CustomPagination";
import CommonMenu from "../CommonMenu";
import MatAvatar from "../MaterialUi/MatAvatar";
import MatTableCell from "../MaterialUi/MatTableCell";
import { TableFooter, Divider } from "@material-ui/core";
// import {
//   //fetchListByPage,
//   resetTablePagination,
// } from "../../actions/PaginationActions";
import { DEFAULT_PAGE_SIZE } from "../../utils/AppConstants";

const useStyles = makeStyles((theme) => ({
  //   table: {
  //     minWidth: 650
  //   },
  tableHead: {
    paddingTop: "10px",
    paddingBottom: "8px",
  },
  customPagination: {
    display: "flex",
    alignItems: "end",
  },
  tableRow: {
    height: "50px",
    padding: "4px",
    fontSize: "13px",
  },
  statusActive: {
    background: "#00c853",
  },
  statusInactive: {
    background: theme.palette.error.main,
  },
  statusNotConfig: {
    background: "#f39c12",
  },
}));

const StyledTableCell = withStyles((theme) => ({
  root: {
    padding: "4px",
  },
  head: {
    backgroundColor: theme.palette.primary.light,
    // color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(MatTableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
  body: { padding: "1px" },
}))(TableRow);

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const DataTable = (props) => {
  const styles = useStyles();
  //const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [activeModule, setActiveModule] = React.useState(null);
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("");
  const [rowsPerPage, setRowsPerPage] = React.useState(DEFAULT_PAGE_SIZE);
  const [page, setPage] = React.useState(0);
  const totalElements = props.totalElements;
  const Actions = Boolean(props.config.actions);
  const MenuActions = Boolean(props.config.menuOptions);
  const defaultStatus = props?.config?.handlers?.handleClientStatusClass || (() => styles.statusActive);
  const [selectedAction, setSelectedAction] = useState("");
  //const reset = useSelector((state) => state.Pagination.reset);
  // const loggedInUserData = useSelector(
  //   (state) => state.User.loggedInUser.details
  // );

  const open = Boolean(anchorEl);
  const handleClick = (event, module) => {
    setActiveModule(module);
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    if (props.config.paginationOption === "custom")
      props.handleNextPage(newPage * rowsPerPage, rowsPerPage);
  };

  const handleChangeRowsPerPage = (event) => {
    let pages = parseInt(event.target.value, 10);
    setRowsPerPage(pages);
    setPage(0);
    if (props.config.paginationOption === "custom")
      props.handleNextPage(0, pages);
    //dispatch(fetchListByPage(url, 0, pages, entityName));
  };

  const handleRequestSort = (event, property) => {
    if (property === "status" || property === "global")
      property = "statusDialog";
    if (property === "fieldOob") property = "oobStatus";
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  useEffect(() => {
    if (props.config.paginationOption === "custom") {
      setPage(Math.ceil(props.startIndex / rowsPerPage));
    }
  }, [
    props.config.paginationOption,
    props.resetPagination,
    props.startIndex,
    rowsPerPage,
  ]);

  // useEffect(() => {
  //   if (props.paginationOption === "custom") {
  //     if (props.startIndex === DEFAULT_START_INDEX) {
  //       setPage(DEFAULT_START_INDEX);
  //     }
  //     // else
  //     //   setPage(Math.max(0, Math.ceil(props.totalElements / rowsPerPage) - 1))
  //   }
  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [props.startIndex]);



  useEffect(() => {
    if (Actions && MenuActions) {
      props.config.selectAction
        ? setSelectedAction("MenuAction")
        : setSelectedAction("Action");
    } else {
      props.config.menuOptions
        ? setSelectedAction("MenuAction")
        : props.config.actions
        ? setSelectedAction("Action")
        : setSelectedAction("");
    }
  }, [Actions, MenuActions, props.config]);

  return (
    <>
      <TableContainer
        style={{ maxWidth: props.maxWidth ? props.maxWidth : "none" }}
      >
        <Table className={styles.table} aria-label="simple table" size="small">
          <TableHead>
            <TableRow>
              {props.config.tableType && (
                <StyledTableCell style={{ width: "40px" }}></StyledTableCell>
              )}
              {props.config.checked ? (
              <StyledTableCell style={{ padding: "4px" }}>
                <Checkbox
                  checked={props.allCheckedStatus}
                  onClick={() =>
                    props.updateCheckedStatus(!props.allCheckedStatus)
                  }
                />
              </StyledTableCell>): <StyledTableCell style={{ width: "10px" }}></StyledTableCell>}

              {props.cols.map((col, key) => (
                <StyledTableCell
                  key={key}
                  component="th"
                  className={styles.tableHead}
                  style={{ minWidth: col.minWidth ? col.minWidth : "none" }}
                  sortDirection={orderBy === col.id ? order : false}
                >
                  {!col.hasOwnProperty("isSorting") ? (
                    <TableSortLabel
                      active={orderBy === col.id}
                      direction={orderBy === col.id ? order : "asc"}
                      onClick={(e) => handleRequestSort(e, col.id)}
                    >
                      {typeof col.label === "string"
                        ? col.label
                        : col.label.icon}
                    </TableSortLabel>
                  ) : (
                    col.label
                  )}
                </StyledTableCell>
              ))}
              {(props.config.actions || props.config.menuOptions) && (
                <StyledTableCell style={{ width: "40px" }}></StyledTableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {stableSort(props.rows, getComparator(order, orderBy))
              .slice(
                props.config.paginationOption !== "custom"
                  ? page * rowsPerPage
                  : 0,
                page * rowsPerPage + rowsPerPage
              )
              //.slice(0,10)
              .map((row, index) => (
               
                <StyledTableRow className={styles.tableRow} key={index}>
                   {props.config.checked ? (
                  <MatTableCell className={styles.tableRow}>
                    <Checkbox
                    //checked={props.checkedStatus.some(o => o.id === row.id)}
                    //onClick={() => props.updateCheckedStatus(row)}
                    />
                  </MatTableCell>
                ):<StyledTableCell style={{ width: "10px" }}></StyledTableCell>}
                  {props.config.tableType && (
                    <MatTableCell>
                      <MatAvatar
                        type={props.config.iconType}
                        width={props.config.iconWidth}
                      >
                        {props.config.iconSource}
                      </MatAvatar>
                    </MatTableCell>
                  )}

                  {props.cols.map((col, key) =>
                    Object.keys(row).map((cellKey) =>
                      col.id === cellKey ? (
                        <MatTableCell
                          className={styles.tableRow}
                          key={cellKey}
                          style={{
                            opacity: row.deleted ? "0.38" : "1",
                            // color: row.deleted
                            //   ? "rgba(0, 0, 0, 0.38)"
                            //   : "inherit",
                            wordBreak: "break-word",
                          }}
                        >
                          {(cellKey!=="status")?row[cellKey]:
                          <Chip
                            label={row[cellKey]}                           
                            color="primary"
                            className={defaultStatus(row.status)}
                          />}
                        </MatTableCell>
                      ) : null
                    )
                  )}
                  {selectedAction === "MenuAction" &&
                    !(
                      (row.deleted || row.selectAction) &&
                      Actions &&
                      MenuActions
                    ) && (
                      <MatTableCell
                        style={{
                          opacity: row.deleted ? "0.38" : "1",
                        }}
                      >
                        <IconButton
                          onClick={(e) => handleClick(e, row)}
                          //disabled={row.deleted}
                        >
                          <MoreVertIcon />
                        </IconButton>
                      </MatTableCell>
                    )}

                  {(selectedAction === "Action" ||
                    ((row.deleted || row.selectAction) &&
                      Actions &&
                      MenuActions)) && (
                    <MatTableCell
                      style={{
                        opacity: row.deleted ? "0.38" : "1",
                      }}
                    >
                      <Tooltip
                        placement="left"
                        arrow
                        title={
                          props.config.actions.tooltipText
                            ? props.config.actions.tooltipText
                            : ""
                        }
                      >
                        <IconButton
                          onClick={(e) => {
                            props.config.actions.action(row);
                          }}
                          disabled={
                            row.deleted &&
                            props.config.actions.display === "Hide"
                          }
                        >
                          {props.config.actions.icon}
                        </IconButton>
                      </Tooltip>
                    </MatTableCell>
                  )}
                </StyledTableRow>
              ))}

            {selectedAction === "MenuAction" && (
              <CommonMenu
                anchorEl={anchorEl}
                open={open}
                activeRow={activeModule}
                onClose={handleClose}
                options={props.config.menuOptions}
              />
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              {props.config.paginationOption === "custom" && (
                <CustomPagination
                  count={totalElements}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onChangePage={handleChangePage}
                  onChangeRowsPerPage={handleChangeRowsPerPage}
                />
              )}
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
      {props.config.paginationOption !== "custom" && (
        <>
          <Divider />
          <TablePagination
            // rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={props.rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </>
      )}
    </>
  );
};

export default DataTable;
