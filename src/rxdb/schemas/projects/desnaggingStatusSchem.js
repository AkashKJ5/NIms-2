import { auditFields } from "../common";

/**
 * Project de-snagging Status Schema
 */
const schema = {
  version: 0,

  title: "Project de-snagging Status Schema",
  description: "Describes a Project de-snagging Status",

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

const migrationStrategies = {};

const collection = { schema, migrationStrategies };

export default collection;
