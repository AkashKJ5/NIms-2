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
} from "./constants";

/**
 * Get RxDB Authentication & authorization collection
 *
 * @param {*} db    RxDB database
 * @returns The RxDB collection
 */
export const getAuthCollection = (db) => {
  return db[AUTH_KEY];
};

/**
 * Get RxDB User collection
 *
 * @param {*} db    RxDB database
 * @returns The RxDB collection
 */
export const getUsersCollection = (db) => {
  return db[USER_KEY];
};

/**
 * Get RxDB Project collection
 *
 * @param {*} db    RxDB database
 * @returns The RxDB collection
 */
export const getProjectsCollection = (db) => {
  return db[PROJECT_KEY];
};

/**
 * Get RxDB Project status collection
 *
 * @param {*} db    RxDB database
 * @returns The RxDB collection
 */
export const getProjectStatusCollection = (db) => {
  return db[PROJECT_STATUS_KEY];
};

/**
 * Get RxDB Project aspects collection
 *
 * @param {*} db    RxDB database
 * @returns The RxDB collection
 */
export const getProjectAspectsCollection = (db) => {
  return db[PROJECT_ASPECTS_KEY];
};

/**
 * Get RxDB Project item collection
 *
 * @param {*} db    RxDB database
 * @returns The RxDB collection
 */
export const getProjectItemsCollection = (db) => {
  return db[PROJECT_ITEM_KEY];
};

/**
 * Get RxDB unit collection
 *
 * @param {*} db    RxDB database
 * @returns The RxDB collection
 */
export const getUnitsCollection = (db) => {
  return db[UNIT_KEY];
};

/**
 * Get RxDB unit status collection
 *
 * @param {*} db    RxDB database
 * @returns The RxDB collection
 */
export const getUnitStatusCollection = (db) => {
  return db[UNIT_STATUS_KEY];
};

/**
 * Get RxDB layout collection
 *
 * @param {*} db    RxDB database
 * @returns The RxDB collection
 */
export const getLayoutCollection = (db) => {
  return db[LAYOUT_KEY];
};

/**
 * Get RxDB snagging collection
 *
 * @param {*} db    RxDB database
 * @returns The RxDB collection
 */
export const getProjectSnagging = (db) => {
  return db[PROJECT_SNAGGING_KEY];
};

/**
 * Get RxDB snagging status collection
 *
 * @param {*} db    RxDB database
 * @returns The RxDB collection
 */
export const getSnaggingStatus = (db) => {
  return db[SNAGGING_STATUS_KEY];
};

/**
 * Get RxDB snagging priority collection
 *
 * @param {*} db    RxDB database
 * @returns The RxDB collection
 */
export const getSnaggingPriority = (db) => {
  return db[SNAGGING_PRIORITY_KEY];
};

/**
 * Get RxDB fixing collection
 *
 * @param {*} db    RxDB database
 * @returns The RxDB collection
 */
export const getProjectFixing = (db) => {
  return db[PROJECT_FIXING_KEY];
};

/**
 * Get RxDB fixing status collection
 *
 * @param {*} db    RxDB database
 * @returns The RxDB collection
 */
export const getFixingStatus = (db) => {
  return db[FIXING_STATUS_KEY];
};

/**
 * Get RxDB de-snagging collection
 *
 * @param {*} db    RxDB database
 * @returns The RxDB collection
 */
export const getProjectDesnagging = (db) => {
  return db[PROJECT_DE_SNAGGING_KEY];
};

/**
 * Get RxDB de-snagging status collection
 *
 * @param {*} db    RxDB database
 * @returns The RxDB collection
 */
export const getDesnaggingStatus = (db) => {
  return db[DE_SNAGGING_STATUS_KEY];
};

/**
 * Dictionary with app collections
 */
export const collections = {
  auth: getAuthCollection,
  user: getUsersCollection,

  // project info get Methods
  projects: getProjectsCollection,
  project_status: getProjectStatusCollection,
  project_item: getProjectItemsCollection,
  project_aspects: getProjectAspectsCollection,

  unit: getUnitsCollection,
  unit_status: getUnitStatusCollection,

  layout: getLayoutCollection,

  project_snagging: getProjectSnagging,
  snagging_status: getSnaggingStatus,
  snagging_priority: getSnaggingPriority,

  project_fixing: getProjectFixing,
  fixing_status: getFixingStatus,

  project_de_snagging: getProjectDesnagging,
  de_snagging_status: getDesnaggingStatus,
};
