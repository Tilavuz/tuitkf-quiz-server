const rateLimit = require('express-rate-limit')

const loginLimiter = rateLimit({
    windowMs: 5 * 60 * 1000,
    max: 5,
    handler: (req, res) => {
        res.status(429).json({
          message: "Sizning so'rovlaringiz blocklandi! 5 daqiqadan keyin qayta urinib ko'ring",
        });
    }
})


module.exports = {loginLimiter}