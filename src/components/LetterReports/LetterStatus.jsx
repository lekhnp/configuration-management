import React from "react";

import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";

import Typography from "@material-ui/core/Typography";
import { Divider, makeStyles } from "@material-ui/core";
import {Doughnut } from "react-chartjs-2";

// import Chip from "@material-ui/core/Chip";
// import StatusIcon from "../../assets/images/status-icon.svg";

import MatCard from "../MaterialUi/MatCard";

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
    alignItems: "center",
  },
  iconSize: {
    fontSize: "16px",
    paddingRight: "5px",
    width: "18px",
  },
  highlightedCell: {
    fontWeight: 500,
    width: "100px",
    padding: "9px 0px 9px 16px",
  },

  statusActive: {
    background: "#00c853",
    height: "25px",
  },

  statusInactive: {
    background: theme.palette.warning.main,
  },
  statusTerminated: {
    background: theme.palette.error.main,
  },
}));

const LetterStatus = () => {
  const styles = useStyles();

  // const handleClientStatusLabel = (status) => {
  //   if (status) {
  //     return "ACTIVE";
  //   }
  // };

  // const handleClientStatusClass = (status) => {
  //   if (status === "TERMINATED") {
  //     return styles.statusTerminated;
  //   } else if (status === "INACTIVE") {
  //     return styles.statusInactive;
  //   } else {
  //     return styles.statusActive;
  //   }
  // };

  return (
    <MatCard className={styles.statusCard}>
      <CardHeader
        className={styles.cardHeading}
        title={
          <Typography variant="h6" className={styles.cardHeadingSize}>
            {/* <img
              src={StatusIcon}
              alt={StatusIcon + " icon"}
              className={styles.iconSize}
            /> */}
            Letter Status
          </Typography>
        }
      />
      <Divider />
      <CardContent className={styles.cardContent}>
      <Doughnut
        data={{
          labels: ["Active", "Inactive", "Errors", "Letter Tagging", "Config Automation", "Awaiting Import"],
          datasets: [
            {
              backgroundColor: ["#00a65a", "#f56954", "#f39c12", "#00c0ef", "#3c8dbc", "#d2d6de"],
              hoverBackgroundColor: ["#00a65a", "#f56954", "#f39c12", "#00c0ef", "#3c8dbc", "#d2d6de"],
              data: [20, 35, 15, 15, 10, 5],
              fontColor:"fff",
            },
          ],
        }}
        options={{
          cutoutPercentage: 45,
          responsive: true,
          legend: {
            display: true,
            position: "right",
            labels: {
              padding: 15,
              usePointStyle: true,
              fontSize: 14,
              fontColor: "#000",
              fontStyle: "500",
            },
          },
          plugins: {
            datalabels: {
              color: "white",
              formatter: (value, ctx) => {
                // const label =
                //   parseFloat(
                //     (
                //       (value / analyticsData[dataKey].controls) *
                //       100
                //     )
                //       .toFixed(1)
                //       .toString()
                //   ) + "%"; //ctx.chart.data.labels[ctx.dataIndex];
                //return label;
              },
            },
          },
        }}
      />
       </CardContent>
    </MatCard>
  );
};

export default LetterStatus;
