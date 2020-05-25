import React, { Component } from 'react';
import { connect } from 'react-redux';

class MessagePage extends Component {

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

const mapStateToProps = (store) => {
  return {
    username: store.username
  }
}

export default connect(mapStateToProps, null)(MessagePage)