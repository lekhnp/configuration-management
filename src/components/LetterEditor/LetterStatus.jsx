import React from "react";

import CardHeader from "@material-ui/core/CardHeader";
import Typography from "@material-ui/core/Typography";
import { Divider, makeStyles } from "@material-ui/core";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Chip from "@material-ui/core/Chip";
import { TextField } from '@material-ui/core';
import StatusIcon from "../../assets/images/status-icon.svg";

import MatCard from "../MaterialUi/MatCard";

import { formatDate } from "../../utils/helpers";

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
  highlightedCell: {
    fontWeight: 500,
    width: "100px",
    padding: "9px 0px 9px 16px",
  },

  statusActive: {
    background: "#00c853",
    height:"25px"
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

    // const handleClientStatusLabel = (details) => {
    //     if (details.isDeleted) {
    //         return 'TERMINATED';
    //     } else if (details.clientStatus) {
    //         return 'INACTIVE';
    //     } else {
    //         return 'ACTIVE';
    //     }
    // };

    const handleClientStatusLabel = (status) => {
        if (status) {
            return 'ACTIVE';
        } 
    };

    const handleClientStatusClass = (status) => {
        if (status === "TERMINATED") {
            return styles.statusTerminated;
        } else if (status === "INACTIVE") {
            return styles.statusInactive;
        } else {
            return styles.statusActive;
        }
    };

    return (
      <MatCard className={styles.statusCard}>
        <CardHeader
          className={styles.cardHeading}
          title={
            <Typography variant="h6" className={styles.cardHeadingSize}>
              <img src={StatusIcon} alt={StatusIcon + " icon"} className={styles.iconSize} /> Letter Status
            </Typography>
          }
        />
        <Divider />
        <TableContainer>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell className={styles.highlightedCell}>
                  Status:
                </TableCell>
                <TableCell size="small">
                  <Chip
                    label={handleClientStatusLabel("ACTIVE")}
                    className={handleClientStatusClass(
                      handleClientStatusLabel("ACTIVE")
                    )}
                    color="primary"
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className={styles.highlightedCell}>
                  Effective Date:
                </TableCell>
                <TableCell className={styles.highlightedCell}>
                  <TextField
                    id="effectiveDate"
                    type="date"
                    defaultValue="2020-11-05"
                    
                     />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className={styles.highlightedCell}>
                  Term Date:
                </TableCell>
                <TableCell>
                <TextField
                    id="termDate"
                    type="date"
                    defaultValue="dd-mm-yy"
                    
                     />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className={styles.highlightedCell}>
                  Imported:
                </TableCell>
                <TableCell className={styles.highlightedCell}>
                  {formatDate("2020-08-16")}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className={styles.highlightedCell}>
                  Auto Configured:
                </TableCell>
                <TableCell className={styles.highlightedCell}>Yes</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className={styles.highlightedCell}>
                  JIRA #:{" "}
                </TableCell>
                <TableCell className={styles.highlightedCell}>
                  TMPLT-000000
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className={styles.highlightedCell}>
                  Updated By:
                </TableCell>
                <TableCell className={styles.highlightedCell}>Chay</TableCell>
              </TableRow>
              <TableRow className={styles.highlightedCell}>
                <TableCell className={styles.highlightedCell}>
                  Created At:
                </TableCell>
                <TableCell className={styles.highlightedCell}>
                  {formatDate("2020-08-17")}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </MatCard>
    );
}

export default LetterStatus;
