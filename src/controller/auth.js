/* globals fetch */

// import { GRAPHQL_ENDPOINT } from '../constants/env';
// import { parseGraphQlString2JSON } from '../utils';

/**
 * Fetches current user data from GraphQL endpoint
 *
 * @returns Promise that return logged in user data
 */
const getUserData = (token) => {
  const query = `{
    whoami {
      id
      username
      name
      email
      firstName
      lastName
      role { id name permissionKeys }
      isActive
      isStaff
      isSuperuser
    }
  }`;

  return fetch(process.env.REACT_APP_BACKEND_ENDPOINT_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `JWT ${token}`
    },
    body: JSON.stringify({ query })
  })
    .then((res) => res.json())
    .then((res) => res.data.whoami)
    .then((user) => {
      // permissionKeys comes as a string and should be an array of strings
      // "['a', 'b', ...]" => '["a", "b", ...]' => ['a', 'b', 'c']
      // // if (user.role) {
      //   user.role.permissionKeys = parseGraphQlString2JSON(user.role.permissionKeys, []);
      // }
      return user;
    });
};

/**
 * Logs in against GraphQL endpoint
 *
 * @param {String} username
 * @param {String} password
 * @returns Promise that return logged in user data and refresh token
 */
export const loginGraphQL = (username, password) => {
  const query = `mutation {
    login(email: "${username}", password: "${password}") { refreshToken token }
  }`;

  return fetch(process.env.REACT_APP_BACKEND_ENDPOINT_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify({ query })
  })
    .then((res) => res.json())
    .catch((err) => {
      // unexpected error
      console.error(err);
      throw new Error('unexpected');
    })
    .then((res) => {
      if (res.errors) {
        throw new Error('credentials');
      }
      return res.data.login;
    })
    .then((data) => getUserData(data.token).then((user) => ({ ...data, user })));
};

/**
 * Refreshes JWT against GraphQL endpoint
 *
 * @param {String} username
 * @param {String} password
 * @returns Promise that return logged in user data and refresh token
 */
// export const refreshGraphQL = (refreshToken, token) => {
//   const query = `mutation {
//     refreshToken(refreshToken: "${refreshToken}") { refreshToken token }
//   }`;

//   return fetch(process.env.REACT_APP_BACKEND_ENDPOINT_URL, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       Accept: 'application/json',
//       Authorization: `JWT ${token}`
//     },
//     body: JSON.stringify({ query })
//   })
//     .then((res) => res.json())
//     .catch((err) => {
//       // unexpected error
//       console.error(err);
//       return { refreshToken, token };
//     })
//     .then((res) => {
//       if (res.errors) {
//         throw new Error('credentials');
//       }
//       return res.data.refreshToken;
//     })
//     .then((data) => getUserData(data.token).then((user) => ({ ...data, user })));
// };
