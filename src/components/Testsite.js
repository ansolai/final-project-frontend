import React, { Component, useContext } from "react";
import { Consumer, Provider, AuthContext } from "./context/Authcontext";
import { ModalConsumer, ModalContext } from './login/ModalContext'
import Signup from './signup/Signup'

export default class Testsite extends Component {
  state = { loggedIn: false, data: [] };
  AuthContext = this.context;
  testdata = () => {
    this.context.getData("users").then(res => this.setState({data: [...this.state.data, res]}))
    /* this.setState({data: [...this.state.data, this.context.getData()]}) */
  }
  
  render() {
    console.log(this.state)
     const resp = this.state.data.map(t => {
       return <p>{t.email}</p>
    }) 
    return (
      <div>
        <Consumer>
          {({ isLoggedIn }) => (isLoggedIn ? <p>Joo</p> : <p>Ei</p>)}
        </Consumer>

        <Consumer>
          {({ logIn, logOut, isLoggedIn }) =>
            isLoggedIn ? (
              <button onClick={logOut}>Logoutbutton</button>
            ) : (
              <button onClick={logIn}>Loginbutton</button>
            )
          }
        </Consumer>
        <button onClick={this.testdata}>Test</button>
        {this.state.data ? <p>{resp}</p> : <p>No</p>}
        
          <Signup/>
        
      </div>
    );
  }
}

Testsite.contextType = AuthContext;
