import React from "react";

import { useHistory } from "react-router-dom";
// import CardHeader from "@material-ui/core/CardHeader";
// import Typography from "@material-ui/core/Typography";
//import { makeStyles } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import MatContainer from "../../components/MaterialUi/MatContainer";
import LetterAutVsInt from "../../components/LetterReports/LetterAutVsInt";
import LetterStatus from "../../components/LetterReports/LetterStatus";
import TatByLetter from "../../components/LetterReports/TatByLetter";

// import Card from "@material-ui/core/Card";
// import MatCard from "../../components/MaterialUi/MatCard";
import BreadcrumbView from "../../components/BreadcrumbView";


// import {
//   COMMON_ERROR_MESSAGE,
//   CONFIRM,
//   DELETE_HIERARCHY,
//   DELETE_HIERARCHY_FILE,
//   DOESNOT_EXIST,
// } from "../../utils/Messages";
// const useStyles = makeStyles((theme) => ({
//     statusCard: {
//         flex: 1,
//       },
     
//   cardHeading: {
//     paddingTop: "12px",
//     paddingBottom: "10px",
//   },
//   cardHeadingSize: {
//     fontSize: "16px",
//     display: "flex",
//     alignItems: "center"
//   },
//   iconSize:{
//     fontSize: "16px",
//     paddingRight: "5px",
//     width: "18px"
//   },
//   cardContent: {
//     display: "inline-block",
//     listStyle: "none",
//     fontSize: "13px",
//     paddingLeft: "20px",
//   },
 

//   hyperLink: {
//     color: "#3e719e",
//     textDecoration: "none",
//     "&:active, &:hover, &:focus": {
//       outline: "none",
//       textDecoration: "none",
//       color: "#72afd2",
//     },
//   },

//   saveButton: {
//     float: "right",
//     margin: "10px",
//     borderRadius: "4px",
//   },
// }));

const LetterReports = () => {
  //const styles = useStyles();
  const history = useHistory();
  //const [apiError, setApiError] = useState(null);
  const handleBackButton = () => {
    history.goBack();
  };
  const BreadcrumbData = [
    {
      id: "automationMetId",
      label: "Automation Metrics",
      action: handleBackButton,
    },
    {
      id: "letterReports",
      label: "Reporting and Metrics",
    },
  ];


  return (
    <MatContainer>
      {/* {apiError && !clientInfo && (
        <Grid item xs={12} className={styles.col}>
          <Card className={styles.errorCard}>
            <Typography variant="body2">{apiError}</Typography>
          </Card>
        </Grid>
      )} */}
      {/* {!apiError && clientInfo && (
        <PageHeading heading={clientInfo.clientName + `'s Profile`} />
      )} */}
      <BreadcrumbView options={BreadcrumbData}></BreadcrumbView>
      <Grid container>
        <Grid item xs={6}>
          {/* {!apiError && clientInfo && <LetterDetails details={clientInfo} />} */}
          <LetterStatus />
        </Grid>
        <Grid item xs={6}>
          <LetterAutVsInt />
        </Grid>
        <Grid item xs={12}>
            <TatByLetter/>
        </Grid>
       
      </Grid>
    </MatContainer>
  );
};

export default LetterReports;
