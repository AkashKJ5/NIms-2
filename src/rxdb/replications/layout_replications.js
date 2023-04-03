import { REPLICATION_SIZE } from "../../utils/constants";
import { buildReplication } from "./utils";

/**
 * Pull builder for layout data
 *
 * @param {*} db RxDB database
 */
const pullBuilder = (doc) => {
  const where = doc ? `lastmodifiedAt_Gt: "${doc.lastmodifiedAt}"` : "";

  const query = `{
    listLayouts(
      limit: ${REPLICATION_SIZE}
      offset: 0
      ordering: "lastmodifiedAt,ASC"
      ${where}
    ) {
        results {
            id
            name
            isActive
            roomTypes {
                id
                name
                projectItems {
                    id
                    details
                    section {
                      id
                      details
                      aspect{
                        id
                        name
                      }
                    }
                }
            }
            project {
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
 * Synchronize layout data with GraphQL endpoint
 */
export const syncLayouts = (...args) => {
  return buildReplication(
    ...args,
    "layout",
    { pullBuilder, pullQuery: "listLayouts" },
    {}
  );
};
