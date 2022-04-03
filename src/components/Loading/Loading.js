import React from 'react';
import "./style.css"

class Loading extends React.Component {
  componentWillUnmount() {
    console.log('componentWillUnmount');
  }
  render() {
    return (
      <React.Fragment>
        <div className='lds-spinner'>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </React.Fragment>
    );
  }
}

export { Loading };
