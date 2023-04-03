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

const FixingItems = () => {
  const [snagsItems, setSnaggesItems] = React.useState(null);
  const db = useDatabase();
  const [data, setData] = React.useState([]);
  const [totalItems, setTotalItems] = React.useState([]);

  /*_____________________________________________________________________
    -                                                                    |                                                                    |
    -           Getting Snagging data with not_ok status                 |
    _____________________________________________________________________|
    */
  React.useEffect(() => {
    const projectId = localStorage.getItem("projectId");
    const unitId = localStorage.getItem("unitId");
    console.log('projectId',projectId)
    console.log('unitId',unitId)

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
    -          Here Validating the items from room type                  |
    -       getting number of items from room to show the item details   |
    -                                                                    |
    -                                                                    |
    _____________________________________________________________________|
    */
  React.useEffect(() => {
    if (!snagsItems) return;

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

export default FixingItems;
