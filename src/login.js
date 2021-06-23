"use strict";

//Importing the needed modules and variables
const fs = require("fs");
const readline = require("readline");
const db = require("./db.json");
const getBTCRate = require("./btc-rate.js");
const {
  inputEmailQuestion,
  inputEmailError,
  inputPasswordQuestion,
  inputPasswordError,
  userError,
  userExists,
  thanksForRegistration,
  userDeleted,
  tryToLogin,
} = require("./strings.js");

//Data taken from user
let inputEmail;
let inputPassword;

//Using integrated readline library to take data from the user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

//Additional functions for easier working with console
const write = (s) => rl.output.write(s);
const clearScreen = () => write("\x1Bc");

//Finding registered user data in database
const findUser = (inputEmail, inputPassword) => {
  let user = db.find((user) => user.email === inputEmail);
  if (!user) {
    console.log(userError);
    rl.close();
  } else {
    //Checking password
    if (user.password !== inputPassword) {
      console.log(inputPasswordError);
      rl.close();
    } else {
      //Logging BTC rate
      getBTCRate();
      rl.close();
    }
  }
};

//Adding new user to database
const addUser = (inputEmail, inputPassword) => {
  //Checking whether user with current email already exists
  let user = db.findIndex((user) => user.email === inputEmail);

  if (user < 0) {
    db.push({
      email: inputEmail,
      password: inputPassword,
    });

    //Overwriting the database with a new user
    fs.writeFileSync("./db.json", JSON.stringify(db));

    console.log(thanksForRegistration);
    rl.close();
  } else {
    //If user exists, offer to delete this user or login
    rl.question(userExists, (answer) => {
      if (answer === "так") deleteUser(user);

      if (answer === "ні") {
        console.log(tryToLogin);
        rl.close();
      }
    });
  }
};

//Deleting user from db
const deleteUser = (userIndex) => {
  db.splice(userIndex, 1);
  fs.writeFileSync("./db.json", JSON.stringify(db));

  console.log(userDeleted);
  rl.close();
};

//Getting email and password from the user
const loginInput = (callback) => {
  clearScreen();

  //Email
  rl.question(inputEmailQuestion, (answer) => {
    //Checking email format
    if (answer.includes("@") && answer.includes(".")) {
      inputEmail = answer;
      clearScreen();

      //Password
      rl.question(inputPasswordQuestion, (answer) => {
        inputPassword = answer;
        clearScreen();

        //Adding, finding or deleting user according to the input
        callback(inputEmail, inputPassword);
      });
    } else {
      //If an email is of a wrong format - throw a message
      console.log(inputEmailError);
      rl.close();
    }
  });
};

//Entry point (first question)
rl.question("Вже зареєстровані? (так/ні) ", (answer) => {
  if (answer.toLowerCase() === "так") loginInput(findUser);
  if (answer.toLowerCase() === "ні") loginInput(addUser);
});
