const express = require('express');
const os = require('os');
const crypto = require('crypto');
const axios = require('axios');
const cache = require('memory-cache');

// api key
const publicKey = 'bd3af8fab58328360d0898b639803485';
const privateKey = REPLACE_WITH_PRIVATE_KEY;
const apiKey = `apikey=${publicKey}`;
// url
const listOfComics = 'https://gateway.marvel.com:443/v1/public/comics?limit=100&';
// const idOfComics = ``

// config cache middleware
const memCache = new cache.Cache();
const cacheMiddleware = () => (req, res, next) => {
  const key = `__express__${req.originalUrl}` || req.url;
  const cacheContent = memCache.get(key);
  if (cacheContent) {
    res.send(cacheContent);
    console.log(`${key} sent from memory cache!`);
  } else {
    res.sendResponse = res.send;
    res.send = (body) => {
      memCache.put(key, body);
      console.log(`${key} is cached.`);
      res.sendResponse(body);
    };
    next();
  }
};

const app = express();

app.use(express.static('dist'));
app.get('/api/getUsername', (req, res) => res.send({ username: os.userInfo().username }));

app.get('/api/getComicsList', cacheMiddleware(), (req, res) => {
  const ts = new Date().getTime().toString();
  const string2Hash = ts + privateKey + publicKey;
  const hash = crypto
    .createHash('md5')
    .update(string2Hash)
    .digest('hex');
  const url = `${listOfComics}ts=${ts}&${apiKey}&hash=${hash}`;
  console.log(ts, url);
  axios
    .get(url)
    .then(result => res.send(result.data))
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});

app.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));
