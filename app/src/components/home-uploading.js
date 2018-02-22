import React, { Component } from 'react';

class HomeUploading extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={'app-card'}>
        <div className={'app-card-content'}>
          <div className={'app-card-content-innter'}>
            <div className={'app-home-uploading'}>
              <div className={'app-home-uploading-icon'}>
                <i className={'icon-upload'} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default HomeUploading;
