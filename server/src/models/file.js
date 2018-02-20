import _ from 'lodash';
class File {
  constructor(app, object) {
    this.app = app;
    this.model = {
      name: null,
      originalName: null,
      mimetype: null,
      size: null,
      created: Date.now()
    };
  }

  initWithObject(object) {
    this.model.name = _.get(object, 'filename');
    this.model.originalName = _.get(object, 'originalName');
    this.model.mimeType = _.get(object, 'mimetype');
    this.model.size = _.get(object, 'size');
    this.model.created = Date.now();

    // returns the class object in order to chain methods in route.js
    return this;
  }

  toJson() {
    return this.model;
  }
}

export default File;
