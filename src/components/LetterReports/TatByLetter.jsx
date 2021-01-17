import React,{useState} from "react";
import { useHistory } from "react-router-dom";

import CardHeader from "@material-ui/core/CardHeader";
import Typography from "@material-ui/core/Typography";
import { Divider, makeStyles } from "@material-ui/core";
import DataTable from "../../components/TempLibDataTable";

// import TableContainer from "@material-ui/core/TableContainer";
// import Table from "@material-ui/core/Table";
// import TableBody from "@material-ui/core/TableBody";
// import TableRow from "@material-ui/core/TableRow";
// import TableCell from "@material-ui/core/TableCell";
// import Chip from "@material-ui/core/Chip";
// import { TextField } from '@material-ui/core';
// import StatusIcon from "../../assets/images/status-icon.svg";

import MatCard from "../MaterialUi/MatCard";

// import { formatDate } from "../../utils/helpers";

const useStyles = makeStyles((theme) => ({
  
  statusCard: {
    flex: 1,
  },
  cardHeading: {
    paddingTop: "12px",
    paddingBottom: "10px",
  },
  cardHeadingSize: {
    fontSize: "16px",
    display: "flex",
    alignItems: "center"
  },
  iconSize:{
    fontSize: "16px",
    paddingRight: "5px",
    width: "18px"
  },
  highlightedCell: {
    fontWeight: 500,
    width: "100px",
    padding: "9px 0px 9px 16px",
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

const cols = [
  { id: "id", label: "ID", width: "10%" },
  { id: "module", label: "Module", width: "15%" },
  { id: "delivery", label: "Delivery", width: "15%" },
  { id: "type", label: "Type", width: "10%" },
  { id: "letterName", label: "Letter Name", width: "35%" },
  { id: "dateImport", label: "Date Import", width: "10%" },
  { id: "dateSetActive", label: "Date Set Active", width: "10%" },
  { id: "status", label: "Tat", maxWidth: "10%" },
];

function createData(
  id,
  module,
  delivery,
  type,
  letterName,
  dateImport,
  dateSetActive,
  status
) {
  return {
    id,
    module,
    delivery,
    type,
    letterName,
    dateImport,
    dateSetActive,
    status
  };
}
const rows = [
  createData(
    "1",
    "GRIEVANCE",
    "Mail",
    "Letter",
    "Rx Member Approval Letter",    
    "2020-08-16 21:12:39",
    "2020-08-16 21:15:54",
    "00:03:25"
  ),
  createData(
    "2",
    "GRIEVANCE",
    "Mail",
    "Letter",
    "Member Denial Letter",
    "2020-08-16 21:12:39",
    "2020-08-16 21:15:54",
    "00:03:25"
  ),
  createData(
    "3",
    "GRIEVANCE",
    "Mail",
    "Letter",
    "Provider Fax Cover Sheet",
    "2020-08-16 21:12:39",
    "2020-08-16 21:15:54",
    "00:03:25"
  ),
  createData(
    "4",
    "GRIEVANCE",
    "Mail",
    "Letter",
    "Provider Fax Cover Sheet",
    "2020-08-16 21:12:39",
    "2020-08-16 21:15:54",
    "00:03:25"
  ),
  createData(
    "5",
    "GRIEVANCE",
    "Mail",
    "Letter",
    "Provider Fax Cover Sheet",
    "2020-08-16 21:12:39",
    "2020-08-16 21:15:54",
    "04:03:25"
  ),
  createData(
    "6",
    "GRIEVANCE",
    "Mail",
    "Letter",
    "Provider Fax Cover Sheet",
    "2020-08-16 21:12:39",
    "2020-08-16 21:15:54",
    "42:03:25"
  ),
];


const TatByLetter = () => {
  const history = useHistory();
  const styles = useStyles();
  //const clientId = useSelector((state) => state.Header.entityId);
  const clientId = 2;
  const [fileData, setFileData] = useState(rows);
  const [selectAll, setSelectAll] = useState(false);
   
    const tableConfig = {
      tableType: "",
      paginationOption: "custom",
      handlers: {
        handleClientStatusClass: (status) => {
          let arrStatus = status.split(":");
          
          if (arrStatus[0] === "00") {
            return styles.statusActive;
          } else if (arrStatus[0] <= 10) {
            return styles.statusNotConfig
          } else {
            return styles.statusInactive;
          }
        }    
      }
    };

    const updateCheckedStatus = (id) => {
      const data = [...fileData];
  
      data.forEach((item) => {
        if (item.id === id) {
          item.checked = !item?.checked;
        }
      });
  
      const enabled = data.filter((item) => item.checked);
      const disabled = data.filter((item) => !item.checked);
  
      setFileData(data);
    };
  
    const updateAllCheckedStatus = (toggle) => {
      const data = [...fileData];
      data.forEach((item) => {
        item.checked = toggle;
      });
  
      setFileData(data);
      setSelectAll(toggle);
    };

    const handlePageChange = (start, size) => {
      // if (searchText === "" || searchText === "All")
      //   dispatch(fetchUsers(start, size));
      // else dispatch(fetchUsers(start, size, searchText, inputs.searchBy));
    };
  

    return (
      <MatCard className={styles.statusCard}>
        <CardHeader
          className={styles.cardHeading}
          title={
            <Typography variant="h6" className={styles.cardHeadingSize}>
             Tat by Letter
            </Typography>
          }
        />
        <Divider />
       
          <DataTable
            cols={cols}
            rows={fileData}
            config={tableConfig}
            updateCheckedStatus={updateCheckedStatus}
            updateAllCheckedStatus={updateAllCheckedStatus}
            // selectAll={selectAll}
            //updateValue={updateValue}
            totalElements="6"
            startIndex="0"
            handleNextPage={handlePageChange}
          />


      </MatCard>
    );
}

export default TatByLetter;
