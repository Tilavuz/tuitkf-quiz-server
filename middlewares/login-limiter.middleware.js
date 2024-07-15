const rateLimit = require('express-rate-limit')

const loginLimiter = rateLimit({
    windowMs: 1 * 60 * 1000,
    max: 5,
    handler: (req, res) => {
        res.status(429).json({
          message: "Parol esdan chiqqan bo'lsa adminga murojat qiling!",
        });
    }
})


module.exports = {loginLimiter}