import { REPLICATION_SIZE } from "../../utils/constants";
import { buildReplication } from "./utils";

/**
 * Pull builder for project status data
 *
 * @param {*} db RxDB database
 */
const pullBuilder = (doc) => {
  const where = doc ? `lastmodifiedAt_Gt: "${doc.lastmodifiedAt}"` : "";

  const query = `{
    listProjectInfoStatus(
      limit: ${REPLICATION_SIZE}
      offset: 0
      ordering: "lastmodifiedAt,ASC"
      ${where}
    ) {
        results {
            id
            name
            isActive
            lastmodifiedAt
          }
    }
  }`;

  return { query, variables: {} };
};

/**
 * Synchronize project data with GraphQL endpoint
 */
export const syncProjectStatus = (...args) => {
  return buildReplication(
    ...args,
    "project_status",
    { pullBuilder, pullQuery: "listProjectInfoStatus" },
    {}
  );
};
