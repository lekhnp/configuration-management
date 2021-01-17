import React from "react";

import CardHeader from "@material-ui/core/CardHeader";
import Typography from "@material-ui/core/Typography";
import { Divider, makeStyles } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import MatButton from "../MaterialUi/MatButton";
import CommentsIcon from "../../assets/images/comment-icon.svg";


import MatCard from "../MaterialUi/MatCard";

const useStyles = makeStyles((theme) => ({
  card: {
    marginTop: "16px",
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

  textField: {
    padding: "10px",
    width: "95%",
  },

  saveButton:{
      float:"right",
      margin:"10px",
      borderRadius:"4px",
      padding:"7px 15px",
      "&:hover":{
        backgroundColor:"#4054b2"
      }
  }
}));

const LetterComments = () => {
  const styles = useStyles();

  return (
    <MatCard className={styles.card}>
      <CardHeader
        className={styles.cardHeading}
        title={
          <Typography variant="h6" className={styles.cardHeadingSize}>
            <img src={CommentsIcon} alt={CommentsIcon + " icon"} className={styles.iconSize} /> Comments
          </Typography>
        }
      />
      <Divider />
      <TextField
        multiline
        rows={3}
        variant="outlined"
        className={styles.textField}
      ></TextField>
      <MatButton type="submit" className={styles.saveButton} color="primary">
        Save
      </MatButton>
    </MatCard>
  );
};

export default LetterComments;
