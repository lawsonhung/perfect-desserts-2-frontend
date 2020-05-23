import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class ProfilePage extends Component {

  handleClick = () => {
    localStorage.clear();
    // this.props.redirect('login');
    this.props.routerProps.history.push('/login');
  }

  render() {
    console.log("profile props: ", this.props);

    return (
      <div>
        <button onClick={this.handleClick}>Logout</button>
        {
          this.props.username ?
          <h1>Welcome {this.props.username}!</h1> :
          <h1>Getting your info... Loading...</h1>
        }
        <Link to="/">Go to homepage</Link>
      </div>
    );
  }
}