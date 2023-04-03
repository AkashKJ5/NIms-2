import { Alert, Divider } from "@mui/material";
import { Button, Container, DivContainer, Label, Text } from "./styled";

import { CardContainer } from "../../components/generic/container";
import Carousel from "./carousel";
import EmptyList from "../../containers/empty-list";
import React from "react";
import ResponsiveAppBar from "../../containers/tool-bar";
import { ScrollPanel } from "primereact/scrollpanel";
// import { getProjectResultsCollection } from "../../rxdb/collections";
import { useDatabase } from "../../context/database";

const ReviewUploads = () => {
  const db = useDatabase();
  const [data, setData] = React.useState([]);

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
  //       console.log("entries", docs);
  //     });

  //   return () => {
  //     subscription.unsubscribe();
  //   };
  // }, [db]);

  return (
    <>
      <Container>
        <ResponsiveAppBar isTitle title="Review" />
        {data ? (
          <ScrollPanel>
            <CardContainer>
              <Carousel />
            </CardContainer>
          </ScrollPanel>
        ) : (
          <EmptyList />
        )}
      </Container>
    </>
  );
};

export default ReviewUploads;
