"use strict";

const request = require("request");

const getBTCRate = () => {
  const url = "https://api.cryptonator.com/api/ticker/btc-uah";

  request(
    {
      url: url,
      json: true,
    },
    (error, response) => {
      if (error || !response.body.success) {
        console.log("Виникла помилка\n Спробуйте ще раз");
      } else {
        return console.log(
          `Поточний курс BTC до UAH складає ${response.body.ticker.price}`
        );
      }
    }
  );
};
module.exports = getBTCRate;
