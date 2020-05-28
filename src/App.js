import React, { Component } from 'react';
import ProfilePage from './ProfilePage';
import HomePage from './HomePage';
import LoginPage from './LoginPage';
import SignUpPage from './SignUpPage';
import FourOhFourPage from './FourOhFourPage';
import MessagePage from './MessagePage';
import { Switch, Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

class App extends Component {

  state = {
    // username: '',
    // password: ''
  }

  componentDidMount() {
    console.log('App mounted');
    console.log(this.props);
    console.log('App: What\s in store?', this.props.username, this.props.token);

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
      this.props.storeUsernameToRedux(user.username);
      console.log('username stored');
      console.log('After storing username, what\'s in store?', this.props.username, this.props.token);
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
            storeUsername={this.storeUsername}
            routerProps={routerProps} />} />

        <Route path={'/signup'}
          render={(routerProps) => <SignUpPage
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
    token: store.token,
    username: store.username
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    storeUsernameToRedux: (username) => {
      dispatch({ type: 'STORE_USERNAME', username: username })
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));