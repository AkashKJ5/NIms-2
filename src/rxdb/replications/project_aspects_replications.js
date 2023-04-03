import { REPLICATION_SIZE } from "../../utils/constants";
import { buildReplication } from "./utils";

/**
 * Pull builder for project item data
 *
 * @param {*} db RxDB database
 */
const pullBuilder = (doc) => {
  const where = doc ? `lastmodifiedAt_Gt: "${doc.lastmodifiedAt}"` : "";

  // console.log('project_item',doc);

  const query = `{
    listProjectaspects(
      limit: ${REPLICATION_SIZE}
      offset: 0
      ordering: "lastmodifiedAt,ASC"
      ${where}
    ) {
        results {
            id
            name
            isActive
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
 * Synchronize project item data with GraphQL endpoint
 */
export const syncProjectAspects = (...args) => {
  return buildReplication(
    ...args,
    "project_aspects",
    { pullBuilder, pullQuery: "listProjectaspects" },
    {}
  );
};
