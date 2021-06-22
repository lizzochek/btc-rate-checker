"use strict";

const fs = require("fs");
const write = (s) => process.stdout.write(s);
const clearScreen = () => write("\x1Bc");
const db = require("./db.js");

const startProgram = () => {
  clearScreen();
  write(`\n\Вже зареєстровані?\n`);
  write("\x1b[3;8H");

  write(`
  ┌──────────────────────┐
  │ Відповідь:           │
  └──────────────────────┘
  `);
  write("\x1b[2A\x1b[13C");
};

const Reacting = (data) => {
  let form = 0;
  let react;
  if (data.toLowerCase() === "так")
    react = "Будь ласка, введіть дані для входу\n";
  if (data.toLowerCase() === "ні")
    react = "Будь ласка, введіть дані для реєстрації\n";

  clearScreen();
  write(`\n\t${react}`);
  setTimeout(() => process.exit(0), 2000);
};

startProgram();
process.stdin.on("data", (chunk) => {
  Reacting(chunk.toString().trim());
});
