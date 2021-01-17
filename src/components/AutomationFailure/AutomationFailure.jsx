import React, { useState} from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import CardHeader from "@material-ui/core/CardHeader";
import Typography from "@material-ui/core/Typography";
import { Divider, makeStyles } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import AFDataTable from "../../components/AutFailureDataTable";
// import ImportQueueIcon from "../../assets/images/import_queue-icon.svg";
import VisibilityIcon from "@material-ui/icons/Visibility";
import MatCard from "../MaterialUi/MatCard";
// import MatButton from "../MaterialUi/MatButton";

const useStyles = makeStyles((theme) => ({
  cardHeading: {
    paddingTop: "12px",
    paddingBottom: "10px",
  },
  cardHeadingSize: {
    fontSize: "16px",
    display: "flex",
    alignItems: "center",
  },

  iconSize: {
    fontSize: "16px",
    paddingRight: "4px",
  },
  cardContent: {
    display: "inline-block",
    listStyle: "none",
    fontSize: "13px",
    paddingLeft: "20px",

    "& li": { lineHeight: "20px" },
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
}));

const AutomationFailure = () => {
  const clientId = useSelector((state) => state.Header.entityId);
  const styles = useStyles();
  const history = useHistory();

  const cols = [
    { id: "id", label: "ID", width: "5%" },
    { id: "module", label: "Module", width: "15%" },
    { id: "delivery", label: "Delivery", width: "10%" },
    { id: "type", label: "Type", width: "10%" },
    { id: "letterName", label: "Letter Name", width: "25%" },
    { id: "company", label: "Company", width: "10%" },
    { id: "lineOfBusiness", label: "Line Of Bussiness", width: "10%" },
    { id: "status", label: "Status", width: "15%" },
  ];

  function createData(
    id,
    module,
    delivery,
    type,
    letterName,
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
      company,
      lineOfBusiness,
    };
  }
  const rows = [
    createData(
      "1",
      "GRIEVANCE",
      "Mail",
      "Letter",
      "Rx Medicare Member Approval Letter",
      "Medicaid",
      "Healthy Choice"
    ),
    createData(
      "2",
      "GRIEVANCE",
      "Mail",
      "Letter",
      "Member Denial Letter",
      "Medicare",
      ""
    ),
    createData(
      "3",
      "GRIEVANCE",
      "Mail",
      "Letter",
      "Provider Fax Cover Sheet",
      "Medicare",
      "Balanced Care"
    ),
   
  ];

  const [fileData, setFileData] = useState(rows);
  const [selectAll, setSelectAll] = useState(false);
  const [importBtnDisabled, setImportBtnDisabled] = useState(true);

  const updateCheckedStatus = (id) => {
    const data = [...fileData];

    data.forEach((item) => {
      if (item.id === id) {
        item.checked = !item?.checked;
      }
    });

    const enabled = data.filter((item) => item.checked);
    const disabled = data.filter((item) => !item.checked);

    if (enabled.length === data.length) {
      setSelectAll(true);
    } else if (disabled.length === data.length) {
      setSelectAll(false);
      setImportBtnDisabled(true);
    }

    if (enabled.length > 0) {
      setImportBtnDisabled(false);
    }

    setFileData(data);
  };

  const updateAllCheckedStatus = (toggle) => {
    const data = [...fileData];
    data.forEach((item) => {
      item.checked = toggle;
    });

    setImportBtnDisabled(!toggle);

    setFileData(data);
    setSelectAll(toggle);
  };

  // useEffect(() => {
  // }, [selectAll])

  const tableConfig = {
    tableType: "",
    paginationOption: "custom",
    actions: {
      icon: <VisibilityIcon color="primary" fontSize="small" />,
      tooltipText: "View Fields",
      action: (data) => {},
    },
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

  const handleImport = () => {
    console.log("API call...");
    // if(IMPORT_SUCCESS===true){
    //   history.push(`/client/letters/${clientId}/automation`);
    // }
    history.push(`/client/letters/${clientId}/automation`);
  };

  return (
    <MatCard>
      <CardHeader
        className={styles.cardHeading}
        title={
          <Typography variant="h6" className={styles.cardHeadingSize}>
            {/* <img
              src={ImportQueueIcon}
              alt={ImportQueueIcon + " icon"}
              className={styles.iconSize}
            /> */}
            Automation Failure Report
          </Typography>
        }
        
      />
      <Divider />
      <Grid container>
        <>
          <Grid item xs={12}>
            <div style={{ flex: 1, display: "flex" }}>
              <AFDataTable
                cols={cols}
                rows={fileData}
                config={tableConfig}
                updateCheckedStatus={updateCheckedStatus}
                updateAllCheckedStatus={updateAllCheckedStatus}
                // selectAll={selectAll}
                 updateValue={updateValue}
              />
            </div>
            <Divider />
          </Grid>
        </>
      </Grid>
    </MatCard>
  );
};

export default AutomationFailure;
