import { MongoClient } from 'mongodb';
const assert = require('assert');

const url = 'mongodb://localhost:27017/fapp';

const dbName = 'fapp';
export const connect = callback => {
  MongoClient.connect(url, (err, client) => {
    return callback(err, client);
  });
};
