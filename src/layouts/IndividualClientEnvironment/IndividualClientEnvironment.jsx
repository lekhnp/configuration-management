import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import { CardContent } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
//import CardHeader from "@material-ui/core/CardHeader";
//import Chip from "@material-ui/core/Chip";
import MatButton from "../../components/MaterialUi/MatButton";
import MatCard from "../../components/MaterialUi/MatCard";
//import MatButton from "../../components/MaterialUi/MatButton";
import MatContainer from "../../components/MaterialUi/MatContainer";
import PageHeading from "../../components/PageHeading";
import DataTable from "../../components/DataTable";
//import ManageModule from "../../components/ManageModule";
import BreadcrumbView from "../../components/BreadcrumbView";
//import RateReviewIcon from "@material-ui/icons/RateReview";
//import DeleteIcon from "@material-ui/icons/Delete";
//import VisibilityIcon from "@material-ui/icons/Visibility";
//import ListAltIcon from '@material-ui/icons/ListAlt';
//import ModuleIcon from "../../assets/images/module-icon.svg";
//import { showMessageDialog } from "../../actions/MessageDialogActions";
//import { fetchOOBModule } from "../../actions/OOBModuleActions";
import { updateEntityId } from "../../actions/AppHeaderActions";
import { approveCustReqReady, handleIndividualClientEnvironmentError, NO_RECORDS_MESSAGE } from "../../utils/Messages";
//import { fetchClientModule } from "../../actions/ClientModuleActions";
//import { RESET_DEFAULTVERSION } from "../../utils/AppConstants";
import { CONFIGURATION_DEPLOYMENT_ACTION } from "../../utils/FeatureConstants";

const useStyles = makeStyles((theme) => ({
  card: {
    marginTop: "16px",
  },
  cardHeading: {
    paddingTop: "12px",
    paddingBottom: "10px",
  },
  cardHeadingSize: {
    fontSize: "18px",
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
  disableClick: {
    pointerEvents: "none",
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
  statusActive: {
    background: "#00c853",
  },
  statusInactive: {
    background: theme.palette.warning.main,
  },
}));

const IndividualClientEnvironment = () => {
  const history = useHistory();
  const styles = useStyles();
  const dispatch = useDispatch();
  //const { url } = useRouteMatch();
  //const [label, setLabel] = useState();
  const { clientId, environment } = useParams();
  const [apiError, setApiError] = useState(null);
  const getApiError = useSelector(
    (state) => state.ClientModule.getClientModulesError
  );
  const [checked, setChecked] = useState([]);
  const [allChecked, setAllChecked] = useState(false);
  const featuresAssigned = useSelector(
    (state) => state.User.features
  );
  // const loggedInUserData = useSelector(
  //     (state) => state.User.loggedInUser.details
  // );
  // const handleGlobalClass = (status) => {
  //     if (status === "Yes") {
  //         return styles.statusActive;
  //     } else return styles.statusInactive;
  // };

  function createData(id, module, submodule, section, field, oob, custom) {
    return { id, module, submodule, section, field, oob, custom };
  }

  const ClientModuleList = [
    createData(
      1,
      "Grievance",
      "Contents",
      "Expedited Criteria",
      "Expedited Criteria Requested",
      "Mandatory:No",
      "Mandatory:Yes"
    ),
    createData(
      2,
      "Grievance",
      "Contents",
      "Provider",
      "NPI",
      "Hidden:No",
      "Hidden:Yes"
    ),
    createData(
      3,
      "LTSS",
      "Workspace",
      "Episode",
      "Recieved Date",
      "Relabeled from: Received Date",
      "Relabeled from: Received Date/Times"
    ),
    createData(
      4,
      "LTSS",
      "Workspace",
      "Episode",
      "Enrollment Date",
      "Mandatory:No",
      "Mandatory:Yes"
    ),
  ];

  const handleBackButton = () => {
    history.push(`/client/config-deploy/${clientId}`);
  };

  const BreadcrumbData = [
    {
      id: "config",
      label: "Configuration Deployment",
      action: handleBackButton,
    },
    {
      id: "configEnvironment",
      label: environment,
    },
  ];

  const cols = [
    { id: "module", label: "Module" },
    { id: "submodule", label: "Component" },
    { id: "section", label: "Section" },
    { id: "field", label: "Field Name" },
    { id: "oob", label: "OOB Value" },
    { id: "custom", label: "Custom Value" },
  ];

  const tableConfig = {
    tableType: "",
    // iconType: "imgIcon",
    // iconSource: ModuleIcon,
    checked: true,
  };

  const handleChecked = (value) => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];
    if (typeof value !== "boolean" && !allChecked) {
      if (currentIndex === -1) {
        newChecked.push(value);
      } else {
        newChecked.splice(currentIndex, 1);
      }
      setChecked(newChecked);
    }
    if (typeof value === "boolean" && value === true) {
      setAllChecked(true);
      let newAllChecked = [];
      ClientModuleList.map((row, index) => newAllChecked.push(row.id));
      setChecked(newAllChecked);
    }
    if (typeof value === "boolean" && value === false) {
      setAllChecked(false);
      setChecked([]);
    }
  };

  useEffect(() => {
    dispatch(updateEntityId(clientId));
  }, [dispatch, clientId]);

  useEffect(() => {
    if(getApiError)
      setApiError(handleIndividualClientEnvironmentError(getApiError));
    else
      setApiError(false);
  },
    [getApiError]
  );


  return (
    <MatContainer>
      <BreadcrumbView options={BreadcrumbData}></BreadcrumbView>
      <PageHeading
        heading={
          approveCustReqReady(environment)
        }
        action={
          <Grid container style={{ width: "auto" }}>
            {featuresAssigned.indexOf(CONFIGURATION_DEPLOYMENT_ACTION) !== -1 && <Grid item style={{ display: "flex", alignItems: "center" }}>
              <MatButton>Deploy</MatButton>
            </Grid>}
          </Grid>
        }
      />
      {apiError ? (
        <Grid item xs={12} className={styles.error}>
          <Card className={apiError.messageType === "error" ? styles.errorCard : styles.warningCard}>
            <Typography variant="body2">
              {apiError.message}
            </Typography>
          </Card>
        </Grid>
      ) : ClientModuleList.length > 0 ? (
        <MatCard className={styles.card}>
          {/* <CardHeader
            className={styles.cardHeading}
            title={
              <Typography variant="h6" className={styles.cardHeadingSize}>
                {"Approved custom requests ready for deployment to: " +
                  environment}
              </Typography>
            }
          /> */}
          {/* <Divider /> */}
          {/* <CardContent> */}
          <DataTable
            cols={cols}
            rows={ClientModuleList}
            config={tableConfig}
            checkedStatus={checked}
            allCheckedStatus={allChecked}
            updateCheckedStatus={handleChecked}
          />
          {/* </CardContent> */}
        </MatCard>
      ) : (
            <MatCard>
              <CardContent className={styles.noDataCard}>
                <Typography variant="h5">{NO_RECORDS_MESSAGE}</Typography>
              </CardContent>
            </MatCard>
          )}
    </MatContainer>
  );
};

export default IndividualClientEnvironment;
