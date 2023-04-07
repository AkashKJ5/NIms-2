import { auditFields } from "../common";

/**
 * Project snagging Status Schema
 */
const schema = {
  version: 0,

  title: "Project snagging Status Schema",
  description: "Describes a Project snagging Status",

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
    ...auditFields,
  },

  required: ["id"],
  keyCompression: true,
};

const migrationStrategies = {};

const collection = { schema, migrationStrategies };

export default collection;
