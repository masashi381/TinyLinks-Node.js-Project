import path from 'path';
import { readWriteFile } from '../helpers/utils.js';

const filePath = path.join(path.resolve(), '/models/urls.json');

export const getUrls = (req, res) => {
  // const userId = req.cookies.userId;
  const userId = '12345667';

  readWriteFile(filePath, (err, jsonData) => {
    if (err) {
      return res.status(500).json(err);
    }

    if (!jsonData[userId]) {
      jsonData[userId] = [];
    }

    return res.render('urls', { data: jsonData[userId] });
  });
};
