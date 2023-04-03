import { getProjectAspectsCollection, getProjectsCollection } from "../../rxdb/collections";

import { CardContainer } from "../../components/generic/container";
import Carousel from "./carousel";
import { Container } from "./styled";
import React from "react";
import ResponsiveAppBar from "../../containers/tool-bar";
import { ScrollPanel } from "primereact/scrollpanel";
import { SingleSelectOptions } from "../../containers/select-option/single-select";
import { useDatabase } from "../../context/database";

const RoomTypes = () => {
  const [roomName, setRoomName] = React.useState("N/A");

  React.useEffect(() => {
    if (localStorage.getItem("roomName")) {
      setRoomName(localStorage.getItem("roomName").toUpperCase());
    }
  }, [roomName]);

  const [aspectsData, setAspectsData] = React.useState([]);
  const [aspectsValue, setAspectsValue] = React.useState('all');
  const db = useDatabase();
  const [isDesnagProject, setIsDesnagProject] = React.useState(false);


    //get project status to validate inspection mode
    React.useEffect(() => {
      if (JSON.parse(localStorage.getItem("tab")).name.label !== "Desnag") return;
      const projectId = localStorage.getItem("projectId");
      const where = {
        isActive: true,
        id: projectId,
        hasDesnaggingPhase: true,
      };
      const subscription = getProjectsCollection(db)
        .find()
        .where(where)
        .$.subscribe((entries) => {
          if (entries.length > 0) {
            setIsDesnagProject(true);
          } else {
            setIsDesnagProject(false);
          }
        });
      return () => {
        subscription.unsubscribe();
      };
    }, [db]);

  React.useEffect(() => {
    if (!localStorage.getItem("projectId")) return;
    const projectId = localStorage.getItem("projectId");
    const subscription = getProjectAspectsCollection(db)
      .find()
      .where({ isActive: true, "project.id": projectId })
      .sort({ id: 1 })
      .$.subscribe((entries) => {
        const docs = entries.map((entry) => {
          return {
            id: entry.id,
            name: entry.name,
          };
        });
        setAspectsData(docs);
      });
    return () => {
      subscription.unsubscribe();
    };
  }, [db]);

  const handleOption = (value) => {
    setAspectsValue(value);
  };

  return (
    <>
      <Container>
        <ResponsiveAppBar isTitle title={roomName} />
        <ScrollPanel>
          <SingleSelectOptions
            data={aspectsData}
            value={aspectsValue}
            handleOption={(value) => {
              handleOption(value);
            }}
            title='Filter by Aspects'
          />
          <CardContainer>
            <Carousel filterValue={aspectsValue} isDesnagProject={isDesnagProject} />
          </CardContainer>
        </ScrollPanel>
      </Container>
    </>
  );
};

export default RoomTypes;
