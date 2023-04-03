import { auditFields } from "../common";

/**
 * Project snagging priority schema
 */
const schema = {
  version: 0,

  title: "Project snagging priority Schema",
  description: "Describes a Project priority Status",

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
