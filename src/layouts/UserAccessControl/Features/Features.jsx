import React, { useEffect } from "react";
// import { useHistory, useRouteMatch } from 'react-router-dom';
// import { makeStyles } from '@material-ui/core';
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import MatCard from "../../../components/MaterialUi/MatCard";
// import MatButton from "../../../components/MaterialUi/MatButton";
import PageHeading from "../../../components/PageHeading";
import DataTable from "../../../components/DataTable";
import { fetchFeatures } from "../../../actions/FeatureActions";
import RateReviewIcon from "@material-ui/icons/RateReview";

import { formatDate } from "../../../utils/helpers";

// import EditIcon from '@material-ui/icons/Edit';
// import DeleteIcon from '@material-ui/icons/Delete';

// const useStyles = makeStyles((theme) => ({
//     globalConfigCard: {
//         marginTop: '0px',
//         marginBottom: '20px'
//     }
// }));

const cols = [
  { id: "featureName", label: "Featrue Name" },
  {id: "featureFor", label: "Feature Access for"},
  { id: "featureInternalName", label: "Internal Name" },
  { id: "updated_on", label: "Updated On", minWidth: "120px" },
  { id: "updatedByUser", label: "Updated By", minWidth: "150px" },
];

const Features = () => {
  const history = useHistory();
  // const { url } = useRouteMatch();
  // const styles = useStyles();
  const dispatch = useDispatch();
  const features = useSelector((state) =>
    state.Feature.data.list.map((data) => {
      data.updated_on = formatDate(data.updatedDate);
      data.featureInternalName = data.featureInternalName || "";
      data.updatedByUser = data.updatedByUser || "";
      return data;
    })
  );

  const tableConfig = {
    tableType: "",
    actions: {
      icon: <RateReviewIcon color="primary" />,
      tooltipText: "View & Update",
      action: (data) => {
        history.push(`/admin/access-control/feature-details/${data.id}`);
      },
    },
  };

  useEffect(() => {
    dispatch(fetchFeatures());
  }, [dispatch]);

  return (
    <>
      <PageHeading
        heading="Features"
        // action={
        //     <MatButton>Add New Feature</MatButton>
        // }
      />
      <MatCard>
        <DataTable cols={cols} rows={features} config={tableConfig} />
      </MatCard>
    </>
  );
};

export default Features;
