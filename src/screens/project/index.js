import { CardContainer } from "../../components/generic/container";
import Carousel from "./carousel";
import { Container } from "../styled";
import React from "react";
import ResponsiveAppBar from "../../containers/tool-bar";
import { ScrollPanel } from "primereact/scrollpanel";
import { getProjectStatusCollection } from "../../rxdb/collections";
import { useDatabase } from "../../context/database";

const Project = () => {
  const [statusData, setStatusData] = React.useState([]);
  const [statusValue, setStatusValue] = React.useState("all");
  const db = useDatabase();

  React.useEffect(() => {
    const where = {
      isActive: true,
      name: { $ne: "not ready" },
    };
    const subscription = getProjectStatusCollection(db)
      .find()
      .where(where)
      .sort({ id: 1 })
      .$.subscribe((entries) => {
        const docs = entries.filter((entry) => {
          return entry.name !== "archived";
        });
        setStatusData(docs);
      });
    return () => {
      subscription.unsubscribe();
    };
  }, [db]);

  return (
    <>
      <Container>
        <ResponsiveAppBar isTitle title="Projects" />

        <ScrollPanel style={{ paddingBottom: "50px" }}>
          <CardContainer variant="outlined">
            <Carousel
              filterValue={statusValue}
              currentTab={JSON.parse(localStorage.getItem("tab")).name.label}
              statusData={statusData}
            />
          </CardContainer>
        </ScrollPanel>
      </Container>
    </>
  );
};

export default Project;
