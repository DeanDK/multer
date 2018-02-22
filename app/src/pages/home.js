import React, { Component } from 'react';
import Header from '../components/header';
import HomeForm from '../components/home-form';
import HomeUploading from '../components/home-uploading';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      componentName: 'HomeForm',
      data: null,
      uploadEvent: null
    };

    this._renderComponent = this._renderComponent.bind(this);
  }
  _renderComponent() {
    const { componentName } = this.state;

    switch (componentName) {
      case 'HomeUploading':
        return <HomeUploading />;

      default:
        return;
        <HomeForm
          onUploadBegin={event => {
            this.setState({ componentName: 'HomeUploading' });
          }}
        />;
        return;
    }
  }

  render() {
    return (
      <div className={'app-container'}>
        <Header />
        <div className={'app-content'}>{this._renderComponent()}</div>
      </div>
    );
  }
}

export default Home;
