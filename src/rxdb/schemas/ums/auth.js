import { emptyMigration, types } from '../common';

/**
 * Authentication & authorization schema
 */
const schema = {
  version: 1,

  title: 'Auth',
  description: 'Authentication & authorization',

  primaryKey: 'id',
  type: 'object',
  properties: {
    id: types.ID,

    // From `login` mutation
    refreshToken: types.STRING,
    token: types.STRING,

    // From `whoami` query
    user: types.OBJECT
  },

  required: ['id'],
  encrypted: ['token', 'refreshToken'],
  keyCompression: true
};

/**
 * Migration strategies
 */
const migrationStrategies = {
  // encrypt token and refreshToken
  1: emptyMigration
};

const ID = '00000000-0000-0000-0000-000000000000';

/**
 * Collection methods
 */
const statics = {
  /**
   * Creates the unique document
   *
   * @returns Promise
   */
  init: function () {
    // create if missing but ignore error if it already exists
    return this
      .insert({ id: ID })
      .then(() => true)
      .catch(() => true);
  },

  /**
   * Returns the unique document
   *
   * @returns RxQuery
   */
  getAuth: function () {
    return this.findOne({ selector: { id: ID } });
  },

  /**
   * Sets authentication data (current user, token and refreshToken)
   *
   * @param {object} data  Logged in user data
   * @returns Promise
   */
  setAuth: function (data) {
    return this.getAuth()
      .update({ $set: { ...data } })
      .then(() => true)
      .catch((err) => {
        console.error(err);
        throw new Error('db-error');
      });
  },

  /**
   * Removes authentication data (sets "user", "token", "refreshToken" to null)
   *
   * @returns Promise
   */
  clearAuth: function () {
    return this.setAuth({ user: null, token: null, refreshToken: null });
  }
};

/**
 * Instance methods
 */
const methods = {
  /**
   * Checks if logged in user is superuser
   *
   * @returns boolean
   */
  isSuperuser: function () {
    const user = this.user;

    if (!user) return false;
    return user.isSuperuser;
  },

  /**
   * Checks if logged in user has the indicated permission
   *
   * @param {string} perm  Permission
   * @returns boolean
   */
  hasPermission: function (perm) {
    const user = this.user;

    if (!user) return false;
    if (user.isSuperuser || !perm) return true;
    if (!user.role) return false;

    return user.role.permissionKeys.indexOf(perm) > -1;
  },

  /**
   * Checks if logged in user has at least one of indicated permissions
   *
   * @param {array}  perms  List of permissions
   * @returns boolean
   */
  hasAnyPermission: function (perms) {
    const user = this.user;

    if (!user) return false;
    if (user.isSuperuser || !perms || perms.length === 0) return true;
    if (!user.role) return false;

    return perms.find((perm) => this.hasPermission(perm));
  },

  /**
   * Checks if logged in user has all of indicated permissions
   *
   * @param {array}  perms  List of permissions
   * @returns boolean
   */
  hasPermissions: function (perms) {
    const user = this.user;

    if (!user) return false;
    if (user.isSuperuser || !perms || perms.length === 0) return true;
    if (!user.role) return false;

    return !perms.find((perm) => !this.hasPermission(perm));
  }
};

/**
 * Collection definition
 */
export default { schema, migrationStrategies, statics, methods };
