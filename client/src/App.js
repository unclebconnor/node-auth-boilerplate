import React, { Component } from 'react';
import axios from 'axios';
import AuthMain from './auth/AuthMain';
import Profile  from './Profile.js';
import ReaderMain  from './reader/ReaderMain.js';
import Home from './Home.js';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  Switch
} from 'react-router-dom';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state={
      userId: "",
      token: ""
    }
    this.getUser=this.getUser.bind(this);
    this.getUserSignup=this.getUserSignup.bind(this);
    this.getUserFacebook=this.getUserFacebook.bind(this);
  }

  componentDidMount(){
    // If there is a token in localStorage
    var token = localStorage.token
    if (token === 'undefined' || token === null || token === '' || token === undefined) {
      this.clearUser()
    } else {
      //   Validate the token against the server
      axios.post('/me/from/token', {
        token: token
      }).then(response => {
        localStorage.userId = response.data.user.id
        localStorage.token = response.data.token
        this.setState({
          userId: localStorage.userId,
          token: localStorage.token
        })
      }).catch(err => {
        // Both the JWT and db errors will be caught here
        console.log(err)
      })
    }
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
      localStorage.userId = response.data.user.id
      localStorage.token = response.data.token
      this.setState({
        userId: localStorage.userId,
        token: localStorage.token
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
      localStorage.userId = response.data.user.id
      localStorage.token = response.data.token
      this.setState({
        userId: localStorage.userId,
        token: localStorage.token
      })         
    })
    .catch((error) => {
      console.log(error);
    });
  }

  getUserFacebook(){
    console.log('FB Pushed')
    axios({
      method: 'get',
      url: '/auth/facebook',
    })
    .then((response) => {
      localStorage.userId = response.data.user.id
      localStorage.token = response.data.token
      this.setState({
        userId: localStorage.userId,
        token: localStorage.token
      })          
    })
    .catch((error) => {
      console.log(error);
    });
  }

  clearUser(){
    localStorage.clear()      
    this.setState({
      userId: '',
      token:''
    })
  }

  render() {
    console.log("app state",this.state)

    let bodyStuff = '';
    let headerStuff = '';

    if (Object.keys(this.state.userId).length === 0) { // if not logged in
      headerStuff = 
        <header>
            <div className="hundredWide"><Link to={"/"}>Logo/Home</Link></div>
            <div className="hundredWide"><Link to={"/AuthMain"}>Login/Signup</Link></div>
        </header>

      bodyStuff =
        <Switch className="mainWrapper container">
          <Route exact path={"/"} component={Home}/>
          <Route 
            path={"/AuthMain"} 
            render={(props) => <AuthMain getUser={this.getUser} getUserSignup={this.getUserSignup} getUserFacebook={this.getUserFacebook}/>} 
          />
          <Redirect to={'/'} />
        </Switch>
    } else { //if logged in
      headerStuff = 
        <header>
            <div className="hundredWide"><Link to={"/"}>Logo/Home</Link></div>
            <div className="hundredWide"><Link to={"/"} onClick={(e) => this.clearUser(e)}>Logout</Link></div>
            <div className="hundredWide"><Link to={"/Profile"}>Profile</Link></div>
            <div className="hundredWide"><Link to={"/ReaderMain"}>Reader</Link></div>
        </header>

      bodyStuff =
        <Switch className="mainWrapper container">
          <Route exact path={"/"} component={Home}/>
          <Route path={"/Profile"} render={(props) => <Profile userId={this.state.userId} />} />
          <Route path={"/ReaderMain"} render={(props) => <ReaderMain userId={this.state.userId} />} />
          <Redirect to={'/Profile'} />
        </Switch>
    }

    return (
      <Router>
        <div>
          {headerStuff}
          {bodyStuff}
        </div>
      </Router>
    );
  }
}

export default App;
