import fs from 'fs';
import path from 'path';
import randomstring from 'randomstring';
import { SHORT_URL_LENGTH } from '../constants/urls.js';

const filePath = path.join(path.resolve(), '/models/urls.json');

export const createUrl = (req, res) => {
  const { userId, longUrl } = req.body;
  if (!userId || !longUrl) {
    return res.status(400).json({ error: 'userId and longUrl are required' });
  }
  const shortUrl = randomstring.generate(SHORT_URL_LENGTH);
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    let jsonData = JSON.parse(data);
    if (!jsonData[userId]) {
      jsonData[userId] = {};
    }
    jsonData[userId][shortUrl] = {
      shortUrl,
      longUrl,
    };
    fs.writeFile(filePath, JSON.stringify(jsonData), 'utf8', (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
      res.redirect(`/urls/${shortUrl}`);
    });
  });
};
