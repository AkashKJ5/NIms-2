import { DividerLine, Label, Text } from "../styled";

import { GridStack as BaseStack } from "../../components/generic/stack";
import { Button } from "@mui/material";
import EmptyList from "../../containers/empty-list";
import React from "react";
import { useAuth } from "../../context/auth";
import { useNavigate } from "react-router-dom";

const ListItems = ({ data, currentTab }) => {
  const navigate = useNavigate();
  const auth = useAuth();
  // console.log('auth',auth)
  // React.useEffect(() => {}, []);

  return (
    <>
      {data ? (
        <div key={data.id}>
          <BaseStack>
            <img width="24" height="24" src="/cube.svg" alt="load" />
            <Label>Project Name</Label>
          </BaseStack>
          <Text>{data.name}</Text>
          <DividerLine />

          <BaseStack>
            <img width="24" height="24" src="/diary.svg" alt="load" />
            <Label>Project Type</Label>
          </BaseStack>
          <Text>{data.type}</Text>
          <DividerLine />

          <BaseStack>
            <img width="24" height="24" src="/star.svg" alt="load" />
            <Label>Project Location</Label>
          </BaseStack>
          <Text>{data.location}</Text>
          <DividerLine />

          <BaseStack>
            <img width="24" height="24" src="/users.svg" alt="load" />
            <Label>Contact Person</Label>
          </BaseStack>
          <Text>{data.contact}</Text>
          <DividerLine />

          <BaseStack>
            <img width="24" height="24" src="/location.svg" alt="load" />
            <Label>Address</Label>
          </BaseStack>
          <Text>{data.address}</Text>

          <div
            style={{
              textAlign: "center",
              marginTop: "1rem",
            }}
          >
            <Button
              variant="outlined"
              sx={{ color: "#FFFFFF", borderColor: "#FFFFFF" }}
              onClick={() => {
                localStorage.setItem("projectId", data.id);
                navigate("/units");
              }}
            >
              View Unit
            </Button>
          </div>
        </div>
      ) : (
        <EmptyList />
      )}
    </>
  );
};

export default ListItems;
