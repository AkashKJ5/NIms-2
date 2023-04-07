import { auditFields } from "../common";

/**
 * Project Item schema
 */
const schema = {
  version: 0,

  title: "Project Aspects Schema",
  description: "Describes a Project Aspects",

  primaryKey: "id",
  type: "object",
  properties: {
    id: {
      type: "string",
      maxLength: 36,
      final: true,
    },
    name: {
      type: "string",
    },
    project: {
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
const migrationStrategies = {};

const collection = { schema, migrationStrategies };

export default collection;
