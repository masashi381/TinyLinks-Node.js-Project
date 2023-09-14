import path from 'path';
import { readWriteFile, writeToFile } from '../helpers/utils.js';

const filePath = path.join(path.resolve(), '/models/urls.json');

export const deleteUrl = (req, res) => {
  // const userId = req.cookies.userId;
  const userId = '12345667';
  const itemId = req.params.id;

  readWriteFile(filePath, (err, jsonData) => {
    if (err) {
      return res.status(500).json(err);
    }

    // access to the data user have
    const data = jsonData[userId];

    if (!data) {
      return res.send("item doesn't exsist");
    }

    // find index of deleting item
    const deleteItemIndex = data.findIndex((data) => data.shortUrl === itemId);

    // if it returns -1 that means failed finding index
    if (deleteItemIndex === -1) {
      return res.send('URL not found');
    }

    // remove specific item from data
    data.splice(deleteItemIndex, 1);

    // replace the user data in json data
    jsonData[userId] = data;

    writeToFile(filePath, jsonData, (err) => {
      console.log(data);
      if (err) {
        return res.status(500).json(err);
      }
      res.redirect('/urls');
    });
  });
};
