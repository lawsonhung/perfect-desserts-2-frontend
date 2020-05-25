import React, { Component } from 'react';
import ProfilePage from './ProfilePage';
import HomePage from './HomePage';
import LoginPage from './LoginPage';
// eslint-disable-next-line
import SignUpPage from './SignUpPage';
import FourOhFourPage from './FourOhFourPage';
import MessagePage from './MessagePage';
import { Switch, Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

class App extends Component {

  state = {
    username: '',
    // password: ''
  }

  componentDidMount() {
    // if (localStorage.token) {
    if (this.props.token) {
      this.storeUsername();
    } else {
      // This is done with withRouter technology. Using HOC, you can user router props
      this.props.history.push('/login');
    }
  }

  storeUsername = () => {
    // Fetch profile
    // Local fetch
    // fetch('http://localhost:3000/profile',{
    // Heroku fetch
    fetch('https://perfect-desserts-2-backend.herokuapp.com/profile',{
      headers: {
        // 'Authorization': `Bearer ${localStorage.token}`
        'Authorization': `Bearer ${this.props.token}`
      }
    })
    .then(res => res.json())
    .then(user => {
      this.props.storeUsername(user.username);
      console.log('Username has been stored');
    });
  }

  render() {
    console.log('App props: ', this.props);

    return (
      <Switch>
        
        {/* <Route 
          path={'/profile'} 
          component={ProfilePage} /> */}
          {/* Same as below, but below allows you to pass props */}
        <Route path={'/profile'} 
          render={(routerProps) => <ProfilePage 
            routerProps={routerProps} />} />

        <Route path={'/login'} 
          render={(routerProps) => <LoginPage 
            password={this.state.password}
            storeUsername={this.storeUsername}
            routerProps={routerProps} />} />

        <Route path={'/signup'}
          render={(routerProps) => <SignUpPage
            username={this.state.username}
            password={this.state.password}
            storeUsername={this.storeUsername}
            routerProps={routerProps} />} />

        <Route path={'/messages/:text'} 
          render={(routerProps) => <MessagePage 
          // {...routerProps} is syntactic sugar for routerProps={routerProps}. They are both the same
          {...routerProps} />} />

        <Route path={'/'} component={HomePage} />

        <Route component={FourOhFourPage} />

      </Switch>
    )
  }
}

const mapStateToProps = (store) => {
  return {
    token: store.token
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    storeUsername: (username) => {
      dispatch({ type: 'STORE_USERNAME', username: username })
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));