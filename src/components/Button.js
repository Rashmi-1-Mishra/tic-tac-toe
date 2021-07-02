import React from 'react';
import { Component } from 'react';
import '../css/Button.css';

class Button extends Component {

  render(){
    return(
      <>
      <div className='Button' onClick = {this.props.onClick}>{this.props.label}</div>
      </>
    )
  }

}
export default Button;
