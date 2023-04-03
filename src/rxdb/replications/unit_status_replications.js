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
    listUnitStatus(
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
 * Synchronize unit status data with GraphQL endpoint
 */
export const syncUnitStatus = (...args) => {
  return buildReplication(
    ...args,
    "unit_status",
    { pullBuilder, pullQuery: "listUnitStatus" },
    {}
  );
};
