import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Login from "./views/login/login";
import About from "./views/about/about";
import Profile from "./views/profile/profile";
import 'bootstrap/dist/css/bootstrap.min.css';
import NotFound from './views/404.js';




class App extends Component {
  constructor(props){
    super(props);
    this.state={
      users:[],
      online: ""
    }

  }
  addUser(newUser) {
    let users = this.state.users;
    users.push(newUser);
    this.setState({users});
  }
  loggedIn(name) {
    this.setState({online:name});
  }
// dfdfdfdf
  render() {
    return (
      <div>
        <Router>
          <Switch>
            <Route exact path = "/" render = {(props)=><Login users={this.state.users} signedIn = {this.loggedIn.bind(this)} newUser = {this.addUser.bind(this)}/>}/>
            <Route path = "/about" component = {About}/>
            <Route path = "/profile" render = {(props)=><Profile name={this.state.online}/>}/>
            <Route  component = {NotFound} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
