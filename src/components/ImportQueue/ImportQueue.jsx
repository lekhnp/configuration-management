import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import CardHeader from "@material-ui/core/CardHeader";
import Typography from "@material-ui/core/Typography";
import { Divider, makeStyles } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import ImportDataTable from "../../components/ImportDatatable";
import ImportQueueIcon from "../../assets/images/import_queue-icon.svg";
import VisibilityIcon from "@material-ui/icons/Visibility";
import MatCard from "../MaterialUi/MatCard";
import MatButton from "../MaterialUi/MatButton";
import {DEFAULT_START_INDEX, DEFAULT_PAGE_SIZE, DEFAULT_SORTBY,SHOW_SNACKBAR_ACTION}  from "../../utils/LettersAppConstant";

import {
  updateFile,
  fetchFiles
} from "../../actions/LettersActions";
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

const ImportQueue = (props) => {
  const clientId = useSelector((state) => state.Header.entityId);
  const styles = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
 
  const [fileData, setFileData] = useState(props.rows);
  const [selectAll, setSelectAll] = useState(false);
  const [importBtnDisabled, setImportBtnDisabled] = useState(true);

  const updateCheckedStatus = (id) => {
    const data = [...fileData];
    
    data.forEach((item) => {
     // if (item.id === id && !item?.inValid) {
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
      // if(!item.inValid) {
      //   item.checked = toggle;
      // }
      item.checked = toggle;
    });

    setImportBtnDisabled(!toggle);

    setFileData(data);
    setSelectAll(toggle);
  };

  useEffect(() => {
    // if(!businessData.data && clientId) {
    //   dispatch(fetchBusinessByClientId(clientId));
    // }
    // dispatch(fetchModulesByClientId(clientId));
    setFileData(props.rows);
  }, [props.rows, setFileData]);

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
        // if (value === "") {
        //   item.inValid = true;
        // } else {
        //   item.inValid = false;

        // }
        const r = /[^a-z0-9 .-_]/gi;
        if (name==="letterName") {
         if (r.test(value)) {
          item[name] = value.replace(r, '')
         }else{
          item[name] = value;
         }
        } else {
          item[name] = value;
        }
      }
    });

    setFileData(data);
  };

  const handleImport = () => {
    let count = 0;
    const data = [...fileData].filter(item => item.checked);
    const checkValues = (company, business) => {
      let values = {};

      if (company) {
        values = {  ...values, "companyId": company }
      }

      if (business) {
        values = {  ...values, "businessLineId": business }
      }

      return values;
    }
    console.log(data);
    data.forEach(item => {

      if(item.checked) {
        const row = {  "id": item.id,
        ...checkValues(item.company, item.lineOfBusiness),
        "deliveryMethod": item.deliveryMethod,
        "importStoragePath": "string",
        "letterImportStatus": "PROCESSING",
        "letterImportType": item.type,
        "letterName": item.letterName,
        "libraryStoragePath": "string",
        "moduleId": item.module
       }
       console.log(row);
       dispatch(updateFile(row, () => {
        count = count + 1;
        if (count === data.length) {
          console.log('completed');
          dispatch(fetchFiles(DEFAULT_START_INDEX, DEFAULT_PAGE_SIZE, DEFAULT_SORTBY, clientId));
          dispatch({
            type: SHOW_SNACKBAR_ACTION,
            payload: {
              detail: "Files imported successfully",
            },
          });
          updateAllCheckedStatus(false)
        }
       }));
      }
    });

    
    
    // if(IMPORT_SUCCESS===true){
    //   history.push(`/client/letters/${clientId}/automation`);
    // }
    // history.push(`/client/letters/${clientId}/automation`);
  };

  return (
    <MatCard>
      <CardHeader
        className={styles.cardHeading}
        title={
          <Typography variant="h6" className={styles.cardHeadingSize}>
            <img
              src={ImportQueueIcon}
              alt={ImportQueueIcon + " icon"}
              className={styles.iconSize}
            />{" "}
            Import Queue
          </Typography>
        }
        action={
          true && (
            <MatButton
              className={styles.cardAction}
              color="secondary"
              disabled={importBtnDisabled}
              onClick={handleImport}
            >
              Import
            </MatButton>
          )
        }
      />
      <Divider />
      <Grid container>
        <>
          <Grid item xs={12}>
            <div style={{ flex: 1, display: "flex" }}>
              <ImportDataTable
                cols={props.cols}
                rows={fileData}
                config={tableConfig}
                updateCheckedStatus={updateCheckedStatus}
                updateAllCheckedStatus={updateAllCheckedStatus}
                selectAll={selectAll}
                updateValue={updateValue}
                totalElements={props.totalElements}
                startIndex={props.startIndex}
                handleNextPage={props.handlePageChange}
              />
            </div>
            <Divider />
          </Grid>
        </>
      </Grid>
    </MatCard>
  );
};

export default ImportQueue;
