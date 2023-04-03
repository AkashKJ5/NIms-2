import { auditFields } from "./common";

/**
 * Project Results schema
 */
const schema = {
  version: 0,

  title: "Unit Status Schema",
  description: "Describes a Unit Status",

  primaryKey: "id",
  type: "object",
  properties: {
    id: {
      type: "string",
    },
    name: {
      type: "string",
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
