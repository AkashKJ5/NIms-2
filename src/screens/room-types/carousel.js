/*___________________________________________
|                                            |
|     This file include carousel function    |
|          next and back button              |
|     ListItems this is an component file    |
|                                            |
|____________________________________________|
*/

import * as React from "react";

import {
  getLayoutCollection,
  getProjectFixing,
  getProjectSnagging,
} from "../../rxdb/collections";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import ListItems from "./carousel-list";
import MobileStepper from "@mui/material/MobileStepper";
import Paper from "@mui/material/Paper";
import { groupBy } from "lodash";
import { useDatabase } from "../../context/database";
import { useTheme } from "@mui/material/styles";

export default function TextMobileStepper({ filterValue, isDesnagProject }) {
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const [maxLength, setMaxLength] = React.useState(0);
  const db = useDatabase();
  const [data, setData] = React.useState([]);
  const [allItems, setAllItems] = React.useState([]);
  const [snaggedData, setSnaggedData] = React.useState(null);
  const [fixingData, setFixingData] = React.useState(null);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  /*___________________________________________________________________
  -                                                                    |
  -          getting fixing data having de-snagging                    |
  -                    status is FIXED                                 |
  -                                                                    |
  -                                                                    |
  _____________________________________________________________________|
  */
  React.useEffect(() => {
    if (
      isDesnagProject &&
      JSON.parse(localStorage.getItem("tab")).name.label === "Desnag"
    ) {
      console.log("after query", isDesnagProject);
      const projectId = localStorage.getItem("projectId");

      const subscription = getProjectFixing(db)
        .find()
        .where({
          isActive: true,
          "project.id": projectId,
          "fixingStatus.name": "fixed",
        })
        .sort({ lastmodifiedAt: "asc" })
        .$.subscribe((entries) => {
          console.log("fixing_data", entries);
          setFixingData(entries);
        });

      return () => {
        subscription.unsubscribe();
      };
    } else {
      return;
    }
  }, [db, isDesnagProject]);

  // React.useEffect(() => {
  //   const projectId = localStorage.getItem("projectId");
  //   const unitId = localStorage.getItem("unitId");
  //   const roomId = localStorage.getItem("roomId");

  //   const subscription = getProjectSnagging(db)
  //     .find()
  //     .where({
  //       isActive: true,
  //       "project.id": projectId,
  //       "units.id": unitId,
  //       "room.id": roomId,
  //       "snaggingStatus.name": "not_ok",
  //     })
  //     .sort({ lastmodifiedAt: "asc" })
  //     .$.subscribe((entries) => {
  //       console.log(entries);
  //       const docs = entries.map((entry) => {
  //         const matched = fixingData.find(
  //           (key) => key.snagging.id === entry.id
  //         );
  //         return matched ? entry : undefined;
  //       });
  //       const documents = entries.filter((data) => data !== undefined);
  //       console.log(documents);
  //       const entriesByItem = groupBy(entries, "item.id");
  //       console.log(entriesByItem, 'entriesByItem');
  //       const itemDocs = Object.keys(entriesByItem).map((key) => {
  //         return {
  //           id: key,
  //           data: entriesByItem[key].sort(
  //             //getting newly added snag record descending order
  //             (a, b) => new Date(b.lastmodifiedAt) - new Date(a.lastmodifiedAt)
  //           )[0],
  //         };
  //       });
  //       setAllItems(itemDocs.map((entry) => entry.data));
  //       setData(itemDocs.map((entry) => entry.data));
  //       setMaxLength(itemDocs.map((entry) => entry.data).length);
  //     });

  //   return () => {
  //     subscription.unsubscribe();
  //   };
  // }, [db, fixingData]);

  // React.useEffect(() => {
  //   if (!fixingData) return;
  //   const projectId = localStorage.getItem("projectId");
  //   const unitId = localStorage.getItem("unitId");

  //   const subscription = getProjectSnagging(db)
  //     .find()
  //     .where({
  //       isActive: true,
  //       "project.id": projectId,
  //       "units.id": unitId,
  //       "snaggingStatus.name": "not_ok",
  //     })
  //     .sort({ lastmodifiedAt: "asc" })
  //     .$.subscribe((entries) => {
  //       console.log(entries);
  //       const docs = entries.map((entry) => {
  //         const matched = fixingData.find(
  //           (key) => key.snagging.id === entry.id
  //         );
  //         return matched ? entry : undefined;
  //       });
  //       const documents = docs.filter((data) => data !== undefined);
  //       const entriesByItem = groupBy(documents, "item.id");
  //       const itemDocs = Object.keys(entriesByItem).map((key) => {
  //         return {
  //           id: key,
  //           data: entriesByItem[key].sort(
  //             //getting newly added snag record descending order
  //             (a, b) => new Date(b.lastmodifiedAt) - new Date(a.lastmodifiedAt)
  //           )[0],
  //         };
  //       });
  //       setAllItems(itemDocs.map((entry) => entry.data));
  //       setData(itemDocs.map((entry) => entry.data));
  //       setMaxLength(itemDocs.map((entry) => entry.data).length);
  //     });

  //   return () => {
  //     subscription.unsubscribe();
  //   };
  // }, [db, fixingData]);

  // get snagging data for fixing inspection
  React.useEffect(() => {
    if (
      localStorage.getItem("tab") &&
      fixingData === null &&
      (JSON.parse(localStorage.getItem("tab")).name.label === "Fix" ||
        JSON.parse(localStorage.getItem("tab")).name.label === "Desnag")
    ) {
      console.log(fixingData, 'fixingData');
      if (!localStorage.getItem("roomId")) return;
      const roomId = localStorage.getItem("roomId");
      const projectId = localStorage.getItem("projectId");
      const unitId = localStorage.getItem("unitId");

      const where = {
        isActive: true,
        "project.id": projectId,
        "units.id": unitId,
        "room.id": roomId,
        "snaggingStatus.name": "not_ok",
      };
      const subscription = getProjectSnagging(db)
        .find()
        .where(where)
        .sort({ lastmodifiedAt: "asc" })
        .$.subscribe((entries) => {
          console.log('entries',entries);
          const entriesByItem = groupBy(entries, "item.id");
          const itemDocs = Object.keys(entriesByItem).map((key) => {
            return {
              id: key,
              data: entriesByItem[key].sort(
                //getting newly added snag record descending order
                (a, b) =>
                  new Date(b.lastmodifiedAt) - new Date(a.lastmodifiedAt)
              )[0],
            };
          });
          setAllItems(itemDocs.map((entry) => entry.data));
          setData(itemDocs.map((entry) => entry.data));
          setMaxLength(itemDocs.map((entry) => entry.data).length);
        });
      return () => {
        subscription.unsubscribe();
      };
    } else {
      return;
    }
  }, [db]);

  React.useEffect(() => {
    if (
      localStorage.getItem("tab") &&
      JSON.parse(localStorage.getItem("tab")).name.label !== "Snag"
    )
      return;
    if (!localStorage.getItem("roomId")) return;
    const roomId = localStorage.getItem("roomId");
    const layoutId = localStorage.getItem("layoutId");
    const subscription = getLayoutCollection(db)
      .findOne({ selector: { id: layoutId } })
      .$.subscribe((entries) => {
        const docs = entries.roomTypes
          .filter((data) => data.id === roomId)
          .map((data) => data.projectItems);
        setAllItems(docs[0]);
        setData(docs[0]);
        setMaxLength(docs[0].length);
      });

    return () => {
      subscription.unsubscribe();
    };
  }, [db]);

  // FILTERING PROJECTS BASED ON THE STATUS
  React.useEffect(() => {
    // if (allItems.length === 0) return;
    if (filterValue === "all" || allItems.length === 0) {
      setData(allItems);
      return;
    }
    const docs = allItems.filter((item) => {
      return filterValue === item.section.aspect.id;
    });
    setData(docs);
    setMaxLength(docs.length);
    setActiveStep(activeStep < docs.length ? activeStep : 0);
  }, [filterValue, allItems]);

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
        <ListItems
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
