import { auditFields } from "../common";

/**
 * Project Results schema
 */
const schema = {
  version: 0,

  title: "Project Status Schema",
  description: "Describes a Project Status",

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

const collection = { schema };

export default collection;
