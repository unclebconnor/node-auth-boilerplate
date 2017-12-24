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
  constructor(props){
    super(props);
    this.state={
      userId: ""
    }
    this.getUser=this.getUser.bind(this);
    this.getUserSignup=this.getUserSignup.bind(this);
  }

  componentDidMount(){
    this.setState({
      userId: localStorage.userId
    })
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
      localStorage.userId = response.data.id
      this.setState({
        userId: localStorage.userId
      })        
    })
    .catch((error) => {
      console.log(error);
    });
  }

  getUserSignup(email,password){
    axios({
      method: 'post',
      url: '/signup',
      data: {
        email: email,
        password: password
      }
    })
    .then((response) => {
      localStorage.userId = response.data.id
      this.setState({
        userId: localStorage.userId
      })        
    })
    .catch((error) => {
      console.log(error);
    });
  }

  clearUser(){
    localStorage.clear()      
    this.setState({
      userId: {}
    })
  }

  render() {
    console.log("app state",this.state)
    return (
      <Router>
        <div className="container-fluid">
          <header>
            <div className="inline-block">newReader</div>
          </header>
          <ul className="horizontalNav">
            <li className="inline-block"><Link to={"/Login"}>Login</Link></li>
            <li className="inline-block"><Link to={"/Signup"}>Signup</Link></li>
            <li className="inline-block"><Link to={"/"} onClick={(e) => this.clearUser(e)}>Logout</Link></li>
            <li className="inline-block"><Link to={"/"}>Home</Link></li>
            <li className="inline-block"><Link to={"/Profile"}>Profile</Link></li>
            <li className="inline-block"><Link to={"/MyFeeds"}>MyFeeds</Link></li>
            <li className="inline-block"><Link to={"/MyDiscussions"}>MyDiscussions</Link></li>
          </ul>
          <div className="mainWrapper container">
            <Route exact path={"/"} component={Home}/>
            <Route path={"/Login"} render={(props) => <Login getUser={this.getUser} />} />
            <Route path={"/Signup"} render={(props) => <Signup getUserSignup={this.getUserSignup} />}/>
            <Route path={"/Profile"} render={(props) => <Profile userId={this.state.userId} />} />
            <Route path={"/MyFeeds"} component={MyFeeds}/> 
            <Route path={"/MyDiscussions"} component={MyDiscussions}/>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
