import { REPLICATION_SIZE } from "../../utils/constants";
import { buildReplication } from "./utils";

/**
 * Pull builder for project item data
 *
 * @param {*} db RxDB database
 */
const pullBuilder = (doc) => {
  const where = doc ? `lastmodifiedAt_Gt: "${doc.lastmodifiedAt}"` : "";

  const query = `{
    listProjectItems(
      limit: ${REPLICATION_SIZE}
      offset: 0
      ordering: "lastmodifiedAt,ASC"
      ${where}
    ) {
        results {
            id
            isActive
            details
            description {
              id
              name
              details
            }
            roomTypes{
              id
              name
            }
            lastmodifiedAt
          }
    }
  }`;

  return { query, variables: {} };
};

/**
 * Synchronize project item data with GraphQL endpoint
 */
export const syncProjectItems = (...args) => {
  return buildReplication(
    ...args,
    "project_item",
    { pullBuilder, pullQuery: "listProjectItems" },
    {}
  );
};
