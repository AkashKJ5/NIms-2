import * as React from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CarouselList from "./carouselList";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import MobileStepper from "@mui/material/MobileStepper";
import Paper from "@mui/material/Paper";
// import { getProjectResultsCollection } from "../../rxdb/collections";
import { useDatabase } from "../../context/database";
import { useTheme } from "@mui/material/styles";

export default function TextMobileStepper() {
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const [maxLength, setMaxLength] = React.useState(0);
  const [data, setData] = React.useState([]);
  const db = useDatabase();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  // React.useEffect(() => {
  //   if (!localStorage.getItem("roomId")) return;
  //   const roomId = localStorage.getItem("roomId");
  //   const subscription = getProjectResultsCollection(db)
  //     .find()
  //     .where({ isActive: true, "roomType.id": roomId })
  //     .$.subscribe((entries) => {
  //       const docs = entries.map((entry) => {
  //         return {
  //           id: entry.id,
  //           roomType: entry.roomType,
  //           item: entry.item,
  //           aspects: entry.aspect,
  //           snagImageUrl: entry.snagImageUrl,
  //           deSnagUrl: entry.deSnagUrl,
  //           fixUrl: entry.fixUrl,
  //           description: entry.description,
  //           project: entry.project,
  //           priority: entry.priority,
  //           status: entry.status,
  //           units: entry.units,
  //         };
  //       });
  //       setData(docs);
  //       setMaxLength(docs.length);
  //     });

  //   return () => {
  //     subscription.unsubscribe();
  //   };
  // }, [db]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Paper
        square
        elevation={0}
        sx={{
          display: "flex",
          alignItems: "center",
          pl: 2,
          bgcolor: "background.default",
        }}
      />
      {data.length > 0 && (
        <div style={{ textAlign: "center", color: "#1976d2" }}>
          <span>
            {activeStep + 1}/{data.length}
          </span>
        </div>
      )}
      <Box sx={{ width: "100%", p: 2 }}>
        <CarouselList
          data={data.length > 0 ? data[activeStep] : null}
          handleNext={handleNext}
        />
      </Box>
      <MobileStepper
        variant=""
        steps={maxLength}
        position="static"
        className="customStepper"
        activeStep={activeStep}
        nextButton={
          data.length > 1 && (
            <Button
              size="small"
              onClick={handleNext}
              disabled={activeStep === maxLength - 1}
            >
              {theme.direction === "rtl" ? (
                <KeyboardArrowLeft />
              ) : (
                <KeyboardArrowRight />
              )}
            </Button>
          )
        }
        backButton={
          data.length > 1 && (
            <Button
              size="small"
              onClick={handleBack}
              disabled={activeStep === 0}
            >
              {theme.direction === "rtl" ? (
                <KeyboardArrowRight />
              ) : (
                <KeyboardArrowLeft />
              )}
            </Button>
          )
        }
      />
    </Box>
  );
}
