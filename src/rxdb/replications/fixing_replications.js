import { REPLICATION_SIZE } from "../../utils/constants";
import { buildReplication } from "./utils";

/**
 * Pull builder for project result of fixing data
 *
 * @param {*} db RxDB database
 */
const pullBuilder = (doc) => {
  const where = doc ? `lastmodifiedAt_Gt: "${doc.lastmodifiedAt}"` : "";

  const query = `{
    listFixings(
      limit: ${REPLICATION_SIZE}
      offset: 0
      ordering: "lastmodifiedAt,ASC",
      ${where}
    ) {
        results{

            fixingUuid
            id
            isActive

            image
            description
            fixingStatus{
              id
              name
            }

            project {
              id
              name
            }
            snagging{
                id
                item{
                    id
                    details
                }
            }

            createdBy{
              id
              email
              name
            }
            lastmodifiedBy{
              id
              email
              name
            }
            lastmodifiedAt
          }
    }
  }`;

  return { query, variables: {} };
};

/**
 * Push builder for project result of fixing data
 *
 * @param {*} db RxDB database
 */
const pushBuilder = (doc) => {
  console.log('fixing_push_replication',doc);
  const query = `
  mutation h{
    customFixingUpsert (

      fixingUuid:"${doc.fixingUuid}"
      image:"${doc.image}"
      description:"${doc.description}"
      status:"${doc.fixingStatus.id}"

      projectId:"${doc.project.id}"
      snaggingId: "${doc.snagging.id}"
      createdBy: "${doc.createdBy.id}"
    ){
      projectId
    }
  }
  `;

  return { query, variables: {} };
};

/**
 * Synchronize project result of fixing data with GraphQL endpoint
 */
export const syncProjectFixing = (...args) => {
  return buildReplication(
    ...args,
    "project_fixing",
    { pullBuilder, pullQuery: "listFixings" },
    { pushBuilder, pushQuery: "customFixingUpsert" }
  );
};
