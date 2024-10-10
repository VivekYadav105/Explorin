const { Vonage } = require('@vonage/server-sdk')

require('dotenv').config()

const vonage = new Vonage({
  apiKey: process.env.API_KEY,
  apiSecret: process.env.API_SECRET
})

async function sendSMS(to,text) {
  await vonage.sms.send({to:"919398077740", from:"Vonage APIs", text})
      .then(resp => { console.log('Message sent successfully'); console.log(resp); })
      .catch(err => { console.log('There was an error sending the messages.',err);  });
}

module.exports = sendSMS