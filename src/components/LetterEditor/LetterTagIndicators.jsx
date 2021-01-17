import React from "react";

import CardHeader from "@material-ui/core/CardHeader";
import Typography from "@material-ui/core/Typography";
import { Divider, makeStyles } from "@material-ui/core";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Search from "../../components/Search";
import TagIndIcon from "../../assets/images/tagInd-icon.svg";

// import Chip from "@material-ui/core/Chip";

import MatCard from "../MaterialUi/MatCard";

// import { formatDate } from "../../utils/helpers";

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
  searchLCell:{
    maxWidth:"175px",
    width:"40%",
    padding:"4px 2px 4px 16px",
    display:"inline-block",
    borderBottom:"0px",
    fontSize:"13px"
  },

  searchRCell:{
    maxWidth:"175px",
    width:"60%",
    padding:"4px 2px 4px 16px",
    display:"inline-block",
    borderBottom:"0px",
    fontSize:"13px"
  },

  suggestion:{
      fontSize: "18px",
      fontWeight: "bold",
      borderBottom:"none",
      padding:"12px 2px 0px 16px"
  },

  highlightedCell: {
    borderBottom:"0px",
    padding:"8px 2px 2px 16px"
  },

  tagHeading:{
    fontWeight:"bold",
    fontSize:"15px",
    padding:"8px 2px 2px 16px"
  },

  statusActive: {
    background: "#00c853",
  },
  statusInactive: {
    background: theme.palette.warning.main,
  },
  statusTerminated: {
    background: theme.palette.error.main,
  },
}));

const LetterTagIndicators = () => {
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

    // const handleClientStatusLabel = (status) => {
    //     if (status) {
    //         return 'ACTIVE';
    //     } 
    // };

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
              <img src={TagIndIcon} alt={TagIndIcon + " icon"} className={styles.iconSize} /> Tag Indicators
            </Typography>
          }
        />
        <Divider />
        <TableContainer>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell className={styles.highlightedCell}>
                  <Search
                  // handleChange={handleChange}
                  // handleKeyPress={handleKeyPress}
                  // handleSearch={handleSearch}
                  />
                  
                </TableCell>
              </TableRow>
             <TableRow>
                 <TableCell className={styles.suggestion}>Suggested</TableCell>
             </TableRow>
              <TableRow>
                <TableCell className={styles.tagHeading}>
                Member Demographic Tags
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className={styles.searchLCell}>
                  <label style={{backgroundColor: '#00FEFE'}}>Member Address Line 1</label>
                </TableCell>
                <TableCell className={styles.searchRCell}>
                  Prints the Member’s 1st row of their address
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className={styles.searchLCell}>
                <label style={{backgroundColor: '#00FEFE'}}>Member Address Line 2</label>
                </TableCell>
                <TableCell className={styles.searchRCell}>
                  Prints the Member’s 2nd row of their address
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className={styles.searchLCell}>
                <label style={{backgroundColor: '#00FEFE'}}>Member Address Line 3</label>
                </TableCell>
                <TableCell className={styles.searchRCell}>
                  Prints the Member’s 3rd row of their address
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell className={styles.tagHeading}>
                User Demographic Tags
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className={styles.searchLCell}>
                  <label style={{backgroundColor: '#00FF00'}}>User Email Address</label>
                </TableCell>
                <TableCell className={styles.searchRCell}>
                  Prints the Member’s 1st row of their address
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className={styles.searchLCell}>
                <label style={{backgroundColor: '#00FF00'}}>User First Name</label>
                </TableCell>
                <TableCell className={styles.searchRCell}>
                  Prints the Member’s 2nd row of their address
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className={styles.searchLCell}>
                <label style={{backgroundColor: '#00FF00'}}>User Full Name</label>
                </TableCell>
                <TableCell className={styles.searchRCell}>
                  Prints the Member’s 3rd row of their address
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </MatCard>
    );
}

export default LetterTagIndicators;
