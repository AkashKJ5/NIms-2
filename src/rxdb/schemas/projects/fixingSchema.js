/**
 * Project info Snagging  schema
 */
const schema = {
  version: 1,

  title: "Fixing Schema",
  description: "Describes a fix schema",

  primaryKey: "fixingUuid",
  type: "object",
  properties: {
    fixingUuid: {
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
    fixingStatus: {
      type: ["object", "null"],
    },
    description: {
      type: ["string", "null"],
    },
    image: {
      type: "string",
    },

    // project related info
    project: {
      type: ["object", "null"],
    },

    // further fixing inspection info
    snagging: {
      type: ["object", "null"],
    },

    // Audits instances manipulation
    lastmodifiedAt: {
      type: ["string", "null"],
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
  // Added created by and fixingStatus of type object
  1: (doc) => doc,

};

const collection = { schema, migrationStrategies };

export default collection;
