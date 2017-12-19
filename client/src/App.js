import React, { Component } from 'react';
import axios from 'axios';
import Login from './Login.js';
import Signup from './Signup.js';
import Profile  from './Profile.js';
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
  state = {
      user: {yubsy:'yubsy'}
    }
  
  componentDidMount(){
    this.getUser()
  }

  getUser = () => {
    axios.get('/jerk')
      .then((response) => {
        this.setState({
          user:response.data
        })
      })
      .catch(function (error) {
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
            <li><Link to={"/Signup"}>Signup</Link></li>
            <li><Link to={"/Profile"}>Profile</Link></li>
            <li><Link to={"/MyFeeds"}>MyFeeds</Link></li>
            <li><Link to={"/MyDiscussions"}>MyDiscussions</Link></li>
          </ul>
          <div className="mainWrapper container">
            <Route exact path={"/"} component={Home}/>
            <Route path={"/Login"} component={Login}/>
            <Route path={"/Signup"} component={Signup}/>
            <Route path={"/Profile"} component={Profile}/>
            <Route path={"/MyFeeds"} component={MyFeeds}/> 
            <Route path={"/MyDiscussions"} component={MyDiscussions}/>  
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
