import { REPLICATION_SIZE } from "../../utils/constants";
import { buildReplication } from "./utils";

/**
 * Pull builder for snagging status data
 *
 * @param {*} db RxDB database
 */
const pullBuilder = (doc) => {
  const where = doc ? `lastmodifiedAt_Gt: "${doc.lastmodifiedAt}"` : "";

  const query = `{
    listSnaggingsStatuss(
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
 * Synchronize snagging status data with GraphQL endpoint
 */
export const syncSnaggingStatus = (...args) => {
  return buildReplication(...args, "snagging_status", {
    pullBuilder,
    pullQuery: "listSnaggingsStatuss",
  });
};
