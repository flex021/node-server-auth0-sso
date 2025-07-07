import { auth } from 'express-oauth2-jwt-bearer'


const auth0JwtCheck = auth({
  audience: 'https://node-server-auth0-sso-8zdx.onrender.com',
  issuerBaseURL: 'https://dev-afs26bivertitevu.us.auth0.com/',
  tokenSigningAlg: 'RS256'
})

export const authMiddleware = {
  auth0JwtCheck
}
