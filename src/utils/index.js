import { v4 as uuid4 } from "uuid";

/**
 * Parses GraphQL values that represent a JSON object
 *
 * @param {string} value
 * @param {Object} onErrorValue
 * @returns JSON Object
 */
export const parseGraphQlString2JSON = (value, onErrorValue) => {
  try {
    return JSON.parse(value.toString().split("'").join('"'));
  } catch (err) {
    return onErrorValue;
  }
};

/**
 * Generates a new UUID (v4) value
 *
 * @returns UUID string
 */
export const getNewUUID = () => uuid4();

/**
 * Truncates string if is longer than the indicated size
 *
 * @param {string} value
 *
 * @returns truncated string
 */
export const ellipsis = (value, size = 30) =>
  value.length < size ? value : value.substring(0, size) + "…";

export const getRegExp = (text) => {
  try {
    const safeText = text
      .replace("\\", "\\\\")
      .replace("+", "\\+")
      .replace("?", "\\?")
      .replace("*", "\\*")
      .replace("[", "\\[")
      .replace("]", "\\]")
      .replace("(", "\\(")
      .replace(")", "\\)")
      .trim();
    return new RegExp(`${safeText}`, "i");
  } catch (ignore) {
    return /^$/;
  }
};
