import "dotenv/config";
import { Bot, Keyboard, InlineKeyboard, GrammyError, HttpError } from "grammy";

const bot = new Bot(process.env.API_KEY);

bot.command("start", async (ctx) => {
  const startKeyBoard = new Keyboard()
    .text("HTML & CSS")
    .text("JavaScript")
    .text("React")
    .row()
    .text("Случайный вопрос")
    .resized();
  await ctx.reply(
    "Привет! Готов помочь тебе подготовиться к собеседованию. Ты, наконец, вкатишься в IT и будешь получать лям в наносекунду \n Но это не точно"
  );
  await ctx.reply("Выбирай тему:", {
    reply_markup: startKeyBoard,
  });
});

bot.hears(
  ["HTML & CSS", "JavaScript", "React", "Случайный вопрос"],
  async (ctx) => {
    let inlineKeyboard;
    inlineKeyboard = new InlineKeyboard()
      .text("Получить ответ", JSON.stringify({
        type: ctx.message.text,
        questionId: 1
      }))
      .text("Отмена", "cancel");
    await ctx.reply(`Что такое ${ctx.message.text}?`, { reply_markup: inlineKeyboard });
  }
);

bot.on("callback_query:data", async (ctx) => {
  if (ctx.callbackQuery.data === "cancel") {
    await ctx.reply("Галя, у нас отмена");
    await ctx.answerCallbackQuery();
    return;
  }
  const callBackData = JSON.parse(ctx.callbackQuery.data)
  ctx.reply(`${callBackData.type} blahblahblah`)
  await ctx.answerCallbackQuery();
});





















bot.catch((err) => {
  const ctx = err.ctx;
  console.error(`Error while handling update ${ctx.update.update_id}:`);
  const e = err.error;
  if (e instanceof GrammyError) {
    console.error("Error in request:", e.description);
  } else if (e instanceof HttpError) {
    console.error("Could not contact Telegram:", e);
  } else {
    console.error("Unknown error:", e);
  }
});

bot.start();
