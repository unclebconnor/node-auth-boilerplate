import React, { Component } from 'react';
import '../App.css';

class Login extends Component {
    constructor(props){
        super(props);
        this.state={
            email:'',
            password:''
        }
    }

    handleChangeEmail(e){
        this.setState({
            email:e.target.value
        })
    }

    handleChangePassword(e){
        this.setState({
            password:e.target.value
        })
    }

    handleSubmit(e){
        e.preventDefault();
        this.props.getUser(this.state.email,this.state.password)
    }

    render() {
        return (
            <div className="container">
                <div className="col-sm-6 col-sm-offset-3">
                <h1><span className="fa fa-sign-in"></span> Login</h1>
		  		{/* show any messages that come back with authentication */}
		  		{/* ADD ALERTS HERE */}

				{/* LOGIN FORM */}
    			<form>
    			    <div className="form-group">
    			        <label>Email</label>
    			        <input 
                            type="text" 
                            className="form-control" 
                            name="email"
                            onChange={(e) => this.handleChangeEmail(e)}
                        />
    			    </div>
    			    <div className="form-group">
    			        <label>Password</label>
    			        <input 
                            type="password" 
                            className="form-control" 
                            name="password"
                            onChange={(e) => this.handleChangePassword(e)}
                        />
    			    </div>
    			    <button 
                        type="submit" 
                        className="btn btn-warning btn-lg"
                        onClick={(e) => this.handleSubmit(e)}
                    >Login</button>
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
