const fetch = require('node-fetch');

function doStuff() {
  const url = 'http://localhost:5000';
  const formattedUrl = url + '/' + process.env.NAME;
  console.log(url);

  const response = await fetch(formattedUrl, {
    method: 'POST',
    body: JSON.stringify({
      name: process.env.NAME,
      dbName: process.env.DATABASE_URL,
      key: process.env.API_KEY
    })
  });

  const data = await response.json();

  return data;
};

module.exports = doStuff;