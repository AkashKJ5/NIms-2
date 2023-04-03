// import { permissions } from '../../utils/auth';

import { REPLICATION_INTERVAL, REPLICATION_SIZE } from "../../utils/constants";

import { GRAPHQL_ENDPOINT } from "../../utils/environment";
import { collections } from "../collections";

export const buildReplication = (
  db,
  module,
  pullOptions = null,
  pushOptions = null
) => {
  let pull;
  let push;
  const auth = localStorage.getItem("login")
    ? JSON.parse(localStorage.getItem("login"))
    : "";
  if (pullOptions) {
    const { pullBuilder, pullQuery } = pullOptions;

    if (pullBuilder) {
      pull = {
        batchSize: REPLICATION_SIZE,
        dataPath: `data.${pullQuery}.results`,
        modifier: (doc) => ({ ...doc, lastSynchedAt: new Date().toISOString() }),
        queryBuilder: pullBuilder,
        responseModifier: async function (
          // the exact response that was returned from the server
          plainResponse,
          // either 'handler' if plainResponse came from the pull.handler,
          // or 'stream' if it came from the pull.stream
          origin,
          // if origin==='handler', the requestCheckpoint contains
          // the checkpoint that was send to the backend
          requestCheckpoint
        ) {
          return {
            documents: plainResponse,
            checkpoint: plainResponse.length === 0
              ? requestCheckpoint
              : {
                  lastmodifiedAt: plainResponse[plainResponse.length - 1].lastmodifiedAt
                }
          };
        }
      };
    }
  }

  // console.log('pushOptions',pushOptions);

  if (pushOptions) {
    const { pushBuilder } = pushOptions;

    // Since RxDB 13 the push queryBuilder method receives a list of documents
    // then we need to parse it to the previous state
    const queryBuilder = (docs) => {
      return pushBuilder(docs[0].newDocumentState);
    };

    if (pushBuilder) {
      push = {
        batchSize: 1,
        queryBuilder
      };
    }
  }

  if (!pull && !push) return [];
  // console.log('push',push)

  const collection = collections[module](db);

  return [
    collection.syncGraphQL({
      url: { http: GRAPHQL_ENDPOINT },
      headers: { Authorization: `JWT ${auth.token}` },
      pull,
      push,
      live: true,
      liveInterval: REPLICATION_INTERVAL,
    }),
  ];
};
