import React, { Component } from 'react';

export default class LoginPage extends Component {
  state = {
    username: '',
    password: ''
  }
  
  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value});
  }

  handleSubmit = (e) => {
    e.preventDefault();

    fetch('http://localhost:3000/login', {
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
        localStorage.token = data.token;
      }
    });
  }
  
  render() {
    return (
      <div>
        {/* <button>Switch to Signup. Don't have an account? Sign up here</button> */}
        <h1>Log in please!</h1>
        <form onSubmit={this.handleSubmit}>
          <input onChange={this.handleChange} value={this.state.username} type="text" name="username"/>
          <input  onChange={this.handleChange} value={this.state.password} type="password" name="password"/>
          <input type="submit" value="Log in" />
        </form>
      </div>
    );
  }
}