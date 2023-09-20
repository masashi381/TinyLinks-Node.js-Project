import path from 'path';
import { readWriteFile } from '../helpers/utils.js';

const filePath = path.join(path.resolve(), '/models/urls.json');

export const getUrls = (req, res, userId, userName) => {
  readWriteFile(filePath, (err, jsonData) => {
    if (err) {
      return res.status(500).json(err);
    }
    //初回のログイン時はid付きのurls.jsonが存在しないので作成ページに遷移
    if (!jsonData[userId]) {
      return res.redirect('/urls/new');
    }
    res.render('urls', { data: jsonData[userId], name: userName });
  });
};
