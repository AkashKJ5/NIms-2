import {
  AUTH_KEY,
  DE_SNAGGING_STATUS_KEY,
  FIXING_STATUS_KEY,
  LAYOUT_KEY,
  PROJECT_ASPECTS_KEY,
  PROJECT_DE_SNAGGING_KEY,
  PROJECT_FIXING_KEY,
  PROJECT_ITEM_KEY,
  PROJECT_KEY,
  PROJECT_SNAGGING_KEY,
  PROJECT_STATUS_KEY,
  SNAGGING_PRIORITY_KEY,
  SNAGGING_STATUS_KEY,
  UNIT_KEY,
  UNIT_STATUS_KEY,
  USER_KEY,
} from "../constants";

import authCollection from "./authSchema";
import deSnaggingStatusCollection from "./projects/desnaggingStatusSchem";
import fixingStatusCollection from "./projects/fixingStatusSchema";
import layoutCollection from "./layoutSchema";
import projectAspectsCollection from "./projects/project-aspects";
import projectCollection from "./projects/project";
import projectDeSnaggingCollection from "./projects/desnagSchema";
import projectFixingCollection from "./projects/fixingSchema";
import projectItemsCollection from "./projects/project-item";
import projectSnaggingCollection from "./projects/snaggingSchema.js";
import projectStatusCollection from "./projects/project-status";
import snaggingPriorityCollection from "./projects/snaggingPrioritySchema";
import snaggingStatusCollection from "./projects/snaggingStatusSchema";
import unitCollection from "./unitSchema";
import unitStatusCollection from "./unitStatusSchema";
import userCollection from "./userSchema";

/**
 * RxDB collection schemas
 */
export const collections = {
  // auth collection
  [AUTH_KEY]: { ...authCollection },

  [USER_KEY]: { ...userCollection },

  [PROJECT_KEY]: { ...projectCollection },
  [PROJECT_STATUS_KEY]: { ...projectStatusCollection },
  [PROJECT_ITEM_KEY]: { ...projectItemsCollection },
  [PROJECT_ASPECTS_KEY]: { ...projectAspectsCollection },

  [UNIT_KEY]: { ...unitCollection },
  [UNIT_STATUS_KEY]: { ...unitStatusCollection },

  [LAYOUT_KEY]: { ...layoutCollection },

  [PROJECT_SNAGGING_KEY]: { ...projectSnaggingCollection },
  [SNAGGING_STATUS_KEY]: { ...snaggingStatusCollection },
  [SNAGGING_PRIORITY_KEY]: { ...snaggingPriorityCollection },

  [PROJECT_FIXING_KEY]: { ...projectFixingCollection },
  [FIXING_STATUS_KEY]: { ...fixingStatusCollection },

  [PROJECT_DE_SNAGGING_KEY]: { ...projectDeSnaggingCollection },
  [DE_SNAGGING_STATUS_KEY]: { ...deSnaggingStatusCollection },
};
