"use strict";

const fs = require("fs");
const readline = require("readline");
const clearScreen = () => write("\x1Bc");
const db = require("./db.json");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const write = (s) => rl.output.write(s);

let inputEmail;
let inputPassword;

const inputEmailQuestion = "Введіть пошту у форматі hello@ginputEmail.com";
const inputEmailError =
  "Будь ласка спробуйте ще раз і введіть пошту у правильному форматі";
const inputPasswordQuestion = "Введіть пароль, використовуючи літери та цифри";
const inputPasswordError = "Не вірний пароль";
const userError =
  "Такого користувача не знайдено.\nПеревірте правильність даних або зареєструйтеся";

const findUser = (inputEmail, inputPassword) => {
  let user = db.find((user) => user.email === inputEmail);
  if (!user) {
    console.log(userError);
    rl.close();
  } else {
  }
};

const addUser = (inputEmail, inputPassword) => {
  db.push({
    email: inputEmail,
    password: inputPassword,
  });
  console.log(db);
  fs.writeFileSync("./db.json", JSON.stringify(db));
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

rl.question("Вже зареєстровані? ", (answer) => {
  if (answer.toLowerCase() === "так") loginInput(findUser);
  if (answer.toLowerCase() === "ні") loginInput(addUser);
});
