import fs from 'fs';
import path from 'path';
import randomstring from 'randomstring';
import { SHORT_URL_LENGTH } from '../constants/urls.js';

const filePath = path.join(path.resolve(), '/models/urls.json');

export const createUrl = (req, res) => {
  const { userID, url } = req.body;
  const shortUrl = randomstring.generate(SHORT_URL_LENGTH);
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    let jsonData = JSON.parse(data);
    if (!jsonData[userID]) {
      jsonData[userID] = {};
    }
    jsonData[userID][shortUrl] = {
      shortUrl,
      longUrl: url,
    };
    fs.writeFile(filePath, JSON.stringify(jsonData), 'utf8', (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
      res.json({ shortUrl });
    });
  });
};
