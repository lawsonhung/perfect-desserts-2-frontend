import React, { Component } from 'react';
import ProfilePage from './ProfilePage';
import HomePage from './HomePage';
import LoginPage from './LoginPage';
// eslint-disable-next-line
import SignUpPage from './SignUpPage';
import FourOhFourPage from './FourOhFourPage';
import MessagePage from './MessagePage';
import { Switch, Route, withRouter } from 'react-router-dom';

class App extends Component {

  state = {
    username: '',
    // password: ''
  }

  componentDidMount() {
    if (localStorage.token) {
      // Fetch profile
      // Local fetch
      // fetch('http://localhost:3000/profile',{
      // Heroku fetch
      fetch('https://perfect-desserts-2-backend.herokuapp.com/profile',{
        headers: {
          'Authorization': `Bearer ${localStorage.token}`
        }
      })
      .then(res => res.json())
      .then(user => this.setState({username: user.username}))
    } else {
      // This is done with withRouter technology. Using HOC, you can user router props
      this.props.history.push('/login');
    }
  }

  render() {
    console.log(this.props);

    return (
      <Switch>
        
        {/* <Route 
          path={'/profile'} 
          component={ProfilePage} /> */}
          {/* Same as below, but below allows you to pass props */}
        <Route path={'/profile'} 
          render={(routerProps) => <ProfilePage 
            username={this.state.username} 
            routerProps={routerProps} />} />

        <Route path={'/login'} 
          render={(routerProps) => <LoginPage 
            username={this.state.username}
            password={this.state.password}
            routerProps={routerProps} />} />

        <Route path={'/signup'}
          render={(routerProps) => <SignUpPage
            username={this.state.username}
            password={this.state.password}
            routerProps={routerProps} />} />

        <Route path={'/messages/:text'} 
          render={(routerProps) => <MessagePage 
          username={this.state.username}
          // {...routerProps} is syntactic sugar for routerProps={routerProps}. They are both the same
          {...routerProps} />} />

        <Route path={'/'} component={HomePage} />

        <Route component={FourOhFourPage} />

      </Switch>
    )
  }
}

export default withRouter(App);