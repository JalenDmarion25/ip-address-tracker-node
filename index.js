require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser')
const fetch = require('node-fetch');
const app = express();
const port = 5000;

app.use(express.static('public'));
app.use(bodyParser.json());

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});


const api = process.env.API_KEY;
const api_url = 'https://geo.ipify.org/api/v1';

app.post('/sendString', (req, res) => {
    const ip = req.body.stringData;
    // You can now process or store the string data as needed
    console.log('Received string:', ip);
  
    const url = `${api_url}?apiKey=${api}&ipAddress=${ip}`;
  
    fetch(url)
    .then(response => response.text())
    .then(data => {
      const jsonData = JSON.parse(data);
      console.log(jsonData.location);
      console.log(jsonData.isp);
      console.log(jsonData.ip);
      console.log(jsonData.location.lat)
      res.json({message: jsonData});
  
    })
    .catch(error => {
      console.error('Error:', error);
    });
  
  });