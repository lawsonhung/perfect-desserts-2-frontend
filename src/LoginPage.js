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
        console.log(this);
        // debugger
        // this.props.redirect('profile');
        this.props.routerProps.history.push('/profile');
      }
    });
  }

  handleClick = () => {
    this.props.routerProps.history.push('/signup');
  }
  
  render() {
    console.log("Login props: ", this.props);

    return (
      <div>
        <h1>Log in please!</h1>
        <form onSubmit={this.handleSubmit}>
          <input onChange={this.handleChange} value={this.state.username} type="text" name="username"/>
          <input  onChange={this.handleChange} value={this.state.password} type="password" name="password"/>
          <input type="submit" value="Log in" />
        </form>
        <button onClick={this.handleClick}>Don't have an account yet? Click here to create one</button>
      </div>
    );
  }
}