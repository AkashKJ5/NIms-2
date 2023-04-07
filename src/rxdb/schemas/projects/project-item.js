import { auditFields } from "../common";

/**
 * Project Item schema
 */
const schema = {
  version: 1,

  title: "Project Item Schema",
  description: "Describes a Project Item",

  primaryKey: "id",
  type: "object",
  properties: {
    id: {
      type: "string",
      maxLength: 36,
      final: true,
    },
    details: {
      type: "string",
    },
    section: {
      type: ["object", "null"],
    },
    description: {
      type: ["object", "null"],
    },

    ...auditFields,
  },

  required: ["id"],
  keyCompression: true,
};

/**
 * Migration strategies
 */
const migrationStrategies = {
  // added section in item
  1:((doc)=>doc)
};

const collection = { schema, migrationStrategies };

export default collection;
