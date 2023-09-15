import fs from 'fs';

export const readWriteFile = (filePath, callback) => {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return callback({ error: 'Internal Server Error' });
    }
    const jsonData = JSON.parse(data) || {};
    callback(null, jsonData);
  });
};

export const writeToFile = (filePath, data, callback) => {
  fs.writeFile(filePath, JSON.stringify(data), 'utf8', (err) => {
    if (err) {
      console.error(err);
      return callback({ error: 'Internal Server Error' });
    }
    callback(null);
  });
};
