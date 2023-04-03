import { REPLICATION_SIZE } from "../../utils/constants";
import { buildReplication } from "./utils";

/**
 * Pull builder for project result data
 *
 * @param {*} db RxDB database
 */
const pullBuilder = (doc) => {
  const where = doc ? `lastmodifiedAt_Gt: "${doc.lastmodifiedAt}"` : "";

  const query = `{
    listSnaggings(
      limit: ${REPLICATION_SIZE}
      offset: 0
      ordering: "lastmodifiedAt,ASC",
      ${where}
    ) {
        results{
            id
            snaggingUuid
            isActive
            image
            description
            snaggingStatus{
              id
              name
            }
            priorityField{
              id
              name
            }
            fixings{
              id
            }
            project {
              id
              name
            }
            units{
              id
              name
            }
            room{
              id
              name
            }
            item {
              id
              details
            }
            section {
              id
              details
            }
            aspect{
              id
              name
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
 * Push builder for project snagging data
 *
 * @param {*} db RxDB database
 */
const pushBuilder = (doc) => {
  console.log(doc, 'push_replication_snagging');
  const query = `
  mutation h{
    customSnaggingUpsert (
      snaggingUuid: "${doc.snaggingUuid}"
      image:"${doc.image}"
      description:"${doc.description}"
      statusId:"${doc.snaggingStatus.id}"
      priorityFieldId:"${doc.priorityField.id}"

      unitId: "${doc.units.id}"
      itemId: "${doc.item.id}"
      projectId:"${doc.project.id}"
      roomId:"${doc.room.id}"
      aspectId: "${doc.aspect.id}"
      sectionId: "${doc.section.id}"

      createdBy: "${doc.createdBy.id}"

    ){
      projectId
    }
  }
  `;
  return { query, variables: {} };
};

/**
 * Synchronize project result  data with GraphQL endpoint
 */
export const syncProjectSnagging = (...args) => {
  return buildReplication(
    ...args,
    "project_snagging",
    { pullBuilder, pullQuery: "listSnaggings" },
    { pushBuilder, pushQuery: "customSnaggingUpsert" }
  );
};
