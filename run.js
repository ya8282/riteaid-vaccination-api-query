const fetch = require('node-fetch');

const baseUrl = "https://www.riteaid.com/services/ext/v2/vaccine/checkSlots?storeNumber=";

// add your local RiteAid sites here
var sites = [
  {
    address: "534 Hudson St",
    postalCode: 10014,
    storeNumber: 1225,
  },
  {
    address: "188 9th Ave",
    postalCode: 10011,
    storeNumber: 4196,
  },
  {
    address: "81 1st Ave",
    postalCode: 10003,
    storeNumber: 4205,
  },
  {
    address: "408 Grand St",
    postalCode: 10002,
    storeNumber: 1711,
  },
  {
    address: "225 Liberty St",
    postalCode: 10281,
    storeNumber: 10534,
  },
  {
    address: "301W 50th St",
    postalCode: 10019,
    storeNumber: 3110,
  },
  {
    address: "210-20 Amsterdam Ave",
    postalCode: 10023,
    storeNumber: 4885,
  },
  {
    address: "4910 Broadway",
    postalCode: 10034,
    storeNumber: 4887,
  },
  {
    address: "3539 Broadway",
    postalCode: 10031,
    storeNumber: 4185,
  },
];

sites.forEach((siteData, i, arr) => {

  var result = fetch(`https://www.riteaid.com/services/ext/v2/vaccine/checkSlots?storeNumber=${siteData['storeNumber']}`, {
    "headers": {
      "accept": "*/*",
      "accept-language": "en-US,en;q=0.9,ko;q=0.8",
      "sec-ch-ua": "\"Google Chrome\";v=\"89\", \"Chromium\";v=\"89\", \";Not A Brand\";v=\"99\"",
      "sec-ch-ua-mobile": "?0",
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-origin",
      "sec-gpc": "1",
      "x-requested-with": "XMLHttpRequest"
    },
    "referrer": "https://www.riteaid.com/pharmacy/apt-scheduler",
    "referrerPolicy": "origin-when-cross-origin",
    "body": null,
    "method": "GET",
    "mode": "cors"
  }).then(res => res.json())
    .then(json => {
      var slotsInfo = JSON.stringify(json['Data']['slots']);

      // From observation, slots['1'] === true doesn't mean availability, so I'm guessing only slots['2'] matters
      if (json['Data']['slots']['2']) {
        console.log(`Vaccine appointment available at: ${siteData['address']}, ${siteData['postalCode']}`);
        // add any other notification here
      }
    });
});

