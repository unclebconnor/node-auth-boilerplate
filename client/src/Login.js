import React, { Component } from 'react';
import './App.css';

class Login extends Component {

  render() {
    return (
      <div className="container">
			<div className="col-sm-6 col-sm-offset-3">
				<h1><span className="fa fa-sign-in"></span> Login</h1>
				{/* show any messages that come back with authentication */}
				{/* ADD ALERTS HERE */}

				{/* LOGIN FORM */}
    			<form action="/login" method="POST">
    			    <div className="form-group">
    			        <label>Email</label>
    			        <input type="text" className="form-control" name="email"/>
    			    </div>
    			    <div className="form-group">
    			        <label>Password</label>
    			        <input type="password" className="form-control" name="password"/>
    			    </div>
    			    <button type="submit" className="btn btn-warning btn-lg">Login</button>
    			</form>
    			<hr/>
			    <p>Need an account? <a href="/signup">Signup</a></p>
    			<p>Or go <a href="/">home</a>.</p>
			</div>
		</div>
    );
  }
}

export default Login;
