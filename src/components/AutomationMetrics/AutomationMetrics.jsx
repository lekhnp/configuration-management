import React from "react";
import {Link} from "react-router-dom"
import CardHeader from "@material-ui/core/CardHeader";
import Typography from "@material-ui/core/Typography";
import { Divider, makeStyles } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import MetricsIcon from "../../assets/images/metrics-icon.svg";
import MatCard from "../../components/MaterialUi/MatCard";
import 'font-awesome/css/font-awesome.min.css';
import metStyles from "./AutMetrics.module.scss";

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
    paddingRight: "5px",
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

const AutomationMetrics = () => {
  const styles = useStyles();
  // const clientId = useSelector((state) => state.Header.entityId);
  const clientId = 2
  return (
    <MatCard>
      <CardHeader
        className={styles.cardHeading}
        title={
          <Typography variant="h6" className={styles.cardHeadingSize}>
            <img
              src={MetricsIcon}
              alt={MetricsIcon + " icon"}
              className={styles.iconSize}
            />
            Metrics
          </Typography>
        }
      />
      <Divider />
      <Grid container className={metStyles.metContainer} spacing={2}>
        <Grid item xs={12} sm={6} md={3}>
          <div className={`${metStyles.bgAqua} ${metStyles.smallBox}`}>
            <div className={metStyles.inner}>
              <h3>16</h3>
              <p>Imported Templates</p>
            </div>
            <div className={metStyles.icon}>
              <i className="fa fa-cloud-upload"></i>
            </div>
            <Link
              // onClick={handleReports}
              to={`/client/${clientId}/letter-Reports`}
              className={metStyles.smallBoxFooter}
            >
              More info <i className="fa fa-arrow-circle-right"></i>
            </Link>
          </div>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <div className={`${metStyles.bgGreen} ${metStyles.smallBox}`}>
            <div className={metStyles.inner}>
              <h3>
                81<sup>%</sup>
              </h3>

              <p>Fully Automated</p>
            </div>
            <div className={metStyles.icon}>
              <i className="fa fa-gears"></i>
            </div>
            <Link
              // onClick={handleReports}
              to={`/client/${clientId}/letter-Reports`}
              className={metStyles.smallBoxFooter}
            >
              More info <i className="fa fa-arrow-circle-right"></i>
            </Link>
          </div>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <div className={`${metStyles.bgYellow} ${metStyles.smallBox}`}>
            <div className={metStyles.inner}>
              <h3>3</h3>

              <p>Automated Tagging Errors</p>
            </div>
            <div className={metStyles.icon}>
              <i className="fa fa-inbox"></i>
            </div>
            <Link
              // onClick={handleReports}
              to={`/client/${clientId}/letter-Reports`}
              className={metStyles.smallBoxFooter}
            >
              More info <i className="fa fa-arrow-circle-right"></i>
            </Link>
          </div>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
         <div className={`${metStyles.bgRed} ${metStyles.smallBox}`}>
            <div className={metStyles.inner}>
              <h3>2</h3>

              <p>Failed/Rejected</p>
            </div>
            <div className={metStyles.icon}>
              <i className="fa fa-thumbs-down"></i>
            </div>
            <Link
              // onClick={handleReports}
              to={`/client/${clientId}/letter-Reports`}
              className={metStyles.smallBoxFooter}
            >
              More info <i className="fa fa-arrow-circle-right"></i>
            </Link>
          </div>
        </Grid>
      </Grid>
    </MatCard>
  );
};

export default AutomationMetrics;
