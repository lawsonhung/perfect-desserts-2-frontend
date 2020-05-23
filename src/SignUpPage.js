import React, { Component } from 'react';

export default class SignUpPage extends Component {
  Signup

  state = {
    username: '',
    password: ''
  }

  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  handleSubmit = (e) => {
    e.preventDefault();

    fetch('http://localhost:3000/signup',{
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state)
    })
    .then(res => res.json())
    .then(data => {
      console.log(data);
      if (data.token) {
        localStorage.token = data.token;
        console.log(this);
        this.props.routerProps.history.push('/profile');
      }
    });
  }

  render() {
    return (
      <div>
        {/* <button>Switch to Login</button> */}
        <h1>Signup please!</h1>
        <form onSubmit={this.handleSubmit}>
          <input onChange={this.handleChange} value={this.state.username} type="text" name="username"/>
          <input onChange={this.handleChange} value={this.state.password} type="password" name="password"/>
          <input type="submit" value="Create account"/>
        </form>
      </div>
    );
  }
}