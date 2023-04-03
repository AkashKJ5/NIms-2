import { Container } from "./styled";
import Desnagging from "./de-snagging";
import DesnaggingRoomsItem from "./de-snagging-items";
import FixingItems from "./fixing";
import React from "react";
import ResponsiveAppBar from "../../containers/tool-bar";
import { ScrollPanel } from "primereact/scrollpanel";
import SnagRoomsItems from "./fixingOnly";
import SnagginItems from "./snagging";
import { getProjectsCollection } from "../../rxdb/collections";
import { useDatabase } from "../../context/database";

const Room = () => {
  const db = useDatabase();

  const [isDesnagProject, setIsDesnagProject] = React.useState(false);
  const [hasFixingOnly, setHasFixing] = React.useState(false);
  const [hasDesnaggingOnly, setHasDesnagging] = React.useState(false);
  const [hasAll, setHasAll] = React.useState(false);

  const [inspectionMode, setInspectionMode] = React.useState(null);

  React.useEffect(() => {
    const currentTab = JSON.parse(localStorage.getItem("tab")).name.label;
    setInspectionMode(currentTab);
  }, []);

  //get project status to validate inspection mode
  React.useEffect(() => {
    const projectId = localStorage.getItem("projectId");
    const subscription = getProjectsCollection(db)
      .findOne({ selector: { id: projectId } })
      .$.subscribe((entries) => {
        console.log("entries_index", entries);
        if (entries.hasFixingPhase && entries.hasDesnaggingPhase) {
          setHasAll(true);
        } else if (entries.hasFixingPhase) {
          setHasFixing(true);
        } else if (entries.hasDesnaggingPhase) {
          setHasDesnagging(true);
        }
      });
    return () => {
      subscription.unsubscribe();
    };
  }, [db]);

  return (
    <>
      <Container>
        <ResponsiveAppBar isTitle title="Rooms" />
        <ScrollPanel style={{ paddingBottom: "1.8rem" }}>
          {inspectionMode === "Snag" && <SnagginItems />}

          {inspectionMode === "Fix" && (
            <FixingItems hasFixingOnly={hasFixingOnly} hasAll={hasAll} />
          )}

          {inspectionMode === "Desnag" && (
            <Desnagging hasDesnaggingOnly={hasDesnaggingOnly} hasAll={hasAll} />
          )}
        </ScrollPanel>
      </Container>
    </>
  );
};

export default Room;
