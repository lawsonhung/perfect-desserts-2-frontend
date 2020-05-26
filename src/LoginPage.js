import React, { Component } from 'react';
import { connect } from 'react-redux';

class LoginPage extends Component {
  state = {
    password: ''
  }
  
  handleChange = (e) => {
    // this.setState({[e.target.name]: e.target.value});
  }

  handleUsernameChange = (e) => {
    this.props.storeUsernameToRedux(e.target.value);
  }

  handlePasswordChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit = (e) => {
    e.preventDefault();

    // Local fetch
    // fetch('http://localhost:3000/login', {
    // Heroku fetch
    fetch('https://perfect-desserts-2-backend.herokuapp.com/login', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'username': this.props.username,
        'password': this.state.password
      })
    })
    .then(res => res.json())
    .then(data => {
      if (data.token) {
        this.props.storeToken(data.token);
        this.props.storeUsername();

        this.props.routerProps.history.push('/profile');
      }
    });
  }

  handleClick = () => {
    this.props.routerProps.history.push('/signup');
  }
  
  render() {
    console.log("Login props: ", this.props);
    console.log('Login state: ', this.state);

    return (
      <div>
        <h1>Log in please!</h1>
        <form onSubmit={this.handleSubmit}>
          <input onChange={this.handleUsernameChange} value={this.props.username} type="text" name="username"/>
          <input  onChange={this.handlePasswordChange} value={this.state.password} type="password" name="password"/>
          <input type="submit" value="Log in" />
        </form>
        <button onClick={this.handleClick}>Don't have an account yet? Click here to create one</button>
      </div>
    );
  }
}

const mapStateToProps = (store) => {
  return {
    username: store.username,
    token: store.token
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    storeToken: (token) => {
      dispatch({ type: 'STORE_TOKEN', token: token })
    },
    storeUsernameToRedux: (username) => {
      dispatch({ type: 'STORE_USERNAME', username: username})
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage)