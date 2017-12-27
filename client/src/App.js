import React, { Component } from 'react';
import axios from 'axios';
import Auth from './auth/Auth';
import Profile  from './Profile.js';
import Home from './Home.js';
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
            <div className="hundredWide"><Link to={"/"}>Logo/Home</Link></div>
            <div className="hundredWide"><Link to={"/Auth"}>Login/Signup</Link></div>
            <div className="hundredWide"><Link to={"/"} onClick={(e) => this.clearUser(e)}>Logout</Link></div>
            <div className="hundredWide"><Link to={"/Profile"}>Profile</Link></div>
          </header>
          <div className="mainWrapper container">
            <Route exact path={"/"} component={Home}/>
            <Route path={"/Auth"} render={(props) => <Auth getUser={this.getUser} getUserSignup={this.getUserSignup} />} />
            <Route path={"/Profile"} render={(props) => <Profile userId={this.state.userId} />} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
