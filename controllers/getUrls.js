import path from 'path';
import { readWriteFile } from '../helpers/utils.js';

const filePath = path.join(path.resolve(), '/models/urls.json');

export const getUrls = (req, res, userId) => {
  readWriteFile(filePath, (err, jsonData) => {
    if (err) {
      return res.status(500).json(err);
    }
    if (!jsonData[userId]) {
      //undefined用に変える
      return res.redirect('/urls/new');
    }

    res.render('urls', { data: jsonData[userId] });
  });
};
