import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import CardHeader from "@material-ui/core/CardHeader";
import Typography from "@material-ui/core/Typography";
import { Divider, makeStyles } from "@material-ui/core";
import DataTable from "../../components/TempLibDataTable";
import MatInputField from "../../components/MaterialUi/MatInputField";
import MatButton from "../../components/MaterialUi/MatButton";
import RateReviewIcon from "@material-ui/icons/RateReview";
import CoverSheetIcon from "../../assets/images/coversheet.svg";
import AppendPagesIcon from "../../assets/images/AppendPages.svg";
import AutoTriggerIcon from "../../assets/images/AutoTrigger.svg";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import MatCard from "../../components/MaterialUi/MatCard";
import MenuItem from "@material-ui/core/MenuItem";

import { COMMON_ERROR_MESSAGE } from "../../utils/Messages";
const useStyles = makeStyles((theme) => ({
  cardHeading: {
    paddingTop: "12px",
    paddingBottom: "10px",
  },
  cardHeadingSize: {
    fontSize: "16px",
  },

  cardContent: {
    display: "inline-block",
    listStyle: "none",
    fontSize: "13px",
    paddingLeft: "20px",
  },

  hyperLink: {
    color: "#3e719e",
    textDecoration: "none",
    "&:active, &:hover, &:focus": {
      outline: "none",
      textDecoration: "none",
      color: "#72afd2",
    },
  },

  filterDropdown: {
    paddingRight: "10px",
    minWidth: "200px",
    margin: "12px 0px 12px 18px",
  },
  btn: {
    borderRadius: "4px",
    margin: "8px 4px",
    padding: "7px 16px",
    "&:hover":{
      backgroundColor:"#4054b2"
    }
  },
  setAs: {
    paddingRight: "10px",
    minWidth: "150px",
    margin: "12px 0px 12px 5px",
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
  { id: "id", label: "ID", width: "5%" },
  { id: "module", label: "Module", width: "15%" },
  { id: "delivery", label: "Delivery", width: "10%" },
  { id: "type", label: "Type", width: "10%" },
  { id: "letterName", label: "Letter Name", width: "25%" },
  { id: "coverSheet", label: {icon: <img src={CoverSheetIcon} width="20px" alt="" title="Cover Sheet"/> }, width: "5%" },
  { id: "appendPages", label: {icon: <img src={AppendPagesIcon} width="20px" alt="" title="Append Pages"/> }, width: "5%" },
  { id: "autoTrigger", label: {icon: <img src={AutoTriggerIcon} width="20px" alt="" title="Auto Trigger"/> }, width: "5%" },
  { id: "company", label: "Company", width: "10%" },
  { id: "lineOfBusiness", label: "LOB", width: "10%" },
  { id: "status", label: "Status", maxWidth: "10%" },
];

function createData(
  id,
  module,
  delivery,
  type,
  letterName,
  coverSheet,
  appendPages,
  autoTrigger,
  company,
  lineOfBusiness,
  status
) {
  return {
    id,
    module,
    delivery,
    type,
    letterName,
    coverSheet,
    appendPages,
    autoTrigger,
    company,
    lineOfBusiness,
    status
  };
}
const rows = [
  createData(
    "1",
    "GRIEVANCE",
    "Mail",
    "Letter",
    "Rx Medicare Member Approval Letter",
    <img src={CoverSheetIcon} width="20px" alt="" title="Cover Sheet"/>,
    <img src={AppendPagesIcon} width="20px" alt="" title="Append Pages"/>,
    "",
    "Medicaid",
    "Healthy Choice",
    "Active"
  ),
  createData(
    "2",
    "GRIEVANCE",
    "Mail",
    "Letter",
    "Member Denial Letter",
    "",
    "",
    <img src={AutoTriggerIcon} width="20px" alt="" title="Auto Trigger"/>,
    "Medicare",
    "Healthy Choice",
    "Active"
  ),
  createData(
    "3",
    "GRIEVANCE",
    "Mail",
    "Letter",
    "Provider Fax Cover Sheet",
    "",
    "",
    "",
    "Medicare",
    "Balanced Care",
    "Inactive"
  ),
  createData(
    "4",
    "GRIEVANCE",
    "Mail",
    "Letter",
    "Provider Fax Cover Sheet",
    "",
    "",
    "",
    "Medicare",
    "Balanced Care",
    "Inactive"
  ),
  createData(
    "5",
    "GRIEVANCE",
    "Mail",
    "Letter",
    "Provider Fax Cover Sheet",
    "",
    <img src={AppendPagesIcon} width="20px" alt="" title="Append Pages"/>,
    "",
    "Medicare",
    "Balanced Care",
    "Config Incomplete"
  ),
  createData(
    "6",
    "GRIEVANCE",
    "Mail",
    "Letter",
    "Provider Fax Cover Sheet",
    "",
    "",
    "",
    "Medicare",
    "Balanced Care",
    "Active"
  ),
];

const handlePageChange = (start, size) => {
    // if (searchText === "" || searchText === "All")
    //   dispatch(fetchUsers(start, size));
    // else dispatch(fetchUsers(start, size, searchText, inputs.searchBy));
  };


const TemplateLibrary = () => {
  const clientId = useSelector((state) => state.Header.entityId);
  const history = useHistory();
  const styles = useStyles();
  const [fileData, setFileData] = useState(rows);
  //const [selectAll, setSelectAll] = useState(false);

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
    //setSelectAll(toggle);
  };

  // useEffect(() => {
  // }, [selectAll])

  const tableConfig = {
    tableType: "",
    checked: true,
    paginationOption: "custom",
    actions: {
      icon: <RateReviewIcon fontSize="small" />,
      tooltipText: "Edit Fields",
      action: (data) => {
        history.push(`/client/${clientId}/letter-Editor`);
      },
    },
    handlers: {
      handleClientStatusClass: (status) => {
        if (status === "Active") {
          return styles.statusActive;
        } else if (status === "Inactive") {
          return styles.statusInactive;
        } else {
          return styles.statusNotConfig;
        }
      }    
    }
  };

  const updateValue = ({ target: { name, value } }, id) => {
    const data = [...fileData];
    data.forEach((item) => {
      if (item.id === id) {
        if (value === "") {
          item.inValid = true;
        } else {
          item.inValid = false;
        }
        item[name] = value;
      }
    });

    setFileData(data);
  };

  // const handleImport = () => {
  //   console.log("API call...");
  //   // if(IMPORT_SUCCESS===true){
  //   //   history.push(`/client/letters/${clientId}/automation`);
  //   // }
  //   history.push(`/client/letters/${clientId}/automation`);
  // };

  const openAddUsersDialog = () => {
    // // dispatch({ type: RESET_USER_IS_DONE, payload: "" });
    // // dispatch({ type: RESET_ADD_USER_ERROR, payload: "" });
    // setOpen(true);
    // setAddUserKey((count) => count + 1);
    //setActiveTab(0);
  };


  return (
    <MatCard>
      <CardHeader
        className={styles.cardHeading}
        title={
          <Typography variant="h6" className={styles.cardHeadingSize}>
            Template Library
          </Typography>
        }
      />
      <Divider />
      <Grid container>
        {false && (
          <Grid item xs={12} className={styles.error}>
            <Card className={styles.errorCard}>
              <Typography variant="body2">{COMMON_ERROR_MESSAGE}</Typography>
            </Card>
          </Grid>
        )}
        {/* <CardHeader
            className={styles.cardHeading}
            title={
              <Typography variant="h6" className={styles.cardHeadingSize}>
                Letter Inventory
              </Typography>
            }
          /> */}
        <Grid item className={styles.filterDropdown}>
          <MatInputField
            select
            label="Mass Configure"
            //   name="searchBy"
            //  value={searchBy}
          >
            <MenuItem value="Module">Module</MenuItem>
            <MenuItem value="Delivery Method">Delivery Method</MenuItem>
            <MenuItem value="Letter Type">Letter Type</MenuItem>
            <MenuItem value="Company">Company</MenuItem>
            <MenuItem value="Line Of Bussiness">Line Of Bussiness</MenuItem>
            <MenuItem value="Cover Sheet">Module</MenuItem>
            <MenuItem value="Append Document">Append Document</MenuItem>
          </MatInputField>
        </Grid>
        <Grid item xs={6} className={styles.setAs}>
          <MatInputField
            //   inputRef={register({
            //     required: {
            //       value: userType === "CLIENT",
            //       message: FIRST_NAME_MANDATORY,
            //     },
            //     pattern: {
            //       value: NAME_PATTERN,
            //       message: VALID_NAME_MSG,
            //     },
            //     maxLength: {
            //       value: 50,
            //       message: MAXIMUN_CHARACTER_ALLOWED_MSG,
            //     },
            //   })}
            label="Set as"
            name="setas"
          />
        </Grid>
        <Grid item style={{ display: "flex", alignItems: "center" }}>
          <MatButton onClick={openAddUsersDialog} className={styles.btn} color="primary">Save</MatButton>
        </Grid>
        <Grid item xs={12}>
          <DataTable
            cols={cols}
            rows={fileData}
            config={tableConfig}
            updateCheckedStatus={updateCheckedStatus}
            updateAllCheckedStatus={updateAllCheckedStatus}
            // selectAll={selectAll}
            updateValue={updateValue}
            totalElements="6"
            startIndex="0"
            handleNextPage={handlePageChange}
          />

          <Divider />
        </Grid>
      </Grid>
    </MatCard>
  );
};

export default TemplateLibrary;
