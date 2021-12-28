/**
 * User defined type guard for checking
 * Learn more here:
 * https://www.typescriptlang.org/docs/handbook/2/narrowing.html#using-type-predicates
 */
// deno-lint-ignore-file no-explicit-any
/**
 * @description Internal helper to check if parameter is a string
 * @function isString
 * @param {*} str
 * @returns {boolean}
 */
const isString = (str: any): str is string => {
  return typeof str === "string" || str instanceof String;
};

/**
 * @description Internal helper to check if string is empty
 * @function isStringEmpty
 * @param {*} str
 * @returns {boolean}
 */
type nonEmptyString = never;
const isStringEmpty = (str: any): str is nonEmptyString => {
  if (!isString(str)) return false;
  return str.length === 0;
};

/**
 * @description Internal helper to check if parameter is a date
 * @function isDate
 * @param {*} date
 * @returns {boolean}
 */
const isDate = (date: any): date is Date => {
  if (isString(date) || isArray(date) || date == undefined || date == null)
    return false;
  return (
    date &&
    Object.prototype.toString.call(date) === "[object Date]" &&
    !isNaN(date)
  );
};

/**
 * @description Internal helper to check if parameter is an object
 * @function isObject
 * @param {*} obj
 * @returns {boolean}
 */
const isObject = (obj: any): obj is Record<string, string> => {
  if (isArray(obj) || isDate(obj)) return false;
  return obj !== null && typeof obj === "object";
};

/**
 * @description Internal helper to check if object has any keys
 * @function isEmptyObject
 * @param {*}  obj
 * @returns {boolean}
 */
const isEmptyObject = (obj: any): obj is Record<string, string> => {
  return Object.keys(obj).length === 0;
};
/**
 * @description Internal helper to check if parameter is a number
 * @function isNumber
 * @param {*} num
 * @returns {boolean}
 */
const isNumber = (num: any): num is number => {
  return !isNaN(num) && !isNaN(parseInt(num));
};

/**
 * @description Internal helper to check if parameter is an array
 * @function isArray
 * @param {*} arr
 * @returns {boolean}
 */
const isArray = (arr: any): arr is Array<unknown> => {
  return Array.isArray(arr);
};

export default {
  isString,
  isStringEmpty,
  isDate,
  isObject,
  isEmptyObject,
  isNumber,
  isArray,
};
