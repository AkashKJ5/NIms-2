import { Button, Stack } from "@mui/material";
import { Label, Text } from "../styled";

import { GridStack as BaseStack } from "../../components/generic/stack";
import { CardContainer } from "../../components/generic/container";
import { Container } from "../styled";
import EmptyList from "../../containers/empty-list";
import React from "react";
import ResponsiveAppBar from "../../containers/tool-bar";
import { ScrollPanel } from "primereact/scrollpanel";
import { StyledScrollPanel } from "../dashboard/styled";
import { getUnitsCollection } from "../../rxdb/collections";
import { useDatabase } from "../../context/database";
import { useNavigate } from "react-router-dom";

const Unit = () => {
  const db = useDatabase();
  const [data, setData] = React.useState([]);
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!localStorage.getItem("projectId")) return;
    const projectId = localStorage.getItem("projectId");
    const currentTab = JSON.parse(localStorage.getItem("tab")).name.label;

    let where = {
      isActive: true,
      status: { $ne: null },
      "project.id": projectId,
    };

    if (currentTab === "Snag") {
      where = {
        ...where,
        "status.name": "snagging",
      };
    } else if (currentTab === "Desnag") {
      where = {
        ...where,
        "status.name": "de-snagging",
      };
    } else if (currentTab === "Fix") {
      where = {
        ...where,
        "status.name": "fixing",
      };
    }

    const subscription = getUnitsCollection(db)
      .find()
      .where(where)
      .sort({ name: 1 })
      .$.subscribe((entries) => {
        const docs = entries.map((entry) => ({
          id: entry.id,
          name: entry.name,
          layout: entry.layout,
        }));
        setData(docs);
      });

    return () => {
      subscription.unsubscribe();
    };
  }, [db]);

  return (
    <>
      <Container>
        <ResponsiveAppBar isTitle title="Units" />
        <ScrollPanel>
          {data.length > 0 ? (
            data.map((unit, index) => {
              return (
                <CardContainer key={index}>
                  <BaseStack>
                    <img width="24" height="24" src="/tube.svg" alt="load" />
                    <Label>Unit Name</Label>
                  </BaseStack>
                  <Stack>
                    <Text>{unit.name}</Text>
                  </Stack>
                  <div
                    style={{
                      textAlign: "center",
                      marginTop: "1rem",
                      marginBottom: ".5rem",
                    }}
                  >
                    <Button
                      variant="outlined"
                      sx={{ color: "#FFFFFF", borderColor: "#FFFFFF" }}
                      onClick={() => {
                        localStorage.setItem("unitId", unit.id);
                        localStorage.setItem("layoutId", unit.layout.id);
                        navigate("/rooms");
                      }}
                    >
                      View rooms
                    </Button>
                  </div>
                </CardContainer>
              );
            })
          ) : (
            <CardContainer>
              <EmptyList />
            </CardContainer>
          )}
        </ScrollPanel>
      </Container>
    </>
  );
};

export default Unit;
