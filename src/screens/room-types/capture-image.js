import * as marker from "markerjs2";

import { Alert, Button, Fab, IconButton } from "@mui/material";
import React, { useState } from "react";
import {
  addDesnagUrls,
  addFixingUrls,
  addSnaggingUrls,
  editProjectDesnagging,
  editProjectFixing,
  editProjectSnagging,
} from "../../controller/project-result-controller";

import AddIcon from "@mui/icons-material/Add";
import ItemsDescription from "./description";
import { PhotoCamera } from "@mui/icons-material";
import Webcam from "react-webcam";
import { useAuth } from "../../context/auth";
import { useDatabase } from "../../context/database";
import { webkitFileStorage } from "../../webkit-file-storage";

const UploadImage = ({ item, existId, fixedData, status, priority,statusObj,priorityObj }) => {
  const [value, setValue] = React.useState(null);
  const [openCamera, setOpenCamera] = React.useState(false);
  const camera = React.useRef(null);
  const [fileImage, setFileImage] = React.useState(null);
  const [image, setImage] = React.useState("");
  const [imageName, setImageName] = React.useState("");
  const db = useDatabase();
  const [uploadMessage, setUploadMessage] = React.useState({
    severity: "success",
    message: "successfully uploaded !",
    isUploaded: false,
  });

  const [newItemAdded, setNewItemAdded] = React.useState({
    severity: "success",
    message: "successfully uploaded !",
    isUploaded: false,
  });

  const auth = useAuth();

  console.log("existId", existId);

  /*
  ____________________# Storing the Image #_______________________
  -                                                               |
  - webkitFileStorage (function type) which will take             |
    care of storing the image into webkit Filesystem.             |
  - image is the actual image file (object type)                  |
  - data.path is location where image gets stored                 |
  -                                                               |
  - db local RXdb database                                        |
  - addInspectionResults (function type) which will take          |
    care of storing project result.                               |
  - auth.auth (type object) user credential                       |
  - imageName + ".png"  name of the stored image                  |
  -                                                               |
  ________________________________________________________________|
  */
  const [descriptionValue, setDescriptionValue] = useState("N/A");

  const submit = async () => {
    const tabStatus = JSON.parse(localStorage.getItem("tab")).name.label;

    if (!image) return;

    let data = {
      existId: existId,
      isActive: true,
      status: statusObj,
      priority: priorityObj,
      description: descriptionValue,
      project: { id: localStorage.getItem("projectId") },
      units: { id: localStorage.getItem("unitId") },
      room: { id: localStorage.getItem("roomId") },
      item: { id: item.id, details: item.details },
      section: item.section,
      aspect: item,
      path: `${localStorage.getItem("projectId")}/${localStorage.getItem(
        "unitId"
      )}/${localStorage.getItem("roomId")}/${tabStatus}/${imageName}.png`,
      file: image,
    };

    // uploading the image to webkit
    webkitFileStorage(image, data.path);
    setImage(null);

    if (tabStatus === "Fix") {
      fixing(db, { ...data, snagging: { id: item.id } }, auth.auth);
    } else if (tabStatus === "Snag") {
      snagging(db, data, auth.auth);
    } else if (tabStatus === "Desnag") {
      desnagging(
        db,
        {
          ...data,
          snagging: { id: item.id },
          fixing: fixedData ? { id: fixedData.id } : null,
        },
        auth.auth
      );
    }
  };

  const snagging = (db, data, auth) => {
    if (existId === null) {
      // creating the results
      addSnaggingUrls(db, data, auth).then((data) => {
        if (data) {
          setFileImage(null);
          setValue(null);
          setUploadMessage({ ...uploadMessage, isUploaded: true });
        } else {
          setUploadMessage({
            ...uploadMessage,
            isUploaded: true,
            message: "loading failed !",
          });
        }
      });
    } else {
      // edit functionality
      editProjectSnagging(db, data, auth).then((data) => {
        if (data) {
          setFileImage(null);
          setValue(null);
          setUploadMessage({ ...uploadMessage, isUploaded: true });
        } else {
          setUploadMessage({
            ...uploadMessage,
            isUploaded: true,
            message: "loading failed !",
          });
        }
      });
    }
  };

  // fixing inspection
  const fixing = (db, data, auth) => {
    if (existId === null) {
      addFixingUrls(db, data, auth).then((data) => {
        if (data) {
          setFileImage(null);
          setValue(null);
          setUploadMessage({ ...uploadMessage, isUploaded: true });
        } else {
          setUploadMessage({
            ...uploadMessage,
            isUploaded: true,
            message: "loading failed !",
          });
        }
      });
    } else {
      editProjectFixing(db, data, auth).then((data) => {
        if (data) {
          setFileImage(null);
          setValue(null);
          setUploadMessage({ ...uploadMessage, isUploaded: true });
        } else {
          setUploadMessage({
            ...uploadMessage,
            isUploaded: true,
            message: "loading failed !",
          });
        }
      });
    }
  };

  // de-snagging inspection
  const desnagging = (db, data, auth) => {
    if (existId === null) {
      addDesnagUrls(db, data, auth).then((data) => {
        if (data) {
          setFileImage(null);
          setValue(null);
          setUploadMessage({ ...uploadMessage, isUploaded: true });
        } else {
          setUploadMessage({
            ...uploadMessage,
            isUploaded: true,
            message: "loading failed !",
          });
        }
      });
    } else {
      editProjectDesnagging(db, data, auth).then((data) => {
        if (data) {
          setFileImage(null);
          setValue(null);
          setUploadMessage({ ...uploadMessage, isUploaded: true });
        } else {
          setUploadMessage({
            ...uploadMessage,
            isUploaded: true,
            message: "loading failed !",
          });
        }
      });
    }
  };

  //........................Capturing the images...................
  const capture = React.useCallback(() => {
    const imageSrc = camera.current.getScreenshot();
    setFileImage(imageSrc);
    setValue(imageSrc);
  }, [camera]);

  //........................Adding some Market to captured image...................
  function showMarker(target) {
    const markerArea = new marker.MarkerArea(target);
    markerArea.addEventListener("render", (event) => {
      target.src = event.dataUrl;
      convertToImage(event.dataUrl);
    });
    markerArea.show();
  }

  //........................Generating random string for image name...................
  function randomString() {
    return [...Array(5)]
      .map((value) => (Math.random() * 1000000).toString(36).replace(".", ""))
      .join("");
  }

  /*
  ______________________# converting image blob to file #___________________________
  -
  - value  is the blob image value                                                                            |
  - url (string type) raw image .                                                   |
  - randomString (function type) generate random string.                            |
  -                                                                                 |
  -_________________________________________________________________________________|
  */

  const convertToImage = async (url) => {
    const name = randomString();
    setImageName(name);
    let file = await fetch(url)
      .then((r) => r.blob())
      .then(
        (blobFile) => new File([blobFile], name + ".png", { type: "image/png" })
      );
    setImage(file);
  };

  React.useEffect(() => {
    if (!value) return;
    convertToImage(value);
  }, [value]);

  return (
    <>
      <ItemsDescription
        handleChangedValue={(data) => {
          setDescriptionValue(data.target.value);
        }}
        optionValue={descriptionValue}
        itemId={item.id}
      />
      {uploadMessage.isUploaded && (
        <Alert
          onClose={() => {
            setUploadMessage({ ...uploadMessage, isUploaded: false });
          }}
          severity="success"
        >
          Image uploaded successfully!
        </Alert>
      )}

      {newItemAdded.isUploaded && (
        <Alert
          onClose={() => {
            setNewItemAdded({ ...newItemAdded, isUploaded: false });
          }}
          severity="success"
        >
          New Item Added successfully!
        </Alert>
      )}

      {status === "ok" || status === "not_ok" || openCamera ? (
        <div
          style={{
            marginBottom: "100px",
            marginTop: "2rem",
          }}
        >
          <div>
            <div
              style={{
                textAlign: "center",
              }}
            >
              <div>
                {value === null ? (
                  <Webcam
                    audio={false}
                    mirrored={true}
                    width={250}
                    ref={camera}
                    screenshotFormat="image/jpeg"
                    videoConstraints={{ facingMode: "environment" }}
                  />
                ) : (
                  <img
                    id="target"
                    src={fileImage}
                    alt="screenshot"
                    onClick={(e) => showMarker(e.target)}
                  />
                )}
              </div>

              <div style={{ marginTop: 10 }}>
                {value === null ? (
                  <Button
                    variant="outlined"
                    onClick={() => capture()}
                    style={{ marginRight: "10px" }}
                  >
                    Capture
                  </Button>
                ) : (
                  <>
                    <Button
                      variant="outlined"
                      style={{ marginRight: "10px" }}
                      onClick={() => setValue(null)}
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="outlined"
                      style={{ marginRight: "10px" }}
                      onClick={() => submit()}
                    >
                      save
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <IconButton
            color="primary"
            aria-label="Capture Image"
            component="label"
            onClick={() => setOpenCamera(true)}
          >
            <PhotoCamera
              className="cameraStyle"
              style={{ width: "4rem", height: "auto" }}
            />
          </IconButton>
            <Fab
              color="primary"
              aria-label="add"
              style={{
                position: "fixed",
                right: "30px",
                bottom: "75px",
              }}
              onClick={() => {
                setNewItemAdded({
                  severity: "success",
                  message: "new Item added successfully !",
                  isUploaded: true,
                });
              }}
            >
              <AddIcon />
            </Fab>
        </div>
      )}
    </>
  );
};

export default UploadImage;
