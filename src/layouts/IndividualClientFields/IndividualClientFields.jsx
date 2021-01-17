import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";

import Grid from "@material-ui/core/Grid";
import CardHeader from "@material-ui/core/CardHeader";

import MatCard from "../../components/MaterialUi/MatCard";
import MatContainer from "../../components/MaterialUi/MatContainer";
import PageHeading from "../../components/PageHeading";
import DataTable from "../../components/DataTable";
import Search from "../../components/Search";
import BreadcrumbView from "../../components/BreadcrumbView";
import MatButton from "../../components/MaterialUi/MatButton";
import IndividualModuleAnalytics from "../IndividualClientSubmodules/IndividualModuleAnalytics";
import Card from "@material-ui/core/Card";
import VisibilityIcon from "@material-ui/icons/Visibility";
import Typography from "@material-ui/core/Typography";
import CardContent from "@material-ui/core/CardContent";
import Chip from "@material-ui/core/Chip";

import { fetchMasterControl } from "../../actions/ControlActions";
import {
  fetchClientControl,
  fetchClientModuleById,
  fetchClientSubmoduleById,
  bulkFieldStatus,
} from "../../actions/ClientModuleActions";

import { updateEntityId } from "../../actions/AppHeaderActions";
import { NO_RECORDS_MESSAGE, READY_TO_SIGNOFF, SIGN_OFF_CONFIRM,handleIndividualClientFieldsError } from "../../utils/Messages";

import {
  DEFAULT_START_INDEX,
  DEFAULT_PAGE_SIZE,
} from "../../utils/AppConstants";
import { FIELD_APPROVE_ACTION, FIELD_SIGN_OFF_ACTION } from "../../utils/FeatureConstants";
import { showMessageDialog } from "../../actions/MessageDialogActions";
import { fetchClientSingleModuleAnalytics } from "../../actions/ClientAnalyticsActions";

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
  cardHeading: {
    paddingTop: "10px",
    paddingBottom: "10px",
    backgroundColor: theme.palette.primary.light,
  },
  cardHeadingSize: {
    fontSize: "16px",
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
  approved: {
    background: "#00c853",
  },
  awatingSignOff: {
    background: theme.palette.warning.main,
  },
  signedOff: {
    background: theme.palette.primary.main,
  },
  analyticsContainer: {
    paddingTop: "2px",
    paddingBottom: "8px",
  },
}));

const cols = [
  { id: "section", label: "Section" },
  { id: "label", label: "Field Name" },
  { id: "controlType", label: "Field Type" },
  { id: "hidden", label: "Hidden" },
  { id: "mandatory", label: "Mandatory" },
  { id: "disabled", label: "Disabled" },
  { id: "fieldOob", label: "OOB" },
  { id: "status", label: "Status" },
];

const IndividualClientFields = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const styles = useStyles();
  const {
    label,
    clientId,
    moduleId,
    submoduleId,
    submoduleVersionId,
    version,
    moduleVersionId,
  } = useParams();
  const [searchText, setSearchText] = useState("");
  const [checked, setChecked] = useState([]);
  const [allChecked, setAllChecked] = useState(false);
  const [isSignoffDisable, setIsSignoffDisable] = useState(true);
  const [isApproveDisable, setIsApproveDisable] = useState(true);
  const loggedInUserData = useSelector(
    (state) => state.User.loggedInUser.details
  );
  const featuresAssigned = useSelector(
    (state) => state.User.features
  );
  const singleModuleAnalytics = useSelector(
    (state) => state.ClientAnalytics.SingleModuleAnalytics.data
  );
  // const singleModuleAnalyticsError = useSelector(
  //   (state) => state.ClientAnalytics.SingleModuleAnalytics.error
  // );

  const singleSubmoduleAnalytics =
    singleModuleAnalytics &&
      singleModuleAnalytics[0] &&
      Object.keys(singleModuleAnalytics[0]).length > 0
      ? { totalSummary: singleModuleAnalytics[0][submoduleVersionId] }
      : {};

  const oobControlIdError = useSelector((state) => state.OobControl.data.error);
  const oobSubmoduleError = useSelector(
    (state) => state.OOBSubmodule.OobSubmoduleById.error
  );
  const [apiError, setApiError] = useState(null);
  const clientModuleById = useSelector(
    (state) => state.ClientModule.clientModuleById.data
  );

  const bulkUpdate = useSelector((state) => state.ClientModule.bulkUpdate);

  const clientSubmoduleById = useSelector(
    (state) => state.ClientModule.clientSubmoduleById.data
  );
  const submoduleData = clientSubmoduleById && clientSubmoduleById.subModule;

  const oobSubmoduleMeta =
    clientSubmoduleById &&
    clientSubmoduleById.metaTag &&
    JSON.parse(clientSubmoduleById.metaTag);

  const controlList = useSelector((state) =>
    state.Control.data.list.filter((control) => {
      if (
        oobSubmoduleMeta &&
        oobSubmoduleMeta.controlType === control.type &&
        oobSubmoduleMeta.controlType === "form"
      ) {
        return true;
      } else if (
        oobSubmoduleMeta &&
        oobSubmoduleMeta.controlType === control.type &&
        oobSubmoduleMeta.controlType === "otherContent"
      ) {
        return control.id === oobSubmoduleMeta.controlId;
      }
      return false;
    })
  );

  const handleFieldStatusLabel = (details) => {
    if (details === "AWAITING_SIGN_OFF" || details === "RETRACT") {
      return "Awaiting Sign-Off";
    } else if (details === "SIGN_OFF") {
      return "Signed Off";
    } else if (details === "APPROVED") {
      return "Approved";
    } else {
      return details;
    }
  };

  const handleFieldStatusClass = (status) => {
    if (status === "AWAITING_SIGN_OFF" || status === "RETRACT") {
      return styles.awatingSignOff;
    } else if (status === "SIGN_OFF") {
      return styles.signedOff;
    } else {
      return styles.approved;
    }
  };

  const handleOobStatusClass = (status) => {
    if (status === "YES") {
      return styles.approved;
    } else {
      return styles.awatingSignOff;
    }
  };
  const totalElements = useSelector(
    (state) => state.ClientModule.clientControlsList.totalElements
  );
  const startIndex = useSelector(
    (state) => state.ClientModule.controlPage.startIndex
  );

  const pageSize = useSelector((state) => state.ClientModule.controlPage.pageSize);

  const ClientControlData = useSelector((state) =>
    state.ClientModule.clientControlsList.list.map((data, index) => {
      let controlData = {
        id: data.id,
        controlFieldStatus: data.status,
        fieldOob: data.oobChangeStatus ? (
          <div>
            {
              <Chip
                label={data.oobChangeStatus}
                className={handleOobStatusClass(data.oobChangeStatus)}
                color="primary"
              />
            }
          </div>
        ) : (
            "N/A"
          ),
        status: data.status ? (
          <div>
            {
              <Chip
                label={handleFieldStatusLabel(data.status)}
                className={handleFieldStatusClass(data.status)}
                color="primary"
              />
            }
          </div>
        ) : (
            "N/A"
          ),
        oobStatus: data.oobChangeStatus,
        statusDialog: data.status,
        ...data.controlData,
      };
      return { ...controlData };
    })
  );

  const handleModuleBackButton = () => {
    if (label === "OOB") {
      history.push(`/client/modules/${clientId}`);
    } else {
      history.push(`/client/global-modules/${clientId}`);
    }
  };

  const handleSubmoduleBackButton = () => {
    history.push(
      `/client/components/${label}/${clientId}/${moduleId}/${moduleVersionId}/${version}`
    );
  };
  const BreadcrumbData = [
    {
      id: "modules",
      label: label + " Modules",
      action: handleModuleBackButton,
    },
    {
      id: "submodules",
      label:
        clientModuleById &&
        clientModuleById.module &&
        clientModuleById.module.moduleName + " (" + version + ")",
      action: handleSubmoduleBackButton,
    },
    {
      id: "fields",
      label: submoduleData ? submoduleData.name : "",
    },
  ];

  const tableConfig = {
    tableType: "",
    checked: true,
    paginationOption: "custom",
    actions: {
      icon: <VisibilityIcon color="primary" fontSize="small" />,
      tooltipText: "View Field Details",
      action: (data) => {
        history.push(
          `/client/field-details/${label}/${clientId}/${moduleId}/${moduleVersionId}/${submoduleId}/${submoduleVersionId}/${data.id}/${version}`
        );
      },
    },
  };

  const getTableCol = () => {
    if (oobSubmoduleMeta && oobSubmoduleMeta.controlType === "form") {
      return cols;
    } else {
      let controlCols = controlList[0] && controlList[0].format;
      let columns = [];
      controlCols &&
        controlCols.forEach((col, index) => {
          if (col.valueSetBy !== "CLIENT" && index < 4) {
            columns.push({
              id: col.internalName,
              label: col.fieldLabel,
            });
          }
        });
      columns.push({ id: "status", label: "Status" });
      columns.push({ id: "fieldOob", label: "OOB" });
      return columns;
    }
  };

  const handlePageChange = (start, size) => {
    dispatch(fetchClientControl(submoduleVersionId, start, size, searchText));
  };

  const handleChange = (e) => {
    setSearchText(e.target.value);
    if (e.target.value === "")
      dispatch(
        fetchClientControl(
          submoduleVersionId,
          DEFAULT_START_INDEX,
          pageSize
        )
      );
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  const handleSearch = () => {
    if (searchText !== "")
      dispatch(
        fetchClientControl(
          submoduleVersionId,
          DEFAULT_START_INDEX,
          pageSize,
          searchText
        )
      );
  };

  const handleChecked = (value) => {
    const currentIndex = checked.findIndex((obj) => obj.id === value.id);
    const newChecked = [...checked];
    console.log("value", value);
    if (typeof value !== "boolean") {
      if (currentIndex === -1) {
        newChecked.push(value);
      } else {
        newChecked.splice(currentIndex, 1);
      }
      setChecked(newChecked);
      setAllChecked(false);
      handleSignoffDisable(newChecked);
      handleApproveDisable(newChecked);
    }
    if (typeof value === "boolean" && value === true) {
      setAllChecked(true);
      let newAllChecked = [];
      ClientControlData.map(
        (row, index) =>
          row.controlFieldStatus !== "APPROVED" &&
          !(
            loggedInUserData.user_type === "CLIENT" &&
            row.controlFieldStatus === "SIGN_OFF"
          ) &&
          newAllChecked.push(row)
      );
      setChecked(newAllChecked);
      handleSignoffDisable(newAllChecked);
      handleApproveDisable(newAllChecked);
    }
    if (typeof value === "boolean" && value === false) {
      setAllChecked(false);
      setChecked([]);
      handleSignoffDisable([]);
      handleApproveDisable([]);
    }


  };

  const handleSignoffDisable = (checked) => {
    let data = checked.filter(function (item) {
      return item.controlFieldStatus === "SIGN_OFF";
    });
    if (checked.length === 0 || data.length > 0)
      setIsSignoffDisable(true);
    else
      setIsSignoffDisable(false);
  }

  // const handleBulkSignoff = () => {
  //   let data = checked.filter(function (item) {
  //     return item.controlFieldStatus !== "SIGN_OFF";
  //   });
  //   let diff = checked.length - data.length;
  //   if (checked.length === 0)
  //     return {
  //       message: (
  //         <>Select control in Awaiting Sign-Off state to update status</>
  //       ),
  //       disable: true,
  //     };

  //   if (data.length === 0)
  //     return {
  //       message: (
  //         <>Select control in Awaiting Sign-Off state to update status</>
  //       ),
  //       disable: true,
  //     };

  //   if (data.length !== checked.length)
  //     return {
  //       message: (
  //         <>
  //           Are you sure you want to Sign Off <br />
  //           <br />
  //           {data.map((obj) => (
  //             <>
  //               {obj.label}
  //               <br />{" "}
  //             </>
  //           ))}
  //           <br />
  //           <em>
  //             <strong>Note:</strong> {diff}{" "}
  //             {diff === 1 ? `control is` : `controls are`} already in Signed Off
  //             state
  //           </em>
  //         </>
  //       ),
  //       disable: false,
  //     };

  //   if (data.length === checked.length)
  //     return {
  //       message: (
  //         <>
  //           Are you sure you want to Sign Off <br />
  //           <br />
  //           {data.map((obj) => (
  //             <>
  //               {obj.label}
  //               <br />{" "}
  //             </>
  //           ))}
  //           <br />
  //         </>
  //       ),
  //       disable: false,
  //     };
  // };

  const bulkSignOffControl = () => {
    let payload = [];
    checked
      //.filter((item) => item.controlFieldStatus !== "SIGN_OFF")
      .map((obj) => {
        let data = {};
        data["clientControlDataId"] = obj.id;
        data["status"] = "SIGN_OFF";
        return payload.push(data);
      });
    dispatch(bulkFieldStatus(payload));
  };

  const confirmSignOffControl = () => {
    let messageObj = {
      primaryButtonLabel: "Sign Off",
      //primaryButtonDisabled: handleBulkSignoff().disable,
      primaryButtonAction: () => {
        bulkSignOffControl();
      },
      secondaryButtonLabel: "Cancel",
      secondaryButtonAction: () => { },
      title: READY_TO_SIGNOFF,
      message: SIGN_OFF_CONFIRM,
    };
    dispatch(showMessageDialog(messageObj));
  };

  const handleApproveDisable = (checked) => {
    let data = checked.filter(function (item) {
      return item.controlFieldStatus !== "SIGN_OFF";
    });
    if (checked.length === 0 || data.length > 0)
      setIsApproveDisable(true);
    else
      setIsApproveDisable(false);
  }

  // const handleBulkApprove = () => {
  //   let data = checked.filter(function (item) {
  //     return item.controlFieldStatus === "SIGN_OFF";
  //   });
  //   let diff = checked.length - data.length;
  //   if (checked.length === 0)
  //     return {
  //       message: <>Select control in Signed Off state to update status</>,
  //       disable: true,
  //     };

  //   if (data.length === 0)
  //     return {
  //       message: <>Select control in Signed Off state to update status</>,
  //       disable: true,
  //     };

  //   if (data.length !== checked.length)
  //     return {
  //       message: (
  //         <>
  //           Are you sure you want to Approve <br />
  //           <br />
  //           {data.map((obj) => (
  //             <>
  //               {obj.label}
  //               <br />{" "}
  //             </>
  //           ))}
  //           <br />
  //           <em>
  //             <strong>Note:</strong> {diff}{" "}
  //             {diff === 1 ? `control is` : `controls are`} already in Awaiting
  //             Sign-Off state
  //           </em>
  //         </>
  //       ),
  //       disable: false,
  //     };

  //   if (data.length === checked.length)
  //     return {
  //       message: (
  //         <>
  //           Are you sure you want to Sign Off <br />
  //           <br />
  //           {data.map((obj) => (
  //             <>
  //               {obj.label}
  //               <br />{" "}
  //             </>
  //           ))}
  //         </>
  //       ),
  //       disable: false,
  //     };
  // };

  const bulkApproveControl = () => {
    let payload = [];
    checked
      //.filter((item) => item.controlFieldStatus === "SIGN_OFF")
      .map((obj) => {
        let data = {};
        data["clientControlDataId"] = obj.id;
        data["status"] = "APPROVED";
        return payload.push(data);
      });
    dispatch(bulkFieldStatus(payload));
  };

  const confirmApproveControl = () => {
    let messageObj = {
      primaryButtonLabel: "Approve",
      //primaryButtonDisabled: handleBulkApprove().disable,
      primaryButtonAction: () => {
        bulkApproveControl();
      },
      secondaryButtonLabel: "Cancel",
      secondaryButtonAction: () => { },
      title: "Ready to approve?",
      message: `Please click on "Approve" to confirm your approval.`,
    };
    dispatch(showMessageDialog(messageObj));
  };

  useEffect(() => {

    if (featuresAssigned.indexOf(FIELD_APPROVE_ACTION) !== -1 || featuresAssigned.indexOf(FIELD_SIGN_OFF_ACTION) !== -1)
      tableConfig.checked = true;
    else
      tableConfig.checked = false;
  }, [featuresAssigned, loggedInUserData, tableConfig])

  useEffect(() => {
    if (bulkUpdate) {
      dispatch(
        fetchClientControl(
          submoduleVersionId,
          startIndex,
          pageSize
        )
      );
      setChecked([]);
      setAllChecked(false);
      setIsSignoffDisable(true);
      setIsApproveDisable(true);
    }
  }, [dispatch, submoduleVersionId, bulkUpdate, pageSize, startIndex]);

  useEffect(() => {
    dispatch(updateEntityId(clientId));
    dispatch(fetchMasterControl());
    dispatch(fetchClientSubmoduleById(submoduleId, moduleVersionId));
    if (loggedInUserData.user_type === "CLIENT") {
      dispatch(fetchClientModuleById(moduleId));
    } else {
      dispatch(fetchClientModuleById(moduleId, clientId));
    }
    dispatch(fetchClientSingleModuleAnalytics(moduleVersionId, clientId));
  }, [
    dispatch,
    clientId,
    moduleId,
    moduleVersionId,
    submoduleId, loggedInUserData.user_type
  ]);

  useEffect(() => {
    dispatch(
      fetchClientControl(
        submoduleVersionId,
        DEFAULT_START_INDEX,
        DEFAULT_PAGE_SIZE
      )
    );
  }, [dispatch, submoduleVersionId]);

  useEffect(() => {
    if(oobControlIdError || oobSubmoduleError)
      setApiError(handleIndividualClientFieldsError(oobControlIdError, oobSubmoduleError));
    else
      setApiError(false);
  },
    [oobControlIdError, oobSubmoduleError]
  );

  return (
    <MatContainer>
      {apiError ? (
        <Grid item xs={12} className={styles.error}>
          <Card className={apiError.messageType === "error" ? styles.errorCard : styles.warningCard}>
            <Typography variant="body2">
              {apiError.message}
            </Typography>
          </Card>
        </Grid>
      ) : (
          <>
            <BreadcrumbView options={BreadcrumbData}></BreadcrumbView>
            {/* below code need to uncomment after issue fixes of dashboard-controller apis */}
            <div className={styles.analyticsContainer}>
              <IndividualModuleAnalytics
                title={`${submoduleData && submoduleData.name} Progress`}
                analyticsData={singleSubmoduleAnalytics}
              />
            </div>
            <PageHeading
              heading={submoduleData && submoduleData.name}
              action={
                <Grid container style={{ width: "auto" }}>
                  <Search
                    handleChange={handleChange}
                    handleKeyPress={handleKeyPress}
                    handleSearch={handleSearch}
                  />
                </Grid>
              }
            />
            {ClientControlData.length > 0 ? (
              <MatCard>
                {(featuresAssigned.indexOf(FIELD_APPROVE_ACTION) !== -1 || featuresAssigned.indexOf(FIELD_SIGN_OFF_ACTION) !== -1) && <CardHeader
                  action={
                    <>
                      {featuresAssigned.indexOf(FIELD_SIGN_OFF_ACTION) !== -1 && <MatButton type="button" disabled={isSignoffDisable} onClick={confirmSignOffControl}>
                        Sign Off
                    </MatButton>}
                      {loggedInUserData.user_type !== "CLIENT" && featuresAssigned.indexOf(FIELD_APPROVE_ACTION) !== -1 && (
                        <MatButton
                          disabled={isApproveDisable}
                          style={{ marginLeft: "10px" }}
                          type="button"
                          onClick={confirmApproveControl}
                        >
                          Approve
                        </MatButton>
                      )}
                    </>
                  }
                />}
                <DataTable
                  //key={Math.random()}
                  cols={getTableCol()}
                  rows={ClientControlData}
                  config={tableConfig}
                  checkedStatus={checked}
                  allCheckedStatus={allChecked}
                  updateCheckedStatus={handleChecked}
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
          </>
        )}
    </MatContainer>
  );
};

export default IndividualClientFields;
