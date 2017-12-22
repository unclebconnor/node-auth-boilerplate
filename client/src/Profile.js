import React, { Component } from 'react';
import './App.css';

class Profile extends Component {
  constructor(props){
    super(props);
    this.state={
      userId:""
    }
  }

  componentDidMount(){
    this.setState({
      userId: this.props.userId
    })
  }

  render() {
    console.log('profile state', this.state)
    console.log('profile props', this.props)

    return (
      <div className="container">
        <div className="page-header text-center">
          <h1><span className="fa fa-anchor"></span> Profile Page</h1>
          <a href="/logout" className="btn btn-default btn-sm">Logout</a>
        </div>
        <div className="row">
          {/* LOCAL INFORMATION */}
          <div className="col-sm-6">
            <div className="well">
              <h3><span className="fa fa-user"></span> Local</h3>
                <p>
                  <strong>id</strong>: {this.state.userId}
                  
                </p>
            </div>
          </div>
          {/* FACEBOOK INFORMATION */}
          <div className="col-sm-6">
            <div className="well">
              <h3 className="text-primary"><span className="fa fa-facebook"></span> Facebook</h3>
              <p>
                    {/*<strong>facebook id</strong>: <%= user.facebookId %><br>
                    <strong>token</strong>: <%= user.facebookToken %><br>
                    <strong>email</strong>: <%= user.facebookEmail %><br>
                    <strong>name</strong>: <%= user.facebookName %>*/}
                </p>
            </div>
          </div>
        </div>
        <div className="row">
          {/* TWITTER INFORMATION */}
          <div className="col-sm-6">
            <div className="well">
              <h3 className="text-info"><span className="fa fa-twitter"></span> Twitter</h3>
              <p>
                {/*<strong>id</strong>: <%= user.twitterId %><br>
                <strong>token</strong>: <%= user.twitterToken %><br>
                <strong>username</strong>: <%= user.twitterUsername %><br>
                <strong>displayName</strong>: <%= user.twitterDisplayName %>*/}
              </p>
            </div>
          </div>
          {/*  GOOGLE INFORMATION */}
          <div className="col-sm-6">
            <div className="well">
              <h3 className="text-danger"><span className="fa fa-google-plus"></span> Google</h3>
              <p>
                  {/*<strong>id</strong>: <%= user.googleId %><br>
                  <strong>token</strong>: <%= user.googleToken %><br>
                  <strong>email</strong>: <%= user.googleEmail %><br>
                  <strong>name</strong>: <%= user.googleName %>*/}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
