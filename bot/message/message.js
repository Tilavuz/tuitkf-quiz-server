const { bot } = require('../bot')
const User = require('../../models/user.model')
const { start, contactUser, passwordUser } = require('../helpers/start')



bot.on('message', async (msg) => {
    const chatId = msg.from.id
    const text = msg.text
    const user = await User.findOne({ chatId }).lean();

    if(!user && text === '/start') {
        start(msg)
    }

    if(user && !user.phone && text === '/start') {
        bot.sendMessage(
          chatId,
          "Telefon raqamingizni yuboring!",
          {
            reply_markup: {
              keyboard: [
                [
                  {
                    text: "Yuborish",
                    request_contact: true,
                  },
                ],
              ],
              resize_keyboard: true,
            },
          }
        );
    }

    if(user && user.action === 'request_contact' && msg.contact?.phone_number) {
        contactUser(msg)
    }

    if(user && user.action === 'password') {
        passwordUser(msg)
    }

    if(user && user.action === 'finish') {
        bot.sendMessage(chatId, "Parolingizni unutgan bo'lsangiz adminga murojat qiling: @Tilavuz")
    }




})