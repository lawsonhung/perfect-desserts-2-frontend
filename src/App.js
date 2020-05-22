import React, { Component } from 'react';
import ProfilePage from './ProfilePage';
import LoginPage from './LoginPage';
import SignUpPage from './SignUpPage';

export default class App extends Component {
  state = {
    page: 'login'
  }

  redirect = (page) => {
    // Shortcut if key and value are same name
    // this.setState({ page: page })
    this.setState({ page })
  }

  componentDidMount() {
    if (localStorage.token) {
      this.redirect('profile');
    }
  }

  render() {

    switch (this.state.page) {
      case 'login':
        return <LoginPage redirect={this.redirect}/>
      case 'signup':
        return <SignUpPage/>
      case 'profile':
        return <ProfilePage redirect={this.redirect}/>
      default:
        return <LoginPage/>
    }
  }
}
