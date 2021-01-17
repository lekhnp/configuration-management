import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { makeStyles } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import Chip from "@material-ui/core/Chip";
import Typography from "@material-ui/core/Typography";
import PageHeading from "../../components/PageHeading";

import ImportInstructions from "../../components/ImportInstruction";
import LetterUpload from "../../components/LetterUpload";
import ImportQueue from "../../components/ImportQueue";
import { generateFileName } from "../../utils/helpers";

import {
  fetchBusinessByClientId,
  fetchModulesByClientId,
  fetchCompanyByClientId,
  addFiles,
  fetchFiles,
  addFilesReset,
} from "../../actions/LettersActions";
// import {
//   // SHOW_SNACKBAR_ACTION,
//   RESET_HIERARCHY_ERROR,
// } from "../../utils/AppConstants";

import { COMMON_ERROR_MESSAGE, IMPORT_PORTAL } from "../../utils/Messages";
import {DEFAULT_START_INDEX, DEFAULT_PAGE_SIZE, DEFAULT_SORTBY}  from "../../utils/LettersAppConstant";
const useStyles = makeStyles((theme) => ({
  col: {
    padding: "10px",
  },

  grow: {
    flexGrow: 1,
  },
  anchor: {
    textDecoration: "none",
  },
  button: {
    marginTop: "10px",
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
  { id: "id", label: "ID", width: "5%" },
  { id: "module", label: "Module", width: "15%" },
  { id: "delivery", label: "Delivery", width: "10%" },
  { id: "type", label: "Type", width: "10%" },
  { id: "letterName", label: "Letter Name", width: "25%" },
  { id: "company", label: "Company", width: "10%" },
  { id: "lineOfBusiness", label: "LOB", width: "10%" },
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
// const rows = [
//   createData(
//     "1",
//     "ADHOC",
//     "MAIL",
//     "Letter",
//     "Rx Medicare Member Approval Letter",
//     "Medicaid",
//     "Healthy Choice"
//   ),
//   createData(
//     "2",
//     "GLOBAL",
//     "MAIL",
//     "Letter",
//     "Member Denial Letter",
//     "Medicare",
//     ""
//   ),
//   createData(
//     "3",
//     "GRIEVANCE",
//     "MAIL",
//     "Letter",
//     "Provider Fax Cover Sheet",
//     "Medicare",
//     "Balanced Care"
//   ),
//   createData("4", "PHARMACY", "Fax", "Letter", "", "Medicare", ""),
//   createData(
//     "5",
//     "PHARMACY",
//     "MAIL",
//     "Letter",
//     "Provider Fax Cover Sheet",
//     "Medicare",
//     "Balanced Care"
//   ),
//   createData(
//     "6",
//     "GRIEVANCE",
//     "MAIL",
//     "Letter",
//     "Provider Fax Cover Sheet",
//     "Medicare",
//     "Healthy Choice"
//   ),
// ];

const ImportPortal = () => {
  const styles = useStyles();
  const dispatch = useDispatch();
  const [apiError, setApiError] = useState(null);
  const [actionError, setActionError] = useState(null);
  const clientId = useSelector((state) => state.Header.entityId);
  const totalElements = useSelector((state) => state.Letters.allFilesData.totalElements);
  const startIndex = useSelector((state) => state.Letters.page.startIndex);
  const pageSize = useSelector((state) => state.Letters.page.pageSize);

  const filesList = useSelector((state) =>
    state.Letters.allFilesData.list      
      .map((data) => {
        let blankData = {
          id: data.id,
          module: data.module?.id,
          deliveryMethod: data.deliveryMethod,
          type: data.letterImportType,
          letterName: data.letterName,
          lineOfBusiness: data.business?.id,
          company: data.company?.id,
          status: (
            <div>
              {
                <Chip
                  label={data.letterImportStatus && "Ready To Import"}
                  //className={handleUserStatusClass(data.status)}
                  color="primary"
                />
              }
            </div>
          ),
          //statusDialog: data.letterImportStatus,
          
        };
       // return { ...data, ...blankData };
       return { ...blankData };
      })
  );

  const filesRowDataError = (useSelector((state) => state.Letters.fileData) || []).filter(item => {
    return  item?.responseMessage?.toLowerCase() !== 'success' && item.error;
  })

  console.log('file error',filesRowDataError)
  const filterValues = {
    moduleList: useSelector((state) => state.Letters.modulesList),
    lobList: useSelector((state) => state.Letters.businessList),
    companyList: useSelector((state) => state.Letters.companyList),
    deliveryTypeList: [ "MAIL", "FAX"],
  };

  //console.log("fileRowData: ",filesRowDataSuccess);

  const handleFileName = (fileName) => {
    const rows = [];
    let count = 0;

    fileName.forEach(({ name }, index) => {
        const fileData = generateFileName(name, filterValues);
        dispatch(
          addFiles(
            {
              businessLineId: fileData.businessLineId,
              clientId: clientId,
              companyId: fileData.companyId,
              deliveryMethod: fileData.deliveryMethod,
              effectiveDate: new Date().toISOString(),
              importStoragePath: "string",
              letterImportStatus: "READY",
              letterImportType: "LETTER",
              letterName: fileData.letterName ? fileData.letterName : name,
              libraryStoragePath: "string",
              moduleId: fileData.moduleId,
              originalFileName: name,
              termDate: new Date().toISOString(),
            },
            clientId,
            () => {
              count = count + 1;
              if (fileName.length === count) {
                dispatch(fetchFiles(DEFAULT_START_INDEX, DEFAULT_PAGE_SIZE, DEFAULT_SORTBY, clientId));
              }
            }
          )
        );
    });


    // setRows(rows);
    // console.log(rows);
  };

  const handlePageChange = (start, size, DEFAULT_SORTBY, clientId) => {
    dispatch(fetchFiles(start, size, DEFAULT_SORTBY, clientId));
  };

  const resetFileData = () => {
    dispatch(addFilesReset());
  }

  useEffect(() => {
    if (clientId !== "") {
      dispatch(fetchModulesByClientId(clientId));
      dispatch(fetchBusinessByClientId(clientId));
      dispatch(fetchCompanyByClientId(clientId));
      dispatch(fetchFiles(DEFAULT_START_INDEX, DEFAULT_PAGE_SIZE, DEFAULT_SORTBY, clientId));
      console.log("HELLO IMPORT PORTAL");
    }
  }, [dispatch, clientId]);

  
  // useEffect(() => {
  //   if(filesRowDataSuccess.length) {
  //     setRows(filesRowDataSuccess);
  //   }    
  //   console.log("Updated Table");
  // }, [setRows, filesRowDataSuccess]);
  
  return (
    <>
      {apiError && (
        <>
          <PageHeading heading={IMPORT_PORTAL} />
          <Grid item xs={12} className={styles.col}>
            <Card className={styles.errorCard}>
              <Typography variant="body2">{apiError}</Typography>
            </Card>
          </Grid>
        </>
      )}
      {!apiError && (
        <>
          {actionError && (
            <Grid item xs={12} className={styles.col}>
              <Card className={styles.errorCard}>
                <Typography variant="body2">{actionError}</Typography>
              </Card>
            </Grid>
          )}

          <Grid container>
            {false && (
              <Grid item xs={12} className={styles.error}>
                <Card className={styles.errorCard}>
                  <Typography variant="body2">
                    {COMMON_ERROR_MESSAGE}
                  </Typography>
                </Card>
              </Grid>
            )}
            <Grid item xs={12}>
              <ImportInstructions />
            </Grid>
            <Grid item xs={12}>
              <LetterUpload resetFileData={resetFileData} errorData={filesRowDataError} onUploadSuccess={handleFileName} />
            </Grid>

            <Grid item xs={12}>
              <ImportQueue
                cols={cols}
                rows={filesList}
                totalElements={totalElements}
                startIndex={startIndex}
                handlePageChange={handlePageChange}
              />
            </Grid>
          </Grid>
        </>
      )}
    </>
  );
};

export default ImportPortal;
