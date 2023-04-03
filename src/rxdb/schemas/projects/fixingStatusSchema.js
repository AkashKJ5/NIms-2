import { auditFields } from "../common";

/**
 * Project de-snagging Status Schema
 */
const schema = {
  version: 0,

  title: "Project fixing Status Schema",
  description: "Describes a Project fixing Status",

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
