import {
  getLayoutCollection,
  getProjectFixing,
  getProjectSnagging,
} from "../../rxdb/collections";

import { CardContainer } from "../../components/generic/container";
import EmptyList from "../../containers/empty-list";
import React from "react";
import Rooms from "./room-list";
import { groupBy } from "lodash";
import { useDatabase } from "../../context/database";

const Desnagging = ({ hasDesnaggingOnly, hasAll }) => {
  const [snagsItems, setSnaggesItems] = React.useState(null);
  const db = useDatabase();
  const [data, setData] = React.useState([]);
  const [totalItems, setTotalItems] = React.useState([]);
  const [fixingData, setFixingData] = React.useState(null);

  console.log("hasDesnaggingOnly", hasDesnaggingOnly);
  console.log("hasAll", hasAll);
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
    if (!hasDesnaggingOnly) return;

    const projectId = localStorage.getItem("projectId");
    const unitId = localStorage.getItem("unitId");

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
  }, [db, hasDesnaggingOnly]);

  /*___________________________________________________________________
  -                                                                    |
  -          getting fixing data during de-snagging                    |
  -                 fixing status is FIXED                             |
  -                                                                    |
  -                                                                    |
  _____________________________________________________________________|
  */
  React.useEffect(() => {
    if (!hasAll) return;
    const projectId = localStorage.getItem("projectId");
    const subscription = getProjectFixing(db)
      .find()
      .where({
        isActive: true,
        "project.id": projectId,
        "fixingStatus.name": "Fixed",
      })
      .sort({ lastmodifiedAt: "asc" })
      .$.subscribe((entries) => {
        console.log("fixing_data", entries);
        setFixingData(entries);
      });

    return () => {
      subscription.unsubscribe();
    };
  }, [db, hasAll]);

  /*___________________________________________________________________
  -                                                                    |
  - fetching snagging data which is fixed during fixing inspection     |
  -                 fixing status is FIXED                             |
  -                                                                    |
  -   This needs to be done(temporary written) will modify             |
  _____________________________________________________________________|
  */
  React.useEffect(() => {

    // fixingData
    if (!fixingData) return;
    const projectId = localStorage.getItem("projectId");
    const unitId = localStorage.getItem("unitId");
    const subscription = getProjectSnagging(db)
      .find()
      .where({
        isActive: true,
        "project.id": projectId,
        "units.id": unitId,
        "snaggingStatus.name": "not_ok",
      })
      .sort({ lastmodifiedAt: "asc" })
      .$.subscribe((entries) => {
        console.log('entries_snagging_with_fixing',entries);
        const docs = entries.map((entry) => {
          const matched = fixingData.find(
            (key) => key.snagging.id === entry.id
          );
          return matched ? entry : undefined;
        });
        const documents = docs.filter((data) => data !== undefined);
        setSnaggesItems(documents.length > 0 ? documents : null);
        const entriesByItem = groupBy(documents, "item.id");
        const itemDocs = Object.keys(entriesByItem).map((key) => {
          return {
            id: key,
            snagging: entriesByItem[key],
            total: entriesByItem[key].length,
          };
        });
        console.log("itemDocs", itemDocs);
        setTotalItems(itemDocs);
      });

    return () => {
      subscription.unsubscribe();
    };
  }, [db, fixingData]);

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

export default Desnagging;
