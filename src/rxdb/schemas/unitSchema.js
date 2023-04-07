import { auditFields } from "./common";

/**
 * Unit schema
 */
const schema = {
  version: 1,

  title: "Unit Schema",
  description: "Describes a Unit",

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
    details: {
      type:["string", "null"],
    },
    project: {
      type: ["object", "null"],
    },
    layout: {
      type: ["object", "null"],
    },
    status: {
      type: ["object", "null"],
    },
    ...auditFields,
  },

  required: ["id", "name"],
  indexes: [["name"]],
  keyCompression: true,
};

/**
 * Migration strategies
 */
const migrationStrategies = {
  // removed sector fields
  1:((doc)=>doc)
};

const collection = { schema, migrationStrategies };

export default collection;
