import React, { Component } from 'react';
import './App.css';

class App extends Component {
  state = {
      user: {yubsy:'yubsy'}
    }
  
  componentDidMount(){
    this.getUser()
  }

  getUser = () => {
    // Get the passwords and store them in state
    fetch('/jerk',{
      headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
       }
    })
      .then(res => res.json())
      .then(user => this.setState({ user }));
  }

  render() {
    console.log(this.state)
    return (
      <div className="App">
        <p>
          THIS SHIT IS CONNECTED NOW YERRRRR
        </p>
      </div>
    );
  }
}

export default App;
