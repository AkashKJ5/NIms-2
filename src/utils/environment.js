/**
 * Current app version (last commit hash)
 * @constant
 * @type {string}
 */
export const VERSION = process.env.REACT_APP_VERSION || '---'

/**
 * Current app release (based on git branch)
 * @constant
 * @type {string}
 */
export const RELEASE = process.env.REACT_APP_RELEASE || '---'

/**
 * RxDB database name
 * @constant
 * @type {string}
 */
//  export const DB_NAME = process.env.REACT_APP_DB_NAME;

/**
 * RxDB database password
 * @constant
 * @type {string}
 */
export const DB_PASSWORD = process.env.REACT_APP_DB_PASSWORD

/**
 * The URL used to access the backend GraphQL endpoint
 * @constant
 * @type {string}
 */
export const GRAPHQL_ENDPOINT = process.env.REACT_APP_BACKEND_ENDPOINT_URL

/**
 * Prints out environment variable values (except secrets)
 */
export const expose = () => {
  console.log(`Release:  ${RELEASE}`)
  console.log(`Version:  ${VERSION}`)
  console.log(`GraphQL:  ${GRAPHQL_ENDPOINT}`)
}
