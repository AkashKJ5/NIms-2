import { REPLICATION_SIZE } from "../../utils/constants";
import { buildReplication } from "./utils";

/**
 * Pull builder for de-snagging status data
 *
 * @param {*} db RxDB database
 */
const pullBuilder = (doc) => {
  const where = doc ? `lastmodifiedAt_Gt: "${doc.lastmodifiedAt}"` : "";

  const query = `{
    listDesnagingStatuss(
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
 * Synchronize de-snagging status data with GraphQL endpoint
 */
export const syncDesnaggingStatus = (...args) => {
  return buildReplication(...args, "de_snagging_status", {
    pullBuilder,
    pullQuery: "listDesnagingStatuss",
  });
};
