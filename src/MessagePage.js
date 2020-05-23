import React, { Component } from 'react';

export default class MessagePage extends Component {

  render() {
    console.log("message props: ", this.props);
    return (
    <div>
      Hi {this.props.username}! This is the message:
      <p>{this.props.match.params.text}</p>
    </div>
    )
  }

}