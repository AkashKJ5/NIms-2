import { auditFields } from "./common";

/**
 * Authentication & authorization schema
 */
const schema = {
  version: 2,

  title: "User Schema",
  description: "Describes User schema",

  primaryKey: "id",
  type: "object",
  properties: {
    id: {
      type: "string",
    },
    email: {
      type: "string",
    },
    username: {
      type:["string", "null"],
    },
    projects: {
      type: "array",
    },
    ...auditFields,
  },

  required: ["username"],
  keyCompression: true,
};

const migrationStrategies = {
  // changed field project to projects
  1: (doc) => doc,
  // Changed pk and added email
  2: (doc) => doc,
};
const collection = { schema, migrationStrategies };

export default collection;
