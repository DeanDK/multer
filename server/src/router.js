import path from 'path';
import version from '../package.json';
import _ from 'lodash';
import File from './models/file';
import Post from './models/post';
import { ObjectID } from 'mongodb';
class AppRouter {
  // app == express
  constructor(app) {
    this.app = app;

    this.setupRouter();
  }

  setupRouter() {
    const app = this.app;
    const db = app.get('db');
    const uploadDir = app.get('storageDir');
    const upload = app.get('upload');

    app.get('/', (req, res) => {
      return res.status(200).json({
        version: version.version
      });
    });

    // upload
    app.post('/api/upload', upload.array('files'), (req, res, next) => {
      const files = _.get(req, 'files', []);

      let fileModels = [];

      _.each(files, fileObject => {
        const newFile = new File(app).initWithObject(fileObject).toJson();
        fileModels.push(newFile);

        if (fileModels.length) {
          db.collection('files').insertMany(fileModels, (err, result) => {
            if (err) {
              return res.status(503).json({
                error: {
                  massage: 'Unable to save the file'
                }
              });
            }

            let post = new Post(app)
              .initWithObject({
                from: _.get(req, 'body.from'),
                to: _.get(req, 'body.to'),
                message: _.get(req, 'body.message'),
                files: result.insertedIds
              })
              .toJSON();

            db.collection('posts').insertOne(post, (err, result) => {
              if (err) {
                return res.status(503).json({
                  error: {
                    message: 'Upload could not be saved'
                  }
                });
              }

              return res.json(post);
            });
          });
        } else {
          return res.status(503).json({
            error: {
              message: 'Files upload is required.'
            }
          });
        }
      });
    });

    // download routing
    app.get('/api/download/:id', (req, res, next) => {
      console.log('test');
      const fileId = req.params.id;
      db
        .collection('files')
        .find({ _id: ObjectID(fileId) })
        .toArray((err, result) => {
          const fileName = _.get(result, '[0].name');
          if (err || !fileName) {
            return res.status(404).json({
              error: {
                message: 'File not found'
              }
            });
          }

          const filePath = path.join(uploadDir, fileName);

          return res.download(filePath, fileName, err => {
            if (err) {
              res.status(404).json({
                error: {
                  message: 'File not found'
                }
              });
            } else {
              console.log('File is downloaded');
            }
          });
        });
    });
  }
}

export default AppRouter;
