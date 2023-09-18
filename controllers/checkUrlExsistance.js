import path from 'path';
import { readWriteFile } from '../helpers/utils.js';

const filePath = path.join(path.resolve(), '/models/urls.json');

export const checkUrlExsistance = (req, res, userId) => {
  const urlId = req.params.id;

  readWriteFile(filePath, (err, jsonData) => {
    if (err) {
      return res.status(500).json(err);
    }
    const data = jsonData[userId];
    if (!data) {
      return res.render('error', {
        errorMessage: `Cannot find user ${userId}`,
      });
    }
    const exsistUrl = data.find((data) => data.shortUrl === urlId);
    if (!exsistUrl) {
      return res.render('error', {
        errorMessage: "This shorten URL doesn't exsist!",
      });
    }
    res.redirect(exsistUrl.longUrl);
  });
};
