import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class HomePage extends Component {

  render() {
    console.log(this.props);
    return (
      <div>
        Hi, I'm the HomePage!
        <ul>
          <li><Link to='/profile'>Go to Profile</Link></li>
          <li><Link to='/login'>Go to Login</Link></li>
          <li><Link to='/signup'>Go to Signup</Link></li>
          <li><Link to='/messages/add a message using path params'>Go to Messages</Link></li>
        </ul>
      </div>
    )
  }

}