import React, { Component } from 'react';
import '../App.css';

class Signup extends Component {
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
        this.props.getUserSignup(this.state.email,this.state.password)
    }

    render() {
      	return (
            <div className="container">
                <h1><span className="fa fa-sign-in"></span> Sign Up</h1>
                    {/* show any messages that come back with authentication */}
                    {/* ADD ALERTS HERE */}
    
                {/* LOGIN FORM */}
                <form>
                    <div className="field">
                        <label className="label">Email</label>
                        <div className="control">
                            <input 
                                type="text" 
                                className="input" 
                                name="email"
                                onChange={(e) => this.handleChangeEmail(e)}
                            />
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Password</label>
                        <div className="control">
                            <input 
                                type="password" 
                                className="input" 
                                name="password"
                                onChange={(e) => this.handleChangePassword(e)}
                            />
                        </div>
                    </div>
                    <div className="field">
                        <div className="control">
                            <button 
                                type="submit" 
                                className="button"
                                onClick={(e) => this.handleSubmit(e)}
                            >Login</button>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

export default Signup;
