/**
 * Audit fields used in all the schemas
 */
export const auditFields = {
  // Controls when the instance should be shown to the user
  isActive: {
    type: "boolean",
  },

  // Audits instances manipulation
  lastmodifiedAt: {
    type: "string",
    format: "datetime",
  },

  // Controls synchronization with backend
  lastSynchedAt: {
    type: "string",
    format: "datetime",
  },

  // Author data
  createdBy: {
    type: "string",
  },

  createdAt: {
    type: "string",
    format: "datetime",
  },
};
