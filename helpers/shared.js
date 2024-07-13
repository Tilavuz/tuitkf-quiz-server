const baseUrl = process.env.BASE_URL
const port = process.env.PORT || 3000
const jwtDecoded = process.env.JWT_KEY;





module.exports = { baseUrl, port, jwtDecoded };