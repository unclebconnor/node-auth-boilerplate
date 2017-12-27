import React, { Component } from 'react';
import '../App.css';
import Login from './Login.js';
import Signup from './Signup.js';

class Auth extends Component {

  render() {
    return (
      <div>
        <h1>Auth Page</h1>
        <h3>Links to oAuth</h3>
        <Login getUser={this.props.getUser}/>
        <Signup getUserSignup={this.props.getUserSignup}/>
      </div>
    );
  }
}

export default Auth;