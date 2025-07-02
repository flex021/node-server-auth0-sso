import { auth } from 'express-oauth2-jwt-bearer'

// Với việc dùng thuật toán RS256, kết hợp thằng express-oauth2-jwt-bearer sẽ tự động xử lý việc lấy và sử dụng khóa công khai từ Auth0 thông qua cơ chế jwks.json, do đó chúng ta không cần phải cung cấp secret trong quá trình verify JWT.
const auth0JwtCheck = auth({
  audience: 'https://node-server-auth0-sso-8zdx.onrender.com',
  issuerBaseURL: 'https://dev-afs26bivertitevu.us.auth0.com/',
  tokenSigningAlg: 'RS256'
})

export const authMiddleware = {
  auth0JwtCheck
}
