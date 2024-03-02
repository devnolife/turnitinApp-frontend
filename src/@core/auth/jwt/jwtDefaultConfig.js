// ** Auth Endpoints

export const baseUrl = 'http://localhost:8080'
export default {

  loginEndpoint: `${baseUrl}/api/login`,
  registerEndpoint: `${baseUrl}/api/register`,
  refreshEndpoint: `${baseUrl}/api/refresh-token`,
  logoutEndpoint: `${baseUrl}/api/logout`,

  // ** This will be prefixed in authorization header with token
  // ? e.g. Authorization: Bearer <token>
  tokenType: 'Bearer',

  // ** Value of this property will be used as key to store JWT token in storage
  storageTokenKeyName: 'accessToken',
  storageRefreshTokenKeyName: 'refreshToken'
}
