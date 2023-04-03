import { REPLICATION_SIZE } from "../../utils/constants";
import { buildReplication } from "./utils";

/**
 * Pull builder for project data
 *
 * @param {*} db RxDB database
 */
const pullBuilder = (doc) => {
  const where = doc ? `lastmodifiedAt_Gt: "${doc.lastmodifiedAt}"` : "";

  const query = `{
    listProjects(
      limit: ${REPLICATION_SIZE}
      offset: 0
      ordering: "lastmodifiedAt,ASC"
      ${where}
    ) {
        results {
            id
            name
            isActive

            email
            address
            city

            unit
            status{
              id
              name
            }

            projectDescriptions{
              id
              name
              details
              flaw
            }

            projectAspects{
              id
              name
            }
            template{
              id
              name
            }
            subscriber {
              id
              fullName
            }
            customer {
              id
              name
            }
             customerType {
              id
              name
            }
            project {
              id
              name
            }
            projectType {
              id
              name
            }
            users {
              id
              email
              name
            }

            snagPriorities
            hasDesnaggingPhase
            hasFixingPhase

            lastmodifiedAt
          }
    }
  }`;

  return { query, variables: {} };
};

/**
 * Synchronize project data with GraphQL endpoint
 */
export const syncProjects = (...args) => {
  return buildReplication(
    ...args,
    "projects",
    { pullBuilder, pullQuery: "listProjects" },
    {}
  );
};
