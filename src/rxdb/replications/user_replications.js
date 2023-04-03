import { REPLICATION_SIZE } from "../../utils/constants";
import { buildReplication } from "./utils";

/**
 * Pull builder for user data
 *
 * @param {*} db RxDB database
 */
const pullBuilder = (doc) => {
  const where = doc ? `lastmodifiedAt_Gt: "${doc.lastmodifiedAt}"` : "";
  const query = `{
    listUsers(
      limit: ${REPLICATION_SIZE}
      offset: 0
      ordering: "lastmodifiedAt,ASC"
      ${where}
    ) {
        results {
          id
          email
          username
          isActive
          projects {
            id
            status{
              id
              name
            }
            name
            email
            address
            city
            unit
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
            projectType {
              id
              name
            }
           }
            lastmodifiedAt
        }
    }
  }`;

  return { query, variables: {} };
};

/**
 * Synchronize user data with GraphQL endpoint
 */
export const syncUsers = (...args) => {
  return buildReplication(
    ...args,
    "user",
    { pullBuilder, pullQuery: "listUsers" },
    {}
  );
};
