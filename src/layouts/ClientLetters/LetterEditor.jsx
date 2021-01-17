import React, { useState } from "react";

import { useHistory } from "react-router-dom";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";

import Typography from "@material-ui/core/Typography";
import { Divider, makeStyles } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import MatContainer from "../../components/MaterialUi/MatContainer";
import LetterDetails from "../../components/LetterEditor/LetterDetails";
import LetterStatus from "../../components/LetterEditor/LetterStatus";
import LetterTagIndicators from "../../components/LetterEditor/LetterTagIndicators";
import LetterTimeLine from "../../components/LetterEditor/LetterTimeLine";
import WordEditor from "../../components/LetterEditor/WordEditor";
import LetterComments from "../../components/LetterEditor/LetterComments";
// import Card from "@material-ui/core/Card";
import MatCard from "../../components/MaterialUi/MatCard";
import BreadcrumbView from "../../components/BreadcrumbView";
import MatButton from "../../components/MaterialUi/MatButton";
import PreviewIcon from "../../assets/images/preview-icon.svg";

// import {
//   COMMON_ERROR_MESSAGE,
//   CONFIRM,
//   DELETE_HIERARCHY,
//   DELETE_HIERARCHY_FILE,
//   DOESNOT_EXIST,
//   DOWNLOAD_SAMPLE,
//   DRAG_AND_DROP_EXCEL,
//   UPLOAD_HIERARCHY,
//   fileRejectedError,
//   fileRemoved,
//   fileSuccessAdded,
// } from "../../utils/Messages";
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

  saveButton: {
    float: "right",
    margin: "10px",
    borderRadius: "4px",
    "&:hover":{
      backgroundColor:"#4054b2"
    }
  },
  // btn: {
  //   borderRadius: "4px",
  //   margin: "8px 4px",
  //   padding: "7px 16px",
  //   "&:hover":{
  //     backgroundColor:"#4054b2"
  //   }
  // },
}));

const LetterEditor = () => {
  const styles = useStyles();
  const history = useHistory();
  // const [apiError, setApiError] = useState(null);

  const handleBackButton = () => {
    history.goBack();
  };
  const BreadcrumbData = [
    {
      id: "templateId",
      label: "Template Library",
      action: handleBackButton,
    },
    {
      id: "letterEditor",
      label: "Letter Configuration Editor",
    },
  ];
  //   const clientInfo = useSelector(
  //     (state) => state.Client.clientByIdDetails.details
  //   );

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
        <Grid item xs={8}>
          {/* {!apiError && clientInfo && <LetterDetails details={clientInfo} />} */}
          <LetterDetails />
        </Grid>
        <Grid item xs={4}>
          <LetterStatus />
        </Grid>
        <Grid item xs={8}>
          <MatCard className={styles.statusCard}>
            <CardHeader
              className={styles.cardHeading}
              title={
                <Typography variant="h6" className={styles.cardHeadingSize}>
                   <img src={PreviewIcon} alt={PreviewIcon + " icon"} className={styles.iconSize} /> Letter Preview
                </Typography>
              }
            />
            <Divider />
            <CardContent>
            <WordEditor />
            </CardContent>
            <MatButton
              type="submit"
              className={styles.saveButton}
              color="primary"
            >
              Save
            </MatButton>
          </MatCard>
        </Grid>
        <Grid item xs={4}>
          <Grid item xs={12}>
            <LetterTagIndicators />
          </Grid>
          <Grid item xs={12}>
            <LetterComments />
          </Grid>
          <Grid item xs={12}>
            <LetterTimeLine />
          </Grid>
        </Grid>
      </Grid>
    </MatContainer>
  );
};

export default LetterEditor;
