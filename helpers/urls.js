import randomstring from 'randomstring';
import { readWriteFile } from './utils.js';

export const validateUrl = (longUrl) => {
  if (!longUrl) {
    return { valid: false, error: 'longUrl are required' };
  }

  const urlPattern = /^(http(s)?:\/\/)(www\.)?[\w-\/?:\.]+$/;
  if (!urlPattern.test(longUrl)) {
    return { valid: false, error: 'Invalid URL format' };
  }

  return { valid: true };
};

export const makeShortUrl = (length, filePath, userId) => {
  const shortUrl = randomstring.generate(length);
  readWriteFile(filePath, (err, jsonData) => {
    if (err) {
      console.log(err);
    }
    jsonData[userId]?.forEach((url) => {
      if (url.shortUrl === shortUrl) {
        makeShortUrl(length, userId);
      }
    });
  });
  return shortUrl;
};
