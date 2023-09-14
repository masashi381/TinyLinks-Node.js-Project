import fs from 'fs';
import path from 'path';
import randomstring from 'randomstring';
import { SHORT_URL_LENGTH } from '../constants/urls.js';

const filePath = path.join(path.resolve(), '/models/urls.json');

const validateUrl = (userId, longUrl) => {
  if (!userId || !longUrl) {
    return { valid: false, error: 'userId and longUrl are required' };
  }

  const urlPattern = /^(http(s)?:\/\/)(www\.)?[\w-\/?:]+$/;
  if (!urlPattern.test(longUrl)) {
    return { valid: false, error: 'Invalid URL format' };
  }

  return { valid: true };
};

const readWriteFile = (filePath, callback) => {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return callback({ error: 'Internal Server Error' });
    }
    const jsonData = JSON.parse(data) || {};
    callback(null, jsonData);
  });
};

const writeToFile = (filePath, data, callback) => {
  fs.writeFile(filePath, JSON.stringify(data), 'utf8', (err) => {
    if (err) {
      console.error(err);
      return callback({ error: 'Internal Server Error' });
    }
    callback(null);
  });
};

export const createUrl = (req, res) => {
  const { userId, longUrl } = req.body;

  const validationResult = validateUrl(userId, longUrl);
  if (!validationResult.valid) {
    return res.status(400).json({ error: validationResult.error });
  }

  const shortUrl = randomstring.generate(SHORT_URL_LENGTH);

  readWriteFile(filePath, (err, jsonData) => {
    if (err) {
      return res.status(500).json(err);
    }

    if (!jsonData[userId]) {
      jsonData[userId] = [];
    }

    jsonData[userId].push({
      shortUrl,
      longUrl,
    });

    writeToFile(filePath, jsonData, (err) => {
      if (err) {
        return res.status(500).json(err);
      }
      res.redirect(`/urls/${shortUrl}`);
    });
  });
};
