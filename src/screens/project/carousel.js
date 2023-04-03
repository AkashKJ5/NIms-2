import * as React from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import ListItems from "./list";
import MobileStepper from "@mui/material/MobileStepper";
import Paper from "@mui/material/Paper";
import { getProjectsCollection } from "../../rxdb/collections";
import { useDatabase } from "../../context/database";
import { useTheme } from "@mui/material/styles";

export default function TextMobileStepper({ filterValue, currentTab }) {
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const [maxLength, setMaxLength] = React.useState(0);
  const db = useDatabase();
  const [data, setData] = React.useState([]);
  const [username, setUsername] = React.useState(null);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  React.useEffect(() => {
    const userId = JSON.parse(localStorage.getItem("login")).user.id;
    setUsername(userId);
  }, [currentTab]);

  // getting the project details..
  React.useEffect(() => {
    const where = {
      isActive: true,
      status: { $ne: null },
      users: { $ne: [] },
    };

    if (currentTab === "Desnag") {
      where.hasDesnaggingPhase = true;
    }
    if (currentTab === "Fix") {
      where.hasFixingPhase = true;
    }

    if (!username) return;
    const subscription = getProjectsCollection(db)
      .find()
      .where(where)
      .$.subscribe((entries) => {
        if (entries) {
          const docs = entries.map((entry) => {
            if (entry.users.find((data) => data.id === username) !== undefined) {
              return {
                id: entry.id,
                name: entry.name,
                status: entry.status,
                type: entry.projectType ? entry.projectType.name : "N/A",
                address: entry.address ? entry.address : "N/A",
                location: entry.city ? entry.city : "N/A",
                contact: entry.customer ? entry.customer.name : "N/A",
              };
            } else {
              return null;
            }
          });
          setData(
            docs.filter((data) => {
              return data !== null;
            })
          );
          setMaxLength(
            docs.filter((data) => {
              return data !== null;
            }).length
          );
        } else {
          setData([]);
        }
      });
    return () => {
      subscription.unsubscribe();
    };
  }, [db, username, currentTab]);

  return (
    <>
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
          <div style={{ textAlign: "center" }}>
            {activeStep + 1}/{data.length}
          </div>
        )}

        <Box sx={{ width: "100%", p: 2 }}>
          <ListItems
            data={data.length > 0 ? data[activeStep] : null}
            currentTab={currentTab}
          />
        </Box>
        <MobileStepper
          variant=""
          steps={maxLength}
          position="static"
          activeStep={activeStep}
          className="customStepper"
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
    </>
  );
}
