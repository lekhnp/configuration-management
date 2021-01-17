import React from "react";
import { makeStyles } from "@material-ui/core";
import Fab from "@material-ui/core/Fab";
import Grid from "@material-ui/core/Grid";
import SearchIcon from "@material-ui/icons/Search";
import MatInputField from "../../components/MaterialUi/MatInputField";
import { SEARCH } from "../../utils/Messages";

const useStyles = makeStyles((theme) => ({
  search: {
    width: "37px",
    height: "30px",
    position: "absolute",
    right: "15px",
    marginTop: "6px",
  },
  filterDropdown: {
    display: "flex",
    position: "relative",
    paddingRight: "10px",
    minWidth: "300px",
  },
}));

const Search = (props) => {
  const styles = useStyles();

  return (
    <Grid item className={styles.filterDropdown}>
      <MatInputField
        value={props.searchText}
        onChange={props.handleChange}
        onKeyPress={props.handleKeyPress}
        label={SEARCH}
        name="searchBy"
      />
      <Fab color="primary" aria-label="add" className={styles.search}>
        <SearchIcon onClick={props.handleSearch} />
      </Fab>
    </Grid>
  );
};

export default Search;
