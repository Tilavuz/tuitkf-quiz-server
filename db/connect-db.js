const mongoose = require('mongoose');
const { baseUrl } = require('../helpers/shared');


const connectDb = async () => {
    mongoose.connect(`${baseUrl}/tuitkf-quiz`)
        .then(() => {
            console.log('Basaga ulanish hozil qilindi!');
        }).catch(() => {
            console.log('Bazaga ulanib bo\'lmadi!');
        })
}


module.exports = { connectDb };