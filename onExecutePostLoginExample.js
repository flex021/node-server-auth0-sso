const axios = require('axios')

const RENDER_API_ENDPOINT = '{your-render-api-endpoint}'
const AUTH0_CLIENT_ID = '{your-client-id}'
const AUTH0_CLIENT_SECRET = '{your-client-secret}'
const AUTH0_DOMAIN = '{your-auth0-domain}'

exports.onExecutePostLogin = async (event, api) => {

  const getAccessToken = async () => {
    const response = await axios.post(`https://${AUTH0_DOMAIN}/oauth/token`, {
      client_id: AUTH0_CLIENT_ID,
      client_secret: AUTH0_CLIENT_SECRET,
      audience: RENDER_API_ENDPOINT,
      grant_type: 'client_credentials'
    })
    return response.data.access_token
  }
  const accessToken = await getAccessToken()
  console.log('accessToken: ', accessToken)

  try {
    await axios.post(`${RENDER_API_ENDPOINT}/api-v1/users/private/hook/login`, event.user, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      }
    })
  } catch (error) {
    console.error('Error saving user to Back-end:', error)
    let errorMessage = error.message // Request failed with status code ...
    if (error.response?.data?.message) {
      errorMessage = error.response?.data?.message // Message từ API
    }
    api.access.deny(errorMessage)
  }
}
