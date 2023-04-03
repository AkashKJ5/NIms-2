import { Container } from "../../components/generic/container";
import { Image } from "./styled";
import ProjectList from "./list";
import React from "react";
import ResponsiveAppBar from "../../containers/tool-bar";
import { getProjectsCollection } from "../../rxdb/collections";
import { useDatabase } from "../../context/database";

const Dashboard = () => {
  const db = useDatabase();
  const tab = { id: 0, name: { label: "Home", route: "/dashboard" } };
  const [allProject, setAllProject] = React.useState([]);
  const [totalProject, setTotalProjects] = React.useState(0);
  React.useEffect(() => {
    if (window.location.pathname === "/dashboard") {
      localStorage.setItem("tab", JSON.stringify(tab));
    }
  }, []);

  React.useEffect(() => {
    if (!JSON.parse(localStorage.getItem("login")).user) return;
    const userId = JSON.parse(localStorage.getItem("login")).user.id;
    const where = {
      isActive: true,
      status: { $ne: null },
      users: { $ne: [] },
    };

    const subscription = getProjectsCollection(db)
      .find()
      .where(where)
      .$.subscribe((entries) => {
        const docs = entries.map((entry) => {
          if (
            entry.users.find((data) => data.id === userId) !== undefined
          ) {
            return {
              id: entry.id,
              name: entry.name,
              status: entry.status,
              type: entry.projectType ? entry.projectType.name : "N/A",
              address: entry.address ? entry.address : "N/A",
              location: entry.city ? entry.city : "N/A",
              contact: entry.customer ? entry.customer.name : "N/A",
              lastmodifiedAt: entry.lastmodifiedAt
            };
          } else {
            return null;
          }
        });
        setAllProject(
          docs.filter((data) => {
            return data !== null;
          })
        );
        setTotalProjects(
          docs.filter((data) => {
            return data !== null;
          }).length
        );
      });
    return () => {
      subscription.unsubscribe();
    };
  }, [db, totalProject]);

  return (
    <>
      <Container>
        <ResponsiveAppBar />
        {totalProject > 0 ? (
          <ProjectList data={allProject} />
        ) : (
          <Image src="/under_construction.svg" atl="dashboard" />
        )}
      </Container>
    </>
  );
};

export default Dashboard;
