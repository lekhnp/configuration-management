import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import NativeSelect from "@material-ui/core/NativeSelect";
import TextField from "@material-ui/core/TextField";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
// import Tooltip from "../../components/MaterialUi/MatTooltip";
import Checkbox from "@material-ui/core/Checkbox";
import Chip from "@material-ui/core/Chip";
// import TablePagination from "@material-ui/core/TablePagination";
import TableSortLabel from "@material-ui/core/TableSortLabel";
// import CustomPagination from "./CustomPagination";
import MatTableCell from "../../components/MaterialUi/MatTableCell";
import { TableFooter, Divider } from "@material-ui/core";
import { DEFAULT_PAGE_SIZE } from "../../utils/AppConstants";
import { fetchMasterModule } from "../../actions/MasterModuleActions";
import {
  fetchCompanyList,
  fetchBusinessLineList,
} from "../../actions/ClientHierarchyActions";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(0),
    minWidth: 40,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  tableHead: {
    paddingTop: "10px",
    paddingBottom: "8px",
  },
  customPagination: {
    display: "flex",
    alignItems: "end",
  },
  tableRow: {
    height: "40px",
    padding: "4px",
    fontSize: "13px",
  },
  selectBox: {
    fontSize: "13px",
  },
  statusReady: {
    background: "#00c853",
  },
  statusNotReady: {
    background: theme.palette.error.main,
  },
  statusInvalidTag: {
    background: "#f39c12",
  },
  statusInProgress:{
    background: "#0073b7"
  }
}));

// overide styles for table cells...
const StyledTableCell = withStyles((theme) => ({
  root: {
    padding: "4px",
  },
  head: {
    backgroundColor: theme.palette.primary.light,
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



const AutoInprogDataTable = (props) => {
  const styles = useStyles();
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [activeModule, setActiveModule] = React.useState(null);
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("");
  // const [rowsPerPage, setRowsPerPage] = React.useState(DEFAULT_PAGE_SIZE);
  // const [page, setPage] = React.useState(0);
  // const totalElements = props.totalElements;
  // const Actions = Boolean(props.config.actions);
  // const MenuActions = Boolean(props.config.menuOptions);
  // const [selectedAction, setSelectedAction] = useState("");

  // const [apiError, setApiError] = useState(null);
  // const [actionError, setActionError] = useState(null);
  // const [isDisabled, setIsDisabled] = useState(true);
  // const [isSubmitted, setIsSubmitted] = useState(false);
  // const [fileInput, setFileInput] = useState("");
  // const error = useSelector((state) => state.Client.getByIdError);
  const clientId = useSelector((state) => state.Header.entityId);
  // const clientInfo = useSelector(
  //   (state) => state.Client.clientByIdDetails.details
  // );

  const moduleDetailsList = useSelector((state) =>
    state.MasterModule.moduleDetailsList.list.sort((a, b) =>
      a.moduleName > b.moduleName ? 1 : -1
    )
  );

  // const companyDetailsList = useSelector((state) =>
  //   state.ClientHierarchy.companyList.list.filter(
  //     (obj) => obj.client.id === parseInt(clientId)
  //   )
  // );

  // const lobList = useSelector((state) =>
  //   state.ClientHierarchy.businessLineList.list.filter(
  //     (obj) => obj.company.client.id === parseInt(clientId)
  //   )
  // );
  //const reset = useSelector((state) => state.Pagination.reset);
  const loggedInUserData = useSelector(
    (state) => state.User.loggedInUser.details
  );

  const open = Boolean(anchorEl);
  const handleClick = (event, module) => {
    setActiveModule(module);
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleRequestSort = (event, property) => {
    if (property === "status" || property === "global")
      property = "statusDialog";
    if (property === "fieldOob") property = "oobStatus";
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleClientStatusClass = (status) => {
    if (status === "16% Complete") {
      return styles.statusInProgress;
    }else if(status ==="Invalid file type"){ 
      return styles.statusNotReady;
    }else{
      return styles.statusInvalidTag;
    }
  };

  useEffect(() => {
    dispatch(fetchMasterModule("ALL"));
    dispatch(fetchCompanyList(clientId));
    dispatch(fetchBusinessLineList(clientId));
    console.log("HELLO DATATABLE");
  }, []);

  return (
    <>
      <TableContainer
        style={{ maxWidth: props.maxWidth ? props.maxWidth : "none" }}
      >
        <Table className={styles.table} aria-label="simple table" size="small">
          <TableHead>
            <TableRow>
              <StyledTableCell>
                <Checkbox
                  checked={props.selectAll}
                  onClick={() => props.updateAllCheckedStatus(!props.selectAll)}
                />
              </StyledTableCell>

              {props.cols.map((col, key) => (
                <StyledTableCell
                  key={key}
                  component="th"
                  className={styles.tableHead}
                  style={{ minWidth: col.width ? col.width : "none" }}
                  sortDirection={orderBy === col.id ? order : false}
                >
                  {!col.hasOwnProperty("isSorting") ? (
                    <TableSortLabel
                      active={orderBy === col.id}
                      direction={orderBy === col.id ? order : "asc"}
                      onClick={(e) => handleRequestSort(e, col.id)}
                    >
                      {col.label}
                    </TableSortLabel>
                  ) : (
                    col.label
                  )}
                </StyledTableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {stableSort(props.rows, getComparator(order, orderBy)).map(
              (row, index) => (
                <StyledTableRow key={index}>
                  <MatTableCell className={styles.tableRow}>
                    <Checkbox
                      checked={row.checked || false}
                      value={row.id}
                      onClick={() => props.updateCheckedStatus(row.id)}
                    />
                  </MatTableCell>

                  <MatTableCell className={styles.tableRow}>
                    {row.id}
                  </MatTableCell>
                  <MatTableCell className={styles.tableRow}>
                    <FormControl className={styles.formControl}>
                      <NativeSelect
                        value={row.module}
                        name="module"
                        className={styles.selectBox}
                        onChange={(e) => props.updateValue(e, row.id)}
                      >
                        {(moduleDetailsList || []).map((item, index) => (
                          <option key={index}>{item.moduleName}</option>
                        ))}
                      </NativeSelect>
                    </FormControl>
                  </MatTableCell>
                  <MatTableCell className={styles.tableRow}>
                    <FormControl className={styles.formControl}>
                      <NativeSelect
                        value={row.delivery}
                        name="delivery"
                        className={styles.selectBox}
                        onChange={(e) => props.updateValue(e, row.id)}
                      >
                        <option value=""></option>
                        <option value="Mail">Mail</option>
                        <option value="Fax">Fax</option>
                      </NativeSelect>
                    </FormControl>
                  </MatTableCell>
                  <MatTableCell className={styles.tableRow}>
                    <FormControl className={styles.formControl}>
                      <NativeSelect
                        value={row.type}
                        name="type"
                        className={styles.selectBox}
                        onChange={(e) => props.updateValue(e, row.id)}
                      >
                        <option value=""></option>
                        <option value="Attachment">Attachment</option>
                        <option value="Cover Sheet">Cover Sheet</option>
                        <option value="Letter">Letter</option>
                      </NativeSelect>
                    </FormControl>
                  </MatTableCell>
                  <MatTableCell className={styles.tableRow}>
                    <FormControl className={styles.formControl}>
                      <TextField
                        name="letterName"
                        value={row.letterName}
                        inputProps={{ style: { fontSize: 13, width:"230px" } }}
                        onChange={(e) => props.updateValue(e, row.id)}
                      ></TextField>
                    </FormControl>
                  </MatTableCell>
                  <MatTableCell className={styles.tableRow}>
                    <FormControl className={styles.formControl}>
                      <NativeSelect
                        value={row.company}
                        name="company"
                        className={styles.selectBox}
                        onChange={(e) => props.updateValue(e, row.id)}
                      >
                        {/* {(companyDetailsList || []).map((item) => (
                          <option>{item.moduleName}</option>
                        ))} */}
                        <option value=""></option>
                        <option value="Commercial">Commercial</option>
                        <option value="Medicare">Medicare</option>
                        <option value="Medicaid">Medicaid</option>
                      </NativeSelect>
                    </FormControl>
                  </MatTableCell>
                  <MatTableCell className={styles.tableRow}>
                    <FormControl className={styles.formControl}>
                      <NativeSelect
                        value={row.lineOfBusiness}
                        name="lineOfBusiness"
                        className={styles.selectBox}
                        onChange={(e) => props.updateValue(e, row.id)}
                      >
                        {/* {(lobList || []).map((item) => (
                          <option>{item.lob}</option>
                        ))} */}
                        <option value=""></option>
                        <option value="Healthy Choice">Healthy Choice</option>
                        <option value="Advantage Plus">Advantage Plus</option>
                        <option value="Balanced Care">Balanced Care</option>
                      </NativeSelect>
                    </FormControl>
                  </MatTableCell>
                  <MatTableCell className={styles.tableRow}>
                     <Chip
                          label= {row.inValid?"Invalid file type":"16% Complete"}
                          className={handleClientStatusClass(
                            row.inValid?"Invalid file type":"16% Complete"
                          )}
                          color="primary"
                        />
                  </MatTableCell>
                </StyledTableRow>
              )
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              {/* {props.config.paginationOption === "custom" && (
                <CustomPagination
                  count={totalElements}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onChangePage={handleChangePage}
                  onChangeRowsPerPage={handleChangeRowsPerPage}
                />
              )}  */}
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
      {/* {props.config.paginationOption !== "custom" && (
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
      )} */}
    </>
  );
};

export default AutoInprogDataTable;
