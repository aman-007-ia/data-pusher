const { Account, Destination } = require('../models');
const axios = require('axios');
const querystring = require('querystring');
require('dotenv').config();

exports.handleIncomingData = async (req, res) => {
  const tokenHeaderKey = process.env.TOKEN_HEADER || 'cl-x-token';
  const token = req.headers[tokenHeaderKey.toLowerCase()]; // header keys are lowercase in Node

  const data = req.body;

  // Validation
  if (!token) return res.status(401).json({ error: 'Un Authenticate' });
  if (typeof data !== 'object') return res.status(400).json({ error: 'Invalid Data' });

  try {
    const account = await Account.findOne({ where: { app_secret_token: token } });
    if (!account) return res.status(401).json({ error: 'Un Authenticate' });

    const destinations = await Destination.findAll({ where: { AccountId: account.id } });

    const forwardPromises = destinations.map(async (dest) => {
      try {
        const method = dest.method.toUpperCase();
        const headers = dest.headers || {};
        const url = dest.url;

        if (method === 'GET') {
          const queryParams = querystring.stringify(data);
          return await axios.get(`${url}?${queryParams}`, { headers });
        } else if (method === 'POST' || method === 'PUT') {
          return await axios({
            method,
            url,
            data,
            headers,
            timeout: 5000,
          });
        } else {
          throw new Error(`Unsupported HTTP method: ${method}`);
        }
      } catch (err) {
        console.error(`${dest.method} ${dest.url} failed:`, err.message);
        // Optionally: return some error info to handle after Promise.all
        return { error: err.message, url: dest.url };
      }
    });

    const results = await Promise.all(forwardPromises);
    // you can inspect results here to see which succeeded/failed
    console.log('Forward results:', results);


    return res.json({ message: 'Data pushed to all destinations.' });
  } catch (error) {
    console.error('Error pushing data:', error.message);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};
