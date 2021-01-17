import React, { useState, useEffect, useRef } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { BlobServiceClient } from "@azure/storage-blob";
import CardHeader from "@material-ui/core/CardHeader";
import Typography from "@material-ui/core/Typography";
import { Divider, makeStyles } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import UploadIcon from "../../assets/images/cloud_upload-icon.svg";
import MatCard from "../MaterialUi/MatCard";
import ProgressCircular from "../../components/ProgressCircular";


// import { COMMON_ERROR_MESSAGE } from "../../utils/Messages";
import ddStyles from "./DropZone.module.scss";

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

const LetterUpload = (props) => {
  const [open, setOpen] = useState(false);
  const styles = useStyles();
  const fileInputRef = useRef();
  //const dispatch = useDispatch();
 
  const dragOver = (e) => {
    e.preventDefault();
  };

  const dragEnter = (e) => {
    e.preventDefault();
  };

  const dragLeave = (e) => {
    e.preventDefault();
  };

  const fileDrop = (e) => {
    e.preventDefault();
    const files = e.dataTransfer.files;

    if (files.length) {
      //handleFiles(files);
      handleOnDrop(files);
    }
  };

  const fileInputClicked = () => {
    fileInputRef.current.value =null;
    fileInputRef.current.click();
  };

  // Trigger onChange input upload...
  const filesSelected = () => {
    if (fileInputRef.current.files.length) {
      handleOnDrop(fileInputRef.current.files);
    }
  };

  const closeProgressDialog = () => {
    setOpen(false);
    props.resetFileData();
  };

  const [uploadSize, setUploadSize] = useState({});

  //latest code...

  const containerName = "documents";
  const containerURL =
    "https://letters.blob.core.windows.net/?sv=2019-12-12&ss=b&srt=sco&sp=rwdlacx&se=2021-12-01T03:32:56Z&st=2020-11-01T19:32:56Z&spr=https&sig=CzMxSbKU8twQ3%2Bg1VF8UFFreDSYPSTsdbabKKv%2BsKBo%3D";

  const blobServiceClient = new BlobServiceClient(containerURL);

  // Get a container client from the BlobServiceClient
  const containerClient = blobServiceClient.getContainerClient(containerName);

  const handleOnDrop = (files) => {
    uploadFiles(files);
  };

  const uploadFiles = async (files) => {
    const arrUploadedFiles = [];
    let len = 0;   
    setOpen(true);
    setUploadSize({
      current: 0,
      size: files.length,
    });
    for (const currentfile of files) {
      const blockBlobClient = containerClient.getBlockBlobClient(currentfile.name);

      blockBlobClient.uploadBrowserData(currentfile)
        // eslint-disable-next-line no-loop-func
        .then(() => {
          len = len + 1;
          //generatefileName(currentfile.name, filterValues);
          arrUploadedFiles.push({name: currentfile.name.replace(/.(doc|docx)$/i, '')});
          setUploadSize((state) => ({
            ...state,
            current: len,
          }));

          if (len === files.length) {
            // (!props?.errorData?.length && setTimeout(() => setOpen(false), 3000));
            props.onUploadSuccess(arrUploadedFiles);
          }
        })
        .catch((e) => {
          console.log(e.message);
        });
    }
  };

  const calcPercentage = ({ current = 0, size }) => {
    if (!size) {
      return 0;
    }

    const percentage = ((current / size) * 100).toFixed(0);
    return percentage;
  };
  return (
    <MatCard>
      <CardHeader
        className={styles.cardHeading}
        title={
          <Typography variant="h6" className={styles.cardHeadingSize}>
            <img
              src={UploadIcon}
              alt={UploadIcon + " icon"}
              className={styles.iconSize}
            />{" "}
            Import Portal
          </Typography>
        }
      />
      <Divider />
      <Grid container>
        <>
          {/* {false && (
              <Grid item xs={12} className={styles.error}>
                <Card className={styles.errorCard}>
                  <Typography variant="body2">
                    {COMMON_ERROR_MESSAGE}
                  </Typography>
                </Card>
              </Grid>
            )} */}
          <Grid item xs={12}>
            <div
              style={{ flex: 1, display: "flex" }}
              className={styles.cardContent}
            >
              <div className="content">
                <div className={ddStyles.dzContainer}>
                  <div
                    className={ddStyles.dropContainer}
                    onDragOver={dragOver}
                    onDragEnter={dragEnter}
                    onDragLeave={dragLeave}
                    onDrop={fileDrop}
                    onClick={fileInputClicked}
                  >
                    <div className={ddStyles.dropMessage}>
                      <div className={ddStyles.uploadIcon}></div>
                      Drag & Drop files here or click to upload
                      <br />
                      <span>(File Type Supported: DOCX)</span>
                    </div>
                    <input
                      ref={fileInputRef}
                      className={ddStyles.fileinput}
                      type="file"
                      accept=".docx"
                      multiple
                      onChange={filesSelected}
                    />
                  </div>
                  <div className={ddStyles.filedisplaycontainer}>
                  </div>
                </div>
              </div>
            </div>
            <Divider />
          </Grid>
        </>
      </Grid>
      {!!open && (
        <>
        <ProgressCircular
          handleClose={closeProgressDialog}
          open={open}
          value={calcPercentage(uploadSize)}
          current={uploadSize?.current}
          total={uploadSize?.size}
          errorData={props.errorData}
        />
       
        </>
      )}
    </MatCard>
  );
};

export default LetterUpload;
