import {
  getLayoutCollection,
  getProjectSnagging,
} from "../../rxdb/collections";

import { CardContainer } from "../../components/generic/container";
import EmptyList from "../../containers/empty-list";
import React from "react";
import Rooms from "./room-list";
import { groupBy } from "lodash";
import { useDatabase } from "../../context/database";

const SnagRoomsItems = () => {
  const [snagsItems, setSnaggesItems] = React.useState(null);
  const db = useDatabase();
  const [data, setData] = React.useState([]);
  const [totalItems, setTotalItems] = React.useState([]);

  /*___________________________________________________________________
  -                                                                    |
  - getting snagging data having only fixing without de-snagging phase |
  -                               OR                                   |
  -            de-snagging phase without fixing phase                  |
  -                                                                    |
  -                                                                    |
  _____________________________________________________________________|
  */
  React.useEffect(() => {
    const projectId = localStorage.getItem("projectId");
    const unitId = localStorage.getItem("unitId");

    console.log(projectId);
    console.log(unitId);

    const where = {
      isActive: true,
      "project.id": projectId,
      "units.id": unitId,
      "snaggingStatus.name": "not_ok",
    };
    const subscription = getProjectSnagging(db)
      .find()
      .where(where)
      .sort({ lastmodifiedAt: "asc" })
      .$.subscribe((entries) => {
        console.log("snagging_data", entries);
        setSnaggesItems(entries.length > 0 ? entries : null);
        const entriesByItem = groupBy(entries, "item.id");
        const itemDocs = Object.keys(entriesByItem).map((key) => {
          return {
            id: key,
            snagging: entriesByItem[key],
            total: entriesByItem[key].length,
          };
        });
        setTotalItems(itemDocs);
      });
    return () => {
      subscription.unsubscribe();
    };
  }, [db]);

  /*___________________________________________________________________
  -                                                                    |
  -     getting Items from room having only snagging phase             |
  -               and snagging mode                                    |
  -                                                                    |
  -                                                                    |
  _____________________________________________________________________|
  */
  React.useEffect(() => {
    if (
      localStorage.getItem("tab") &&
      JSON.parse(localStorage.getItem("tab")).name.label !== "Snag"
    )
      return;
    if (!localStorage.getItem("layoutId")) return;
    const layoutId = localStorage.getItem("layoutId");
    const subscription = getLayoutCollection(db)
      .findOne({ selector: { id: layoutId } })
      .$.subscribe((entries) => {
        console.log("entries", entries);
        const docs = entries.roomTypes.map((entry) => ({
          id: entry.id,
          name: entry.name,
          projectItems: entry.projectItems,
          items: entry.projectItems.length,
          section: entry.projectItems.section,
          project: entry.project,
        }));
        setData(docs);
      });

    return () => {
      subscription.unsubscribe();
    };
  }, [db]);

  /*___________________________________________________________________
  -                                                                    |
  -          Here Validating the items from room type                  |
  -       getting number of items from room to show the item details   |
  -                                                                    |
  -                                                                    |
  _____________________________________________________________________|
  */
  React.useEffect(() => {
    if (!snagsItems) return;
    if (
      localStorage.getItem("tab") &&
      (JSON.parse(localStorage.getItem("tab")).name.label === "Fix" ||
        JSON.parse(localStorage.getItem("tab")).name.label === "Desnag")
    ) {
      if (!localStorage.getItem("layoutId")) return;
      const layoutId = localStorage.getItem("layoutId");
      const subscription = getLayoutCollection(db)
        .findOne({ selector: { id: layoutId } })
        .$.subscribe((entries) => {
          const docs = entries.roomTypes.map((entry) => ({
            id: entry.id,
            name: entry.name,
            projectItems: entry.projectItems,
            items:
              snagsItems.filter((data) => {
                return data.room.id === entry.id;
              }).length > 0
                ? totalItems.length
                : 0,
            snaggedItem: snagsItems,
            section: entry.projectItems.section,
            project: entry.project,
          }));
          setData(docs.filter((data) => data.items > 0).length > 0 ? docs : []);
        });
      return () => {
        subscription.unsubscribe();
      };
    } else {
      return;
    }
  }, [db, snagsItems]);

  return (
    <>
      {data.map((room) => {
        return room.items > 0 ? <Rooms data={room} /> : null;
      })}
      {data.length < 1 && (
        <CardContainer>
          <EmptyList />
        </CardContainer>
      )}
    </>
  );
};

export default SnagRoomsItems;
