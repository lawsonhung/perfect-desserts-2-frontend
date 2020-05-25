import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class ProfilePage extends Component {

  handleClick = () => {
    this.props.clearUsername();
    this.props.clearToken();

    this.props.routerProps.history.push('/login');
  }

  render() {
    console.log("Profile props: ", this.props);

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

const mapStateToProps = (store) => {
  return {
    username: store.username
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    clearUsername: () => {
      dispatch({ type: 'CLEAR_USERNAME' })
    },
    clearToken: () => {
      dispatch({ type: 'CLEAR_TOKEN' })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage)