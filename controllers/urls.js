import path from 'path';
import { SHORT_URL_LENGTH } from '../constants/urls.js';
import { readWriteFile, writeToFile } from '../helpers/utils.js';
import { validateUrl, makeShortUrl } from '../helpers/urls.js';

const filePath = path.join(path.resolve(), '/models/urls.json');

export const createUrl = (req, res, userId) => {
  const { longUrl } = req.body;

  const validationResult = validateUrl(longUrl);
  if (!validationResult.valid) {
    return res.status(400).render('error', {
      errorMessage: validationResult.error,
    });
  }

  const shortUrl = makeShortUrl(SHORT_URL_LENGTH, filePath, userId);

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

export const updateUrl = (req, res, userId) => {
  const { longUrl } = req.body;
  const shortUrl = req.params.id;

  const validationResult = validateUrl(longUrl);
  if (!validationResult.valid) {
    return res.status(400).render('error', {
      errorMessage: validationResult.error,
    });
  }

  readWriteFile(filePath, (err, jsonData) => {
    if (err) {
      return res.status(500).json(err);
    }

    const userUrls = jsonData[userId] || [];
    const urlIndex = userUrls.findIndex((url) => url.shortUrl === shortUrl);
    if (urlIndex === -1) {
      return res.status(404).render('error', {
        errorMessage: 'URL not found',
      });
    }

    userUrls[urlIndex].longUrl = longUrl;

    writeToFile(filePath, jsonData, (err) => {
      if (err) {
        return res.status(500).json(err);
      }
      res.redirect(`/urls`);
    });
  });
};

export const getUrl = (req, res, userId) => {
  const shortUrl = req.params.id;

  readWriteFile(filePath, (err, jsonData) => {
    const userUrls = jsonData[userId] || [];
    const urlIndex = userUrls.findIndex((url) => url.shortUrl === shortUrl);
    if (urlIndex === -1) {
      return res.status(404).render('error', {
        errorMessage: 'URL not found',
      });
    }
    res.render('singleUrl', {
      id: req.params.id,
      longUrl: userUrls[urlIndex].longUrl,
    });
  });
};
