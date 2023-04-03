import moment from 'moment';

/**
 * Parses ISO date time string into formatted long date time based on current locale
 * @param {Date} val
 * @returns string
 */
export const parseFullDateTime = (val) => moment(val).format('LLLL');

/**
 * Parses ISO date time string into formatted date time based on current locale
 * @param {Date} val
 * @returns string
 */
export const parseDateTime = (val) => moment(val).format('LLL');

/**
 * Parses ISO date time string into formatted long date based on current locale
 * @param {Date} val
 * @returns string
 */
export const parseFullDate = (val) => moment(val).format('LL');

/**
 * Parses ISO date time string into formatted date based on current locale
 * @param {Date} val
 * @returns string
 */
export const parseDate = (val) => moment(val).format('ll');

/**
 * Parses ISO date time string into formatted date based on current locale
 * @param {Date} val
 * @returns string
 */
export const parseISODate = (val) => moment(val).format('YYYY-MM-DD');

/**
 * Parses ISO date time string into formatted long time based on current locale
 * @param {Date} val
 * @returns string
 */
export const parseFullTime = (val) => moment(val).format('LTS');

/**
 * Parses ISO date time string into formatted time based on current locale
 * @param {Date} val
 * @returns string
 */
export const parseTime = (val) => moment(val).format('LT');

/**
 * Parses ISO date into Date object
 * @param {string} val
 * @returns Date
 */
export const toDate = (val) => val ? moment(val, ['YYYY-MM-DD', moment.ISO_8601]).toDate() : null;
