import { auditFields } from "./common";

/**
 * Layout schema
 */
const schema = {
  version: 0,

  title: "Layout Schema",
  description: "Describes a Layout",

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
    roomTypes: {
      type: ["array", "null"],
    },
    project: {
      type: ["object", "null"],
    },
    ...auditFields,
  },

  required: ["id", "name"],
  indexes: [["name"]],
  keyCompression: true,
};

const collection = { schema };

export default collection;
