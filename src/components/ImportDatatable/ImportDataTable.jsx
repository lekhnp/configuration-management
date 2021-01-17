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
import TablePagination from "@material-ui/core/TablePagination";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import CustomPagination from "./CustomPagination";
import MatTableCell from "../../components/MaterialUi/MatTableCell";
import { TableFooter, Divider } from "@material-ui/core";
import { DEFAULT_PAGE_SIZE, DEFAULT_SORTBY } from "../../utils/LettersAppConstant";
import { fetchBusinessByClientId, fetchModulesByClientId, fetchCompanyByClientId } from "../../actions/LettersActions";

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

const ImportDataTable = (props) => {
  const styles = useStyles();
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(DEFAULT_PAGE_SIZE);
  const [page, setPage] = useState(0);
  const totalElements = props.totalElements;
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

  const moduleList = useSelector((state) =>
    state.Letters.modulesList.sort((a, b) =>
      a.moduleName > b.moduleName ? 1 : -1
    )
  );
  const businessList = useSelector(({Letters: {businessList =[]}}) =>
    businessList.sort((a, b) =>
      a.produtLine > b.produtLine ? 1 : -1
    )
    //.filter((v,i,a)=>a.findIndex(t=>(t.produtLine === v.produtLine))===i)
  );

  const companyList = useSelector((state) =>
  state.Letters.companyList.sort((a, b) =>
    a.company > b.company ? 1 : -1
  )
);
  
  //const reset = useSelector((state) => state.Pagination.reset);
  // const loggedInUserData = useSelector(
  //   (state) => state.User.loggedInUser.details
  // );

  // const open = Boolean(anchorEl);
  // const handleClick = (event, module) => {
  //   //setActiveModule(module);
  //   setAnchorEl(event.currentTarget);
  // };

  // const handleClose = () => {
  //   setAnchorEl(null);
  // };

  const handleRequestSort = (event, property) => {
    if (property === "status" || property === "global")
      property = "statusDialog";
    if (property === "fieldOob") property = "oobStatus";
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleClientStatusClass = (status) => {
    if (status === "Ready to Import") {
      return styles.statusReady;
    }
    // else if(status ==="Invalid file type"){ 
    //   return styles.statusNotReady;
    // }else{
    //   return styles.statusInvalidTag;
    // }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    if (props.config.paginationOption === "custom")
      props.handleNextPage(newPage * rowsPerPage, rowsPerPage, DEFAULT_SORTBY, clientId);
  };

  const handleChangeRowsPerPage = (event) => {
    let pages = parseInt(event.target.value, 10);
    setRowsPerPage(pages);
    setPage(0);
    if (props.config.paginationOption === "custom")
      props.handleNextPage(0, pages, DEFAULT_SORTBY, clientId)
    //dispatch(fetchListByPage(url, 0, pages, entityName));
  };

  useEffect(() => {
    if (props.config.paginationOption === "custom") {
      setPage(Math.ceil(props.startIndex / rowsPerPage));
    }
  }, [props.config.paginationOption, props.resetPagination, props.startIndex, rowsPerPage]);

  useEffect(() => {
    dispatch(fetchModulesByClientId(clientId));
    dispatch(fetchBusinessByClientId(clientId));
     dispatch(fetchCompanyByClientId(clientId));   
    
  }, [dispatch, clientId]);

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
            {stableSort(props.rows, getComparator(order, orderBy))
              .slice(
                props.config.paginationOption !== "custom"
                  ? page * rowsPerPage
                  : 0,
                page * rowsPerPage + rowsPerPage
              )
            .map(
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
                        {(moduleList || []).map((item, index) => (
                          index===0 ? <><option value="-1" key={index}>Member</option>
                          <option value={item.id} key={index}>{item.moduleName}</option></>:
                        <option value={item.id} key={index}>{item.moduleName}</option>                          
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
                        <option value="Mail">Mail</option>
                        {/* <option value="Mail">Mail</option> */}
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
                        <option value="Letter">Letter</option>
                        <option value="Attachment">Attachment</option>
                        <option value="Cover Sheet">Cover Sheet</option>
                        {/* <option value="Letter">Letter</option> */}
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
                       {(companyList || []).map((item, index) => (
                          index===0 ? <><option value="-1" key={index}></option>
                          <option value={item.id} key={index}>{item.code}</option></>:
                        <option value={item.id} key={index}>{item.code}</option>                          
                        ))}
                        {/* <option value=""></option>
                        <option value="Commercial">Commercial</option>
                        <option value="Medicare">Medicare</option>
                        <option value="Medicaid">Medicaid</option> */}
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
                        {(businessList || []).map((item, index) => (
                          index===0 ? <><option value="-1" key={index}></option>
                          <option value={item.id} key={index}>{item.productLine}</option></>:
                        <option value={item.id} key={index}>{item.productLine}</option>                          
                        ))}
                        {/* <option value=""></option>
                        <option value="Healthy Choice">Healthy Choice</option>
                        <option value="Advantage Plus">Advantage Plus</option>
                        <option value="Balanced Care">Balanced Care</option> */}
                      </NativeSelect>
                    </FormControl>
                  </MatTableCell>
                  <MatTableCell className={styles.tableRow}>
                     <Chip
                          label= {"Ready to Import"}
                          className={handleClientStatusClass("Ready to Import")}
                          color="primary"
                        />
                  </MatTableCell>
                </StyledTableRow>
              )
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

export default ImportDataTable;
