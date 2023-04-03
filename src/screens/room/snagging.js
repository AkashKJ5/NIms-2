import { CardContainer } from "../../components/generic/container";
import EmptyList from "../../containers/empty-list";
import React from "react";
import Rooms from "./room-list";
import { getLayoutCollection } from "../../rxdb/collections";
import { useDatabase } from "../../context/database";

const SnagginItems = () => {
  const db = useDatabase();
  const [data, setData] = React.useState([]);

  /*___________________________________________________________________
    -                                                                    |
    -     getting Items from room having only snagging phase             |
    -               and snagging mode                                    |
    -                                                                    |
    -                                                                    |
    _____________________________________________________________________|
    */
  React.useEffect(() => {
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

export default SnagginItems;
