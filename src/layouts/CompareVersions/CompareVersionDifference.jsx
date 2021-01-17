import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles, Divider } from "@material-ui/core";

import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import Typography from "@material-ui/core/Typography";

import MatCard from "../../components/MaterialUi/MatCard";
import PageHeading from "../../components/PageHeading";

import { useParams } from "react-router-dom";
import { fetchCompareVersion } from "../../actions/OOBModuleActions";

import CompareDifferenceData from "./CompareDifferenceData";
import CompareVersionLegend from "./CompareVersionLegend";
import CompareVersionHeading from "./CompareVersionHeading";
import { RESET_FETCH_COMPARE_VERSION } from "../../utils/AppConstants";
import {
  COMP_VERSION,
  handleCompareVersionDifferenceError,
  firstVersionLabel,
  secondVersionLabel,
} from "../../utils/Messages";
const useStyles = makeStyles((theme) => ({
  cardHeading: {
    paddingTop: "12px",
    paddingBottom: "10px",
  },
  cardHeadingSize: {
    fontSize: "16px",
  },
  card: {
    overflow: "visible",
  },
  compareGrid: {
    minWidth: "calc(50% - 20px)",
    maxWidth: "calc(50% - 20px)",
  },
  errorCard: {
    background: theme.palette.error.main,
    boxShadow: "none !important",
    color: "#ffffff",
    padding: "12px 16px",
    margin: "10px 8px 14px 8px",
  },
  warningCard: {
    background: theme.palette.warning.main,
    boxShadow: 'none !important',
    color: '#ffffff',
    padding: '12px 16px',
    marginBottom: '14px'
  },
}));

const CompareVersionDifference = (props) => {
  const { moduleName } = props;
  const styles = useStyles();
  const dispatch = useDispatch();
  const [panelState, setPanelState] = useState({});
  const { moduleId, firstVersion, secondVersion } = useParams();

  const compareVersionsData = useSelector(
    (state) => state.OOBModule.compareVersion.data
  );

  const getCompareVersionError = useSelector(
    (state) => state.OOBModule.compareVersion.error
  );
  const [apiError, setApiError] = useState(null);

  const versionOneData =
    compareVersionsData &&
    compareVersionsData.oobModuleMasterVersion1.oobSubModules;

  const versionTwoData =
    compareVersionsData &&
    compareVersionsData.oobModuleMasterVersion2.oobSubModules;

  const changesVersionOne =
    compareVersionsData && compareVersionsData.changesVersion1;

  const changesVersionTwo =
    compareVersionsData && compareVersionsData.changesVersion2;

  const handlePanelState = (path) => {
    if (panelState[path]) {
      setPanelState((states) => ({ ...states, [path]: false }));
    } else {
      setPanelState((states) => ({ ...states, [path]: true }));
    }
  };

  useEffect(() => {
    dispatch({ type: RESET_FETCH_COMPARE_VERSION });
    dispatch(fetchCompareVersion(moduleId, firstVersion, secondVersion));
  }, [dispatch, moduleId, firstVersion, secondVersion]);

  useEffect(() => {
    if(getCompareVersionError)
      setApiError(handleCompareVersionDifferenceError(getCompareVersionError));
    else
      setApiError(false);
  },
    [getCompareVersionError]
  );

  return (
    <>
      <PageHeading heading={COMP_VERSION} action={<CompareVersionLegend />} />
      {apiError ? (
        <Grid container>
          <Grid item xs={12} className={styles.error}>
            <Card className={apiError.messageType === "error" ? styles.errorCard : styles.warningCard}>
              <Typography variant="body2">{apiError.message}</Typography>
            </Card>
          </Grid>
        </Grid>
      ) : (
        <>
          <CompareVersionHeading heading={moduleName} />
          <Grid container wrap="nowrap">
            <Grid item xs className={styles.compareGrid}>
              <MatCard className={styles.card}>
                <CardHeader
                  className={styles.cardHeading}
                  title={
                    <Typography variant="h6" className={styles.cardHeadingSize}>
                      {firstVersionLabel(firstVersion)}
                    </Typography>
                  }
                />
                <Divider />
                <div>
                  {versionOneData && (
                    <CompareDifferenceData
                      versionDataList={versionOneData}
                      versionChanges={changesVersionOne}
                      panelState={panelState}
                      handlePanelState={handlePanelState}
                      side="left"
                    />
                  )}
                </div>
              </MatCard>
            </Grid>
            <Grid item xs style={{ maxWidth: "40px" }}></Grid>
            <Grid item xs className={styles.compareGrid}>
              <MatCard className={styles.card}>
                <CardHeader
                  className={styles.cardHeading}
                  title={
                    <Typography variant="h6" className={styles.cardHeadingSize}>
                      {secondVersionLabel(secondVersion)}
                    </Typography>
                  }
                />
                <Divider />
                <div>
                  {versionTwoData && (
                    <CompareDifferenceData
                      versionDataList={versionTwoData}
                      versionChanges={changesVersionTwo}
                      panelState={panelState}
                      handlePanelState={handlePanelState}
                      side="right"
                    />
                  )}
                </div>
              </MatCard>
            </Grid>
          </Grid>
        </>
      )}
    </>
  );
};

export default CompareVersionDifference;
