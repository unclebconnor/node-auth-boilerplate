import React, { Component } from 'react';
import '../App.css';
import Login from './Login.js';
import Signup from './Signup.js';

class Auth extends Component {
	constructor(props){
		super(props);
		this.state={

		}
	}

	openModal(){
		document.getElementById('signupModal').classList.add('is-active') //not working yet
		
	}

	closeModal(){
		document.getElementById('signupModal').classList.remove('is-active') //not working yet
		
	}

  	render() {
    	return (
    	  <div>
    	    <h1 className="center is-size-3">Auth Page</h1>
    	    <section>
    	    	<div className="columns">
    	    		<div className="column is-4 is-offset-2 center">
						<button className="button is-large is-link inline-block">
							<span className="fa fa-facebook"> Log in with Facebook</span>
						</button>
						<button className="button is-large is-info inline-block">
							<span className="fa fa-twitter"> Log in with Twitter</span>
						</button>
						<button className="button is-large is-danger inline-block">
							<span className="fa fa-google-plus"> Log in with Google</span>
						</button>
					</div>
					<div className="column is-4">
    	    			<Login getUser={this.props.getUser}/>
    	    			<p>Need an account? <a onClick={(e) => this.openModal()}>Sign Up</a></p>
    	    		</div>
    	    	</div>
    	    </section>
			<div id="signupModal" className="modal">
				<div className="modal-background"></div>
				<div className="modal-card">
					<section className="modal-card-body">
						<Signup getUserSignup={this.props.getUserSignup}/>
					</section>
				</div>
				<button 
					className="modal-close is-large" 
					aria-label="close"
					onClick={(e) => this.closeModal()}
				></button>
			</div>
    	  </div>
    	);
	}
}

export default Auth;