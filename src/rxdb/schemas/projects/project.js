import { auditFields } from "../common";

/**
 * Project Info schema
 */
const schema = {
  version: 4,

  title: "Project Schema",
  description: "Describes a Project",

  primaryKey: "id",
  type: "object",
  properties: {
    id: {
      type: "string",
    },
    name: {
      type: "string",
    },
    address: {
      type: ["string", "null"],
    },
    email: {
      type: ["string", "null"],
    },
    city: {
      type: ["string", "null"],
    },
    unit: {
      type: ["number", "null"],
    },
    status: {
      type: ["object", "null"],
    },
    projectDescriptions: {
      type: "array",
    },
    template: {
      type: ["object", "null"],
    },
    subscriber: {
      type: "object",
    },
    projectAspects: {
      type: "array",
    },
    customer: {
      type: ["object", "null"],
    },
    customerType: {
      type: ["object", "null"],
    },
    project: {
      type: ["object", "null"],
    },
    projectType: {
      type: ["object", "null"],
    },

    snagPriorities: {
      type: "boolean",
    },
    hasDesnaggingPhase: {
      type: "boolean",
    },
    hasFixingPhase: {
      type: "boolean",
    },

    // assigned users name
    users: {
      type: ["array", "null"],
    },
    ...auditFields,
  },

  required: ["id", "name"],
  indexes: [["name"]],
  keyCompression: true,
};

/**
 * Migration strategies
 */
const migrationStrategies = {
  // Fixed "projectDescriptions" is required
  1: (doc) => doc,
  // Fixed "projectDescriptions" type of array
  2: (doc) => doc,
  // Added status field
  3: (doc) => doc,
  // Added snagPriorities,hasDesnaggingPhase and hasFixingPhase
  4: (doc) => doc,
};

const collection = { schema, migrationStrategies };

export default collection;
