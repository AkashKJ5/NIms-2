import { Button, DivContainer, Label, Text } from "./styled";

import { Divider } from "@mui/material";
import EmptyList from "../../containers/empty-list";
import { GridStack } from "../../components/generic/stack";
import React from "react";
import { getLayoutCollection } from "../../rxdb/collections";
import { useDatabase } from "../../context/database";
import { useNavigate } from "react-router";

const CarouselList = ({ data }) => {
  const navigate = useNavigate();
  const db = useDatabase();
  const [inspectedItem, setInspectedItem] = React.useState(null);
  const [imageBase46, setImageBase64] = React.useState("");

  React.useEffect(() => {
    if (!data) return;
    const itemId = data.item.id;
    if (!localStorage.getItem("roomId")) return;
    const roomId = localStorage.getItem("roomId");
    const layoutId = localStorage.getItem("layoutId");
    const subscription = getLayoutCollection(db)
      .findOne({ selector: { id: layoutId } })
      .$.subscribe((entries) => {
        const docs = entries.roomTypes
          .filter((data) => data.id === roomId)
          .map((data) => data.projectItems);
        setInspectedItem(
          docs[0].filter((data) => {
            return data.id === itemId;
          })[0]
        );
      });

    return () => {
      subscription.unsubscribe();
    };
  }, [db, data]);

  //-----------------------------------Getting image from the webkit fileSystem-------------------//
  const getImages = (path) => {
    window.webkitRequestFileSystem(
      window.PERSISTENT,
      5 * 1024 * 1024,
      function (fs) {
        fs.root.getFile(
          `${path}`,
          {},
          function (fileEntry) {
            fileEntry.file(
              function (file) {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = function () {
                  setImageBase64(reader.result);
                };
              },
              function (error) {
                console.error(error);
              }
            );
          },
          function (error) {
            console.error(error);
          }
        );
      },
      function (error) {
        console.error(error);
      }
    );
  };

  React.useEffect(() => {
    if (!data) return;
    if (data.fixUrl) {
      getImages(data.fixUrl);
    }
    if (data.deSnagUrl) {
      getImages(data.deSnagUrl);
    }
    if (data.snagImageUrl) {
      getImages(data.snagImageUrl);
    }
  }, [data]);

  return (
    <>
      {data != null && inspectedItem != null ? (
        <>
          <GridStack>
            <Label>Section Name</Label>
            <Text>{inspectedItem.section.details}</Text>
          </GridStack>

          <GridStack>
            <Label>Item Name</Label>
            <Text>{inspectedItem.details}</Text>
          </GridStack>

          <GridStack>
            <Label>Status</Label>
            <Text>{data.status ? data.status : "NA"}</Text>
          </GridStack>
          <GridStack>
            <Label>Priority</Label>
            <Text>{data.priority}</Text>
          </GridStack>

          <GridStack>
            <Label>Snagging Image</Label>
            <Text>
              <img
                style={{ width: "100%" }}
                src={imageBase46}
                alt="snag pic !"
              />
            </Text>
          </GridStack>

          <Divider
            light
            style={{
              marginTop: "0.5rem",
            }}
          />

          <DivContainer>
            <Button
              variant="outlined"
              color="secondary"
              style={{
                marginRight: "1rem",
              }}
              onClick={() => navigate("/rooms")}
            >
              Go Back
            </Button>
          </DivContainer>
        </>
      ) : (
        <EmptyList />
      )}
    </>
  );
};

export default CarouselList;
