/**
 * Project info de-snagging  schema
 */
const schema = {
  version: 3,

  title: "De-snag Schema",
  description: "Describes a De-snag schema",

  primaryKey: "deSnaggingUuid",
  type: "object",
  properties: {
    deSnaggingUuid: {
      type: "string",
      maxLength: 36,
      final: true,
    },
    id: {
      type: "string",
      maxLength: 36,
      final: true,
    },
    isActive: {
      type: "boolean",
    },

    // general info
    deSnaggingStatus: {
      type: ["object", "null"],
    },
    description: {
      type: ["string", "null"],
    },
    image: {
      type: ["string", "null"],
    },

    // project related info
    project: {
      type: ["object", "null"],
    },

    // further fixing inspection info
    snagging: {
      type: ["object", "null"],
    },
    fixing: {
      type: ["object", "null"],
    },

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
  // Added created by and deSnaggingStatus of type object
  1: (doc) => doc,
   // Added Image type null as well
  2: (doc) => doc,
  // remove null from lastModifiedAt
  3: (doc) => doc,
};

const collection = { schema, migrationStrategies };

export default collection;
