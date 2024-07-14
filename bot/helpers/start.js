const { bot } = require("../bot");
const User = require("../../models/user.model");

const start = async (msg) => {
  try {
    const chatId = msg.from.id;
    const user = await User.create({
      chatId,
      password: "000000",
      action: "request_contact",
    });
    await user.save()
    bot.sendMessage(
      chatId,
      "TUITKF quiz saytdan ro'yxatdan o'tish uchun telefon raqamingizni yuboring!",
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
  } catch (error) {
    console.log(error);
  }
};

const contactUser = async (msg) => {
  try {
    const chatId = msg.from.id;
    
    let user = await User.findOne({ chatId }).lean();

    user.phone = msg.contact.phone_number.includes("+")
      ? msg.contact.phone_number
      : '+' + msg.contact.phone_number
    user.action = "password";

    if (user.phone === "+998908827251") {
      user.role = 'admin';
    }

    await User.findByIdAndUpdate(user._id, user, { new: true });

    bot.sendMessage(chatId, "Sizning parolingiz 000000! Agar o'zgartirmoqchi bo'lsangiz yangi parol yuboring!", {
      reply_markup: {
        remove_keyboard: true,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

const passwordUser = async (msg) => {
  try {
    const chatId = msg.from.id;
    const text = msg.text.trim()

    let user = await User.findOne({ chatId }).lean();

    user.password = text
    user.action = 'finish'
    await User.findByIdAndUpdate(user._id, user, { new: true });
    bot.sendMessage(chatId, 'Parol saqlandi!')
  } catch (error) {
    console.log(error);
  }
};

module.exports = { start, contactUser, passwordUser };
