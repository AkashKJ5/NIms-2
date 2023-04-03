import { Button, Divider, Stack } from "@mui/material";
import { Label, Text } from "./styled";

import { CardContainer } from "../../components/generic/container";
import { GridStack } from "../../components/generic/stack";
import React from "react";
import { useNavigate } from "react-router-dom";

const Rooms = ({ data }) => {
  const navigate = useNavigate();
  const [isExist, setIsExist] = React.useState(false);

  /*_______________________________________________
  -                                                |
  -                                                |
  - validating room images with name of the rooms  |
  - imageExists type(function) it return promise   |
  - @params imagePath with PATH of the image       |
  -                                                |
  _________________________________________________|
  */

  const imageExists = (imagePath) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve(true);
      img.onerror = () => resolve(false);
      img.src = imagePath;
    });
  };


  /*_______________________________________________________
  -                                                        |
  -                                                        |
  - validating room images with name of the rooms          |
  - checkImageExistence type(function) it return boolean   |
  - calling imageExists(function) with path                |
  - @params rooms folder name of the image in public folder|
  - @data.name dynamic image name                          |
  - image extension is png                                 |
  -                                                        |
  _________________________________________________________|
  */


  React.useEffect(() => {

    const checkImageExistence = async () => {
        const isTrue = await imageExists(`/rooms/${data.name}.png`);
        setIsExist(isTrue);
      };
    checkImageExistence();
  }, [data, isExist]);

  return (
    <>
      <CardContainer key={data.id}>
        <GridStack>
          {isExist ? (
            <img
              src={`/rooms/${data.name}.png`}
              alt={`/rooms/${data.name}.png`}
              width="24"
              height="24"
            />
          ) : (
            <img width="24" height="24" src="/shield.svg" alt="load" />
          )}
          <Label>Room Name</Label>
        </GridStack>
        <Stack>
          <Text>{data.name}</Text>
        </Stack>

        <Divider
          light
          style={{
            marginTop: "0.5rem",
          }}
        />
        <GridStack>
          <img width="24" height="24" src="/rocket.svg" alt="load" />

          <p>{`There are ${data.items} Items in this room`}</p>
        </GridStack>

        <div
          style={{
            textAlign: "center",
            marginTop: "1rem",
            marginBottom: ".5rem",
            display: "flex",
            justifyContent: "space-around",
          }}
        >
          <Button
            variant="outlined"
            onClick={() => {
              localStorage.setItem("roomId", data.id);
              localStorage.setItem("roomName", data.name);
              navigate("/room-types");
            }}
          >
            View Items
          </Button>

          <Button
            variant="outlined"
            onClick={() => {
              localStorage.setItem("roomId", data.id);
              localStorage.setItem("roomName", data.name);
              navigate("/review");
            }}
          >
            Review
          </Button>
        </div>
      </CardContainer>
    </>
  );
};

export default Rooms;
