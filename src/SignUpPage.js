import React, { Component } from 'react';
import { connect } from 'react-redux';

class SignUpPage extends Component {
  Signup

  state = {
    password: ''
  }

  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  handleSubmit = (e) => {
    e.preventDefault();
    // Local fetch
    // fetch('http://localhost:3000/signup',{
    // Heroku fetch
    fetch('https://perfect-desserts-2-backend.herokuapp.com/signup',{
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state)
    })
    .then(res => res.json())
    .then(data => {
      if (data.token) {
        this.props.storeToken(data.token);
        this.props.storeUsername();

        this.props.routerProps.history.push('/profile');
      }
    })
  }

  handleClick = () => {
    this.props.routerProps.history.push('/login');
  }

  render() {
    console.log('Signup props: ', this.props);

    return (
      <div>
        <h1>Signup please!</h1>
        <form onSubmit={this.handleSubmit}>
          <input onChange={this.handleChange} value={this.state.username} type="text" name="username"/>
          <input onChange={this.handleChange} value={this.state.password} type="password" name="password"/>
          <input type="submit" value="Create account"/>
        </form>
        <button onClick={this.handleClick}>I already have an account. Take me back to log in</button>
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
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUpPage)