const express = require('express');
const { ApplicationPage } = require('twilio/lib/rest/api/v2010/account/application');
const cors = require('cors');
require('dotenv').config();

// express 
const app = express()

// body parser middleware (also do "npm i body-parser")
app.use(express.json({ extended: false }));

// cors (must include)
app.use(cors());

// twilio 
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

app.post('/sendSMS', (req, res) => {   
  client.messages
    .create({
    body: 'This is Sprout Route. We will send you a message when it is the perfect to walk!',
    from: '+19362515910',
    to: `+1${req.body.phone}`,
    })
    .then(message => res.send(`The messsage with id: ${JSON.stringify(message)} was sent!`))
    .catch((err) => console.log(err));  
})

app.listen(process.env.PORT || 8000, () => console.log('Server listening...'));