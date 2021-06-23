"use strict";

const fs = require("fs");
const readline = require("readline");
const clearScreen = () => write("\x1Bc");
const db = require("./db.json");
const getBTCRate = require("./btc-rate.js");
const { get } = require("http");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const write = (s) => rl.output.write(s);

let inputEmail;
let inputPassword;

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

const findUser = (inputEmail, inputPassword) => {
  let user = db.find((user) => user.email === inputEmail);
  if (!user) {
    console.log(userError);
    rl.close();
  } else {
    if (user.password !== inputPassword) {
      console.log(inputPasswordError);
      rl.close();
    } else {
      getBTCRate();
      rl.close();
    }
  }
};

const addUser = (inputEmail, inputPassword) => {
  let user = db.findIndex((user) => user.email === inputEmail);
  if (user < 0) {
    db.push({
      email: inputEmail,
      password: inputPassword,
    });

    fs.writeFileSync("./db.json", JSON.stringify(db));
    console.log(thanksForRegistration);
    rl.close();
  } else {
    rl.question(userExists, (answer) => {
      if (answer === "так") deleteUser(user);
      if (answer === "ні") {
        console.log(tryToLogin);
        rl.close();
      }
    });
  }
};

const deleteUser = (userIndex) => {
  delete db[userIndex];
  fs.writeFileSync("./db.json", JSON.stringify(db));
  console.log(userDeleted);
  rl.close();
};

const loginInput = (callback) => {
  clearScreen();
  rl.question(inputEmailQuestion, (answer) => {
    if (answer.includes("@")) {
      inputEmail = answer;
      clearScreen();
      rl.question(inputPasswordQuestion, (answer) => {
        inputPassword = answer;
        clearScreen();
        callback(inputEmail, inputPassword);
      });
    } else {
      console.log(inputEmailError);
      rl.close();
    }
  });
};

rl.question("Вже зареєстровані? (так/ні) ", (answer) => {
  if (answer.toLowerCase() === "так") loginInput(findUser);
  if (answer.toLowerCase() === "ні") loginInput(addUser);
});
