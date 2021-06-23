//Output messages
const inputEmailQuestion = "Введіть пошту у форматі hello@ginputEmail.com  ";
const inputEmailError =
  "Будь ласка спробуйте ще раз і введіть пошту у правильному форматі";
const inputPasswordQuestion =
  "Введіть пароль, використовуючи літери та цифри  ";
const inputPasswordError =
  "Пароль не вірний. Перевірте правильність вводу даних";
const userError =
  "Такого користувача не знайдено.\nПеревірте правильність даних або зареєструйтеся";
const userExists =
  "Користувач з таким імейлом вже існує\nХочете видалити аккаунт та  завести новий? (так/ні)  ";
const thanksForRegistration =
  "Дякуємо за реєстрацію\nПри наступному запуску програми ви можете увійти\nта подивитись поточний курс біткоїна до гривні";
const userDeleted = "Користувача успішно видалено";
const tryToLogin = "Спробуйте увійти або зареєструватися знову :)";

module.exports = {
  inputEmailQuestion,
  inputEmailError,
  inputPasswordQuestion,
  inputPasswordError,
  userError,
  userExists,
  thanksForRegistration,
  userDeleted,
  tryToLogin,
};
