/**
 * Project info Snagging  schema
 */
const schema = {
  version: 3,

  title: "Snagging Schema",
  description: "Describes a snagging schema",

  primaryKey: "snaggingUuid",
  type: "object",
  properties: {
    // PK for mobile RXdb
    snaggingUuid: {
      type: "string",
    },

    // PK for backend
    id: {
      type: "string",
    },
    isActive: {
      type: "boolean",
    },

    // general info
    snaggingStatus: {
      type: ["object", "null"],
    },
    priorityField: {
      type: ["object", "null"],
    },
    description: {
      type: ["string", "null"]
    },
    image: {
      type: ["string", "null"]
    },

    // project related info
    project: {
      type: ["object", "null"],
    },
    units: {
      type: ["object", "null"],
    },
    item: {
      type: ["object", "null"],
    },
    room: {
      type: ["object", "null"],
    },
    aspect: {
      type: ["object", "null"],
    },
    section: {
      type: ["object", "null"],
    },

    // // further fixing inspection info
    // fixings: {
    //   type: "array",
    // },

    // Audits instances manipulation
    lastmodifiedAt: {
      type: "string",
      format: "datetime",
    },
    lastmodifiedBy: {
      type: ["object", "null"],
    },
    createdBy: {
      type: ["object", "null"],
    },

    //Controls synchronization with backend
    lastSynchedAt: {
      type: ["string", "null"],
      format: "datetime",
    },
  },

  required: ["id"],
  keyCompression: true,
};

/**
 * Migration strategies
 */
const migrationStrategies = {
  // Added created by, and snaggingStatus, priorityField of type object
  1: (doc) => doc,
  2: (doc2) => doc2,
  3: (doc3) => doc3,
};

const collection = { schema, migrationStrategies };

export default collection;
