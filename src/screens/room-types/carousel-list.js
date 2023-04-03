import ButtonsGroup, {
  PriorityTab,
} from "../../components/generic/radio-buttons";
import { Div, Label, Text } from "./styled";
import { Divider, Stack } from "@mui/material";
import {
  getProjectDesnagging,
  getProjectFixing,
  getProjectSnagging,
  getSnaggingPriority,
  getSnaggingStatus,
} from "../../rxdb/collections";

import EmptyList from "../../containers/empty-list";
import { GridStack } from "../../components/generic/stack";
import React from "react";
import UploadImage from "./capture-image";
import { useAuth } from "../../context/auth";
import { useDatabase } from "../../context/database";

const ListItems = ({ data, handleNext }) => {
  const [status, setStatus] = React.useState("");
  const [statusObj, setStatusObj] = React.useState(null);
  const [priorityObj, setPriorityObj] = React.useState(null);
  const [priority, setPriority] = React.useState("low");
  const [isFixed, setIsFixed] = React.useState(false);
  const [isSnag, setIsSnagg] = React.useState(false);
  const [isDesnag, setIsDesnag] = React.useState(false);
  const db = useDatabase();
  const [fixedData, setFixedData] = React.useState(null);
  const [uuid, setUuId] = React.useState(null);
  const auth = useAuth();

  const [fixingStatus] = React.useState([
    {
      id: "2",
      name: "Cant_Fix",
    },
    {
      id: "1",
      name: "Fixed",
    },
    {
      id: "3",
      name: "Not_A_Snag",
    },
  ]);

  const [deSnaggingStatus] = React.useState([
    {
      id: "1",
      name: "Rectified",
    },
    {
      id: "2",
      name: "Not_Rectified",
    },
    {
      id: "3",
      name: "Partially_Rectified",
    },
  ]);

  const [statusData, setStatusData] = React.useState([]);
  const [priorityData, setPriorityData] = React.useState([]);

  /*____________________________________________________________
  -                                                             |
  -     Validating for edit and creating the inspection         |
  -          by the different users                             |
  -                                                             |
  -                  @variables                                 |
  -  (tab) string value of current tab                          |
  -  (projectId) string value of current project                |
  -  (unitId) string value of current unit                      |
  -  (roomId) string value of current room                      |
  -                                                             |
  -                    @Function                                |
  -  validate(function) for validation with params              |
  -                                                             |
  -                     @params                                 |
  - {getProjectFixing , getProjectDesnagging,getProjectSnagging}|
  - get is denoted as function of each inspection entity        |
  - (condition) parameters of validation                        |
  - (fixingUuid,deSnaggingUuid,snaggingUuid)  uuid variable     |
  -                                                             |
  ______________________________________________________________|
  */

  React.useEffect(() => {
    if (!localStorage.getItem("tab") || data === null) return;
    const tab = JSON.parse(localStorage.getItem("tab")).name.label;
    const projectId = localStorage.getItem("projectId");
    const unitsId = localStorage.getItem("unitId");
    const roomId = localStorage.getItem("roomId");

    let condition = {
      isActive: true,
      "project.id": projectId,
      "createdBy.id": auth.auth.user.id,
    };

    if (tab === "Fix") {
      setIsFixed(true);
      validate(getProjectFixing, condition, "fixingUuid");
      // validateStatus("fixingStatus");
    } else if (tab === "Desnag") {
      setIsDesnag(true);
      validate(getProjectDesnagging, condition, "deSnaggingUuid");
      // validateStatus("de-snagging-Status");
    } else {
      setIsSnagg(true);
      validate(
        getProjectSnagging,
        {
          ...condition,
          "item.id": data.id,
          "units.id": unitsId,
          "room.id": roomId,
          "section.id": data.section.id,
        },
        "snaggingUuid"
      );
      validateStatus(getSnaggingStatus);
      validatePriority(getSnaggingPriority);
    }
  }, [data, isFixed, isDesnag]);

  /*____________________________________________________________
  -                                                             |
  -                    @Function                                |
  -  validate(function) for validation with params              |
  -                                                             |
  -                     @params                                 |
  - @functionName type(function)                                |
  - @condition type(object)                                     |
  - @uuid type(string) name of uuid based on functionName       |
  -                                                             |
  ______________________________________________________________|
  */
  function validate(functionName, condition, uuid) {
    let subscription = eval(functionName)(db)
      .find()
      .where(condition)
      .sort({ lastmodifiedAt: "asc" })
      .$.subscribe((entries) => {
        const latestDocs = entries.sort(
          (a, b) => new Date(b.lastmodifiedAt) - new Date(a.lastmodifiedAt)
        )[0];
        setUuId(latestDocs ? latestDocs[uuid] : null);
      });

    return () => {
      subscription.unsubscribe();
    };
  }

  // validating status
  function validateStatus(functionName) {
    let subscription = eval(functionName)(db)
      .find()
      .sort({ id: "asc" })
      .$.subscribe((entries) => {
        const docs = entries.map((data) => {
          return {
            id: data.id,
            name: data.name,
          };
        });
        console.log("docs", docs);
        setStatusData(docs);
      });

    return () => {
      subscription.unsubscribe();
    };
  }

  // validating priority
  function validatePriority(functionName) {
    let subscription = eval(functionName)(db)
      .find()
      .sort({ id: "asc" })
      .$.subscribe((entries) => {
        const docs = entries.map((data) => {
          return {
            id: data.id,
            name: data.name,
          };
        });
        setPriorityData(docs);
      });

    return () => {
      subscription.unsubscribe();
    };
  }

  React.useEffect(() => {
    if (
      JSON.parse(localStorage.getItem("tab")).name.label === "Desnag" &&
      data !== null
    ) {
      const subscription = getProjectFixing(db)
        .find()
        .where({
          isActive: true,
          "snagging.id": data.id,
        })
        .sort({ lastmodifiedAt: "asc" })
        .$.subscribe((entries) => {
          setFixedData(entries.length > 0 ? entries[entries.length - 1] : null);
        });

      return () => {
        subscription.unsubscribe();
      };
    } else {
      return;
    }
  }, [db, data]);

  return (
    <div style={{ padding: "8px" }}>
      {data ? (
        <>
          <GridStack>
            <img width="24" height="24" src="/messages.svg" alt="load" />
            <Label>Section Name</Label>
          </GridStack>
          <Stack>
            <Text>{data.section.details}</Text>
          </Stack>

          <Divider light />

          <GridStack>
            <img width="24" height="24" src="/dress.svg" alt="load" />
            <Label>Item Name</Label>
          </GridStack>
          <Stack>
            {data.details ? (
              <Text>{data.details}</Text>
            ) : (
              <Text>{data.item.details}</Text>
            )}
          </Stack>

          <Divider light />
          {isSnag && (
            <>
              <Div>
                <Label>
                  <span>Status</span>
                </Label>
                <ButtonsGroup
                  options={statusData}
                  value={status}
                  handleToggle={(value) => {
                    setStatus(value);
                    setStatusObj(
                      statusData.find((data) => {
                        return data.id === value;
                      })
                    );
                  }}
                />
              </Div>
              <Divider light />
              <Div>
                <Label>
                  <span>Select Priority</span>
                </Label>
                <PriorityTab
                  options={priorityData}
                  value={priority}
                  handleToggle={(value) => {
                    setPriority(value);
                    setPriorityObj(
                      priorityData.find((data) => {
                        return data.id === value;
                      })
                    );
                  }}
                />
              </Div>
            </>
          )}

          {isFixed && (
            <>
              <Div>
                <Label>
                  <span>Status</span>
                </Label>
                <ButtonsGroup
                  options={fixingStatus}
                  value={status}
                  handleToggle={(value) => {
                    setStatus(value);
                    setStatusObj(
                      fixingStatus.find((data) => {
                        if (data.id === value) {
                          console.log(data);
                        }

                        return data.id === value;
                      })
                    );
                  }}
                />
              </Div>
              <Divider light />
            </>
          )}

          {isDesnag && (
            <>
              <Div>
                <Label>
                  <span>Status</span>
                </Label>
                <ButtonsGroup
                  options={deSnaggingStatus}
                  value={status}
                  handleToggle={(value) => {
                    setStatus(value);
                    setStatusObj(
                      deSnaggingStatus.find((data) => {
                        return data.id === value;
                      })
                    );
                  }}
                />
              </Div>
              <Divider light />
            </>
          )}

          <div style={{ textAlign: "center" }}>
            <div>
              <UploadImage
                item={data}
                status={status}
                priority={priority}
                handleNext={handleNext}
                fixedData={fixedData}
                existId={uuid}
                statusObj={statusObj}
                priorityObj={priorityObj}
              />
            </div>
          </div>
        </>
      ) : (
        <EmptyList />
      )}
    </div>
  );
};

export default ListItems;
