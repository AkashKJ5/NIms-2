import { REPLICATION_SIZE } from "../../utils/constants";
import { buildReplication } from "./utils";

/**
 * Pull builder for Unit data
 *
 * @param {*} db RxDB database
 */
const pullBuilder = (doc) => {
  const where = doc ? `lastmodifiedAt_Gt: "${doc.lastmodifiedAt}"` : "";
  console.log('unit_replication',doc)
  const query = `{
    listUnits(
      limit: ${REPLICATION_SIZE}
      offset: 0
      ordering: "lastmodifiedAt,ASC"
      ${where}
    ) {
        results {
            id
            name
            isActive

            details

            project {
              id
              name
              roomTypes {
                id
                name
              }
            }
            layout {
              id
              name
            }
            status {
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
 * Synchronize unit data with GraphQL endpoint
 */
export const syncUnits = (...args) => {
  return buildReplication(
    ...args,
    "unit",
    { pullBuilder, pullQuery: "listUnits" },
    {}
  );
};
