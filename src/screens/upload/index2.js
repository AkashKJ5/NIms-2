import * as markerjs2 from "markerjs2";

import { Alert, Button } from "@mui/material";
import { CardList, Container } from "./styled";

import React from "react";
import ResponsiveAppBar from "../../containers/tool-bar";
import { ScrollPanel } from "primereact/scrollpanel";
import Webcam from "react-webcam";
import { webkitFileStorage } from "../../webkit-file-storage";

const Upload = () => {
  const [value, setValue] = React.useState(null);
  const [isEmpty, setIsEmpty] = React.useState(false);
  const [isUploaded, setIsUploaded] = React.useState(false);

  function showMarker(target) {
    const markerArea = new markerjs2.MarkerArea(target);
    markerArea.addEventListener("render", (event) => {
      target.src = event.dataUrl;
      convertToImage(event.dataUrl);
    });
    markerArea.show();
  }

  //Reverting the file into our original blob or file
  const convertToImage = async (url) => {
    let file = await fetch(url)
      .then((r) => r.blob())
      .then(
        (blobFile) => new File([blobFile], new Date(), { type: "image/png" })
      );
    setValue(file);
  };

  // submit the images/ storing the images into our firebase bucket
  const submit = () => {
    if (!value) {
      setIsEmpty(true);
      return;
    } else {
      const type = JSON.parse(localStorage.getItem("tab")).name.label;

      webkitFileStorage(
        value,
        `${localStorage.getItem("projectId")}/${localStorage.getItem(
          "unitId"
        )}/${localStorage.getItem("roomId")}/${type}`
      );
      setIsUploaded(true);
      setValue(null);
    }
  };

  const webcamRef = React.useRef(null);
  const [fileImage, setFileImage] = React.useState(null);

  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setFileImage(imageSrc);
    convertToImage(imageSrc);
  }, [webcamRef]);

  return (
    <>
      {isEmpty && (
        <Alert
          onClose={() => {
            setIsEmpty(false);
          }}
          severity="error"
        >
          Please select an Image!
        </Alert>
      )}

      {isUploaded && (
        <Alert
          onClose={() => {
            setIsUploaded(false);
          }}
          severity="success"
        >
          Image uploaded successfully!
        </Alert>
      )}
      <div
        style={{
          marginBottom: "100px",
        }}
      >
        <CardList>
          <div
            style={{
              textAlign: "center",
              marginTop: "1rem",
              marginBottom: ".5rem",
            }}
          >
            <div
              style={{
                marginTop: 10,
                border: ".5px solid #BDBDBD",
              }}
            >
              {value === null ? (
                <Webcam
                  audio={false}
                  mirrored={true}
                  height={400}
                  ref={webcamRef}
                  screenshotFormat="image/jpeg"
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
              <Button
                variant="outlined"
                onClick={() => capture()}
                style={{ marginRight: "10px" }}
              >
                Capture
              </Button>
              <Button variant="outlined" onClick={() => submit()}>
                Submit
              </Button>
            </div>
          </div>
        </CardList>
      </div>
    </>
  );
};

export default Upload;
