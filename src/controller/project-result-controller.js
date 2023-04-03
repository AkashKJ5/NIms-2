import {
  getProjectDesnagging,
  getProjectFixing,
  getProjectSnagging,
} from "../rxdb/collections";

import { v4 as uuidV4 } from "uuid";

/**
 * Creates snagging
 *
 * @param {*} db    RxDB database
 * @param {*} data  project info data
 * @param {*} auth  user authentication
 * @returns Promise indicating if action succeed
 */
export const addSnaggingUrls = (db, data, auth) => {
  return getProjectSnagging(db)
    .insert({
      snaggingUuid: uuidV4(),
      id: "",
      isActive: data.isActive,

      snaggingStatus: data.status,
      priorityField: data.priority,
      image: data.path,
      description: data.description,

      project: { id: localStorage.getItem("projectId") },
      units: { id: localStorage.getItem("unitId") },
      item: { id: data.item.id },
      room: { id: data.room.id },
      aspect: { id: data.section.aspect.id },
      section: { id: data.section.id },

      fixings: [],

      // reviewedBy: null,
      // reviewedOn: new Date().toISOString(),

      lastmodifiedAt: new Date().toISOString(),

      lastmodifiedBy: {
        id: auth.user.id,
        email: auth.user.email,
        name: auth.user.name,
      },
      createdBy: {
        id: auth.user.id,
        email: auth.user.email,
        name: auth.user.name,
      },
    })
    .then(() => {
      console.log("data inserted successfully");
      return true;
    })
    .catch((err) => {
      console.log("data dint inserted successfully");
      console.error("error++>>", err);
      return false;
    });
};

/**
 * edit snagging based on users
 *
 * @param {*} db    RxDB database
 * @param {*} data  project info data
 * @param {*} auth  user authentication
 * @returns Promise indicating if action succeed
 */
export const editProjectSnagging = (db, data, auth) => {
  const { existId } = data;
  const doc = getProjectSnagging(db).findOne({
    selector: { snaggingUuid: existId },
  });

  return doc
    .update({
      $set: {
        snaggingStatus: data.status,
        priorityField: data.priority,
        image: data.path,
        description: data.description,
        // Audit fields
        lastmodifiedAt: new Date().toISOString(),
      },
    })
    .then((data) => {
      console.log("data updated successfully", data);
      return true;
    })
    .catch((err) => {
      console.error(err);
      console.log("something went wrong", err);
      return false;
    });
};

/**
 * Creates fixing
 *
 * @param {*} db    RxDB database
 * @param {*} data  project with snagging info data
 * @param {*} auth  user authentication
 * @returns Promise indicating if action succeed
 */
export const addFixingUrls = (db, data, auth) => {
  return getProjectFixing(db)
    .insert({
      fixingUuid: uuidV4(),
      id: "",
      isActive: data.isActive,

      fixingStatus: data.status,
      image: data.path,
      description: data.description,

      project: { id: localStorage.getItem("projectId") },

      snagging: data.snagging,

      // reviewedBy: null,
      // reviewedOn: new Date().toISOString(),

      lastmodifiedBy: {
        id: auth.user.id,
        email: auth.user.email,
        name: auth.user.name,
      },
      createdBy: {
        id: auth.user.id,
        email: auth.user.email,
        name: auth.user.name,
      },
      lastmodifiedAt: new Date().toISOString(),
    })
    .then(() => {
      console.log("data inserted successfully");
      return true;
    })
    .catch((err) => {
      console.log("data dint inserted successfully");
      console.error("error++>>", err);
      return false;
    });
};

/**
 * Edit fixing
 *
 * @param {*} db    RxDB database
 * @param {*} data  project with snagging info data
 * @param {*} auth  user authentication
 * @returns Promise indicating if action succeed
 */
export const editProjectFixing = (db, data, auth) => {
  const { existId } = data;
  const doc = getProjectFixing(db).findOne({
    selector: { fixingUuid: existId },
  });

  return doc
    .update({
      $set: {
        fixingStatus: data.status,
        image: data.path,
        description: data.description,
        // Audit fields
        lastmodifiedAt: new Date().toISOString(),
      },
    })
    .then((data) => {
      console.log("data updated successfully", data);
      return true;
    })
    .catch((err) => {
      console.error(err);
      console.log("something went wrong", err);
      return false;
    });
};

/**
 * Creates De-snagging records
 *
 * @param {*} db    RxDB database
 * @param {*} data  project with snagging info data
 * @param {*} auth  user authentication
 * @returns Promise indicating if action succeed
 */
export const addDesnagUrls = (db, data, auth) => {
  return getProjectDesnagging(db)
    .insert({
      deSnaggingUuid: uuidV4(),
      id: "",
      isActive: data.isActive,

      status: data.status,
      image: data.path,
      description: data.description,

      project: { id: localStorage.getItem("projectId") },

      snagging: data.snagging,
      fixing: data.fixing,

      // reviewedBy: null,
      // reviewedOn: new Date().toISOString(),

      lastmodifiedBy: {
        id: auth.user.id,
        email: auth.user.email,
        name: auth.user.name,
      },
      createdBy: {
        id: auth.user.id,
        email: auth.user.email,
        name: auth.user.name,
      },
      lastmodifiedAt: new Date().toISOString(),
    })
    .then(() => {
      console.log("data inserted successfully");
      return true;
    })
    .catch((err) => {
      console.log("data dint inserted successfully");
      console.error("error++>>", err);
      return false;
    });
};

/**
 * De-snagging fixing
 *
 * @param {*} db    RxDB database
 * @param {*} data  project with snagging info data
 * @param {*} auth  user authentication
 * @returns Promise indicating if action succeed
 */
export const editProjectDesnagging = (db, data, auth) => {
  const { existId } = data;
  const doc = getProjectFixing(db).findOne({
    selector: { deSnaggingUuid: existId },
  });

  return doc
    .update({
      $set: {
        status: data.status,
        image: data.path,
        description: data.description,
        // Audit fields
        lastmodifiedAt: new Date().toISOString(),
      },
    })
    .then((data) => {
      console.log("data updated successfully", data);
      return true;
    })
    .catch((err) => {
      console.error(err);
      console.log("something went wrong", err);
      return false;
    });
};
