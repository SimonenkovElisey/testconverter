/* eslint-disable no-console */
require('dotenv').config();
const prompt = require('prompt-sync')({ sigint: true });
const axios = require('axios');

const symbol = prompt('Start currency (example USD)? ');
const amount = prompt('Amount? ');
const convert = prompt('Target currency (example BTC)? ');

let data = null;

const response = async () => {
  try {
    data = await axios.get(`https://pro-api.coinmarketcap.com/v2/tools/price-conversion?amount=${amount}&convert=${convert.toUpperCase()}&symbol=${symbol.toUpperCase()}`, {
      headers: {
        'X-CMC_PRO_API_KEY': `${process.env.API_KEY}`,
      },
    });
  } catch (e) {
    data = null;
    console.log('\nPlease enter correct values');
  }
  if (data) {
    const json = data.data.data[0].quote[convert.toUpperCase()].price;
    console.log(`\n${json} ${convert.toUpperCase()}`);
  }
};
response();
