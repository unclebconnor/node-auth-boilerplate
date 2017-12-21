import React, { Component } from 'react';
import axios from 'axios';
import Login from './Login.js';
import SignupPage from './Signup.js';
import ProfilePage  from './Profile.js';
import Home from './Home.js';
import MyFeeds  from './MyFeeds.js';
import MyDiscussions from './MyDiscussions.js';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state={
      user: {yubsy:'yubsy'}
    }
    this.getUser=this.getUser.bind(this);
  }

  getUser(email,password){
    axios({
      method: 'post',
      url: '/login',
      data: {
        email: email,
        password: password
      }
    })
    .then((response) => {
      this.setState({
        user: response.data
      })
    })
    .catch((error) => {
      console.log(error);
    });
  }

  render() {
    console.log(this.state)
    return (
      <Router>
        <div className="container">
          <p>THIS SHIT IS CONNECTED NOW YERRRRR</p>
          <ul>
            <li><Link to={"/"}>Home</Link></li>
            <li><Link to={"/Login"}>Login</Link></li>
            <li><Link to={"/SignupPage"}>Signup</Link></li>
            <li><Link to={"/ProfilePage"}>Profile</Link></li>
            <li><Link to={"/MyFeeds"}>MyFeeds</Link></li>
            <li><Link to={"/MyDiscussions"}>MyDiscussions</Link></li>
          </ul>
          <div className="mainWrapper container">
            <Route exact path={"/"} component={Home}/>
            <Route path={"/Login"} render={(props) => <Login getUser={this.getUser} />} />
            <Route path={"/SignupPage"} component={SignupPage}/>
            <Route path={"/ProfilePage"} component={ProfilePage}/>
            <Route path={"/MyFeeds"} component={MyFeeds}/> 
            <Route path={"/MyDiscussions"} component={MyDiscussions}/>  
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
