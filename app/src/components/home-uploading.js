import React, { Component } from 'react';

class HomeUploading extends Component {
  constructor(props) {
    super(props);

    this.state = {
      percentage: 10
    };
  }

  render() {
    const { percentage } = this.state;
    return (
      <div className={'app-card'}>
        <div className={'app-card-content'}>
          <div className={'app-card-content-innter'}>
            <div className={'app-home-uploading'}>
              <div className={'app-home-uploading-icon'}>
                <i className={'icon-upload'} />
                <h2>Sending...</h2>
              </div>
              <div className={'app-upload-files-total'}>Uploading 3 files</div>
              <div className={'app-progress'}>
                <span
                  style={{ width: `${percentage}` }}
                  className={'app-progress-bar'}
                />
              </div>
              <div className={'app-upload-stats'}>
                <div className={'app-upload-stats-left'}>2.3M/5M</div>
                <div className={'app-upload-stats-right'}>456K/s</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default HomeUploading;
