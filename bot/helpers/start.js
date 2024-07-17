const { bot } = require("../bot");
const User = require("../../models/user.model");
const Auth = require("../../models/auth.model");
const bcrypt = require('bcrypt')

const start = async (msg) => {
  try {
    const chatId = msg.from.id;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(chatId.toString(), salt);

    let auth = await Auth.create({ password: hashedPassword, phone: '' });
    const user = await User.create({
      chatId,
      action: "request_contact",
      auth: auth._id,
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

    const phone = msg.contact.phone_number.includes("+") ? msg.contact.phone_number : '+' + msg.contact.phone_number
    let auth = await Auth.findById(user.auth)
    
    user.action = "password";
    auth.phone = phone

    if (auth.phone === "+998908827251") {
      auth.role = 'admin';
    }

    await User.findByIdAndUpdate(user._id, user, { new: true });
    await Auth.findByIdAndUpdate(auth._id, auth, { new: true });

    bot.sendMessage(
      chatId,
      `Sizning parolingiz: \`${chatId}\`! Agar o'zgartirmoqchi bo'lsangiz yangi parol yuboring!`,
      {
        parse_mode: "Markdown",
        reply_markup: {
          remove_keyboard: true,
        },
      }
    );

  } catch (error) {
    console.log(error);
  }
};

const passwordUser = async (msg) => {
  try {
    const chatId = msg.from.id;
    const text = msg.text.trim()

    let user = await User.findOne({ chatId }).lean();
    let auth = await Auth.findById(user.auth).lean();

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(text, salt);

    auth.password = hashedPassword;
    user.action = 'finish'
    await User.findByIdAndUpdate(user._id, user, { new: true });
    await Auth.findByIdAndUpdate(auth._id, auth, { new: true });
    bot.sendMessage(chatId, 'Parol saqlandi!')
  } catch (error) {
    console.log(error);
  }
};

module.exports = { start, contactUser, passwordUser };
