/**
 * Authentication & authorization schema
 */
const schema = {
  version: 0,

  title: "Auth Schema",
  description: "Describes authentication & authorization schema",

  primaryKey: "id",
  type: "object",
  properties: {
    id: {
      type: "string",
      maxLength: 36,
      final: true,
    },

    // From `login` mutation
    refreshToken: {
      type: "string",
    },
    token: {
      type: "string",
    },

    // From `whoami` query
    user: {
      type: ["object", "null"],
    },
  },

  required: ["id"],
  keyCompression: true,
};

const statics = {
  getId: () => "00000000-0000-0000-0000-000000000000",
};

const collection = { schema, statics };

export default collection;
