import { REPLICATION_SIZE } from "../../utils/constants";
import { buildReplication } from "./utils";

/**
 * Pull builder for project result of de-snagging data
 *
 * @param {*} db RxDB database
 */
const pullBuilder = (doc) => {
  console.log(doc, 'de-snagg_pull_replications');
  const where = doc ? `lastmodifiedAt_Gt: "${doc.lastmodifiedAt}"` : "";

  const query = `{
    listDesnaggings(
      limit: ${REPLICATION_SIZE}
      offset: 0
      ordering: "lastmodifiedAt,ASC",
      ${where}
    ) {
        results{

          deSnaggingUuid
            id
            isActive

            image
            description
            deSnaggingStatus{
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
            fixing{
                id
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
  console.log(doc, 'push-desnag');
  const query = `
  mutation h{
    customDeSnaggingUpsert (

      deSnaggingUuid:"${doc.deSnaggingUuid}"
      image:"${doc.image}"
      description:"${doc.description}"
      status:"${doc.deSnaggingStatus.id}"

      projectId:"${doc.project.id}"
      snaggingId: "${doc.snagging.id}"
      fixingId: "${doc.fixing.id}"

      createdBy: "${doc.createdBy.id}"
    ){
      projectId
    }
  }
  `;

  return { query, variables: {} };
};

/**
 * Synchronize project result of de-snagging data with GraphQL endpoint
 */
export const syncProjectDesnagging = (...args) => {
  return buildReplication(
    ...args,
    "project_de_snagging",
    { pullBuilder, pullQuery: "listDesnaggings" },
    { pushBuilder, pushQuery: "customDeSnaggingUpsert" }
  );
};
