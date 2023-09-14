import path from 'path';
import randomstring from 'randomstring';
import { SHORT_URL_LENGTH } from '../constants/urls.js';
import { readWriteFile, writeToFile, validateUrl } from '../helpers/utils.js';

const filePath = path.join(path.resolve(), '/models/urls.json');

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
