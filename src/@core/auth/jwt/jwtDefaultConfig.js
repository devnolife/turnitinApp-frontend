export const baseUrl = 'http://localhost:8080'
// export const baseUrl = 'http://103.186.1.3:8080'
// export const baseUrl = 'http://10.0.8.104:8080'
export default {

  loginEndpoint: `${baseUrl}/api/login`,
  registerEndpoint: `${baseUrl}/api/register`,
  refreshEndpoint: `${baseUrl}/api/refresh-token`,
  logoutEndpoint: `${baseUrl}/api/logout`,
  tokenType: 'Bearer',
  storageTokenKeyName: 'accessToken',
  storageRefreshTokenKeyName: 'refreshToken'
}
