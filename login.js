"use strict";

const readline = require("readline");
const clearScreen = () => write("\x1Bc");
const db = require("./db.json");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const write = (s) => rl.output.write(s);

let mail;
let password;

const mailQuestion = "Введіть пошту у форматі hello@gmail.com";
const mailError =
  "Будь ласка спробуйте ще раз і введіть пошту у правильному форматі";
const passwordQuestion = "Введіть пароль, використовуючи літери та цифри";
const passwordError = "Не вірний пароль";

const login = () => {
  clearScreen();
  rl.question(mailQuestion, (answer) => {
    if (answer.includes("@")) {
      mail = answer;
      clearScreen();
      rl.question(passwordQuestion, (answer) => {
        password = answer;
        clearScreen();
      });
    } else {
      console.log(mailError);
      rl.close();
    }
  });
};

// rl.question("Вже зареєстровані? ", (answer) => {
//   if (answer.toLowerCase() === "так") login();
//   if (answer.toLowerCase() === "ні") login();
// });
console.log(db);
